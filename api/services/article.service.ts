import { cmsHttp, cleanParams } from '@/libs/http';
import type {
  ArticleItem,
  ArticleListResponse,
  GetArticlesQueryParams,
} from '@/types';

export const articleService = {
  async getArticles(params?: GetArticlesQueryParams): Promise<ArticleItem[]> {
    try {
      const response = await cmsHttp
        .get('articles', { searchParams: cleanParams(params as Record<string, unknown>) })
        .json<ArticleListResponse>();

      if (!response.data) return [];
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return response.data.results || response.data.items || [];
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
