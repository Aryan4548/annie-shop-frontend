import React, { useContext, useMemo } from 'react';
import './NewCollections.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { scrollPageToTop } from '../../utils/scroll';
import { handleProductImageError } from '../../utils/image';

const NewCollections = () => {
  const { all_products: allProducts = [] } = useContext(ShopContext);
  const collectionItems = useMemo(
    () => [...allProducts].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).slice(0, 10),
    [allProducts]
  );

  return (
    <section className="new-collections">
      <div className="new-collections-shell">
        <div className="new-collections-heading">
          <h1>NEW COLLECTIONS</h1>
          <hr />
        </div>

        <div className="new-collections-grid">
          {collectionItems.length > 0 ? collectionItems.map((item) => (
            <article key={item.id} className="new-collections-card">
              <span className="new-collections-badge">New</span>
              <Link to={`/product/${item.id}`} className="new-collections-media" onClick={scrollPageToTop}>
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  onError={(event) => handleProductImageError(event, item.images?.[0] || '')}
                />
              </Link>
              <div className="new-collections-footer">
                <div className="new-collections-copy">
                  <p className="new-collections-title">{item.category}</p>
                  <h3 className="new-collections-name" title={item.name}>{item.name}</h3>
                </div>
                <div className="new-collections-prices">
                  <span className="new-collections-price">Rs. {Number(item.new_price || 0).toLocaleString('en-IN')}</span>
                  <span className="new-collections-old-price">Rs. {Number(item.old_price || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </article>
          )) : (
            <p className="new-collections-empty">No newly added products available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewCollections;
