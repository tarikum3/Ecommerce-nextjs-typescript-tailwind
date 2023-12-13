
import dynamic from 'next/dynamic'
import LoginView from '@components/auth/LoginView'
import { useUI } from '@components/context'
import { Navbar, Footer } from '@components/common'




const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    {/* <LoadingDots /> */}
    Loading...
  </div>
)

const dynamicProps = {
  loading: Loading,
}

const SignUpView = dynamic(() => import('@components/auth/SignUpView'), {
  ...dynamicProps,
})

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  {
    ...dynamicProps,
  }
)

const Modal = dynamic(() => import('@components/ui/Modal'), {
  ...dynamicProps,
  ssr: false,
})

interface Props {
 
  children?: React.ReactNode
}


const ModalUINew: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI()
  return displayModal ? (
    <Modal onClose={closeModal}>
    {modalView === 'LOGIN_VIEW' && <LoginView />}
    {modalView === 'SIGNUP_VIEW' && <SignUpView />}
    {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
  </Modal>
  ) : null
}




const Layout: React.FC<Props> = ({
  children,

}) => {
  
  
  
 
  return (
 


      <div 
     
      className="h-full max-w-[2460px] bg-primary mx-auto transition-colors duration-150"
      >
       
        <Navbar  />
        <main className="fit">{children}</main>
       
        <Footer  />
        <ModalUINew /> 
      </div>
  
  )
}

export default Layout
