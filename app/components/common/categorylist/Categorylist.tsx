// // components/category-list.tsx
// 'use client';

// import { CategoryListItem as CategoryListItemType } from '@/app/types/category';
// import CategoryListItem from './CategoryListItem';
// import Link from 'next/link';

// interface CategoryListProps {
//   categories: CategoryListItemType[];
//   currentCategory?: string;
//   onCategorySelect?: (category: CategoryListItemType) => void;
// }

// export default function CategoryList({
//   categories,
//   currentCategory,
//   onCategorySelect
// }: CategoryListProps) {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
//       </div>
      
//       <div className="space-y-1">
//         {categories.map((category) => (
//           <CategoryListItem
//             key={category.url}
//             category={category}
//             currentCategory={currentCategory}
//             onCategorySelect={onCategorySelect}
//           />
//         ))}
//       </div>

//       <div className="mt-6 pt-6 border-t border-gray-200">
//         <Link
//           href="/categories"
//           className="w-full text-center text-primary-600 hover:text-primary-700 font-medium transition-colors flex items-center justify-center"
//         >
//           View all categories
//           <svg
//             className="ml-1 h-4 w-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// }



// components/category/CategoryComponent.tsx
'use client'

import React, { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, Menu, X, Laptop, Smartphone, Tv, Headphones, Gamepad, Camera, Watch, Home } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

// Types
interface Category {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  subcategories?: SubCategory[]
}

interface SubCategory {
  id: string
  name: string
}

interface CategoryComponentProps {
  onCategorySelect?: (categoryId: string, subcategoryId?: string) => void
}

// Mock data
const categories: Category[] = [
  {
    id: 'computers',
    name: 'Computers & Laptops',
    icon: <Laptop className="w-5 h-5" />,
    color: 'text-blue-500',
    subcategories: [
      { id: 'gaming', name: 'Gaming Laptops' },
      { id: 'ultrabooks', name: 'Ultrabooks' },
      { id: 'business', name: 'Business Laptops' },
      { id: 'all-in-one', name: 'All-in-One PCs' },
    ],
  },
  {
    id: 'smartphones',
    name: 'Smartphones & Tablets',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'text-green-500',
    subcategories: [
      { id: 'android', name: 'Android Phones' },
      { id: 'iphones', name: 'iPhones' },
      { id: 'tablets', name: 'Tablets' },
      { id: 'accessories', name: 'Accessories' },
    ],
  },
  {
    id: 'tv',
    name: 'TV & Home Theater',
    icon: <Tv className="w-5 h-5" />,
    color: 'text-purple-500',
    subcategories: [
      { id: '4k-tv', name: '4K TVs' },
      { id: 'smart-tv', name: 'Smart TVs' },
      { id: 'soundbars', name: 'Soundbars' },
      { id: 'home-theater', name: 'Home Theater Systems' },
    ],
  },
  {
    id: 'audio',
    name: 'Audio & Headphones',
    icon: <Headphones className="w-5 h-5" />,
    color: 'text-yellow-500',
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: <Gamepad className="w-5 h-5" />,
    color: 'text-red-500',
  },
  {
    id: 'cameras',
    name: 'Cameras & Drones',
    icon: <Camera className="w-5 h-5" />,
    color: 'text-indigo-500',
  },
  {
    id: 'wearables',
    name: 'Wearable Tech',
    icon: <Watch className="w-5 h-5" />,
    color: 'text-teal-500',
  },
  {
    id: 'smart-home',
    name: 'Smart Home',
    icon: <Home className="w-5 h-5" />,
    color: 'text-orange-500',
  },
]

export function MobileCategories() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Mobile Menu Button - This is what you export and use in your main page */}
      <Dialog.Trigger asChild>
        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-6 h-6" />
        </button>
      </Dialog.Trigger>

      {/* Mobile Categories Overlay */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-[320px] bg-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
                    {/* Dialog Title for accessibility */}
                    <Dialog.Title className="sr-only">Category Menu</Dialog.Title>
          <div className="h-full overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Categories</h2>
                <Dialog.Close className="p-2 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

              <Accordion.Root type="multiple" className="space-y-2">
                {categories.map(category => (
                  <Accordion.Item
                    key={category.id}
                    value={category.id}
                    className="overflow-hidden"
                  >
                    <Accordion.Trigger className="flex justify-between items-center w-full p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 data-[state=open]:bg-blue-100">
                      <div className="flex items-center">
                        <span className={`mr-3 ${category.color}`}>
                          {category.icon}
                        </span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      {category.subcategories && (
                        <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      )}
                    </Accordion.Trigger>
                    {category.subcategories && (
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <ul className="ml-8 mt-2 space-y-2">
                          {category.subcategories.map(sub => (
                            <li
                              key={sub.id}
                              className="p-2 hover:bg-blue-50 rounded cursor-pointer"
                            >
                              {sub.name}
                            </li>
                          ))}
                        </ul>
                      </Accordion.Content>
                    )}
                  </Accordion.Item>
                ))}
              </Accordion.Root>

              <Dialog.Close className="w-full mt-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Apply Categories
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function DesktopCategories() {
  return (
    <aside className="hidden lg:block lg:w-1/4">
      <div className="bg-white rounded-lg shadow-md p-5 sticky top-32">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Categories</h2>

        <Accordion.Root type="multiple" className="space-y-2">
          {categories.map(category => (
            <Accordion.Item
              key={category.id}
              value={category.id}
              className="overflow-hidden"
            >
              <Accordion.Trigger className="flex justify-between items-center w-full p-2 rounded cursor-pointer hover:bg-blue-50 group data-[state=open]:bg-blue-50">
                <div className="flex items-center">
                  <span className={`mr-3 ${category.color}`}>
                    {category.icon}
                  </span>
                  <span className="font-medium">{category.name}</span>
                </div>
                {category.subcategories && (
                  <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                )}
              </Accordion.Trigger>
              {category.subcategories && (
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <ul className="ml-8 pl-2 border-l border-gray-200">
                    {category.subcategories.map(sub => (
                      <li
                        key={sub.id}
                        className="p-2 hover:bg-blue-50 rounded cursor-pointer"
                      >
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              )}
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </aside>
  )
}

export function MobileCategoriesButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Mobile Categories Button - for use in product page controls */}
      <Dialog.Trigger asChild>
        <button className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow border border-gray-200">
          <Menu className="w-5 h-5 mr-2 text-blue-600" />
          <span>Categories</span>
        </button>
      </Dialog.Trigger>

      {/* Mobile Categories Overlay */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-[320px] bg-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
          <div className="h-full overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Categories</h2>
                <Dialog.Close className="p-2 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

              <Accordion.Root type="multiple" className="space-y-2">
                {categories.map(category => (
                  <Accordion.Item
                    key={category.id}
                    value={category.id}
                    className="overflow-hidden"
                  >
                    <Accordion.Trigger className="flex justify-between items-center w-full p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 data-[state=open]:bg-blue-100">
                      <div className="flex items-center">
                        <span className={`mr-3 ${category.color}`}>
                          {category.icon}
                        </span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      {category.subcategories && (
                        <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      )}
                    </Accordion.Trigger>
                    {category.subcategories && (
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <ul className="ml-8 mt-2 space-y-2">
                          {category.subcategories.map(sub => (
                            <li
                              key={sub.id}
                              className="p-2 hover:bg-blue-50 rounded cursor-pointer"
                            >
                              {sub.name}
                            </li>
                          ))}
                        </ul>
                      </Accordion.Content>
                    )}
                  </Accordion.Item>
                ))}
              </Accordion.Root>

              <Dialog.Close className="w-full mt-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Apply Categories
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

