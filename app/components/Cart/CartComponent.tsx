"use client";

import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Package,
  Truck,
  Shield,
  Lock,
  ArrowLeft,
  ChevronUp,
  X,
  Star,
  Heart,
  Eye,
  Share2,
  Clock,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== TYPES ====================
// Based on your Prisma models
interface ProductVariant {
  id: string;
  product: Product;
  price: number;
  sku?: string;
  attributes: Record<string, string>;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  specifications: Record<string, string>;
}

interface CartItem {
  id: string;
  quantity: number;
  cartId: string;
  variantId: string;
  variant: ProductVariant;
  createdAt: Date;
  updatedAt: Date;
}

interface Cart {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  address?: string | null;
  billingAddress?: string | null;
  billingCompanyName?: string | null;
  billingEmail?: string | null;
  billingName?: string | null;
  city?: string | null;
  companyName?: string | null;
  country?: string | null;
  currency?: string | null;
  deliveryMethod?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  paymentMethod?: string | null;
  phone?: string | null;
  postalCode?: string | null;
  step?: string | null;
  subtotalPrice?: number | null;
  totalPrice?: number | null;
  userId: string;
  customerId?: string | null;
  items: CartItem[];
}

interface CartComponentProps {
  cart: Cart;
}

// ==================== INTERNAL COMPONENTS ====================

// Cart Item Component
const CartItemComponent = ({ 
  cartItem, 
  onUpdateQuantity,
  onRemove 
}: { 
  cartItem: CartItem;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemove: (cartItemId: string) => void;
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const product = cartItem.variant.product;
  const variant = cartItem.variant;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10 || isUpdating) return;
    
    setIsUpdating(true);
    try {
      onUpdateQuantity(cartItem.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      setTimeout(() => {
        onRemove(cartItem.id);
        setIsRemoving(false);
      }, 300);
    } catch (error) {
      setIsRemoving(false);
    }
  };

  const itemTotal = variant.price * cartItem.quantity;

  return (
    <div
      className={cn(
        "group relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-500",
        isRemoving && "opacity-0 -translate-x-4",
        !isRemoving && "hover:shadow-xl hover:border-gray-200 hover:-translate-y-1"
      )}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {product.isBestSeller && (
          <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            Best Seller
          </span>
        )}
        {product.isNew && (
          <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            New
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <div className="w-full md:w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
              <ShoppingBag className="w-12 h-12 text-primary-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.brand}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3 h-3",
                        i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Variant Attributes */}
              {Object.keys(variant.attributes).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.entries(variant.attributes).map(([key, value]) => (
                    <span key={key} className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}

              {/* Price per unit */}
              <div className="mb-4">
                <span className="text-lg font-semibold text-gray-900">
                  ${variant.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 ml-2">each</span>
              </div>
            </div>

            {/* Quantity Controls and Total */}
            <div className="flex flex-col items-end gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  ${itemTotal.toFixed(2)}
                </div>
                <span className="text-sm text-gray-500">
                  ${variant.price.toFixed(2)} × {cartItem.quantity}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(cartItem.quantity - 1)}
                    disabled={cartItem.quantity <= 1 || isUpdating}
                    className={cn(
                      "p-2 text-gray-600 hover:text-gray-900 transition-colors",
                      (cartItem.quantity <= 1 || isUpdating) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-gray-900 font-medium min-w-[60px] text-center">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(cartItem.quantity + 1)}
                    disabled={cartItem.quantity >= 10 || isUpdating}
                    className={cn(
                      "p-2 text-gray-600 hover:text-gray-900 transition-colors",
                      (cartItem.quantity >= 10 || isUpdating) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className={cn(
                    "p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 group",
                    isRemoving && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Summary Component
const CartSummary = ({ 
  subtotal, 
  shipping, 
  tax, 
  total, 
  isLoading,
  onCheckout 
}: { 
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isLoading: boolean;
  onCheckout: () => void;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32">
      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
      
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <div className="flex items-center gap-2">
            {shipping === 0 ? (
              <span className="font-medium text-green-600">FREE</span>
            ) : (
              <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={isLoading}
        className={cn(
          "w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold text-lg shadow-sm hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center gap-3 group",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Proceed to Secure Checkout</span>
            <ChevronUp className="w-5 h-5 transform rotate-90 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {/* Security Badges */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <Shield className="w-6 h-6 text-gray-600 mb-2" />
            <span className="text-xs text-gray-600">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Package className="w-6 h-6 text-gray-600 mb-2" />
            <span className="text-xs text-gray-600">Free Returns</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Truck className="w-6 h-6 text-gray-600 mb-2" />
            <span className="text-xs text-gray-600">Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty Cart Component
const EmptyCart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingBag className="w-12 h-12 text-primary-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => window.location.href = '/products'}
          className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

// ==================== MAIN CART COMPONENT ====================
export default function CartComponent({ cart }: CartComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [localCart, setLocalCart] = useState<Cart>(cart);

  // Update local cart when prop changes
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  // Calculate cart totals
  const calculateCartTotals = () => {
    const subtotal = localCart.items.reduce((sum, item) => {
      return sum + (item.variant.price * item.quantity);
    }, 0);

    const shipping = localCart.deliveryMethod === 'express' ? 19.99 : 
                    localCart.deliveryMethod === 'standard' ? 9.99 : 0;
    const tax = subtotal * 0.08; // 8% tax rate
    
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    };
  };

  const totals = calculateCartTotals();

  // Handle quantity update
  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    setLocalCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    }));
    
    // In a real app, you would make an API call here
    console.log(`Updating quantity for item ${cartItemId} to ${quantity}`);
  };

  // Handle item removal
  const handleRemoveItem = (cartItemId: string) => {
    setLocalCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== cartItemId)
    }));
    
    // In a real app, you would make an API call here
    console.log(`Removing item ${cartItemId}`);
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, redirect to checkout page
      window.location.href = `/checkout/${localCart.id}`;
    }, 1000);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    window.location.href = '/products';
  };

  // Scroll listener for mobile summary
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 200;
      setShowMobileSummary(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (localCart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Pattern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-600/5 opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Page Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {localCart.items.length} {localCart.items.length === 1 ? "item" : "items"} in your cart
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Updated just now</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            {/* Cart Items List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Items in Cart</h2>
                <div className="text-sm text-gray-600">
                  Subtotal: <span className="font-bold text-gray-900">${totals.subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-6">
                {localCart.items.map(item => (
                  <CartItemComponent
                    key={item.id}
                    cartItem={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Continue Shopping Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleContinueShopping}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary (Desktop) */}
          <div className="hidden lg:block lg:w-1/3">
            <CartSummary
              subtotal={totals.subtotal}
              shipping={totals.shipping}
              tax={totals.tax}
              total={totals.total}
              isLoading={isLoading}
              onCheckout={handleCheckout}
            />
          </div>
        </div>

        {/* Mobile Cart Summary (Fixed at Bottom) */}
        {showMobileSummary && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl lg:hidden z-50 animate-slide-up">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-xl font-bold text-gray-900">
                    ${totals.total.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className={cn(
                    "px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Checkout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}