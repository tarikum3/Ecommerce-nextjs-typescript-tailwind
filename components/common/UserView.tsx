import { FC,useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from '@components/icons'
import { useLogoutMutation} from '@framework/services/customer'
import {
  setCustomerToken,
} from '@framework/utils'
import Clickoutside from '@components/common/Clickoutside'


const UserView:FC=()=>{
    
    const [logout]= useLogoutMutation();
    const { theme, setTheme } = useTheme()
    const [display, setDisplay] = useState(true);


    return(
   
       <>  
         <Clickoutside status={display} onClick={() => setDisplay(false)}>
         <div    
          className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
        
          <div className="px-2 py-2 bg-white rounded-md shadow absolute right-0 ">

  

      <a
        className="block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        onClick={async(e) =>{
          
          //handleClick( href)
        const { useRouter } = (await import('next/router'));
        const router = useRouter()
       router.push('/profile')
        }}
        
        >
        {"My profile"}
      </a>
   
      <a
           
           className="block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
           onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
           }}
           >
           <span className="flex">
            Theme:  {theme == 'dark' ? (
              <Moon className="w-2 h-2" />
            ) : (
              <Sun className="w-2 h-2" />
            )}
           </span>
           
           </a>
   
           <a
                //className={cn(s.link, 'border-t border-primary-2 mt-4')}
                className="block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
   
                onClick={
                 
                  async() => {
               
                  await logout()
                   setCustomerToken(null)
                
                 }}
                >
                Logout
                </a>
                </div>
        </div>
   </Clickoutside>   
   </>
  )
  }

  export default UserView