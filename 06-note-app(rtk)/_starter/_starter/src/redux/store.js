import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';

const store = configureStore({
  reducer: {
    // ชื่อ Store รู้จัก
    n1: noteReducer,
    // a1:AuthReducer
  },
});

export default store;
