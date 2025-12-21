



"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Check, 
  ChevronRight, 
  Shield, 
  Truck, 
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Minus,
  Plus,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  X,
  Loader2,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ==================== TYPES ====================
interface ProductVariant {
  id: string;
  color: {
    name: string;
    hex: string;
    image: string;
  };
  size: string;
  price: number;
  stock: number;
}

interface ProductReview {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface ProductSpec {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ProductFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  features: string[];
  specifications: ProductSpec[];
  variants: ProductVariant[];
  images: string[];
  reviews: ProductReview[];
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  sku: string;
  tags: string[];
  shippingInfo: {
    freeShipping: boolean;
    estimatedDelivery: string;
    returnPolicy: string;
  };
}

// ==================== FAKE API ====================
const fetchMoreReviews = async (
  productId: string,
  page: number,
  pageSize: number = 3
): Promise<ProductReview[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  const fakeAuthors = [
    "Alex Johnson", "Sam Wilson", "Taylor Smith", "Jordan Lee", "Casey Brown",
    "Morgan Davis", "Riley Miller", "Cameron Taylor", "Jamie Anderson", "Drew Martinez",
    "Blake Thomas", "Skylar White", "Quinn Harris", "Avery Clark", "Reese Lewis"
  ];
  
  const fakeComments = [
    "This product exceeded my expectations! The quality is outstanding and it arrived much faster than estimated.",
    "I've been using this for a month now and it's been absolutely perfect for my needs. Highly recommend!",
    "Good product overall, but there are some minor issues with the finishing that could be improved.",
    "Worth every penny! The craftsmanship is excellent and it looks even better in person than in the photos.",
    "I was hesitant at first because of the price, but after using it for two weeks, I can confidently say it's worth it.",
    "Perfect for my daily use. The ergonomics are well thought out and it's very comfortable to handle.",
    "The product is good, but the packaging could be better. Mine arrived with some minor scuffs.",
    "Absolutely love it! My friends have been asking where I got it from. Definitely a conversation starter.",
    "Good value for money. It does exactly what it promises and the quality is solid for the price point.",
    "I've tried similar products before, but this one stands out with its attention to detail and premium feel.",
    "The customer service was excellent when I had questions about the product. Great experience overall!",
    "It's decent, but I expected a bit more based on the marketing photos. Still, it serves its purpose well.",
    "This has become my go-to product. The durability is impressive and it still looks new after heavy use.",
    "Shipping was faster than expected and the product was well-protected. Very satisfied with my purchase.",
    "The attention to detail is remarkable. You can tell a lot of thought went into the design and manufacturing."
  ];
  
  return Array.from({ length: pageSize }, (_, i) => {
    const authorIndex = (page * pageSize + i) % fakeAuthors.length;
    const commentIndex = (page * pageSize + i) % fakeComments.length;
    
    return {
      id: `review-${productId}-${page}-${i}`,
      author: fakeAuthors[authorIndex],
      initials: fakeAuthors[authorIndex].split(' ').map(n => n[0]).join(''),
      rating: Math.floor(Math.random() * 2) + 4, // Mostly 4-5 stars
      date: `${Math.floor(Math.random() * 12) + 1} months ago`,
      comment: fakeComments[commentIndex],
      verified: Math.random() > 0.3 // 70% verified
    };
  });
};

// ==================== MAIN COMPONENT ====================
interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // State management
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size);
  const [selectedColor, setSelectedColor] = useState(product.variants[0].color.name);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });
  
  // Reviews state with load more button
  const [reviews, setReviews] = useState<ProductReview[]>(product.reviews);
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Handle quantity changes
  const increaseQuantity = useCallback(() => {
    if (quantity < selectedVariant.stock) {
      setQuantity(prev => prev + 1);
    }
  }, [quantity, selectedVariant.stock]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }, [quantity]);

  // Handle variant selection
  const handleColorSelect = useCallback((colorName: string) => {
    const variant = product.variants.find(v => v.color.name === colorName && v.size === selectedSize) 
                  || product.variants.find(v => v.color.name === colorName);
    if (variant) {
      setSelectedColor(colorName);
      setSelectedVariant(variant);
    }
  }, [product.variants, selectedSize]);

  const handleSizeSelect = useCallback((size: string) => {
    const variant = product.variants.find(v => v.size === size && v.color.name === selectedColor)
                  || product.variants.find(v => v.size === size);
    if (variant) {
      setSelectedSize(size);
      setSelectedVariant(variant);
    }
  }, [product.variants, selectedColor]);

  // Handle add to cart
  const handleAddToCart = useCallback(async () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsAddingToCart(false);
    setIsAddedToCart(true);
    
    // Show notification
    setNotification({
      show: true,
      message: `${quantity} × ${selectedColor} ${selectedSize} ${product.name} added to cart!`,
      type: 'success'
    });
    
    // Reset added state after 2 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  }, [quantity, selectedColor, selectedSize, product.name]);

  // Handle wishlist toggle
  const toggleWishlist = useCallback(() => {
    setIsWishlisted(prev => !prev);
    setNotification({
      show: true,
      message: isWishlisted 
        ? 'Removed from wishlist' 
        : 'Added to wishlist',
      type: 'success'
    });
  }, [isWishlisted]);

  // Toggle review expansion
  const toggleReview = useCallback((reviewId: string) => {
    setExpandedReviews(prev => 
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  }, []);

  // Load more reviews function
  const loadMoreReviews = useCallback(async () => {
    if (loadingReviews || !hasMoreReviews) return;
    
    setLoadingReviews(true);
    
    try {
      const newReviews = await fetchMoreReviews(product.id, reviewPage);
      
      if (newReviews.length > 0) {
        setReviews(prev => [...prev, ...newReviews]);
        setReviewPage(prev => prev + 1);
      } else {
        setHasMoreReviews(false);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      setNotification({
        show: true,
        message: 'Failed to load more reviews',
        type: 'error'
      });
    } finally {
      setLoadingReviews(false);
    }
  }, [reviewPage, loadingReviews, hasMoreReviews, product.id]);

  // Initialize with first variant
  useEffect(() => {
    setSelectedVariant(product.variants[0]);
    setSelectedColor(product.variants[0].color.name);
    setSelectedSize(product.variants[0].size);
    setSelectedImage(product.images[0]);
  }, [product]);

  // Hide notification after delay
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  // Reset reviews when product changes
  useEffect(() => {
    setReviews(product.reviews);
    setReviewPage(1);
    setHasMoreReviews(true);
    setExpandedReviews([]);
  }, [product]);

  // ==================== SUB-COMPONENTS ====================

  // Product Image Gallery Component
  const ProductImageGallery = () => (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible py-2 md:py-0 scrollbar-hide">
        {product.images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={cn(
              "flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:border-primary-400",
              selectedImage === img
                ? "border-primary-600 shadow-md"
                : "border-gray-200"
            )}
          >
            <Image
              src={img}
              alt={`${product.name} view ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 md:order-2 relative flex-1 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative aspect-square">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className={cn(
              "object-contain cursor-zoom-in transition-transform duration-300",
              isZoomed && "scale-150 cursor-zoom-out"
            )}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleWishlist}
              className={cn(
                "p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md transition-all duration-300 hover:scale-110",
                isWishlisted && "text-red-500"
              )}
            >
              <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
            </button>
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md transition-all duration-300 hover:scale-110"
            >
              {isZoomed ? (
                <ZoomOut className="w-5 h-5 text-gray-700" />
              ) : (
                <ZoomIn className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Color Selection Component
  const ColorSelector = () => {
    const uniqueColors = Array.from(
      new Map(product.variants.map(v => [v.color.name, v.color])).values()
    );

    return (
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
        <div className="flex gap-3">
          {uniqueColors.map(color => (
            <button
              key={color.name}
              onClick={() => handleColorSelect(color.name)}
              className={cn(
                "relative w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110",
                selectedColor === color.name
                  ? "border-primary-600 ring-2 ring-primary-100"
                  : "border-gray-300 hover:border-primary-400"
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {selectedColor === color.name && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Size Selection Component
  const SizeSelector = () => {
    const uniqueSizes = Array.from(new Set(product.variants.map(v => v.size)));

    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-900">Size</h3>
          <button className="text-sm text-primary-600 hover:text-primary-500 transition-colors">
            Size guide
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
          {uniqueSizes.map(size => {
            const variant = product.variants.find(v => 
              v.size === size && v.color.name === selectedColor
            );
            const isInStock = variant?.stock ? variant.stock > 0 : false;
            
            return (
              <button
                key={size}
                onClick={() => isInStock && handleSizeSelect(size)}
                className={cn(
                  "flex items-center justify-center h-12 rounded-lg border text-sm font-medium transition-all duration-300",
                  selectedSize === size
                    ? "bg-primary-600 text-white border-primary-600 shadow-md"
                    : isInStock
                    ? "border-gray-300 text-gray-700 hover:border-primary-400 hover:text-gray-900 hover:shadow-sm"
                    : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                )}
                disabled={!isInStock}
              >
                {size}
                {!isInStock && (
                  <span className="absolute -bottom-1 text-xs text-red-500">Out</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Quantity Selector Component
  const QuantitySelector = () => (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">Quantity</span>
        <span className="text-sm text-gray-500">
          {selectedVariant.stock} available
        </span>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            min="1"
            max={selectedVariant.stock}
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= selectedVariant.stock) {
                setQuantity(value);
              }
            }}
            className="w-16 h-12 text-center text-lg font-medium text-gray-900 border-0 focus:outline-none focus:ring-0 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={increaseQuantity}
            disabled={quantity >= selectedVariant.stock}
            className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">${selectedVariant.price.toFixed(2)}</span> each
        </div>
      </div>
    </div>
  );

  // Rating Component
  const RatingDisplay = () => (
    <div className="flex items-center gap-2 mt-3">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-5 h-5",
              i < Math.floor(product.rating)
                ? "fill-amber-400 text-amber-400"
              : i < product.rating
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300"
            )}
          />
        ))}
      </div>
      <span className="text-gray-600">
        {product.rating.toFixed(1)} ({product.reviewCount} reviews)
      </span>
    </div>
  );

  // Add to Cart Button Component
  const AddToCartButton = () => (
    <button
      onClick={handleAddToCart}
      disabled={isAddingToCart || isAddedToCart || selectedVariant.stock === 0}
      className={cn(
        "w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3",
        isAddingToCart
          ? "bg-primary-700 cursor-wait"
          : isAddedToCart
          ? "bg-green-600 hover:bg-green-700 shadow-lg"
          : selectedVariant.stock === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 hover:shadow-xl"
      )}
    >
      {isAddingToCart ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Adding to Cart...</span>
        </>
      ) : isAddedToCart ? (
        <>
          <CheckCircle className="w-5 h-5" />
          <span>Added to Cart!</span>
        </>
      ) : selectedVariant.stock === 0 ? (
        <span>Out of Stock</span>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart - ${(selectedVariant.price * quantity).toFixed(2)}</span>
        </>
      )}
    </button>
  );

  // Features Display Component
  const FeaturesDisplay = () => (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Features</h3>
      <ul className="space-y-3">
        {product.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  // Shipping Info Component
  const ShippingInfo = () => (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Truck className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {product.shippingInfo.freeShipping ? "Free Shipping" : "Standard Shipping"}
            </p>
            <p className="text-sm text-gray-500">{product.shippingInfo.estimatedDelivery}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Shield className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Secure Payment</p>
            <p className="text-sm text-gray-500">SSL encryption</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <RefreshCw className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Easy Returns</p>
            <p className="text-sm text-gray-500">{product.shippingInfo.returnPolicy}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Review Card Component
  const ReviewCard = ({ review }: { review: ProductReview }) => (
    <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-sm">{review.initials}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-900">{review.author}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
            </div>
            {review.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
      <p className={cn(
        "text-gray-700",
        !expandedReviews.includes(review.id) && "line-clamp-3"
      )}>
        {review.comment}
      </p>
      {review.comment.length > 200 && (
        <button
          onClick={() => toggleReview(review.id)}
          className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
        >
          {expandedReviews.includes(review.id) ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );

  // Reviews Component with Scrollable Reviews List
  const ReviewsSection = () => (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
      <p className="text-gray-600 mb-8">See what our customers are saying</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Review Summary - Fixed height, no scroll */}
        <div>
          <div className="flex items-center gap-6 mb-8">
            <div>
              <p className="text-5xl font-bold text-gray-900">{product.rating.toFixed(1)}</p>
            </div>
            <div>
              <RatingDisplay />
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4" />
                <span>92% of customers recommend this product</span>
              </div>
            </div>
          </div>
          
          <button className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
            Write a Review
          </button>
        </div>
        
        {/* Reviews List - Scrollable container */}
        <div className="relative">
          <div 
            className="space-y-6 h-[500px] overflow-y-auto pr-4 pb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            {/* Show all loaded reviews */}
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
            
            {/* Loading indicator when fetching more reviews */}
            {loadingReviews && (
              <div className="flex justify-center py-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading more reviews...</span>
                </div>
              </div>
            )}
            
            {/* End of reviews message */}
            {!hasMoreReviews && reviews.length > 0 && (
              <div className="text-center py-6 border-t border-gray-200">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">All reviews loaded</span>
                </div>
                <p className="text-gray-500 mt-2">
                  Showing all {reviews.length} reviews
                </p>
              </div>
            )}
          </div>
          
          {/* Load More Reviews Button - Fixed position below scrollable area */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            {hasMoreReviews ? (
              <button
                onClick={loadMoreReviews}
                disabled={loadingReviews}
                className={cn(
                  "w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2",
                  loadingReviews && "opacity-70 cursor-not-allowed"
                )}
              >
                {loadingReviews ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Load More Reviews</span>
                  </>
                )}
              </button>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  All reviews loaded • Showing {reviews.length} reviews
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Notification Component
  const Notification = () => (
    <div className={cn(
      "fixed top-24 right-6 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform",
      notification.show
        ? "translate-x-0 opacity-100"
        : "translate-x-full opacity-0",
      notification.type === 'success' 
        ? "bg-green-50 border border-green-200 text-green-800"
        : "bg-red-50 border border-red-200 text-red-800"
    )}>
      <div className="flex items-center gap-2">
        {notification.type === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <X className="w-5 h-5" />
        )}
        <span className="font-medium">{notification.message}</span>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      <Notification />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-700 transition-colors">Home</a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <a href="#" className="hover:text-gray-700 transition-colors">
                {product.category}
              </a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <a href="#" className="hover:text-gray-700 transition-colors">
                {product.brand}
              </a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <ProductImageGallery />
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="animate-slide-up">
              {/* Product Header */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  {product.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full">
                      Best Seller
                    </span>
                  )}
                  <span className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.brand}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <RatingDisplay />
              </div>

              {/* Price Display */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
              </div>

              {/* Color Selection */}
              <ColorSelector />

              {/* Size Selection */}
              <SizeSelector />

              {/* Quantity Selection */}
              <QuantitySelector />

              {/* Add to Cart Button */}
              <div className="mt-8">
                <AddToCartButton />
                
                {/* Buy Now Button */}
                <button className="w-full mt-3 py-4 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-3">
                  <span>Buy Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <FeaturesDisplay />

              {/* Shipping Info */}
              <ShippingInfo />
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mt-16 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-gray-100">
                <span className={cn(
                  "text-gray-600",
                  spec.highlight && "font-medium text-gray-900"
                )}>
                  {spec.label}
                </span>
                <span className="font-medium text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection />
      </div>
    </main>
  );
}