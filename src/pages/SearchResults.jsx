import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
  const { query, results, total, isLoading, error, hasSearched } = useSelector(state => state.search);

  if (isLoading) {
    return (
      <div className="search-results-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner">Searching...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-page">
        <div className="container">
          <div className="error-container">
            <h2>Search Error</h2>
            <p>{error}</p>
            <p>Please try again or check if your Python backend is running.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="search-results-page">
        <div className="container">
          <div className="no-search">
            <h2>No search performed</h2>
            <p>Use the search bar above to find products.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="container">
        <div className="search-header">
          <h2>Search Results</h2>
          {query && (
            <p className="search-query">
              Results for: <span className="query-text">"{query}"</span>
            </p>
          )}
          <p className="results-count">
            {total} {total === 1 ? 'result' : 'results'} found
          </p>
        </div>

        {results && results.length > 0 ? (
          <div className="search-results-grid">
            {results.map((product, index) => (
              <div key={`${product.name}-${index}`} className="search-result-item">
                <ProductCard product={product} isSearchResult={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search terms or browse our full catalog.</p>
          </div>
        )}

        {/* Display raw JSON results if needed for debugging */}
        {process.env.NODE_ENV === 'development' && results && (
          <div className="debug-results">
            <h4>Debug - Raw Results:</h4>
            <p><strong>Total:</strong> {total}</p>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 