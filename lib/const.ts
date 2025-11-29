export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};
export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "name" | "createdAt" | "price";
  reverse: boolean;
};
export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};
export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Name",
    slug: "name",
    sortKey: "name",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "createdAt",
    sortKey: "createdAt",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price",
    sortKey: "price",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price",
    sortKey: "price",
    reverse: true,
  },
];

export const primaryColors: Record<string, string> = {
  "primary-900": "#111827",
  "primary-800": "#1F2937",
  "primary-700": "#374151",
  "primary-600": "#4B5563",
  "primary-500": "#6B7280",
  "primary-400": "#9CA3AF",
  "primary-300": "#D1D5DB",
  "primary-200": "#E5E7EB",
  "primary-100": "#FFFFFF",
};





export const categories = [
  {
    name: 'Electronics',
    url: '/categories/electronics',
    children: [
      {
        name: 'Smartphones',
        url: '/categories/electronics/smartphones',
        children: [
          {
            name: 'Android Phones',
            url: '/categories/electronics/smartphones/android'
          },
          {
            name: 'iPhones',
            url: '/categories/electronics/smartphones/iphones'
          }
        ]
      },
      {
        name: 'Laptops',
        url: '/categories/electronics/laptops',
        children: [
          {
            name: 'Gaming Laptops',
            url: '/categories/electronics/laptops/gaming'
          },
          {
            name: 'Business Laptops',
            url: '/categories/electronics/laptops/business'
          }
        ]
      },
      {
        name: 'Headphones',
        url: '/categories/electronics/headphones'
      }
    ]
  },
  {
    name: 'Fashion',
    url: '/categories/fashion',
    children: [
      {
        name: "Men's Clothing",
        url: '/categories/fashion/mens-clothing',
        children: [
          {
            name: 'T-Shirts',
            url: '/categories/fashion/mens-clothing/tshirts'
          },
          {
            name: 'Jeans',
            url: '/categories/fashion/mens-clothing/jeans'
          }
        ]
      },
      {
        name: "Women's Clothing",
        url: '/categories/fashion/womens-clothing',
        children: [
          {
            name: 'Dresses',
            url: '/categories/fashion/womens-clothing/dresses'
          },
          {
            name: 'Skirts',
            url: '/categories/fashion/womens-clothing/skirts'
          }
        ]
      }
    ]
  },
  {
    name: 'Home & Kitchen',
    url: '/categories/home-kitchen',
    children: [
      {
        name: 'Furniture',
        url: '/categories/home-kitchen/furniture'
      },
      {
        name: 'Kitchenware',
        url: '/categories/home-kitchen/kitchenware'
      }
    ]
  },
  {
    name: 'Beauty',
    url: '/categories/beauty'
  },
  {
    name: 'Sports',
    url: '/categories/sports'
  },
  {
    name: 'Books',
    url: '/categories/books'
  }
];


export const Productfilter = [
  {
    id: 'price',
    title: 'Price Range',
    type: 'radio' as const,
    options: [
      { id: 'price-all', label: 'All Prices', value: '' },
      { id: 'price-under50', label: 'Under $50', value: 'under-50' },
      { id: 'price-50-100', label: '$50 - $100', value: '50-100' },
      { id: 'price-100-200', label: '$100 - $200', value: '100-200' },
      { id: 'price-over200', label: 'Over $200', value: 'over-200' },
    ],
  },
  {
    id: 'category',
    title: 'Category',
    type: 'checkbox' as const,
    options: [
      { id: 'cat-electronics', label: 'Electronics', value: 'electronics', count: 142 },
      { id: 'cat-fashion', label: 'Fashion', value: 'fashion', count: 256 },
      { id: 'cat-home', label: 'Home & Kitchen', value: 'home', count: 189 },
      { id: 'cat-beauty', label: 'Beauty', value: 'beauty', count: 98 },
    ],
  },
  {
    id: 'rating',
    title: 'Customer Rating',
    type: 'checkbox' as const,
    options: [
      { id: 'rating-5', label: '4.5 & above', value: '4.5' },
      { id: 'rating-4', label: '4.0 & above', value: '4.0' },
      { id: 'rating-3', label: '3.5 & above', value: '3.5' },
    ],
  },
];