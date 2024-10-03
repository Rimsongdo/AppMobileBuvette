import { configureStore } from '@reduxjs/toolkit';
import productReducer from './cartSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
