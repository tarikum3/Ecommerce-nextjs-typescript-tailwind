
import type { GetCustomerQuery, GetCustomerQueryVariables } from '@framework/schemas/schema'
import { getCustomerQuery, getCustomerToken } from '@framework/utils'

//import { useCommerce } from '@framework'  
import useSWR, { SWRResponse } from 'swr'
//import defineProperty from '@framework/utils/define-property'
import fetcher from '@framework/fetcherNew'















export default function useCustomer() {
 
 
  
  // const { providerRef, fetcherRef } = useCommerce()
  // const fetcher:Fetcher<  GetCustomerQuery,
  // GetCustomerQueryVariables>= providerRef.current.fetcher ?? fetcherRef.current

  
  var options= {
     query: getCustomerQuery,
   };


   const fetch = async()=>{
         
    const customerAccessToken = getCustomerToken()

    if (customerAccessToken) {
      const { customer } = await fetcher<GetCustomerQuery,
      GetCustomerQueryVariables>({
        ...options,
        variables: { customerAccessToken: getCustomerToken() },
      })

      if (!customer) {
        return null
      }
   
      return {
        id: customer.id,
        firstName: customer.firstName ?? 'N/A',
        lastName: customer.lastName ?? '',
        ...(customer.email && { email: customer.email }),
        ...(customer.phone && { phone: customer.phone }),
      }
    }
  }



   const response = useSWR(options.query,async(query?: string) =>fetch())


  // if (!('isLoading' in response)) {
  //   defineProperty(response, 'isLoading', {
  //     get() {
  //       return response.data === undefined
  //     },
  //     enumerable: true,
  //   })
  // }

  // return response as typeof response & { isLoading: boolean }

  return response 

}