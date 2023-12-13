


import { Layout } from '@components/common'
import { useGetCustomerQuery} from '@framework/services/customer'



export async function getStaticProps() {
 

  return {
    props: { },
  }
}

export default function Profile() {

  const {data }=useGetCustomerQuery();
  return (
    <div className="mx-auto max-w-7xl px-6 w-full pt-4">
     
      <h1 className="pt-1 pb-4 text-2xl leading-7 font-bold tracking-wide" >
      My Profile
              </h1>
      <div className="grid grid-cols-4">
        {data && (
          <div className="flex flex-col divide-primary-2 divide-y">
            <div className="flex flex-row items-center space-x-4 py-4">
              <span className="text-lg font-medium text-secondary-300 flex-1">
                Full Name
              </span>
              <span>
                {(data as any)?.firstName} {(data as any)?.lastName}
              </span>
            </div>
            <div className="flex flex-row items-center space-x-4 py-4">
              <span className="text-lg font-medium text-secondary-300 flex-1">
                Email
              </span>
              <span>{(data as any)?.email}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

Profile.Layout = Layout
