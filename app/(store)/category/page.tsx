



// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Filter, 
//   X, 
//   Check, 
//   Laptop, 
//   Smartphone, 
//   Tv, 
//   Headphones, 
//   Gamepad2, 
//   Camera,
//   Home,
//   Watch,
//   CheckSquare,
//   Square,
//   SlidersHorizontal,
//   Star,
//   DollarSign,
//   ThumbsUp,
//   Clock,
//   ShoppingCart,
//   StarIcon,
//   ChevronLeft,
//   ChevronRight,
//   MoreHorizontal
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useRouter, useSearchParams } from "next/navigation";

// // ==================== TYPES ====================
// interface Category {
//   id: string;
//   name: string;
//   icon: React.ReactNode;
//   color: string;
//   subcategories?: Subcategory[];
//   url: string;
// }

// interface Subcategory {
//   id: string;
//   name: string;
//   url: string;
// }

// interface FilterOption {
//   id: string;
//   label: string;
//   type: 'checkbox' | 'radio' | 'range';
//   options?: string[];
//   value?: string | number;
//   min?: number;
//   max?: number;
//   step?: number;
// }

// interface SortOption {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
// }

// interface Product {
//   id: number;
//   name: string;
//   brand: string;
//   price: number;
//   originalPrice?: number;
//   rating: number;
//   reviewCount: number;
//   description: string;
//   image: string;
//   specs: {
//     processor: string;
//     ram: string;
//     storage: string;
//     display?: string;
//   };
//   isNew?: boolean;
//   isBestSeller?: boolean;
//   inStock: boolean;
// }

// // ==================== COMPONENTS ====================

// // 1. Category Sidebar Component
// const CategorySidebar = ({
//   categories,
//   expandedCategories,
//   onToggleCategory,
//   priceRange,
//   onPriceChange,
//   activeCategory
// }: {
//   categories: Category[];
//   expandedCategories: string[];
//   onToggleCategory: (categoryId: string) => void;
//   priceRange: number;
//   onPriceChange: (value: number) => void;
//   activeCategory?: string;
// }) => {
//   const router = useRouter();

//   const handleCategoryClick = (category: Category, e: React.MouseEvent) => {
//     e.preventDefault();
//     router.push(category.url);
//   };

//   const handleSubcategoryClick = (subcategory: Subcategory, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     router.push(subcategory.url);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32">
//       <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Categories</h2>
      
//       <ul className="space-y-1">
//         {categories.map(category => (
//           <li 
//             key={category.id} 
//             className="border-b border-gray-100 last:border-0 group/category"
//           >
//             <a
//               href={category.url}
//               onClick={(e) => handleCategoryClick(category, e)}
//               className={cn(
//                 "flex justify-between items-center w-full p-3 rounded-lg cursor-pointer transition-all duration-200",
//                 "hover:bg-primary-50",
//                 (expandedCategories.includes(category.id) || activeCategory === category.id) && "bg-primary-50",
//                 activeCategory === category.id && "border-l-4 border-primary-500 pl-2.5"
//               )}
//               onMouseEnter={() => window.innerWidth >= 768 && !expandedCategories.includes(category.id) && onToggleCategory(category.id)}
//               onMouseLeave={() => window.innerWidth >= 768 && expandedCategories.includes(category.id) && onToggleCategory(category.id)}
//             >
//               <div className="flex items-center">
//                 <span className={cn("mr-3", category.color)}>{category.icon}</span>
//                 <span className="font-medium text-left text-gray-900 hover:text-primary-600 transition-colors">
//                   {category.name}
//                 </span>
//               </div>
//               {category.subcategories && (
//                 <ChevronDown className={cn(
//                   "w-4 h-4 text-gray-500 transition-transform duration-200",
//                   expandedCategories.includes(category.id) && "rotate-180"
//                 )} />
//               )}
//             </a>
            
//             {category.subcategories && (
//               <ul className={cn(
//                 "ml-10 mt-2 space-y-1 pb-2 transition-all duration-200 overflow-hidden",
//                 "lg:hidden",
//                 expandedCategories.includes(category.id) ? "block" : "hidden",
//                 "lg:group-hover/category:block lg:group-hover/category:opacity-100",
//                 expandedCategories.includes(category.id) && "lg:block"
//               )}>
//                 {category.subcategories.map(sub => (
//                   <li key={sub.id}>
//                     <a
//                       href={sub.url}
//                       onClick={(e) => handleSubcategoryClick(sub, e)}
//                       className="w-full text-left p-2 hover:bg-primary-50 rounded cursor-pointer text-gray-600 hover:text-gray-900 transition-colors text-sm block"
//                     >
//                       {sub.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // 2. Filter Panel Component
// const FilterPanel = ({
//   filterOptions,
//   selectedFilters,
//   onToggleFilter,
//   onClearFilters,
//   onApplyFilters,
//   variant = 'desktop'
// }: {
//   filterOptions: FilterOption[];
//   selectedFilters: Record<string, string[]>;
//   onToggleFilter: (filterId: string, option: string) => void;
//   onClearFilters: () => void;
//   onApplyFilters: () => void;
//   variant?: 'desktop' | 'mobile';
// }) => {
//   return (
//     <div className={variant === 'mobile' ? "p-6" : ""}>
//       {variant === 'mobile' && (
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-xl font-bold text-gray-900">Filter Products</h2>
//           <button
//             onClick={onApplyFilters}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
//           </button>
//         </div>
//       )}

//       <div className={variant === 'mobile' ? "space-y-8" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
//         {filterOptions.slice(0, -1).map(filter => (
//           <div key={filter.id}>
//             <h4 className="font-medium text-gray-900 mb-4">{filter.label}</h4>
//             <div className={variant === 'mobile' ? "grid grid-cols-2 gap-3" : "space-y-3"}>
//               {filter.options?.map(option => {
//                 const isSelected = selectedFilters[filter.id]?.includes(option);
//                 return (
//                   <label
//                     key={option}
//                     className={cn(
//                       "flex items-center cursor-pointer transition-all duration-300 group",
//                       variant === 'mobile' 
//                         ? cn(
//                             "p-3 border rounded-lg",
//                             isSelected
//                               ? "bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200"
//                               : "hover:bg-gray-50 border-gray-200 hover:border-primary-200"
//                           )
//                         : "hover:bg-gray-50 p-2 rounded-lg"
//                     )}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={isSelected}
//                       onChange={() => onToggleFilter(filter.id, option)}
//                       className="sr-only"
//                     />
//                     {isSelected ? (
//                       <CheckSquare className="w-5 h-5 text-primary-600 mr-3 group-hover:text-primary-700 transition-colors" />
//                     ) : (
//                       <Square className="w-5 h-5 text-gray-400 mr-3 group-hover:text-gray-600 transition-colors" />
//                     )}
//                     <span className={cn(
//                       "text-gray-700 group-hover:text-gray-900 transition-colors",
//                       isSelected && "text-gray-900 font-medium"
//                     )}>
//                       {option}
//                     </span>
//                   </label>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {variant === 'mobile' ? (
//         <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
//           <button
//             onClick={onClearFilters}
//             className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 w-1/3 mr-2 transition-all duration-300"
//           >
//             Clear All
//           </button>
//           <button
//             onClick={onApplyFilters}
//             className="px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 w-2/3 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             Apply Filters
//           </button>
//         </div>
//       ) : (
//         <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
//           <button
//             onClick={onClearFilters}
//             className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 mr-3 transition-all duration-300"
//           >
//             Clear All
//           </button>
//           <button
//             onClick={onApplyFilters}
//             className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             Apply Filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // 3. Sort Dropdown Component
// const SortDropdown = ({
//   sortOptions,
//   selectedSort,
//   onSelectSort,
//   showDesktopSort,
//   onToggleDesktopSort,
//   desktopSortRef
// }: {
//   sortOptions: SortOption[];
//   selectedSort: string;
//   onSelectSort: (sortId: string) => void;
//   showDesktopSort?: boolean;
//   onToggleDesktopSort?: () => void;
//   desktopSortRef?: React.RefObject<HTMLDivElement>;
// }) => {
//   if (desktopSortRef) {
//     return (
//       <div className="relative" ref={desktopSortRef}>
//         <button
//           onClick={onToggleDesktopSort}
//           className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-all duration-300 hover:border-gray-300"
//         >
//           <div className="flex items-center">
//             <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500" />
//             <span>Sort by: {sortOptions.find(s => s.id === selectedSort)?.label}</span>
//           </div>
//           {showDesktopSort ? (
//             <ChevronUp className="w-4 h-4 ml-3 text-gray-500" />
//           ) : (
//             <ChevronDown className="w-4 h-4 ml-3 text-gray-500" />
//           )}
//         </button>
        
//         {showDesktopSort && (
//           <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-slide-up">
//             <ul className="py-2">
//               {sortOptions.map((option) => (
//                 <li key={option.id}>
//                   <button
//                     onClick={() => onSelectSort(option.id)}
//                     className={cn(
//                       "w-full flex items-center px-4 py-2.5 hover:bg-primary-50 cursor-pointer transition-all duration-300 group",
//                       selectedSort === option.id && "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600"
//                     )}
//                   >
//                     <span className="mr-3 group-hover:scale-110 transition-transform">{option.icon}</span>
//                     <span className="flex-1 text-left">{option.label}</span>
//                     {selectedSort === option.id && (
//                       <Check className="w-4 h-4 ml-2 text-primary-600" />
//                     )}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <button className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 group">
//       <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
//       <span className="text-gray-700 group-hover:text-gray-900">Sort</span>
//     </button>
//   );
// };

// // 4. Product Card Component
// const ProductCard = ({ product }: { product: Product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div 
//       className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
//             <Laptop className="w-16 h-16 text-primary-500 opacity-50" />
//           </div>
//         </div>
        
//         {product.isNew && (
//           <div className="absolute top-3 left-3">
//             <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
//               New
//             </span>
//           </div>
//         )}
//         {product.isBestSeller && (
//           <div className="absolute top-3 right-3">
//             <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
//               Best Seller
//             </span>
//           </div>
//         )}
        
//         {isHovered && (
//           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
//             <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center gap-2 shadow-lg transform hover:scale-105">
//               <ShoppingCart className="w-4 h-4" />
//               <span className="text-sm font-medium">Add to Cart</span>
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <div>
//             <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
//           </div>
//         </div>
        
//         <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
//         <div className="flex items-center gap-2 mb-3">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <StarIcon
//                 key={i}
//                 className={cn(
//                   "w-3 h-3",
//                   i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
//                 )}
//               />
//             ))}
//           </div>
//           <span className="text-xs text-gray-500">
//             {product.rating} ({product.reviewCount})
//           </span>
//         </div>

//         <div className="flex flex-wrap gap-1 mb-3">
//           <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//             {product.specs.ram}
//           </span>
//           <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//             {product.specs.storage}
//           </span>
//         </div>

//         <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//           <div className="flex items-center gap-2">
//             <span className="text-lg font-bold text-gray-900">${product.price}</span>
//             {product.originalPrice && (
//               <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//             )}
//             {product.originalPrice && (
//               <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded">
//                 -{Math.round((1 - product.price / product.originalPrice) * 100)}%
//               </span>
//             )}
//           </div>
//           <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all duration-300 hover:scale-110">
//             <ShoppingCart className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 5. Active Filters Component
// const ActiveFilters = ({
//   selectedFilters,
//   priceRange,
//   onRemoveFilter,
//   onClearPriceFilter
// }: {
//   selectedFilters: Record<string, string[]>;
//   priceRange: number;
//   onRemoveFilter: (filterId: string, option: string) => void;
//   onClearPriceFilter: () => void;
// }) => {
//   const activeFilters: string[] = [];
  
//   Object.entries(selectedFilters).forEach(([key, values]) => {
//     values.forEach(value => activeFilters.push(value));
//   });
  
//   if (priceRange < 5000) {
//     activeFilters.push(`$0-$${priceRange}`);
//   }
  
//   if (activeFilters.length === 0) return null;
  
//   return (
//     <div className="mb-6">
//       <div className="flex flex-wrap gap-2">
//         {activeFilters.map((filter) => (
//           <div
//             key={filter}
//             className="flex items-center bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-sm border border-primary-200"
//           >
//             <span className="font-medium">{filter}</span>
//             <button
//               onClick={() => {
//                 if (filter.startsWith('$0-$')) {
//                   onClearPriceFilter();
//                 } else {
//                   Object.entries(selectedFilters).forEach(([key, values]) => {
//                     if (values.includes(filter)) {
//                       onRemoveFilter(key, filter);
//                     }
//                   });
//                 }
//               }}
//               className="ml-2 text-primary-900 hover:text-primary-700 transition-colors"
//             >
//               <X className="w-3 h-3" />
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={() => {
//             Object.keys(selectedFilters).forEach(key => {
//               onRemoveFilter(key, 'clearAll');
//             });
//             onClearPriceFilter();
//           }}
//           className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
//         >
//           Clear all
//         </button>
//       </div>
//     </div>
//   );
// };



// interface PaginationProps {
//   currentPage?: number;
//   totalPages?: number;
//   totalItems?: number;
// }

// const Pagination = ({
//   currentPage = 1,
//   totalPages = 10,
//   totalItems = 100
// }: PaginationProps) => {
//   const [page, setPage] = useState(currentPage);
//   const itemsPerPage = 10;
  
//   const getPageNumbers = (): (number | string)[] => {
//     const delta = 2;
//     const range: number[] = [];
//     const rangeWithDots: (number | string)[] = [];
//     let l: number | undefined;

//     for (let i = 1; i <= totalPages; i++) {
//       if (
//         i === 1 ||
//         i === totalPages ||
//         (i >= page - delta && i <= page + delta)
//       ) {
//         range.push(i);
//       }
//     }

//     range.forEach((i) => {
//       if (l !== undefined) {
//         if (i - l === 2) {
//           rangeWithDots.push(l + 1);
//         } else if (i - l !== 1) {
//           rangeWithDots.push('...');
//         }
//       }
//       rangeWithDots.push(i);
//       l = i;
//     });

//     return rangeWithDots;
//   };

//   const pageNumbers = getPageNumbers();
//   const startItem = (page - 1) * itemsPerPage + 1;
//   const endItem = Math.min(page * itemsPerPage, totalItems);

//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 mt-8 border-t border-gray-200 animate-fade-in">
//       {/* Page info - Mobile */}
//       <div className="lg:hidden text-sm text-gray-600">
//         Showing {startItem}-{endItem} of {totalItems}
//       </div>

//       {/* Pagination buttons */}
//       <div className="flex items-center space-x-2">
//         {/* Previous button */}
//         <button
//           onClick={() => setPage(prev => Math.max(1, prev - 1))}
//           disabled={page === 1}
//           className={cn(
//             "flex items-center justify-center p-2 rounded-lg border transition-all duration-300",
//             page === 1
//               ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
//               : "border-gray-300 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
//           )}
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>

//         {/* Page numbers */}
//         <div className="flex items-center space-x-1">
//           {pageNumbers.map((pageNum, index) => (
//             pageNum === '...' ? (
//               <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
//                 <MoreHorizontal className="w-4 h-4" />
//               </span>
//             ) : (
//               <button
//                 key={pageNum}
//                 onClick={() => setPage(pageNum as number)}
//                 className={cn(
//                   "min-w-[2.5rem] h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-all duration-300",
//                   page === pageNum
//                     ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-600 shadow-sm"
//                     : "border-gray-300 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
//                 )}
//               >
//                 {pageNum}
//               </button>
//             )
//           ))}
//         </div>

//         {/* Next button */}
//         <button
//           onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
//           disabled={page === totalPages}
//           className={cn(
//             "flex items-center justify-center p-2 rounded-lg border transition-all duration-300",
//             page === totalPages
//               ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
//               : "border-gray-300 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
//           )}
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Page info - Desktop */}
//       <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
//         <span>Showing</span>
//         <span className="font-medium text-gray-900">{startItem}-{endItem}</span>
//         <span>of</span>
//         <span className="font-medium text-gray-900">{totalItems}</span>
//         <span>results</span>
//       </div>
//     </div>
//   );
// };


// // ==================== MAIN PRODUCTS PAGE ====================
// export default function ProductsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const categoryParam = searchParams.get('category');
  
//   // Categories data with URLs
//   const categories: Category[] = [
//     {
//       id: "computers",
//       name: "Computers & Laptops",
//       icon: <Laptop className="w-5 h-5" />,
//       color: "text-blue-500",
//       url: "/products?category=computers",
//       subcategories: [
//         { id: "gaming", name: "Gaming Laptops", url: "/products?category=computers&subcategory=gaming" },
//         { id: "ultrabooks", name: "Ultrabooks", url: "/products?category=computers&subcategory=ultrabooks" },
//         { id: "business", name: "Business Laptops", url: "/products?category=computers&subcategory=business" },
//         { id: "all-in-one", name: "All-in-One PCs", url: "/products?category=computers&subcategory=all-in-one" },
//       ],
//     },
//     {
//       id: "smartphones",
//       name: "Smartphones & Tablets",
//       icon: <Smartphone className="w-5 h-5" />,
//       color: "text-green-500",
//       url: "/products?category=smartphones",
//       subcategories: [
//         { id: "android", name: "Android Phones", url: "/products?category=smartphones&subcategory=android" },
//         { id: "iphone", name: "iPhones", url: "/products?category=smartphones&subcategory=iphone" },
//         { id: "tablets", name: "Tablets", url: "/products?category=smartphones&subcategory=tablets" },
//         { id: "accessories", name: "Accessories", url: "/products?category=smartphones&subcategory=accessories" },
//       ],
//     },
//     {
//       id: "tv",
//       name: "TV & Home Theater",
//       icon: <Tv className="w-5 h-5" />,
//       color: "text-purple-500",
//       url: "/products?category=tv",
//       subcategories: [
//         { id: "4k-tv", name: "4K TVs", url: "/products?category=tv&subcategory=4k-tv" },
//         { id: "smart-tv", name: "Smart TVs", url: "/products?category=tv&subcategory=smart-tv" },
//         { id: "soundbars", name: "Soundbars", url: "/products?category=tv&subcategory=soundbars" },
//         { id: "home-theater", name: "Home Theater Systems", url: "/products?category=tv&subcategory=home-theater" },
//       ],
//     },
//     {
//       id: "audio",
//       name: "Audio & Headphones",
//       icon: <Headphones className="w-5 h-5" />,
//       color: "text-amber-500",
//       url: "/products?category=audio",
//     },
//     {
//       id: "gaming",
//       name: "Gaming",
//       icon: <Gamepad2 className="w-5 h-5" />,
//       color: "text-red-500",
//       url: "/products?category=gaming",
//     },
//     {
//       id: "cameras",
//       name: "Cameras & Drones",
//       icon: <Camera className="w-5 h-5" />,
//       color: "text-indigo-500",
//       url: "/products?category=cameras",
//     },
//     {
//       id: "wearable",
//       name: "Wearable Tech",
//       icon: <Watch className="w-5 h-5" />,
//       color: "text-teal-500",
//       url: "/products?category=wearable",
//     },
//     {
//       id: "smart-home",
//       name: "Smart Home",
//       icon: <Home className="w-5 h-5" />,
//       color: "text-orange-500",
//       url: "/products?category=smart-home",
//     },
//   ];

//   // Filter options
//   const filterOptions: FilterOption[] = [
//     {
//       id: "brand",
//       label: "Brand",
//       type: "checkbox",
//       options: ["Apple", "Dell", "HP", "Lenovo", "Asus"],
//     },
//     {
//       id: "ram",
//       label: "RAM",
//       type: "checkbox",
//       options: ["8 GB", "16 GB", "32 GB", "64 GB"],
//     },
//     {
//       id: "storage",
//       label: "Storage",
//       type: "checkbox",
//       options: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
//     },
//     {
//       id: "price",
//       label: "Price Range",
//       type: "range",
//       min: 0,
//       max: 5000,
//       step: 100,
//       value: 2500,
//     },
//   ];

//   // Sort options
//   const sortOptions: SortOption[] = [
//     { id: "recommended", label: "Recommended", icon: <Star className="w-4 h-4" /> },
//     { id: "price-low", label: "Price: Low to High", icon: <DollarSign className="w-4 h-4" /> },
//     { id: "price-high", label: "Price: High to Low", icon: <DollarSign className="w-4 h-4" /> },
//     { id: "rating", label: "Customer Rating", icon: <ThumbsUp className="w-4 h-4" /> },
//     { id: "newest", label: "Newest Arrivals", icon: <Clock className="w-4 h-4" /> },
//   ];

//   // Sample products
//   const sampleProducts: Product[] = [
//     {
//       id: 1,
//       name: "MacBook Pro 16-inch",
//       brand: "Apple",
//       price: 2399,
//       originalPrice: 2599,
//       rating: 4.8,
//       reviewCount: 342,
//       description: "Apple M3 Pro chip, 16-core GPU, 18-core CPU, 16GB RAM, 512GB SSD",
//       image: "",
//       specs: { processor: "M3 Pro", ram: "16GB", storage: "512GB SSD" },
//       isNew: true,
//       isBestSeller: true,
//       inStock: true
//     },
//     {
//       id: 2,
//       name: "Dell XPS 15",
//       brand: "Dell",
//       price: 1899,
//       rating: 4.6,
//       reviewCount: 287,
//       description: "15.6-inch OLED display, Intel Core i9, 32GB RAM, 1TB SSD, RTX 4060",
//       image: "",
//       specs: { processor: "Intel Core i9", ram: "32GB", storage: "1TB SSD", display: "15.6-inch OLED" },
//       isBestSeller: true,
//       inStock: true
//     },
//     {
//       id: 3,
//       name: "Lenovo ThinkPad X1 Carbon",
//       brand: "Lenovo",
//       price: 1499,
//       originalPrice: 1699,
//       rating: 4.7,
//       reviewCount: 156,
//       description: "14-inch business laptop, Intel Core i7, 16GB RAM, 512GB SSD",
//       image: "",
//       specs: { processor: "Intel Core i7", ram: "16GB", storage: "512GB SSD" },
//       isNew: true,
//       inStock: true
//     },
//     {
//       id: 4,
//       name: "ASUS ROG Zephyrus G14",
//       brand: "ASUS",
//       price: 1599,
//       rating: 4.5,
//       reviewCount: 423,
//       description: "Gaming laptop, AMD Ryzen 9, 16GB RAM, 1TB SSD, RTX 4070",
//       image: "",
//       specs: { processor: "AMD Ryzen 9", ram: "16GB", storage: "1TB SSD" },
//       inStock: true
//     },
//     {
//       id: 5,
//       name: "HP Spectre x360",
//       brand: "HP",
//       price: 1299,
//       rating: 4.4,
//       reviewCount: 198,
//       description: "Convertible laptop, Intel Core i7, 16GB RAM, 512GB SSD, 13.5-inch touch",
//       image: "",
//       specs: { processor: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "13.5-inch touch" },
//       inStock: true
//     },
//     {
//       id: 6,
//       name: "Microsoft Surface Laptop 5",
//       brand: "Microsoft",
//       price: 999,
//       originalPrice: 1199,
//       rating: 4.3,
//       reviewCount: 231,
//       description: "13.5-inch touchscreen, Intel Core i5, 8GB RAM, 256GB SSD",
//       image: "",
//       specs: { processor: "Intel Core i5", ram: "8GB", storage: "256GB SSD", display: "13.5-inch touch" },
//       inStock: true
//     },
//   ];

//   // State management
//   const [expandedCategories, setExpandedCategories] = useState<string[]>(
//     categoryParam ? [categoryParam] : []
//   );
//   const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
//     brand: ["Dell", "Lenovo"],
//     ram: ["16 GB"],
//     storage: ["256 GB SSD", "512 GB SSD"],
//   });
//   const [priceRange, setPriceRange] = useState<number>(2500);
//   const [selectedSort, setSelectedSort] = useState<string>("recommended");
//   const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
//   const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
//   const [showMobileSort, setShowMobileSort] = useState<boolean>(false);
//   const [showDesktopFilters, setShowDesktopFilters] = useState<boolean>(false);
//   const [showDesktopSort, setShowDesktopSort] = useState<boolean>(false);

//   // Refs for click outside detection
//   const desktopSortRef = useRef<HTMLDivElement>(null);

//   // Expand category based on URL parameter on mount
//   useEffect(() => {
//     if (categoryParam) {
//       setExpandedCategories([categoryParam]);
//     }
//   }, [categoryParam]);

//   // Toggle category expansion
//   const toggleCategory = (categoryId: string) => {
//     setExpandedCategories(prev =>
//       prev.includes(categoryId)
//         ? prev.filter(id => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   // Toggle filter selection
//   const toggleFilter = (filterId: string, option: string) => {
//     setSelectedFilters(prev => {
//       const current = prev[filterId] || [];
//       const updated = current.includes(option)
//         ? current.filter(item => item !== option)
//         : [...current, option];
      
//       return { ...prev, [filterId]: updated };
//     });
//   };

//   // Remove specific filter
//   const removeFilter = (filterId: string, option: string) => {
//     toggleFilter(filterId, option);
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedFilters({});
//     setPriceRange(5000);
//   };

//   // Clear price filter
//   const clearPriceFilter = () => {
//     setPriceRange(5000);
//   };

//   // Apply filters
//   const applyFilters = () => {
//     console.log("Applied filters:", selectedFilters);
//     console.log("Price range:", priceRange);
//     setShowMobileFilter(false);
//     setShowDesktopFilters(false);
//   };

//   // Handle sort selection
//   const handleSortSelect = (sortId: string) => {
//     setSelectedSort(sortId);
//     setShowDesktopSort(false);
//     setShowMobileSort(false);
//   };

//   // Handle price range change
//   const handlePriceChange = (value: number) => {
//     setPriceRange(value);
//   };

//   // Close mobile overlays on escape key
//   useEffect(() => {
//     const handleEscKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setShowMobileSidebar(false);
//         setShowMobileFilter(false);
//         setShowMobileSort(false);
//       }
//     };

//     document.addEventListener("keydown", handleEscKey);
//     return () => document.removeEventListener("keydown", handleEscKey);
//   }, []);

//   // Close desktop sort on click outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         desktopSortRef.current &&
//         !desktopSortRef.current.contains(e.target as Node)
//       ) {
//         setShowDesktopSort(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Mobile Sidebar Component
//   const MobileSidebar = () => (
//     <>
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
//           showMobileSidebar ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//         onClick={() => setShowMobileSidebar(false)}
//       />
      
//       <aside
//         className={cn(
//           "fixed top-0 left-0 w-85 max-w-sm h-full bg-white z-50 shadow-2xl transition-transform duration-300",
//           showMobileSidebar ? "translate-x-0" : "-translate-x-full"
//         )}
//       >
//         <div className="p-6 h-full overflow-y-auto">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-xl font-bold text-gray-900">Categories</h2>
//             <button
//               onClick={() => setShowMobileSidebar(false)}
//               className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
//             </button>
//           </div>
          
//           <CategorySidebar
//             categories={categories}
//             expandedCategories={expandedCategories}
//             onToggleCategory={toggleCategory}
//             priceRange={priceRange}
//             onPriceChange={handlePriceChange}
//             activeCategory={categoryParam || undefined}
//           />
          
//           <button
//             onClick={() => setShowMobileSidebar(false)}
//             className="w-full mt-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             Apply Categories
//           </button>
//         </div>
//       </aside>
//     </>
//   );

//   // Mobile Filter Panel Component
//   const MobileFilterPanel = () => (
//     <>
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
//           showMobileFilter ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//         onClick={() => setShowMobileFilter(false)}
//       />
      
//       <div
//         className={cn(
//           "fixed bottom-0 left-0 right-0 h-4/5 bg-white z-50 rounded-t-2xl shadow-2xl transition-transform duration-300",
//           showMobileFilter ? "translate-y-0" : "translate-y-full"
//         )}
//       >
//         <FilterPanel
//           filterOptions={filterOptions}
//           selectedFilters={selectedFilters}
//           onToggleFilter={toggleFilter}
//           onClearFilters={clearAllFilters}
//           onApplyFilters={() => {
//             applyFilters();
//             setShowMobileFilter(false);
//           }}
//           variant="mobile"
//         />
//       </div>
//     </>
//   );

//   // Mobile Sort Panel Component
//   const MobileSortPanel = () => (
//     <>
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
//           showMobileSort ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//         onClick={() => setShowMobileSort(false)}
//       />
      
//       <div
//         className={cn(
//           "fixed bottom-0 left-0 right-0 h-1/2 bg-white z-50 rounded-t-2xl shadow-2xl transition-transform duration-300",
//           showMobileSort ? "translate-y-0" : "translate-y-full"
//         )}
//       >
//         <div className="p-6 h-full overflow-y-auto">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-xl font-bold text-gray-900">Sort By</h2>
//             <button
//               onClick={() => setShowMobileSort(false)}
//               className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
//             </button>
//           </div>
          
//           <div className="space-y-2">
//             {sortOptions.map(option => (
//               <button
//                 key={option.id}
//                 onClick={() => handleSortSelect(option.id)}
//                 className={cn(
//                   "flex items-center w-full p-4 rounded-lg cursor-pointer transition-all duration-300",
//                   selectedSort === option.id
//                     ? "bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 text-primary-600"
//                     : "hover:bg-gray-50 border border-gray-200"
//                 )}
//               >
//                 <span className="mr-4">{option.icon}</span>
//                 <span className="flex-1 font-medium text-left">{option.label}</span>
//                 {selectedSort === option.id && (
//                   <Check className="w-5 h-5 text-primary-600" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <MobileSidebar />
//       <MobileFilterPanel />
//       <MobileSortPanel />

//       <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
//       <div className="container mx-auto px-4 py-8 relative">
//         {/* Mobile Header */}
//         <div className="lg:hidden mb-8 animate-fade-in">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-gray-900">
//               {categoryParam 
//                 ? categories.find(c => c.id === categoryParam)?.name || "Products"
//                 : "All Products"}
//             </h1>
//             <div className="text-sm text-gray-600">{sampleProducts.length} products</div>
//           </div>
          
//           <div className="flex space-x-3 mb-6">
//             <button
//               onClick={() => setShowMobileSidebar(true)}
//               className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
//             >
//               <Filter className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
//               <span className="font-medium text-gray-700 group-hover:text-gray-900">Categories</span>
//             </button>
//             <button
//               onClick={() => setShowMobileFilter(true)}
//               className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
//             >
//               <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
//               <span className="font-medium text-gray-700 group-hover:text-gray-900">Filter</span>
//             </button>
//             <button
//               onClick={() => setShowMobileSort(true)}
//               className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
//             >
//               <ChevronDown className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
//               <span className="font-medium text-gray-700 group-hover:text-gray-900">Sort</span>
//             </button>
//           </div>
//         </div>
        
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Desktop Sidebar */}
//           <aside className="hidden lg:block lg:w-1/4">
//             <CategorySidebar
//               categories={categories}
//               expandedCategories={expandedCategories}
//               onToggleCategory={toggleCategory}
//               priceRange={priceRange}
//               onPriceChange={handlePriceChange}
//               activeCategory={categoryParam || undefined}
//             />
//           </aside>
          
//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {/* Desktop Header */}
//             <div className="hidden lg:block mb-10 animate-slide-up">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {categoryParam 
//                   ? categories.find(c => c.id === categoryParam)?.name || "Laptops & Computers"
//                   : "Laptops & Computers"}
//               </h1>
//               <p className="text-gray-600">Showing {sampleProducts.length} products from 128 results</p>
//             </div>
            
//             {/* Desktop Filter/Sort Controls */}
//             <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//                 <div className="w-full md:w-auto">
//                   <button
//                     onClick={() => setShowDesktopFilters(!showDesktopFilters)}
//                     className={cn(
//                       "flex items-center justify-between w-full md:w-auto px-4 py-2.5 rounded-lg border transition-all duration-300 group",
//                       showDesktopFilters
//                         ? "bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 text-primary-600"
//                         : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300"
//                     )}
//                   >
//                     <div className="flex items-center">
//                       <Filter className="w-4 h-4 mr-2" />
//                       <span>Filter Products</span>
//                     </div>
//                     {showDesktopFilters ? (
//                       <ChevronUp className="w-4 h-4 ml-3 text-gray-500" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4 ml-3 text-gray-500" />
//                     )}
//                   </button>
//                 </div>
                
//                 <SortDropdown
//                   sortOptions={sortOptions}
//                   selectedSort={selectedSort}
//                   onSelectSort={handleSortSelect}
//                   showDesktopSort={showDesktopSort}
//                   onToggleDesktopSort={() => setShowDesktopSort(!showDesktopSort)}
//                   // desktopSortRef={desktopSortRef}
//                   desktopSortRef={desktopSortRef.current ? desktopSortRef as React.RefObject<HTMLDivElement> : undefined}
//                 />
//               </div>
              
//               {showDesktopFilters && (
//                 <div className={cn(
//                   "mt-6 pt-6 border-t border-gray-200 transition-all duration-300",
//                   showDesktopFilters ? "block animate-fade-in" : "hidden"
//                 )}>
//                   <FilterPanel
//                     filterOptions={filterOptions}
//                     selectedFilters={selectedFilters}
//                     onToggleFilter={toggleFilter}
//                     onClearFilters={clearAllFilters}
//                     onApplyFilters={applyFilters}
//                     variant="desktop"
//                   />
//                 </div>
//               )}
//             </div>
            
//             {/* Active Filters (Mobile) */}
//             <div className="lg:hidden">
//               <ActiveFilters
//                 selectedFilters={selectedFilters}
//                 priceRange={priceRange}
//                 onRemoveFilter={removeFilter}
//                 onClearPriceFilter={clearPriceFilter}
//               />
//             </div>
            
//             {/* Active Filters (Desktop) */}
//             <div className="hidden lg:block mb-8">
//               <ActiveFilters
//                 selectedFilters={selectedFilters}
//                 priceRange={priceRange}
//                 onRemoveFilter={removeFilter}
//                 onClearPriceFilter={clearPriceFilter}
//               />
//             </div>
            
//             {/* Products Grid */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {sampleProducts.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
              
//               {/* Pagination */}
//               <Pagination
//                 currentPage={1}
//                 totalPages={13}
//                 totalItems={128}
//               />
              
//               {/* Show results info */}
//               <div className="mt-8 text-center">
//                 <p className="text-gray-600">
//                   {Object.keys(selectedFilters).length > 0
//                     ? `Showing ${sampleProducts.length} products with ${Object.values(selectedFilters).flat().length} active filters`
//                     : `Showing ${sampleProducts.length} products`}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }




// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Filter, 
//   X, 
//   Check, 
//   Laptop, 
//   Smartphone, 
//   Tv, 
//   Headphones, 
//   Gamepad2, 
//   Camera,
//   Home,
//   Watch,
//   CheckSquare,
//   Square,
//   SlidersHorizontal,
//   Star,
//   DollarSign,
//   ThumbsUp,
//   Clock,
//   ShoppingCart,
//   StarIcon,
//   ChevronLeft,
//   ChevronRight,
//   MoreHorizontal
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";

// // ==================== TYPES ====================
// interface Category {
//   id: string;
//   name: string;
//   icon: React.ReactNode;
//   color: string;
//   subcategories?: Subcategory[];
//   url: string;
// }

// interface Subcategory {
//   id: string;
//   name: string;
//   url: string;
// }

// interface FilterOption {
//   id: string;
//   label: string;
//   type: 'checkbox' | 'radio' | 'range';
//   options?: string[];
//   value?: string | number;
//   min?: number;
//   max?: number;
//   step?: number;
//   paramKey: string; // Added to map filter to URL param
// }

// interface SortOption {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   paramValue: string; // Added for URL param value
// }

// interface Product {
//   id: number;
//   name: string;
//   brand: string;
//   price: number;
//   originalPrice?: number;
//   rating: number;
//   reviewCount: number;
//   description: string;
//   image: string;
//   specs: {
//     processor: string;
//     ram: string;
//     storage: string;
//     display?: string;
//   };
//   isNew?: boolean;
//   isBestSeller?: boolean;
//   inStock: boolean;
// }

// // ==================== UTILITY FUNCTIONS ====================
// const useURLParams = () => {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   const updateParams = useCallback((updates: Record<string, string | string[] | number | undefined>) => {
//     const params = new URLSearchParams(searchParams.toString());

//     Object.entries(updates).forEach(([key, value]) => {
//       // Remove existing values for this key
//       params.delete(key);

//       if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
//         params.delete(key);
//       } else if (Array.isArray(value)) {
//         // For array values, add each item separately
//         value.forEach(item => params.append(key, item.toString()));
//       } else {
//         params.set(key, value.toString());
//       }
//     });

//     // Reset to page 1 when filters/sort change
//     if (!updates.page && !updates.per_page) {
//       params.set('page', '1');
//     }

//     router.replace(`${pathname}?${params.toString()}`);
//   }, [searchParams, pathname, router]);

//   const getArrayParam = useCallback((key: string): string[] => {
//     return searchParams.getAll(key);
//   }, [searchParams]);

//   const getStringParam = useCallback((key: string, defaultValue: string = ''): string => {
//     return searchParams.get(key) || defaultValue;
//   }, [searchParams]);

//   const getNumberParam = useCallback((key: string, defaultValue: number = 0): number => {
//     const value = searchParams.get(key);
//     return value ? parseInt(value, 10) : defaultValue;
//   }, [searchParams]);

//   const removeParam = useCallback((key: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.delete(key);
//     router.replace(`${pathname}?${params.toString()}`);
//   }, [searchParams, pathname, router]);

//   const clearAllParams = useCallback(() => {
//     // Keep only category if present
//     const category = searchParams.get('category');
//     const params = new URLSearchParams();
//     if (category) {
//       params.set('category', category);
//     }
//     router.replace(`${pathname}?${params.toString()}`);
//   }, [searchParams, pathname, router]);

//   return {
//     updateParams,
//     getArrayParam,
//     getStringParam,
//     getNumberParam,
//     removeParam,
//     clearAllParams,
//     currentParams: searchParams.toString()
//   };
// };

// // ==================== COMPONENTS ====================

// // 1. Category Sidebar Component
// const CategorySidebar = ({
//   categories,
//   expandedCategories,
//   onToggleCategory,
//   priceRange,
//   onPriceChange,
//   activeCategory
// }: {
//   categories: Category[];
//   expandedCategories: string[];
//   onToggleCategory: (categoryId: string) => void;
//   priceRange: number;
//   onPriceChange: (value: number) => void;
//   activeCategory?: string;
// }) => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleCategoryClick = (category: Category, e: React.MouseEvent) => {
//     e.preventDefault();
//     const params = new URLSearchParams();
//     params.set('category', category.id);
//     params.set('page', '1'); // Reset to page 1 when category changes
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const handleSubcategoryClick = (subcategory: Subcategory, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const params = new URLSearchParams();
//     params.set('category', activeCategory || '');
//     params.set('subcategory', subcategory.id);
//     params.set('page', '1');
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32">
//       <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Categories</h2>
      
//       <ul className="space-y-1">
//         {categories.map(category => (
//           <li 
//             key={category.id} 
//             className="border-b border-gray-100 last:border-0 group/category"
//           >
//             <a
//               href={category.url}
//               onClick={(e) => handleCategoryClick(category, e)}
//               className={cn(
//                 "flex justify-between items-center w-full p-3 rounded-lg cursor-pointer transition-all duration-200",
//                 "hover:bg-primary-50",
//                 (expandedCategories.includes(category.id) || activeCategory === category.id) && "bg-primary-50",
//                 activeCategory === category.id && "border-l-4 border-primary-500 pl-2.5"
//               )}
//               onMouseEnter={() => window.innerWidth >= 768 && !expandedCategories.includes(category.id) && onToggleCategory(category.id)}
//               onMouseLeave={() => window.innerWidth >= 768 && expandedCategories.includes(category.id) && onToggleCategory(category.id)}
//             >
//               <div className="flex items-center">
//                 <span className={cn("mr-3", category.color)}>{category.icon}</span>
//                 <span className="font-medium text-left text-gray-900 hover:text-primary-600 transition-colors">
//                   {category.name}
//                 </span>
//               </div>
//               {category.subcategories && (
//                 <ChevronDown className={cn(
//                   "w-4 h-4 text-gray-500 transition-transform duration-200",
//                   expandedCategories.includes(category.id) && "rotate-180"
//                 )} />
//               )}
//             </a>
            
//             {category.subcategories && (
//               <ul className={cn(
//                 "ml-10 mt-2 space-y-1 pb-2 transition-all duration-200 overflow-hidden",
//                 "lg:hidden",
//                 expandedCategories.includes(category.id) ? "block" : "hidden",
//                 "lg:group-hover/category:block lg:group-hover/category:opacity-100",
//                 expandedCategories.includes(category.id) && "lg:block"
//               )}>
//                 {category.subcategories.map(sub => (
//                   <li key={sub.id}>
//                     <a
//                       href={sub.url}
//                       onClick={(e) => handleSubcategoryClick(sub, e)}
//                       className="w-full text-left p-2 hover:bg-primary-50 rounded cursor-pointer text-gray-600 hover:text-gray-900 transition-colors text-sm block"
//                     >
//                       {sub.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // 2. Filter Panel Component
// const FilterPanel = ({
//   filterOptions,
//   selectedFilters,
//   onToggleFilter,
//   onClearFilters,
//   onApplyFilters,
//   variant = 'desktop'
// }: {
//   filterOptions: FilterOption[];
//   selectedFilters: Record<string, string[]>;
//   onToggleFilter: (filterId: string, option: string) => void;
//   onClearFilters: () => void;
//   onApplyFilters: () => void;
//   variant?: 'desktop' | 'mobile';
// }) => {
//   return (
//     <div className={variant === 'mobile' ? "p-6" : ""}>
//       {variant === 'mobile' && (
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-xl font-bold text-gray-900">Filter Products</h2>
//           <button
//             onClick={onApplyFilters}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
//           </button>
//         </div>
//       )}

//       <div className={variant === 'mobile' ? "space-y-8" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
//         {filterOptions.slice(0, -1).map(filter => (
//           <div key={filter.id}>
//             <h4 className="font-medium text-gray-900 mb-4">{filter.label}</h4>
//             <div className={variant === 'mobile' ? "grid grid-cols-2 gap-3" : "space-y-3"}>
//               {filter.options?.map(option => {
//                 const isSelected = selectedFilters[filter.paramKey]?.includes(option);
//                 return (
//                   <label
//                     key={option}
//                     className={cn(
//                       "flex items-center cursor-pointer transition-all duration-300 group",
//                       variant === 'mobile' 
//                         ? cn(
//                             "p-3 border rounded-lg",
//                             isSelected
//                               ? "bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200"
//                               : "hover:bg-gray-50 border-gray-200 hover:border-primary-200"
//                           )
//                         : "hover:bg-gray-50 p-2 rounded-lg"
//                     )}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={isSelected}
//                       onChange={() => onToggleFilter(filter.paramKey, option)}
//                       className="sr-only"
//                     />
//                     {isSelected ? (
//                       <CheckSquare className="w-5 h-5 text-primary-600 mr-3 group-hover:text-primary-700 transition-colors" />
//                     ) : (
//                       <Square className="w-5 h-5 text-gray-400 mr-3 group-hover:text-gray-600 transition-colors" />
//                     )}
//                     <span className={cn(
//                       "text-gray-700 group-hover:text-gray-900 transition-colors",
//                       isSelected && "text-gray-900 font-medium"
//                     )}>
//                       {option}
//                     </span>
//                   </label>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {variant === 'mobile' ? (
//         <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
//           <button
//             onClick={onClearFilters}
//             className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 w-1/3 mr-2 transition-all duration-300"
//           >
//             Clear All
//           </button>
//           <button
//             onClick={onApplyFilters}
//             className="px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 w-2/3 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             Apply Filters
//           </button>
//         </div>
//       ) : (
//         <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
//           <button
//             onClick={onClearFilters}
//             className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 mr-3 transition-all duration-300"
//           >
//             Clear All
//           </button>
//           <button
//             onClick={onApplyFilters}
//             className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             Apply Filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // 3. Sort Dropdown Component
// const SortDropdown = ({
//   sortOptions,
//   selectedSort,
//   onSelectSort,
//   showDesktopSort,
//   onToggleDesktopSort,
//   desktopSortRef
// }: {
//   sortOptions: SortOption[];
//   selectedSort: string;
//   onSelectSort: (sortId: string) => void;
//   showDesktopSort?: boolean;
//   onToggleDesktopSort?: () => void;
//   desktopSortRef?: React.RefObject<HTMLDivElement>;
// }) => {
//   if (desktopSortRef) {
//     return (
//       <div className="relative" ref={desktopSortRef}>
//         <button
//           onClick={onToggleDesktopSort}
//           className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-all duration-300 hover:border-gray-300"
//         >
//           <div className="flex items-center">
//             <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500" />
//             <span>Sort by: {sortOptions.find(s => s.id === selectedSort)?.label}</span>
//           </div>
//           {showDesktopSort ? (
//             <ChevronUp className="w-4 h-4 ml-3 text-gray-500" />
//           ) : (
//             <ChevronDown className="w-4 h-4 ml-3 text-gray-500" />
//           )}
//         </button>
        
//         {showDesktopSort && (
//           <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-slide-up">
//             <ul className="py-2">
//               {sortOptions.map((option) => (
//                 <li key={option.id}>
//                   <button
//                     onClick={() => onSelectSort(option.paramValue)}
//                     className={cn(
//                       "w-full flex items-center px-4 py-2.5 hover:bg-primary-50 cursor-pointer transition-all duration-300 group",
//                       selectedSort === option.paramValue && "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600"
//                     )}
//                   >
//                     <span className="mr-3 group-hover:scale-110 transition-transform">{option.icon}</span>
//                     <span className="flex-1 text-left">{option.label}</span>
//                     {selectedSort === option.paramValue && (
//                       <Check className="w-4 h-4 ml-2 text-primary-600" />
//                     )}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <button className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 group">
//       <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
//       <span className="text-gray-700 group-hover:text-gray-900">Sort</span>
//     </button>
//   );
// };

// // 4. Product Card Component
// const ProductCard = ({ product }: { product: Product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div 
//       className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
//             <Laptop className="w-16 h-16 text-primary-500 opacity-50" />
//           </div>
//         </div>
        
//         {product.isNew && (
//           <div className="absolute top-3 left-3">
//             <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
//               New
//             </span>
//           </div>
//         )}
//         {product.isBestSeller && (
//           <div className="absolute top-3 right-3">
//             <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
//               Best Seller
//             </span>
//           </div>
//         )}
        
//         {isHovered && (
//           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
//             <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center gap-2 shadow-lg transform hover:scale-105">
//               <ShoppingCart className="w-4 h-4" />
//               <span className="text-sm font-medium">Add to Cart</span>
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <div>
//             <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
//           </div>
//         </div>
        
//         <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
//         <div className="flex items-center gap-2 mb-3">
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <StarIcon
//                 key={i}
//                 className={cn(
//                   "w-3 h-3",
//                   i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
//                 )}
//               />
//             ))}
//           </div>
//           <span className="text-xs text-gray-500">
//             {product.rating} ({product.reviewCount})
//           </span>
//         </div>

//         <div className="flex flex-wrap gap-1 mb-3">
//           <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//             {product.specs.ram}
//           </span>
//           <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//             {product.specs.storage}
//           </span>
//         </div>

//         <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//           <div className="flex items-center gap-2">
//             <span className="text-lg font-bold text-gray-900">${product.price}</span>
//             {product.originalPrice && (
//               <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//             )}
//             {product.originalPrice && (
//               <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded">
//                 -{Math.round((1 - product.price / product.originalPrice) * 100)}%
//               </span>
//             )}
//           </div>
//           <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all duration-300 hover:scale-110">
//             <ShoppingCart className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 5. Active Filters Component
// const ActiveFilters = ({
//   selectedFilters,
//   priceRange,
//   onRemoveFilter,
//   onClearPriceFilter
// }: {
//   selectedFilters: Record<string, string[]>;
//   priceRange: number;
//   onRemoveFilter: (filterId: string, option: string) => void;
//   onClearPriceFilter: () => void;
// }) => {
//   const activeFilters: string[] = [];
  
//   Object.entries(selectedFilters).forEach(([key, values]) => {
//     values.forEach(value => activeFilters.push(value));
//   });
  
//   if (priceRange < 5000) {
//     activeFilters.push(`$0-$${priceRange}`);
//   }
  
//   if (activeFilters.length === 0) return null;
  
//   return (
//     <div className="mb-6">
//       <div className="flex flex-wrap gap-2">
//         {activeFilters.map((filter) => (
//           <div
//             key={filter}
//             className="flex items-center bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-sm border border-primary-200"
//           >
//             <span className="font-medium">{filter}</span>
//             <button
//               onClick={() => {
//                 if (filter.startsWith('$0-$')) {
//                   onClearPriceFilter();
//                 } else {
//                   Object.entries(selectedFilters).forEach(([key, values]) => {
//                     if (values.includes(filter)) {
//                       onRemoveFilter(key, filter);
//                     }
//                   });
//                 }
//               }}
//               className="ml-2 text-primary-900 hover:text-primary-700 transition-colors"
//             >
//               <X className="w-3 h-3" />
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={() => {
//             Object.keys(selectedFilters).forEach(key => {
//               onRemoveFilter(key, 'clearAll');
//             });
//             onClearPriceFilter();
//           }}
//           className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
//         >
//           Clear all
//         </button>
//       </div>
//     </div>
//   );
// };

// // 6. Pagination Component with URL integration
// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination = ({
//   currentPage = 1,
//   totalPages = 10,
//   totalItems = 100,
//   onPageChange
// }: PaginationProps) => {
//   const getPageNumbers = (): (number | string)[] => {
//     const delta = 2;
//     const range: number[] = [];
//     const rangeWithDots: (number | string)[] = [];
//     let l: number | undefined;

//     for (let i = 1; i <= totalPages; i++) {
//       if (
//         i === 1 ||
//         i === totalPages ||
//         (i >= currentPage - delta && i <= currentPage + delta)
//       ) {
//         range.push(i);
//       }
//     }

//     range.forEach((i) => {
//       if (l !== undefined) {
//         if (i - l === 2) {
//           rangeWithDots.push(l + 1);
//         } else if (i - l !== 1) {
//           rangeWithDots.push('...');
//         }
//       }
//       rangeWithDots.push(i);
//       l = i;
//     });

//     return rangeWithDots;
//   };

//   const pageNumbers = getPageNumbers();
//   const itemsPerPage = Math.ceil(totalItems / totalPages);
//   const startItem = (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 mt-8 border-t border-gray-200 animate-fade-in">
//       {/* Page info - Mobile */}
//       <div className="lg:hidden text-sm text-gray-600">
//         Showing {startItem}-{endItem} of {totalItems}
//       </div>

//       {/* Pagination buttons */}
//       <div className="flex items-center space-x-2">
//         {/* Previous button */}
//         <button
//           onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//           disabled={currentPage === 1}
//           className={cn(
//             "flex items-center justify-center p-2 rounded-lg border transition-all duration-300",
//             currentPage === 1
//               ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
//               : "border-gray-300 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
//           )}
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>

//         {/* Page numbers */}
//         <div className="flex items-center space-x-1">
//           {pageNumbers.map((pageNum, index) => (
//             pageNum === '...' ? (
//               <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
//                 <MoreHorizontal className="w-4 h-4" />
//               </span>
//             ) : (
//               <button
//                 key={pageNum}
//                 onClick={() => onPageChange(pageNum as number)}
//                 className={cn(
//                   "min-w-[2.5rem] h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-all duration-300",
//                   currentPage === pageNum
//                     ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-600 shadow-sm"
//                     : "border-gray-300 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
//                 )}
//               >
//                 {pageNum}
//               </button>
//             )
//           ))}
//         </div>

//         {/* Next button */}
//         <button
//           onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//           disabled={currentPage === totalPages}
//           className={cn(
//             "flex items-center justify-center p-2 rounded-lg border transition-all duration-300",
//             currentPage === totalPages
//               ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
//               : "border-gray-300 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
//           )}
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Page info - Desktop */}
//       <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
//         <span>Showing</span>
//         <span className="font-medium text-gray-900">{startItem}-{endItem}</span>
//         <span>of</span>
//         <span className="font-medium text-gray-900">{totalItems}</span>
//         <span>results</span>
//       </div>
//     </div>
//   );
// };

// // ==================== MAIN PRODUCTS PAGE ====================
// export default function ProductsPage() {
//   const searchParams = useSearchParams();
//   const categoryParam = searchParams.get('category');
  
//   // Use custom hook for URL params management
//   const {
//     updateParams,
//     getArrayParam,
//     getStringParam,
//     getNumberParam,
//     removeParam,
//     clearAllParams,
//   } = useURLParams();

//   // Categories data with URLs
//   const categories: Category[] = [
//     {
//       id: "computers",
//       name: "Computers & Laptops",
//       icon: <Laptop className="w-5 h-5" />,
//       color: "text-blue-500",
//       url: "/products?category=computers",
//       subcategories: [
//         { id: "gaming", name: "Gaming Laptops", url: "/products?category=computers&subcategory=gaming" },
//         { id: "ultrabooks", name: "Ultrabooks", url: "/products?category=computers&subcategory=ultrabooks" },
//         { id: "business", name: "Business Laptops", url: "/products?category=computers&subcategory=business" },
//         { id: "all-in-one", name: "All-in-One PCs", url: "/products?category=computers&subcategory=all-in-one" },
//       ],
//     },
//     {
//       id: "smartphones",
//       name: "Smartphones & Tablets",
//       icon: <Smartphone className="w-5 h-5" />,
//       color: "text-green-500",
//       url: "/products?category=smartphones",
//       subcategories: [
//         { id: "android", name: "Android Phones", url: "/products?category=smartphones&subcategory=android" },
//         { id: "iphone", name: "iPhones", url: "/products?category=smartphones&subcategory=iphone" },
//         { id: "tablets", name: "Tablets", url: "/products?category=smartphones&subcategory=tablets" },
//         { id: "accessories", name: "Accessories", url: "/products?category=smartphones&subcategory=accessories" },
//       ],
//     },
//     {
//       id: "tv",
//       name: "TV & Home Theater",
//       icon: <Tv className="w-5 h-5" />,
//       color: "text-purple-500",
//       url: "/products?category=tv",
//       subcategories: [
//         { id: "4k-tv", name: "4K TVs", url: "/products?category=tv&subcategory=4k-tv" },
//         { id: "smart-tv", name: "Smart TVs", url: "/products?category=tv&subcategory=smart-tv" },
//         { id: "soundbars", name: "Soundbars", url: "/products?category=tv&subcategory=soundbars" },
//         { id: "home-theater", name: "Home Theater Systems", url: "/products?category=tv&subcategory=home-theater" },
//       ],
//     },
//     {
//       id: "audio",
//       name: "Audio & Headphones",
//       icon: <Headphones className="w-5 h-5" />,
//       color: "text-amber-500",
//       url: "/products?category=audio",
//     },
//     {
//       id: "gaming",
//       name: "Gaming",
//       icon: <Gamepad2 className="w-5 h-5" />,
//       color: "text-red-500",
//       url: "/products?category=gaming",
//     },
//     {
//       id: "cameras",
//       name: "Cameras & Drones",
//       icon: <Camera className="w-5 h-5" />,
//       color: "text-indigo-500",
//       url: "/products?category=cameras",
//     },
//     {
//       id: "wearable",
//       name: "Wearable Tech",
//       icon: <Watch className="w-5 h-5" />,
//       color: "text-teal-500",
//       url: "/products?category=wearable",
//     },
//     {
//       id: "smart-home",
//       name: "Smart Home",
//       icon: <Home className="w-5 h-5" />,
//       color: "text-orange-500",
//       url: "/products?category=smart-home",
//     },
//   ];

//   // Filter options with URL param mappings
//   const filterOptions: FilterOption[] = [
//     {
//       id: "brand",
//       label: "Brand",
//       type: "checkbox",
//       options: ["Apple", "Dell", "HP", "Lenovo", "Asus"],
//       paramKey: "brand",
//     },
//     {
//       id: "ram",
//       label: "RAM",
//       type: "checkbox",
//       options: ["8 GB", "16 GB", "32 GB", "64 GB"],
//       paramKey: "ram",
//     },
//     {
//       id: "storage",
//       label: "Storage",
//       type: "checkbox",
//       options: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
//       paramKey: "storage",
//     },
//     {
//       id: "price",
//       label: "Price Range",
//       type: "range",
//       min: 0,
//       max: 5000,
//       step: 100,
//       value: 2500,
//       paramKey: "max_price",
//     },
//   ];

//   // Sort options with URL param values
//   const sortOptions: SortOption[] = [
//     { id: "recommended", label: "Recommended", icon: <Star className="w-4 h-4" />, paramValue: "relevance+desc" },
//     { id: "price-low", label: "Price: Low to High", icon: <DollarSign className="w-4 h-4" />, paramValue: "price+asc" },
//     { id: "price-high", label: "Price: High to Low", icon: <DollarSign className="w-4 h-4" />, paramValue: "price+desc" },
//     { id: "rating", label: "Customer Rating", icon: <ThumbsUp className="w-4 h-4" />, paramValue: "rating+desc" },
//     { id: "newest", label: "Newest Arrivals", icon: <Clock className="w-4 h-4" />, paramValue: "date+desc" },
//   ];

//   // Sample products
//   const sampleProducts: Product[] = [
//     {
//       id: 1,
//       name: "MacBook Pro 16-inch",
//       brand: "Apple",
//       price: 2399,
//       originalPrice: 2599,
//       rating: 4.8,
//       reviewCount: 342,
//       description: "Apple M3 Pro chip, 16-core GPU, 18-core CPU, 16GB RAM, 512GB SSD",
//       image: "",
//       specs: { processor: "M3 Pro", ram: "16GB", storage: "512GB SSD" },
//       isNew: true,
//       isBestSeller: true,
//       inStock: true
//     },
//     {
//       id: 2,
//       name: "Dell XPS 15",
//       brand: "Dell",
//       price: 1899,
//       rating: 4.6,
//       reviewCount: 287,
//       description: "15.6-inch OLED display, Intel Core i9, 32GB RAM, 1TB SSD, RTX 4060",
//       image: "",
//       specs: { processor: "Intel Core i9", ram: "32GB", storage: "1TB SSD", display: "15.6-inch OLED" },
//       isBestSeller: true,
//       inStock: true
//     },
//     {
//       id: 3,
//       name: "Lenovo ThinkPad X1 Carbon",
//       brand: "Lenovo",
//       price: 1499,
//       originalPrice: 1699,
//       rating: 4.7,
//       reviewCount: 156,
//       description: "14-inch business laptop, Intel Core i7, 16GB RAM, 512GB SSD",
//       image: "",
//       specs: { processor: "Intel Core i7", ram: "16GB", storage: "512GB SSD" },
//       isNew: true,
//       inStock: true
//     },
//     {
//       id: 4,
//       name: "ASUS ROG Zephyrus G14",
//       brand: "ASUS",
//       price: 1599,
//       rating: 4.5,
//       reviewCount: 423,
//       description: "Gaming laptop, AMD Ryzen 9, 16GB RAM, 1TB SSD, RTX 4070",
//       image: "",
//       specs: { processor: "AMD Ryzen 9", ram: "16GB", storage: "1TB SSD" },
//       inStock: true
//     },
//     {
//       id: 5,
//       name: "HP Spectre x360",
//       brand: "HP",
//       price: 1299,
//       rating: 4.4,
//       reviewCount: 198,
//       description: "Convertible laptop, Intel Core i7, 16GB RAM, 512GB SSD, 13.5-inch touch",
//       image: "",
//       specs: { processor: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "13.5-inch touch" },
//       inStock: true
//     },
//     {
//       id: 6,
//       name: "Microsoft Surface Laptop 5",
//       brand: "Microsoft",
//       price: 999,
//       originalPrice: 1199,
//       rating: 4.3,
//       reviewCount: 231,
//       description: "13.5-inch touchscreen, Intel Core i5, 8GB RAM, 256GB SSD",
//       image: "",
//       specs: { processor: "Intel Core i5", ram: "8GB", storage: "256GB SSD", display: "13.5-inch touch" },
//       inStock: true
//     },
//   ];

//   // Get current state from URL params
//   const selectedFilters = {
//     brand: getArrayParam('brand'),
//     ram: getArrayParam('ram'),
//     storage: getArrayParam('storage'),
//   };

//   const priceRange = getNumberParam('max_price', 2500);
//   const selectedSort = getStringParam('sort', 'relevance+desc');
//   const currentPage = getNumberParam('page', 1);
//   const perPage = getNumberParam('per_page', 20);

//   // State management for UI
//   const [expandedCategories, setExpandedCategories] = useState<string[]>(
//     categoryParam ? [categoryParam] : []
//   );
//   const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
//   const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
//   const [showMobileSort, setShowMobileSort] = useState<boolean>(false);
//   const [showDesktopFilters, setShowDesktopFilters] = useState<boolean>(false);
//   const [showDesktopSort, setShowDesktopSort] = useState<boolean>(false);

//   // Refs for click outside detection
//   const desktopSortRef = useRef<HTMLDivElement>(null);

//   // Expand category based on URL parameter on mount
//   useEffect(() => {
//     if (categoryParam) {
//       setExpandedCategories([categoryParam]);
//     }
//   }, [categoryParam]);

//   // Toggle category expansion
//   const toggleCategory = (categoryId: string) => {
//     setExpandedCategories(prev =>
//       prev.includes(categoryId)
//         ? prev.filter(id => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   // Toggle filter selection with URL update
//   const toggleFilter = (filterKey: string, option: string) => {
//     const current = selectedFilters[filterKey as keyof typeof selectedFilters] || [];
//     const updated = current.includes(option)
//       ? current.filter(item => item !== option)
//       : [...current, option];
    
//     updateParams({ [filterKey]: updated });
//   };

//   // Remove specific filter
//   const removeFilter = (filterKey: string, option: string) => {
//     if (option === 'clearAll') {
//       removeParam(filterKey);
//     } else {
//       const current = selectedFilters[filterKey as keyof typeof selectedFilters] || [];
//       const updated = current.filter(item => item !== option);
//       updateParams({ [filterKey]: updated });
//     }
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     clearAllParams();
//   };

//   // Clear price filter
//   const clearPriceFilter = () => {
//     removeParam('max_price');
//   };

//   // Apply filters
//   const applyFilters = () => {
//     setShowMobileFilter(false);
//     setShowDesktopFilters(false);
//   };

//   // Handle sort selection with URL update
//   const handleSortSelect = (sortParam: string) => {
//     updateParams({ sort: sortParam });
//     setShowDesktopSort(false);
//     setShowMobileSort(false);
//   };

//   // Handle price range change with URL update
//   const handlePriceChange = (value: number) => {
//     updateParams({ max_price: value.toString() });
//   };

//   // Handle page change with URL update
//   const handlePageChange = (page: number) => {
//     updateParams({ page: page.toString() });
//   };

//   // Close mobile overlays on escape key
//   useEffect(() => {
//     const handleEscKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setShowMobileSidebar(false);
//         setShowMobileFilter(false);
//         setShowMobileSort(false);
//       }
//     };

//     document.addEventListener("keydown", handleEscKey);
//     return () => document.removeEventListener("keydown", handleEscKey);
//   }, []);

//   // Close desktop sort on click outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         desktopSortRef.current &&
//         !desktopSortRef.current.contains(e.target as Node)
//       ) {
//         setShowDesktopSort(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Get current sort option label for display
//   const getCurrentSortLabel = () => {
//     const option = sortOptions.find(s => s.paramValue === selectedSort);
//     return option ? option.label : 'Recommended';
//   };

//   // Mobile Sidebar Component
//   const MobileSidebar = () => (
//     <>
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
//           showMobileSidebar ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//         onClick={() => setShowMobileSidebar(false)}
//       />
      
//       <aside
//         className={cn(
//           "fixed top-0 left-0 w-85 max-w-sm h-full bg-white z-50 shadow-2xl transition-transform duration-300",
//           showMobileSidebar ? "translate-x-0" : "-translate-x-full"
//         )}
//       >
//         <div className="p-6 h-full overflow-y-auto">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-xl font-bold text-gray-900">Categories</h2>
//             <button
//               onClick={() => setShowMobileSidebar(false)}
//               className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
//             </button>
//           </div>
          
//           <CategorySidebar
//             categories={categories}
//             expandedCategories={expandedCategories}
//             onToggleCategory={toggleCategory}
//             priceRange={priceRange}
//             onPriceChange={handlePriceChange}
//             activeCategory={categoryParam || undefined}
//           />
          
//           <button
//             onClick={() => setShowMobileSidebar(false)}
//             className="w-full mt-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             Apply Categories
//           </button>
//         </div>
//       </aside>
//     </>
//   );

//   // Mobile Filter Panel Component
//   const MobileFilterPanel = () => (
//     <>
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
//           showMobileFilter ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//         onClick={() => setShowMobileFilter(false)}
//       />
      
//       <div
//         className={cn(
//           "fixed bottom-0 left-0 right-0 h-4/5 bg-white z-50 rounded-t-2xl shadow-2xl transition-transform duration-300",
//           showMobileFilter ? "translate-y-0" : "translate-y-full"
//         )}
//       >
//         <FilterPanel
//           filterOptions={filterOptions}
//           selectedFilters={selectedFilters}
//           onToggleFilter={toggleFilter}
//           onClearFilters={clearAllFilters}
//           onApplyFilters={() => {
//             applyFilters();
//             setShowMobileFilter(false);
//           }}
//           variant="mobile"
//         />
//       </div>
//     </>
//   );

//   // Mobile Sort Panel Component
//   const MobileSortPanel = () => (
//     <>
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
//           showMobileSort ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//         onClick={() => setShowMobileSort(false)}
//       />
      
//       <div
//         className={cn(
//           "fixed bottom-0 left-0 right-0 h-1/2 bg-white z-50 rounded-t-2xl shadow-2xl transition-transform duration-300",
//           showMobileSort ? "translate-y-0" : "translate-y-full"
//         )}
//       >
//         <div className="p-6 h-full overflow-y-auto">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-xl font-bold text-gray-900">Sort By</h2>
//             <button
//               onClick={() => setShowMobileSort(false)}
//               className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
//             </button>
//           </div>
          
//           <div className="space-y-2">
//             {sortOptions.map(option => (
//               <button
//                 key={option.id}
//                 onClick={() => handleSortSelect(option.paramValue)}
//                 className={cn(
//                   "flex items-center w-full p-4 rounded-lg cursor-pointer transition-all duration-300",
//                   selectedSort === option.paramValue
//                     ? "bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 text-primary-600"
//                     : "hover:bg-gray-50 border border-gray-200"
//                 )}
//               >
//                 <span className="mr-4">{option.icon}</span>
//                 <span className="flex-1 font-medium text-left">{option.label}</span>
//                 {selectedSort === option.paramValue && (
//                   <Check className="w-5 h-5 text-primary-600" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <MobileSidebar />
//       <MobileFilterPanel />
//       <MobileSortPanel />

//       <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
//       <div className="container mx-auto px-4 py-8 relative">
//         {/* Mobile Header */}
//         <div className="lg:hidden mb-8 animate-fade-in">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-gray-900">
//               {categoryParam 
//                 ? categories.find(c => c.id === categoryParam)?.name || "Products"
//                 : "All Products"}
//             </h1>
//             <div className="text-sm text-gray-600">{sampleProducts.length} products</div>
//           </div>
          
//           <div className="flex space-x-3 mb-6">
//             <button
//               onClick={() => setShowMobileSidebar(true)}
//               className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
//             >
//               <Filter className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
//               <span className="font-medium text-gray-700 group-hover:text-gray-900">Categories</span>
//             </button>
//             <button
//               onClick={() => setShowMobileFilter(true)}
//               className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
//             >
//               <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
//               <span className="font-medium text-gray-700 group-hover:text-gray-900">Filter</span>
//             </button>
//             <button
//               onClick={() => setShowMobileSort(true)}
//               className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
//             >
//               <ChevronDown className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
//               <span className="font-medium text-gray-700 group-hover:text-gray-900">Sort</span>
//             </button>
//           </div>
//         </div>
        
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Desktop Sidebar */}
//           <aside className="hidden lg:block lg:w-1/4">
//             <CategorySidebar
//               categories={categories}
//               expandedCategories={expandedCategories}
//               onToggleCategory={toggleCategory}
//               priceRange={priceRange}
//               onPriceChange={handlePriceChange}
//               activeCategory={categoryParam || undefined}
//             />
//           </aside>
          
//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {/* Desktop Header */}
//             <div className="hidden lg:block mb-10 animate-slide-up">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {categoryParam 
//                   ? categories.find(c => c.id === categoryParam)?.name || "Laptops & Computers"
//                   : "Laptops & Computers"}
//               </h1>
//               <p className="text-gray-600">Showing {sampleProducts.length} products from 128 results</p>
//             </div>
            
//             {/* Desktop Filter/Sort Controls */}
//             <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//                 <div className="w-full md:w-auto">
//                   <button
//                     onClick={() => setShowDesktopFilters(!showDesktopFilters)}
//                     className={cn(
//                       "flex items-center justify-between w-full md:w-auto px-4 py-2.5 rounded-lg border transition-all duration-300 group",
//                       showDesktopFilters
//                         ? "bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 text-primary-600"
//                         : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300"
//                     )}
//                   >
//                     <div className="flex items-center">
//                       <Filter className="w-4 h-4 mr-2" />
//                       <span>Filter Products</span>
//                     </div>
//                     {showDesktopFilters ? (
//                       <ChevronUp className="w-4 h-4 ml-3 text-gray-500" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4 ml-3 text-gray-500" />
//                     )}
//                   </button>
//                 </div>
                
//                 <SortDropdown
//                   sortOptions={sortOptions}
//                   selectedSort={selectedSort}
//                   onSelectSort={handleSortSelect}
//                   showDesktopSort={showDesktopSort}
//                   onToggleDesktopSort={() => setShowDesktopSort(!showDesktopSort)}
//                   // desktopSortRef={desktopSortRef}
//                   desktopSortRef={desktopSortRef.current ? desktopSortRef as React.RefObject<HTMLDivElement> : undefined}
//                 />
//               </div>
              
//               {showDesktopFilters && (
//                 <div className={cn(
//                   "mt-6 pt-6 border-t border-gray-200 transition-all duration-300",
//                   showDesktopFilters ? "block animate-fade-in" : "hidden"
//                 )}>
//                   <FilterPanel
//                     filterOptions={filterOptions}
//                     selectedFilters={selectedFilters}
//                     onToggleFilter={toggleFilter}
//                     onClearFilters={clearAllFilters}
//                     onApplyFilters={applyFilters}
//                     variant="desktop"
//                   />
//                 </div>
//               )}
//             </div>
            
//             {/* Active Filters (Mobile) */}
//             <div className="lg:hidden">
//               <ActiveFilters
//                 selectedFilters={selectedFilters}
//                 priceRange={priceRange}
//                 onRemoveFilter={removeFilter}
//                 onClearPriceFilter={clearPriceFilter}
//               />
//             </div>
            
//             {/* Active Filters (Desktop) */}
//             <div className="hidden lg:block mb-8">
//               <ActiveFilters
//                 selectedFilters={selectedFilters}
//                 priceRange={priceRange}
//                 onRemoveFilter={removeFilter}
//                 onClearPriceFilter={clearPriceFilter}
//               />
//             </div>
            
//             {/* Products Grid */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {sampleProducts.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
              
//               {/* Pagination */}
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={13}
//                 totalItems={128}
//                 onPageChange={handlePageChange}
//               />
              
//               {/* Show results info */}
//               <div className="mt-8 text-center">
//                 <p className="text-gray-600">
//                   {Object.keys(selectedFilters).length > 0
//                     ? `Showing ${sampleProducts.length} products with ${Object.values(selectedFilters).flat().length} active filters`
//                     : `Showing ${sampleProducts.length} products`}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Current URL params: {searchParams.toString() || 'none'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  X, 
  Check, 
  Laptop, 
  Smartphone, 
  Tv, 
  Headphones, 
  Gamepad2, 
  Camera,
  Home,
  Watch,
  CheckSquare,
  Square,
  SlidersHorizontal,
  Star,
  DollarSign,
  ThumbsUp,
  Clock,
  ShoppingCart,
  StarIcon,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// ==================== TYPES ====================
interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  subcategories?: Subcategory[];
  url: string;
}

interface Subcategory {
  id: string;
  name: string;
  url: string;
}

interface FilterOption {
  id: string;
  label: string;
  type: 'checkbox' | 'radio' | 'range';
  options?: string[];
  value?: string | number;
  min?: number;
  max?: number;
  step?: number;
  paramKey: string;
}

interface SortOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  paramValue: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display?: string;
  };
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
}

// ==================== UTILITY FUNCTIONS ====================
const useURLParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateParams = useCallback((updates: Record<string, string | string[] | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      params.delete(key);

      if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        value.forEach(item => params.append(key, item.toString()));
      } else {
        params.set(key, value.toString());
      }
    });

    if (!updates.page && !updates.per_page) {
      params.set('page', '1');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const getArrayParam = useCallback((key: string): string[] => {
    return searchParams.getAll(key);
  }, [searchParams]);

  const getStringParam = useCallback((key: string, defaultValue: string = ''): string => {
    return searchParams.get(key) || defaultValue;
  }, [searchParams]);

  const getNumberParam = useCallback((key: string, defaultValue: number = 0): number => {
    const value = searchParams.get(key);
    return value ? parseInt(value, 10) : defaultValue;
  }, [searchParams]);

  const removeParam = useCallback((key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const clearAllParams = useCallback(() => {
    const category = searchParams.get('category');
    const params = new URLSearchParams();
    if (category) {
      params.set('category', category);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  return {
    updateParams,
    getArrayParam,
    getStringParam,
    getNumberParam,
    removeParam,
    clearAllParams,
    currentParams: searchParams.toString()
  };
};

// ==================== COMPONENTS ====================

// 1. Category Sidebar Component
const CategorySidebar = ({
  categories,
  expandedCategories,
  onToggleCategory,
  priceRange,
  onPriceChange,
  activeCategory
}: {
  categories: Category[];
  expandedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  priceRange: number;
  onPriceChange: (value: number) => void;
  activeCategory?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: Category, e: React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('category', category.id);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSubcategoryClick = (subcategory: Subcategory, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const params = new URLSearchParams();
    params.set('category', activeCategory || '');
    params.set('subcategory', subcategory.id);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32">
      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Categories</h2>
      
      <ul className="space-y-1">
        {categories.map(category => (
          <li 
            key={category.id} 
            className="border-b border-gray-100 last:border-0 group/category"
          >
            <a
              href={category.url}
              onClick={(e) => handleCategoryClick(category, e)}
              className={cn(
                "flex justify-between items-center w-full p-3 rounded-lg cursor-pointer transition-all duration-200",
                "hover:bg-primary-50",
                (expandedCategories.includes(category.id) || activeCategory === category.id) && "bg-primary-50",
                activeCategory === category.id && "border-l-4 border-primary-500 pl-2.5"
              )}
              onMouseEnter={() => window.innerWidth >= 768 && !expandedCategories.includes(category.id) && onToggleCategory(category.id)}
              onMouseLeave={() => window.innerWidth >= 768 && expandedCategories.includes(category.id) && onToggleCategory(category.id)}
            >
              <div className="flex items-center">
                <span className={cn("mr-3", category.color)}>{category.icon}</span>
                <span className="font-medium text-left text-gray-900 hover:text-primary-600 transition-colors">
                  {category.name}
                </span>
              </div>
              {category.subcategories && (
                <ChevronDown className={cn(
                  "w-4 h-4 text-gray-500 transition-transform duration-200",
                  expandedCategories.includes(category.id) && "rotate-180"
                )} />
              )}
            </a>
            
            {category.subcategories && (
              <ul className={cn(
                "ml-10 mt-2 space-y-1 pb-2 transition-all duration-200 overflow-hidden",
                "lg:hidden",
                expandedCategories.includes(category.id) ? "block" : "hidden",
                "lg:group-hover/category:block lg:group-hover/category:opacity-100",
                expandedCategories.includes(category.id) && "lg:block"
              )}>
                {category.subcategories.map(sub => (
                  <li key={sub.id}>
                    <a
                      href={sub.url}
                      onClick={(e) => handleSubcategoryClick(sub, e)}
                      className="w-full text-left p-2 hover:bg-primary-50 rounded cursor-pointer text-gray-600 hover:text-gray-900 transition-colors text-sm block"
                    >
                      {sub.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 2. Filter Panel Component
const FilterPanel = ({
  filterOptions,
  selectedFilters,
  onToggleFilter,
  onClearFilters,
  onApplyFilters,
  variant = 'desktop'
}: {
  filterOptions: FilterOption[];
  selectedFilters: Record<string, string[]>;
  onToggleFilter: (filterId: string, option: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  variant?: 'desktop' | 'mobile';
}) => {
  return (
    <div className={variant === 'mobile' ? "p-6" : ""}>
      {variant === 'mobile' && (
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-900">Filter Products</h2>
          <button
            onClick={onApplyFilters}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </button>
        </div>
      )}

      <div className={variant === 'mobile' ? "space-y-8" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
        {filterOptions.slice(0, -1).map(filter => (
          <div key={filter.id}>
            <h4 className="font-medium text-gray-900 mb-4">{filter.label}</h4>
            <div className={variant === 'mobile' ? "grid grid-cols-2 gap-3" : "space-y-3"}>
              {filter.options?.map(option => {
                const isSelected = selectedFilters[filter.paramKey]?.includes(option);
                return (
                  <label
                    key={option}
                    className={cn(
                      "flex items-center cursor-pointer transition-all duration-300 group",
                      variant === 'mobile' 
                        ? cn(
                            "p-3 border rounded-lg",
                            isSelected
                              ? "bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200"
                              : "hover:bg-gray-50 border-gray-200 hover:border-primary-200"
                          )
                        : "hover:bg-gray-50 p-2 rounded-lg"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleFilter(filter.paramKey, option)}
                      className="sr-only"
                    />
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-primary-600 mr-3 group-hover:text-primary-700 transition-colors" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 mr-3 group-hover:text-gray-600 transition-colors" />
                    )}
                    <span className={cn(
                      "text-gray-700 group-hover:text-gray-900 transition-colors",
                      isSelected && "text-gray-900 font-medium"
                    )}>
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {variant === 'mobile' ? (
        <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
          <button
            onClick={onClearFilters}
            className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 w-1/3 mr-2 transition-all duration-300"
          >
            Clear All
          </button>
          <button
            onClick={onApplyFilters}
            className="px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 w-2/3 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Apply Filters
          </button>
        </div>
      ) : (
        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClearFilters}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 mr-3 transition-all duration-300"
          >
            Clear All
          </button>
          <button
            onClick={onApplyFilters}
            className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

// 3. Sort Dropdown Component - FIXED VERSION
const SortDropdown = React.forwardRef<HTMLDivElement, {
  sortOptions: SortOption[];
  selectedSort: string;
  onSelectSort: (sortId: string) => void;
  showDesktopSort?: boolean;
  onToggleDesktopSort?: () => void;
}>(({
  sortOptions,
  selectedSort,
  onSelectSort,
  showDesktopSort,
  onToggleDesktopSort,
}, ref) => {
  // Desktop version with dropdown
  if (onToggleDesktopSort) {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={onToggleDesktopSort}
          className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-all duration-300 hover:border-gray-300 min-w-[180px]"
        >
          <div className="flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500" />
            <span className="font-medium">Sort by: {sortOptions.find(s => s.paramValue === selectedSort)?.label}</span>
          </div>
          {showDesktopSort ? (
            <ChevronUp className="w-4 h-4 ml-3 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-3 text-gray-500" />
          )}
        </button>
        
        {showDesktopSort && (
          <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-slide-up">
            <ul className="py-2">
              {sortOptions.map((option) => (
                <li key={option.id}>
                  <button
                    onClick={() => onSelectSort(option.paramValue)}
                    className={cn(
                      "w-full flex items-center px-4 py-2.5 hover:bg-primary-50 cursor-pointer transition-all duration-300 group",
                      selectedSort === option.paramValue && "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600"
                    )}
                  >
                    <span className="mr-3 group-hover:scale-110 transition-transform">{option.icon}</span>
                    <span className="flex-1 text-left">{option.label}</span>
                    {selectedSort === option.paramValue && (
                      <Check className="w-4 h-4 ml-2 text-primary-600" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Mobile version (just a button)
  return (
    <button className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 group">
      <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
      <span className="text-gray-700 group-hover:text-gray-900">Sort</span>
    </button>
  );
});

SortDropdown.displayName = "SortDropdown";

// 4. Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
            <Laptop className="w-16 h-16 text-primary-500 opacity-50" />
          </div>
        </div>
        
        {product.isNew && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
              New
            </span>
          </div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
              Best Seller
            </span>
          </div>
        )}
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center gap-2 shadow-lg transform hover:scale-105">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">Add to Cart</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.specs.ram}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.specs.storage}
          </span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
          <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all duration-300 hover:scale-110">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. Active Filters Component
const ActiveFilters = ({
  selectedFilters,
  priceRange,
  onRemoveFilter,
  onClearPriceFilter
}: {
  selectedFilters: Record<string, string[]>;
  priceRange: number;
  onRemoveFilter: (filterId: string, option: string) => void;
  onClearPriceFilter: () => void;
}) => {
  const activeFilters: string[] = [];
  
  Object.entries(selectedFilters).forEach(([key, values]) => {
    values.forEach(value => activeFilters.push(value));
  });
  
  if (priceRange < 5000) {
    activeFilters.push(`$0-$${priceRange}`);
  }
  
  if (activeFilters.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-sm border border-primary-200"
          >
            <span className="font-medium">{filter}</span>
            <button
              onClick={() => {
                if (filter.startsWith('$0-$')) {
                  onClearPriceFilter();
                } else {
                  Object.entries(selectedFilters).forEach(([key, values]) => {
                    if (values.includes(filter)) {
                      onRemoveFilter(key, filter);
                    }
                  });
                }
              }}
              className="ml-2 text-primary-900 hover:text-primary-700 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            Object.keys(selectedFilters).forEach(key => {
              onRemoveFilter(key, 'clearAll');
            });
            onClearPriceFilter();
          }}
          className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

// 6. Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  totalItems = 100,
  onPageChange
}: PaginationProps) => {
  const getPageNumbers = (): (number | string)[] => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();
  const itemsPerPage = Math.ceil(totalItems / totalPages);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 mt-8 border-t border-gray-200 animate-fade-in">
      <div className="lg:hidden text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalItems}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={cn(
            "flex items-center justify-center p-2 rounded-lg border transition-all duration-300",
            currentPage === 1
              ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
              : "border-gray-300 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-1">
          {pageNumbers.map((pageNum, index) => (
            pageNum === '...' ? (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum as number)}
                className={cn(
                  "min-w-[2.5rem] h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-all duration-300",
                  currentPage === pageNum
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-600 shadow-sm"
                    : "border-gray-300 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
                )}
              >
                {pageNum}
              </button>
            )
          ))}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={cn(
            "flex items-center justify-center p-2 rounded-lg border transition-all duration-300",
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
              : "border-gray-300 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
        <span>Showing</span>
        <span className="font-medium text-gray-900">{startItem}-{endItem}</span>
        <span>of</span>
        <span className="font-medium text-gray-900">{totalItems}</span>
        <span>results</span>
      </div>
    </div>
  );
};

// ==================== MAIN PRODUCTS PAGE ====================
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const {
    updateParams,
    getArrayParam,
    getStringParam,
    getNumberParam,
    removeParam,
    clearAllParams,
  } = useURLParams();

  // Categories data
  const categories: Category[] = [
    {
      id: "computers",
      name: "Computers & Laptops",
      icon: <Laptop className="w-5 h-5" />,
      color: "text-blue-500",
      url: "/products?category=computers",
      subcategories: [
        { id: "gaming", name: "Gaming Laptops", url: "/products?category=computers&subcategory=gaming" },
        { id: "ultrabooks", name: "Ultrabooks", url: "/products?category=computers&subcategory=ultrabooks" },
        { id: "business", name: "Business Laptops", url: "/products?category=computers&subcategory=business" },
        { id: "all-in-one", name: "All-in-One PCs", url: "/products?category=computers&subcategory=all-in-one" },
      ],
    },
    {
      id: "smartphones",
      name: "Smartphones & Tablets",
      icon: <Smartphone className="w-5 h-5" />,
      color: "text-green-500",
      url: "/products?category=smartphones",
      subcategories: [
        { id: "android", name: "Android Phones", url: "/products?category=smartphones&subcategory=android" },
        { id: "iphone", name: "iPhones", url: "/products?category=smartphones&subcategory=iphone" },
        { id: "tablets", name: "Tablets", url: "/products?category=smartphones&subcategory=tablets" },
        { id: "accessories", name: "Accessories", url: "/products?category=smartphones&subcategory=accessories" },
      ],
    },
    {
      id: "tv",
      name: "TV & Home Theater",
      icon: <Tv className="w-5 h-5" />,
      color: "text-purple-500",
      url: "/products?category=tv",
      subcategories: [
        { id: "4k-tv", name: "4K TVs", url: "/products?category=tv&subcategory=4k-tv" },
        { id: "smart-tv", name: "Smart TVs", url: "/products?category=tv&subcategory=smart-tv" },
        { id: "soundbars", name: "Soundbars", url: "/products?category=tv&subcategory=soundbars" },
        { id: "home-theater", name: "Home Theater Systems", url: "/products?category=tv&subcategory=home-theater" },
      ],
    },
    {
      id: "audio",
      name: "Audio & Headphones",
      icon: <Headphones className="w-5 h-5" />,
      color: "text-amber-500",
      url: "/products?category=audio",
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: <Gamepad2 className="w-5 h-5" />,
      color: "text-red-500",
      url: "/products?category=gaming",
    },
    {
      id: "cameras",
      name: "Cameras & Drones",
      icon: <Camera className="w-5 h-5" />,
      color: "text-indigo-500",
      url: "/products?category=cameras",
    },
    {
      id: "wearable",
      name: "Wearable Tech",
      icon: <Watch className="w-5 h-5" />,
      color: "text-teal-500",
      url: "/products?category=wearable",
    },
    {
      id: "smart-home",
      name: "Smart Home",
      icon: <Home className="w-5 h-5" />,
      color: "text-orange-500",
      url: "/products?category=smart-home",
    },
  ];

  // Filter options
  const filterOptions: FilterOption[] = [
    {
      id: "brand",
      label: "Brand",
      type: "checkbox",
      options: ["Apple", "Dell", "HP", "Lenovo", "Asus"],
      paramKey: "brand",
    },
    {
      id: "ram",
      label: "RAM",
      type: "checkbox",
      options: ["8 GB", "16 GB", "32 GB", "64 GB"],
      paramKey: "ram",
    },
    {
      id: "storage",
      label: "Storage",
      type: "checkbox",
      options: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
      paramKey: "storage",
    },
    {
      id: "price",
      label: "Price Range",
      type: "range",
      min: 0,
      max: 5000,
      step: 100,
      value: 2500,
      paramKey: "max_price",
    },
  ];

  // Sort options
  const sortOptions: SortOption[] = [
    { id: "recommended", label: "Recommended", icon: <Star className="w-4 h-4" />, paramValue: "relevance+desc" },
    { id: "price-low", label: "Price: Low to High", icon: <DollarSign className="w-4 h-4" />, paramValue: "price+asc" },
    { id: "price-high", label: "Price: High to Low", icon: <DollarSign className="w-4 h-4" />, paramValue: "price+desc" },
    { id: "rating", label: "Customer Rating", icon: <ThumbsUp className="w-4 h-4" />, paramValue: "rating+desc" },
    { id: "newest", label: "Newest Arrivals", icon: <Clock className="w-4 h-4" />, paramValue: "date+desc" },
  ];

  // Sample products
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      brand: "Apple",
      price: 2399,
      originalPrice: 2599,
      rating: 4.8,
      reviewCount: 342,
      description: "Apple M3 Pro chip, 16-core GPU, 18-core CPU, 16GB RAM, 512GB SSD",
      image: "",
      specs: { processor: "M3 Pro", ram: "16GB", storage: "512GB SSD" },
      isNew: true,
      isBestSeller: true,
      inStock: true
    },
    {
      id: 2,
      name: "Dell XPS 15",
      brand: "Dell",
      price: 1899,
      rating: 4.6,
      reviewCount: 287,
      description: "15.6-inch OLED display, Intel Core i9, 32GB RAM, 1TB SSD, RTX 4060",
      image: "",
      specs: { processor: "Intel Core i9", ram: "32GB", storage: "1TB SSD", display: "15.6-inch OLED" },
      isBestSeller: true,
      inStock: true
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1 Carbon",
      brand: "Lenovo",
      price: 1499,
      originalPrice: 1699,
      rating: 4.7,
      reviewCount: 156,
      description: "14-inch business laptop, Intel Core i7, 16GB RAM, 512GB SSD",
      image: "",
      specs: { processor: "Intel Core i7", ram: "16GB", storage: "512GB SSD" },
      isNew: true,
      inStock: true
    },
    {
      id: 4,
      name: "ASUS ROG Zephyrus G14",
      brand: "ASUS",
      price: 1599,
      rating: 4.5,
      reviewCount: 423,
      description: "Gaming laptop, AMD Ryzen 9, 16GB RAM, 1TB SSD, RTX 4070",
      image: "",
      specs: { processor: "AMD Ryzen 9", ram: "16GB", storage: "1TB SSD" },
      inStock: true
    },
    {
      id: 5,
      name: "HP Spectre x360",
      brand: "HP",
      price: 1299,
      rating: 4.4,
      reviewCount: 198,
      description: "Convertible laptop, Intel Core i7, 16GB RAM, 512GB SSD, 13.5-inch touch",
      image: "",
      specs: { processor: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "13.5-inch touch" },
      inStock: true
    },
    {
      id: 6,
      name: "Microsoft Surface Laptop 5",
      brand: "Microsoft",
      price: 999,
      originalPrice: 1199,
      rating: 4.3,
      reviewCount: 231,
      description: "13.5-inch touchscreen, Intel Core i5, 8GB RAM, 256GB SSD",
      image: "",
      specs: { processor: "Intel Core i5", ram: "8GB", storage: "256GB SSD", display: "13.5-inch touch" },
      inStock: true
    },
  ];

  // Get current state from URL params
  const selectedFilters = {
    brand: getArrayParam('brand'),
    ram: getArrayParam('ram'),
    storage: getArrayParam('storage'),
  };

  const priceRange = getNumberParam('max_price', 2500);
  const selectedSort = getStringParam('sort', 'relevance+desc');
  const currentPage = getNumberParam('page', 1);
  const perPage = getNumberParam('per_page', 20);

  // State management
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
  const [showMobileSort, setShowMobileSort] = useState<boolean>(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState<boolean>(false);
  const [showDesktopSort, setShowDesktopSort] = useState<boolean>(false);

  // Refs for click outside detection
  const desktopSortRef = useRef<HTMLDivElement>(null);

  // Expand category based on URL parameter on mount
  useEffect(() => {
    if (categoryParam) {
      setExpandedCategories([categoryParam]);
    }
  }, [categoryParam]);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Toggle filter selection with URL update
  const toggleFilter = (filterKey: string, option: string) => {
    const current = selectedFilters[filterKey as keyof typeof selectedFilters] || [];
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    
    updateParams({ [filterKey]: updated });
  };

  // Remove specific filter
  const removeFilter = (filterKey: string, option: string) => {
    if (option === 'clearAll') {
      removeParam(filterKey);
    } else {
      const current = selectedFilters[filterKey as keyof typeof selectedFilters] || [];
      const updated = current.filter(item => item !== option);
      updateParams({ [filterKey]: updated });
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    clearAllParams();
  };

  // Clear price filter
  const clearPriceFilter = () => {
    removeParam('max_price');
  };

  // Apply filters
  const applyFilters = () => {
    setShowMobileFilter(false);
    setShowDesktopFilters(false);
  };

  // Handle sort selection with URL update
  const handleSortSelect = (sortParam: string) => {
    updateParams({ sort: sortParam });
    setShowDesktopSort(false);
    setShowMobileSort(false);
  };

  // Handle price range change with URL update
  const handlePriceChange = (value: number) => {
    updateParams({ max_price: value.toString() });
  };

  // Handle page change with URL update
  const handlePageChange = (page: number) => {
    updateParams({ page: page.toString() });
  };

  // Close mobile overlays on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMobileSidebar(false);
        setShowMobileFilter(false);
        setShowMobileSort(false);
        setShowDesktopSort(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  // Close desktop sort on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        desktopSortRef.current &&
        !desktopSortRef.current.contains(e.target as Node) &&
        showDesktopSort
      ) {
        setShowDesktopSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDesktopSort]);

  // Get current sort option label for display
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(s => s.paramValue === selectedSort);
    return option ? option.label : 'Recommended';
  };

  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          showMobileSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setShowMobileSidebar(false)}
      />
      
      <aside
        className={cn(
          "fixed top-0 left-0 w-85 max-w-sm h-full bg-white z-50 shadow-2xl transition-transform duration-300",
          showMobileSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">Categories</h2>
            <button
              onClick={() => setShowMobileSidebar(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            </button>
          </div>
          
          <CategorySidebar
            categories={categories}
            expandedCategories={expandedCategories}
            onToggleCategory={toggleCategory}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            activeCategory={categoryParam || undefined}
          />
          
          <button
            onClick={() => setShowMobileSidebar(false)}
            className="w-full mt-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Apply Categories
          </button>
        </div>
      </aside>
    </>
  );

  // Mobile Filter Panel Component
  const MobileFilterPanel = () => (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          showMobileFilter ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setShowMobileFilter(false)}
      />
      
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 h-4/5 bg-white z-50 rounded-t-2xl shadow-2xl transition-transform duration-300",
          showMobileFilter ? "translate-y-0" : "translate-y-full"
        )}
      >
        <FilterPanel
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onToggleFilter={toggleFilter}
          onClearFilters={clearAllFilters}
          onApplyFilters={() => {
            applyFilters();
            setShowMobileFilter(false);
          }}
          variant="mobile"
        />
      </div>
    </>
  );

  // Mobile Sort Panel Component
  const MobileSortPanel = () => (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          showMobileSort ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setShowMobileSort(false)}
      />
      
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 h-1/2 bg-white z-50 rounded-t-2xl shadow-2xl transition-transform duration-300",
          showMobileSort ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">Sort By</h2>
            <button
              onClick={() => setShowMobileSort(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            </button>
          </div>
          
          <div className="space-y-2">
            {sortOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleSortSelect(option.paramValue)}
                className={cn(
                  "flex items-center w-full p-4 rounded-lg cursor-pointer transition-all duration-300",
                  selectedSort === option.paramValue
                    ? "bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 text-primary-600"
                    : "hover:bg-gray-50 border border-gray-200"
                )}
              >
                <span className="mr-4">{option.icon}</span>
                <span className="flex-1 font-medium text-left">{option.label}</span>
                {selectedSort === option.paramValue && (
                  <Check className="w-5 h-5 text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <MobileSidebar />
      <MobileFilterPanel />
      <MobileSortPanel />

      <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Mobile Header */}
        <div className="lg:hidden mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {categoryParam 
                ? categories.find(c => c.id === categoryParam)?.name || "Products"
                : "All Products"}
            </h1>
            <div className="text-sm text-gray-600">{sampleProducts.length} products</div>
          </div>
          
          <div className="flex space-x-3 mb-6">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
            >
              <Filter className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">Categories</span>
            </button>
            <button
              onClick={() => setShowMobileFilter(true)}
              className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">Filter</span>
            </button>
            <button
              onClick={() => setShowMobileSort(true)}
              className="flex-1 flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 group"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">Sort</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-1/4">
            <CategorySidebar
              categories={categories}
              expandedCategories={expandedCategories}
              onToggleCategory={toggleCategory}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              activeCategory={categoryParam || undefined}
            />
          </aside>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Desktop Header */}
            <div className="hidden lg:block mb-10 animate-slide-up">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {categoryParam 
                  ? categories.find(c => c.id === categoryParam)?.name || "Laptops & Computers"
                  : "Laptops & Computers"}
              </h1>
              <p className="text-gray-600">Showing {sampleProducts.length} products from 128 results</p>
            </div>
            
            {/* Desktop Filter/Sort Controls */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="w-full md:w-auto">
                  <button
                    onClick={() => setShowDesktopFilters(!showDesktopFilters)}
                    className={cn(
                      "flex items-center justify-between w-full md:w-auto px-4 py-2.5 rounded-lg border transition-all duration-300 group",
                      showDesktopFilters
                        ? "bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 text-primary-600"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      <span>Filter Products</span>
                    </div>
                    {showDesktopFilters ? (
                      <ChevronUp className="w-4 h-4 ml-3 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-3 text-gray-500" />
                    )}
                  </button>
                </div>
                
                {/* Fixed Sort Dropdown */}
                <SortDropdown
                  ref={desktopSortRef}
                  sortOptions={sortOptions}
                  selectedSort={selectedSort}
                  onSelectSort={handleSortSelect}
                  showDesktopSort={showDesktopSort}
                  onToggleDesktopSort={() => setShowDesktopSort(!showDesktopSort)}
                />
              </div>
              
              {showDesktopFilters && (
                <div className={cn(
                  "mt-6 pt-6 border-t border-gray-200 transition-all duration-300",
                  showDesktopFilters ? "block animate-fade-in" : "hidden"
                )}>
                  <FilterPanel
                    filterOptions={filterOptions}
                    selectedFilters={selectedFilters}
                    onToggleFilter={toggleFilter}
                    onClearFilters={clearAllFilters}
                    onApplyFilters={applyFilters}
                    variant="desktop"
                  />
                </div>
              )}
            </div>
            
            {/* Active Filters (Mobile) */}
            <div className="lg:hidden">
              <ActiveFilters
                selectedFilters={selectedFilters}
                priceRange={priceRange}
                onRemoveFilter={removeFilter}
                onClearPriceFilter={clearPriceFilter}
              />
            </div>
            
            {/* Active Filters (Desktop) */}
            <div className="hidden lg:block mb-8">
              <ActiveFilters
                selectedFilters={selectedFilters}
                priceRange={priceRange}
                onRemoveFilter={removeFilter}
                onClearPriceFilter={clearPriceFilter}
              />
            </div>
            
            {/* Products Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sampleProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={13}
                totalItems={128}
                onPageChange={handlePageChange}
              />
              
              {/* Show results info */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {Object.keys(selectedFilters).length > 0
                    ? `Showing ${sampleProducts.length} products with ${Object.values(selectedFilters).flat().length} active filters`
                    : `Showing ${sampleProducts.length} products`}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Current URL params: {searchParams.toString() || 'none'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}