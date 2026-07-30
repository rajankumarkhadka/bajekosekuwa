import { cmsHttp } from '@/libs/http';
import type {
  CmsGalleryItem,
  CmsGalleryListResponse,
  BranchGalleryItem,
  GetBranchGalleryQueryParams,
} from '@/types';

export const galleryService = {
  async getGalleries(): Promise<CmsGalleryItem[]> {
    try {
      const response = await cmsHttp
        .get('galleries')
        .json<CmsGalleryListResponse>();

      return response.data || [];
    } catch (err) {
      console.warn('CMS Galleries API warning:', err);
      return [];
    }
  },

  async getGalleryByBranchId(
    branchId?: string | null,
    params?: GetBranchGalleryQueryParams
  ): Promise<BranchGalleryItem[]> {
    const galleries = await this.getGalleries();
    const validBranchId = branchId?.trim();

    const filteredGalleries = validBranchId
      ? galleries.filter(
          (g) =>
            !g.branch_ids ||
            g.branch_ids.length === 0 ||
            g.branch_ids.includes(validBranchId)
        )
      : galleries;

    const items: BranchGalleryItem[] = [];

    filteredGalleries.forEach((gallery) => {
      if (gallery.images && Array.isArray(gallery.images)) {
        gallery.images.forEach((img) => {
          items.push({
            id: img.id,
            branch_id: validBranchId || undefined,
            title: img.caption || gallery.name,
            description: gallery.name,
            image: img.image,
            image_url: img.image,
            category: gallery.name ? gallery.name.trim() : 'General',
            created_at: gallery.created_at,
            updated_at: gallery.updated_at,
          });
        });
      }
    });

    if (params?.category && params.category !== 'All') {
      return items.filter(
        (item) =>
          item.category?.toLowerCase() === params.category?.toLowerCase()
      );
    }

    return items;
  },
};

export default galleryService;
