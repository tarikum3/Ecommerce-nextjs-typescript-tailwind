import fetcher from "@framework/fetcherNew"
//import { GetAllProductPathsOperation } from '@framework/types/product'
import {
  GetAllProductPathsQuery,
  GetAllProductPathsQueryVariables,
  
} from '@framework/schemas/schema'

import { getAllProductsQuery } from '@framework/utils'

 export default async function getAllProductPaths({
    query = getAllProductsQuery,
   
    variables,
  }: {
    query?: string
   
    variables?: any
  } = {}) {

    const  data = await fetcher<
    GetAllProductPathsQuery,
    GetAllProductPathsQueryVariables
  >({
    query,
   
    variables,
  });

  return {
    products: data.products.edges.map(({ node: { handle } }) => ({
      path: `/${handle}`,
    })),
  }
  }