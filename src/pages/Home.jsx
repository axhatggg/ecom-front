import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading products</h2>
        <p>{error}</p>
        <button 
          className="retry-button"
          onClick={() => dispatch(fetchProducts())}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="container">
        <header className="page-header">
          <h1>Welcome to Our Store</h1>
          <p>Discover amazing products at great prices</p>
        </header>

        {products && products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h2>No products available</h2>
            <p>Check back later for new arrivals!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 