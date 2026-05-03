import React from 'react';
import { Link } from 'react-router-dom';
import './Ordersuccess.css';

const Ordersuccess = () => {
  return (
    <div className="order-success">
      <div className="success-card">
        <div className="icon">✅</div>
        <h2>Thank You for Your Order!</h2>
        <p>Your order has been placed successfully.</p>
        <p>Our team will reach out to you shortly to confirm the details and delivery.</p>
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    </div>
  );
};

export default Ordersuccess;
