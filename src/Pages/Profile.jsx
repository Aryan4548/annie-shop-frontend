import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaBoxOpen,
  FaEnvelope,
  FaHome,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUserAlt,
} from 'react-icons/fa';
import { useUser } from '../Context/UserContext';
import API_BASE_URL from '../config/api';
import './CSS/Profile.css';

const emptyAddress = {
  fullName: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
};

const normalizeAddress = (address = {}) => ({
  ...emptyAddress,
  ...address,
});

const hasAddressContent = (address = {}) =>
  Object.values(normalizeAddress(address)).some((value) => String(value || '').trim() !== '');

const formatAddress = (address = {}) =>
  [
    address.address1,
    address.address2,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .filter((value) => String(value || '').trim())
    .join(', ');

const Profile = () => {
  const { user, logout, updateUser } = useUser();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
  });
  const [addressBook, setAddressBook] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [addressForm, setAddressForm] = useState(emptyAddress);

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          params: { email: user.email },
        });

        if (!isMounted) {
          return;
        }

        const nextUser = response.data.user;
        const nextAddresses = Array.isArray(nextUser.addresses) && nextUser.addresses.length > 0
          ? nextUser.addresses.map((entry) => normalizeAddress(entry))
          : (hasAddressContent(nextUser.address) ? [normalizeAddress(nextUser.address)] : []);
        const nextSelectedIndex = Math.min(
          Math.max(Number(nextUser.selectedAddressIndex || 0), 0),
          Math.max(nextAddresses.length - 1, 0)
        );

        updateUser(nextUser);
        setOrders(response.data.orders || []);
        setExpandedOrderId((response.data.orders || [])[0]?.id || null);
        setProfileForm({
          name: nextUser.name || '',
          phone: nextUser.phone || '',
        });
        setAddressBook(nextAddresses);
        setSelectedAddressIndex(nextSelectedIndex);
        setAddressForm(nextAddresses[nextSelectedIndex] || normalizeAddress(nextUser.address || {}));
      } catch (error) {
        if (!isMounted) {
          return;
        }
        console.error('Failed to load profile:', error);
        setProfileMessage('Unable to load your profile right now.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [updateUser, user?.email]);

  const currentUser = user || {};
  const displayName = currentUser.name || 'Anieshop Member';
  const email = currentUser.email || 'member@annieshop.com';
  const memberId = currentUser.id || currentUser._id || `ANI-${email.slice(0, 4).toUpperCase()}-${email.length}`;
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const latestOrder = orders[0];
  const currentAddress = addressBook[selectedAddressIndex] || addressForm;
  const addressSummary = formatAddress(currentAddress);
  const primaryAddressName = currentAddress.fullName || displayName;

  const hasSavedAddress = useMemo(
    () => addressBook.some((entry) => hasAddressContent(entry)) || hasAddressContent(addressForm),
    [addressBook, addressForm]
  );

  const saveAddresses = async (nextAddresses, nextSelectedIndex, successMessage) => {
    const cleanedAddresses = nextAddresses
      .map((entry) => normalizeAddress(entry))
      .filter((entry) => hasAddressContent(entry));
    const safeSelectedIndex = Math.min(
      Math.max(nextSelectedIndex, 0),
      Math.max(cleanedAddresses.length - 1, 0)
    );

    try {
      const response = await axios.post(`${API_BASE_URL}/user/profile/update`, {
        email,
        name: profileForm.name || displayName,
        phone: profileForm.phone,
        address: cleanedAddresses[safeSelectedIndex] || normalizeAddress(addressForm),
        addresses: cleanedAddresses,
        selectedAddressIndex: safeSelectedIndex,
      });

      const nextUser = response.data.user;
      const nextBook = Array.isArray(nextUser.addresses) && nextUser.addresses.length > 0
        ? nextUser.addresses.map((entry) => normalizeAddress(entry))
        : (hasAddressContent(nextUser.address) ? [normalizeAddress(nextUser.address)] : []);
      const nextIndex = Math.min(
        Math.max(Number(nextUser.selectedAddressIndex || 0), 0),
        Math.max(nextBook.length - 1, 0)
      );

      updateUser(nextUser);
      setAddressBook(nextBook);
      setSelectedAddressIndex(nextIndex);
      setAddressForm(nextBook[nextIndex] || normalizeAddress(nextUser.address || {}));
      setProfileMessage(successMessage);
    } catch (error) {
      console.error('Failed to save address:', error);
      setProfileMessage(error.response?.data?.message || 'Unable to save address right now.');
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const saveProfile = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/profile/update`, {
        email,
        name: profileForm.name,
        phone: profileForm.phone,
        address: currentAddress,
        addresses: addressBook,
        selectedAddressIndex,
      });

      const nextUser = response.data.user;
      const nextBook = Array.isArray(nextUser.addresses) && nextUser.addresses.length > 0
        ? nextUser.addresses.map((entry) => normalizeAddress(entry))
        : (hasAddressContent(nextUser.address) ? [normalizeAddress(nextUser.address)] : []);
      const nextIndex = Math.min(
        Math.max(Number(nextUser.selectedAddressIndex || 0), 0),
        Math.max(nextBook.length - 1, 0)
      );

      updateUser(nextUser);
      setProfileForm({
        name: nextUser.name || '',
        phone: nextUser.phone || '',
      });
      setAddressBook(nextBook);
      setSelectedAddressIndex(nextIndex);
      setAddressForm(nextBook[nextIndex] || normalizeAddress(nextUser.address || {}));
      setProfileMessage('Account details saved successfully.');
    } catch (error) {
      console.error('Failed to save profile:', error);
      setProfileMessage(error.response?.data?.message || 'Unable to save account details right now.');
    }
  };

  const saveAddress = async () => {
    const nextAddresses = [...addressBook];
    nextAddresses[selectedAddressIndex] = normalizeAddress(addressForm);
    saveAddresses(nextAddresses, selectedAddressIndex, 'Address saved successfully.');
  };

  const addAnotherAddress = () => {
    const nextAddresses = [...addressBook];
    nextAddresses.push(normalizeAddress(emptyAddress));
    setAddressBook(nextAddresses);
    setSelectedAddressIndex(nextAddresses.length - 1);
    setAddressForm(normalizeAddress(emptyAddress));
    setProfileMessage('');
  };

  const selectAddress = (index) => {
    setSelectedAddressIndex(index);
    setAddressForm(normalizeAddress(addressBook[index] || emptyAddress));
    setProfileMessage('');
  };

  const makePrimaryAddress = (index) => {
    saveAddresses(addressBook, index, 'Primary address updated successfully.');
  };

  const sections = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'account', label: 'Account details' },
    { id: 'logout', label: 'Log out', action: handleLogout },
  ];

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <aside className="profile-sidebar">
          <div className="profile-sidebar-card">
            <div className="profile-sidebar-head">
              <div className="profile-avatar">{initials}</div>
              <div>
                <p className="profile-kicker">My Account</p>
                <strong>{displayName}</strong>
                <span>{email}</span>
              </div>
            </div>

            <nav className="profile-menu">
              {sections.map((section) => {
                const Element = section.action ? 'button' : 'button';
                return (
                  <Element
                    key={section.label}
                    type="button"
                    className={`profile-menu-item ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => {
                      if (section.action) {
                        section.action();
                        return;
                      }
                      setActiveSection(section.id);
                    }}
                  >
                    {section.label}
                  </Element>
                );
              })}
            </nav>
          </div>
        </aside>

        <section className="profile-content">
          {activeSection === 'dashboard' && (
            <>
              <div className="profile-overview-card">
                <div className="profile-banner">
                  <span>
                    {latestOrder
                      ? `Your latest order is ${latestOrder.status || 'pending'} and the account is ready for your next purchase.`
                      : `${displayName}, your account is active and ready. Orders and saved addresses will appear here as soon as they are connected.`}
                  </span>
                  <button type="button" onClick={() => navigate('/allproducts')}>
                    Browse products
                  </button>
                </div>

                <div className="profile-info-grid">
                  <article>
                    <FaUserAlt />
                    <div>
                      <span>Name</span>
                      <strong>{displayName}</strong>
                    </div>
                  </article>

                  <article>
                    <FaEnvelope />
                    <div>
                      <span>Email</span>
                      <strong>{email}</strong>
                    </div>
                  </article>

                  <article>
                    <FaHome />
                    <div>
                      <span>Member ID</span>
                      <strong>{memberId}</strong>
                    </div>
                  </article>
                </div>
              </div>

              <div className="profile-stack">
                <section className="profile-panel">
                  <div className="profile-section-title">
                    <FaBoxOpen />
                    <div>
                      <h2>Orders</h2>
                      <p>Track purchases and upcoming deliveries in one place.</p>
                    </div>
                  </div>
                  <div className="profile-empty-box profile-notice-box">
                    <strong>
                      {orders.length > 0
                        ? `${orders.length} order${orders.length > 1 ? 's' : ''} available in your history.`
                        : 'No order has been made yet.'}
                    </strong>
                    <button type="button" onClick={() => setActiveSection('orders')}>
                      View orders
                    </button>
                  </div>
                </section>

                <section className="profile-panel">
                  <div className="profile-section-title">
                    <FaMapMarkerAlt />
                    <div>
                      <h2>Addresses</h2>
                      <p>Save delivery details here for a faster checkout later.</p>
                    </div>
                  </div>
                  <div className="profile-empty-box profile-notice-box">
                    <div>
                      <strong>{hasSavedAddress ? 'Saved address available.' : 'No saved address yet.'}</strong>
                      {hasSavedAddress ? (
                        <>
                          <p>{primaryAddressName}</p>
                          <p>{addressSummary || 'Address details will appear here once saved.'}</p>
                        </>
                      ) : null}
                    </div>
                    <button type="button" onClick={() => setActiveSection('addresses')}>
                      {hasSavedAddress ? 'Manage addresses' : 'Add address'}
                    </button>
                  </div>
                </section>
              </div>
            </>
          )}

          {activeSection === 'orders' && (
            <section className="profile-panel">
              <div className="profile-section-title">
                <FaBoxOpen />
                <div>
                  <h2>Orders</h2>
                  <p>Your recent orders linked to this email address.</p>
                </div>
              </div>

              <div className="profile-orders-list">
                {loading ? (
                  <div className="profile-empty-box">
                    <strong>Loading your orders...</strong>
                  </div>
                ) : orders.length > 0 ? (
                  orders.map((order) => (
                    <article key={order.id} className={`profile-order-card ${expandedOrderId === order.id ? 'expanded' : ''}`}>
                      <button
                        type="button"
                        className="profile-order-summary"
                        onClick={() => setExpandedOrderId((current) => (current === order.id ? null : order.id))}
                      >
                        <div>
                          <strong>Order #{order.id}</strong>
                          <p>{new Date(order.date).toLocaleString()}</p>
                        </div>
                        <span className="profile-order-status">{order.status || 'pending'}</span>
                        <strong>Rs. {Number(order.totalAmount || 0).toFixed(2)}</strong>
                      </button>

                      {expandedOrderId === order.id ? (
                        <div className="profile-order-details">
                          <div className="profile-order-detail-block">
                            <h3>Items</h3>
                            <div className="profile-order-products">
                              {(order.products || []).map((product, index) => (
                                <div key={`${order.id}-${product.id || index}`} className="profile-order-product-row">
                                  <span>{product.name}</span>
                                  <span>Qty {product.quantity}</span>
                                  <strong>Rs. {Number(product.new_price || 0).toFixed(2)}</strong>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="profile-order-detail-grid">
                            <div className="profile-order-detail-block">
                              <h3>Delivery address</h3>
                              <p>{order.customer?.name || '-'}</p>
                              <p>{formatAddress(order.customer || {}) || 'No address saved for this order.'}</p>
                              <p>{order.customer?.phone || ''}</p>
                            </div>

                            <div className="profile-order-detail-block">
                              <h3>Payment summary</h3>
                              <p>Delivery: {order.deliveryMethod || 'prepaid'}</p>
                              <p>Pay now: Rs. {Number(order.amountDueNow ?? order.totalAmount ?? 0).toFixed(2)}</p>
                              {Number(order.amountDueLater || 0) > 0 ? (
                                <p>Pay later: Rs. {Number(order.amountDueLater || 0).toFixed(2)}</p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </article>
                  ))
                ) : (
                  <div className="profile-empty-box">
                    <strong>No orders found yet.</strong>
                    <p>As soon as you place an order with this account, it will appear here.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeSection === 'addresses' && (
            <section className="profile-panel">
              <div className="profile-section-title">
                <FaMapMarkerAlt />
                <div>
                  <h2>Addresses</h2>
                  <p>Add and save your preferred delivery address.</p>
                </div>
              </div>

              {addressBook.length > 0 ? (
                <div className="profile-address-list">
                  {addressBook.map((entry, index) => (
                    <button
                      type="button"
                      key={`address-${index}`}
                      className={`profile-address-chip ${selectedAddressIndex === index ? 'active' : ''}`}
                      onClick={() => selectAddress(index)}
                    >
                      <span>Address {index + 1}</span>
                      <strong>{entry.fullName || `Saved address ${index + 1}`}</strong>
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="profile-form-grid">
                <label>
                  Full name
                  <input
                    value={addressForm.fullName}
                    onChange={(event) => setAddressForm((current) => ({ ...current, fullName: event.target.value }))}
                    placeholder="Full name"
                  />
                </label>
                <label>
                  Phone
                  <input
                    value={addressForm.phone}
                    onChange={(event) => setAddressForm((current) => ({ ...current, phone: event.target.value }))}
                    placeholder="Phone number"
                  />
                </label>
                <label className="profile-field-span">
                  Address line 1
                  <input
                    value={addressForm.address1}
                    onChange={(event) => setAddressForm((current) => ({ ...current, address1: event.target.value }))}
                    placeholder="House no, street, area"
                  />
                </label>
                <label className="profile-field-span">
                  Address line 2
                  <input
                    value={addressForm.address2}
                    onChange={(event) => setAddressForm((current) => ({ ...current, address2: event.target.value }))}
                    placeholder="Apartment, landmark"
                  />
                </label>
                <label>
                  City
                  <input
                    value={addressForm.city}
                    onChange={(event) => setAddressForm((current) => ({ ...current, city: event.target.value }))}
                    placeholder="City"
                  />
                </label>
                <label>
                  State
                  <input
                    value={addressForm.state}
                    onChange={(event) => setAddressForm((current) => ({ ...current, state: event.target.value }))}
                    placeholder="State"
                  />
                </label>
                <label>
                  Postal code
                  <input
                    value={addressForm.postalCode}
                    onChange={(event) => setAddressForm((current) => ({ ...current, postalCode: event.target.value }))}
                    placeholder="Postal code"
                  />
                </label>
                <label>
                  Country
                  <input
                    value={addressForm.country}
                    onChange={(event) => setAddressForm((current) => ({ ...current, country: event.target.value }))}
                    placeholder="Country"
                  />
                </label>
              </div>

              <div className="profile-form-actions">
                <button type="button" className="profile-secondary-btn" onClick={addAnotherAddress}>
                  Add another address
                </button>
                {addressBook.length > 1 ? (
                  <button type="button" className="profile-secondary-btn" onClick={() => makePrimaryAddress(selectedAddressIndex)}>
                    Use as primary
                  </button>
                ) : null}
                <button type="button" className="profile-primary-btn" onClick={saveAddress}>
                  Save address
                </button>
              </div>
            </section>
          )}

          {activeSection === 'account' && (
            <section className="profile-panel">
              <div className="profile-section-title">
                <FaUserAlt />
                <div>
                  <h2>Account details</h2>
                  <p>Update the basic details linked to your AnnieShop account.</p>
                </div>
              </div>

              <div className="profile-form-grid">
                <label>
                  Full name
                  <input
                    value={profileForm.name}
                    onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Email
                  <input value={email} readOnly placeholder="Email" />
                </label>
                <label className="profile-field-span">
                  Phone
                  <input
                    value={profileForm.phone}
                    onChange={(event) => setProfileForm((current) => ({ ...current, phone: event.target.value }))}
                    placeholder="Phone number"
                  />
                </label>
              </div>

              <div className="profile-form-actions">
                <button type="button" className="profile-primary-btn" onClick={saveProfile}>
                  Save account details
                </button>
              </div>
            </section>
          )}

          {profileMessage ? <p className="profile-feedback">{profileMessage}</p> : null}

          <button type="button" className="profile-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </section>
      </section>
    </main>
  );
};

export default Profile;
