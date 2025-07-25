import React, { useState } from 'react';
import './Newsletter.css';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async () => {
    if (!email) return setStatus('Please enter an email.');

    try {
      // First check if email already exists in database
      const all = await axios.get('http://localhost:4000/allcustomers');
      const exists = all.data.some(c => c.email === email);
      if (exists) return setStatus('You are already subscribed.');

      const response = await axios.post('http://localhost:4000/addcustomer', {
        name: "Newsletter Subscriber",
        email,
        joined: new Date().toISOString().slice(0, 10),
        totalOrders: 0
      });
      setStatus('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      setStatus('Error subscribing.');
      console.error(err);
    }
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive offers on your email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          placeholder='Your email id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {status && <p className="newsletter-status">{status}</p>}
    </div>
  );
};

export default Newsletter;
