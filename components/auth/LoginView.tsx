import { useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components'

import { useUI } from '@components/context'
import { validate } from 'email-validator'
import { useLoginMutation } from '@framework/services/customer'
import {
  setCustomerToken,
} from '@framework/utils'


const LoginView: React.FC = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()

  
 
  const [login]=useLoginMutation();
  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      const data=   await login({
        email,
        password,
      })

    // const data=  login({ email:"tarikum3@gmail.com", password:"9427230912" });
   
      const accessToken = (data as any)?.data?.customerAccessToken?.accessToken
      const custError=(data as any)?.data?.customerUserErrors
      if (accessToken) {
       setCustomerToken(accessToken)
       closeModal()
      }
      if (custError) {
      
      if (custError instanceof Array) {
        setMessage(custError?.map((e: any) => e.message).join('<br/>'))
      } else {
        setMessage('Unexpected error')
      }
      setDisabled(false)
    }
    } catch ({ errors }) {
      if (errors instanceof Array) {
        setMessage(errors.map((e: any) => e.message).join('<br/>'))
      } else {
        setMessage('Unexpected error')
      }
      setDisabled(false)
    } finally {
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword)
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <form
      onSubmit={handleLogin}
      className="w-80 flex flex-col justify-between p-3 border rounded-lg"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {message && (
          <div className="text-red border border-red p-3">
            {message}. Did you {` `}
            <a
              className="text-secondary inline font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              forgot your password?
            </a>
          </div>
        )}
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Password" onChange={setPassword} />

        <Button
        
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Log In
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-secondary-3">Don't have an account?</span>
          {` `}
          <a
            className="text-secondary font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>
  )
}

export default LoginView
