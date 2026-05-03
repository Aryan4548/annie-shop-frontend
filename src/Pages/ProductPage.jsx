import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaRegShareSquare } from 'react-icons/fa';
import { ShopContext } from '../Context/ShopContext';
import { scrollPageToTop } from '../utils/scroll';
import { useUser } from '../Context/UserContext';
import './CSS/ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const navigate = useNavigate();

  const { addtocart, all_products, loading, storeSettings, canAccessProduct } = useContext(ShopContext);
  const { user } = useUser();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    scrollPageToTop();
    const found = all_products.find((p) => Number(p.id) === Number(productId));

    if (found) {
      setProduct(found);
      setActiveImage(found.images?.[0] || '');
      setQuantity(1);
    } else {
      setProduct(null);
      setActiveImage('');
    }
  }, [productId, all_products]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    const productCategory = String(product.category || '').toLowerCase();
    const productKeywords = `${product.name || ''} ${product.subtitle || ''}`.toLowerCase();

    return all_products
      .filter((item) => Number(item.id) !== Number(product.id))
      .filter((item) => {
        const itemCategory = String(item.category || '').toLowerCase();
        const itemKeywords = `${item.name || ''} ${item.subtitle || ''}`.toLowerCase();

        return itemCategory === productCategory ||
          itemKeywords.split(' ').some((word) => word && productKeywords.includes(word));
      })
      .slice(0, 5);
  }, [all_products, product]);

  const parsedDescription = useMemo(() => {
    if (!product?.description) return [];

    return product.description
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }, [product]);

  const productFeatures = useMemo(() => {
    if (parsedDescription.length <= 2) return [];

    return parsedDescription
      .filter((line) => line.length < 120)
      .slice(0, 6);
  }, [parsedDescription]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!canAccessProduct(product)) {
      navigate(user ? '/premium' : '/login');
      return;
    }

    for (let i = 0; i < quantity; i += 1) {
      addtocart(product.id);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    scrollPageToTop();
    navigate('/checkout');
    window.setTimeout(() => {
      scrollPageToTop();
    }, 0);
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.name,
          text: product?.subtitle || product?.name,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      window.alert('Product link copied to clipboard.');
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  if (loading && !product) {
    return <div className="product-status">Loading product...</div>;
  }

  if (!product) {
    return <div className="product-status">Product not found.</div>;
  }

  const oldPrice = Number(product.old_price || 0);
  const newPrice = Number(product.new_price || 0);
  const preorderAdvancePercentage = Number(storeSettings?.preorderAdvancePercentage || 0);
  const preorderRemainingPercentage = Math.max(100 - preorderAdvancePercentage, 0);
  const preorderDueNow = (newPrice * preorderAdvancePercentage) / 100;
  const preorderDueLater = newPrice - preorderDueNow;
  const hasDiscount = oldPrice > newPrice;
  const discountPercent = hasDiscount ? Math.round(100 - (newPrice / oldPrice) * 100) : 0;
  const productImages = product.images?.length ? product.images : [''];
  const isPremiumLocked = Boolean(product.premiumOnly && !canAccessProduct(product));

  return (
    <div className="product-page-shell">
      <div className="product-page-container">
        <div className="product-page">
          <section className="product-gallery-column">
            <div className="product-main-image-card">
              <img src={activeImage || productImages[0]} alt={product.name} className="product-main-image" />
            </div>

            <div className="product-thumbnails-row">
              {productImages.map((img, index) => (
                <button
                  type="button"
                  key={`${img}-${index}`}
                  className={`product-thumb-button ${img === activeImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </section>

          <section className="product-details-column">
            <p className="product-brand">ANNIESHOP</p>
            <h1>{product.name}</h1>
            <p className="product-subtitle">{product.subtitle || "Collector's edition figure"}</p>

            <div className="product-price-block">
              <span className="product-price-current">Rs. {newPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              {hasDiscount && (
                <>
                  <span className="product-price-old">Rs. {oldPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="product-discount-badge">-{discountPercent}%</span>
                </>
              )}
            </div>

            <p className="product-shipping-note">
              <span>Shipping</span> calculated at checkout.
            </p>

            {product.preorder && (
              <div className="product-preorder-box">
                <p className="product-preorder-note">This item is available for pre-order.</p>
                <p className="product-preorder-split">
                  {preorderAdvancePercentage}% now, {preorderRemainingPercentage}% later
                </p>
                <p className="product-preorder-breakdown">
                  Pay Rs. {preorderDueNow.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} now
                  and Rs. {preorderDueLater.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} later.
                </p>
              </div>
            )}

            {product.premiumOnly && (
              <div className="product-preorder-box">
                <p className="product-preorder-note">Premium-only access</p>
                <p className="product-preorder-split">
                  {isPremiumLocked ? 'Join premium to unlock this drop' : 'Your premium membership unlocks this product'}
                </p>
                <p className="product-preorder-breakdown">
                  Exclusive drops are reserved for premium members first.
                </p>
              </div>
            )}

            <div className="product-quantity-block">
              <p>Quantity</p>
              <div className="product-quantity-box">
                <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
              </div>
            </div>

            <div className="product-actions">
              <button type="button" className="product-add-button" onClick={handleAddToCart}>
                {isPremiumLocked ? 'Unlock with Premium' : 'Add to cart'}
              </button>
              <button type="button" className="product-buy-button" onClick={handleBuyNow}>
                {isPremiumLocked ? 'View Premium' : 'Buy it now'}
              </button>
            </div>

            <button type="button" className="product-share-button" onClick={handleShare}>
              <FaRegShareSquare />
              Share
            </button>

            <div className="product-copy-section">
              <h2>Product Description</h2>
              {parsedDescription.length > 0 ? (
                parsedDescription.slice(0, 3).map((line, index) => (
                  <p key={`desc-${index}`}>{line}</p>
                ))
              ) : (
                <p>No description available.</p>
              )}
            </div>

            {productFeatures.length > 0 && (
              <div className="product-copy-section">
                <h2>Product Features</h2>
                <ul className="product-feature-list">
                  {productFeatures.map((feature, index) => (
                    <li key={`feature-${index}`}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <h2>You may also like</h2>
            <div className="related-products-grid">
              {relatedProducts.map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="related-product-card"
                  onClick={scrollPageToTop}
                >
                  <img src={item.images?.[0] || ''} alt={item.name} />
                  <h3 className="related-product-name" title={item.name}>{item.name}</h3>
                  <p>Rs. {Number(item.new_price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
