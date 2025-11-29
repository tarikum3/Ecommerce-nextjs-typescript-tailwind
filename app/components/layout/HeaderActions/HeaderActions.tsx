

// import SearchIcon from "@/app/components/Search/SearchIcon";
// import UserIcon from "@/app/components/User/UserIcon";
// import WishlistIcon from "@/app/components/Wishlist/WishlistIcon";
// import CartIcon from "@/app/components/Cart/CartIcon";
// import MobileMenuTrigger from "@/app/components/layout/MobileMenu/MobileMenuTrigger";

// export default function HeaderActions() {
//   return (
//     <div className="flex items-center space-x-4">
//       <SearchIcon />
//       <UserIcon />
//       <WishlistIcon count={33} />
//       <CartIcon count={22} />
//       <MobileMenuTrigger />
//     </div>
//   );
// }


import SearchIcon from "@/app/components/Search/SearchIcon";
import UserIcon from "@/app/components/User/UserIcon";
import WishlistIcon from "@/app/components/Wishlist/WishlistIcon";
import CartIcon from "@/app/components/Cart/CartIcon";
import MobileMenu from "@/app/components/layout/MobileMenu/MobileMenu";

export default function HeaderActions() {
  return (
    <div className="flex items-center space-x-4">
      <SearchIcon />
      <UserIcon />
      <WishlistIcon count={3} />
      <CartIcon count={2} />
      <MobileMenu />
    </div>
  );
}