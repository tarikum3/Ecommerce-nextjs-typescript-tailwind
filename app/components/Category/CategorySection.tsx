import { CategoryConfig } from "@/app/types/category";
import CategoryContent from "./CategoryContent";
import CategoryGrid from "./CategoryGrid";

interface CategorySectionProps {
  data?: CategoryConfig;
}

export default function CategorySection({ data }: CategorySectionProps) {
  const categoryConfig = data || defaultCategoryData;

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryContent content={categoryConfig} />
        <CategoryGrid categories={categoryConfig.categories} />
        
        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href={categoryConfig.cta.href}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {categoryConfig.cta.text}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// Default data fallback
const defaultCategoryData: CategoryConfig = {
  badge: {
    text: "Shop by Category",
    show: true
  },
  title: "Browse Categories",
  description: "Explore our diverse range of product categories",
  categories: [
    {
      id: "1",
      title: "Clothing",
      description: "Browse our clothing collection",
      icon: "clothing",
      productCount: 24,
      image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-featured-category.jpg",
      gradient: {
        from: "blue-500",
        to: "cyan-500"
      },
      href: "/category/clothing"
    },
    {
      id: "2",
      title: "Accessories",
      description: "Explore our accessories collection",
      icon: "accessories",
      productCount: 18,
      image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg",
      gradient: {
        from: "amber-500",
        to: "orange-500"
      },
      href: "/category/accessories"
    },
    {
      id: "3",
      title: "Footwear",
      description: "Browse our footwear collection",
      icon: "footwear",
      productCount: 15,
      image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg",
      gradient: {
        from: "emerald-500",
        to: "teal-500"
      },
      href: "/category/footwear"
    }
  ],
  cta: {
    text: "View All Categories",
    href: "/categories"
  }
};