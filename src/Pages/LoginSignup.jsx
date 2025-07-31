import React, { useState } from 'react';
import './CSS/LoginSignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setForm({ name: '', email: '', password: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = `https://annieshop-backend.onrender.com/${isSignup ? 'signup' : 'login'}`;
      const payload = isSignup ? form : { email: form.email, password: form.password };

      const res = await axios.post(url, payload);

      if (isSignup) {
        // Automatically login after signup
        const loginRes = await axios.post('https://annieshop-backend.onrender.com/login', {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem('token', loginRes.data.token);
        localStorage.setItem('user', JSON.stringify(loginRes.data.user));
        setUser(loginRes.data.user);
        navigate('/profile');
      } else if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate('/profile');
      }

      setMessage(res.data.message || (isSignup ? 'Signup successful!' : 'Login successful!'));
    } catch (err) {
      console.error('Auth error:', err);
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isSignup ? 'Signup' : 'Login'}</h1>

        <div className="loginsignup-fileds">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button onClick={handleSubmit}>
          {isSignup ? 'Create Account' : 'Login'}
        </button>

        {message && <p className="auth-message">{message}</p>}

        <p className="loginupsignup-login">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={toggleMode}>
            {isSignup ? ' Login here' : ' Signup here'}
          </span>
        </p>

        {isSignup && (
          <div className="loginsignup-agree">
            <input type="checkbox" required />
            <p>By continuing I agree to the terms and privacy policy</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
