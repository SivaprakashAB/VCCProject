import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movieSlice.js';

// created a store for movies list
export const store = configureStore({
    reducer: {
        movies: moviesReducer,
    },
});