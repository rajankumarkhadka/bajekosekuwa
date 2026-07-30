import { useQuery } from '@tanstack/react-query';
import galleryService from '@/api/services/gallery.service';
import { useOutletResolver } from '@/api/hooks/useOutletResolver';
import { queryKeys } from '@/api/queryKeys';
import type { GetBranchGalleryQueryParams } from '@/types';

export function useBranchGallery(
  branchId?: string | null,
  params?: GetBranchGalleryQueryParams
) {
  const validId = branchId?.trim() ?? '';

  return useQuery({
    queryKey: queryKeys.gallery.byBranch(validId, params),
    queryFn: () => galleryService.getGalleryByBranchId(validId, params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useActiveOutletGallery(
  targetIdentifier?: string | null,
  params?: GetBranchGalleryQueryParams
) {
  const { matchedBranch, branchId, isValidBranch, isLoading: isOutletLoading } =
    useOutletResolver(targetIdentifier);

  const queryResult = useBranchGallery(isValidBranch ? branchId : null, params);

  return {
    ...queryResult,
    activeOutlet: matchedBranch,
    isOutletLoading,
    isValidBranch,
  };
}
