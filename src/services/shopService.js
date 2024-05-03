import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../databases/realtimeDatabase'

export const shopApi = createApi({
    reducerPath:"shopApia",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => 'products.json',
            transformResponse: (response) => Object.values(response)
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                if (responseTransformed.length) return responseTransformed[0]
                return null
            }
        }),
        postOrder: builder.mutation({
            query: ({...order}) =>({
                url:'orders.json',
                method: 'POST',
                body: order
            })
        })
    })
})

export const { 
    useGetProductByIdQuery, 
    useGetAllProductsQuery, 
    usePostOrderMutation 
} = shopApi
