import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './searchMovies';
import favoriteReducer from './favoriteMovies';
import genreMovie from './genreMovie';


export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorite: favoriteReducer,
    genre: genreMovie
  },
});
