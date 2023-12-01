
import { useMemo } from 'react'

import { checkoutToCart } from '@framework/utils'
//import getCheckoutQuery from '@framework/utils/queries/get-checkout-query'
import {getCheckoutQuery} from '@framework/utils/queries'
import Cookies from 'js-cookie'

import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
} from '@framework/const'
//import { useCommerce } from '@framework'  
import useSWR, { SWRResponse } from 'swr'

import fetcher from '@framework/fetcherNew'













export default function useCart() {
 
 
  
  
  // const { providerRef, fetcherRef ,cartCookie} = useCommerce()
  // const fetcher:Fetcher= providerRef.current.fetcher ?? fetcherRef.current
 
  const cartId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE)
  
  var options= {
     query: getCheckoutQuery,
   };


   const fetch = async()=>{
         
   

    if (cartId) {
      const { node: checkout } = await fetcher({
        ...options,
        variables: {
          checkoutId: cartId,
        },
      })
      if (checkout?.completedAt) {
        Cookies.remove(SHOPIFY_CHECKOUT_ID_COOKIE)
        Cookies.remove(SHOPIFY_CHECKOUT_URL_COOKIE)
        return null
      } else {
        return checkoutToCart({
          checkout,
        })
      }
    }
    return null
  }



   const response = useSWR(options.query,async(query?: string) =>fetch(),
   { revalidateOnFocus: false})


 

  return useMemo(
    () =>
      Object.create(response, {
        isEmpty: {
          get() {
            return (response.data?.lineItems.length ?? 0) <= 0
          },
          enumerable: true,
        },
      }),
    [response]
  )
}