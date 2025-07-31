import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearCurrentProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { getCategoryImage, getBrandImage } from '../utils/categoryImages';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { currentProduct, isLoading, error } = useSelector(state => state.products);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    dispatch(addToCart({ product: currentProduct, quantity }));
    alert(`Added ${quantity} ${currentProduct.name}(s) to cart!`);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  if (isLoading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner">Loading product...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="error-container">
            <h2>Error loading product</h2>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="not-found">
            <h2>Product not found</h2>
            <button 
              className="back-button"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get appropriate image for product details
  const displayImage = currentProduct.image || 
    (currentProduct.brand ? getBrandImage(currentProduct.brand, currentProduct.category) : 
     getCategoryImage(currentProduct.category, currentProduct.name, currentProduct.brand));

  return (
    <div className="product-details-page">
      <div className="container">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="product-details">
          <div className="product-image-section">
            <img 
              src={displayImage} 
              alt={currentProduct.name}
              className="product-image-large"
              onError={(e) => {
                e.target.src = getCategoryImage('default');
              }}
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{currentProduct.name}</h1>
            
            {currentProduct.category && (
              <div className="product-category">
                Category: <span>{currentProduct.category}</span>
              </div>
            )}

            <div className="product-price-large">
              ₹{currentProduct.price?.toLocaleString()}
            </div>

            <div className="product-description-full">
              <h3>Description</h3>
              <p>{currentProduct.description}</p>
            </div>

            {currentProduct.stock !== undefined && (
              <div className="stock-info">
                <span className={currentProduct.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                  {currentProduct.stock > 0 
                    ? `${currentProduct.stock} in stock` 
                    : 'Out of stock'
                  }
                </span>
              </div>
            )}

            <div className="purchase-section">
              <div className="quantity-section">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={currentProduct.stock || 999}
                    className="quantity-input"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={currentProduct.stock && quantity >= currentProduct.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="add-to-cart-btn-large"
                onClick={handleAddToCart}
                disabled={!isAuthenticated || (currentProduct.stock !== undefined && currentProduct.stock <= 0)}
              >
                {!isAuthenticated 
                  ? 'Login to Add to Cart'
                  : currentProduct.stock === 0 
                    ? 'Out of Stock'
                    : 'Add to Cart'
                }
              </button>

              <div className="total-price">
                Total: ₹{(currentProduct.price * quantity).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 