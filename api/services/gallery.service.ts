import { cmsHttp, cleanParams } from '@/libs/http';
import type {
  BranchGalleryItem,
  GetBranchGalleryQueryParams,
} from '@/types';

export const galleryService = {
  async getGalleries(branchId?: string | null): Promise<any[]> {
    try {
      const validBranchId = branchId?.trim();
      const searchParams = validBranchId ? cleanParams({ branch_id: validBranchId }) : undefined;
      const response = await cmsHttp
        .get('galleries', { searchParams })
        .json<any>();

      if (!response) return [];
      if (Array.isArray(response)) return response;
      if (Array.isArray(response.results)) return response.results;
      if (Array.isArray(response.data)) return response.data;
      if (Array.isArray(response.data?.results)) return response.data.results;
      if (Array.isArray(response.items)) return response.items;
      if (Array.isArray(response.data?.items)) return response.data.items;
      return [];
    } catch (err) {
      console.warn('CMS Galleries API warning:', err);
      return [];
    }
  },

  async getGalleryByBranchId(
    branchId?: string | null,
    params?: GetBranchGalleryQueryParams
  ): Promise<BranchGalleryItem[]> {
    const validBranchId = branchId?.trim();
    const rawGalleries = await this.getGalleries(validBranchId);

    const items: BranchGalleryItem[] = [];

    rawGalleries.forEach((gallery: any) => {
      // Case 1: Gallery folder containing `images` array
      if (gallery.images && Array.isArray(gallery.images) && gallery.images.length > 0) {
        gallery.images.forEach((img: any) => {
          items.push({
            id: img.id || `${gallery.id}-${items.length}`,
            branch_id: validBranchId || img.branch_id || gallery.branch_id || undefined,
            title: img.caption || img.title || gallery.name || 'Gallery Item',
            description: img.description || gallery.description || gallery.name || '',
            image: img.image || img.image_url || img.url || '',
            image_url: img.image_url || img.image || img.url || '',
            category: gallery.name ? gallery.name.trim() : (img.category || 'General'),
            created_at: img.created_at || gallery.created_at,
            updated_at: img.updated_at || gallery.updated_at,
          });
        });
      }
      // Case 2: Gallery item is a single image object
      else if (gallery.image || gallery.image_url || gallery.url) {
        items.push({
          id: gallery.id || `gallery-${items.length}`,
          branch_id: validBranchId || gallery.branch_id || undefined,
          title: gallery.title || gallery.name || gallery.caption || 'Gallery Item',
          description: gallery.description || gallery.name || '',
          image: gallery.image || gallery.image_url || gallery.url || '',
          image_url: gallery.image_url || gallery.image || gallery.url || '',
          category: gallery.category || gallery.name || 'General',
          created_at: gallery.created_at,
          updated_at: gallery.updated_at,
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
