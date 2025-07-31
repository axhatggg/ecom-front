import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import store from './store/store';
import { loadUserFromToken } from './store/slices/authSlice';
import { loadCartFromStorage } from './store/slices/cartSlice';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import SearchResults from './pages/SearchResults';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Styles
import './App.css';

function AppContent() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.auth);

  useEffect(() => {
    // Load user from stored token if it exists
    if (accessToken || localStorage.getItem('accessToken')) {
      dispatch(loadUserFromToken());
    }
    // Load cart from localStorage
    dispatch(loadCartFromStorage());
  }, [dispatch, accessToken]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/add-product" element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App; 