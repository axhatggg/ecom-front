import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import { getCategoryImage, getBrandImage } from '../utils/categoryImages';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    // Placeholder for checkout functionality
    alert('Checkout functionality would be implemented here');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Add some products to your cart to get started!</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button 
            className="clear-cart-btn"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => {
              // Get appropriate image for cart item
              const displayImage = item.product.image || 
                (item.product.brand ? getBrandImage(item.product.brand, item.product.category) : 
                 getCategoryImage(item.product.category, item.product.name, item.product.brand));

              return (
                <div key={item.product._id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={displayImage} 
                      alt={item.product.name}
                      onError={(e) => {
                        e.target.src = getCategoryImage('default');
                      }}
                    />
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">
                      <Link to={`/product/${item.product._id}`}>
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="item-description">
                      {item.product.description && item.product.description.length > 100
                        ? `${item.product.description.substring(0, 100)}...`
                        : item.product.description
                      }
                    </p>
                    <div className="item-price">
                      ₹{item.product.price?.toLocaleString()} each
                    </div>
                  </div>

                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.product._id}`}>Quantity:</label>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        id={`quantity-${item.product._id}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.product._id, parseInt(e.target.value))}
                        min="1"
                        className="quantity-input"
                      />
                      <button
                        className="quantity-btn"
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </div>

                  <div className="item-actions">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-content">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              
              <div className="summary-total">
                <span>Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <div className="checkout-actions">
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
                
                <Link to="/" className="continue-shopping-link">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 