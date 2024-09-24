import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorites: (state, action) => {
            if (!state.some(product => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },
        removeFavorites: (state, action) => {
            // Remove the favorites with the matching id
            return state.filter(product => product._id !== action.payload._id);
        },
        setFavorites: (state, action) => {
            // set the favorites from localStorage
            return action.payload
        }
    }
});

export const { addFavorites, removeFavorites, setFavorites } = favoriteSlice.actions;

export const selectFavoriteProduct = state => state.favorites;

export default favoriteSlice.reducer;

