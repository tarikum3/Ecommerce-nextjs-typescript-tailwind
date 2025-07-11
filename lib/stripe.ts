import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

let stripePromise: Promise<any>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});

export const getStripeCustomer = async (email: string) => {
  const customers = await stripe.customers.list({ email });
  return customers.data[0] || stripe.customers.create({ email });
};
