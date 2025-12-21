



"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

// ==================== TYPES ====================
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  discount?: number;
  tags: string[];
  description: string;
  sku: string;
}

interface SearchHistory {
  id: string;
  query: string;
  timestamp: Date;
}

interface TrendingProduct extends Product {
  trend: 'hot' | 'new' | 'bestseller';
  soldCount: number;
}

// ==================== FAKE API SERVICE ====================
const fakeApiService = {
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  getTrendingProducts: async (): Promise<TrendingProduct[]> => {
    await fakeApiService.delay(200);
    return [
      {
        id: "1",
        name: "Wireless Noise Cancelling Headphones",
        price: 299,
        originalPrice: 349,
        image: "/products/headphones.jpg",
        category: "Electronics",
        brand: "Sony",
        inStock: true,
        rating: 4.5,
        reviewCount: 1289,
        discount: 15,
        tags: ["Wireless", "Noise Cancelling", "Bluetooth", "Premium"],
        description: "Premium wireless headphones with industry-leading noise cancellation",
        sku: "SONY-WH1000XM4",
        trend: 'bestseller',
        soldCount: 1243
      },
      {
        id: "2",
        name: "Apple MacBook Pro 16-inch M3",
        price: 2399,
        originalPrice: 2599,
        image: "/products/macbook.jpg",
        category: "Electronics",
        brand: "Apple",
        inStock: true,
        rating: 4.8,
        reviewCount: 2156,
        discount: 8,
        tags: ["Laptop", "Apple", "M3 Chip", "Professional"],
        description: "16-inch MacBook Pro with M3 Pro or M3 Max chip",
        sku: "MBP16-M3-2024",
        trend: 'hot',
        soldCount: 892
      },
      {
        id: "3",
        name: "Nike Air Max 270",
        price: 149,
        image: "/products/shoes.jpg",
        category: "Fashion",
        brand: "Nike",
        inStock: true,
        rating: 4.4,
        reviewCount: 3124,
        discount: 25,
        tags: ["Shoes", "Running", "Athletic", "Comfort"],
        description: "Iconic Air Max 270 with visible Air unit",
        sku: "NIKE-AM270-2024",
        trend: 'bestseller',
        soldCount: 2156
      },
      {
        id: "4",
        name: "Samsung 55-inch 4K Smart TV",
        price: 699,
        originalPrice: 899,
        image: "/products/tv.jpg",
        category: "Electronics",
        brand: "Samsung",
        inStock: true,
        rating: 4.3,
        reviewCount: 1892,
        discount: 22,
        tags: ["TV", "4K", "Smart TV", "Samsung"],
        description: "Crystal UHD 4K Smart TV with HDR",
        sku: "SAM-55UHD-2024",
        trend: 'hot',
        soldCount: 756
      },
      {
        id: "5",
        name: "iPhone 15 Pro Max",
        price: 1199,
        image: "/products/iphone.jpg",
        category: "Electronics",
        brand: "Apple",
        inStock: true,
        rating: 4.7,
        reviewCount: 4892,
        tags: ["Phone", "Apple", "Pro", "5G"],
        description: "iPhone 15 Pro Max with Titanium design",
        sku: "IPHONE15-PROMAX",
        trend: 'new',
        soldCount: 3210
      },
      {
        id: "6",
        name: "Dyson V15 Detect Vacuum",
        price: 699,
        originalPrice: 799,
        image: "/products/vacuum.jpg",
        category: "Home",
        brand: "Dyson",
        inStock: true,
        rating: 4.6,
        reviewCount: 1567,
        discount: 13,
        tags: ["Home", "Vacuum", "Cordless", "Dyson"],
        description: "Cordless vacuum with laser dust detection",
        sku: "DYSON-V15-DETECT",
        trend: 'bestseller',
        soldCount: 1345
      }
    ];
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    await fakeApiService.delay(300);
    const trending = await fakeApiService.getTrendingProducts();
    
    if (!query.trim()) return trending;
    
    const searchLower = query.toLowerCase();
    return trending.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower)
    );
  },

  getSearchSuggestions: async (query: string): Promise<string[]> => {
    await fakeApiService.delay(100);
    const trending = await fakeApiService.getTrendingProducts();
    
    const allText = trending.flatMap(product => [
      product.name,
      product.brand,
      product.category,
      ...product.tags,
      product.sku
    ]);
    
    const uniqueText = [...new Set(allText)];
    const searchLower = query.toLowerCase();
    
    return uniqueText
      .filter(text => text.toLowerCase().includes(searchLower))
      .slice(0, 8);
  },

  getPopularSearches: async (): Promise<string[]> => {
    await fakeApiService.delay(150);
    return [
      "iPhone 15 Pro Max",
      "Wireless Headphones",
      "Gaming Laptop",
      "Smart Watch",
      "Running Shoes",
      "4K TV",
      "Mechanical Keyboard",
      "Gaming Chair",
      "Air Purifier",
      "Electric Scooter"
    ];
  }
};

// ==================== COMPONENTS ====================

// Loading Skeleton Component
const SearchSkeleton: React.FC = () => (
  <div className="space-y-3 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/10 to-primary-600/10" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-primary-500/10 rounded w-3/4"></div>
          <div className="h-3 bg-primary-500/10 rounded w-1/2"></div>
        </div>
        <div className="w-16 h-6 bg-primary-500/10 rounded"></div>
      </div>
    ))}
  </div>
);

// Product Card Component - Updated to match landing page styling
interface ProductCardProps {
  product: Product | TrendingProduct;
  onClick: (product: Product) => void;
  variant?: 'compact' | 'detailed';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, variant = 'compact' }) => {
  const isTrending = 'trend' in product;
  
  const getTrendBadge = () => {
    if (!isTrending) return null;
    const trendingProduct = product as TrendingProduct;
    
    switch (trendingProduct.trend) {
      case 'hot':
        return (
          <Badge className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
            <Icons.Flame className="w-3 h-3 mr-1" />
            Hot
          </Badge>
        );
      case 'new':
        return (
          <Badge className="absolute top-2 left-2 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <Icons.Sparkles className="w-3 h-3 mr-1" />
            New
          </Badge>
        );
      case 'bestseller':
        return (
          <Badge className="absolute top-2 left-2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
            <Icons.Crown className="w-3 h-3 mr-1" />
            Bestseller
          </Badge>
        );
    }
  };

  return (
    <Card
      className={cn(
        "product-card hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden",
        variant === 'detailed' && "hover:shadow-xl"
      )}
      onClick={() => onClick(product)}
    >
      <CardContent className={cn("p-4", variant === 'detailed' && "p-6")}>
        <div className="flex items-start gap-4">
          {/* Product Image/Icon */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-lg bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-gray-100 flex items-center justify-center",
              variant === 'detailed' ? "w-20 h-20" : "w-16 h-16"
            )}>
              <Icons.Package className={cn(
                "text-primary-600",
                variant === 'detailed' ? "w-10 h-10" : "w-8 h-8"
              )} />
            </div>
            {isTrending && getTrendBadge()}
            {product.discount && (
              <div className="absolute -bottom-1 -right-1 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                -{product.discount}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className={cn(
                  "font-semibold line-clamp-1 group-hover:text-primary-600 transition-colors text-gray-900",
                  variant === 'detailed' ? "text-lg" : "text-base"
                )}>
                  {product.name}
                </h4>
                <p className={cn(
                  "text-gray-500",
                  variant === 'detailed' ? "text-sm mt-1" : "text-sm"
                )}>
                  <span className="font-medium">{product.brand}</span> • {product.category}
                </p>
                
                {variant === 'detailed' && (
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                      <Icons.Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                      <span className="text-xs text-gray-500">
                        ({product.reviewCount.toLocaleString()})
                      </span>
                    </div>
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      product.inStock 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    )}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Price */}
              <div className="text-right whitespace-nowrap">
                <div className={cn(
                  "font-bold text-gray-900",
                  variant === 'detailed' ? "text-xl" : "text-lg"
                )}>
                  ${product.price.toLocaleString()}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {variant === 'detailed' && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
                {product.tags.length > 3 && (
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full border border-gray-200">
                    +{product.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Trending Products Section - Updated styling
interface TrendingProductsProps {
  products: TrendingProduct[];
  onProductClick: (product: Product) => void;
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products, onProductClick }) => {
  const [activeTab, setActiveTab] = useState<'hot' | 'new' | 'bestseller'>('hot');

  const filteredProducts = useMemo(() => {
    return products.filter(product => product.trend === activeTab);
  }, [products, activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xl text-gray-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <Icons.TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span>Trending Now</span>
        </h3>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="h-10 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="hot" 
              className="text-sm px-4 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Icons.Flame className="w-4 h-4 mr-2" />
              Hot
            </TabsTrigger>
            <TabsTrigger 
              value="new" 
              className="text-sm px-4 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Icons.Sparkles className="w-4 h-4 mr-2" />
              New
            </TabsTrigger>
            <TabsTrigger 
              value="bestseller" 
              className="text-sm px-4 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Icons.Crown className="w-4 h-4 mr-2" />
              Bestseller
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredProducts.slice(0, 4).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
            variant="detailed"
          />
        ))}
      </div>
    </div>
  );
};

// Search Suggestions Component - Updated styling
interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (query: string) => void;
  popularSearches: string[];
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSelect,
  popularSearches
}) => {
  if (suggestions.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => onSelect(search)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors duration-200 border border-gray-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 text-lg">Search Suggestions</h3>
      <div className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors duration-200 group"
          >
            <Icons.Search className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
            <span className="text-gray-700 group-hover:text-primary-600">{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Search History Component - Updated styling
interface SearchHistoryProps {
  history: SearchHistory[];
  onSelect: (query: string) => void;
  onClear: () => void;
  onRemove: (id: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelect,
  onClear,
  onRemove
}) => {
  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (history.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-lg">
          <Icons.Clock className="w-5 h-5 text-primary-600" />
          Recent Searches
        </h3>
        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100"
            onClick={() => onSelect(item.query)}
          >
            <div className="flex items-center gap-3">
              <Icons.Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{item.query}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {formatTimeAgo(item.timestamp)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Icons.X className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Search Results Component - Updated styling
interface SearchResultsProps {
  results: Product[];
  query: string;
  onProductClick: (product: Product) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query, onProductClick }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-full flex items-center justify-center">
          <Icons.Search className="w-10 h-10 text-primary-600" />
        </div>
        <h3 className="font-bold text-xl text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Sorry, we couldn't find any products matching "{query}"
        </p>
        <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
          Browse All Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xl text-gray-900">
          Search Results
          <span className="text-gray-500 font-normal ml-2">
            ({results.length} {results.length === 1 ? 'product' : 'products'})
          </span>
        </h3>
        <div className="px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
          "{query}"
        </div>
      </div>
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {results.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

// ==================== MAIN SEARCH COMPONENT ====================
const SearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([
    { id: "1", query: "iPhone 15", timestamp: new Date(Date.now() - 3600000) },
    { id: "2", query: "Wireless Headphones", timestamp: new Date(Date.now() - 7200000) },
    { id: "3", query: "Gaming Laptop", timestamp: new Date(Date.now() - 86400000) },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load initial data
  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  const loadInitialData = async () => {
    setIsLoadingTrending(true);
    try {
      const [trending, popular] = await Promise.all([
        fakeApiService.getTrendingProducts(),
        fakeApiService.getPopularSearches()
      ]);
      setTrendingProducts(trending);
      setPopularSearches(popular);
    } catch (error) {
      console.error("Failed to load initial data:", error);
    } finally {
      setIsLoadingTrending(false);
    }
  };

  // Handle search with debouncing
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        try {
          const [results, suggestions] = await Promise.all([
            fakeApiService.searchProducts(searchQuery),
            fakeApiService.getSearchSuggestions(searchQuery)
          ]);
          setSearchResults(results);
          setSearchSuggestions(suggestions);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setSearchSuggestions([]);
      }
    }, 200);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcut for escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      const newSearch: SearchHistory = {
        id: Date.now().toString(),
        query,
        timestamp: new Date(),
      };
      setSearchHistory(prev => [newSearch, ...prev.slice(0, 9)]);
      setSearchQuery(query);
    }
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    console.log("Product clicked:", product);
    // Navigate to product page in real app
    onClose();
  }, [onClose]);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  const removeSearchHistoryItem = useCallback((id: string) => {
    setSearchHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  const resetSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchSuggestions([]);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-0 gap-0 overflow-hidden border-0 rounded-2xl shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Product Search</DialogTitle>
          <DialogDescription>
            Search for products, brands, and categories. Use keyboard shortcuts for quick navigation.
          </DialogDescription>
        </DialogHeader>
        
        {/* Search Header - Updated to match landing page */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Icons.Search className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 pl-0 h-14 bg-transparent placeholder:text-gray-400"
                aria-label="Search products"
              />
              <div className="absolute left-0 right-0 -bottom-5">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full hover:bg-gray-100"
                  aria-label="Clear search"
                >
                  <Icons.X className="w-5 h-5 text-gray-500" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Search Content */}
        <ScrollArea className="max-h-[70vh]  bg-white">
          <div className="p-6">
            {isLoading ? (
              <SearchSkeleton />
            ) : searchQuery ? (
              <>
                {searchResults.length === 0 && searchSuggestions.length > 0 && (
                  <>
                    <SearchSuggestions
                      suggestions={searchSuggestions}
                      onSelect={handleSearch}
                      popularSearches={popularSearches}
                    />
                    <div className="my-6">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>
                  </>
                )}
                <SearchResults
                  results={searchResults}
                  query={searchQuery}
                  onProductClick={handleProductClick}
                />
              </>
            ) : (
              <>
                <SearchHistory
                  history={searchHistory}
                  onSelect={handleSearch}
                  onClear={clearSearchHistory}
                  onRemove={removeSearchHistoryItem}
                />
                
                {searchHistory.length > 0 && (
                  <div className="my-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  </div>
                )}
                
                {isLoadingTrending ? (
                  <SearchSkeleton />
                ) : trendingProducts.length > 0 && (
                  <TrendingProducts
                    products={trendingProducts}
                    onProductClick={handleProductClick}
                  />
                )}
                
                {trendingProducts.length > 0 && (
                  <div className="my-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  </div>
                )}
                
                <SearchSuggestions
                  suggestions={[]}
                  onSelect={handleSearch}
                  popularSearches={popularSearches}
                />
              </>
            )}
          </div>
        </ScrollArea>

        {/* Search Footer - Updated styling */}
        <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white rounded-lg text-xs font-medium border border-gray-300 shadow-sm">
                  ↑↓
                </kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white rounded-lg text-xs font-medium border border-gray-300 shadow-sm">
                  Enter
                </kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white rounded-lg text-xs font-medium border border-gray-300 shadow-sm">
                  Esc
                </kbd>
                <span>Close</span>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="h-9 px-4 text-gray-700 hover:bg-white/50"
            >
              <Icons.X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ==================== SEARCH ICON COMPONENT ====================
// Updated to match landing page header styling
export default function SearchIcon() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="relative p-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 rounded-full hover:bg-gray-100 group"
              aria-label="Search products"
            >
              <div className="relative">
                <Icons.Search className="w-5 h-5 transition-transform group-hover:scale-110" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 rounded-full transition-all duration-300" />
              </div>
              <kbd className="absolute -bottom-1 -right-1 text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                ⌘K
              </kbd>
            </button>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="bg-gray-900 text-white border-0"
            sideOffset={5}
          >
            <p className="font-medium">Search products (⌘K)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}