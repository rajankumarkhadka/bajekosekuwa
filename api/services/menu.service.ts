import { ecommerceHttp } from '@/libs/http';
import type { BranchMenuData, BranchMenuResponse } from '@/types';
import { HTTPError } from 'ky';

export const menuService = {
  async getMenuByBranchId(branchId: string): Promise<BranchMenuData | null> {
    if (!branchId || !branchId.trim()) return null;

    try {
      const response = await ecommerceHttp
        .get(`branches/${branchId.trim()}/menu`)
        .json<BranchMenuResponse | any>();

      if (!response) return null;
      if (response.data) return response.data as BranchMenuData;
      if (response.id && response.categories) return response as BranchMenuData;
      return null;
    } catch (err: any) {
      if (err instanceof HTTPError && err.response?.status === 404) {
        return null;
      }
      console.warn(`Menu API notice for branch ${branchId}:`, err?.message || err);
      return null;
    }
  },
};

export default menuService;
