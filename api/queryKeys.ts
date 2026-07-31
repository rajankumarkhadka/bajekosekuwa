import type { GetArticlesQueryParams, GetCategoriesQueryParams, GetBranchGalleryQueryParams, GetVendorBranchesQueryParams } from '@/types';

export const queryKeys = {
  articles: {
    all: ['articles'] as const,
    list: (params?: GetArticlesQueryParams) => ['articles', 'list', params] as const,
    detail: (slug: string) => ['articles', 'detail', slug] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: (params?: GetCategoriesQueryParams) => ['categories', 'list', params] as const,
  },
  gallery: {
    all: ['galleries'] as const,
    byBranch: (branchId?: string | null, params?: GetBranchGalleryQueryParams) =>
      ['galleries', 'branch', branchId, params] as const,
  },
  vendorBranches: {
    all: ['vendor-branches'] as const,
    list: (params?: GetVendorBranchesQueryParams) => ['vendor-branches', 'list', params] as const,
    detail: (id: string) => ['vendor-branches', 'detail', id] as const,
  },
  menu: {
    all: ['branch-menu'] as const,
    byBranch: (branchId?: string | null) => ['branch-menu', branchId] as const,
  },
};

export default queryKeys;
