import { useMemo } from 'react';
import { useOutlet } from '@/context/OutletContext';
import { useBranchDetails } from '@/context/BranchDetailsContext';
import { matchBranchId, slugifyBranchName } from '@/utils/outletMatcher';
import { VendorBranch } from '@/types';

export interface OutletResolverResult {
  matchedBranch: VendorBranch | null;
  branchId: string | null;
  isValidBranch: boolean;
  isLoading: boolean;
  allOutlets: VendorBranch[];
  branchSlug: string | null;
}


export function useOutletResolver(targetIdentifier?: string | null): OutletResolverResult {
  const { outlets, selectedOutlet, isLoading } = useOutlet();
  const { branch: contextBranch } = useBranchDetails();

  const matchedBranch = useMemo(() => {
    if (contextBranch) {
      if (!targetIdentifier || matchBranchId([contextBranch], targetIdentifier)) {
        return contextBranch;
      }
    }
    if (targetIdentifier && targetIdentifier.trim() !== '') {
      return matchBranchId(outlets, targetIdentifier);
    }
    return selectedOutlet ?? null;
  }, [contextBranch, outlets, selectedOutlet, targetIdentifier]);

  const branchId = matchedBranch?.id ?? null;
  const isValidBranch = Boolean(matchedBranch);
  const branchSlug = matchedBranch ? slugifyBranchName(matchedBranch.name) : null;

  return {
    matchedBranch,
    branchId,
    isValidBranch,
    isLoading: isLoading && !contextBranch,
    allOutlets: outlets,
    branchSlug,
  };
}

