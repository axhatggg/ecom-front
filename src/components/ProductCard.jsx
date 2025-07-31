import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { getCategoryImage, getBrandImage } from '../utils/categoryImages';

const ProductCard = ({ product, isSearchResult = false }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    dispatch(addToCart({ product, quantity: 1 }));
  };

  // Handle both main backend and search result product structures
  const productId = product._id || `search-${product.name}-${Math.random()}`;
  const productName = product.name;
  const productDescription = product.description;
  const productPrice = product.price;
  const productImage = product.image;
  const productStock = product.stock;
  const productCategory = product.category;
  const productBrand = product.brand;
  const productColor = product.color;
  const productGender = product.gender;
  const productRating = product.rating;
  const productDiscount = product.discount;

  // Calculate discounted price if discount is available
  const discountedPrice = productDiscount ? productPrice - (productPrice * productDiscount / 100) : productPrice;

  // Get appropriate image - use provided image or fallback to category/brand image
  const displayImage = productImage || 
    (productBrand ? getBrandImage(productBrand, productCategory) : getCategoryImage(productCategory, productName, productBrand));

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={displayImage} 
          alt={productName}
          onError={(e) => {
            // Fallback to default image if category image fails to load
            e.target.src = getCategoryImage('default');
          }}
        />
        {productDiscount && (
          <div className="discount-badge">
            -{productDiscount}%
          </div>
        )}
        {!productImage && (
          <div className="category-overlay">
            {productBrand && <div className="brand-overlay">{productBrand}</div>}
            {productCategory && <div className="category-overlay-text">{productCategory}</div>}
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">
          {isSearchResult ? (
            <span>{productName}</span>
          ) : (
            <Link to={`/product/${productId}`}>
              {productName}
            </Link>
          )}
        </h3>

        {/* Show additional info for search results */}
        {isSearchResult && (
          <div className="product-metadata">
            {productBrand && (
              <span className="product-brand">Brand: {productBrand}</span>
            )}
            {productCategory && (
              <span className="product-category">Category: {productCategory}</span>
            )}
            {productColor && (
              <span className="product-color">Color: {productColor}</span>
            )}
            {productGender && (
              <span className="product-gender">For: {productGender}</span>
            )}
            {productRating && (
              <span className="product-rating">⭐ {productRating}/5</span>
            )}
          </div>
        )}
        
        <p className="product-description">
          {productDescription && productDescription.length > 100
            ? `${productDescription.substring(0, 100)}...`
            : productDescription
          }
        </p>

        <div className="product-pricing">
          {productDiscount ? (
            <div className="price-with-discount">
              <span className="original-price">₹{productPrice?.toLocaleString()}</span>
              <span className="discounted-price">₹{discountedPrice?.toLocaleString()}</span>
            </div>
          ) : (
            <div className="product-price">
              ₹{productPrice?.toLocaleString()}
            </div>
          )}
        </div>

        {productStock !== undefined && (
          <div className="stock-info">
            <span className={productStock > 0 ? 'in-stock' : 'out-of-stock'}>
              {productStock > 0 ? `${productStock} in stock` : 'Out of stock'}
            </span>
          </div>
        )}
        
        <div className="product-actions">
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!isAuthenticated || (productStock !== undefined && productStock <= 0)}
          >
            Add to Cart
          </button>
          
          {!isSearchResult && (
            <Link 
              to={`/product/${productId}`} 
              className="view-details-btn"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 