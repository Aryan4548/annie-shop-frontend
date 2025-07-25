import React, { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
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
          <FaBars className="icon" onClick={handleToggleMenu} />
        </div>

        {/* Logo */}
        <div className="navbar-logo-wrapper">
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-menu desktop-only">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/allproducts">CATALOG</Link></li>
          <li><Link to="/contact-information">CONTACT</Link></li>
          <li><Link to="/categories">CATEGORIES</Link></li>
        </ul>

        {/* Right icons */}
        <div className="navbar-right-icons">
          <FaSearch className="icon" onClick={() => setShowSearch(!showSearch)} />
          {user ? (
            <Link to="/profile"><FaUser className="icon" /></Link>
          ) : (
            <Link to="/login"><FaUser className="icon" /></Link>
          )}
          <Link to="/cart" className="icon-link">
            <img src={cart_icon} alt="Cart" />
            {totalItems > 0 && <div className="cart-count">{totalItems}</div>}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <ul className="navbar-slide-menu mobile-only">
          <li><Link to="/" onClick={handleCloseMenu}>Home</Link></li>
          <li><Link to="/allproducts" onClick={handleCloseMenu}>Catalog</Link></li>
          <li><Link to="/contact-information" onClick={handleCloseMenu}>Contact</Link></li>
          <li><Link to="/categories" onClick={handleCloseMenu}>Categories</Link></li>
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
