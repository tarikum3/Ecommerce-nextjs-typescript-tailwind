import {
    GetAllProductVendorsQuery,
    GetAllProductVendorsQueryVariables,
  } from '@framework/schemas/schema'
  
  //import getAllProductVendors from '../@framework/utils/queries/get-all-product-vendors-query'
  import {getAllProductVendors} from '@framework/utils/queries'
  import fetcher from '@framework/fetcherNew'


  export default async function getBrands({
    query = getAllProductVendors,
    config,
    variables={
        first: 250,
      },
  }: {
    url?: string
    config?:{ locale?: string, locales?: string[]}
    variables?: any
    preview?: boolean
    query?: string
  } = {}){
    const {
        locale,
      } = config!
    const data  = await fetcher<
    GetAllProductVendorsQuery,
    GetAllProductVendorsQueryVariables  >( { query,      variables,locale})
      
  
 

  let vendorsStrings = data.products.edges.map(({ node: { vendor } }) => vendor)

  return [...new Set(vendorsStrings)].map((v) => {
    const id = v.replace(/\s+/g, '-').toLowerCase()
    return {
      id,
      name: v,
      slug: id,
      path: `/${id}`,
    }
  })

  }