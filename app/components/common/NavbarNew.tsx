import { FC } from "react";

import NavWrapper from "@/app/components/common/NavWrapper";

import CartWrapper from "@/app/components/cart/CartWrapper";
import UserView from "@/app/components/common/UserView";
//const Navbar: FC<NavbarProps> = ({ links }) =>{
const Navbar: FC = () => {
  return (
    <NavWrapper>
      <CartWrapper />
      <UserView />
    </NavWrapper>
  );
};
export default Navbar;
