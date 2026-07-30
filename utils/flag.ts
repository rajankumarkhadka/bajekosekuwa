
export function formatFlagUrl(url?: string | null): string {
  if (!url) return 'https://flagcdn.com/w160/np.png';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/')) {
    return `https://auth.bajekoshop.com${url}`;
  }
  return url;
}
