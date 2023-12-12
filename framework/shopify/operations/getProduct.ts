import fetcher from "@framework/fetcher"
//import { GetProductOperation } from '@framework/types/product'
import { normalizeProduct, getProductQuery } from '@framework/utils'
import {
  GetProductBySlugQuery,
  Product as ShopifyProduct,
} from '@framework/schemas/schema'

export default async function getProduct({

  variables,
  config,
}: {
  
  variables: any
  config?: { locale?: string, locales?: string[]}
  preview?: boolean
}) {
  

     
        const  { productByHandle }  = await fetcher<
        GetProductBySlugQuery
      >({
        query:getProductQuery,
       
        variables,
      });
      
      




      return {
        ...(productByHandle && {
          product: normalizeProduct(productByHandle as ShopifyProduct),
        }),
      }
  }