import { useCallback } from 'react'
import { CommerceError } from '@framework/utils/errors'
import useCustomer from '@framework/customer/use-customer'
import { Mutation, MutationCustomerCreateArgs } from '@framework/schemas/schema'

import {
  throwUserErrors,
  customerCreateMutation,
} from '@framework/utils'
//import { Provider, useCommerce } from '@framework'
import useLogin from './use-login'
import fetcher from '@framework/fetcherNew'








export default function useSignup() {
   type SignupBody= {
 
    firstName: string
    lastName: string
    email: string
    password: string
  }
  
   const { mutate } = useCustomer()
   //const { mutate } = useCustomerNew()
  //  const { providerRef, fetcherRef } = useCommerce()
  //  const fetcher:Fetcher<Mutation,MutationCustomerCreateArgs>= providerRef.current.fetcher ?? fetcherRef.current
   
   const login=useLogin()

   var options= {
      query: customerCreateMutation,
    };

      return useCallback(
        async function signup(input:SignupBody) {
          const{firstName, lastName, email, password }=input;
          if (!(firstName && lastName && email && password)) {
            throw new CommerceError({
              message:
                'A first name, last name, email and password are required to signup',
            })
          }
          
          const fetch = async()=>{

            const { customerCreate } = await fetcher<Mutation,MutationCustomerCreateArgs>({
              ...options,
              variables: {
                input: {
                  firstName,
                  lastName,
                  email,
                  password,
                },
              },
            })
        

            throwUserErrors(customerCreate?.customerUserErrors)
            //await handleAutomaticLogin(fetch, { email, password })
            await login( { email, password })
            return null
          }
   

          const data = await fetch();

         // await mutate()
          return data
        },
        [fetcher, mutate]
      )

 
}