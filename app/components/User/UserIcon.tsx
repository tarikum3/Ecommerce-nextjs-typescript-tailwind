// export default function UserIcon() {
//   return (
//     <button className="p-2 text-gray-500 hover:text-primary-500 transition-colors rounded-full hover:bg-gray-100">
//       <svg
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//         />
//       </svg>
//     </button>
//   );
// }




"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Badge } from "@/app/components/ui/badge";
import { Skeleton } from "@/app/components/ui/skeleton";

// ==================== TYPES ====================
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'vendor';
  joinedDate: Date;
  orders: number;
  totalSpent: number;
  isVerified: boolean;
  notifications: number;
}

interface MenuItem {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  href?: string;
  action?: () => void;
  badge?: string | number;
  variant?: 'default' | 'destructive';
  shortcut?: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  type: 'order' | 'system' | 'promotion';
  actionUrl?: string;
}

// ==================== FAKE USER SERVICE ====================
const fakeUserService = {
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  getCurrentUser: async (): Promise<User> => {
    await fakeUserService.delay(200);
    return {
      id: "user_12345",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "/avatars/user.jpg",
      role: 'user',
      joinedDate: new Date('2023-05-15'),
      orders: 12,
      totalSpent: 2450.75,
      isVerified: true,
      notifications: 3
    };
  },

  getNotifications: async (): Promise<Notification[]> => {
    await fakeUserService.delay(150);
    return [
      {
        id: "notif_1",
        title: "Order Shipped",
        description: "Your order #ORD-7842 has been shipped",
        time: new Date(Date.now() - 3600000), // 1 hour ago
        read: false,
        type: 'order',
        actionUrl: "/orders/ORD-7842"
      },
      {
        id: "notif_2",
        title: "Special Offer",
        description: "20% off on all electronics this weekend",
        time: new Date(Date.now() - 86400000), // 1 day ago
        read: false,
        type: 'promotion',
        actionUrl: "/promotions/weekend-sale"
      },
      {
        id: "notif_3",
        title: "Security Alert",
        description: "New login from Chrome on Windows",
        time: new Date(Date.now() - 172800000), // 2 days ago
        read: true,
        type: 'system'
      },
      {
        id: "notif_4",
        title: "Review Request",
        description: "How was your recent purchase?",
        time: new Date(Date.now() - 259200000), // 3 days ago
        read: true,
        type: 'order',
        actionUrl: "/products/123/review"
      }
    ];
  },

  markNotificationAsRead: async (notificationId: string): Promise<void> => {
    await fakeUserService.delay(100);
    console.log(`Notification ${notificationId} marked as read`);
  },

  markAllNotificationsAsRead: async (): Promise<void> => {
    await fakeUserService.delay(100);
    console.log("All notifications marked as read");
  }
};

// ==================== COMPONENTS ====================

// User Avatar Component with Status Indicator
interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  notificationsCount?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  user, 
  size = 'md', 
  showStatus = true,
  notificationsCount = 0
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  return (
    <div className="relative">
      <Avatar className={cn(
        "border-2 border-white shadow-sm transition-all duration-300 group-hover:scale-105",
        sizeClasses[size]
      )}>
        {user.avatar ? (
          <AvatarImage src={user.avatar} alt={user.name} />
        ) : (
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-full h-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        <AvatarFallback>
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-full h-full flex items-center justify-center">
            <Icons.User className="w-6 h-6 text-white" />
          </div>
        </AvatarFallback>
      </Avatar>
      
      {showStatus && (
        <div className="absolute -bottom-1 -right-1">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
        </div>
      )}
      
      {notificationsCount > 0 && (
        <div className="absolute -top-1 -right-1">
          <div className="min-w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 border-2 border-white shadow-sm animate-pulse">
            {notificationsCount > 9 ? "9+" : notificationsCount}
          </div>
        </div>
      )}
    </div>
  );
};

// Notification Item Component
interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'order':
        return <Icons.Package className="w-4 h-4 text-blue-500" />;
      case 'promotion':
        return <Icons.Tag className="w-4 h-4 text-green-500" />;
      case 'system':
        return <Icons.Shield className="w-4 h-4 text-amber-500" />;
      default:
        return <Icons.Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div
      className={cn(
        "p-3 rounded-lg cursor-pointer transition-all duration-200",
        !notification.read 
          ? "bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500" 
          : "hover:bg-gray-50 border-l-4 border-transparent"
      )}
      onClick={() => onClick(notification)}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn(
              "font-semibold text-sm",
              !notification.read ? "text-gray-900" : "text-gray-700"
            )}>
              {notification.title}
            </h4>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatTimeAgo(notification.time)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {notification.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Notifications Panel Component
interface NotificationsPanelProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAllAsRead: () => void;
  onViewAll: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  notifications,
  onNotificationClick,
  onMarkAllAsRead,
  onViewAll
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-[380px] p-0">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.Bell className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="h-8 text-xs text-gray-600 hover:text-gray-900"
              >
                <Icons.CheckCircle className="w-4 h-4 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <Icons.Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">No notifications</h4>
            <p className="text-sm text-gray-600">You're all caught up!</p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={onNotificationClick}
              />
            ))}
          </div>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="sticky bottom-0 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-4">
          <Button
            variant="ghost"
            className="w-full justify-center text-gray-700 hover:text-gray-900"
            onClick={onViewAll}
          >
            <Icons.Eye className="w-4 h-4 mr-2" />
            View all notifications
          </Button>
        </div>
      )}
    </div>
  );
};

// User Menu Dropdown Content
interface UserMenuContentProps {
  user: User;
  onMenuItemClick: (item: MenuItem) => void;
  onNotificationsClick: () => void;
  onLogout: () => void;
}

const UserMenuContent: React.FC<UserMenuContentProps> = ({
  user,
  onMenuItemClick,
  onNotificationsClick,
  onLogout
}) => {
  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "LayoutDashboard",
      href: "/dashboard"
    },
    {
      id: "profile",
      label: "My Profile",
      icon: "User",
      href: "/profile"
    },
    {
      id: "orders",
      label: "My Orders",
      icon: "Package",
      href: "/orders",
      badge: user.orders
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: "Heart",
      href: "/wishlist",
      badge: "12"
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "Bell",
      action: onNotificationsClick,
      badge: user.notifications
    },
    {
      id: "settings",
      label: "Settings",
      icon: "Settings",
      href: "/settings"
    }
  ];

  const accountItems: MenuItem[] = [
    {
      id: "billing",
      label: "Billing & Payments",
      icon: "CreditCard",
      href: "/billing"
    },
    {
      id: "help",
      label: "Help & Support",
      icon: "HelpCircle",
      href: "/help"
    },
    {
      id: "logout",
      label: "Sign Out",
      icon: "LogOut",
      variant: 'destructive',
      action: onLogout
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="w-80 p-0">
      {/* User Header */}
      <div className="bg-gradient-to-r from-primary-500/5 to-primary-600/5 border-b border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
              {user.isVerified && (
                <Icons.BadgeCheck className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 truncate">{user.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Icons.Star className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-medium text-gray-900">Gold Member</span>
              </div>
              <div className="text-xs text-gray-500">
                Joined {user.joinedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
                <Icons.Package className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{user.orders}</div>
                <div className="text-xs text-gray-600">Orders</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center">
                <Icons.Wallet className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(user.totalSpent)}</div>
                <div className="text-xs text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="p-2">
        <DropdownMenuGroup>
          {menuItems.map(item => {
            const IconComponent = Icons[item.icon as keyof typeof Icons];
            return (
              <DropdownMenuItem
                key={item.id}
                onClick={() => item.action ? item.action() : onMenuItemClick(item)}
                className={cn(
                  "px-3 py-3 rounded-lg my-1 cursor-pointer transition-all duration-200",
                  item.variant === 'destructive' 
                    ? "text-red-600 hover:bg-red-50 hover:text-red-700" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      item.variant === 'destructive'
                        ? "bg-red-50"
                        : "bg-gray-100"
                    )}>
                      {/* <IconComponent className={cn(
                        "w-4 h-4",
                        item.variant === 'destructive'
                          ? "text-red-600"
                          : "text-gray-600"
                      )} /> */}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge className={cn(
                      "ml-2",
                      item.variant === 'destructive'
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    )}>
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <Separator className="my-2" />

        {/* Account Menu */}
        <DropdownMenuGroup>
          {accountItems.map(item => {
            const IconComponent = Icons[item.icon as keyof typeof Icons];
            return (
              <DropdownMenuItem
                key={item.id}
                onClick={() => item.action ? item.action() : onMenuItemClick(item)}
                className={cn(
                  "px-3 py-3 rounded-lg my-1 cursor-pointer transition-all duration-200",
                  item.variant === 'destructive' 
                    ? "text-red-600 hover:bg-red-50 hover:text-red-700" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    item.variant === 'destructive'
                      ? "bg-red-50"
                      : "bg-gray-100"
                  )}>
                    {/* <IconComponent className={cn(
                      "w-4 h-4",
                      item.variant === 'destructive'
                        ? "text-red-600"
                        : "text-gray-600"
                    )} /> */}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Icons.Shield className="w-4 h-4 text-gray-400" />
            <span>Secure Account</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Globe className="w-4 h-4 text-gray-400" />
            <span>English</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN USER ICON COMPONENT ====================
export default function UserIcon() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [open, setOpen] = useState(false);

  // Load user data
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const [userData, notificationsData] = await Promise.all([
        fakeUserService.getCurrentUser(),
        fakeUserService.getNotifications()
      ]);
      setUser(userData);
      setNotifications(notificationsData);
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    console.log("Notification clicked:", notification);
    if (!notification.read) {
      await fakeUserService.markNotificationAsRead(notification.id);
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
    }
    // Navigate to notification action URL in real app
    if (notification.actionUrl) {
      console.log("Navigating to:", notification.actionUrl);
    }
    setShowNotifications(false);
  };

  const handleMarkAllNotificationsAsRead = async () => {
    await fakeUserService.markAllNotificationsAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleMenuItemClick = (item: MenuItem) => {
    console.log("Menu item clicked:", item);
    if (item.href) {
      console.log("Navigating to:", item.href);
      // In real app: router.push(item.href);
    }
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // In real app: handle logout logic
    setOpen(false);
  };

  const handleViewAllNotifications = () => {
    console.log("View all notifications");
    // In real app: navigate to notifications page
    setShowNotifications(false);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return (
      <div className="relative p-2">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="relative p-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 rounded-full hover:bg-gray-100 group"
              onClick={() => console.log("Sign in clicked")}
              aria-label="Sign in"
            >
              <div className="relative">
                <Icons.User className="w-5 h-5 transition-transform group-hover:scale-110" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 rounded-full transition-all duration-300" />
              </div>
              <span className="absolute -bottom-1 -right-1 text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Sign In
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="bg-gray-900 text-white border-0"
            sideOffset={5}
          >
            <p className="font-medium">Sign in to your account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  className="relative p-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 rounded-full hover:bg-gray-100 group"
                  aria-label="User account"
                >
                  <div className="relative">
                    <UserAvatar 
                      user={user} 
                      size="md" 
                      notificationsCount={unreadNotificationsCount}
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 rounded-full transition-all duration-300" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Account
                  </span>
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom" 
              className="bg-gray-900 text-white border-0"
              sideOffset={5}
            >
              <p className="font-medium">Account & Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Menu Dropdown */}
        <DropdownMenuContent 
          align="end" 
          sideOffset={10}
          className="p-0 border border-gray-200 shadow-2xl rounded-2xl overflow-hidden"
        >
          <UserMenuContent
            user={user}
            onMenuItemClick={handleMenuItemClick}
            onNotificationsClick={() => setShowNotifications(true)}
            onLogout={handleLogout}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notifications Dropdown */}
      <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
        <DropdownMenuContent 
          align="end" 
          sideOffset={10}
          className="p-0 border border-gray-200 shadow-2xl rounded-2xl overflow-hidden"
        >
          <NotificationsPanel
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            onMarkAllAsRead={handleMarkAllNotificationsAsRead}
            onViewAll={handleViewAllNotifications}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
















































// "use client";

// import React, { useState, useEffect } from "react";
// import * as Icons from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/app/components/ui/dropdown-menu";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/app/components/ui/tooltip";
// import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
// import { Badge } from "@/app/components/ui/badge";
// import { Skeleton } from "@/app/components/ui/skeleton";

// // ==================== TYPES ====================
// interface MenuItem {
//   id: string;
//   label: string;
//   icon: keyof typeof Icons;
//   href?: string;
//   action?: () => void;
//   badge?: string | number;
//   variant?: 'default' | 'destructive';
// }

// // ==================== COMPONENTS ====================

// // User Menu Content Component
// interface UserMenuContentProps {
//   menuItems: MenuItem[];
//   onMenuItemClick: (item: MenuItem) => void;
// }

// const UserMenuContent: React.FC<UserMenuContentProps> = ({ menuItems, onMenuItemClick }) => {
//   const user = {
//     name: "Alex Johnson",
//     email: "alex.johnson@example.com",
//     avatar: "/avatars/user.jpg",
//     isVerified: true,
//     joinedDate: "May 2023",
//     orders: 12,
//     notifications: 3
//   };

//   return (
//     <div className="w-64 p-2">
//       {/* User Info */}
//       <div className="px-3 py-4">
//         <div className="flex items-center gap-3 mb-3">
//           <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
//             {user.avatar ? (
//               <AvatarImage src={user.avatar} alt={user.name} />
//             ) : (
//               <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-full h-full flex items-center justify-center">
//                 <span className="text-white font-semibold">
//                   {user.name.split(' ').map(n => n[0]).join('')}
//                 </span>
//               </div>
//             )}
//             <AvatarFallback>
//               <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-full h-full flex items-center justify-center">
//                 <Icons.User className="w-6 h-6 text-white" />
//               </div>
//             </AvatarFallback>
//           </Avatar>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-1">
//               <h4 className="font-semibold text-gray-900 truncate">{user.name}</h4>
//               {user.isVerified && (
//                 <Icons.BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
//               )}
//             </div>
//             <p className="text-xs text-gray-500 truncate">{user.email}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4 text-xs">
//           <div className="flex items-center gap-1">
//             <Icons.Star className="w-3 h-3 text-amber-500" />
//             <span className="font-medium text-gray-700">Gold Member</span>
//           </div>
//           <div className="text-gray-500">
//             {user.orders} orders
//           </div>
//         </div>
//       </div>

//       <DropdownMenuSeparator />

//       {/* Main Menu Items */}
//       <DropdownMenuGroup>
//         {menuItems.slice(0, 4).map(item => {
//           const IconComponent = Icons[item.icon as keyof typeof Icons];
//           return (
//             <DropdownMenuItem
//               key={item.id}
//               onClick={() => onMenuItemClick(item)}
//               className={cn(
//                 "px-3 py-3 rounded-lg my-1 cursor-pointer transition-all duration-200",
//                 item.variant === 'destructive' 
//                   ? "text-red-600 hover:bg-red-50 hover:text-red-700" 
//                   : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//               )}
//             >
//               <div className="flex items-center justify-between w-full">
//                 <div className="flex items-center gap-3">
//                   <div className={cn(
//                     "w-8 h-8 rounded-lg flex items-center justify-center",
//                     item.variant === 'destructive'
//                       ? "bg-red-50"
//                       : "bg-gray-100"
//                   )}>
//                     <IconComponent className={cn(
//                       "w-4 h-4",
//                       item.variant === 'destructive'
//                         ? "text-red-600"
//                         : "text-gray-600"
//                     )} />
//                   </div>
//                   <span className="font-medium">{item.label}</span>
//                 </div>
//                 {item.badge && (
//                   <Badge className={cn(
//                     "ml-2",
//                     item.variant === 'destructive'
//                       ? "bg-red-100 text-red-700 border-red-200"
//                       : "bg-gray-100 text-gray-700 border-gray-200"
//                   )}>
//                     {item.badge}
//                   </Badge>
//                 )}
//               </div>
//             </DropdownMenuItem>
//           );
//         })}
//       </DropdownMenuGroup>

//       <DropdownMenuSeparator />

//       {/* Account Items */}
//       <DropdownMenuGroup>
//         {menuItems.slice(4).map(item => {
//           const IconComponent = Icons[item.icon as keyof typeof Icons];
//           return (
//             <DropdownMenuItem
//               key={item.id}
//               onClick={() => onMenuItemClick(item)}
//               className={cn(
//                 "px-3 py-3 rounded-lg my-1 cursor-pointer transition-all duration-200",
//                 item.variant === 'destructive' 
//                   ? "text-red-600 hover:bg-red-50 hover:text-red-700" 
//                   : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//               )}
//             >
//               <div className="flex items-center gap-3">
//                 <div className={cn(
//                   "w-8 h-8 rounded-lg flex items-center justify-center",
//                   item.variant === 'destructive'
//                     ? "bg-red-50"
//                     : "bg-gray-100"
//                 )}>
//                   <IconComponent className={cn(
//                     "w-4 h-4",
//                     item.variant === 'destructive'
//                       ? "text-red-600"
//                       : "text-gray-600"
//                   )} />
//                 </div>
//                 <span className="font-medium">{item.label}</span>
//               </div>
//             </DropdownMenuItem>
//           );
//         })}
//       </DropdownMenuGroup>

//       {/* Footer */}
//       <div className="mt-2 pt-3 border-t border-gray-100">
//         <div className="flex items-center justify-between text-xs text-gray-500 px-3">
//           <div className="flex items-center gap-1">
//             <Icons.Shield className="w-3 h-3" />
//             <span>Secure</span>
//           </div>
//           <div className="text-xs">
//             Joined {user.joinedDate}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== MAIN USER ICON COMPONENT ====================
// export default function UserIcon() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [open, setOpen] = useState(false);

//   // Simulate loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const menuItems: MenuItem[] = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: "LayoutDashboard",
//       href: "/dashboard"
//     },
//     {
//       id: "profile",
//       label: "My Profile",
//       icon: "User",
//       href: "/profile"
//     },
//     {
//       id: "orders",
//       label: "My Orders",
//       icon: "Package",
//       href: "/orders",
//       badge: 12
//     },
//     {
//       id: "wishlist",
//       label: "Wishlist",
//       icon: "Heart",
//       href: "/wishlist",
//       badge: 8
//     },
//     {
//       id: "settings",
//       label: "Settings",
//       icon: "Settings",
//       href: "/settings"
//     },
//     {
//       id: "help",
//       label: "Help & Support",
//       icon: "HelpCircle",
//       href: "/help"
//     },
//     {
//       id: "logout",
//       label: "Sign Out",
//       icon: "LogOut",
//       variant: 'destructive',
//       action: () => {
//         console.log("Signing out...");
//         // Add sign out logic here
//       }
//     }
//   ];

//   const handleMenuItemClick = (item: MenuItem) => {
//     console.log("Menu item clicked:", item);
//     if (item.action) {
//       item.action();
//     }
//     if (item.href) {
//       console.log("Navigating to:", item.href);
//       // In real app: router.push(item.href);
//     }
//     setOpen(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="relative p-2">
//         <Skeleton className="w-10 h-10 rounded-full" />
//       </div>
//     );
//   }

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <TooltipProvider>
//         <Tooltip delayDuration={300}>
//           <TooltipTrigger asChild>
//             <DropdownMenuTrigger asChild>
//               <button
//                 className="relative p-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 rounded-full hover:bg-gray-100 group"
//                 aria-label="User account menu"
//               >
//                 <div className="relative">
//                   {/* User Icon */}
//                   <div className="w-8 h-8 flex items-center justify-center">
//                     <Icons.User className="w-5 h-5 transition-transform group-hover:scale-110" />
//                   </div>
//                   <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 rounded-full transition-all duration-300" />
//                 </div>
//                 <span className="absolute -bottom-1 -right-1 text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
//                   Account
//                 </span>
//               </button>
//             </DropdownMenuTrigger>
//           </TooltipTrigger>
//           <TooltipContent 
//             side="bottom" 
//             className="bg-gray-900 text-white border-0"
//             sideOffset={5}
//           >
//             <p className="font-medium">Account & Profile</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <DropdownMenuContent 
//         align="end" 
//         sideOffset={10}
//         className="p-0 border border-gray-200 shadow-xl rounded-xl overflow-hidden"
//       >
//         <UserMenuContent
//           menuItems={menuItems}
//           onMenuItemClick={handleMenuItemClick}
//         />
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }