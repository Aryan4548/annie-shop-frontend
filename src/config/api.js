const DEFAULT_LOCAL_API_URL = 'http://localhost:4000';
const DEFAULT_PRODUCTION_API_URL = 'https://annieshop-backend.onrender.com';
const isBrowser = typeof window !== 'undefined';
const isLocalHost =
  isBrowser &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (isLocalHost ? DEFAULT_LOCAL_API_URL : DEFAULT_PRODUCTION_API_URL);

const normalizeBaseUrl = (value) => String(value || '').replace(/\/+$/, '');

export const getImageFilename = (url) => {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return '';
  }

  try {
    const parsedUrl = new URL(trimmedUrl);
    return parsedUrl.pathname.split('/').filter(Boolean).pop() || '';
  } catch (error) {
    return trimmedUrl.split('/').filter(Boolean).pop() || '';
  }
};

export const getImageFallbackUrl = (url) => {
  const filename = getImageFilename(url);
  return filename ? `/images/${filename}` : '';
};

export const handleProductImageError = (event, originalUrl) => {
  const image = event.currentTarget;
  const fallbackUrl = getImageFallbackUrl(originalUrl || image.getAttribute('src') || '');

  if (fallbackUrl && image.dataset.fallbackApplied !== 'true') {
    image.dataset.fallbackApplied = 'true';
    image.src = fallbackUrl;
    return;
  }

  image.onerror = null;
};

export const resolveApiAssetUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const trimmedUrl = url.trim();
  const apiBaseUrl = normalizeBaseUrl(API_BASE_URL);

  if (trimmedUrl.startsWith('/')) {
    return `${apiBaseUrl}${trimmedUrl}`;
  }

  try {
    const parsedUrl = new URL(trimmedUrl);
    const isBackendAsset = parsedUrl.pathname.startsWith('/images/');
    const isLocalAsset =
      parsedUrl.hostname === 'localhost' ||
      parsedUrl.hostname === '127.0.0.1';

    if (isBackendAsset && isLocalAsset) {
      return `${apiBaseUrl}${parsedUrl.pathname}`;
    }
  } catch (error) {
    return trimmedUrl;
  }

  return trimmedUrl;
};

export const normalizeApiProduct = (product = {}) => ({
  ...product,
  image: resolveApiAssetUrl(product.image),
  profileImage: resolveApiAssetUrl(product.profileImage),
  images: Array.isArray(product.images)
    ? product.images.map((image) => resolveApiAssetUrl(image))
    : product.images,
});

export const normalizeApiProducts = (items = []) =>
  Array.isArray(items) ? items.map((item) => normalizeApiProduct(item)) : [];

export default API_BASE_URL;
