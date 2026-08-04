'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useOutlet } from '@/context/OutletContext';
import { getOutletUrlPath } from '@/utils/outletMatcher';

export default function LocationInitializer() {
  const { outlets, requestUserLocation, isLoading } = useOutlet();
  const router = useRouter();
  const pathname = usePathname();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (isLoading || outlets.length === 0 || hasTriggeredRef.current) return;

    const handleLocationResolution = (nearestOutlet: any) => {
      if (nearestOutlet) {
        // If location is GRANTED, navigate from global pages to nearest outlet page
        const isGlobalPage =
          pathname === '/' ||
          pathname === '/about' ||
          pathname === '/blog' ||
          pathname === '/gallery' ||
          pathname === '/contact' ||
          pathname === '/reservation' ||
          pathname === '/menu';

        if (isGlobalPage) {
          const pageName = pathname === '/' ? '' : pathname.replace('/', '');
          const targetUrl = getOutletUrlPath(nearestOutlet, pageName);
          router.push(targetUrl);
        }
      }
    };

    // If permission was already granted in browser settings, auto-detect location immediately
    if (typeof window !== 'undefined' && 'permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted' && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            requestUserLocation().then(handleLocationResolution);
          }
        })
        .catch(() => {});
    }

    const alreadyPrompted = sessionStorage.getItem('location_permission_attempted');
    if (alreadyPrompted) return;

    hasTriggeredRef.current = true;
    sessionStorage.setItem('location_permission_attempted', 'true');

    // Prompt user for location permission upon website opening
    requestUserLocation().then(handleLocationResolution);
  }, [outlets, isLoading, pathname, requestUserLocation, router]);

  return null;
}
