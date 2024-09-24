import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';// import fetchBaseQuery, createApi
import { BASE_URL } from '../constants.js';// import the constant BASE_URL

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL}); // defined a constant its value BASE_URL

export const apiSlice = createApi({ // export and create a single api in project
    reducerPath: 'api',// name of the reducerPath
    baseQuery,// use base url query
    tagTypes: ['Product', 'Order', 'Category', 'User'],
    endpoints: () => ({}),// use an empty endpoints
})