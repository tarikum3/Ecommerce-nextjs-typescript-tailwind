
import {  createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query'
import { getCustomerQuery, getCustomerToken,customerCreateMutation,
    customerAccessTokenCreateMutation ,customerAccessTokenDeleteMutation} from '@framework/utils'
import type { GetCustomerQuery, GetCustomerQueryVariables,Mutation } from '@framework/schemas/schema'
export const customerStatuses = ['draft', 'published', 'pending_review'] as const
import { API_TOKEN, API_URL } from '@framework/const'
import { serviceApi } from './serviceApi';




export const customerApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.query<
    GetCustomerQuery,
   void
    >({
      query: () => ({
  
        document: gql`${getCustomerQuery}`,
        variables: { customerAccessToken: getCustomerToken()  },
   
      }),
      providesTags:['Customer'],
      transformResponse: (response: any) => {
        if (!response.customer) {
            return null
          }
       
          return {
            id: response.customer.id,
            firstName: response.customer.firstName ?? 'N/A',
            lastName: response.customer.lastName ?? '',
            ...(response.customer.email && { email: response.customer.email }),
            ...(response.customer.phone && { phone: response.customer.phone }),
          }
    },
    }),
    login: builder.mutation<Mutation, {email:string, password :string}>({
      query: ({ email, password }) => ({
        document: gql`${customerAccessTokenCreateMutation}`,
        variables: {
            input: { email, password },
          }
      }),
     transformResponse: (response: any) => response?.customerAccessTokenCreate??null,
     invalidatesTags:['Customer'],
    }),
    logout: builder.mutation<void, void>({
        query: () => ({
          document: gql`${customerAccessTokenDeleteMutation}`,
          variables: {
            customerAccessToken: getCustomerToken(),
          },
        }),
       // transformResponse: (response: CustomerResponse) => response.data.customer,
       invalidatesTags:['Customer'],
      }),
    signup: builder.mutation<Mutation, {email:string,
         password :string,firstName:string,lastName:string}>({
        query: ({ firstName, lastName, email, password }) => ({
          document: gql`${customerCreateMutation}`,
          variables: {
              input: { firstName, lastName, email, password  },
            }
        }),
        transformResponse: (response: any) => response.customerCreate,
       invalidatesTags:['Customer'],
      }),
  }),
});

// export const customerApi = createApi({
//   reducerPath:'Customer',
//   baseQuery: graphqlRequestBaseQuery({
//     url: API_URL,
//     prepareHeaders: (headers, { getState }) => {
      
//           headers.set('X-Shopify-Storefront-Access-Token', API_TOKEN!)
//           headers.set('Content-Type', 'application/json')
      
//         return headers
//       },
//   }),
//   //keepUnusedDataFor:30,
//   tagTypes:['Customer'],
//   endpoints: (builder) => ({
//     getCustomer: builder.query<
//     GetCustomerQuery,
//    void
//     >({
//       query: () => ({
  
//         document: gql`${getCustomerQuery}`,
//         variables: { customerAccessToken: getCustomerToken()  },
   
//       }),
//       providesTags:['Customer'],
//       transformResponse: (response: any) => {
//         if (!response.customer) {
//             return null
//           }
       
//           return {
//             id: response.customer.id,
//             firstName: response.customer.firstName ?? 'N/A',
//             lastName: response.customer.lastName ?? '',
//             ...(response.customer.email && { email: response.customer.email }),
//             ...(response.customer.phone && { phone: response.customer.phone }),
//           }
//     },
//     }),
//     login: builder.mutation<Mutation, {email:string, password :string}>({
//       query: ({ email, password }) => ({
//         document: gql`${customerAccessTokenCreateMutation}`,
//         variables: {
//             input: { email, password },
//           }
//       }),
//      transformResponse: (response: any) => response?.customerAccessTokenCreate??null,
//      invalidatesTags:['Customer'],
//     }),
//     logout: builder.mutation<void, void>({
//         query: () => ({
//           document: gql`${customerAccessTokenDeleteMutation}`,
//           variables: {
//             customerAccessToken: getCustomerToken(),
//           },
//         }),
//        // transformResponse: (response: CustomerResponse) => response.data.customer,
//        invalidatesTags:['Customer'],
//       }),
//     signup: builder.mutation<Mutation, {email:string,
//          password :string,firstName:string,lastName:string}>({
//         query: ({ firstName, lastName, email, password }) => ({
//           document: gql`${customerCreateMutation}`,
//           variables: {
//               input: { firstName, lastName, email, password  },
//             }
//         }),
//         transformResponse: (response: any) => response.customerCreate,
//        invalidatesTags:['Customer'],
//       }),
//   }),
// })

//export const { useGetProductsQuery, useGetProductQuery } = api
export const { useGetCustomerQuery,useLoginMutation,useLogoutMutation, useSignupMutation} = customerApi