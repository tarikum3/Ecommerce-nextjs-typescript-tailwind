// components/category-list-item.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CategoryListItem as CategoryListItemType } from '@/app/types/category';

interface CategoryListItemProps {
  category: CategoryListItemType;
  currentCategory?: string;
  level?: number;
  onCategorySelect?: (category: CategoryListItemType) => void;
}

export default function CategoryListItem({
  category,
  currentCategory,
  level = 0,
  onCategorySelect
}: CategoryListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isActive = currentCategory === category.url;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onCategorySelect?.(category);
  };

  const paddingLeft = level * 20 + 16; // 16px base + 20px per level

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-primary-50 text-primary-600 font-medium'
            : 'hover:bg-primary-50 text-gray-900'
        }`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <Link
          href={category.url}
          className="flex-1 font-medium"
          onClick={() => onCategorySelect?.(category)}
        >
          {category.name}
        </Link>
        
        {hasChildren && (
          <button
            onClick={handleClick}
            className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors"
          >
            <svg
              className={`h-4 w-4 transform transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1">
          {category.children!.map((child) => (
            <CategoryListItem
              key={child.url}
              category={child}
              currentCategory={currentCategory}
              level={level + 1}
              onCategorySelect={onCategorySelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}