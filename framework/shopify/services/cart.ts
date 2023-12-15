
import {  createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query'
import { getCheckoutQuery, checkoutLineItemAddMutation,checkoutCreateMutation,
    checkoutLineItemUpdateMutation,checkoutLineItemRemoveMutation} from '@framework/utils'
import type { Mutation,CheckoutLineItemsAddPayload,MutationCheckoutLineItemsUpdateArgs,
    CheckoutCreatePayload } from '@framework/schemas/schema'
import Cookies, { CookieAttributes } from 'js-cookie'
import { API_TOKEN, API_URL,  SHOPIFY_CHECKOUT_ID_COOKIE,} from '@framework/const'
  
import { normalizeCart } from '@framework/utils/normalize'
import { serviceApi } from './serviceApi';
const cartId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE)


type SelectedOption = {
   
    id?: string
   
    name: string
  
    value: string
  }
  type CartItemBody= {
 
    variantId: string
  
    productId?: string
  
    quantity?: number
  
    optionsSelected?: SelectedOption[]
  }


  export const cartApi = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
      getCart: builder.query<any,void>({
        query: () => ({
    
          document: gql`${getCheckoutQuery}`,
          variables: {
              checkoutId: cartId,
            },
     
        }),
        providesTags:['Cart'],
        transformResponse: (response:any) =>    {
        
          return normalizeCart(response?.node) as any
        },
      }),
      addCart: builder.mutation<{checkoutLineItemsAdd:CheckoutLineItemsAddPayload}, CartItemBody>({
        query: ({ variantId, quantity }) => ({
          document: gql`${checkoutLineItemAddMutation}`,
          variables: {
              checkoutId:cartId,
              lineItems: {
                  variantId: variantId,
                  quantity: quantity ?? 1,
                },
            }
        }),
        transformResponse: (response:any) =>    {
        
        return normalizeCart(response.checkoutLineItemsAdd?.checkout) as any},
       invalidatesTags:['Cart'],
      }),
      removeCart: builder.mutation<Mutation,{id?:string}>({
          query: ({id}) => ({
            document: gql`${checkoutLineItemRemoveMutation}`,
            variables: { checkoutId: cartId, lineItemIds: [id] },
          }),
  
         transformResponse: (response:any) =>    {
        
          return normalizeCart(response?.checkoutLineItemsRemove?.checkout) as any},
         invalidatesTags:['Cart'],
        }),
        updateCart: builder.mutation<Mutation, {id?:string,productId?:string,quantity?:number}>({
          query: ({ id, productId, quantity }) => ({
            document: gql`${checkoutLineItemUpdateMutation}`,
            variables: { checkoutId: cartId, lineItemIds: [{id,quantity}] },
          }),
      
         transformResponse: (response:any) =>    {
          return normalizeCart(response?.checkoutLineItemsUpdate?.checkout) as any},
         invalidatesTags:['Cart'],
         
        }),
        createCart: builder.mutation<{checkoutCreate:CheckoutCreatePayload}, CartItemBody[]>({
          query: (lineItems) => ({
            document: gql`${checkoutCreateMutation}`,
            variables: {
              input: { lineItems },
            }
          }),
         // transformResponse: (response: CartResponse) => response.checkoutCreate?.checkout,
         transformResponse: (response:any) =>    {
          return normalizeCart(response?.checkoutCreate?.checkout) as any},       
         invalidatesTags:['Cart'],
        }),
    }),
  });





export const { useGetCartQuery,useAddCartMutation,useUpdateCartMutation,useRemoveCartMutation} = cartApi