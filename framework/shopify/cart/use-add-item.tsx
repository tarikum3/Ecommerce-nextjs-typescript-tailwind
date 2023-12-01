import { useCallback } from 'react'

import { CommerceError } from '@framework/utils/errors'


import {
  checkoutLineItemAddMutation,
  getCheckoutId,
  checkoutToCart,
  checkoutCreate,
} from '@framework/utils'
import { Mutation, MutationCheckoutLineItemsAddArgs,CheckoutLineItemsAddPayload } from '@framework/schemas/schema'
//import { useCommerce } from '@framework'
import useCart from './use-cart'
import fetcher from '@framework/fetcherNew'













export default function useAddItem() {
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
 

  const { mutate } = useCart()
  // const { providerRef, fetcherRef } = useCommerce()
  // const fetcher:Fetcher<  Mutation,
  // MutationCheckoutLineItemsAddArgs>= providerRef.current.fetcher ?? fetcherRef.current
  var options= {
     query: checkoutLineItemAddMutation,
   };

     return useCallback(
       async function addItem(item:CartItemBody) {
         
         if (
          item.quantity &&
          (!Number.isInteger(item.quantity) || item.quantity! < 1)
        ) {
          throw new CommerceError({
            message: 'The item quantity has to be a valid integer greater than 0',
          })
        }
    
        const lineItems = [
          {
            variantId: item.variantId,
            quantity: item.quantity ?? 1,
          },
        ]
    
        let checkoutId = getCheckoutId()
         
         const fetch = async()=>{
        
          if (!checkoutId) {
            return checkoutToCart(await checkoutCreate( lineItems))
          } else {

            // const { checkoutLineItemsAdd } = await fetcher<  Mutation,
            //  MutationCheckoutLineItemsAddArgs>({
              const { checkoutLineItemsAdd } = await fetcher< {checkoutLineItemsAdd:CheckoutLineItemsAddPayload}>({
              ...options,
              variables: {
                checkoutId,
                lineItems,
              },
            })
            return checkoutToCart(checkoutLineItemsAdd)
          }

         }
  

         
         const data = await fetch();

         await mutate(data, false)
         return data
       },
       [fetcher, mutate]
     )


}