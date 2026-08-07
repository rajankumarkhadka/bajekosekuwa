
const CSRF_STORAGE_KEY = 'bajeko_csrf_token';
const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

function generateRandomToken(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getCsrfToken(): string {
  if (typeof window === 'undefined') {
    return 'ssr_csrf_placeholder';
  }

  const match = document.cookie.match(new RegExp(`(?:^|; )${CSRF_COOKIE_NAME}=([^;]*)`));
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  let existingToken = sessionStorage.getItem(CSRF_STORAGE_KEY);
  if (!existingToken) {
    existingToken = generateRandomToken();
    sessionStorage.setItem(CSRF_STORAGE_KEY, existingToken);
    document.cookie = `${CSRF_COOKIE_NAME}=${encodeURIComponent(existingToken)}; Path=/; SameSite=Strict`;
  }

  return existingToken;
}


export function getCsrfHeaders(): Record<string, string> {
  const token = getCsrfToken();
  return {
    'X-CSRF-Token': token,
    'X-Requested-With': 'XMLHttpRequest',
  };
}
