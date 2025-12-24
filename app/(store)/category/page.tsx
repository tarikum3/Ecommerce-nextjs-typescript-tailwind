
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
//   StarIcon
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // ==================== TYPES ====================
// interface Category {
//   id: string;
//   name: string;
//   icon: React.ReactNode;
//   color: string;
//   subcategories?: Subcategory[];
// }

// interface Subcategory {
//   id: string;
//   name: string;
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
//   onPriceChange
// }: {
//   categories: Category[];
//   expandedCategories: string[];
//   onToggleCategory: (categoryId: string) => void;
//   priceRange: number;
//   onPriceChange: (value: number) => void;
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32">
//       <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Categories</h2>
      
//       <ul className="space-y-1">
//         {categories.map(category => (
//           <li key={category.id} className="border-b border-gray-100 last:border-0">
//             <button
//               onClick={() => onToggleCategory(category.id)}
//               className={cn(
//                 "flex justify-between items-center w-full p-3 hover:bg-primary-50 rounded-lg cursor-pointer transition-all duration-300 group",
//                 expandedCategories.includes(category.id) && "bg-primary-50"
//               )}
//             >
//               <div className="flex items-center">
//                 <span className={cn("mr-3", category.color)}>{category.icon}</span>
//                 <span className="font-medium text-left text-gray-900 group-hover:text-primary-600 transition-colors">
//                   {category.name}
//                 </span>
//               </div>
//               {category.subcategories && (
//                 expandedCategories.includes(category.id) ? (
//                   <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-primary-500 transition-colors" />
//                 ) : (
//                   <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary-500 transition-colors" />
//                 )
//               )}
//             </button>
            
//             {category.subcategories && expandedCategories.includes(category.id) && (
//               <ul className="ml-10 mt-2 space-y-1 pb-2">
//                 {category.subcategories.map(sub => (
//                   <li key={sub.id}>
//                     <button className="w-full text-left p-2 hover:bg-primary-50 rounded cursor-pointer text-gray-600 hover:text-gray-900 transition-colors text-sm">
//                       {sub.name}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
      
//       {/* Price Filter */}
//       <div className="mt-8 pt-6 border-t border-gray-200">
//         <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
//         <div className="mb-2">
//           <input
//             type="range"
//             min="0"
//             max="5000"
//             step="100"
//             value={priceRange}
//             onChange={(e) => onPriceChange(parseInt(e.target.value))}
//             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-primary-500 [&::-webkit-slider-thumb]:to-primary-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
//           />
//         </div>
//         <div className="flex justify-between text-sm text-gray-600">
//           <span>$0</span>
//           <span className="font-medium text-gray-900">${priceRange}</span>
//           <span>$5000</span>
//         </div>
//       </div>
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
//       {/* Product Image */}
//       <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
//             <Laptop className="w-16 h-16 text-primary-500 opacity-50" />
//           </div>
//         </div>
        
//         {/* Badges */}
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
        
//         {/* Quick Add Button */}
//         {isHovered && (
//           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
//             <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center gap-2 shadow-lg transform hover:scale-105">
//               <ShoppingCart className="w-4 h-4" />
//               <span className="text-sm font-medium">Add to Cart</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <div>
//             <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
//           </div>
//         </div>
        
//         <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
//         {/* Rating */}
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

//         {/* Specs */}
//         <div className="flex flex-wrap gap-1 mb-3">
//           <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//             {product.specs.ram}
//           </span>
//           <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//             {product.specs.storage}
//           </span>
//         </div>

//         {/* Price & Add to Cart */}
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

// // ==================== MAIN PRODUCTS PAGE ====================
// export default function ProductsPage() {
//   // Categories data
//   const categories: Category[] = [
//     {
//       id: "computers",
//       name: "Computers & Laptops",
//       icon: <Laptop className="w-5 h-5" />,
//       color: "text-blue-500",
//       subcategories: [
//         { id: "gaming", name: "Gaming Laptops" },
//         { id: "ultrabooks", name: "Ultrabooks" },
//         { id: "business", name: "Business Laptops" },
//         { id: "all-in-one", name: "All-in-One PCs" },
//       ],
//     },
//     {
//       id: "smartphones",
//       name: "Smartphones & Tablets",
//       icon: <Smartphone className="w-5 h-5" />,
//       color: "text-green-500",
//       subcategories: [
//         { id: "android", name: "Android Phones" },
//         { id: "iphone", name: "iPhones" },
//         { id: "tablets", name: "Tablets" },
//         { id: "accessories", name: "Accessories" },
//       ],
//     },
//     {
//       id: "tv",
//       name: "TV & Home Theater",
//       icon: <Tv className="w-5 h-5" />,
//       color: "text-purple-500",
//       subcategories: [
//         { id: "4k-tv", name: "4K TVs" },
//         { id: "smart-tv", name: "Smart TVs" },
//         { id: "soundbars", name: "Soundbars" },
//         { id: "home-theater", name: "Home Theater Systems" },
//       ],
//     },
//     {
//       id: "audio",
//       name: "Audio & Headphones",
//       icon: <Headphones className="w-5 h-5" />,
//       color: "text-amber-500",
//     },
//     {
//       id: "gaming",
//       name: "Gaming",
//       icon: <Gamepad2 className="w-5 h-5" />,
//       color: "text-red-500",
//     },
//     {
//       id: "cameras",
//       name: "Cameras & Drones",
//       icon: <Camera className="w-5 h-5" />,
//       color: "text-indigo-500",
//     },
//     {
//       id: "wearable",
//       name: "Wearable Tech",
//       icon: <Watch className="w-5 h-5" />,
//       color: "text-teal-500",
//     },
//     {
//       id: "smart-home",
//       name: "Smart Home",
//       icon: <Home className="w-5 h-5" />,
//       color: "text-orange-500",
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
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
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
//       {/* Overlay */}
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
//           showMobileSidebar ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//         onClick={() => setShowMobileSidebar(false)}
//       />
      
//       {/* Sidebar */}
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
//       {/* Overlay */}
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
//           showMobileFilter ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//         onClick={() => setShowMobileFilter(false)}
//       />
      
//       {/* Panel */}
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
//       {/* Overlay */}
//       <div
//         className={cn(
//           "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
//           showMobileSort ? "opacity-100 visible" : "opacity-0 invisible"
//         )}
//         onClick={() => setShowMobileSort(false)}
//       />
      
//       {/* Panel */}
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
//       {/* Mobile Components */}
//       <MobileSidebar />
//       <MobileFilterPanel />
//       <MobileSortPanel />

//       {/* Hero Pattern Background */}
//       <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
//       <div className="container mx-auto px-4 py-8 relative">
//         {/* Mobile Header */}
//         <div className="lg:hidden mb-8 animate-fade-in">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-gray-900">Laptops & Computers</h1>
//             <div className="text-sm text-gray-600">{sampleProducts.length} products</div>
//           </div>
          
//           {/* Mobile Control Buttons */}
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
//             />
//           </aside>
          
//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {/* Desktop Header */}
//             <div className="hidden lg:block mb-10 animate-slide-up">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Laptops & Computers</h1>
//               <p className="text-gray-600">Showing {sampleProducts.length} products from 128 results</p>
//             </div>
            
//             {/* Desktop Filter/Sort Controls */}
//             <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//                 {/* Filter Button */}
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
                
//                 {/* Sort Dropdown */}
//                 <SortDropdown
//                   sortOptions={sortOptions}
//                   selectedSort={selectedSort}
//                   onSelectSort={handleSortSelect}
//                   showDesktopSort={showDesktopSort}
//                   onToggleDesktopSort={() => setShowDesktopSort(!showDesktopSort)}
//                 //  desktopSortRef={desktopSortRef}
//                 desktopSortRef={desktopSortRef.current ? desktopSortRef as React.RefObject<HTMLDivElement> : undefined}
//                 />
//               </div>
              
//               {/* Desktop Filter Options */}
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









"use client";

import React, { useState, useEffect, useRef } from "react";
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
  StarIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

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
}

interface SortOption {
  id: string;
  label: string;
  icon: React.ReactNode;
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

  const handleCategoryClick = (category: Category, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(category.url);
  };

  const handleSubcategoryClick = (subcategory: Subcategory, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(subcategory.url);
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
              // Tailwind group hover for desktop
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
            
            {/* Desktop: Show on hover using group-hover */}
            {/* Mobile: Show based on expanded state */}
            {category.subcategories && (
              <ul className={cn(
                "ml-10 mt-2 space-y-1 pb-2 transition-all duration-200 overflow-hidden",
                // Mobile: controlled by state
                "lg:hidden",
                expandedCategories.includes(category.id) ? "block" : "hidden",
                // Desktop: show on hover using group-hover
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
      
      {/* Price Filter */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
        <div className="mb-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange}
            onChange={(e) => onPriceChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-primary-500 [&::-webkit-slider-thumb]:to-primary-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>$0</span>
          <span className="font-medium text-gray-900">${priceRange}</span>
          <span>$5000</span>
        </div>
      </div>
    </div>
  );
};

// 2. Filter Panel Component (unchanged from previous version)
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
                const isSelected = selectedFilters[filter.id]?.includes(option);
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
                      onChange={() => onToggleFilter(filter.id, option)}
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

// 3. Sort Dropdown Component (unchanged from previous version)
const SortDropdown = ({
  sortOptions,
  selectedSort,
  onSelectSort,
  showDesktopSort,
  onToggleDesktopSort,
  desktopSortRef
}: {
  sortOptions: SortOption[];
  selectedSort: string;
  onSelectSort: (sortId: string) => void;
  showDesktopSort?: boolean;
  onToggleDesktopSort?: () => void;
  desktopSortRef?: React.RefObject<HTMLDivElement>;
}) => {
  if (desktopSortRef) {
    return (
      <div className="relative" ref={desktopSortRef}>
        <button
          onClick={onToggleDesktopSort}
          className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-all duration-300 hover:border-gray-300"
        >
          <div className="flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500" />
            <span>Sort by: {sortOptions.find(s => s.id === selectedSort)?.label}</span>
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
                    onClick={() => onSelectSort(option.id)}
                    className={cn(
                      "w-full flex items-center px-4 py-2.5 hover:bg-primary-50 cursor-pointer transition-all duration-300 group",
                      selectedSort === option.id && "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600"
                    )}
                  >
                    <span className="mr-3 group-hover:scale-110 transition-transform">{option.icon}</span>
                    <span className="flex-1 text-left">{option.label}</span>
                    {selectedSort === option.id && (
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

  return (
    <button className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 group">
      <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
      <span className="text-gray-700 group-hover:text-gray-900">Sort</span>
    </button>
  );
};

// 4. Product Card Component (unchanged from previous version)
const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
            <Laptop className="w-16 h-16 text-primary-500 opacity-50" />
          </div>
        </div>
        
        {/* Badges */}
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
        
        {/* Quick Add Button */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center gap-2 shadow-lg transform hover:scale-105">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">Add to Cart</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Rating */}
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

        {/* Specs */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.specs.ram}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.specs.storage}
          </span>
        </div>

        {/* Price & Add to Cart */}
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

// 5. Active Filters Component (unchanged from previous version)
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

// ==================== MAIN PRODUCTS PAGE ====================
export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  // Categories data with URLs
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
    },
    {
      id: "ram",
      label: "RAM",
      type: "checkbox",
      options: ["8 GB", "16 GB", "32 GB", "64 GB"],
    },
    {
      id: "storage",
      label: "Storage",
      type: "checkbox",
      options: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
    },
    {
      id: "price",
      label: "Price Range",
      type: "range",
      min: 0,
      max: 5000,
      step: 100,
      value: 2500,
    },
  ];

  // Sort options
  const sortOptions: SortOption[] = [
    { id: "recommended", label: "Recommended", icon: <Star className="w-4 h-4" /> },
    { id: "price-low", label: "Price: Low to High", icon: <DollarSign className="w-4 h-4" /> },
    { id: "price-high", label: "Price: High to Low", icon: <DollarSign className="w-4 h-4" /> },
    { id: "rating", label: "Customer Rating", icon: <ThumbsUp className="w-4 h-4" /> },
    { id: "newest", label: "Newest Arrivals", icon: <Clock className="w-4 h-4" /> },
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

  // State management
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    brand: ["Dell", "Lenovo"],
    ram: ["16 GB"],
    storage: ["256 GB SSD", "512 GB SSD"],
  });
  const [priceRange, setPriceRange] = useState<number>(2500);
  const [selectedSort, setSelectedSort] = useState<string>("recommended");
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

  // Toggle filter selection
  const toggleFilter = (filterId: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[filterId] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      
      return { ...prev, [filterId]: updated };
    });
  };

  // Remove specific filter
  const removeFilter = (filterId: string, option: string) => {
    toggleFilter(filterId, option);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({});
    setPriceRange(5000);
  };

  // Clear price filter
  const clearPriceFilter = () => {
    setPriceRange(5000);
  };

  // Apply filters
  const applyFilters = () => {
    console.log("Applied filters:", selectedFilters);
    console.log("Price range:", priceRange);
    setShowMobileFilter(false);
    setShowDesktopFilters(false);
  };

  // Handle sort selection
  const handleSortSelect = (sortId: string) => {
    setSelectedSort(sortId);
    setShowDesktopSort(false);
    setShowMobileSort(false);
  };

  // Handle price range change
  const handlePriceChange = (value: number) => {
    setPriceRange(value);
  };

  // Close mobile overlays on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMobileSidebar(false);
        setShowMobileFilter(false);
        setShowMobileSort(false);
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
        !desktopSortRef.current.contains(e.target as Node)
      ) {
        setShowDesktopSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          showMobileSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setShowMobileSidebar(false)}
      />
      
      {/* Sidebar */}
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
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          showMobileFilter ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setShowMobileFilter(false)}
      />
      
      {/* Panel */}
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
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          showMobileSort ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setShowMobileSort(false)}
      />
      
      {/* Panel */}
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
                onClick={() => handleSortSelect(option.id)}
                className={cn(
                  "flex items-center w-full p-4 rounded-lg cursor-pointer transition-all duration-300",
                  selectedSort === option.id
                    ? "bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 text-primary-600"
                    : "hover:bg-gray-50 border border-gray-200"
                )}
              >
                <span className="mr-4">{option.icon}</span>
                <span className="flex-1 font-medium text-left">{option.label}</span>
                {selectedSort === option.id && (
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
      {/* Mobile Components */}
      <MobileSidebar />
      <MobileFilterPanel />
      <MobileSortPanel />

      {/* Hero Pattern Background */}
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
          
          {/* Mobile Control Buttons */}
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
              <ChevronDown className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600" />
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
                {/* Filter Button */}
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
                
                {/* Sort Dropdown */}
                <SortDropdown
                  sortOptions={sortOptions}
                  selectedSort={selectedSort}
                  onSelectSort={handleSortSelect}
                  showDesktopSort={showDesktopSort}
                  onToggleDesktopSort={() => setShowDesktopSort(!showDesktopSort)}
                  // desktopSortRef={desktopSortRef}
                  desktopSortRef={desktopSortRef.current ? desktopSortRef as React.RefObject<HTMLDivElement> : undefined}
                />
              </div>
              
              {/* Desktop Filter Options */}
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
              
              {/* Show results info */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {Object.keys(selectedFilters).length > 0
                    ? `Showing ${sampleProducts.length} products with ${Object.values(selectedFilters).flat().length} active filters`
                    : `Showing ${sampleProducts.length} products`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}