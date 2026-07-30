import ky from 'ky';

export function cleanParams<T extends Record<string, unknown>>(params?: T): Record<string, string> | undefined {
  if (!params) return undefined;

  const cleaned: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = String(value);
    }
  });

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

const defaultOptions = {
  timeout: 10000,
  retry: {
    limit: 1,
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
    methods: ['get', 'post', 'put', 'delete', 'patch'],
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  hooks: {
    beforeRequest: [
      ({ request }: { request: Request }) => {
        if (typeof window !== 'undefined') {
          const token =
            localStorage.getItem('token') ||
            localStorage.getItem('accessToken') ||
            localStorage.getItem('auth_token');

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        } else if (process.env.NEXT_PUBLIC_API_TOKEN) {
          request.headers.set(
            'Authorization',
            `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          );
        }
      },
    ],
    afterResponse: [
      async ({ request, response }: { request: Request; response: Response }) => {
        if (!response.ok) {
          const errorData = await response.clone().json().catch(() => ({}));
          console.warn('HTTP Request Failed:', {
            url: request.url,
            status: response.status,
            error: errorData,
          });
        }
        return response;
      },
    ],
  },
};

/**
 * Standard HTTP Client for main backend API endpoints.
 */
export const http = ky.create({
  prefix: process.env.NEXT_PUBLIC_API_URL || 'https://auth.bajekoshop.com/api/v1/public/',
  ...defaultOptions,
});

/**
 * Standard HTTP Client for CMS API endpoints (Bajeko Sekuwa CMS).
 */
export const cmsHttp = ky.create({
  prefix: process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.bajekoshop.com/api/v1/public',
  ...defaultOptions,
});

export default http;
