"use client";

import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

// ==================== TYPES ====================
interface WishlistItem {
  id: string;
  productId: string;
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
  addedAt: Date;
  notes?: string;
  tags: string[];
  size?: string;
  color?: string;
  variant?: string;
}

interface Wishlist {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
  isPublic: boolean;
  createdAt: Date;
  items: WishlistItem[];
  isDefault?: boolean;
}

// ==================== MOCK DATA ====================
const mockWishlists: Wishlist[] = [
  {
    id: "1",
    name: "My Favorites",
    description: "Items I love and want to purchase soon",
    itemCount: 8,
    isPublic: true,
    isDefault: true,
    createdAt: new Date(2024, 0, 15),
    items: [
      {
        id: "101",
        productId: "p1",
        name: "Minimalist Leather Watch",
        price: 249,
        originalPrice: 299,
        image: "/products/watch.jpg",
        category: "Accessories",
        brand: "Nordic",
        inStock: true,
        rating: 4.8,
        reviewCount: 342,
        discount: 17,
        addedAt: new Date(2024, 1, 10),
        notes: "Perfect for everyday wear",
        tags: ["Minimalist", "Leather", "Classic"],
        color: "Black",
      },
      {
        id: "102",
        productId: "p2",
        name: "Organic Cotton T-Shirt",
        price: 39,
        image: "/products/tshirt.jpg",
        category: "Clothing",
        brand: "Everlane",
        inStock: true,
        rating: 4.5,
        reviewCount: 189,
        addedAt: new Date(2024, 1, 5),
        tags: ["Organic", "Sustainable", "Basic"],
        size: "M",
        color: "White",
      },
      {
        id: "103",
        productId: "p3",
        name: "Wireless Noise Cancelling Headphones",
        price: 299,
        originalPrice: 349,
        image: "/products/headphones.jpg",
        category: "Electronics",
        brand: "Sony",
        inStock: false,
        rating: 4.7,
        reviewCount: 1289,
        discount: 15,
        addedAt: new Date(2024, 0, 28),
        notes: "Wait for restock notification",
        tags: ["Wireless", "Noise Cancelling", "Premium"],
      },
    ],
  },
  {
    id: "2",
    name: "Summer Wardrobe",
    description: "Clothes for the upcoming summer season",
    itemCount: 12,
    isPublic: true,
    createdAt: new Date(2024, 1, 1),
    items: [
      {
        id: "201",
        productId: "p4",
        name: "Linen Button-Down Shirt",
        price: 89,
        image: "/products/shirt.jpg",
        category: "Clothing",
        brand: "Uniqlo",
        inStock: true,
        rating: 4.6,
        reviewCount: 456,
        addedAt: new Date(2024, 1, 15),
        tags: ["Linen", "Summer", "Casual"],
        size: "L",
        color: "Light Blue",
      },
      {
        id: "202",
        productId: "p5",
        name: "Straw Panama Hat",
        price: 65,
        originalPrice: 85,
        image: "/products/hat.jpg",
        category: "Accessories",
        brand: "Brixton",
        inStock: true,
        rating: 4.3,
        reviewCount: 123,
        discount: 24,
        addedAt: new Date(2024, 1, 12),
        tags: ["Summer", "Hat", "Beach"],
        color: "Natural",
      },
    ],
  },
  {
    id: "3",
    name: "Home Office Setup",
    description: "Items for my home office renovation",
    itemCount: 6,
    isPublic: false,
    createdAt: new Date(2024, 0, 20),
    items: [
      {
        id: "301",
        productId: "p6",
        name: "Ergonomic Office Chair",
        price: 499,
        originalPrice: 599,
        image: "/products/chair.jpg",
        category: "Furniture",
        brand: "Herman Miller",
        inStock: true,
        rating: 4.9,
        reviewCount: 892,
        discount: 17,
        addedAt: new Date(2024, 0, 25),
        notes: "Check for Black Friday deal",
        tags: ["Ergonomic", "Office", "Premium"],
        color: "Graphite",
      },
    ],
  },
];

const mockSuggestedItems: WishlistItem[] = [
  {
    id: "s1",
    productId: "p7",
    name: "Ceramic Coffee Mug Set",
    price: 45,
    image: "/products/mug.jpg",
    category: "Home",
    brand: "Muji",
    inStock: true,
    rating: 4.4,
    reviewCount: 234,
    addedAt: new Date(2024, 1, 18),
    tags: ["Home", "Kitchen", "Ceramic"],
  },
  {
    id: "s2",
    productId: "p8",
    name: "Waterproof Backpack",
    price: 129,
    originalPrice: 159,
    image: "/products/backpack.jpg",
    category: "Bags",
    brand: "Fjällräven",
    inStock: true,
    rating: 4.7,
    reviewCount: 567,
    discount: 19,
    addedAt: new Date(2024, 1, 16),
    tags: ["Waterproof", "Travel", "Durable"],
    color: "Forest Green",
  },
];

// ==================== COMPONENTS ====================

// Wishlist Item Card - Updated to match landing page style
interface WishlistItemCardProps {
  item: WishlistItem;
  onRemove: (id: string) => void;
  onAddToCart: (item: WishlistItem) => void;
  onEditNotes: (item: WishlistItem) => void;
  onMove: (item: WishlistItem) => void;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({
  item,
  onRemove,
  onAddToCart,
  onEditNotes,
  onMove,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="group product-card hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image/Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-gray-100 flex items-center justify-center">
              <Icons.Package className="w-10 h-10 text-primary-600" />
            </div>
            {item.discount && (
              <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                -{item.discount}%
              </div>
            )}
            {!item.inStock && (
              <div className="absolute inset-0 bg-gray-900/40 rounded-lg flex items-center justify-center">
                <Badge className="bg-gray-900/90 text-white border-0">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">{item.brand}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{item.category}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icons.MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onEditNotes(item)}>
                        <Icons.Edit className="mr-2 h-4 w-4" />
                        Edit Notes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onMove(item)}>
                        <Icons.Folder className="mr-2 h-4 w-4" />
                        Move to List
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onRemove(item.id)}
                        className="text-red-600"
                      >
                        <Icons.Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Variant Info */}
                {(item.size || item.color) && (
                  <div className="flex items-center gap-3 mt-2">
                    {item.size && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Size:</span>
                        <span className="text-sm font-medium text-gray-900">{item.size}</span>
                      </div>
                    )}
                    {item.color && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Color:</span>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.color.toLowerCase() }}
                          />
                          <span className="text-sm font-medium text-gray-900">{item.color}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Notes */}
                {item.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Icons.StickyNote className="h-4 w-4 text-primary-600" />
                      <span className="font-medium">Note:</span>
                      <span className="line-clamp-2">{item.notes}</span>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs font-normal text-gray-600 bg-gray-50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <div className="font-bold text-gray-900 text-lg">
                        ${item.price.toLocaleString()}
                      </div>
                      {item.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">
                          ${item.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                      <Icons.Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                      <span className="text-xs text-gray-500">
                        ({item.reviewCount.toLocaleString()})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      disabled={!item.inStock}
                      onClick={() => onAddToCart(item)}
                    >
                      <Icons.ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full"
                            onClick={() => onRemove(item.id)}
                          >
                            <Icons.Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove from wishlist</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>

            {/* Added Date */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icons.Calendar className="h-4 w-4" />
                <span>Added {formatDate(item.addedAt)}</span>
              </div>
              {item.inStock ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
                  <Icons.Check className="mr-1 h-3 w-3" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="text-gray-500">
                  <Icons.Clock className="mr-1 h-3 w-3" />
                  Restocking Soon
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Wishlist Header
interface WishlistHeaderProps {
  wishlist: Wishlist;
  onEdit: () => void;
  onShare: () => void;
  onDelete: () => void;
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({
  wishlist,
  onEdit,
  onShare,
  onDelete,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
            <Icons.Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">{wishlist.name}</h1>
              {wishlist.isPublic ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
                  <Icons.Globe className="mr-1 h-3 w-3" />
                  Public
                </Badge>
              ) : (
                <Badge variant="outline" className="text-gray-500">
                  <Icons.Lock className="mr-1 h-3 w-3" />
                  Private
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mt-2">{wishlist.description}</p>
            <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Icons.Package className="h-4 w-4" />
                <span>{wishlist.itemCount} items</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Calendar className="h-4 w-4" />
                <span>Created {wishlist.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Icons.MoreHorizontal className="h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onEdit}>
                <Icons.Edit className="mr-2 h-4 w-4" />
                Edit Wishlist
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onShare}>
                <Icons.Share2 className="mr-2 h-4 w-4" />
                Share Wishlist
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {!wishlist.isDefault && (
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Icons.Trash2 className="mr-2 h-4 w-4" />
                  Delete Wishlist
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
            <Icons.ShoppingCart className="h-4 w-4" />
            Add All to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

// Wishlist Sidebar
interface WishlistSidebarProps {
  wishlists: Wishlist[];
  activeWishlistId: string;
  onSelectWishlist: (id: string) => void;
  onCreateWishlist: () => void;
}

const WishlistSidebar: React.FC<WishlistSidebarProps> = ({
  wishlists,
  activeWishlistId,
  onSelectWishlist,
  onCreateWishlist,
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Your Wishlists</h3>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={onCreateWishlist}
            >
              <Icons.Plus className="h-4 w-4" />
              New
            </Button>
          </div>
          <div className="space-y-2">
            {wishlists.map((wishlist) => (
              <button
                key={wishlist.id}
                onClick={() => onSelectWishlist(wishlist.id)}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-all duration-200",
                  activeWishlistId === wishlist.id
                    ? "bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200"
                    : "hover:bg-gray-50 border border-transparent"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      activeWishlistId === wishlist.id
                        ? "bg-gradient-to-br from-primary-500 to-primary-600"
                        : "bg-gray-100"
                    )}>
                      <Icons.Heart className={cn(
                        "h-5 w-5",
                        activeWishlistId === wishlist.id
                          ? "text-white"
                          : "text-gray-600"
                      )} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{wishlist.name}</div>
                      <div className="text-sm text-gray-500">
                        {wishlist.itemCount} items
                      </div>
                    </div>
                  </div>
                  {wishlist.isDefault && (
                    <Badge variant="outline" className="text-xs">
                      Default
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Suggested Items
interface SuggestedItemsProps {
  items: WishlistItem[];
  onAdd: (item: WishlistItem) => void;
}

const SuggestedItems: React.FC<SuggestedItemsProps> = ({ items, onAdd }) => {
  if (items.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <Icons.Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-xl text-gray-900">You Might Also Like</h3>
        </div>
        <Button variant="ghost" className="gap-2">
          View All
          <Icons.ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="group hover:shadow-md transition-all duration-300 border border-gray-200"
          >
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/10 to-primary-600/10 flex items-center justify-center">
                      <Icons.Package className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onAdd(item)}
                  >
                    <Icons.Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-bold text-gray-900">
                      ${item.price.toLocaleString()}
                    </div>
                    {item.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">
                        ${item.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Stats Overview
const WishlistStats: React.FC<{ wishlists: Wishlist[] }> = ({ wishlists }) => {
  const totalItems = wishlists.reduce((sum, list) => sum + list.itemCount, 0);
  const totalValue = wishlists.reduce((sum, list) => 
    sum + list.items.reduce((itemSum, item) => itemSum + item.price, 0), 0
  );
  const inStockCount = wishlists.reduce((sum, list) => 
    sum + list.items.filter(item => item.inStock).length, 0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Icons.Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Icons.DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ${totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Icons.CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{inStockCount}</div>
              <div className="text-sm text-gray-600">Available Now</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ==================== MAIN WISHLIST PAGE ====================
const WishlistPage: React.FC = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>(mockWishlists);
  const [activeWishlistId, setActiveWishlistId] = useState<string>("1");
  const [suggestedItems] = useState<WishlistItem[]>(mockSuggestedItems);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'items' | 'suggestions'>('items');

  const activeWishlist = wishlists.find(w => w.id === activeWishlistId) || wishlists[0];

  // Load wishlists on mount
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRemoveItem = (itemId: string) => {
    setWishlists(prev => prev.map(wishlist => {
      if (wishlist.id === activeWishlistId) {
        return {
          ...wishlist,
          items: wishlist.items.filter(item => item.id !== itemId),
          itemCount: wishlist.items.length - 1,
        };
      }
      return wishlist;
    }));
  };

  const handleAddToCart = (item: WishlistItem) => {
    console.log("Adding to cart:", item);
    // Implement cart logic
  };

  const handleEditNotes = (item: WishlistItem) => {
    console.log("Edit notes for:", item);
    // Implement notes editing
  };

  const handleMoveItem = (item: WishlistItem) => {
    console.log("Move item:", item);
    // Implement move to another wishlist
  };

  const handleAddSuggestedItem = (item: WishlistItem) => {
    const newItem: WishlistItem = {
      ...item,
      id: `new-${Date.now()}`,
      addedAt: new Date(),
    };
    
    setWishlists(prev => prev.map(wishlist => {
      if (wishlist.id === activeWishlistId) {
        return {
          ...wishlist,
          items: [...wishlist.items, newItem],
          itemCount: wishlist.items.length + 1,
        };
      }
      return wishlist;
    }));
  };

  const handleCreateWishlist = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEditWishlist = () => {
    setIsEditDialogOpen(true);
  };

  const handleShareWishlist = () => {
    setIsShareDialogOpen(true);
  };

  const handleDeleteWishlist = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteWishlist = () => {
    if (activeWishlist.isDefault) return;
    
    setWishlists(prev => prev.filter(w => w.id !== activeWishlistId));
    if (wishlists.length > 1) {
      const nextWishlist = wishlists.find(w => w.id !== activeWishlistId);
      if (nextWishlist) {
        setActiveWishlistId(nextWishlist.id);
      }
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Announcement Bar - Matching landing page */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 py-3 text-center text-sm text-white">
        <div className="container mx-auto px-4">
          <p className="inline-flex items-center gap-2 animate-pulse">
            <Icons.Gift className="w-4 h-4" />
            ❤️ Share your wishlist with friends and family! Perfect for birthdays and holidays.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <WishlistStats wishlists={wishlists} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <WishlistSidebar
              wishlists={wishlists}
              activeWishlistId={activeWishlistId}
              onSelectWishlist={setActiveWishlistId}
              onCreateWishlist={handleCreateWishlist}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Wishlist Header */}
            <WishlistHeader
              wishlist={activeWishlist}
              onEdit={handleEditWishlist}
              onShare={handleShareWishlist}
              onDelete={handleDeleteWishlist}
            />

            <Separator />

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <div className="flex items-center justify-between">
                <TabsList className="bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="items" 
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm px-6"
                  >
                    <Icons.Package className="mr-2 h-4 w-4" />
                    Items ({activeWishlist.items.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="suggestions" 
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm px-6"
                  >
                    <Icons.Sparkles className="mr-2 h-4 w-4" />
                    Suggestions
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    Sort by: <span className="font-medium text-gray-900">Recently Added</span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icons.Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <TabsContent value="items" className="space-y-6 mt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-48 w-full rounded-xl" />
                    ))}
                  </div>
                ) : activeWishlist.items.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-full flex items-center justify-center">
                      <Icons.Heart className="w-12 h-12 text-primary-600" />
                    </div>
                    <h3 className="font-bold text-2xl text-gray-900 mb-3">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Start adding items you love! Browse our collection and click the heart icon to save items for later.
                    </p>
                    <Button className="gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                      <Icons.ShoppingBag className="h-4 w-4" />
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeWishlist.items.map((item) => (
                      <WishlistItemCard
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveItem}
                        onAddToCart={handleAddToCart}
                        onEditNotes={handleEditNotes}
                        onMove={handleMoveItem}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="suggestions" className="mt-6">
                <SuggestedItems
                  items={suggestedItems}
                  onAdd={handleAddSuggestedItem}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <CreateWishlistDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={(name, description) => {
          const newWishlist: Wishlist = {
            id: `wl-${Date.now()}`,
            name,
            description,
            itemCount: 0,
            isPublic: true,
            createdAt: new Date(),
            items: [],
          };
          setWishlists([...wishlists, newWishlist]);
          setActiveWishlistId(newWishlist.id);
          setIsCreateDialogOpen(false);
        }}
      />

      <EditWishlistDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        wishlist={activeWishlist}
        onSave={(name, description, isPublic) => {
          setWishlists(prev => prev.map(w => 
            w.id === activeWishlistId 
              ? { ...w, name, description, isPublic }
              : w
          ));
          setIsEditDialogOpen(false);
        }}
      />

      <ShareWishlistDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        wishlist={activeWishlist}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Wishlist</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{activeWishlist.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteWishlist}>
              Delete Wishlist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ==================== DIALOG COMPONENTS ====================

const CreateWishlistDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name, description);
      setName("");
      setDescription("");
      setIsPublic(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.Plus className="h-5 w-5" />
            Create New Wishlist
          </DialogTitle>
          <DialogDescription>
            Create a wishlist to save items you love.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-900">
              Name *
            </label>
            <Input
              id="name"
              placeholder="e.g., Birthday Wishlist, Home Decor Ideas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-900">
              Description (Optional)
            </label>
            <Textarea
              id="description"
              placeholder="Describe your wishlist..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Visibility</div>
              <div className="text-sm text-gray-600">
                {isPublic ? "Anyone with the link can view" : "Only you can view"}
              </div>
            </div>
            <Button
              type="button"
              variant={isPublic ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPublic(!isPublic)}
              className={cn(
                "gap-2",
                isPublic && "bg-gradient-to-r from-primary-500 to-primary-600"
              )}
            >
              {isPublic ? (
                <>
                  <Icons.Globe className="h-4 w-4" />
                  Public
                </>
              ) : (
                <>
                  <Icons.Lock className="h-4 w-4" />
                  Private
                </>
              )}
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary-500 to-primary-600">
              Create Wishlist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EditWishlistDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  wishlist: Wishlist;
  onSave: (name: string, description: string, isPublic: boolean) => void;
}> = ({ isOpen, onClose, wishlist, onSave }) => {
  const [name, setName] = useState(wishlist.name);
  const [description, setDescription] = useState(wishlist.description || "");
  const [isPublic, setIsPublic] = useState(wishlist.isPublic);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name, description, isPublic);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.Edit className="h-5 w-5" />
            Edit Wishlist
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="edit-name" className="text-sm font-medium text-gray-900">
              Name *
            </label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-description" className="text-sm font-medium text-gray-900">
              Description (Optional)
            </label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Visibility</div>
              <div className="text-sm text-gray-600">
                {isPublic ? "Anyone with the link can view" : "Only you can view"}
              </div>
            </div>
            <Button
              type="button"
              variant={isPublic ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPublic(!isPublic)}
              className={cn(
                "gap-2",
                isPublic && "bg-gradient-to-r from-primary-500 to-primary-600"
              )}
            >
              {isPublic ? (
                <>
                  <Icons.Globe className="h-4 w-4" />
                  Public
                </>
              ) : (
                <>
                  <Icons.Lock className="h-4 w-4" />
                  Private
                </>
              )}
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary-500 to-primary-600">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ShareWishlistDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  wishlist: Wishlist;
}> = ({ isOpen, onClose, wishlist }) => {
  const shareLink = `https://stylehub.com/wishlist/${wishlist.id}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.Share2 className="h-5 w-5" />
            Share Wishlist
          </DialogTitle>
          <DialogDescription>
            Share your "{wishlist.name}" wishlist with friends and family.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-900 truncate mr-4">{shareLink}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Icons.Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Icons.Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <Icons.MessageSquare className="h-4 w-4" />
              Message
            </Button>
            <Button variant="outline" className="gap-2">
              <Icons.Mail className="h-4 w-4" />
              Email
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-medium text-gray-900 mb-2">Visibility:</div>
            <div className="flex items-center gap-2">
              {wishlist.isPublic ? (
                <>
                  <Icons.Globe className="h-4 w-4 text-green-600" />
                  <span>Public - Anyone with the link can view</span>
                </>
              ) : (
                <>
                  <Icons.Lock className="h-4 w-4 text-gray-600" />
                  <span>Private - Only you can view</span>
                </>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistPage;