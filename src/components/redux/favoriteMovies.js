import {createSlice} from "@reduxjs/toolkit"

let initialState = {
    favoriteMovie: []
}


const favoriteMovies = createSlice({
    name: "favorite", 
    initialState,
    reducers: {
        addFavoriteMovie: (state, action) => {
            state.favoriteMovie = action.payload
        }
    }
})

export const {addFavoriteMovie} = favoriteMovies.actions;
export default favoriteMovies.reducer 