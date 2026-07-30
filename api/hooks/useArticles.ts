import { useQuery } from '@tanstack/react-query';
import articleService from '@/api/services/article.service';
import { queryKeys } from '@/api/queryKeys';
import type { ArticleItem, GetArticlesQueryParams } from '@/types';

export function useArticles(params?: GetArticlesQueryParams) {
  return useQuery<ArticleItem[]>({
    queryKey: queryKeys.articles.list(params),
    queryFn: () => articleService.getArticles(params),
    staleTime: 5 * 60 * 1000,
  });
}
