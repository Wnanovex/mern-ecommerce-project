import { PRODUCTS_URL , UPLOAD_URL } from "../constants.js";// import the constant PRODUCTS_URL UPLOAD_URL
import { apiSlice } from "./apiSlice.js";// import apiSlice

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCTS_URL}`,
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation({
            query: ({productId ,productData}) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "PUT",
                body: productData,
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "DELETE",
            }),
            providesTags: ["Product"]
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/allProducts`,
            }),
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            providesTags: (result, error, productId) => [
                {type: "Product", id: productId}
            ]
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        }),
        getNewProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/new`,
            }),
            keepUnusedDataFor: 5,
        }),
        getSomeProducts: builder.query({
            query: ({keyword}) => ({
                url: `${PRODUCTS_URL}`,
                params: {keyword},
            }),
            providesTags: ["Product"],
            keepUnusedDataFor: 5,
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data,
            }),
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        getFilteredProducts: builder.query({
            query: ({checked, radio}) => ({
                url: `${PRODUCTS_URL}/filtered-products`,
                method: "POST",
                body: {checked, radio},
            })
        }),
    }), 
});

export const {useCreateProductMutation, 
              useUpdateProductMutation, 
              useDeleteProductMutation,
              useGetAllProductsQuery,
              useGetProductByIdQuery,
              useGetTopProductsQuery,
              useGetNewProductsQuery,
              useGetSomeProductsQuery,
              useCreateReviewMutation,
              useGetProductDetailsQuery,
              useUploadProductImageMutation,
              useGetFilteredProductsQuery} = productApiSlice;