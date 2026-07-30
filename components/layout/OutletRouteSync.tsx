'use client';

import { useEffect } from 'react';
import { useOutlet } from '@/context/OutletContext';
import { matchBranchId, slugifyCountryName, slugifyBranchName } from '@/utils/outletMatcher';

interface OutletRouteSyncProps {
  country: string;
  branch: string;
}

export default function OutletRouteSync({ country, branch }: OutletRouteSyncProps) {
  const { outlets, selectedOutlet, setSelectedOutlet } = useOutlet();

  useEffect(() => {
    if (!outlets || outlets.length === 0) return;

    const matched = matchBranchId(outlets, branch);
    if (matched) {
      const currentBranchSlug = slugifyBranchName(selectedOutlet?.name || '');
      const currentCountrySlug = slugifyCountryName(selectedOutlet?.country?.name);

      if (
        selectedOutlet?.id !== matched.id ||
        currentBranchSlug !== branch ||
        currentCountrySlug !== country
      ) {
        setSelectedOutlet(matched);
      }
    }
  }, [country, branch, outlets, selectedOutlet, setSelectedOutlet]);

  return null;
}
