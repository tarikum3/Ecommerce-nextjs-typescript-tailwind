// components/filter/Filter.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

interface FilterSection {
  id: string;
  title: string;
  type: 'radio' | 'checkbox' | 'range';
  options: FilterOption[];
}

interface FilterProps {
  sections: FilterSection[];
  onFilterChange?: (filters: Record<string, string | string[]>) => void;
  className?: string;
}

 const FilterSection: React.FC<FilterProps> = ({
  sections,
  onFilterChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});

  const handleFilterChange = (sectionId: string, value: string, type: 'radio' | 'checkbox') => {
    setActiveFilters(prev => {
      let newFilters = { ...prev };

      if (type === 'radio') {
        newFilters[sectionId] = value;
      } else {
        const currentValues = Array.isArray(prev[sectionId]) ? prev[sectionId] as string[] : [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        
        newFilters[sectionId] = newValues.length > 0 ? newValues : '';
      }

      if (onFilterChange) {
        onFilterChange(newFilters);
      }

      return newFilters;
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
    if (onFilterChange) {
      onFilterChange({});
    }
    // Collapse the filter when clearing
    setIsOpen(false);
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return count + (value ? 1 : 0);
    }, 0);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Filter Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg transition-all duration-200',
          'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          getActiveFiltersCount() > 0 && 'bg-primary-50 border-primary-500 text-primary-700',
          isOpen && 'bg-primary-50 border-primary-500 text-primary-700'
        )}
      >
        <Filter className="h-4 w-4" />
        <span className="font-medium">Filters</span>
        {getActiveFiltersCount() > 0 && (
          <span className="bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getActiveFiltersCount()}
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="h-4 w-4 ml-1" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-1" />
        )}
      </button>

      {/* Filter Dropdown */}
      <div
        className={cn(
          'absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50',
          'transition-all duration-300 ease-in-out overflow-hidden',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4 max-h-80 overflow-y-auto">
          {/* Sort Component Placeholder */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Best Selling</option>
              <option>Highest Rated</option>
            </select>
          </div>

          {/* Filter Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h3 className="font-semibold text-gray-900 mb-3">{section.title}</h3>
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      {section.type === 'radio' ? (
                        <input
                          type="radio"
                          name={section.id}
                          value={option.value}
                          checked={activeFilters[section.id] === option.value}
                          onChange={() => handleFilterChange(section.id, option.value, 'radio')}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={Array.isArray(activeFilters[section.id]) 
                            ? (activeFilters[section.id] as string[]).includes(option.value)
                            : false
                          }
                          onChange={() => handleFilterChange(section.id, option.value, 'checkbox')}
                          className="text-primary-600 rounded focus:ring-primary-500"
                        />
                      )}
                      <span className="text-sm text-gray-700 flex-1">{option.label}</span>
                      {option.count !== undefined && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {option.count}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Actions */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterSection;