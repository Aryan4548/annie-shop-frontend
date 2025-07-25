import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const {
    cartItems = {},
    getProductById,
    loading,
    setCartItems
  } = useContext(ShopContext);

  const [shippingInfo, setShippingInfo] = useState({
    name: '', email: '', phone: '', address1: '', address2: '',
    city: '', state: '', postalCode: '', country: ''
  });

  const [deliveryMethod, setDeliveryMethod] = useState('prepaid');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const getCartProducts = () => {
    return Object.keys(cartItems)
      .filter(id => cartItems[id] > 0)
      .map(id => {
        const product = getProductById(id);
        return product ? { ...product, quantity: cartItems[id] } : null;
      })
      .filter(Boolean);
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading checkout...</p>;

  const cartProducts = getCartProducts();

  const subtotal = cartProducts.reduce(
    (acc, product) => acc + product.new_price * product.quantity,
    0
  );

  const deliveryFee = deliveryMethod === 'prepaid' ? 100 : 200;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (cartProducts.length === 0) return;

    const payload = {
      customer: {
        name: shippingInfo.name,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address1: shippingInfo.address1,
        address2: shippingInfo.address2,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country
      },
      products: cartProducts.map(p => ({
        id: p.id,
        name: p.name,
        quantity: p.quantity,
        new_price: p.new_price
      })),
      deliveryMethod,
      totalAmount: total,
      date: new Date().toISOString()
    };

    try {
      await axios.post('http://localhost:4000/placeorder', payload);
      setSuccess(true);
      setCartItems({});
      localStorage.removeItem("annie_cart");
      setTimeout(() => navigate('/thank-you'), 1500); // ✅ Correct route
    } catch (err) {
      alert("Failed to place order. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-container">
        {/* LEFT: Shipping Info */}
        <div className="checkout-left">
          <h3>Shipping Information</h3>
          <form className="checkout-form">
            {[
              'name', 'email', 'phone',
              'address1', 'address2',
              'city', 'state', 'postalCode', 'country'
            ].map((field, idx) => (
              <input
                key={idx}
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={shippingInfo[field]}
                onChange={handleInputChange}
                required={field !== 'address2'}
              />
            ))}

            <h4>Delivery Method</h4>
            <div className="delivery-options">
              <label>
                <span>Prepaid (₹100 delivery charge)</span>
                <input
                  type="radio"
                  name="delivery"
                  value="prepaid"
                  checked={deliveryMethod === 'prepaid'}
                  onChange={() => setDeliveryMethod('prepaid')}
                />
              </label>
              <label>
                <span>Cash on Delivery (₹200 delivery charge)</span>
                <input
                  type="radio"
                  name="delivery"
                  value="cod"
                  checked={deliveryMethod === 'cod'}
                  onChange={() => setDeliveryMethod('cod')}
                />
              </label>
            </div>
          </form>
        </div>

        {/* RIGHT: Summary */}
        <div className="checkout-right">
          <h3>Order Summary</h3>
          {cartProducts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="summary-items">
                {cartProducts.map(product => (
                  <div key={product.id} className="summary-item">
                    <span>{product.name} × {product.quantity}</span>
                    <span>₹{product.new_price * product.quantity}</span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="summary-total">
                <div><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div><span>Delivery</span><span>₹{deliveryFee}</span></div>
                <div><strong>Total</strong><strong>₹{total}</strong></div>
              </div>
              <button onClick={handlePlaceOrder}>Place Order</button>
              {success && <p className="success-msg">Order placed! Redirecting...</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
