import Link from "next/link";

import { Button } from "@/app/components";
export default function CancelPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <div className="flex justify-center mb-4">
        {/* <CheckCircle className="h-12 w-12 text-green-500" /> */}
      </div>
      <h1 className="text-2xl font-bold mb-2">Payment Cancelled!</h1>
    </div>
  );
}
