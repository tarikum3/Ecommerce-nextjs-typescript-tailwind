
import  getCategories from './getCategories'
import getBrands  from './getBrands'
export default async function getSiteInfo (config: {
    url?: string
    config?: { locale?: string, locales?: string[]}
    variables?: any
    preview?: boolean
    query?: string
  } = {}){
    const categoriesPromise = getCategories(config)
    const brandsPromise = getBrands(config)

    
    const [categories, brands] = await Promise.all([
      categoriesPromise,
      brandsPromise,
    ])

    return {
      categories,
      brands,
    }

}