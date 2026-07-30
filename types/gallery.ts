import { ApiResponse } from './api';

export interface CmsGalleryImage {
  readonly id: string;
  readonly image: string;
  readonly caption?: string;
  readonly link?: string;
  readonly sort_order?: number;
}

export interface CmsGalleryItem {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly branch_ids?: string[];
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly images?: CmsGalleryImage[];
}

/**
 * Domain model representing a single gallery media item for a vendor branch/outlet.
 */
export interface BranchGalleryItem {
  readonly id: string;
  readonly branch_id?: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly image: string;
  readonly image_url?: string | null;
  readonly thumbnail?: string | null;
  readonly category?: string | null;
  readonly is_featured?: boolean;
  readonly created_at?: string;
  readonly updated_at?: string;
}

/**
 * Query parameters for filtering and paginating branch gallery items.
 */
export interface GetBranchGalleryQueryParams {
  category?: string;
  search?: string;
  page?: number;
  page_size?: number;
  is_featured?: boolean;
}

export type CmsGalleryListResponse = ApiResponse<CmsGalleryItem[]>;
export type BranchGalleryListResponse = ApiResponse<BranchGalleryItem[]>;
export type BranchGallerySingleResponse = ApiResponse<BranchGalleryItem>;
