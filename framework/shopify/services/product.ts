
import { gql } from 'graphql-request'

import {
  getAllProductsQuery,
} from '@framework/utils'
import {
  GetAllProductsQuery,
  Product as ShopifyProduct,
  ProductEdge,
} from '@framework/schemas/schema'
import { normalizeProduct } from '@framework/utils/normalize'
import { serviceApi } from './serviceApi';


export const productStatuses = ['draft', 'published', 'pending_review'] as const




export const productApi = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<
        GetAllProductsQuery,
          { first?: number; query?: string ,  sortKey?: string,
          reverse?: boolean}
        >({
          query: ({ first, query,sortKey ,reverse }) => ({

            document: gql`${getAllProductsQuery}`,
            variables: { first,query,sortKey ,reverse},

          }),
          providesTags:['Product'],
          transformResponse: (response: any) =>  response?.products?.edges?.map(({ node }:any) =>
          normalizeProduct(node as ShopifyProduct)
        ),
    //     products: products?.map(({ node }) =>
    //     normalizeProduct(node as ShopifyProduct)
    //   )
    //     ,
        }),

      }),

})
export const { useGetProductsQuery } = productApi