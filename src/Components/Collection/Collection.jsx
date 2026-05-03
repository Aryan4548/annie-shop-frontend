import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Item from '../Items/Item';
import './Collection.css';
import API_BASE_URL, { normalizeApiProducts } from '../../config/api';
import { scrollPageToTop } from '../../utils/scroll';
import { ShopContext } from '../../Context/ShopContext';
import {
  fallbackHighlightedCategories,
  isAllCategory,
  matchesCategory,
  normalizeText,
} from '../../utils/categories';

const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'priceLowHigh' },
  { label: 'Price: High to Low', value: 'priceHighLow' },
  { label: 'Alphabetical: A-Z', value: 'az' },
  { label: 'Alphabetical: Z-A', value: 'za' },
];

const allCategory = {
  id: 0,
  name: 'All Products',
  slug: 'all-products',
  image: '',
  highlighted: true,
  displayOrder: -1,
};

const Collection = () => {
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || allCategory.slug;
  const { all_products: products = [] } = useContext(ShopContext);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${API_BASE_URL}/highlightedcategories`)
      .then((res) => {
        if (isMounted) {
          setCategories(res.data?.length ? normalizeApiProducts(res.data) : fallbackHighlightedCategories);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error fetching highlighted categories:', err);
          setCategories(fallbackHighlightedCategories);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    scrollPageToTop();
  }, [activeCategory]);

  const availableCategories = useMemo(() => [allCategory, ...categories], [categories]);

  const currentCategory =
    availableCategories.find(
      (category) => normalizeText(category.slug || category.name) === normalizeText(activeCategory)
    ) || allCategory;

  const visibleProducts = useMemo(() => {
    const filtered = isAllCategory(currentCategory)
      ? products
      : products.filter((product) => matchesCategory(product, currentCategory));

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'priceLowHigh':
          return a.new_price - b.new_price;
        case 'priceHighLow':
          return b.new_price - a.new_price;
        case 'az':
          return a.name.localeCompare(b.name);
        case 'za':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [currentCategory, products, sortBy]);

  const handleCategoryChange = (categorySlug) => {
    scrollPageToTop();
    setSearchParams(categorySlug === allCategory.slug ? {} : { category: categorySlug });
  };

  return (
    <div className="collection-page">
      <div className="catalog-category-strip">
        {availableCategories.map((category) => (
          <button
            key={category.id || category.slug}
            type="button"
            className={`catalog-category-button ${
              normalizeText(activeCategory) === normalizeText(category.slug || category.name) ? 'active' : ''
            }`}
            onClick={() => handleCategoryChange(category.slug)}
          >
            <div className="catalog-category-image-wrap">
              {category.image ? (
                <img src={category.image} alt={category.name} />
              ) : (
                <span className="catalog-category-fallback">{category.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="collection-header">
        <div>
          <h1>{currentCategory?.name || 'All Products'}</h1>
          <p className="collection-subtitle">{visibleProducts.length} products shown</p>
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {sortOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="collection-grid">
        {visibleProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            images={item.images}
            category={item.category}
            new_price={item.new_price}
            old_price={item.old_price}
            popular={item.popular}
            preorder={item.preorder}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
