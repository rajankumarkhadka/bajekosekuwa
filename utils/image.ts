/**
 * Pure utility helper to clean and sanitize image URLs.
 * Automatically strips expired AWS S3 presigned query parameters
 * (`?X-Amz-Algorithm=...&X-Amz-Signature=...`) that cause HTTP 403 Forbidden errors.
 *
 * Safe to call in both Next.js Server Components and Client Components.
 */
export function cleanImageUrl(url?: string | null, fallback: string = '/images/icon.jpg'): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }

  const trimmed = url.trim();

  try {
    const parsed = new URL(trimmed);
    // Strip expired AWS S3 presigned parameters
    if (
      parsed.searchParams.has('X-Amz-Algorithm') ||
      parsed.searchParams.has('X-Amz-Signature') ||
      parsed.searchParams.has('X-Amz-Credential')
    ) {
      return `${parsed.origin}${parsed.pathname}`;
    }
    return trimmed;
  } catch {
    // If URL parsing fails, strip query string manually
    return trimmed.split('?')[0] || fallback;
  }
}
