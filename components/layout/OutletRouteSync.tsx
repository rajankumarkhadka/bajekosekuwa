'use client';

import { useEffect } from 'react';
import { useOutlet } from '@/context/OutletContext';
import { useBranchDetails } from '@/context/BranchDetailsContext';
import { matchBranchId, slugifyCountryName, slugifyBranchName } from '@/utils/outletMatcher';

interface OutletRouteSyncProps {
  country: string;
  branch: string;
}

export default function OutletRouteSync({ country, branch }: OutletRouteSyncProps) {
  const { outlets, selectedOutlet, setSelectedOutlet } = useOutlet();
  const { branch: currentBranch } = useBranchDetails();

  useEffect(() => {
    // 1. If single branch details provider is active and valid, sync selectedOutlet directly
    if (currentBranch) {
      if (selectedOutlet?.id !== currentBranch.id) {
        setSelectedOutlet(currentBranch);
      }
      return;
    }

    // 2. Fallback to outlets list matching if provider branch is null
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
  }, [country, branch, currentBranch, outlets, selectedOutlet, setSelectedOutlet]);

  return null;
}

