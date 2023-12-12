import fetcher from "@framework/fetcher"
import {
    GetAllPagesQuery,
    GetAllPagesQueryVariables,
    PageEdge,
  } from '@framework/schemas/schema'
  import { normalizePages } from '@framework/utils'
  
  //import type {  Page } from '@framework/types/page'
  import type {  Page } from '@framework/types'
  //import getAllPagesQuery from '@framework/utils/queries/get-all-pages-query'
  import {getAllPagesQuery} from '@framework/utils/queries'
  
  export default async function getAllPages({
    query = getAllPagesQuery,
    config,
    variables,
  }: {
    url?: string
    config?: { locale?: string, locales?: string[]}
    variables?: any
    preview?: boolean
    query?: string
  } = {}) {
  
    const {
        locale,
        locales = ['en-US', 'es'],
      } = config!
     
        const  data = await fetcher<
        GetAllPagesQuery, GetAllPagesQueryVariables
      >({
        query,
       
        variables,
      });
      
      

         //console.log("pagessd",data);


      return {
        pages: locales.reduce<Page[]>(
          (arr, locale) =>
            arr.concat(normalizePages(data.pages.edges as PageEdge[], locale)),
          []
        ),
      }
  }