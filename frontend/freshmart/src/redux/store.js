import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: (state = { items: [] }, action) => {
      switch (action.type) {
        case 'SET_PRODUCTS': return { ...state, items: action.payload };
        default: return state;
      }
    },
  },
});