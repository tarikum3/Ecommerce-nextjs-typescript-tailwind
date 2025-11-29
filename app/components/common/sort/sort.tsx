// components/sort.tsx
'use client';

import { useState } from 'react';

export interface SortOption {
  value: string;
  label: string;
  field: string;
  order: 'asc' | 'desc';
}

interface SortProps {
  onSortChange?: (value: string, field: string, order: 'asc' | 'desc') => void;
  defaultSort?: string;
  className?: string;
  options?: SortOption[];
}

const defaultSortOptions: SortOption[] = [
  { value: 'featured', label: 'Featured', field: 'featured', order: 'desc' },
  { value: 'price-low', label: 'Price: Low to High', field: 'price', order: 'asc' },
  { value: 'price-high', label: 'Price: High to Low', field: 'price', order: 'desc' },
  { value: 'newest', label: 'Newest', field: 'createdAt', order: 'desc' },
  { value: 'best-selling', label: 'Best Selling', field: 'sales', order: 'desc' },
  { value: 'highest-rated', label: 'Highest Rated', field: 'rating', order: 'desc' },
];

export default function Sort({
  onSortChange,
  defaultSort = 'featured',
  className = '',
  options = defaultSortOptions,
}: SortProps) {
  const [selectedSort, setSelectedSort] = useState(defaultSort);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    const option = options.find(opt => opt.value === value);
    if (option && onSortChange) {
      onSortChange(value, option.field, option.order);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span className="mr-2 text-sm text-gray-700">Sort by:</span>
      <div className="relative">
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-4 w-4"
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
        </div>
      </div>
    </div>
  );
}