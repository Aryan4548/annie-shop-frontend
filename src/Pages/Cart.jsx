import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ShopContext } from '../Context/ShopContext';
import { useUser } from '../Context/UserContext';
import { handleProductImageError } from '../utils/image';
import '../Components/Cart/Cart.css';

const Cart = () => {
  const {
    cartItems = {},
    addtocart,
    removefromcart,
    getProductById,
    loading,
    all_products = [],
    canAccessProduct
  } = useContext(ShopContext);
  const { user } = useUser();

  const navigate = useNavigate();
  const [note, setNote] = useState('');

  if (loading && all_products.length === 0) {
    return <p style={{ padding: '2rem' }}>Loading your cart...</p>;
  }

  const cartProductIds = Object.keys(cartItems).filter(id => cartItems[id] > 0);

  const cartProducts = cartProductIds
    .map(id => {
      const product = getProductById(parseInt(id, 10));
      return product ? { ...product, quantity: cartItems[id] } : null;
    })
    .filter(Boolean);

  const totalAmount = cartProducts.reduce(
    (acc, product) => acc + product.new_price * product.quantity,
    0
  );
  const lockedPremiumItems = cartProducts.filter((product) => !canAccessProduct(product));

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h1 className="cart-title">Your cart</h1>
        <button className="cart-continue" onClick={() => navigate('/allproducts')}>
          Continue shopping
        </button>
      </div>

      <div className="cart-table-head">
        <span>Product</span>
        <span>Quantity</span>
        <span>Total</span>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartProducts.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <button className="cart-shop-btn" onClick={() => navigate('/allproducts')}>
                Start shopping
              </button>
            </div>
          ) : (
            cartProducts.map(product => (
              <div className="cart-row" key={product.id}>
                <div className="cart-product">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="cart-card-image"
                    onError={(event) => handleProductImageError(event, product.images?.[0] || '')}
                  />
                  <div className="cart-product-copy">
                    <p className="cart-brand">Annieshop</p>
                    <h3>{product.name}</h3>
                    <p className="cart-unit-price">Rs. {product.new_price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="cart-quantity-cell">
                  <div className="cart-qty-box">
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => removefromcart(product.id)}
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => addtocart(product.id)}
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cart-remove-btn"
                    onClick={() => {
                      for (let i = 0; i < product.quantity; i += 1) {
                        removefromcart(product.id);
                      }
                    }}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>

                <div className="cart-total-cell">
                  <span>Rs. {(product.new_price * product.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-note">
            <label htmlFor="cart-note">Order special instructions</label>
            <textarea
              id="cart-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add notes for your order"
            />
          </div>

          <div className="cart-summary">
            {lockedPremiumItems.length > 0 ? (
              <p className="cart-summary-note">
                {user
                  ? 'Your cart contains premium-only products. Upgrade to premium before checkout.'
                  : 'Your cart contains premium-only products. Login with a premium account to continue.'}
              </p>
            ) : null}
            <div className="cart-summary-line">
              <span>Estimated total</span>
              <strong>Rs. {totalAmount.toFixed(2)}</strong>
            </div>
            <p className="cart-summary-note">
              Taxes, discounts and shipping calculated at checkout.
            </p>
            <button
              className="checkout-button"
              onClick={() => navigate(lockedPremiumItems.length > 0 ? (user ? '/premium' : '/login') : '/checkout')}
              disabled={cartProducts.length === 0}
            >
              {lockedPremiumItems.length > 0 ? 'Unlock premium access' : 'Check out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
