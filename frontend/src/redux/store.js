import { configureStore } from "@reduxjs/toolkit";// import { configureStore } 
import { setupListeners } from "@reduxjs/toolkit/query/react";// import { setupListen }
import { apiSlice } from "./api/apiSlice.js";// import apiSlice 
import authReducer from "./features/auth/authSlice.js"// import authReducer
import favoritesReducer from "./features/favorites/favoriteSlice.js"// import favoritesReducer
import {getFavoritesFromLocalStorage} from "../Utils/localStorage.js"
import cartReducer from "./features/cart/cartSlice.js"
import shopReducer from "./features/shop/shopSlice.js"

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({ // create a store
    reducer: { // create a reducer function or define a reducers functions
        [apiSlice.reducerPath]: apiSlice.reducer,// apiSlice.reducerPath === apiSlice.reducer
        auth: authReducer,// use authReducer in all components
        favorites: favoritesReducer,//
        cart: cartReducer,// use cartReducer in all components
        shop: shopReducer,
    },
    preloadedState: { // preloaded state
        favorites: initialFavorites, // use initialFavorites in preloaded state
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),// use middleware to manages cache lifetimes and expiration.
    devTools: true,// Starting the redux extension in browser \\ false-> interdictions to access the redux extension in browser because anyone can see my data
});

setupListeners(store.dispatch);// 

export default store;// export store