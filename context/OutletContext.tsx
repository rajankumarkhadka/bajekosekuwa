'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { VendorBranch, Country } from '@/types';
import { useVendorBranches } from '@/api/hooks/useVendorBranch';
import { calculateDistanceKm } from '@/utils/distance';
import { formatFlagUrl } from '@/utils/flag';

interface OutletContextType {
  outlets: VendorBranch[];
  countries: Country[];
  selectedOutlet: VendorBranch | null;
  setSelectedOutlet: (outlet: VendorBranch | null) => void;
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country | null) => void;
  userLocation: { lat: number; lng: number } | null;
  isLocating: boolean;
  locationError: string | null;
  isLoading: boolean;
  requestUserLocation: () => Promise<VendorBranch | null>;
  clearSelectedOutlet: () => void;
  loadMoreOutlets: () => void;
}

const OutletContext = createContext<OutletContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'bajeko_selected_outlet_id';

const DEFAULT_NEPAL_COUNTRY: Country = {
  id: 'd4fc2e9e-953d-4e49-918d-81fd74cb81fa',
  name: 'Nepal',
  code: '+977',
  currency: 'NPR',
  currency_symbol: 'Rs',
  dial_code: null,
  flag_url_4x3: 'https://auth.bajekoshop.com/bajekoshop/flags/4x3/+977.svg',
  flag_url_1x1: 'https://auth.bajekoshop.com/bajekoshop/flags/1x1/+977.svg',
};

export function OutletProvider({ children }: { children: React.ReactNode }) {
  const [pageSize, setPageSize] = useState<number>(10);

  const { data: apiBranches, isLoading } = useVendorBranches({
    page_size: pageSize,
  });

  const loadMoreOutlets = () => {
    setPageSize((prev) => Math.min(prev + 20, 100));
  };

  // Process dynamic outlets fetched from real live API
  const rawOutlets = useMemo(() => {
    const list = apiBranches || [];
    
    return list.map((item) => {
      const country = item.country
        ? {
            ...item.country,
            flag_url_4x3: formatFlagUrl(item.country.flag_url_4x3),
            flag_url_1x1: formatFlagUrl(item.country.flag_url_1x1),
          }
        : DEFAULT_NEPAL_COUNTRY;

      return {
        ...item,
        country,
      };
    });
  }, [apiBranches]);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedOutlet, setSelectedOutletState] = useState<VendorBranch | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Extract unique countries dynamically from API data
  const countries = useMemo(() => {
    const list: Country[] = [];
    rawOutlets.forEach((o) => {
      if (o.country && !list.some((c) => c.id === o.country?.id)) {
        list.push(o.country);
      }
    });
    return list;
  }, [rawOutlets]);

  // Compute outlets with distance if user location is available
  const outlets = useMemo(() => {
    if (!userLocation) return rawOutlets;

    return rawOutlets.map((outlet) => {
      const dist = calculateDistanceKm(
        userLocation.lat,
        userLocation.lng,
        outlet.latitude,
        outlet.longitude
      );
      return {
        ...outlet,
        distance_km: dist,
      };
    });
  }, [rawOutlets, userLocation]);

  // Initialize selected outlet from localStorage (or keep null for Global view)
  useEffect(() => {
    if (typeof window === 'undefined' || outlets.length === 0) return;

    const savedId = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedId) {
      const found = outlets.find((o) => o.id === savedId);
      if (found) {
        setSelectedOutletState(found);
        if (found.country) setSelectedCountry(found.country);
      }
    }
  }, [outlets]);

  const setSelectedOutlet = (outlet: VendorBranch | null) => {
    setSelectedOutletState(outlet);
    if (outlet?.country) {
      setSelectedCountry(outlet.country);
    }
    if (typeof window !== 'undefined') {
      if (outlet) {
        localStorage.setItem(LOCAL_STORAGE_KEY, outlet.id);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  };

  const clearSelectedOutlet = () => {
    setSelectedOutlet(null);
  };

  // Geolocation trigger function: asks location permission, calculates nearest outlet, sorts and selects nearest first
  const requestUserLocation = async (): Promise<VendorBranch | null> => {
    setIsLocating(true);
    setLocationError(null);

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser');
        setIsLocating(false);
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserLocation({ lat: userLat, lng: userLng });

          // Calculate distances and find nearest outlet
          const calculated = rawOutlets.map((outlet) => {
            const dist = calculateDistanceKm(
              userLat,
              userLng,
              outlet.latitude,
              outlet.longitude
            );
            return {
              ...outlet,
              distance_km: dist,
            };
          });

          // Sort by nearest
          calculated.sort((a, b) => (a.distance_km ?? 99999) - (b.distance_km ?? 99999));

          const nearest = calculated[0] || null;
          if (nearest) {
            setSelectedOutlet(nearest);
          }

          setIsLocating(false);
          resolve(nearest);
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
          let userMsg = 'Unable to retrieve location permission.';
          if (error.code === 1 || error.message.toLowerCase().includes('denied')) {
            userMsg = 'Location permission was denied. Please enable location access in your browser settings to find nearest outlets.';
          } else if (error.code === 2) {
            userMsg = 'Location position unavailable. Please check your GPS / connection.';
          } else if (error.code === 3) {
            userMsg = 'Location request timed out. Please try again.';
          }
          setLocationError(userMsg);
          setIsLocating(false);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  };

  return (
    <OutletContext.Provider
      value={{
        outlets,
        countries,
        selectedOutlet,
        setSelectedOutlet,
        selectedCountry,
        setSelectedCountry,
        userLocation,
        isLocating,
        locationError,
        isLoading,
        requestUserLocation,
        clearSelectedOutlet,
        loadMoreOutlets,
      }}
    >
      {children}
    </OutletContext.Provider>
  );
}

export function useOutlet() {
  const context = useContext(OutletContext);
  if (!context) {
    throw new Error('useOutlet must be used within an OutletProvider');
  }
  return context;
}
