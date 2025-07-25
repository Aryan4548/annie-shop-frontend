import React, { useEffect, useState } from 'react';
import Item from '../Items/Item';
import './Collection.css';
import axios from 'axios';

const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'priceLowHigh' },
  { label: 'Price: High to Low', value: 'priceHighLow' },
  { label: 'Alphabetical: A-Z', value: 'az' },
  { label: 'Alphabetical: Z-A', value: 'za' },
];

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    axios.get('http://localhost:4000/allproducts')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching all products:", err));
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
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

  return (
    <div className="collection-page">
      <div className="collection-header">
        <h1>All Collection</h1>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {sortOptions.map((option, index) => (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="collection-grid">
        {sortedProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            images={item.images} // ✅ Pass full array for Item.jsx
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
