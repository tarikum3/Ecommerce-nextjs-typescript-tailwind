
import { FC } from 'react'
import CartItem from './CartItem'
import { Button } from '@components/ui'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import {
  SHOPIFY_CHECKOUT_URL_COOKIE,
} from '@framework/const'
import Cookies from 'js-cookie'

const CartView: FC = () => {
  
  const { data, isLoading, isEmpty } = useCart()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const checkoutUrl = Cookies.get(SHOPIFY_CHECKOUT_URL_COOKIE)

 


  return (
  
    <div>
      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-primary-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      )  : (
        <>
          <div className="px-4 sm:px-6 flex-1">
          
              <h2 className="pt-1 pb-2 text-2xl font-bold tracking-wide cursor-pointer mb-2" >
                My Cart
              </h2>
           
            <ul 
            className= 'py-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-primary-2 border-primary-2'
            >
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-primary border-t text-sm">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-primary-2 py-3 font-bold mb-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div>
          
            
             
                <Button href={checkoutUrl} Component="a" width="100%">
                  Proceed to Checkout
                </Button>
             
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartView
