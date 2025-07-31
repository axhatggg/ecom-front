import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.product._id === product._id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      
      // Calculate total
      state.total = state.items.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
      );
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product._id !== productId);
      
      // Calculate total
      state.total = state.items.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
      );
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product._id === productId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product._id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
      
      // Calculate total
      state.total = state.items.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
      );
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cart');
    },
    loadCartFromStorage: (state) => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      state.items = savedCart;
      state.total = savedCart.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0
      );
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  loadCartFromStorage 
} = cartSlice.actions;

export default cartSlice.reducer; 