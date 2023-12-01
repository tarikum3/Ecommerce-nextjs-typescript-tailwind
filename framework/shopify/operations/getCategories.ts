//import type { Category } from '@framework/types/site'
import type { CollectionEdge } from '@framework/schemas/schema'
import { normalizeCategory } from '@framework/utils/normalize'
//import getSiteCollectionsQuery from '@framework/utils/queries/get-all-collections-query'
import {getSiteCollectionsQuery} from '@framework/utils/queries'
import fetcher from '@framework/fetcherNew'

export default async function getCategories({
    query = getSiteCollectionsQuery,
    config,
    variables={
        first: 250,
      },
  }: {
    url?: string
    config?: { locale?: string, locales?: string[]}
    
    variables?: any
    preview?: boolean
    query?: string
  } = {}){
    const {
        locale,
        locales = ['en-US', 'es'],
      } = config!
    const  data = await fetcher({
    query,
    variables,
    locale
  });

  //console.log("categorytccc",data.collections?.edges);
  return (
    data.collections?.edges?.map(({ node }: CollectionEdge) =>
      normalizeCategory(node)
    ) ?? []
  )

}