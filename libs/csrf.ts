/**
 * Utility module for handling CSRF Security Tokens across form submissions and API requests.
 */

const CSRF_STORAGE_KEY = 'bajeko_csrf_token';
const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

/**
 * Generates a cryptographically random hexadecimal string for CSRF verification.
 */
function generateRandomToken(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Obtains or initializes the CSRF token for the current user session.
 */
export function getCsrfToken(): string {
  if (typeof window === 'undefined') {
    return 'ssr_csrf_placeholder';
  }

  // 1. Try reading from cookie
  const match = document.cookie.match(new RegExp(`(?:^|; )${CSRF_COOKIE_NAME}=([^;]*)`));
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  // 2. Try reading from localStorage / sessionStorage
  let existingToken = sessionStorage.getItem(CSRF_STORAGE_KEY);
  if (!existingToken) {
    existingToken = generateRandomToken();
    sessionStorage.setItem(CSRF_STORAGE_KEY, existingToken);
    // Set non-sensitive cookie for XSRF header auto-injection
    document.cookie = `${CSRF_COOKIE_NAME}=${encodeURIComponent(existingToken)}; Path=/; SameSite=Strict`;
  }

  return existingToken;
}

/**
 * Returns HTTP header object containing CSRF token for secure requests.
 */
export function getCsrfHeaders(): Record<string, string> {
  const token = getCsrfToken();
  return {
    'X-CSRF-Token': token,
    'X-Requested-With': 'XMLHttpRequest',
  };
}
