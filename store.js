import { configureStore, combineReducers } from '@reduxjs/toolkit';
import movieReducer from './Slices/movieSlice'; 

const rootReducer = combineReducers({
  movie: movieReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
