
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'

import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import getAllProducts from '@framework/operations/getAllProducts'
// import getAllPages from '@framework/operations/getAllPages'
// import getSiteInfo from '@framework/operations/getSiteInfo'

// import {rangeMap} from '@framework/utils'
// import Image from 'next/image'
import Link from 'next/link'
import {  ArrowRight } from '@components/icons'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  

  // const pagesPromise = getAllPages({ config, preview })
  // const siteInfoPromise = getSiteInfo({ config, preview })
  // const { pages } = await pagesPromise
  // const { categories } = await siteInfoPromise
  // console.log("ppages",pages);


    const productsPromise = getAllProducts({
    variables: { first: 8 },
    config,
    preview,
  
  })


  const { products } = await productsPromise
 

  return {
    props: {
      products,
      // pages, 
      // categories 
    },
    revalidate: 60,
  }
}
///
export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div
          className=' relative flex flex-col items-center justify-center bg-secondary-2 m-28 mx-auto w-4/5 h-[80vh] rounded-xl'>
        <div className='animate-ping bg-gray-500 z-0 absolute  h-1/2 w-1/2  '></div>
          <h2 className='text-5xl text-center text-primary font-bold m-8 relative '>New arrival</h2>
                   
              
         <p className='text-2xl text-center text-primary leading-relaxed relative'>explore new and stylish clothes in our shop</p>

         <Link href={'/collection/new-arrivals'} 
             // className={s.link}
             className= "bg-primary text-secondary font-bold py-2 px-10 rounded m-8 relative cursor-pointer "
             
              >
                {" explore"}
              </Link>
          </div>


     <div className=" m-10 ">
      <p className='text-5xl text-secondary font-bold m-5 mx-24'> Explore Products </p>
    
      <div className="grid grid-cols-1 gap-4 mx-24 lg:grid-cols-3">
        {products.slice(0, 9).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}

          />
        ))}
      </div>

         <div className=" mx-24 ">

            <Link
              href="/search"
              className="flex flex-initial items-center justify-end font-bold    "
               >
            
              <span className=" mr-2">more</span>
              <span className="rounded-full  mr-2">
                <ArrowRight />
              </span>
            </Link>
            
          </div>
          
     </div>


     

   


    </>
  )
}






// export default function Home(){
//   const placeholderImg = '/product-img-placeholder.svg'
//   return (
//   <>
  

//      <div
//           className=' relative flex flex-col items-center justify-center bg-secondary-2 m-28 mx-auto w-4/5 h-[80vh] rounded-xl'>
//      <div className='animate-ping bg-gray-500 z-0 absolute  h-1/2 w-1/2  '></div>
//      <h2 className='text-5xl text-center text-primary font-bold m-8 relative '>
//       New arrival
//       </h2>
//          <p className='text-2xl text-center text-primary leading-relaxed relative'>explore new and stylish clothes in our shop</p>
//          <button className=' bg-primary text-secondary font-bold py-2 px-10 rounded m-8 relative'> explore </button>
//      </div>
   
//      <div className=" m-10 ">
//       <p className='text-5xl text-secondary font-bold m-8'> Explore Products </p>
    
//     <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 m-10">
//     {rangeMap(8, (i) => (
//       // <Skeleton key={i}>
//         <div className="w-60 h-60" >
//               <Image
//               quality="85"
//               src={ placeholderImg}
//               alt={'Product Image'}
//               height={320}
//               width={320}
//               className={"w-full  object-cover rounded-lg  sm:col-span-2 lg:col-span-full"}
//             />
//         </div>
//       // </Skeleton>
//     ))}
//       </div>

//          <div className=" ">

//             <Link
//               href="/"
//               className="flex flex-initial items-center justify-end font-bold    "
//                >
            
//               <span className=" mr-2">more</span>
//               <span className="rounded-full  mr-2">
//                 <ArrowRight />
//               </span>
//             </Link>
            
//           </div>
          
//      </div>


//      </>
//      )
// }



Home.Layout = Layout
