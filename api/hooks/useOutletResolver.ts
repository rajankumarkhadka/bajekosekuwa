import { useMemo } from 'react';
import { useOutlet } from '@/context/OutletContext';
import { useBranchDetails } from '@/context/BranchDetailsContext';
import { matchBranchId, slugifyBranchName } from '@/utils/outletMatcher';
import { VendorBranch } from '@/types';

export interface OutletResolverResult {
  /** The verified server VendorBranch object if matched, otherwise null */
  matchedBranch: VendorBranch | null;
  /** The verified UUID of the branch if matched */
  branchId: string | null;
  /** Indicates whether the requested identifier matched a valid server branch */
  isValidBranch: boolean;
  /** Indicates whether the server branches are currently loading */
  isLoading: boolean;
  /** All branches loaded from server API */
  allOutlets: VendorBranch[];
  /** Helper to get URL slug for matched branch */
  branchSlug: string | null;
}

/**
 * Centralized Branch Resolver Hook.
 * Validates and matches an incoming branch ID or route parameter against branch details
 * from BranchDetailsContext or server branches list.
 *
 * @param targetIdentifier - Optional UUID, branch name, or slug. Defaults to active selected outlet if omitted.
 */
export function useOutletResolver(targetIdentifier?: string | null): OutletResolverResult {
  const { outlets, selectedOutlet, isLoading } = useOutlet();
  const { branch: contextBranch } = useBranchDetails();

  const matchedBranch = useMemo(() => {
    // 1. If inside BranchDetailsProvider and target is omitted or matches context branch, use context branch
    if (contextBranch) {
      if (!targetIdentifier || matchBranchId([contextBranch], targetIdentifier)) {
        return contextBranch;
      }
    }
    // 2. If a target identifier is provided, match against server branches
    if (targetIdentifier && targetIdentifier.trim() !== '') {
      return matchBranchId(outlets, targetIdentifier);
    }
    // 3. Fall back to active selected outlet from OutletContext
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

