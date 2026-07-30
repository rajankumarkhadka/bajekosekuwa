/**
 * Standardized generic API response envelope wrapper.
 */
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data: T;
  readonly message?: string;
  readonly errors?: unknown | null;
}

/**
 * Standardized generic paginated response structure.
 */
export interface PaginatedData<T> {
  readonly count?: number;
  readonly next?: string | null;
  readonly previous?: string | null;
  readonly results?: T[];
  readonly items?: T[];
  readonly page?: number;
  readonly page_size?: number;
  readonly total?: number;
}

export type PaginatedApiResponse<T> = ApiResponse<PaginatedData<T> | T[]>;
