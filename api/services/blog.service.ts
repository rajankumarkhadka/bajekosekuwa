import http from '@/libs/http';

export interface BlogItem {
  id: string;
  branch_id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  published_at?: string;
  created_at?: string;
}

export interface BlogListResponse {
  success: boolean;
  data: BlogItem[];
  errors: unknown | null;
}

export const blogService = {
  async getBlogsByBranchId(
    branchId: string,
    params?: Record<string, string>
  ): Promise<BlogItem[]> {
    if (!branchId) throw new Error('Branch ID is required');

    try {
      const res = await http
        .get(`branches/${branchId}/blogs`, { searchParams: params })
        .json<BlogListResponse>();

      return res.data || [];
    } catch {
      return [];
    }
  },
};

export default blogService;
