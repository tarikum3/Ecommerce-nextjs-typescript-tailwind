import CancelPage from "@/app/components/checkout/CancelPage";
import { Metadata } from "next";
import { cancelOrder } from "@/lib/actions/actions";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Cancel",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
export default async function Cancel() {
  await cancelOrder();
  return (
    <>
      <CancelPage />
    </>
  );
}
