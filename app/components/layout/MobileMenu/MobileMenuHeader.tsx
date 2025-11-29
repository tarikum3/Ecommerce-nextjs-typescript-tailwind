import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function MobileMenuHeader() {
  return (
    <div className="flex px-4 pb-2 pt-5">
      <Dialog.Close asChild>
        <button className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 transition-colors">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Close menu</span>
          <X className="h-6 w-6" />
        </button>
      </Dialog.Close>
    </div>
  );
}