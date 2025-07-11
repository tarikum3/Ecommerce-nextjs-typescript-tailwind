"use client";

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { Button } from "@/app/components";
import { getStripe } from "@/lib/stripe";
const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (stripeError) {
      setError(stripeError.message || "Payment failed");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full mt-6"
        loading={isLoading}
      >
        Pay ${amount.toFixed(2)}
      </Button>
    </form>
  );
};

export const StripeElementsProvider = ({
  amount,
  clientSecret,
  children,
}: {
  amount: number;
  clientSecret: string;
  children: React.ReactNode;
}) => {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#2563eb",
            borderRadius: "6px",
          },
        },
      }}
    >
      {children}
    </Elements>
  );
};

export default CheckoutForm;
