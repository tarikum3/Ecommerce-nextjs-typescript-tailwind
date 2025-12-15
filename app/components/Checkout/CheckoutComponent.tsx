"use client";

import React, { useState } from "react";
import {
  Lock,
  CreditCard,
//   Paypal,
  Wallet,
  Banknote,
  Truck,
  Package,
  Shield,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  Edit,
  Plus,
  FileText
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

interface CheckoutComponentProps {
  cart: Cart;
}

// ==================== INTERNAL COMPONENTS ====================

// Order Summary Component
const OrderSummary = ({ cart }: { cart: Cart }) => {
  const calculateTotals = () => {
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.variant.price * item.quantity);
    }, 0);

    const shipping = cart.deliveryMethod === 'express' ? 19.99 : 
                    cart.deliveryMethod === 'standard' ? 9.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32">
      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
        Order Summary
      </h2>

      {/* Items List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-500" />
            </div>
            <div className="flex-grow">
              <h4 className="font-medium text-gray-900 text-sm">{item.variant.product.name}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-500">
                  Qty: {item.quantity} × ${item.variant.price.toFixed(2)}
                </span>
                <span className="font-medium text-gray-900">
                  ${(item.variant.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">${totals.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">${totals.tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">${totals.total.toFixed(2)}</div>
            <div className="text-sm text-gray-500">{cart.currency || 'USD'}</div>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <Shield className="w-6 h-6 text-gray-600 mb-2" />
            <span className="text-xs text-gray-600">SSL Secure</span>
          </div>
          <div className="flex flex-col items-center">
            <Lock className="w-6 h-6 text-gray-600 mb-2" />
            <span className="text-xs text-gray-600">256-bit</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="w-6 h-6 text-gray-600 mb-2" />
            <span className="text-xs text-gray-600">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Methods Component
const PaymentMethods = ({ 
  selectedMethod, 
  onSelectMethod 
}: { 
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
}) => {
  const methods = [
    { id: 'credit_card', name: 'Credit Card', icon: <CreditCard className="w-5 h-5" /> },
    // { id: 'paypal', name: 'PayPal', icon: <Paypal className="w-5 h-5" /> },
    { id: 'apple_pay', name: 'Apple Pay', icon: <Wallet className="w-5 h-5" /> },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: <Banknote className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-primary-500" />
        Payment Method
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelectMethod(method.id)}
            className={cn(
              "p-4 border rounded-xl text-left transition-all duration-300",
              selectedMethod === method.id
                ? "border-primary-300 bg-gradient-to-r from-primary-50 to-primary-100"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "p-2 rounded-lg",
                  selectedMethod === method.id
                    ? "bg-primary-100 text-primary-600"
                    : "bg-gray-100 text-gray-600"
                )}>
                  {method.icon}
                </span>
                <span className="font-medium text-gray-900">{method.name}</span>
              </div>
              <div className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center",
                selectedMethod === method.id
                  ? "border-primary-500 bg-primary-500"
                  : "border-gray-300"
              )}>
                {selectedMethod === method.id && (
                  <CheckCircle className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Credit Card Form (shown when credit card is selected) */}
      {selectedMethod === 'credit_card' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Shipping/Delivery Component
const ShippingInfo = ({ cart }: { cart: Cart }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-bold text-gray-900">Shipping Information</h3>
        </div>
        <button className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Shipping Address</h4>
              <p className="text-gray-600 mt-1">
                {cart.address || 'No address provided'}
              </p>
              {cart.city && cart.postalCode && (
                <p className="text-gray-600">
                  {cart.city}, {cart.postalCode}
                </p>
              )}
              {cart.country && (
                <p className="text-gray-600">{cart.country}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Contact Information</h4>
              <div className="mt-2 space-y-1">
                {cart.firstName && cart.lastName && (
                  <p className="text-gray-600">
                    {cart.firstName} {cart.lastName}
                  </p>
                )}
                {cart.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{cart.email}</span>
                  </div>
                )}
                {cart.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{cart.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Delivery Method</h4>
              <div className="mt-2">
                {cart.deliveryMethod ? (
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900 font-medium capitalize">
                      {cart.deliveryMethod.replace('_', ' ')} Delivery
                    </span>
                    <span className="text-gray-500 text-sm">
                      {cart.deliveryMethod === 'express' ? '1-2 business days' : '3-5 business days'}
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-600">No delivery method selected</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Billing Information Component
const BillingInfo = ({ cart }: { cart: Cart }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary-500" />
        Billing Information
      </h3>

      <div className="space-y-4">
        {/* Billing Address */}
        {cart.billingAddress && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Billing Address</h4>
                <p className="text-gray-600 mt-1">{cart.billingAddress}</p>
                {cart.city && cart.postalCode && (
                  <p className="text-gray-600">
                    {cart.city}, {cart.postalCode}, {cart.country}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Billing Contact */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-500 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Billing Contact</h4>
              {cart.billingName && (
                <p className="text-gray-600">{cart.billingName}</p>
              )}
              {cart.billingEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{cart.billingEmail}</span>
                </div>
              )}
              {cart.companyName && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{cart.companyName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN CHECKOUT COMPONENT ====================
export default function CheckoutComponent({ cart }: CheckoutComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    cart.paymentMethod || 'credit_card'
  );

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.variant.price * item.quantity);
    }, 0);

    const shipping = cart.deliveryMethod === 'express' ? 19.99 : 
                    cart.deliveryMethod === 'standard' ? 9.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  const totals = calculateTotals();

  const handlePlaceOrder = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would process the order
      alert('Order placed successfully!');
      window.location.href = `/order-confirmation?cartId=${cart.id}`;
    }, 2000);
  };

  const handleContinueShopping = () => {
    window.location.href = '/products';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Pattern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-600/5 opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="w-24 h-1 bg-primary-600"></div>
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="w-24 h-1 bg-primary-600"></div>
              <div className="w-8 h-8 bg-white border-2 border-primary-600 text-primary-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between max-w-md mx-auto text-sm">
            <span className="text-primary-600 font-medium">Cart</span>
            <span className="text-primary-600 font-medium">Information</span>
            <span className="text-primary-600 font-medium">Payment</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">
            Complete your order with secure payment
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Form */}
          <div className="lg:w-2/3 space-y-8">
            {/* Shipping Information */}
            <ShippingInfo cart={cart} />

            {/* Payment Methods */}
            <PaymentMethods
              selectedMethod={selectedPaymentMethod}
              onSelectMethod={setSelectedPaymentMethod}
            />

            {/* Billing Information */}
            <BillingInfo cart={cart} />

            {/* Terms and Conditions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the Terms and Conditions and Privacy Policy. I understand that my 
                  personal data will be processed in accordance with the Privacy Policy.
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleContinueShopping}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading || cart.items.length === 0}
                className={cn(
                  "flex-1 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold text-lg shadow-sm hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center gap-3 group",
                  (isLoading || cart.items.length === 0) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Place Order • ${totals.total.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <OrderSummary cart={cart} />
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <Shield className="w-4 h-4" />
            <span>Your payment is secure and encrypted</span>
          </div>
          <p className="text-gray-500 text-xs mt-2 max-w-2xl mx-auto">
            We use industry-standard SSL encryption to protect your personal information. 
            Your payment details are never stored on our servers.
          </p>
        </div>
      </div>
    </main>
  );
}