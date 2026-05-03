const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const normalizeBaseUrl = (value) => String(value || '').replace(/\/+$/, '');

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
