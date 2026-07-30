import { useQuery } from '@tanstack/react-query';
import categoryService from '@/api/services/category.service';
import { queryKeys } from '@/api/queryKeys';
import type { CategoryItem, GetCategoriesQueryParams } from '@/types';

export function useCategories(params?: GetCategoriesQueryParams) {
  return useQuery<CategoryItem[]>({
    queryKey: queryKeys.categories.list(params),
    queryFn: () => categoryService.getCategories(params),
    staleTime: 5 * 60 * 1000,
  });
}
