import { USERS_URL } from "../constants.js";// import the constant USERS_URL
import { apiSlice } from "./apiSlice.js";// import apiSlice

export const userApiSlice = apiSlice.injectEndpoints({ // inject endpoints into the apiSlice
    endpoints: (builder) => ({ // use the builder  to create a new endpoint
        login: builder.mutation({// use the builder to create a new login endpoint with mutation -> mutation can update and delete and post 
            query: (data) => ({ // create a new query with parameter data 
                url: `${USERS_URL}/auth`,// use the specified url with use the usersUrl
                method: "POST",// use the specified method
                body: data,// use data in body
            }),
        }),
        logoutApiCall: builder.mutation({// use the builder to create a logoutApiCall endpoint with mutation -> mutation can update and delete and post 
            query: () => ({ // create a new query
                url: `${USERS_URL}/logout`,// use the specified url with use the usersUrl
                method: "POST",// use the specified method
            }),
        }),
        register: builder.mutation({// use the builder to create a new register endpoint with mutation -> mutation can update and delete and post 
            query: (data) => ({ // create a new query with parameter data 
                url: `${USERS_URL}`,// use the specified url with use the usersUrl
                method: "POST",// use the specified method
                body: data,// use data in body
            }),
        }),
        updateProfile: builder.mutation({// use the builder to updateProfile endpoint with mutation -> mutation can update and delete and post 
            query: (data) => ({ // create a new query with parameter data 
                url: `${USERS_URL}/profile`,// use the specified url with use the usersUrl
                method: "PUT",// use the specified method
                body: data,// use data in body
            }),
        }),
        getUsers: builder.query({// use the builder to getUsers endpoint with query -> query can only fetch data
            query: () => ({ // create a new query 
                url: USERS_URL,// use the specified url with use the usersUrl
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({// use the builder to deleteUser endpoint with mutation -> mutation can update and delete and post 
            query: (userId) => ({ // create a new query with parameter userId 
                url: `${USERS_URL}/${userId}`,// use the specified url with use the usersUrl
                method: "DELETE",// use the specified method
            }),
        }),
        updateUser: builder.mutation({// use the builder to updateUser endpoint with mutation -> mutation can update and delete and post
            query: (data) => ({ // create a new query with parameter data 
                url: `${USERS_URL}/${data.userId}`,// use the specified url with use the usersUrl
                method: "PUT",// use the specified method
                body: data,// use data in body
            }),
            invalidatesTags: ['User']
        })
    })
})



export const { useLoginMutation,
              useLogoutApiCallMutation, 
              useRegisterMutation, 
              useUpdateProfileMutation,
              useGetUsersQuery, 
              useDeleteUserMutation, 
              useUpdateUserMutation} = userApiSlice;// export the mutation login endpoint to components of react
