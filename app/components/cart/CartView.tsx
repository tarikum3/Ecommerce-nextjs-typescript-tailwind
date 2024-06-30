"use client";
import { FC, useState } from "react";
import CartItem from "./CartItem";
import { Bag } from "@/app/components/icons";
import usePrice from "@lib/hooks/use-price";
//import { SHOPIFY_CHECKOUT_URL_COOKIE } from "@framework/const";
//import Cookies from "js-cookie";
//import { useGetCartQuery } from "@framework/services/cart";
import type { Cart } from "@lib/types";
import Clickoutside from "@/app/components/common/Clickoutside";
const CartView = ({ cart }: { cart: Cart | undefined }) => {
  const [display, setDisplay] = useState(true);
  const [dropdown, setDropdown] = useState("");
  const { price: subTotal } = usePrice(
    cart && {
      amount: Number(cart.subtotalPrice),
      currencyCode: cart.currency.code,
    }
  );
  const { price: total } = usePrice(
    cart && {
      amount: Number(cart.totalPrice),
      currencyCode: cart.currency.code,
    }
  );
  const handleDropdown = (current: string = "") => {
    if (dropdown == current) {
      setDropdown("");
    } else {
      setDropdown(current);
      setDisplay(true);
    }
  };
  //const checkoutUrl = Cookies.get(SHOPIFY_CHECKOUT_URL_COOKIE);
  // console.log("dropdown", dropdown);
  // console.log("dropdowndisplay", display);
  console.log("cartttt", cart);
  return (
    <div className="relative ">
      <button onClick={() => handleDropdown("cart")} aria-label="Menu">
        <Bag className="w-7 h-7" />
        {cart && cart?.lineItems?.length > 0 && (
          <span className="min-w-[1.25rem] min-h-[1.25rem] border border-primary-2 bg-secondary text-primary absolute rounded-full right-3 top-3 font-bold text-xs">
            {cart?.lineItems?.length}
          </span>
        )}
      </button>

      {dropdown == "cart" && (
        <Clickoutside status={display} onClick={() => setDisplay(false)}>
          <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
            <div className="absolute right-0 w-[80vw] md:w-[700px] h-screen bg-white rounded-md shadow-lg">
              {cart && cart?.lineItems?.length < 1 ? (
                <div className="flex-1 px-4 flex flex-col justify-center items-center">
                  <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
                    <Bag className="absolute" />
                  </span>
                  <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                    Your cart is empty
                  </h2>
                  <p className="text-primary-3 px-10 text-center pt-2">
                    Biscuit oat cake wafer icing ice cream tiramisu pudding
                    cupcake.
                  </p>
                </div>
              ) : (
                <>
                  <div className="px-4 sm:px-6 flex-1">
                    <h2 className="pt-1 pb-2 text-2xl font-bold tracking-wide cursor-pointer mb-2">
                      My Cart
                    </h2>

                    <ul className="py-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-primary-2 border-primary-2">
                      {cart?.lineItems?.map((item: any) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          currencyCode={cart!.currency.code}
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
                      <a
                        className="bg-secondary inline-flex items-center justify-center w-full max-h-[64px] text-primary p-5 text-sm"
                        //href={checkoutUrl}
                      >
                        Proceed to Checkout
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Clickoutside>
      )}
    </div>
  );
};

export default CartView;
