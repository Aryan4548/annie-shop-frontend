import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';
import './SearchPage.css'; // optional styling

const SearchPage = () => {
  const { all_products } = useContext(ShopContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = all_products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, all_products]);

  return (
    <div className="search-page">
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <div className="search-grid">
          {results.map(product => (
            <Item key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchPage;
