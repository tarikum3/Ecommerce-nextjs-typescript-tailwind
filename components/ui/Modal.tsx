import { FC, useRef, useEffect, useCallback, ReactNode } from 'react'
//import s from './Modal.module.css'
import { Cross } from '@components/icons'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'


interface ModalProps {
  className?: string
  children?: ReactNode
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    const modal = ref.current

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true })
      window.addEventListener('keydown', handleKey)
    }
    return () => {
      clearAllBodyScrollLocks()
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  return (
    <div
     //className={s.root}
     className="fixed bg-black bg-opacity-40 flex items-center inset-0 z-50 justify-center"
     >
      <div
       //className={s.modal} 
       className="bg-primary p-12 border border-primary-2 relative focus:outline-none"
       role="dialog" ref={ref}>
        <button
          onClick={() => onClose()}
          aria-label="Close panel"
          //className={s.close}
          className= "hover:text-primary-3 transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6"
        >
          <Cross className="h-6 w-6" />
        </button>
      
        {children}
      </div>
    </div>
  )
}

export default Modal
