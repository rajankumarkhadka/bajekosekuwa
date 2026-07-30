import { useQuery } from '@tanstack/react-query';
import blogService from '@/api/services/blog.service';
import { useOutletResolver } from '@/api/hooks/useOutletResolver';

export function useBranchBlogs(branchId?: string | null) {
  const validId = branchId?.trim() ?? '';

  return useQuery({
    queryKey: ['branch-blogs', validId],
    queryFn: () => blogService.getBlogsByBranchId(validId),
    enabled: Boolean(validId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useActiveOutletBlogs(targetIdentifier?: string | null) {
  const { matchedBranch, branchId, isValidBranch, isLoading: isOutletLoading } =
    useOutletResolver(targetIdentifier);

  const queryResult = useBranchBlogs(isValidBranch ? branchId : null);

  return {
    ...queryResult,
    activeOutlet: matchedBranch,
    isOutletLoading,
    isValidBranch,
  };
}
