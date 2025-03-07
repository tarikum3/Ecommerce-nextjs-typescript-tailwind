import React from "react";
import Delivery from "@/app/components/checkout/Delivery";
import Summary from "@/app/components/checkout/Summary";
import { getCartByIdUtil } from "@/lib/helper";

export default async function CheckoutWrapper() {
  let cart = await getCartByIdUtil();
  return (
    <div className=" mt-6 p-2  sm:mt-8 lg:flex lg:justify-center lg:items-start lg:gap-12 xl:gap-16">
      <Delivery cart={cart as any} />
      <Summary cart={cart as any} />
    </div>
  );
}
