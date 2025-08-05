import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct, clearError } from '../store/slices/productSlice';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    count: '',
    category: '',
    color: '',
    brand: '',
    images: []
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addProductLoading, addProductError } = useSelector(state => state.products);

  const handleChange = (e) => {
    if (e.target.name === 'images') {
      setFormData({
        ...formData,
        images: Array.from(e.target.files)
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      count: parseInt(formData.count)
    };

    console.log('Submitting product data:', productData);

    try {
      await dispatch(addProduct(productData)).unwrap();
      alert('Product added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div className="add-product-page">
      <div className="container">
        <div className="add-product-form">
          <h2>Add New Product</h2>
          
          {addProductError && (
            <div className="error-message">
              {addProductError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter product description"
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="count">Count/Stock</label>
                <input
                  type="number"
                  id="count"
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                  required
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  placeholder="Enter product category"
                />
              </div>

              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  placeholder="Enter product color"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                placeholder="Enter product brand"
              />
            </div>

            <div className="form-group">
              <label htmlFor="images">Product Images</label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleChange}
                accept="image/*"
                multiple
                className="file-input"
              />
              <small>You can select multiple images</small>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={addProductLoading}
              >
                {addProductLoading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct; 