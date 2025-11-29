// Types
export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

export interface FilterSectionProps {
  id: string;
  title: string;
  options: FilterOption[];
  type: 'radio' | 'checkbox';
  selectedValues: string[];
  onFilterChange: (sectionId: string, values: string[]) => void;
  defaultOpen?: boolean;
}

export interface PriceRange {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

export interface RatingOption {
  id: string;
  label: string;
  stars: number;
}