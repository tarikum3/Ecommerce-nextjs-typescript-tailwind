import SuccessPage from "@/app/components/checkout/SuccessPage";
import { Metadata } from "next";
import { completeOrder } from "@/lib/actions/actions";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Success",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
export default async function Success() {
  await completeOrder();
  return (
    <>
      <SuccessPage />
    </>
  );
}
