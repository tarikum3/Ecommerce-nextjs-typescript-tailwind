import { FC,useState, useEffect, } from 'react'
import Link from 'next/link'

import { Logo } from '@components/ui'
import { Searchbar } from '@components/common'
//import throttle from 'lodash.throttle'

import useCart from '@framework/cart/use-cart'
import { useUI } from '@components/ui/context'
import {  Bag} from '@components/icons'
import useCustomer from '@framework/customer/use-customer'
import React from 'react'

import type { LineItem} from '@framework/types'
import { useTheme } from 'next-themes'
//import { useRouter } from 'next/router'
import useLogout from '@framework/auth/use-logout'
import { Moon, Sun ,UserIcon} from '@components/icons'
//import CartView from '@components/cart/CartView'
import dynamic from 'next/dynamic'



const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    {/* <LoadingDots /> */}
    Loading...
  </div>
)


const CartView = dynamic(() => import('@components/cart/CartView'), {
  loading: Loading,
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
  

const { data } = useCart()
 const { data: isCustomerLoggedIn } = useCustomer()
 //const router = useRouter()
 const logout = useLogout()

 const { theme, setTheme } = useTheme()
 const {  openModal } = useUI()

const [dropdown,setDropdown]=React.useState("");

  
  const userLinks = [
    {
      name: 'My Profile',
      href: '/profile',
    },
  ]
  
//  async function handleClick( href: string) {
  
//     const { useRouter } = (await import('next/router'));
//     const router = useRouter()
//     router.push(href)
//   }

  function handleDropdown(current:string=""){
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
      
       className="relative flex flex-row justify-between py-4 md:py-4"
       >
        <div className="flex items-center flex-1">
          <Link href="/" 
         // className={s.logo} 
         className="cursor-pointer rounded-full border transform duration-100 ease-in-out hover:shadow-md"
          aria-label="Logo"
          >
            <Logo />
          </Link>
          <nav 
       
          className="hidden ml-6 space-x-4 lg:block"
          >
            {/* <Link href="/search"
             //className={s.link}
             className= "inline-flex items-center leading-6 transition ease-in-out duration-75 cursor-pointer text-primary-3 hover:text-secondary"
             
             
             >
              All
            </Link> */}
            {links?.map((l) => (
              <Link href={l.url} key={l.url} 
             // className={s.link}
             className= "inline-flex items-center leading-6 transition ease-in-out duration-75 cursor-pointer text-primary-3 hover:text-secondary"
             
              >
                {l.name}
              </Link>
            ))}
          </nav>
        </div>
       
        <div className="justify-center flex-1  lg:flex">
         
            <Searchbar />
          </div>
      
        <div className="flex items-center justify-end flex-1 space-x-8">
         
      <div  className="relative " >
        <button  
            onClick={() => ( handleDropdown("cart"))}
            aria-label="Menu"
                        >
           <Bag />
              {itemsCount > 0 && (
                <span
                
                 className= "min-w-[1.25rem] min-h-[1.25rem] border border-primary-2 bg-secondary text-primary absolute rounded-full right-3 top-3 font-bold text-xs"
                 >{itemsCount}</span>
              )}
    
                    </button>
        {dropdown=="cart"&&<div    className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
             <div className="absolute right-0 w-[700px] h-screen bg-white rounded-md shadow-lg" >
          <CartView /> 
          </div>
        </div>
         }
          </div>

          <div  className="relative " >
        <button  
        
       onClick={() => {
        handleDropdown("") ;
        isCustomerLoggedIn ? handleDropdown("user") : openModal()}}
        aria-label="Menu"
      >
       < UserIcon/>
        </button>
        {dropdown=="user"&&isCustomerLoggedIn&&<div    className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
        
          <div className="px-2 py-2 bg-white rounded-md shadow absolute right-0 ">
          {userLinks.map(({ name, href }) => (
       
          <a
         
            className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
           
            onClick={async(e) =>{
              
              //handleClick( href)
              const { useRouter } = (await import('next/router'));
    const router = useRouter()
    router.push(href)
            }}
            
            >
            {name}
          </a>
       
      ))}
            
        <a
         
           className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
        >
          <span className="flex">
            Theme: <strong>{theme}</strong> {theme == 'dark' ? (
              <Moon width={20} height={20} />
            ) : (
              <Sun width={20} height={20} />
            )}
          </span>
      
        </a>
      
        <a
          //className={cn(s.link, 'border-t border-primary-2 mt-4')}
          className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
           
          onClick={() => logout()}
        >
          Logout
        </a>
      

          </div>
        </div>
         }
      </div>

        </div>
      </div>
      
      
     
     
      </div>

)
          }
export default Navbar
