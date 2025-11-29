import { CategoryItem } from "@/app/types/category";
import Link from "next/link";
import { Package, Lock, Footprints } from "lucide-react";

interface CategoryCardProps {
  category: CategoryItem;
  delay: number;
}

export default function CategoryCard({ category, delay }: CategoryCardProps) {
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case "clothing":
        return <Package className="w-6 h-6 text-white" />;
      case "accessories":
        return <Lock className="w-6 h-6 text-white" />;
      case "footwear":
        return <Footprints className="w-6 h-6 text-white" />;
      default:
        return <Package className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <div 
            className={`w-12 h-12 bg-gradient-to-br from-${category.gradient.from} to-${category.gradient.to} rounded-xl flex items-center justify-center mb-4`}
          >
            {getIconComponent(category.icon)}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {category.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {category.description}
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500">Available products</span>
            <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
              {category.productCount} items
            </span>
          </div>
          
          <Link 
            href={category.href}
            className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Shop Now
            <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Hover Image */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <img 
          src={category.image} 
          alt={category.title}
          className="w-20 h-20 rounded-lg object-cover shadow-md"
        />
      </div>
    </div>
  );
}