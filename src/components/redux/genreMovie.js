import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMoviesByGenre } from "./genreApi";

const initialState = {
    selectedGenre: '',
    movies: [],
    loading: false,
    error: null,
};

export const fetchMoviesBySelectedGenre = createAsyncThunk(
    'genre/fetchMoviesBySelectedGenre',
    async (genre, { rejectWithValue }) => {
        try {
            const movies = await fetchMoviesByGenre(genre);
            return movies;
        } catch (error) {
            const errorMessage = error?.message || 'Не удалось получить фильмы';
            return rejectWithValue(errorMessage);
        }
    }
);

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {
        setGenre: (state, action) => {
            state.selectedGenre = action.payload;  
        },
        clearGenre: (state) => {
            state.selectedGenre = '';  
        }
    },
    extraReducers: (load) => {
        load
            .addCase(fetchMoviesBySelectedGenre.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesBySelectedGenre.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;  
            })
            .addCase(fetchMoviesBySelectedGenre.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setGenre, clearGenre } = genreSlice.actions;

export default genreSlice.reducer;
