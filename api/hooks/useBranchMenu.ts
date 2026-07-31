import { useQuery } from '@tanstack/react-query';
import menuService from '@/api/services/menu.service';
import { useOutletResolver } from '@/api/hooks/useOutletResolver';
import { queryKeys } from '@/api/queryKeys';
import type { BranchMenuData } from '@/types';

export function useBranchMenu(branchId?: string | null) {
  const validId = branchId?.trim() ?? '';

  return useQuery<BranchMenuData | null>({
    queryKey: queryKeys.menu.byBranch(validId),
    queryFn: () => menuService.getMenuByBranchId(validId),
    enabled: Boolean(validId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useActiveOutletMenu(targetIdentifier?: string | null) {
  const { matchedBranch, branchId, isValidBranch, isLoading: isOutletLoading, allOutlets } =
    useOutletResolver(targetIdentifier);

  // Fallback to first available branch if no specific outlet is selected
  const effectiveBranchId = branchId || (allOutlets && allOutlets.length > 0 ? allOutlets[0].id : null);
  const effectiveBranch = matchedBranch || (allOutlets && allOutlets.length > 0 ? allOutlets[0] : null);

  const queryResult = useBranchMenu(effectiveBranchId);

  return {
    ...queryResult,
    activeOutlet: effectiveBranch,
    effectiveBranchId,
    isOutletLoading,
    isValidBranch,
  };
}
