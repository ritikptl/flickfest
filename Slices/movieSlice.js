import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    randomMovie: null,
    favoriteMovies: [],
  },
  reducers: {
    setRandomMovie: (state, action) => {
      state.randomMovie = action.payload;
    },
    addToFavorites: (state, action) => {
      const movieToAdd = action.payload;
      state.favoriteMovies.push(movieToAdd);
    },
  },
});

export const { setRandomMovie, addToFavorites } = movieSlice.actions;
export default movieSlice.reducer;
