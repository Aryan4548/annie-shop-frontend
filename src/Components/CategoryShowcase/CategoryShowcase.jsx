import React, { useContext, useEffect, useMemo, useState } from 'react';
import './CategoryShowcase.css';
import Item from '../Items/Item';
import { ShopContext } from '../../Context/ShopContext';

const CategoryShowcase = () => {
  const [visibleCount, setVisibleCount] = useState({});
  const { all_products: products = [] } = useContext(ShopContext);

  const categories = useMemo(
    () => [...new Set(products.map((product) => String(product.category || '').trim()).filter(Boolean))],
    [products]
  );

  useEffect(() => {
    setVisibleCount((previous) => {
      const next = {};

      categories.forEach((category) => {
        next[category] = previous[category] || 6;
      });

      return next;
    });
  }, [categories]);

  const handleShowMore = (category) => {
    setVisibleCount((prev) => ({
      ...prev,
      [category]: (prev[category] || 6) + 10
    }));
  };

  return (
    <div className="category-showcase">
      {categories.map((category) => {
        const items = products.filter((item) => item.category === category);
        const visibleItems = items.slice(0, visibleCount[category] || 6);

        return (
          <div className="category-block" key={category}>
            <h2>{category}</h2>
            <div className="category-items">
              {visibleItems.map((item) => (
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
                  premiumOnly={item.premiumOnly}
                />
              ))}
            </div>
            {visibleItems.length < items.length && (
              <button
                className="show-more-btn"
                onClick={() => handleShowMore(category)}
              >
                Show More
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryShowcase;
