import { FC, memo, useEffect } from 'react'
import { useRouter } from 'next/router'



const Searchbar: FC= () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [router])

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.key === 'Enter') {
      const q = e.currentTarget.value

      router.push(
        {
          pathname: `/search`,
          query: q ? { q } : {},
        },
        undefined,
       // { shallow: true }
       
      )
    }
  }


  return (
    <div 
    
    className="relative flex justify-between border border-primary-2 rounded-xl items-center text-2xl bg-primary text-secondary w-full transition-colors duration-150 "
    >
      <label className="hidden" htmlFor="search">
        Search
      </label>
      <input
        id="search"
        
        className="placeholder-primary-3 bg-transparent px-3 py-2 appearance-none w-full transition duration-150 ease-in-out pr-10  focus:outline-none "
        placeholder="Search for products..."
        defaultValue={router.query.q}
        onKeyUp={handleKeyUp}
      />
      {/* <div 
     
      className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      > */}
        <svg 
      
        className="h-10 w-10 text-primary-3 "
        fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
      {/* </div> */}
    </div>
  )
}

export default memo(Searchbar)
