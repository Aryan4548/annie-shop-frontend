import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { scrollPageToTop } from '../../utils/scroll';

const Item = (props) => {
  const badge = props.premiumOnly ? 'Premium' : (props.preorder ? 'Pre Order' : (props.popular ? 'Popular' : ''));

  return (
    <Link
      to={`/product/${props.id}`}
      onClick={scrollPageToTop}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className='item'>
        {badge ? <span className="item-badge">{badge}</span> : null}
        <div className="item-media">
          <img
            src={props.images?.[0] || ""}
            alt={props.name}
          />
        </div>
        <div className="item-footer">
          <div className="item-copy">
            <p className="item-title">{props.category || 'Collection'}</p>
            <h3 className="item-name" title={props.name}>{props.name}</h3>
          </div>
          <div className="item-prices">
            <div className="item-price-new">Rs. {Number(props.new_price || 0).toLocaleString('en-IN')}</div>
            {Number(props.old_price || 0) > 0 ? (
              <div className="item-price-old">Rs. {Number(props.old_price || 0).toLocaleString('en-IN')}</div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
