

import {
  CollectionEdge,
  GetAllProductsQuery,
  GetProductsFromCollectionQueryVariables,
  Product as ShopifyProduct,
  ProductEdge,
} from '@framework/schemas/schema'

import {
  getAllProductsQuery,
  getCollectionProductsQuery,
  getSearchVariables,
  normalizeProduct,
} from '@framework/utils'


//import { useCommerce } from '@framework' 
import useSWR from 'swr'
//import defineProperty from '@framework/utils/define-property'
import fetcher from '@framework/fetcherNew'

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
  sort?: string
  locale?: string
}








export type SearchProductsBody = {
  search?: string
  categoryId?: string
  brandId?: string
  sort?: string
  locale?: string
}

export default function useSearch(input:SearchProductsBody) {
 
 
  
  // const { providerRef, fetcherRef ,cartCookie} = useCommerce()
  // const fetcher:Fetcher= providerRef.current.fetcher ?? fetcherRef.current
 
 // const cartId = Cookies.get(cartCookie)
  
  var options= {
     query: getAllProductsQuery,
   };


   const fetch = async()=>{
         
   
    const { categoryId, brandId } = input
   // const method = options?.method
    const variables = getSearchVariables(input)
    let products

    // change the query to getCollectionProductsQuery when categoryId is set
    if (categoryId) {
      const data = await fetcher<
        CollectionEdge,
        GetProductsFromCollectionQueryVariables
      >({
        query: getCollectionProductsQuery,
        //method,
        variables,
      })
      // filter on client when brandId & categoryId are set since is not available on collection product query
      products = brandId
        ? data.node?.products?.edges?.filter(
            ({ node: { vendor } }: ProductEdge) =>
              vendor.replace(/\s+/g, '-').toLowerCase() === brandId
          )
        : data.node?.products?.edges
    } else {
      const data = await fetcher<GetAllProductsQuery>({
        query: options.query,
       // method,
        variables,
      })
      products = data.products?.edges
    }

    return {
      products: products?.map(({ node }) =>
        normalizeProduct(node as ShopifyProduct)
      ),
      found: !!products?.length,
    }
  }

   const inputDep=""+input.brandId!+input.categoryId!+input.locale!+input.search!+input.sort!;

  const response = useSWR([options.query,inputDep],async(query?: string) =>fetch(),
  { revalidateOnFocus: false})

  //  const response = useSWR(options.query,async(query?: string) =>fetch(),
  //  { revalidateOnFocus: false})




  //  if (!('isLoading' in response)) {
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