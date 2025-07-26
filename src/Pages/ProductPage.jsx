import React, { useEffect, useState, useContext } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './CSS/ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const navigate = useNavigate();

  const { addtocart, removefromcart, cartitems, all_products } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = all_products.find(p => p.id === productId);
    if (found) {
      setProduct(found);
      if (found.images?.length) {
        setActiveImage(found.images[0]);
      }
    }
  }, [productId, all_products]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addtocart(product.id);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (!product) return <div>Loading product...</div>;

  return (
    <div className="product-page-container">
      <div className="product-page">
        <div className="image-section">
          <div className="thumbnails">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setActiveImage(img)}
                className={img === activeImage ? 'active' : ''}
              />
            ))}
          </div>
          <div className="main-image">
            <img src={activeImage} alt="Product" />
          </div>
        </div>

        <div className="details-section">
          <h2>{product.name}</h2>
          <p className="subtitle">Collector's Edition</p>
          <div className="price">
            <span className="old">Rs. {product.old_price}</span>
            <span className="new">Rs. {product.new_price}</span>
            <span className="discount">
              -{Math.round(100 - (product.new_price / product.old_price) * 100)}%
            </span>
          </div>

          <div className="quantity-and-buttons">
            <div className="quantity">
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>
            <button className="add-btn" onClick={handleAddToCart}>ADD TO CART</button>
          </div>

          <button className="buy-now" onClick={handleBuyNow}>BUY IT NOW</button>

          <div className="description">
            <h3>Description</h3>
            <p>{product.description || "No description available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
