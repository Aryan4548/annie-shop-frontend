import React, { useRef } from 'react';
import Hero from '../Components/Hero/Hero';
import CategoryRow from '../Components/CategoryRow/CategoryRow';
import Popular from '../Components/Popular/Popular';
import NewCollections from '../Components/NewCollections/NewCollections';
import Newsletter from '../Components/NewsLetter/Newsletter';

const Shop = () => {
  const trendingRef = useRef(null);

  return (
    <div>
      <Hero scrollRef={trendingRef} />
      <CategoryRow />
      <div ref={trendingRef}>
        <Popular />
      </div>
      <NewCollections />
      <Newsletter />
    </div>
  );
};

export default Shop;
