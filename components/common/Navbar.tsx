import { FC,useState, useEffect, } from 'react'
import Link from 'next/link'

import { Logo } from '@components/ui'
import { Searchbar } from '@components/common'

import { useUI } from '@components/ui/context'
import {  Bag} from '@components/icons'

import React from 'react'

import type { LineItem} from '@framework/types'

import { UserIcon} from '@components/icons'

import dynamic from 'next/dynamic'
import { useGetCustomerQuery } from '@framework/services/customer'
import { useGetCartQuery } from '@framework/services/cart'


const Loading = () => (
  <div    
  className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">

  <div className="px-2 py-2 bg-white rounded-md shadow absolute right-0 ">
    {/* <LoadingDots /> */}
    Loading...
  </div>
  </div>
)

const UserView = dynamic(() => import('@components/common/UserView'), {
  loading: Loading,ssr: false,
})
const CartView = dynamic(() => import('@components/cart/CartView'), {
  loading: Loading,ssr: false,
})







const links = [
  {
    name: 'home',
    url: '/',
  },
  {
    name: 'women',
    url: '/collection/women',
  },
  {
    name: 'men',
    url: '/collection/men',
  },
]


//const Navbar: FC<NavbarProps> = ({ links }) =>{
const Navbar: FC = () =>{



  
  const [hasScrolled, setHasScrolled] = useState(false)
  const [itemsCount, setItemsCount] = useState(0);
  

//const { data } = useCart()

 const {data}  =useGetCartQuery();
 //const { data: isCustomerLoggedIn } = useCustomer()
 const {data:isCustomerLoggedIn  }=useGetCustomerQuery();

 const {  openModal } = useUI()
 const [dropdown,setDropdown]=React.useState("");

 

  const handleDropdown=(current:string="")=>{
   
    setDropdown(dropdown==current ? "":current);
   
  }

   useEffect(()=>{
    const countItem = (count: number, item: LineItem) => count + item.quantity
    const items = data?.lineItems?.reduce(countItem, 0) ?? 0
    setItemsCount(items);
  
   },[])

 

  useEffect(() => {

    // const handleScroll = throttle(() => {
    //   const offset = 0
    //   const { scrollTop } = document.documentElement
    //   const scrolled = scrollTop > offset

    //   if (hasScrolled !== scrolled) {
    //     setHasScrolled(scrolled)
    //   }
    // }, 200)

    const handleScroll = async () => {
      
      const throttle= (await import('lodash.throttle')).default;

      return throttle(() => {
        const offset = 0
        const { scrollTop } = document.documentElement
        const scrolled = scrollTop > offset
  
        if (hasScrolled !== scrolled) {
          setHasScrolled(scrolled)
        }
      }, 200)
    }


    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])



  return (
    <div 
        className={hasScrolled? "sticky top-0 min-h-[74px] bg-primary z-40 transition-all duration-150 border-b px-6 shadow-magical":"sticky top-0 min-h-[74px] bg-primary  z-40 transition-all duration-150 border-b px-6"}
          >
  
    
         <div
              className="relative flex flex-row justify-between py-4 md:py-4">
                                    
        <div className="flex items-center flex-1">
          <Link href="/" 
              // className={s.logo} 
                className="cursor-pointer rounded-full border transform duration-100 ease-in-out hover:shadow-md"
                 aria-label="Logo"
          >
            <Logo  />
          </Link>
          <nav 
       
          className=" ml-6 space-x-4 lg:block"
          >
        
            {links?.map((l) => (
              <Link href={l.url} key={l.url} 
             // className={s.link}
             className= "inline-flex items-center text-md md:text-xl lg:text-2xl text-secondary-2 leading-6 transition ease-in-out duration-75 cursor-pointer  hover:text-secondary"
             
              >
                {l.name}
              </Link>
            ))}
          </nav>
        </div>
       
        <div className="justify-center self-end flex-1  lg:flex lg:self-center">
         
            <Searchbar />
          </div>
      
        <div className="flex items-center justify-end flex-1 space-x-8">
            <div  className="relative " >
 
   
                  <button  
            onClick={() => ( handleDropdown("cart"))}
            aria-label="Menu"
                        >
               <Bag className="w-7 h-7" />
              {itemsCount > 0 && (
                <span
                
                 className= "min-w-[1.25rem] min-h-[1.25rem] border border-primary-2 bg-secondary text-primary absolute rounded-full right-3 top-3 font-bold text-xs"
                 >{itemsCount}</span>
              )}
    
           </button>
        
         {dropdown =="cart"&&<CartView /> }
     

         
          </div>

      <div  className="relative " >
   

         <button  
             onClick={() => {
              handleDropdown("") ;
              isCustomerLoggedIn ? handleDropdown("user") : openModal()}}

         aria-label="Menu"
                           >
        < UserIcon className="w-7 h-7"/>
         </button>
       
        
      {dropdown =="user"&&isCustomerLoggedIn&&<UserView /> }
        
         
      </div>

        </div>
      </div>
      
      
     
     
      </div>

)
          }
export default Navbar
