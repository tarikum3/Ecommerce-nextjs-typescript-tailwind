
import { Layout } from '@components/common'




export async function getStaticProps() {
  
 
  return {
    props: {
   
    },
    revalidate: 200,
  }
}

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
  
      <h1 className="text-5xl pt-1 pb-2 font-semibold tracking-wide cursor-pointer mb-2" >
      Not Found
              </h1>
              <div className="text-secondary leading-7 max-w-6xl mx-auto">
              The requested page doesn't exist or you don't have access to it.
              </div>
    </div>
  )
}

NotFound.Layout = Layout
