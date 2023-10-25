import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';

const store = configureStore({
  reducer: {
    // ชื่อ Store รู้จัก
    n1: noteReducer,
  },
});

export default store;
