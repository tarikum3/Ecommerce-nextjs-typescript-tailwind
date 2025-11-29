export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  productCount: number;
  image: string;
  gradient: {
    from: string;
    to: string;
  };
  href: string;
}

export interface CategoryConfig {
  badge: {
    text: string;
    show: boolean;
  };
  title: string;
  description: string;
  categories: CategoryItem[];
  cta: {
    text: string;
    href: string;
  };
}





export interface CategoryListItem {
  name: string;
  url: string;
  children?: CategoryListItem[];
}

export interface CategoryListProps {
  categories: CategoryListItem[];
  currentCategory?: string;
  onCategorySelect?: (category: CategoryListItem) => void;
}