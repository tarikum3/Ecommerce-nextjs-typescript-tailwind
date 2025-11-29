import { CategoryItem } from "@/app/types/category";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: CategoryItem[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {categories.map((category, index) => (
        <CategoryCard 
          key={category.id} 
          category={category} 
          delay={index * 100} 
        />
      ))}
    </div>
  );
}