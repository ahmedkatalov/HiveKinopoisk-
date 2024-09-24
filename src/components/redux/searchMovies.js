import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMoviesByName } from "./api"; 

export const searchMoviesByName = createAsyncThunk(
    "movies/searchMoviesName",
    async (searchInput, { rejectWithValue }) => {
        try {
            const movies = await fetchMoviesByName(searchInput); 
            return movies;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

let initialState = {
    movies: [],
    loading: false,
    error: null,
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (er) => {
        er
            .addCase(searchMoviesByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMoviesByName.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(searchMoviesByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default moviesSlice.reducer;
