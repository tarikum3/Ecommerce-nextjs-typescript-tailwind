import '@assets/main.css'
import '@assets/chrome-bug.css'


import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { SEO } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'


const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
 
  const Layout = (Component as any).Layout || Noop
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
    
        <SEO>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
    </SEO>
      {/* <Head /> */}
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      
      </ManagedUIContext>
    </>
  )
}
