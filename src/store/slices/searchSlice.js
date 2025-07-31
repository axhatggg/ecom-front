import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for searching products via Python backend
export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      // Using your actual Python backend URL
      const response = await axios.get(`https://search-optimizer-bibv.onrender.com/search?q=${encodeURIComponent(query)}`);
      return { query, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    total: 0,
    isLoading: false,
    error: null,
    hasSearched: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.total = 0;
      state.error = null;
      state.hasSearched = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results || [];
        state.total = action.payload.total || 0;
        state.query = action.payload.query;
        state.hasSearched = true;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.hasSearched = true;
        state.results = [];
        state.total = 0;
      });
  },
});

export const { setQuery, clearSearch, clearError } = searchSlice.actions;
export default searchSlice.reducer; 