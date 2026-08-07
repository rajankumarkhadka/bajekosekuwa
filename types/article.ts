import { ApiResponse, PaginatedData } from './api';

export interface ArticleItem {
  readonly id?: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt?: string;
  readonly content: string;
  readonly featured_image?: string;
  readonly status?: 'draft' | 'published' | string;
  readonly category_ids?: string[];
  readonly branch_ids?: string[];
  readonly seo_title?: string;
  readonly seo_description?: string;
  readonly seo_image?: string;
  readonly created_by?: string;
  readonly updated_by?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly published_at?: string;
}

export interface GetArticlesQueryParams {
  category?: string;
  category_id?: string;
  branch_id?: string;
  outlet_id?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

export type ArticlePaginatedData = PaginatedData<ArticleItem>;
export type ArticleListResponse = ApiResponse<ArticlePaginatedData | ArticleItem[]>;
