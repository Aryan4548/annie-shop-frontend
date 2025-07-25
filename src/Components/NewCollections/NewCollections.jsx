import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Items/Item';
import axios from 'axios';

const NewCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/newcollections')
      .then(res => setCollections(res.data))
      .catch(err => console.error("Error fetching new collections:", err));
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className='collections'>
        {collections.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            images={item.images}  // 👈 Pass entire array to support flexible use
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
