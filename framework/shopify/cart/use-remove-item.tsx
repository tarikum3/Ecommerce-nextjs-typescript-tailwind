import { useCallback } from 'react'

import { ValidationError } from '@framework/utils/errors'

// import type {
//   Cart,
//   LineItem,
//   RemoveItemHook,
// } from '@framework/types/cart'
import type {
  Cart,
  LineItem,
 
} from '@framework/types'
import useCart from './use-cart'
//import { useCommerce } from '@framework'

import fetcher from '@framework/fetcherNew'


// export type RemoveItemFn<T = any> = T extends LineItem
//   ? (input?: RemoveItemActionInput<T>) => Promise<Cart | null | undefined>
//   : (input: RemoveItemActionInput<T>) => Promise<Cart | null>

// export type RemoveItemActionInput<T = any> = T extends LineItem
//   ? Partial<RemoveItemHook['actionInput']>
//   : RemoveItemHook['actionInput']

//export default useRemoveItem as UseRemoveItem<typeof handler>

import {
  checkoutLineItemRemoveMutation,
  getCheckoutId,
  checkoutToCart,
} from '@framework/utils'

import { Mutation, MutationCheckoutLineItemsRemoveArgs } from '@framework/schemas/schema'










export default function useRemoveItem() {
 
  
  // const { mutate } = useCustomer()
  const { mutate } = useCart()
  //  const { providerRef, fetcherRef } = useCommerce()
  //  const fetcher:Fetcher<Mutation, MutationCheckoutLineItemsRemoveArgs>= providerRef.current.fetcher ?? fetcherRef.current
   var options= {
      query: checkoutLineItemRemoveMutation,
    };
    
    const removeItem = async function (input: {id?:string}) {
      const itemId = input?.id 

      if (!itemId) {
        throw new ValidationError({
          message: 'Invalid input used for this operation',
        })
      }
          
      const fetch = async()=>{
     
        const data = await fetcher<Mutation, MutationCheckoutLineItemsRemoveArgs>({
          ...options,
          variables: { checkoutId: getCheckoutId(), lineItemIds: [itemId] },
        })
        return checkoutToCart(data.checkoutLineItemsRemove)
    
       
      }


      const data = await fetch();

      await mutate(data, false)
      return data
    }
      return useCallback(removeItem,[fetcher, mutate]  )
        
   
     

 
}