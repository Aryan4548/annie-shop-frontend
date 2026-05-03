import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CategoryRow.css';
import API_BASE_URL, { normalizeApiProducts } from '../../config/api';
import { fallbackHighlightedCategories } from '../../utils/categories';
import { scrollPageToTop } from '../../utils/scroll';
import { handleProductImageError } from '../../utils/image';

const CategoryRow = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${API_BASE_URL}/highlightedcategories`)
      .then((response) => {
        if (isMounted) {
          const nextCategories = response.data?.length
            ? normalizeApiProducts(response.data)
            : fallbackHighlightedCategories;
          setCategories(nextCategories);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Failed to load highlighted categories:', error);
          setCategories(fallbackHighlightedCategories);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="category-row">
      <div className="category-row-track">
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            className="category-row-item"
            onClick={() => {
              scrollPageToTop();
              navigate(`/allproducts?category=${item.slug}`);
              window.setTimeout(scrollPageToTop, 0);
              window.setTimeout(scrollPageToTop, 80);
            }}
          >
            <div className="category-row-thumb">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(event) => handleProductImageError(event, item.image || '')}
                />
              ) : (
                <span>{item.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryRow;
