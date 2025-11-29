"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import MobileMenuContent from "./MobileMenuContent";
import MobileMenuFooter from "./MobileMenuFooter";

export default function MobileMenu() {
  const [activeTab, setActiveTab] = useState("women");

  return (
    <Dialog.Root>
      {/* Trigger */}
      <Dialog.Trigger asChild>
        <button className="lg:hidden p-2 text-gray-500 hover:text-primary-500 transition-colors rounded-full hover:bg-gray-100">
          <Menu className="h-6 w-6" />
        </button>
      </Dialog.Trigger>

      {/* Content */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl lg:hidden">
          {/* Dialog Title for accessibility */}
          <Dialog.Title className="sr-only">Mobile Navigation Menu</Dialog.Title>
          
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex px-4 pb-2 pt-5">
              <Dialog.Close asChild>
                <button className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 transition-colors">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" />
                </button>
              </Dialog.Close>
            </div>
            
            {/* Tabs */}
            <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <Tabs.List className="border-b border-gray-200 px-4">
                <div className="-mb-px flex space-x-8">
                  <Tabs.Trigger 
                    value="women"
                    className="flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 border-transparent text-gray-900"
                  >
                    Women
                  </Tabs.Trigger>
                  <Tabs.Trigger 
                    value="men"
                    className="flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 border-transparent text-gray-900"
                  >
                    Men
                  </Tabs.Trigger>
                </div>
              </Tabs.List>

              <Tabs.Content value="women" className="flex-1">
                <MobileMenuContent gender="women" />
              </Tabs.Content>

              <Tabs.Content value="men" className="flex-1">
                <MobileMenuContent gender="men" />
              </Tabs.Content>
            </Tabs.Root>

            <MobileMenuFooter />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}