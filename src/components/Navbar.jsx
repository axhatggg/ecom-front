import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { searchProducts, setQuery } from '../store/slices/searchSlice';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(setQuery(searchTerm));
      dispatch(searchProducts(searchTerm));
      navigate('/search');
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if server logout fails, we'll still redirect to home
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            Scom
          </Link>
        </div>

        <div className="nav-center">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>

        <div className="nav-right">
          {isAuthenticated ? (
            <>
              <span className="welcome-text">
                Welcome, {user?.fullName || user?.name || user?.username}
                {user?.role === 'admin' && <span className="admin-badge">(Admin)</span>}
              </span>
              
              {user?.role === 'admin' && (
                <Link to="/add-product" className="nav-link admin-link">
                  Add Product
                </Link>
              )}
              
              <Link to="/cart" className="nav-link cart-link">
                Cart ({cartItemCount})
              </Link>
              
              <button onClick={handleLogout} className="nav-button logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 