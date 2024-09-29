import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './searchMovies';
import favoriteReducer from './favoriteMovies';
import genreMovie from './genreMovie';
import trailerReducer from './trailerMovie/reducer';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorite: favoriteReducer,
    trailer: trailerReducer,
    genre: genreMovie
  },
});
