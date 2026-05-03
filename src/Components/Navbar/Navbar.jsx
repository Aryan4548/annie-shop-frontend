import React, { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import { useUser } from "../../Context/UserContext";

const Navbar = () => {
  const { cartItems = {}, searchQuery, setSearchQuery } = useContext(ShopContext);
  const { user } = useUser();
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const totalItems = Object.values(cartItems).reduce((acc, item) => acc + item, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
  };

  const handleToggleMenu = () => setShowMenu(!showMenu);
  const handleCloseMenu = () => setShowMenu(false);

  return (
    <div className="navbar">
      <div className="navbar-container">

        {/* Mobile Left - Bars */}
        <div className="navbar-mobile-left mobile-only">
          <FaBars
            className="icon"
            onClick={handleToggleMenu}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleToggleMenu();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Toggle menu"
          />
        </div>

        {/* Logo */}
        <div className="navbar-logo-wrapper">
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-menu desktop-only">
          <li><NavLink to="/" end className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}>HOME</NavLink></li>
          <li><NavLink to="/allproducts" className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}>CATALOG</NavLink></li>
          <li>
            <NavLink
              to="/premium"
              className={({ isActive }) => `navbar-menu-link navbar-premium-link ${(isActive || user?.isPremium) ? 'is-active' : ''}`}
            >
              PREMIUM
            </NavLink>
          </li>
          <li><NavLink to="/categories" className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}>CATEGORIES</NavLink></li>
        </ul>

        {/* Right icons */}
        <div className="navbar-right-icons">
          <button
            type="button"
            className="navbar-action-btn"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search"
          >
            <FaSearch className="icon" />
          </button>
          {user ? (
            <Link to="/profile" className="navbar-action-btn icon-link" aria-label="Profile">
              <FaUser className="icon" />
            </Link>
          ) : (
            <Link to="/login" className="navbar-action-btn icon-link" aria-label="Login">
              <FaUser className="icon" />
            </Link>
          )}
          <Link to="/cart" className="navbar-action-btn navbar-cart-btn icon-link" aria-label="Cart">
            <img src={cart_icon} alt="Cart" className="navbar-cart-icon" />
            {totalItems > 0 && <div className="cart-count">{totalItems}</div>}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <ul className="navbar-slide-menu mobile-only">
          <li><NavLink to="/" end className={({ isActive }) => `navbar-mobile-link ${isActive ? 'active' : ''}`} onClick={handleCloseMenu}>Home</NavLink></li>
          <li><NavLink to="/allproducts" className={({ isActive }) => `navbar-mobile-link ${isActive ? 'active' : ''}`} onClick={handleCloseMenu}>Catalog</NavLink></li>
          <li><NavLink to="/premium" className={({ isActive }) => `navbar-mobile-link ${isActive ? 'active' : ''}`} onClick={handleCloseMenu}>Premium</NavLink></li>
          <li><NavLink to="/categories" className={({ isActive }) => `navbar-mobile-link ${isActive ? 'active' : ''}`} onClick={handleCloseMenu}>Categories</NavLink></li>
        </ul>
      )}

      {/* Search Bar */}
      {showSearch && (
        <form onSubmit={handleSearchSubmit} className="navbar-search-form">
          <input
            className="search-bar"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      )}
    </div>
  );
};

export default Navbar;
