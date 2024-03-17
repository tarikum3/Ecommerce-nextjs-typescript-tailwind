import { createApi,  } from '@reduxjs/toolkit/query/react';
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query'
import { API_TOKEN, API_URL,  } from '@framework/const'

export const serviceApi = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: API_URL,
        prepareHeaders: (headers, ) => {
          
              headers.set('X-Shopify-Storefront-Access-Token', API_TOKEN!)
              headers.set('Content-Type', 'application/json')
          
            return headers
          },
      }),
  tagTypes: ['Customer', 'Cart','Product'],
  endpoints: () => ({}),
});