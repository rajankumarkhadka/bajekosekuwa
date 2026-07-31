import { cmsHttp, cleanParams } from '@/libs/http';
import type {
  CategoryItem,
  GetCategoriesQueryParams,
} from '@/types';

export const categoryService = {
  async getCategories(params?: GetCategoriesQueryParams): Promise<CategoryItem[]> {
    try {
      const response = await cmsHttp
        .get('categories', { searchParams: cleanParams(params as Record<string, unknown>) })
        .json<any>();

      if (!response) return [];
      if (Array.isArray(response)) {
        return response;
      }
      if (Array.isArray(response.results)) {
        return response.results;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response.data?.results)) {
        return response.data.results;
      }
      if (Array.isArray(response.items)) {
        return response.items;
      }
      if (Array.isArray(response.data?.items)) {
        return response.data.items;
      }
      return [];
    } catch (err) {
      console.warn('Categories API warning:', err);
      return [];
    }
  },
};

export default categoryService;
