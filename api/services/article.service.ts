import { cmsHttp, cleanParams } from '@/libs/http';
import type {
  ArticleItem,
  GetArticlesQueryParams,
} from '@/types';

export const articleService = {
  async getArticles(params?: GetArticlesQueryParams): Promise<ArticleItem[]> {
    try {
      const response = await cmsHttp
        .get('articles', { searchParams: cleanParams(params as Record<string, unknown>) })
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
      console.warn('Articles API warning:', err);
      return [];
    }
  },

  async getArticleBySlug(slug: string): Promise<ArticleItem | null> {
    if (!slug) return null;
    const items = await this.getArticles();
    return items.find((item) => item.slug === slug || item.id === slug) || null;
  },
};

export default articleService;
