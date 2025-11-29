"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";

export default function MobileMenuTrigger() {
  return (
    <Dialog.Trigger asChild>
      <button className="lg:hidden p-2 text-gray-500 hover:text-primary-500 transition-colors rounded-full hover:bg-gray-100">
        <Menu className="h-6 w-6" />
      </button>
    </Dialog.Trigger>
  );
}