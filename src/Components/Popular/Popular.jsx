import React, { useContext, useMemo, useState } from 'react';
import './Popular.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { scrollPageToTop } from '../../utils/scroll';

const ITEMS_PER_PAGE = 6;
const SLIDE_DURATION = 280;

const Popular = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('slide-in-right');
  const { all_products: allProducts = [] } = useContext(ShopContext);
  const popularItems = useMemo(
    () => allProducts.filter((item) => item.popular),
    [allProducts]
  );

  const totalPages = Math.max(1, Math.ceil(popularItems.length / ITEMS_PER_PAGE));

  const visibleItems = useMemo(() => {
    const start = pageIndex * ITEMS_PER_PAGE;
    return popularItems.slice(start, start + ITEMS_PER_PAGE);
  }, [pageIndex, popularItems]);

  const changePage = (direction) => {
    if (popularItems.length <= ITEMS_PER_PAGE) return;

    setAnimationClass(direction === 'next' ? 'slide-out-left' : 'slide-out-right');

    window.setTimeout(() => {
      setPageIndex((prev) => {
        if (direction === 'next') {
          return (prev + 1) % totalPages;
        }

        return (prev - 1 + totalPages) % totalPages;
      });
      setAnimationClass(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
    }, SLIDE_DURATION);
  };

  return (
    <section className="popular">
      <div className="popular-shell">
        <div className="popular-topbar">
          <div className="popular-heading">
            <h1>Trending</h1>
            <hr />
          </div>

          <div className="popular-controls">
            <button
              type="button"
              className="popular-arrow"
              onClick={() => changePage('prev')}
              aria-label="Show previous trending items"
            >
              <span>&#8592;</span>
            </button>
            <span className="popular-counter">{String(pageIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
            <button
              type="button"
              className="popular-arrow"
              onClick={() => changePage('next')}
              aria-label="Show next trending items"
            >
              <span>&#8594;</span>
            </button>
          </div>
        </div>

        <div className="popular-viewport">
          <div key={`${pageIndex}-${animationClass}`} className={`popular-grid ${animationClass}`}>
            {visibleItems.length > 0 ? visibleItems.map((item) => (
              <article key={item.id} className="popular-card">
                <span className="popular-badge">Popular</span>
                <Link to={`/product/${item.id}`} className="popular-card-media" onClick={scrollPageToTop}>
                  <img src={item.images?.[0]} alt={item.name} />
                </Link>
                <div className="popular-card-footer">
                  <div className="popular-card-copy">
                    <p className="popular-title">{item.category}</p>
                    <h3 className="popular-card-name" title={item.name}>{item.name}</h3>
                  </div>
                  <div className="popular-card-prices">
                    <span className="popular-price">Rs. {Number(item.new_price || 0).toLocaleString('en-IN')}</span>
                    <span className="popular-old-price">Rs. {Number(item.old_price || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </article>
            )) : (
              <p className="popular-empty">No popular products available yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
