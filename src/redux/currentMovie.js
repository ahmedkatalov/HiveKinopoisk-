import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMovieById } from "./api";

const initialState = {
    currentMovie: {} 
}

const slice = createSlice({
    name: "currentMovieSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMovieById.fulfilled, (state, action) => {
            state.currentMovie = action.payload
        })
    }
});

export const { getCurrentMovie } = slice.actions;
export default slice.reducer;

export const getMovieById = createAsyncThunk(
    "movie/get",
    async (id, { rejectWithValue }) => {
        try {
            const movies = await fetchMovieById(id); 
            return movies;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);