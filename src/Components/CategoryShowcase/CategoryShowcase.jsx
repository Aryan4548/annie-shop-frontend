import React, { useEffect, useState } from 'react';
import './CategoryShowcase.css';
import axios from 'axios';
import Item from '../Items/Item';

const CategoryShowcase = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://annieshop-backend.onrender.com/allproducts')
      .then(res => {
        const all = res.data;
        setProducts(all);

        const uniqueCategories = [...new Set(all.map(p => p.category))];
        setCategories(uniqueCategories);

        const initial = {};
        uniqueCategories.forEach(cat => (initial[cat] = 6));
        setVisibleCount(initial);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleShowMore = (category) => {
    setVisibleCount(prev => ({
      ...prev,
      [category]: prev[category] + 10
    }));
  };

  return (
    <div className="category-showcase">
      {categories.map((category, index) => {
        const items = products.filter(item => item.category === category);
        const visibleItems = items.slice(0, visibleCount[category] || 6);

        return (
          <div className="category-block" key={index}>
            <h2>{category}</h2>
            <div className="category-items">
              {visibleItems.map((item, i) => (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  images={item.images} // ✅ Pass full array
                  new_price={item.new_price}
                  old_price={item.old_price}
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
