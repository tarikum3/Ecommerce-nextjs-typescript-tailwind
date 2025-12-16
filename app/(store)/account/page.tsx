// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   User,
//   Settings,
//   ShoppingBag,
//   Heart,
//   MapPin,
//   CreditCard,
//   Bell,
//   Shield,
//   LogOut,
//   Edit,
//   Check,
//   X,
//   ChevronRight,
//   Star,
//   Package,
//   Clock,
//   Truck,
//   CheckCircle,
//   AlertCircle,
//   Plus,
//   Trash2,
//   Eye,
//   EyeOff,
//   Lock,
//   Mail,
//   Phone,
//   Calendar,
//   Gift,
//   TrendingUp,
//   Download,
//   Share2,
//   MessageSquare,
//   HelpCircle,
//   FileText,
//   Globe,
//   Moon,
//   Sun
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // ==================== TYPES ====================
// interface Order {
//   id: string;
//   date: string;
//   total: number;
//   status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
//   items: number;
//   trackingNumber?: string;
//   estimatedDelivery?: string;
// }

// interface WishlistItem {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   brand: string;
//   inStock: boolean;
//   addedDate: string;
// }

// interface Address {
//   id: string;
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   phone: string;
//   isDefault: boolean;
// }

// interface PaymentMethod {
//   id: string;
//   type: 'card' | 'paypal';
//   lastFour?: string;
//   expiry?: string;
//   isDefault: boolean;
//   name: string;
// }

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   time: string;
//   read: boolean;
//   type: 'order' | 'promotion' | 'security' | 'system';
// }

// // ==================== COMPONENTS ====================

// // 1. User Profile Card Component
// const UserProfileCard = ({
//   user,
//   onEditProfile,
//   isEditing,
//   editedProfile,
//   onSaveProfile,
//   onCancelEdit,
//   onProfileChange
// }: {
//   user: any;
//   onEditProfile: () => void;
//   isEditing: boolean;
//   editedProfile: any;
//   onSaveProfile: () => void;
//   onCancelEdit: () => void;
//   onProfileChange: (field: string, value: string) => void;
// }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
//         {!isEditing && (
//           <button
//             onClick={onEditProfile}
//             className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all duration-300 group"
//           >
//             <Edit className="w-4 h-4" />
//             <span className="text-sm font-medium">Edit Profile</span>
//           </button>
//         )}
//       </div>

//       {isEditing ? (
//         <div className="space-y-4 animate-fade-in">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
//               <input
//                 type="text"
//                 value={editedProfile.firstName}
//                 onChange={(e) => onProfileChange('firstName', e.target.value)}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
//                 placeholder="Enter first name"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
//               <input
//                 type="text"
//                 value={editedProfile.lastName}
//                 onChange={(e) => onProfileChange('lastName', e.target.value)}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
//                 placeholder="Enter last name"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//             <div className="flex items-center gap-2">
//               <Mail className="w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 value={editedProfile.email}
//                 onChange={(e) => onProfileChange('email', e.target.value)}
//                 className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
//                 placeholder="Enter email"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//             <div className="flex items-center gap-2">
//               <Phone className="w-5 h-5 text-gray-400" />
//               <input
//                 type="tel"
//                 value={editedProfile.phone}
//                 onChange={(e) => onProfileChange('phone', e.target.value)}
//                 className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
//                 placeholder="Enter phone number"
//               />
//             </div>
//           </div>

//           <div className="pt-4 border-t border-gray-200">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 pr-12"
//                     placeholder="Enter current password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
//                 <input
//                   type="password"
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
//                   placeholder="Enter new password"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//             <button
//               onClick={onCancelEdit}
//               className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onSaveProfile}
//               className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           <div className="flex items-start gap-4">
//             <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
//               <User className="w-10 h-10 text-primary-600" />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
//               <p className="text-gray-600">{user.email}</p>
//               <p className="text-sm text-gray-500 mt-1">Member since {user.joinDate}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-gray-900">{user.orders}</div>
//               <div className="text-sm text-gray-600">Orders</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-gray-900">{user.wishlist}</div>
//               <div className="text-sm text-gray-600">Wishlist</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-gray-900">{user.reviews}</div>
//               <div className="text-sm text-gray-600">Reviews</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-gray-900">{user.points}</div>
//               <div className="text-sm text-gray-600">Points</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // 2. Order History Component
// const OrderHistory = ({ orders }: { orders: Order[] }) => {
//   const getStatusColor = (status: Order['status']) => {
//     switch (status) {
//       case 'processing': return 'bg-blue-100 text-blue-800';
//       case 'shipped': return 'bg-purple-100 text-purple-800';
//       case 'delivered': return 'bg-green-100 text-green-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (status: Order['status']) => {
//     switch (status) {
//       case 'processing': return <Package className="w-4 h-4" />;
//       case 'shipped': return <Truck className="w-4 h-4" />;
//       case 'delivered': return <CheckCircle className="w-4 h-4" />;
//       case 'cancelled': return <X className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-900">Order History</h2>
//         <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
//           View All
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>

//       <div className="space-y-4">
//         {orders.map(order => (
//           <div
//             key={order.id}
//             className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all duration-300 group"
//           >
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-2">
//                   <span className="font-medium text-gray-900">Order #{order.id}</span>
//                   <span className={cn("px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1", getStatusColor(order.status))}>
//                     {getStatusIcon(order.status)}
//                     {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                   </span>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   Placed on {order.date} • {order.items} items • ${order.total.toFixed(2)}
//                 </div>
//                 {order.trackingNumber && (
//                   <div className="text-sm text-gray-500 mt-1">
//                     Tracking: <span className="font-medium">{order.trackingNumber}</span>
//                   </div>
//                 )}
//               </div>
              
//               <div className="flex gap-2">
//                 <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all duration-300">
//                   View Details
//                 </button>
//                 {order.status === 'shipped' && (
//                   <button className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 text-sm font-medium transition-all duration-300">
//                     Track Order
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // 3. Wishlist Component
// const Wishlist = ({ items }: { items: WishlistItem[] }) => {
//   const [wishlistItems, setWishlistItems] = useState(items);

//   const removeFromWishlist = (id: string) => {
//     setWishlistItems(prev => prev.filter(item => item.id !== id));
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-900">My Wishlist</h2>
//         <span className="text-sm text-gray-600">{wishlistItems.length} items</span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {wishlistItems.map(item => (
//           <div
//             key={item.id}
//             className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all duration-300 group"
//           >
//             <div className="flex gap-3">
//               <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
//                 <ShoppingBag className="w-8 h-8 text-gray-400" />
//               </div>
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
//                     <p className="text-sm text-gray-500">{item.brand}</p>
//                   </div>
//                   <button
//                     onClick={() => removeFromWishlist(item.id)}
//                     className="text-gray-400 hover:text-red-500 transition-colors p-1"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 <div className="mt-2 flex items-center justify-between">
//                   <div>
//                     <span className="text-lg font-bold text-gray-900">${item.price}</span>
//                     {item.originalPrice && (
//                       <span className="text-sm text-gray-500 line-through ml-2">${item.originalPrice}</span>
//                     )}
//                   </div>
//                   <button className="px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 text-sm font-medium transition-all duration-300">
//                     Add to Cart
//                   </button>
//                 </div>
                
//                 <div className="mt-2 text-xs text-gray-500">
//                   Added on {item.addedDate}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // 4. Address Book Component
// const AddressBook = ({ addresses }: { addresses: Address[] }) => {
//   const [addressList, setAddressList] = useState(addresses);

//   const setDefaultAddress = (id: string) => {
//     setAddressList(prev => prev.map(addr => ({
//       ...addr,
//       isDefault: addr.id === id
//     })));
//   };

//   const deleteAddress = (id: string) => {
//     if (addressList.length > 1) {
//       setAddressList(prev => prev.filter(addr => addr.id !== id));
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-900">Address Book</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all duration-300">
//           <Plus className="w-4 h-4" />
//           <span className="text-sm font-medium">Add New Address</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {addressList.map(address => (
//           <div
//             key={address.id}
//             className={cn(
//               "border rounded-lg p-4 transition-all duration-300",
//               address.isDefault
//                 ? "border-primary-300 bg-gradient-to-r from-primary-50 to-primary-100"
//                 : "border-gray-200 hover:border-primary-300"
//             )}
//           >
//             <div className="flex justify-between items-start mb-3">
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-gray-500" />
//                 <span className="font-medium text-gray-900">{address.name}</span>
//                 {address.isDefault && (
//                   <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
//                     Default
//                   </span>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <button className="text-gray-400 hover:text-primary-600 p-1">
//                   <Edit className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => deleteAddress(address.id)}
//                   className="text-gray-400 hover:text-red-500 p-1"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="space-y-1 text-sm text-gray-600">
//               <p>{address.address}</p>
//               <p>{address.city}, {address.state} {address.zipCode}</p>
//               <p>{address.country}</p>
//               <p className="pt-2 border-t border-gray-200">{address.phone}</p>
//             </div>
            
//             {!address.isDefault && (
//               <button
//                 onClick={() => setDefaultAddress(address.id)}
//                 className="mt-4 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all duration-300"
//               >
//                 Set as Default
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // 5. Payment Methods Component
// const PaymentMethods = ({ methods }: { methods: PaymentMethod[] }) => {
//   const [paymentMethods, setPaymentMethods] = useState(methods);

//   const setDefaultMethod = (id: string) => {
//     setPaymentMethods(prev => prev.map(method => ({
//       ...method,
//       isDefault: method.id === id
//     })));
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all duration-300">
//           <Plus className="w-4 h-4" />
//           <span className="text-sm font-medium">Add New Card</span>
//         </button>
//       </div>

//       <div className="space-y-4">
//         {paymentMethods.map(method => (
//           <div
//             key={method.id}
//             className={cn(
//               "border rounded-lg p-4 transition-all duration-300",
//               method.isDefault
//                 ? "border-primary-300 bg-gradient-to-r from-primary-50 to-primary-100"
//                 : "border-gray-200 hover:border-primary-300"
//             )}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
//                   <CreditCard className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <div className="font-medium text-gray-900">{method.name}</div>
//                   {method.type === 'card' && (
//                     <div className="text-sm text-gray-600">
//                       **** **** **** {method.lastFour} • Expires {method.expiry}
//                     </div>
//                   )}
//                   {method.type === 'paypal' && (
//                     <div className="text-sm text-gray-600">PayPal account</div>
//                   )}
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 {method.isDefault ? (
//                   <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
//                     Default
//                   </span>
//                 ) : (
//                   <button
//                     onClick={() => setDefaultMethod(method.id)}
//                     className="text-sm text-primary-600 hover:text-primary-700 font-medium"
//                   >
//                     Set as Default
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // 6. Account Settings Component
// const AccountSettings = () => {
//   const [settings, setSettings] = useState({
//     emailNotifications: true,
//     smsNotifications: false,
//     marketingEmails: true,
//     orderUpdates: true,
//     securityAlerts: true,
//     darkMode: false,
//     language: 'english',
//     currency: 'USD'
//   });

//   const toggleSetting = (key: keyof typeof settings) => {
//     if (typeof settings[key] === 'boolean') {
//       setSettings(prev => ({ ...prev, [key]: !prev[key] }));
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//       <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>

//       <div className="space-y-6">
//         <div>
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
//           <div className="space-y-3">
//             <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Bell className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <div className="font-medium text-gray-900">Email Notifications</div>
//                   <div className="text-sm text-gray-600">Receive order updates via email</div>
//                 </div>
//               </div>
//               <div className={cn(
//                 "w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300",
//                 settings.emailNotifications ? "bg-primary-500 justify-end" : "bg-gray-300 justify-start"
//               )}>
//                 <div className="w-4 h-4 bg-white rounded-full"></div>
//               </div>
//             </label>

//             <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <MessageSquare className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <div className="font-medium text-gray-900">SMS Notifications</div>
//                   <div className="text-sm text-gray-600">Receive SMS updates</div>
//                 </div>
//               </div>
//               <div className={cn(
//                 "w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300",
//                 settings.smsNotifications ? "bg-primary-500 justify-end" : "bg-gray-300 justify-start"
//               )}>
//                 <div className="w-4 h-4 bg-white rounded-full"></div>
//               </div>
//             </label>

//             <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300">
//               <div className="flex items-center gap-3">
//                 <Gift className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <div className="font-medium text-gray-900">Marketing Emails</div>
//                   <div className="text-sm text-gray-600">Receive promotions and offers</div>
//                 </div>
//               </div>
//               <div className={cn(
//                 "w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300",
//                 settings.marketingEmails ? "bg-primary-500 justify-end" : "bg-gray-300 justify-start"
//               )}>
//                 <div className="w-4 h-4 bg-white rounded-full"></div>
//               </div>
//             </label>
//           </div>
//         </div>

//         <div className="pt-6 border-t border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
//               <select
//                 value={settings.language}
//                 onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
//               >
//                 <option value="english">English</option>
//                 <option value="spanish">Spanish</option>
//                 <option value="french">French</option>
//                 <option value="german">German</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//               <select
//                 value={settings.currency}
//                 onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
//               >
//                 <option value="USD">USD - US Dollar</option>
//                 <option value="EUR">EUR - Euro</option>
//                 <option value="GBP">GBP - British Pound</option>
//                 <option value="CAD">CAD - Canadian Dollar</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== MAIN ACCOUNT PAGE ====================
// export default function AccountPage() {
//   // User data
//   const [user, setUser] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     joinDate: "January 2023",
//     orders: 12,
//     wishlist: 8,
//     reviews: 5,
//     points: 2450
//   });

//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [editedProfile, setEditedProfile] = useState({ ...user });

//   // Orders data
//   const orders: Order[] = [
//     {
//       id: "ORD-789456",
//       date: "2024-01-15",
//       total: 1299.99,
//       status: "delivered",
//       items: 2,
//       trackingNumber: "TRK-789456123",
//       estimatedDelivery: "2024-01-20"
//     },
//     {
//       id: "ORD-123456",
//       date: "2024-01-10",
//       total: 899.99,
//       status: "shipped",
//       items: 3,
//       trackingNumber: "TRK-123456789",
//       estimatedDelivery: "2024-01-18"
//     },
//     {
//       id: "ORD-987654",
//       date: "2024-01-05",
//       total: 459.99,
//       status: "processing",
//       items: 1
//     },
//     {
//       id: "ORD-456123",
//       date: "2023-12-28",
//       total: 1799.99,
//       status: "cancelled",
//       items: 4
//     }
//   ];

//   // Wishlist data
//   const wishlistItems: WishlistItem[] = [
//     {
//       id: "1",
//       name: "MacBook Pro 16-inch",
//       price: 2399,
//       originalPrice: 2599,
//       brand: "Apple",
//       image: "",
//       inStock: true,
//       addedDate: "2024-01-10"
//     },
//     {
//       id: "2",
//       name: "Wireless Noise Cancelling Headphones",
//       price: 299,
//       brand: "Sony",
//       image: "",
//       inStock: true,
//       addedDate: "2024-01-08"
//     },
//     {
//       id: "3",
//       name: "Smart Watch Series 8",
//       price: 399,
//       originalPrice: 449,
//       brand: "Apple",
//       image: "",
//       inStock: false,
//       addedDate: "2024-01-05"
//     }
//   ];

//   // Addresses data
//   const addresses: Address[] = [
//     {
//       id: "1",
//       name: "Home Address",
//       address: "123 Main Street",
//       city: "New York",
//       state: "NY",
//       zipCode: "10001",
//       country: "United States",
//       phone: "+1 (555) 123-4567",
//       isDefault: true
//     },
//     {
//       id: "2",
//       name: "Work Address",
//       address: "456 Business Ave",
//       city: "New York",
//       state: "NY",
//       zipCode: "10002",
//       country: "United States",
//       phone: "+1 (555) 987-6543",
//       isDefault: false
//     }
//   ];

//   // Payment methods data
//   const paymentMethods: PaymentMethod[] = [
//     {
//       id: "1",
//       type: "card",
//       name: "Visa ending in 4321",
//       lastFour: "4321",
//       expiry: "06/25",
//       isDefault: true
//     },
//     {
//       id: "2",
//       type: "card",
//       name: "Mastercard ending in 8765",
//       lastFour: "8765",
//       expiry: "12/24",
//       isDefault: false
//     },
//     {
//       id: "3",
//       type: "paypal",
//       name: "PayPal",
//       isDefault: false
//     }
//   ];

//   // Menu items
//   const menuItems = [
//     { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
//     { id: "orders", label: "Orders", icon: <ShoppingBag className="w-5 h-5" /> },
//     { id: "wishlist", label: "Wishlist", icon: <Heart className="w-5 h-5" /> },
//     { id: "addresses", label: "Addresses", icon: <MapPin className="w-5 h-5" /> },
//     { id: "payments", label: "Payment Methods", icon: <CreditCard className="w-5 h-5" /> },
//     { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
//     { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
//     { id: "help", label: "Help Center", icon: <HelpCircle className="w-5 h-5" /> }
//   ];

//   const [activeSection, setActiveSection] = useState("profile");

//   const handleEditProfile = () => {
//     setIsEditingProfile(true);
//     setEditedProfile({ ...user });
//   };

//   const handleSaveProfile = () => {
//     setUser(editedProfile);
//     setIsEditingProfile(false);
//   };

//   const handleCancelEdit = () => {
//     setIsEditingProfile(false);
//   };

//   const handleProfileChange = (field: string, value: string) => {
//     setEditedProfile(prev => ({ ...prev, [field]: value }));
//   };

//   const handleLogout = () => {
//     console.log("User logged out");
//     // Implement actual logout logic
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Hero Pattern Background */}
//       <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
//       <div className="container mx-auto px-4 py-8 relative">
//         {/* Header */}
//         <div className="mb-8 animate-fade-in">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
//           <p className="text-gray-600">Manage your profile, orders, and preferences</p>
//         </div>
        
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Menu */}
//           <aside className="lg:w-1/4">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32">
//               <div className="mb-6">
//                 <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <User className="w-8 h-8 text-primary-600" />
//                 </div>
//                 <div className="text-center">
//                   <h3 className="font-bold text-gray-900">{user.name}</h3>
//                   <p className="text-sm text-gray-600">{user.email}</p>
//                 </div>
//               </div>
              
//               <nav className="space-y-1">
//                 {menuItems.map(item => (
//                   <button
//                     key={item.id}
//                     onClick={() => setActiveSection(item.id)}
//                     className={cn(
//                       "flex items-center w-full p-3 rounded-lg transition-all duration-300 group",
//                       activeSection === item.id
//                         ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600 border border-primary-200"
//                         : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
//                     )}
//                   >
//                     <span className={cn(
//                       "mr-3 transition-colors",
//                       activeSection === item.id ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600"
//                     )}>
//                       {item.icon}
//                     </span>
//                     <span className="font-medium text-left">{item.label}</span>
//                     {activeSection === item.id && (
//                       <ChevronRight className="w-4 h-4 ml-auto text-primary-600" />
//                     )}
//                   </button>
//                 ))}
//               </nav>
              
//               <button
//                 onClick={handleLogout}
//                 className="w-full mt-6 p-3 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 flex items-center justify-center gap-2 group"
//               >
//                 <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" />
//                 <span className="font-medium">Logout</span>
//               </button>
//             </div>
//           </aside>
          
//           {/* Main Content */}
//           <div className="lg:w-3/4 space-y-8">
//             {/* Profile Section */}
//             {activeSection === "profile" && (
//               <UserProfileCard
//                 user={user}
//                 onEditProfile={handleEditProfile}
//                 isEditing={isEditingProfile}
//                 editedProfile={editedProfile}
//                 onSaveProfile={handleSaveProfile}
//                 onCancelEdit={handleCancelEdit}
//                 onProfileChange={handleProfileChange}
//               />
//             )}
            
//             {/* Orders Section */}
//             {activeSection === "orders" && <OrderHistory orders={orders} />}
            
//             {/* Wishlist Section */}
//             {activeSection === "wishlist" && <Wishlist items={wishlistItems} />}
            
//             {/* Addresses Section */}
//             {activeSection === "addresses" && <AddressBook addresses={addresses} />}
            
//             {/* Payments Section */}
//             {activeSection === "payments" && <PaymentMethods methods={paymentMethods} />}
            
//             {/* Settings Section */}
//             {activeSection === "settings" && <AccountSettings />}
            
//             {/* Security Section */}
//             {activeSection === "security" && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Password & Security</h3>
//                     <div className="space-y-4">
//                       <button className="w-full p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-between group">
//                         <div className="flex items-center gap-3">
//                           <Lock className="w-5 h-5 text-gray-400" />
//                           <div>
//                             <div className="font-medium text-gray-900">Change Password</div>
//                             <div className="text-sm text-gray-600">Update your password regularly</div>
//                           </div>
//                         </div>
//                         <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
//                       </button>
                      
//                       <button className="w-full p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-between group">
//                         <div className="flex items-center gap-3">
//                           <Shield className="w-5 h-5 text-gray-400" />
//                           <div>
//                             <div className="font-medium text-gray-900">Two-Factor Authentication</div>
//                             <div className="text-sm text-gray-600">Add an extra layer of security</div>
//                           </div>
//                         </div>
//                         <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
//                       </button>
                      
//                       <button className="w-full p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-between group">
//                         <div className="flex items-center gap-3">
//                           <Globe className="w-5 h-5 text-gray-400" />
//                           <div>
//                             <div className="font-medium text-gray-900">Active Sessions</div>
//                             <div className="text-sm text-gray-600">Manage devices where you're logged in</div>
//                           </div>
//                         </div>
//                         <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Help Center Section */}
//             {activeSection === "help" && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Help Center</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <button className="p-6 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group text-left">
//                     <div className="flex items-center gap-3 mb-3">
//                       <MessageSquare className="w-6 h-6 text-primary-600" />
//                       <span className="font-bold text-gray-900">Contact Support</span>
//                     </div>
//                     <p className="text-gray-600">Get help from our support team 24/7</p>
//                   </button>
                  
//                   <button className="p-6 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group text-left">
//                     <div className="flex items-center gap-3 mb-3">
//                       <FileText className="w-6 h-6 text-primary-600" />
//                       <span className="font-bold text-gray-900">FAQs</span>
//                     </div>
//                     <p className="text-gray-600">Find answers to common questions</p>
//                   </button>
                  
//                   <button className="p-6 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group text-left">
//                     <div className="flex items-center gap-3 mb-3">
//                       <Download className="w-6 h-6 text-primary-600" />
//                       <span className="font-bold text-gray-900">Downloads</span>
//                     </div>
//                     <p className="text-gray-600">Manuals, drivers, and software</p>
//                   </button>
                  
//                   <button className="p-6 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group text-left">
//                     <div className="flex items-center gap-3 mb-3">
//                       <TrendingUp className="w-6 h-6 text-primary-600" />
//                       <span className="font-bold text-gray-900">Order Status</span>
//                     </div>
//                     <p className="text-gray-600">Track your orders and shipments</p>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Switch } from "@/app/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Textarea } from "@/app/components/ui/textarea";

// ==================== TYPES ====================
interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  inStock: boolean;
  addedDate: string;
}

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  lastFour?: string;
  expiry?: string;
  isDefault: boolean;
  name: string;
}

// ==================== COMPONENTS ====================

// 1. User Profile Card Component
const UserProfileCard = ({
  user,
  onEditProfile,
  isEditing,
  editedProfile,
  onSaveProfile,
  onCancelEdit,
  onProfileChange
}: {
  user: any;
  onEditProfile: () => void;
  isEditing: boolean;
  editedProfile: any;
  onSaveProfile: () => void;
  onCancelEdit: () => void;
  onProfileChange: (field: string, value: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </div>
        {!isEditing && (
          <Button onClick={onEditProfile} variant="outline" size="sm">
            <Icons.Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={editedProfile.firstName}
                  onChange={(e) => onProfileChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={editedProfile.lastName}
                  onChange={(e) => onProfileChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Icons.Mail className="w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => onProfileChange('email', e.target.value)}
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="flex items-center gap-2">
                <Icons.Phone className="w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => onProfileChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      className="pr-12"
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-br from-primary-100 to-primary-200">
                  <Icons.User className="w-10 h-10 text-primary-600" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Icons.Calendar className="w-3 h-3" />
                  Member since {user.joinDate}
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold">{user.orders}</div>
                <div className="text-sm text-muted-foreground">Orders</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold">{user.wishlist}</div>
                <div className="text-sm text-muted-foreground">Wishlist</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold">{user.reviews}</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold">{user.points}</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end gap-3 border-t pt-6">
          <Button variant="outline" onClick={onCancelEdit}>
            <Icons.X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={onSaveProfile}>
            <Icons.Check className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

// 2. Order History Component
const OrderHistory = ({ orders }: { orders: Order[] }) => {
  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'processing': return 'secondary';
      case 'shipped': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing': return <Icons.Package className="w-4 h-4" />;
      case 'shipped': return <Icons.Truck className="w-4 h-4" />;
      case 'delivered': return <Icons.CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <Icons.X className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and track your recent orders</CardDescription>
        </div>
        <Button variant="ghost" size="sm">
          View All
          <Icons.ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="hover:shadow-sm transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium">Order #{order.id}</span>
                      <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Placed on {order.date} • {order.items} items • ${order.total.toFixed(2)}
                    </div>
                    {order.trackingNumber && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Tracking: <span className="font-medium">{order.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icons.Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === 'shipped' && (
                      <Button variant="secondary" size="sm">
                        <Icons.MapPin className="w-4 h-4 mr-2" />
                        Track Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 3. Wishlist Component
const Wishlist = ({ items }: { items: WishlistItem[] }) => {
  const [wishlistItems, setWishlistItems] = useState(items);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Wishlist</CardTitle>
          <CardDescription>Your saved items</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Icons.Heart className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{wishlistItems.length} items</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map(item => (
            <Card key={item.id} className="hover:shadow-sm transition-all">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                    <Icons.ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Icons.Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">${item.originalPrice}</span>
                        )}
                      </div>
                      <Button variant="secondary" size="sm">
                        <Icons.ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                    
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                      <Icons.Calendar className="w-3 h-3" />
                      Added on {item.addedDate}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 4. Address Book Component
const AddressBook = ({ addresses }: { addresses: Address[] }) => {
  const [addressList, setAddressList] = useState(addresses);

  const setDefaultAddress = (id: string) => {
    setAddressList(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id: string) => {
    if (addressList.length > 1) {
      setAddressList(prev => prev.filter(addr => addr.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Address Book</CardTitle>
          <CardDescription>Manage your shipping addresses</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Icons.Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addressList.map(address => (
            <Card key={address.id} className={cn(
              address.isDefault && "border-primary bg-gradient-to-r from-primary/5 to-primary/10"
            )}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Icons.MapPin className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{address.name}</span>
                    {address.isDefault && (
                      <Badge className="ml-2">Default</Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icons.Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => deleteAddress(address.id)}
                    >
                      <Icons.Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{address.address}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                  <Separator className="my-2" />
                  <p>{address.phone}</p>
                </div>
                
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    size="sm"
                    onClick={() => setDefaultAddress(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 5. Payment Methods Component
const PaymentMethods = ({ methods }: { methods: PaymentMethod[] }) => {
  const [paymentMethods, setPaymentMethods] = useState(methods);

  const setDefaultMethod = (id: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment options</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Icons.Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <Card key={method.id} className={cn(
              method.isDefault && "border-primary bg-gradient-to-r from-primary/5 to-primary/10"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                      <Icons.CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{method.name}</div>
                      {method.type === 'card' && (
                        <div className="text-sm text-muted-foreground">
                          **** **** **** {method.lastFour} • Expires {method.expiry}
                        </div>
                      )}
                      {method.type === 'paypal' && (
                        <div className="text-sm text-muted-foreground">PayPal account</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {method.isDefault ? (
                      <Badge>Default</Badge>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDefaultMethod(method.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 6. Account Settings Component
const AccountSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true,
    securityAlerts: true,
    language: 'english',
    currency: 'USD'
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Customize your account preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Icons.Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive order updates via email</div>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Icons.MessageSquare className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">SMS Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive SMS updates</div>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Icons.Gift className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Marketing Emails</div>
                  <div className="text-sm text-muted-foreground">Receive promotions and offers</div>
                </div>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketingEmails: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={settings.currency}
                onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ==================== MAIN ACCOUNT PAGE ====================
export default function AccountPage() {
  // User data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2023",
    orders: 12,
    wishlist: 8,
    reviews: 5,
    points: 2450
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...user });

  // Orders data
  const orders: Order[] = [
    {
      id: "ORD-789456",
      date: "2024-01-15",
      total: 1299.99,
      status: "delivered",
      items: 2,
      trackingNumber: "TRK-789456123",
      estimatedDelivery: "2024-01-20"
    },
    {
      id: "ORD-123456",
      date: "2024-01-10",
      total: 899.99,
      status: "shipped",
      items: 3,
      trackingNumber: "TRK-123456789",
      estimatedDelivery: "2024-01-18"
    },
    {
      id: "ORD-987654",
      date: "2024-01-05",
      total: 459.99,
      status: "processing",
      items: 1
    },
    {
      id: "ORD-456123",
      date: "2023-12-28",
      total: 1799.99,
      status: "cancelled",
      items: 4
    }
  ];

  // Wishlist data
  const wishlistItems: WishlistItem[] = [
    {
      id: "1",
      name: "MacBook Pro 16-inch",
      price: 2399,
      originalPrice: 2599,
      brand: "Apple",
      image: "",
      inStock: true,
      addedDate: "2024-01-10"
    },
    {
      id: "2",
      name: "Wireless Noise Cancelling Headphones",
      price: 299,
      brand: "Sony",
      image: "",
      inStock: true,
      addedDate: "2024-01-08"
    },
    {
      id: "3",
      name: "Smart Watch Series 8",
      price: 399,
      originalPrice: 449,
      brand: "Apple",
      image: "",
      inStock: false,
      addedDate: "2024-01-05"
    }
  ];

  // Addresses data
  const addresses: Address[] = [
    {
      id: "1",
      name: "Home Address",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true
    },
    {
      id: "2",
      name: "Work Address",
      address: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false
    }
  ];

  // Payment methods data
  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4321",
      lastFour: "4321",
      expiry: "06/25",
      isDefault: true
    },
    {
      id: "2",
      type: "card",
      name: "Mastercard ending in 8765",
      lastFour: "8765",
      expiry: "12/24",
      isDefault: false
    },
    {
      id: "3",
      type: "paypal",
      name: "PayPal",
      isDefault: false
    }
  ];

  // Menu items
  const menuItems = [
    { id: "profile", label: "Profile", icon: <Icons.User className="w-5 h-5" /> },
    { id: "orders", label: "Orders", icon: <Icons.ShoppingBag className="w-5 h-5" /> },
    { id: "wishlist", label: "Wishlist", icon: <Icons.Heart className="w-5 h-5" /> },
    { id: "addresses", label: "Addresses", icon: <Icons.MapPin className="w-5 h-5" /> },
    { id: "payments", label: "Payment Methods", icon: <Icons.CreditCard className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Icons.Settings className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Icons.Shield className="w-5 h-5" /> },
    { id: "help", label: "Help Center", icon: <Icons.HelpCircle className="w-5 h-5" /> }
  ];

  const [activeSection, setActiveSection] = useState("profile");

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setEditedProfile({ ...user });
  };

  const handleSaveProfile = () => {
    setUser(editedProfile);
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleProfileChange = (field: string, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Implement actual logout logic
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Pattern Background */}
      <div className="absolute inset-0 hero-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your profile, orders, and preferences</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu */}
          <aside className="lg:w-1/4">
            <Card className="sticky top-32">
              <CardContent className="p-6">
                <div className="mb-6">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20">
                      <Icons.User className="w-8 h-8 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  {menuItems.map(item => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection(item.id)}
                    >
                      <span className={cn(
                        "mr-3",
                        activeSection === item.id ? "text-primary" : "text-muted-foreground"
                      )}>
                        {item.icon}
                      </span>
                      {item.label}
                      {activeSection === item.id && (
                        <Icons.ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </Button>
                  ))}
                </nav>
                
                <Separator className="my-6" />
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <Icons.LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main Content */}
          <div className="lg:w-3/4 space-y-8">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <UserProfileCard
                user={user}
                onEditProfile={handleEditProfile}
                isEditing={isEditingProfile}
                editedProfile={editedProfile}
                onSaveProfile={handleSaveProfile}
                onCancelEdit={handleCancelEdit}
                onProfileChange={handleProfileChange}
              />
            )}
            
            {/* Orders Section */}
            {activeSection === "orders" && <OrderHistory orders={orders} />}
            
            {/* Wishlist Section */}
            {activeSection === "wishlist" && <Wishlist items={wishlistItems} />}
            
            {/* Addresses Section */}
            {activeSection === "addresses" && <AddressBook addresses={addresses} />}
            
            {/* Payments Section */}
            {activeSection === "payments" && <PaymentMethods methods={paymentMethods} />}
            
            {/* Settings Section */}
            {activeSection === "settings" && <AccountSettings />}
            
            {/* Security Section */}
            {activeSection === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-between h-auto py-4">
                    <div className="flex items-center gap-3">
                      <Icons.Lock className="w-5 h-5 text-muted-foreground" />
                      <div className="text-left">
                        <div className="font-medium">Change Password</div>
                        <div className="text-sm text-muted-foreground">Update your password regularly</div>
                      </div>
                    </div>
                    <Icons.ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between h-auto py-4">
                    <div className="flex items-center gap-3">
                      <Icons.Shield className="w-5 h-5 text-muted-foreground" />
                      <div className="text-left">
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                      </div>
                    </div>
                    <Icons.ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between h-auto py-4">
                    <div className="flex items-center gap-3">
                      <Icons.Globe className="w-5 h-5 text-muted-foreground" />
                      <div className="text-left">
                        <div className="font-medium">Active Sessions</div>
                        <div className="text-sm text-muted-foreground">Manage devices where you're logged in</div>
                      </div>
                    </div>
                    <Icons.ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {/* Help Center Section */}
            {activeSection === "help" && (
              <Card>
                <CardHeader>
                  <CardTitle>Help Center</CardTitle>
                  <CardDescription>Get help with your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="hover:shadow-sm transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Icons.MessageSquare className="w-6 h-6 text-primary" />
                          <span className="font-bold">Contact Support</span>
                        </div>
                        <p className="text-muted-foreground">Get help from our support team 24/7</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-sm transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Icons.FileText className="w-6 h-6 text-primary" />
                          <span className="font-bold">FAQs</span>
                        </div>
                        <p className="text-muted-foreground">Find answers to common questions</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-sm transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Icons.Download className="w-6 h-6 text-primary" />
                          <span className="font-bold">Downloads</span>
                        </div>
                        <p className="text-muted-foreground">Manuals, drivers, and software</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-sm transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Icons.TrendingUp className="w-6 h-6 text-primary" />
                          <span className="font-bold">Order Status</span>
                        </div>
                        <p className="text-muted-foreground">Track your orders and shipments</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}