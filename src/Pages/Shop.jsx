import React, { useRef } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import NewCollections from '../Components/NewCollections/NewCollections';
import Newsletter from '../Components/NewsLetter/Newsletter';

const Shop = () => {
  const trendingRef = useRef(null); // 👈 create ref for Trending section

  return (
    <div>
      <Hero scrollRef={trendingRef} /> {/* 👈 pass to Hero */}
      <div ref={trendingRef}>         {/* 👈 attach to Popular section */}
        <Popular />
      </div>
      <NewCollections />
      <Newsletter />
      
    </div>
  );
};

export default Shop;
