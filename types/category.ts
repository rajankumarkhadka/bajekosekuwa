import { ApiResponse, PaginatedData } from './api';

export interface CategoryItem {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
}

export interface GetCategoriesQueryParams {
  search?: string;
  page?: number;
  page_size?: number;
}

export type CategoryPaginatedData = PaginatedData<CategoryItem>;
export type CategoryListResponse = ApiResponse<CategoryPaginatedData | CategoryItem[]>;
