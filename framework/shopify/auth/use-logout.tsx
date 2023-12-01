import { useCallback } from 'react'

import useCustomer from '@framework/customer/use-customer'

//import customerAccessTokenDeleteMutation from '@framework/utils/mutations/customer-access-token-delete'
import { getCustomerToken, setCustomerToken } from '@framework/utils'
import {customerAccessTokenDeleteMutation} from '@framework/utils/mutations'
//import {  useCommerce } from '@framework'
import fetcher from '@framework/fetcherNew'








export default function useLogout() {
 
  const { mutate } = useCustomer()
  //const { mutate } = useCustomerNew()
  // const { providerRef, fetcherRef } = useCommerce()
  // const fetcher= providerRef.current.fetcher ?? fetcherRef.current

  var options= {
     query: customerAccessTokenDeleteMutation,
   };

     return useCallback(
       async function logout() {
       
         
         const fetch = async()=>{
           
           const { customerAccessTokenCreate } = await fetcher({
            ...options,
            variables: {
              customerAccessToken: getCustomerToken(),
            },
           })
       
           setCustomerToken(null)
           return null
         }
  

         const data = await fetch();

         await mutate(null, false)
         return data
       },
       [fetcher, mutate]
     )


}