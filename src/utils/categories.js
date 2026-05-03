export const normalizeText = (value = '') =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const fallbackHighlightedCategories = [
  { id: 1, name: '999 Store', slug: '999-store', image: '', highlighted: true, displayOrder: 0 },
  { id: 2, name: 'Katanas and weapons', slug: 'katanas-and-weapons', image: '', highlighted: true, displayOrder: 1 },
  { id: 3, name: 'Pre Orders', slug: 'pre-orders', image: '', highlighted: true, displayOrder: 2 },
  { id: 4, name: 'Japanese Og figures', slug: 'japanese-og-figures', image: '', highlighted: true, displayOrder: 3 },
  { id: 5, name: 'Foundjoy and zd toys', slug: 'foundjoy-and-zd-toys', image: '', highlighted: true, displayOrder: 4 },
  { id: 6, name: 'Premiums', slug: 'premiums', image: '', highlighted: true, displayOrder: 5 },
  { id: 7, name: 'Manga & Comics', slug: 'manga-and-comics', image: '', highlighted: true, displayOrder: 6 },
];

export const resolveCategorySlug = (category) =>
  normalizeText(category?.slug || category?.name || category);

export const isAllCategory = (category) => {
  const token = resolveCategorySlug(category);
  return ['all', 'all-products'].includes(token);
};

export const isPreorderCategory = (category) => {
  const token = resolveCategorySlug(category);
  return token.includes('pre-order') || token.includes('preorder');
};

export const matchesCategory = (product, category) => {
  if (isAllCategory(category)) {
    return true;
  }

  if (isPreorderCategory(category)) {
    return Boolean(product?.preorder);
  }

  const categoryName = normalizeText(category?.name || category);
  const categorySlug = resolveCategorySlug(category);
  const productCategory = normalizeText(product?.category || '');
  const productSubcategory = normalizeText(product?.subcategory || '');

  return (
    productCategory === categorySlug ||
    productCategory === categoryName ||
    productSubcategory === categorySlug ||
    productSubcategory === categoryName
  );
};
