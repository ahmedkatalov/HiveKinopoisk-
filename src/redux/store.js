import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './searchMovies';
import favoriteReducer from './favoriteMovies';
import genreMovie from './genreMovie';
import currentMovieReducer from './currentMovie';

export const store = configureStore({
  reducer: {
    currentMovie: currentMovieReducer,
    movies: moviesReducer,
    favorite: favoriteReducer,
    genre: genreMovie
  },
});
