import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaBolt, FaBoxOpen, FaClock, FaCrown, FaStar } from 'react-icons/fa';
import { useUser } from '../Context/UserContext';
import API_BASE_URL from '../config/api';
import Item from '../Components/Items/Item';
import './CSS/Premium.css';

const PREMIUM_PRICE = 499;

const premiumPerks = [
  {
    icon: <FaCrown />,
    title: 'Exclusive Drops',
    description: 'Unlock members-only launches and premium collectibles before the public sees them.',
  },
  {
    icon: <FaBolt />,
    title: 'Buy Now, Pay Later',
    description: 'Enjoy flexible checkout access on eligible premium drops and high-demand releases.',
  },
  {
    icon: <FaBoxOpen />,
    title: 'Fast Tier 1 Deliveries',
    description: 'Priority dispatch support for Tier 1 cities so your orders move faster.',
  },
  {
    icon: <FaClock />,
    title: 'Weekly Drop Access',
    description: 'Get first access to weekly drops, restocks, and special premium-only product alerts.',
  },
];

const Premium = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState(Boolean(user?.email));
  const [subscribing, setSubscribing] = useState(false);
  const [message, setMessage] = useState('');
  const [premiumProducts, setPremiumProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const premiumProductsRef = useRef(null);
  const isPremium = Boolean(user?.isPremium);

  useEffect(() => {
    if (!user?.email) {
      setLoadingStatus(false);
      return;
    }

    let isMounted = true;

    const fetchPremiumStatus = async () => {
      try {
        setLoadingStatus(true);
        const response = await axios.get(`${API_BASE_URL}/premium/status`, {
          params: { email: user.email },
        });

        if (!isMounted) {
          return;
        }

        updateUser(response.data.user);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error('Failed to fetch premium status:', error);
        setMessage('Unable to load premium status right now.');
      } finally {
        if (isMounted) {
          setLoadingStatus(false);
        }
      }
    };

    fetchPremiumStatus();

    return () => {
      isMounted = false;
    };
  }, [updateUser, user?.email]);

  useEffect(() => {
    if (!isPremium) {
      setPremiumProducts([]);
      setLoadingProducts(false);
      return;
    }

    let isMounted = true;

    const fetchPremiumProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await axios.get(`${API_BASE_URL}/premiumproducts`);

        if (!isMounted) {
          return;
        }

        setPremiumProducts(response.data || []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error('Failed to fetch premium products:', error);
        setMessage((current) => current || 'Unable to load premium products right now.');
      } finally {
        if (isMounted) {
          setLoadingProducts(false);
        }
      }
    };

    fetchPremiumProducts();

    return () => {
      isMounted = false;
    };
  }, [isPremium]);

  const premiumSubscribedAt = user?.premiumSubscribedAt
    ? new Date(user.premiumSubscribedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  const membershipLabel = useMemo(() => {
    if (!user) return 'Guest access';
    if (isPremium) return 'Premium active';
    return 'Standard member';
  }, [isPremium, user]);

  const handleSubscribe = async () => {
    if (!user?.email) {
      navigate('/login');
      return;
    }

    try {
      setSubscribing(true);
      setMessage('');
      const response = await axios.post(`${API_BASE_URL}/premium/subscribe`, {
        email: user.email,
      });

      updateUser(response.data.user);
      setMessage(response.data.message || 'Premium membership activated.');
    } catch (error) {
      console.error('Failed to activate premium:', error);
      setMessage(error.response?.data?.message || 'Unable to activate premium right now.');
    } finally {
      setSubscribing(false);
    }
  };

  const handleBrowsePremiumDrops = () => {
    premiumProductsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="premium-page">
      <section className="premium-hero">
        <div className="premium-copy">
          <span className="premium-eyebrow">AnnieShop Premium</span>
          <h1>Priority access for collectors who never want to miss a drop.</h1>
          <p>
            Join Premium for Rs. {PREMIUM_PRICE} and unlock exclusive drops, weekly launch access,
            buy now pay later support, and faster deliveries across Tier 1 cities.
          </p>

          <div className="premium-actions">
            {!user ? (
              <>
                <button type="button" className="premium-primary-btn" onClick={() => navigate('/login')}>
                  Login to continue
                </button>
                <Link to="/allproducts" className="premium-secondary-btn">
                  Explore catalog
                </Link>
              </>
            ) : isPremium ? (
              <>
                <button
                  type="button"
                  className="premium-primary-btn premium-primary-btn--active"
                  onClick={handleBrowsePremiumDrops}
                >
                  Browse premium-ready drops
                </button>
                <Link to="/profile" className="premium-secondary-btn">
                  View account
                </Link>
              </>
            ) : (
              <>
                <button type="button" className="premium-primary-btn" onClick={handleSubscribe} disabled={subscribing || loadingStatus}>
                  {subscribing ? 'Activating...' : `Get Premium for Rs. ${PREMIUM_PRICE}`}
                </button>
                <Link to="/profile" className="premium-secondary-btn">
                  View profile
                </Link>
              </>
            )}
          </div>

          {message ? <p className="premium-message">{message}</p> : null}
        </div>

        <div className="premium-membership-card">
          <div className={`premium-status-badge ${isPremium ? 'is-active' : ''}`}>
            <FaStar />
            <span>{loadingStatus ? 'Checking status...' : membershipLabel}</span>
          </div>

          <div className="premium-price-card">
            <p>Membership</p>
            <strong>Rs. {PREMIUM_PRICE}</strong>
            <span>One premium membership activation</span>
          </div>

          <div className="premium-summary-list">
            <article>
              <span>Access</span>
              <strong>{isPremium ? 'Unlocked' : 'Locked until you join'}</strong>
            </article>
            <article>
              <span>Weekly drops</span>
              <strong>Included</strong>
            </article>
            <article>
              <span>Delivery support</span>
              <strong>Tier 1 priority</strong>
            </article>
            {isPremium && premiumSubscribedAt ? (
              <article>
                <span>Activated on</span>
                <strong>{premiumSubscribedAt}</strong>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="premium-perks-section">
        <div className="premium-section-head">
          <span>Membership perks</span>
          <h2>What premium unlocks for you</h2>
        </div>

        <div className="premium-perks-grid">
          {premiumPerks.map((perk) => (
            <article key={perk.title} className="premium-perk-card">
              <div className="premium-perk-icon">{perk.icon}</div>
              <h3>{perk.title}</h3>
              <p>{perk.description}</p>
            </article>
          ))}
        </div>
      </section>

      {isPremium ? (
        <section
          ref={premiumProductsRef}
          id="premium-products"
          className="premium-products-section"
        >
          <div className="premium-section-head">
            <span>Premium products</span>
            <h2>Exclusive drops unlocked for your membership</h2>
          </div>

          {loadingProducts ? (
            <div className="premium-empty-state">
              <strong>Loading premium products...</strong>
            </div>
          ) : premiumProducts.length > 0 ? (
            <div className="premium-products-grid">
              {premiumProducts.map((product) => (
                <Item key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="premium-empty-state">
              <strong>No premium products are live yet.</strong>
              <p>As soon as premium-only drops are marked in admin, they will appear here.</p>
            </div>
          )}
        </section>
      ) : null}
    </main>
  );
};

export default Premium;
