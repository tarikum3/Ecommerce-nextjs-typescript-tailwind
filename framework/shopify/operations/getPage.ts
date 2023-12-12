import { normalizePage } from '@framework/utils'
import {
  GetPageQuery,
  GetPageQueryVariables,
  Page as ShopifyPage,
} from '@framework/schemas/schema'
//import { GetPageOperation } from '@framework/types/page'
//import getPageQuery from '@framework/utils/queries/get-page-query'
import {getPageQuery} from '@framework/utils/queries'
import fetcher from '@framework/fetcher'
export default async function getPage({
    query = getPageQuery,
    variables,
    config,
  }: {
    query?: string
    variables: any
    config?: { locale?: string, locales?: string[]}
    preview?: boolean
  }) {
    const {
        locale,
        locales = ['en-US', 'es'],
      } = config!
     
        const  {node:page} = await fetcher<
        GetPageQuery, GetPageQueryVariables
      >({
        query,
       
        variables,
      });

      return page ? { page: normalizePage(page as ShopifyPage, locale) } : {}

  }