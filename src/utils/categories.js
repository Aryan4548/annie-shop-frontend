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

export const isAllCategory = (category) => {
  const token = normalizeText(category?.slug || category?.name || category);
  return ['all', 'all-products', '999-store', '999'].includes(token);
};

export const isPreorderCategory = (category) => {
  const token = normalizeText(category?.slug || category?.name || category);
  return token.includes('pre-order') || token.includes('preorder');
};

const toKeywordSet = (value = '') =>
  normalizeText(value)
    .split('-')
    .filter((token) => token && !['and', 'the', 'for'].includes(token));

export const matchesCategory = (product, category) => {
  if (isAllCategory(category)) {
    return true;
  }

  if (isPreorderCategory(category)) {
    return Boolean(product?.preorder);
  }

  const categoryName = normalizeText(category?.name || category);
  const categorySlug = normalizeText(category?.slug || category?.name || category);
  const productCategory = normalizeText(product?.category || '');
  const productSubcategory = normalizeText(product?.subcategory || '');
  const productName = normalizeText(product?.name || '');

  const categoryTokens = toKeywordSet(`${categoryName}-${categorySlug}`);
  const productTokens = [
    ...toKeywordSet(productCategory),
    ...toKeywordSet(productSubcategory),
    ...toKeywordSet(productName),
  ];

  const hasTokenOverlap = categoryTokens.some((token) => productTokens.includes(token));
  const hasLooseTextMatch = [
    productCategory,
    productSubcategory,
    productName,
  ].some(
    (value) =>
      value.includes(categorySlug) ||
      value.includes(categoryName) ||
      categorySlug.includes(value) ||
      categoryName.includes(value)
  );

  return (
    productCategory === categorySlug ||
    productCategory === categoryName ||
    productSubcategory === categorySlug ||
    productSubcategory === categoryName ||
    hasTokenOverlap ||
    hasLooseTextMatch
  );
};
