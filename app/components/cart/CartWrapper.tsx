import { cookies } from "next/headers";
import CartView from "./CartView";
import { getCart } from "@lib/services";
export default async function CartWrapper() {
  const cartId = cookies().get("cartId")?.value;
  let cart;
  //await new Promise((resolve) => setTimeout(resolve, 9000));
  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartView cart={cart} />;
}
