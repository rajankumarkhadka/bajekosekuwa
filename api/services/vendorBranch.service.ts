import { http, cleanParams } from '@/libs/http';
import type {
  VendorBranch,
  GetVendorBranchesQueryParams,
} from '@/types';

export const vendorBranchService = {
  async getBranches(params?: GetVendorBranchesQueryParams): Promise<VendorBranch[]> {
    try {
      const res = await http
        .get('branches', {
          searchParams: cleanParams(params as Record<string, unknown>),
        })
        .json<any>();

      const dataContainer = res?.data ?? res;

      if (Array.isArray(dataContainer)) {
        return dataContainer;
      }

      if (dataContainer && typeof dataContainer === 'object') {
        if (Array.isArray(dataContainer.results)) {
          return dataContainer.results;
        }
        if (Array.isArray(dataContainer.items)) {
          return dataContainer.items;
        }
      }

      return [];
    } catch (err) {
      console.warn('Failed to fetch vendor branches:', err);
      return [];
    }
  },

  async getBranchById(id: string): Promise<VendorBranch> {
    if (!id) throw new Error('Branch ID is required');

    const res = await http
      .get(`branches/${id}`)
      .json<any>();

    const data = res?.data ?? res;
    return data;
  },

  async getBranchByName(identifier: string): Promise<VendorBranch | null> {
    if (!identifier || identifier.trim() === '') return null;
    const cleanId = identifier.trim();

    try {
      // 1. Attempt direct single detail fetch: /branches/:branname/
      const res = await http
        .get(`branches/${encodeURIComponent(cleanId)}`)
        .json<any>();

      const data = res?.data ?? res;
      if (data && typeof data === 'object' && !Array.isArray(data) && (data.id || data.name)) {
        return data as VendorBranch;
      }
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        return data.results[0];
      }
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }
      return null;
    } catch (err: any) {
      // 2. If single endpoint returns 404 or fails, fallback to paginated list search / filtering
      try {
        const listRes = await http
          .get('branches', {
            searchParams: cleanParams({ search: cleanId }),
          })
          .json<any>();

        const listData = listRes?.data ?? listRes;
        const items: VendorBranch[] = Array.isArray(listData)
          ? listData
          : Array.isArray(listData?.results)
          ? listData.results
          : Array.isArray(listData?.items)
          ? listData.items
          : [];

        if (items.length > 0) {
          const lowerId = cleanId.toLowerCase();
          const matched = items.find(
            (b) =>
              b.id === cleanId ||
              b.name.toLowerCase() === lowerId ||
              b.name.toLowerCase().replace(/\s+/g, '-') === lowerId
          );
          return matched || items[0];
        }
      } catch {
        return null;
      }
      return null;
    }
  },
};

export default vendorBranchService;

