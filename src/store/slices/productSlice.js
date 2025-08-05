import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://search-optimizer.onrender.com/api/v1';

// Async thunks for product operations
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.accessToken || localStorage.getItem('accessToken');
      
      // Create FormData for the product
      const formData = new FormData();
      
      // Add text fields
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('count', productData.count);
      formData.append('category', productData.category);
      formData.append('color', productData.color);
      formData.append('brand', productData.brand);
      
      // Add images if provided
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image, index) => {
          formData.append('images', image);
        });
      }
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      };
      
      console.log('Adding product with data:', {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        count: productData.count,
        category: productData.category,
        color: productData.color,
        brand: productData.brand,
        imagesCount: productData.images ? productData.images.length : 0
      });
      
      const response = await axios.post(`${API_BASE_URL}/products/add`, formData, config);
      return response.data;
    } catch (error) {
      console.error('Add product error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to add product');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const fetchProductsWithFilters = createAsyncThunk(
  'products/fetchProductsWithFilters',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      
      // Add pagination parameters
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      
      // Add sorting parameters
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
      
      // Add filtering parameters
      if (filters.category) params.append('category', filters.category);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.search) params.append('search', filters.search);
      
      const url = `${API_BASE_URL}/products${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentProduct: null,
    isLoading: false,
    error: null,
    addProductLoading: false,
    addProductError: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0,
      hasNextPage: false,
      hasPrevPage: false,
      limit: 10
    },
    filters: {
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.addProductError = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products cases
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle the nested response structure
        if (action.payload.data && action.payload.data.products) {
          state.products = action.payload.data.products;
          state.pagination = action.payload.data.pagination || state.pagination;
          state.filters = action.payload.data.filters || state.filters;
        } else {
          // Fallback for different response structures
          state.products = action.payload.products || action.payload.data || action.payload;
        }
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add product cases
      .addCase(addProduct.pending, (state) => {
        state.addProductLoading = true;
        state.addProductError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductLoading = false;
        state.products.push(action.payload.product || action.payload.data || action.payload);
        state.addProductError = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductLoading = false;
        state.addProductError = action.payload;
      })
      // Fetch product by ID cases
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload.product || action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch products with filters cases
      .addCase(fetchProductsWithFilters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsWithFilters.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle the nested response structure
        if (action.payload.data && action.payload.data.products) {
          state.products = action.payload.data.products;
          state.pagination = action.payload.data.pagination || state.pagination;
          state.filters = action.payload.data.filters || state.filters;
        } else {
          // Fallback for different response structures
          state.products = action.payload.products || action.payload.data || action.payload;
        }
        state.error = null;
      })
      .addCase(fetchProductsWithFilters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer; 