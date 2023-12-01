//import type { UpdateItemHook, LineItem } from '@framework/types/cart'
import type {  LineItem } from '@framework/types'
import type {
  Mutation,
  MutationCheckoutLineItemsUpdateArgs,
} from '@framework/schemas/schema'


import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import { ValidationError } from '@framework/utils/errors'

import useCart from './use-cart'

import {
  getCheckoutId,
  checkoutLineItemUpdateMutation,
  checkoutToCart,
} from '@framework/utils'

//import { useCommerce } from '@framework'

import useRemoveItem from './use-remove-item'
import fetcher from '@framework/fetcherNew'


// export type UpdateItemActionInput<T = any> = T extends LineItem
//   ? Partial<UpdateItemHook['actionInput']>
//   : UpdateItemHook['actionInput']


















export default function useUpdateItem(    ctx: {
  item?: LineItem
  wait?: number
} = {}) {
 
  const { item } = ctx
  const removeItemHandler= useRemoveItem()
  // const { mutate } = useCustomer()
  const { mutate } = useCart()
  //  const { providerRef, fetcherRef } = useCommerce()
  //  const fetcher:Fetcher<Mutation,
  //  MutationCheckoutLineItemsUpdateArgs>= providerRef.current.fetcher ?? fetcherRef.current
   var options= {
      query: checkoutLineItemUpdateMutation,
    };
    
    const updateItem= async function (input: {id?:string,productId?:string,quantity?:number}) {
      const itemId = input.id ?? item?.id
      const productId = input.productId ?? item?.productId
      const variantId = input.productId ?? item?.variantId
      // const itemId = input.id 
      // const productId = input.productId 
      // const variantId = input.productId 
      if (!itemId || !productId || !variantId) {
        throw new ValidationError({
          message: 'Invalid input used for this operation',
        })
      }
      if (Number.isInteger(input.quantity)) {
        // Also allow the update hook to remove an item if the quantity is lower than 1
        if (input.quantity! < 1) {
          removeItemHandler( {id: itemId });
          // return removeItemHandler.fetcher({
          //   options: removeItemHandler.fetchOptions,
          //   input: { itemId },
          //   fetch,
          // })
        }
      } else if (input.quantity) {
        throw new ValidationError({
          message: 'The item quantity has to be a valid integer',
        })
      }
      const fetch = async()=>{
     
        const { checkoutLineItemsUpdate } = await fetcher<Mutation,
        MutationCheckoutLineItemsUpdateArgs>({
          ...options,
          variables: {
            checkoutId: getCheckoutId(),
            lineItems: [
              {
                id: itemId,
                quantity: input.quantity,
              },
            ],
          },
        })
        return checkoutToCart(checkoutLineItemsUpdate)
    
       
      }


      const data = await fetch();

      await mutate(data, false)
      return data
    }
    
      return useCallback(debounce(updateItem,500) ,[fetcher, mutate]  )
        
   
     

 
}