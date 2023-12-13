

import { useState } from 'react'

import { Layout } from '@components/common'
import { ProductCard } from '@components/product'

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
   <>
     
          
            <div className="m-12 text-xl text-transition ease-in duration-75 mx-auto md:mx-24">
              
                <>
                  <span
         
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
                
                    className={found? "hidden":""}
                  >
                   
                      <>
                        There are no products that match "<strong>{q}</strong>"
                      </>
                  
                  </span>
                </>
              
            </div>
          
         
   

            <div className="grid grid-cols-1 gap-4 mx-auto md:mx-24 lg:grid-cols-3">
            {products?.map((product: any, i: number) => (
              <ProductCard
                key={product.id}
                product={product}
    
              />
            ))}
          </div>

       

          </>
    
   
  )
}

Search.Layout = Layout
