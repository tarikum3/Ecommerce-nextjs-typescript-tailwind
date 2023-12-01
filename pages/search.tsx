// import { getSearchStaticProps } from '@framework/utils'




import { useState } from 'react'
import type { Product } from '@framework/types'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import {rangeMap} from '@framework/utils'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import getAllProducts from '@framework/operations/getAllProducts'



export async function getServerSideProps({query,  locale,
  locales,}: GetServerSidePropsContext) {
  const { q } = query
  let search = ''

  if (q) {
    search += `(product_type:${q}) OR (title:${q}) OR (tag:${q}) `
  }
  const { products } = await getAllProducts({
    variables: { first: 8,query:search },
    config : { locale, locales }
   
  })
  
  
  //const { products } = await productsPromise
  return {
    props: { products ,found: !!products?.length,q:typeof q === 'string' ? q : ''},

  }
}


export default function Search({
  products,found,q
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  
 

  // if (error) {
  //   return <ErrorMessage error={error} />
  // }



  return (
    <div className='mx-auto max-w-7xl px-6 w-full'>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 mb-20">
   
        {/* Products */}
        <div className="col-span-8 order-3 lg:order-none">
          
            <div className="mb-12 transition ease-in duration-75">
              
                <>
                  <span
                    // className={cn('animated', {
                    //   fadeIn: data.found,
                    //   hidden: !data.found,
                    // })}
                    className={!found? "hidden":""}
                  >
                    Showing {products?.length} results{' '}
                    {q && (
                      <>
                        for "<strong>{q}</strong>"
                      </>
                    )}
                  </span>
                  <span
                    // className={cn('animated', {
                    //   fadeIn: !data.found,
                    //   hidden: data.found,
                    // })}
                    className={found? "hidden":""}
                  >
                   
                      <>
                        There are no products that match "<strong>{q}</strong>"
                      </>
                  
                  </span>
                </>
              
            </div>
          
          {products ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product: Product) => (
                <ProductCard
                  //variant="simple"
                  key={product.path}
                  //className="animated fadeIn"
                  product={product}
                 
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rangeMap(12, (i) => (
                // <Skeleton key={i}>
                  <div className="w-60 h-60" />
                // </Skeleton>
                
              ))}
            </div>
          )}{' '}
        </div>

    
      </div>
    </div>
  )
}

Search.Layout = Layout
