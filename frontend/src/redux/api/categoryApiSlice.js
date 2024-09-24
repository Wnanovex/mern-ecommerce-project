import { CATEGORY_URL } from "../constants.js";// import the constant CATEGORY_URL
import { apiSlice } from "./apiSlice.js";// import apiSlice

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: newCategory,
            }),
            invalidatesTags: ["Category"]
        }),
        updateCategory: builder.mutation({
            query: ({categoryId, updatedCategory}) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "PUT",
                body: updatedCategory,
            }),
            invalidatesTags: ["Category"]
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"]
        }),
        getAllCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categories`,
            }),
            providesTags: ["Category"],
        }),
    }),  // endpoints endpoint with mutation -> mutation can update and delete and post data

});

export const { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery } = categoryApiSlice;