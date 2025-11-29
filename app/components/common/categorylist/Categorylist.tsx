// components/category-list.tsx
'use client';

import { CategoryListItem as CategoryListItemType } from '@/app/types/category';
import CategoryListItem from './CategoryListItem';
import Link from 'next/link';

interface CategoryListProps {
  categories: CategoryListItemType[];
  currentCategory?: string;
  onCategorySelect?: (category: CategoryListItemType) => void;
}

export default function CategoryList({
  categories,
  currentCategory,
  onCategorySelect
}: CategoryListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
      </div>
      
      <div className="space-y-1">
        {categories.map((category) => (
          <CategoryListItem
            key={category.url}
            category={category}
            currentCategory={currentCategory}
            onCategorySelect={onCategorySelect}
          />
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link
          href="/categories"
          className="w-full text-center text-primary-600 hover:text-primary-700 font-medium transition-colors flex items-center justify-center"
        >
          View all categories
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}