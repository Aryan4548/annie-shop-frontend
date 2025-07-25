import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import '../Components/Cart/Cart.css';

const Cart = () => {
  const {
    cartItems = {},
    addtocart,
    removefromcart,
    getProductById,
    loading
  } = useContext(ShopContext);

  const navigate = useNavigate();

  if (loading) return <p style={{ padding: "2rem" }}>Loading your cart...</p>;

  const cartProductIds = Object.keys(cartItems).filter(id => cartItems[id] > 0);

  const cartProducts = cartProductIds
    .map(id => {
      const product = getProductById(parseInt(id));
      return product ? { ...product, quantity: cartItems[id] } : null;
    })
    .filter(Boolean);

  const totalAmount = cartProducts.reduce(
    (acc, product) => acc + product.new_price * product.quantity,
    0
  );

  return (
    <div className="cart-wrapper">
      <h1 className="cart-title">Your Basket</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartProducts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartProducts.map(product => (
              <div className="cart-card" key={product.id}>
                <img src={product.images?.[0]} alt={product.name} className="cart-card-image" />
                <div className="cart-card-details">
                  <h3>{product.name}</h3>
                  <p>Ref: {product.id}</p>
                  <div className="cart-tags"><span>✔ Home Delivery</span></div>
                  <div className="cart-qty-row">
                    <span>Qty:</span>
                    <button onClick={() => removefromcart(product.id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => addtocart(product.id)}>+</button>
                    <span className="cart-price">₹{(product.new_price * product.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="delivery-options">
            <label><input type="radio" checked readOnly /> Home Delivery</label>
          </div>
          <div className="summary-breakdown">
            <p><span>Subtotal:</span><span>₹{totalAmount.toFixed(2)}</span></p>
            <p><span>Delivery:</span><span>₹0.00</span></p>
            <p className="summary-total"><strong>Total:</strong><strong>₹{totalAmount.toFixed(2)}</strong></p>
          </div>
          <button className="checkout-button" onClick={() => navigate('/checkout')} disabled={cartProducts.length === 0}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
