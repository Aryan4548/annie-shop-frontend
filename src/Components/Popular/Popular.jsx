import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Items/Item';
import axios from 'axios';

const Popular = () => {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/popularproducts')
      .then(res => setPopularItems(res.data))
      .catch(err => console.error("Error fetching popular products:", err));
  }, []);

  return (
    <div className='popular'>
      <h1>Trending</h1>
      <hr />
      <div className="popular-item">
        {popularItems.length > 0 ? (
          popularItems.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              images={item.images}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>No trending products found.</p>
        )}
      </div>
    </div>
  );
};

export default Popular;
