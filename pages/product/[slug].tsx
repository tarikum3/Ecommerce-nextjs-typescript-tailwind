import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

import getAllProducts from '@framework/operations/getAllProducts'
import getProduct from '@framework/operations/getProduct'
import getAllProductPaths from '@framework/operations/getAllProductPaths'

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }


 
    const productPromise = getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })
  
  const allProductsPromise = getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  })

  
  const { product } = await productPromise
  const { products: relatedProducts } = await allProductsPromise

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
    
      product,
      relatedProducts,
     
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  
  const { products } = await getAllProductPaths()
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product: any) => {
            arr.push(`/${locale}/product${product.path}`)
          })
          return arr
        }, [])
      : products.map((product: any) => `/product${product.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
  relatedProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <ProductView product={product} relatedProducts={relatedProducts} />
  )
}

Slug.Layout = Layout
