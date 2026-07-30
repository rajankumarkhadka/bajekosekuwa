import { ApiResponse, PaginatedData } from './api';

export interface ArticleAuthor {
  readonly id?: string;
  readonly name?: string;
  readonly profile_picture?: string | null;
}

export interface FeaturedImage {
  readonly url: string;
  readonly alt?: string;
}

export interface CategoryObj {
  readonly id?: string;
  readonly name?: string;
  readonly slug?: string;
}

export interface ArticleItem {
  readonly id?: string;
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly excerpt?: string;
  readonly summary?: string;
  readonly featured_image?: FeaturedImage | string;
  readonly image?: string;
  readonly thumbnail?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly published_at?: string;
  readonly author?: ArticleAuthor | string;
  readonly category?: CategoryObj | string;
  readonly category_id?: string;
  readonly is_global?: boolean;
}

export interface GetArticlesQueryParams {
  category?: string;
  category_id?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

export type ArticlePaginatedData = PaginatedData<ArticleItem>;
export type ArticleListResponse = ApiResponse<ArticlePaginatedData | ArticleItem[]>;
