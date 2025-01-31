import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    categories: [],
    products: [], 
    checked: [], 
    radio: [], 
    brandCheckboxes: {},
    checkedBrands: [],
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setChecked: (state, action) => {
            state.checked = action.payload;
        },
        setRadio: (state, action) => {
            state.radio = action.payload;
        },
        setBrandCheckboxes: (state, action) => {//oooooo
            state.brandCheckboxes = action.payload;
        },
        setCheckedBrands: (state, action) => {
            state.checkedBrands = action.payload;
        },

    },
 });

 export const { setCategories, setProducts, setChecked, setRadio, setBrandCheckboxes, setCheckedBrands } = shopSlice.actions;

export default shopSlice.reducer;