import { cmsHttp, cleanParams } from '@/libs/http';
import type {
  CategoryItem,
  CategoryListResponse,
  GetCategoriesQueryParams,
} from '@/types';

export const categoryService = {
  async getCategories(params?: GetCategoriesQueryParams): Promise<CategoryItem[]> {
    try {
      const response = await cmsHttp
        .get('categories', { searchParams: cleanParams(params as Record<string, unknown>) })
        .json<CategoryListResponse>();

      if (!response.data) return [];
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return response.data.results || response.data.items || [];
    } catch (err) {
      console.warn('Categories API warning:', err);
      return [];
    }
  },
};

export default categoryService;
