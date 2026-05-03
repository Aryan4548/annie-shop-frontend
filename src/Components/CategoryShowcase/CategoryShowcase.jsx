import React, { useEffect, useState } from 'react';
import './CategoryShowcase.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL, { normalizeApiProducts } from '../../config/api';
import { fallbackHighlightedCategories, resolveCategorySlug } from '../../utils/categories';
import { scrollPageToTop } from '../../utils/scroll';
import { handleProductImageError } from '../../utils/image';

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    axios.get(`${API_BASE_URL}/categories`)
      .then((res) => {
        if (isMounted) {
          const nextCategories = res.data?.length
            ? normalizeApiProducts(res.data)
            : fallbackHighlightedCategories;
          setCategories(nextCategories);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error fetching categories:', err);
          setCategories(fallbackHighlightedCategories);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryClick = (category) => {
    const slug = resolveCategorySlug(category);
    scrollPageToTop();
    navigate(`/allproducts?category=${slug}`);
    window.setTimeout(scrollPageToTop, 0);
  };

  return (
    <section className="category-showcase">
      <div className="category-showcase-head">
        <span>Browse collections</span>
        <h2>Choose a category to explore the matching products.</h2>
      </div>

      <div className="category-showcase-grid">
        {categories.map((category) => (
          <button
            key={category.id || category.slug || category.name}
            type="button"
            className="category-showcase-card"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="category-showcase-image">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  onError={(event) => handleProductImageError(event, category.image || '')}
                />
              ) : (
                <span>{category.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="category-showcase-copy">
              <p>{category.name}</p>
              <small>View products</small>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
