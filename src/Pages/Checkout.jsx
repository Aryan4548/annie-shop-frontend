import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';
import { useUser } from '../Context/UserContext';
import './Checkout.css';
import API_BASE_URL from '../config/api';

const formatCurrency = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;

const fieldMeta = [
  { name: 'name', label: 'Full name', placeholder: 'Enter your full name' },
  { name: 'email', label: 'Email address', placeholder: 'Enter your email address', type: 'email' },
  { name: 'phone', label: 'Phone number', placeholder: 'Enter your phone number' },
  { name: 'address1', label: 'Address line 1', placeholder: 'House number, street, locality' },
  { name: 'address2', label: 'Address line 2', placeholder: 'Apartment, landmark, optional', optional: true },
  { name: 'city', label: 'City', placeholder: 'City' },
  { name: 'state', label: 'State', placeholder: 'State' },
  { name: 'postalCode', label: 'Postal code', placeholder: 'Postal code' },
  { name: 'country', label: 'Country', placeholder: 'Country' },
];

const paymentOptions = [
  { id: 'upi', label: 'UPI' },
  { id: 'card', label: 'Card' },
  { id: 'cod', label: 'Cash' },
  { id: 'other', label: 'Other' },
];

const Checkout = () => {
  const {
    cartItems = {},
    getProductById,
    loading,
    setCartItems,
    storeSettings,
    canAccessProduct,
  } = useContext(ShopContext);
  const { user } = useUser();

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState('prepaid');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [success, setSuccess] = useState(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const navigate = useNavigate();
  const preorderAdvancePercentage = Number(storeSettings?.preorderAdvancePercentage || 0);
  const cartProducts = Object.keys(cartItems)
    .filter((id) => cartItems[id] > 0)
    .map((id) => {
      const product = getProductById(id);
      return product ? { ...product, quantity: cartItems[id] } : null;
    })
    .filter(Boolean);
  const lockedPremiumItems = cartProducts.filter((product) => !canAccessProduct(product));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    setActivePreviewIndex(0);
  }, [cartItems]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (lockedPremiumItems.length > 0) {
      navigate(user ? '/premium' : '/login', { replace: true });
    }
  }, [loading, lockedPremiumItems.length, navigate, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const primaryAddress = Array.isArray(user.addresses) && user.addresses.length > 0
      ? user.addresses[Math.min(Math.max(Number(user.selectedAddressIndex || 0), 0), user.addresses.length - 1)]
      : user.address;

    setShippingInfo((current) => ({
      ...current,
      name: primaryAddress?.fullName || user.name || current.name,
      email: user.email || current.email,
      phone: primaryAddress?.phone || user.phone || current.phone,
      address1: primaryAddress?.address1 || current.address1,
      address2: primaryAddress?.address2 || current.address2,
      city: primaryAddress?.city || current.city,
      state: primaryAddress?.state || current.state,
      postalCode: primaryAddress?.postalCode || current.postalCode,
      country: primaryAddress?.country || current.country,
    }));
  }, [user]);

  const handleInputChange = (event) => {
    setShippingInfo({ ...shippingInfo, [event.target.name]: event.target.value });
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading checkout...</p>;

  const regularSubtotal = cartProducts
    .filter((product) => !product.preorder)
    .reduce((acc, product) => acc + product.new_price * product.quantity, 0);

  const preorderSubtotal = cartProducts
    .filter((product) => product.preorder)
    .reduce((acc, product) => acc + product.new_price * product.quantity, 0);

  const preorderDueNow = preorderSubtotal * (preorderAdvancePercentage / 100);
  const preorderDueLater = preorderSubtotal - preorderDueNow;
  const subtotal = regularSubtotal + preorderSubtotal;
  const deliveryFee = deliveryMethod === 'prepaid' ? 100 : 200;
  const total = subtotal + deliveryFee;
  const totalDueNow = regularSubtotal + preorderDueNow + deliveryFee;
  const hasPreorderItems = preorderSubtotal > 0;
  const totalItems = cartProducts.reduce((count, product) => count + product.quantity, 0);
  const featuredProduct = cartProducts[Math.min(activePreviewIndex, Math.max(cartProducts.length - 1, 0))] || null;

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
        country: shippingInfo.country,
      },
      products: cartProducts.map((product) => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        new_price: product.new_price,
      })),
      deliveryMethod,
      totalAmount: total,
      amountDueNow: totalDueNow,
      amountDueLater: preorderDueLater,
      preorderAdvancePercentage,
      containsPreorder: hasPreorderItems,
      paymentMethod,
      date: new Date().toISOString(),
    };

    try {
      await axios.post(`${API_BASE_URL}/placeorder`, payload);
      setSuccess(true);
      setCartItems({});
      localStorage.removeItem('annie_cart');
      setTimeout(() => navigate('/thank-you'), 1500);
    } catch (error) {
      alert('Failed to place order. Try again.');
      console.error(error);
    }
  };

  return (
    <main className="checkout-page">
      <section className="checkout-hero">
        <div>
          <span className="checkout-eyebrow">Secure checkout</span>
          <h1>Checkout</h1>
          <p>
            Complete your order with clear delivery details, simple payment choices, and a clean preorder breakdown.
          </p>
        </div>
        <div className="checkout-hero-stats">
          <article className="checkout-hero-stat">
            <strong>{totalItems}</strong>
            <span>Items in cart</span>
          </article>
          <article className="checkout-hero-stat checkout-hero-stat--amount">
            <strong>{formatCurrency(totalDueNow)}</strong>
            <span>Due now</span>
          </article>
          <article className="checkout-hero-stat">
            <strong>{hasPreorderItems ? `${preorderAdvancePercentage}%` : '100%'}</strong>
            <span>Payment today</span>
          </article>
        </div>
      </section>

      <section className="checkout-layout">
        <div className="checkout-main">
          <div className="checkout-panel checkout-panel--form">
            <div className="checkout-section-head">
              <div>
                <span>Step 1</span>
                <h2>Contact information</h2>
              </div>
              {user?.name ? <p>Details auto-filled from your AnnieShop profile.</p> : <p>Enter the delivery details for this order.</p>}
            </div>

            <form className="checkout-form">
              <div className="checkout-form-grid">
                {fieldMeta.map((field) => (
                  <label
                    key={field.name}
                    className={[
                      'checkout-field',
                      field.name === 'address1' || field.name === 'address2' ? 'checkout-field--full' : '',
                      field.name === 'email' ? 'checkout-field--wide' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <span>
                      {field.label}
                      {field.optional ? ' (optional)' : ''}
                    </span>
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={shippingInfo[field.name]}
                      onChange={handleInputChange}
                      required={!field.optional}
                    />
                  </label>
                ))}
              </div>
            </form>
          </div>

          <div className="checkout-panel">
            <div className="checkout-section-head">
              <div>
                <span>Step 2</span>
                <h2>Delivery method</h2>
              </div>
              <p>Choose the checkout flow that suits this order best.</p>
            </div>

            <div className="checkout-delivery-grid">
              <label className={`checkout-delivery-card ${deliveryMethod === 'prepaid' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  value="prepaid"
                  checked={deliveryMethod === 'prepaid'}
                  onChange={() => setDeliveryMethod('prepaid')}
                />
                <div>
                  <strong>Delivery</strong>
                  <span>Pay online now for smoother dispatch and lower delivery fee.</span>
                </div>
                <b>{formatCurrency(100)}</b>
              </label>

              <label className={`checkout-delivery-card ${deliveryMethod === 'cod' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  value="cod"
                  checked={deliveryMethod === 'cod'}
                  onChange={() => setDeliveryMethod('cod')}
                />
                <div>
                  <strong>Cash on Delivery</strong>
                  <span>Pay on arrival with a slightly higher delivery handling fee.</span>
                </div>
                <b>{formatCurrency(200)}</b>
              </label>
            </div>

            <div className="checkout-assurance-row">
              <div className="checkout-assurance-card">
                <strong>Secure order placement</strong>
                <span>Shipping details are tied to this purchase only.</span>
              </div>
              <div className="checkout-assurance-card">
                <strong>Transparent preorder billing</strong>
                <span>Advance and remaining dues are shown clearly before you place the order.</span>
              </div>
            </div>
          </div>

          <div className="checkout-panel">
            <div className="checkout-section-head">
              <div>
                <span>Step 3</span>
                <h2>Payment method</h2>
              </div>
              <p>Select the payment mode you prefer for this order.</p>
            </div>

            <div className="checkout-payment-grid">
              {paymentOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`checkout-payment-card ${paymentMethod === option.id ? 'active' : ''}`}
                  onClick={() => setPaymentMethod(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="checkout-sidebar">
          <div className="checkout-panel checkout-panel--summary">
            <div className="checkout-section-head">
              <div>
                <span>Order</span>
                <h2>Order summary</h2>
              </div>
              <p>{totalItems} item{totalItems === 1 ? '' : 's'} ready for checkout.</p>
            </div>

          {cartProducts.length === 0 ? (
            <div className="checkout-empty-state">
              <strong>Your cart is empty.</strong>
              <p>Add products to continue with checkout.</p>
            </div>
          ) : (
            <>
              {featuredProduct ? (
                <div className="checkout-featured-card">
                  <div className="checkout-featured-image-wrap">
                    {cartProducts.length > 1 ? (
                      <>
                        <button
                          type="button"
                          className="checkout-preview-nav checkout-preview-nav--left"
                          onClick={() => setActivePreviewIndex((current) => (current - 1 + cartProducts.length) % cartProducts.length)}
                          aria-label="Show previous product"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className="checkout-preview-nav checkout-preview-nav--right"
                          onClick={() => setActivePreviewIndex((current) => (current + 1) % cartProducts.length)}
                          aria-label="Show next product"
                        >
                          ›
                        </button>
                      </>
                    ) : null}
                    <img
                      src={featuredProduct.images?.[0] || ''}
                      alt={featuredProduct.name}
                      className="checkout-featured-image"
                    />
                  </div>
                  {cartProducts.length > 1 ? (
                    <div className="checkout-preview-dots" aria-label="Checkout product preview slider">
                      {cartProducts.map((product, index) => (
                        <button
                          key={`preview-${product.id}-${index}`}
                          type="button"
                          className={`checkout-preview-dot ${index === activePreviewIndex ? 'active' : ''}`}
                          onClick={() => setActivePreviewIndex(index)}
                          aria-label={`Show ${product.name}`}
                        />
                      ))}
                    </div>
                  ) : null}
                  <div className="checkout-featured-copy">
                    <strong>{featuredProduct.name}</strong>
                    <span>
                      Qty {featuredProduct.quantity}
                      {featuredProduct.preorder ? ` • ${preorderAdvancePercentage}% now` : ' • Pay in full'}
                    </span>
                    <b>{formatCurrency(featuredProduct.new_price * featuredProduct.quantity)}</b>
                  </div>
                </div>
              ) : null}

              <div className="checkout-summary-items">
                {cartProducts.map((product) => (
                  <article key={product.id} className="checkout-summary-item">
                    <div>
                      <strong>{product.name}</strong>
                      <span>
                        Qty {product.quantity}
                        {product.preorder ? ` • ${preorderAdvancePercentage}% now, ${100 - preorderAdvancePercentage}% later` : ' • Full payment today'}
                      </span>
                    </div>
                    <b>{formatCurrency(product.new_price * product.quantity)}</b>
                  </article>
                ))}
              </div>

              <div className="checkout-pricing-card">
                <div className="checkout-pricing-row"><span>Regular items</span><span>{formatCurrency(regularSubtotal)}</span></div>
                {hasPreorderItems ? (
                  <>
                    <div className="checkout-pricing-row"><span>Pre-order total</span><span>{formatCurrency(preorderSubtotal)}</span></div>
                    <div className="checkout-pricing-row"><span className="checkout-pricing-label">Pre-order due now ({preorderAdvancePercentage}%)</span><span>{formatCurrency(preorderDueNow)}</span></div>
                    <div className="checkout-pricing-row"><span>Pre-order due later</span><span>{formatCurrency(preorderDueLater)}</span></div>
                  </>
                ) : null}
                <div className="checkout-pricing-row"><span>Delivery</span><span>{formatCurrency(deliveryFee)}</span></div>
                <div className="checkout-pricing-row"><span>Order total</span><span>{formatCurrency(total)}</span></div>
                <div className="checkout-pricing-row checkout-pricing-row--highlight"><strong>Pay now</strong><strong>{formatCurrency(totalDueNow)}</strong></div>
              </div>

              <div className="checkout-summary-note">
                <strong>{deliveryMethod === 'prepaid' ? 'Delivery selected' : 'Cash on Delivery selected'}</strong>
                <span>
                  {deliveryMethod === 'prepaid'
                    ? 'Online payment helps us dispatch your order faster.'
                    : 'COD includes a slightly higher delivery handling fee.'}
                </span>
              </div>

              {hasPreorderItems ? (
                <div className="checkout-preorder-note">
                  <strong>Pre-order split active</strong>
                  <p>
                    This order contains pre-order items. You will pay {preorderAdvancePercentage}% now and the remaining {100 - preorderAdvancePercentage}% later.
                  </p>
                </div>
              ) : null}

              <button className="checkout-submit-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
              {success && <p className="success-msg">Order placed! Redirecting...</p>}
            </>
          )}
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Checkout;
