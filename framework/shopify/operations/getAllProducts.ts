
import fetcher from "@framework/fetcherNew"
import {
    GetAllProductsQuery,
    Product as ShopifyProduct,

  } from '@framework/schemas/schema'

  import {   getAllProductsQuery,
    
    normalizeProduct } from '@framework/utils'

export default async function getAllProducts({
 
  variables,
  config,
  
}: {
  query?: string
  variables?: any
  config?: { locale?: string, locales?: string[]}
  preview?: boolean
} = {}
  ) {
  
    const {
      locale,
      locales = ['en-US', 'es'],
    } = config!
      const data  = await fetcher<
      GetAllProductsQuery
    >({
      query:getAllProductsQuery,
     
      variables,
      locale,
    });
   let products = data.products?.edges

    return {
        products: products?.map(({ node }) =>
          normalizeProduct(node as ShopifyProduct)
        )
      }
  }