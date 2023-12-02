import { useCallback } from 'react'
import { CommerceError } from '@framework/utils/errors'
import useCustomer from '@framework/customer/use-customer'

import {
  setCustomerToken,
  throwUserErrors,
  customerAccessTokenCreateMutation,
} from '@framework/utils'
import { Mutation, MutationCustomerAccessTokenCreateArgs } from '@framework/schemas/schema'

//import { useCommerce } from '@framework'
import fetcher from '@framework/fetcherNew'









export default function useLogin() {
   type LoginBody = {
    email: string
    password: string
  }
  
   const { mutate } = useCustomer()
 
   
   var options= {
      query: customerAccessTokenCreateMutation,
    };

      return useCallback(
        async function login(input:LoginBody) {
          const{email,password}=input;
          if (!(email && password)) {
            throw new CommerceError({
              message: 'An email and password are required to login',
            })
          }
          

          const fetch = async()=>{
         
            const { customerAccessTokenCreate } = await fetcher<Mutation,MutationCustomerAccessTokenCreateArgs>({
              ...options,
              variables: {
                input: { email, password },
              },
            })
        
            throwUserErrors(customerAccessTokenCreate?.customerUserErrors)
        
            const customerAccessToken = customerAccessTokenCreate?.customerAccessToken
            const accessToken = customerAccessToken?.accessToken
        
            if (accessToken) {
              setCustomerToken(accessToken)
            }
        
            return null
          }
   

          const data = await fetch();

          await mutate()
          return data
        },
        [fetcher, mutate]
      )

 
}