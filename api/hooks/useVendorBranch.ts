import { useQuery } from '@tanstack/react-query';
import vendorBranchService from '@/api/services/vendorBranch.service';
import { queryKeys } from '@/api/queryKeys';
import type { GetVendorBranchesQueryParams } from '@/types';

export function useVendorBranches(params?: GetVendorBranchesQueryParams) {
  const queryParams = { page_size: 10, ...params };

  return useQuery({
    queryKey: queryKeys.vendorBranches.list(queryParams),
    queryFn: () => vendorBranchService.getBranches(queryParams),
    staleTime: 5 * 60 * 1000,
  });
}

export function useOpenBranches(params?: GetVendorBranchesQueryParams) {
  const query = useVendorBranches(params);
  return {
    ...query,
    data: query.data ? query.data.filter((b) => b.open) : [],
  };
}

export function useVendorBranchDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.vendorBranches.detail(id),
    queryFn: () => vendorBranchService.getBranchById(id),
    enabled: Boolean(id),
    staleTime: 10 * 60 * 1000,
  });
}
