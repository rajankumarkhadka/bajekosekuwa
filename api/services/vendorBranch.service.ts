import { http, cleanParams } from '@/libs/http';
import type {
  VendorBranch,
  GetVendorBranchesQueryParams,
  ApiResponse,
} from '@/types';

export const vendorBranchService = {
  async getBranches(params?: GetVendorBranchesQueryParams): Promise<VendorBranch[]> {
    const res = await http
      .get('branches', {
        searchParams: cleanParams(params as Record<string, unknown>),
      })
      .json<ApiResponse<VendorBranch[]>>();

    return res.data || [];
  },

  async getBranchById(id: string): Promise<VendorBranch> {
    if (!id) throw new Error('Branch ID is required');

    const res = await http
      .get(`branches/${id}`)
      .json<ApiResponse<VendorBranch>>();

    return res.data;
  },
};

export default vendorBranchService;
