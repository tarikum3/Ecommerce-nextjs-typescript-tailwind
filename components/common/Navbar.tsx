import { FC, useState, useEffect } from "react";
import Link from "next/link";

import { Logo } from "@components";
import { Searchbar } from "@components/common";

import { useUI } from "@components/context";
import { Bag, Search as SearchIcon } from "@components/icons";

import React from "react";

import type { LineItem } from "@framework/types";

import { UserIcon } from "@components/icons";

import dynamic from "next/dynamic";
import { useGetCustomerQuery } from "@framework/services/customer";
import { useGetCartQuery } from "@framework/services/cart";

const Loading = () => (
  <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
    <div className="px-2 py-2 bg-white rounded-md shadow absolute right-0 ">
      {/* <LoadingDots /> */}
      Loading...
    </div>
  </div>
);

const UserView = dynamic(() => import("@components/common/UserView"), {
  loading: Loading,
  ssr: false,
});
const CartView = dynamic(() => import("@components/cart/CartView"), {
  loading: Loading,
  ssr: false,
});

const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Women",
    url: "/collection/women",
  },
  {
    name: "Men",
    url: "/collection/men",
  },
];

//const Navbar: FC<NavbarProps> = ({ links }) =>{
const Navbar: FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [searchExtend, setSearchExtend] = useState(false);

  //const { data } = useCart()

  const { data } = useGetCartQuery();
  //const { data: isCustomerLoggedIn } = useCustomer()
  const { data: isCustomerLoggedIn } = useGetCustomerQuery();

  const { openModal } = useUI();
  const [dropdown, setDropdown] = React.useState("");

  const handleDropdown = (current: string = "") => {
    setDropdown(dropdown == current ? "" : current);
  };

  useEffect(() => {
    const countItem = (count: number, item: LineItem) => count + item.quantity;
    const items = data?.lineItems?.reduce(countItem, 0) ?? 0;
    setItemsCount(items);
  }, [data]);

  useEffect(() => {
    // const handleScroll = throttle(() => {
    //   const offset = 0
    //   const { scrollTop } = document.documentElement
    //   const scrolled = scrollTop > offset

    //   if (hasScrolled !== scrolled) {
    //     setHasScrolled(scrolled)
    //   }
    // }, 200)

    const handleScroll = async () => {
      const throttle = (await import("lodash.throttle")).default;
      const fun = throttle(() => {
        const offset = 0;
        const { scrollTop } = document.documentElement;
        const scrolled = scrollTop > offset;

        if (hasScrolled !== scrolled) {
          setHasScrolled(scrolled);
        }
      }, 200);
      fun();
      // return throttle(() => {
      //   const offset = 0
      //   const { scrollTop } = document.documentElement
      //   const scrolled = scrollTop > offset

      //   if (hasScrolled !== scrolled) {
      //     setHasScrolled(scrolled)
      //   }
      // }, 200)
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  return (
    <div
      className={`${
        hasScrolled ? "shadow-magical " : ""
      }sticky  top-0 min-h-[74px] bg-primary  z-40 transition-all duration-150  px-6`}
    >
      <div className="relative flex flex-row items-center  justify-between py-4 md:py-4">
        <div className="flex items-center flex-auto ">
          <Link
            href="/"
            // className={s.logo}
            className="cursor-pointer rounded-full border transform duration-100 ease-in-out hover:shadow-md"
            aria-label="Logo"
          >
            <Logo />
          </Link>
          <nav
            className={` ${
              searchExtend ? "hidden" : ""
            } sm:hidden flex-auto ml-6 space-x-4 `}
          >
            {links?.map((l) => (
              <Link
                href={l.url}
                key={l.url}
                // className={s.link}
                className="inline-flex items-center text-2xl text-secondary font-semibold transition ease-in-out duration-75 cursor-pointer  hover:text-secondary"
              >
                {l.name}
              </Link>
            ))}
          </nav>

          <nav className={` hidden sm:block flex-auto ml-6 space-x-4 `}>
            {links?.map((l) => (
              <Link
                href={l.url}
                key={l.url}
                // className={s.link}
                className="inline-flex items-center text-2xl text-secondary font-semibold transition ease-in-out duration-75 cursor-pointer  hover:text-secondary"
              >
                {l.name}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className={` ${searchExtend ? "" : "hidden"} sm:hidden flex-auto `}
          onClick={() => {
            setSearchExtend(true);
          }}
        >
          <Searchbar />
        </div>
        <div className={` hidden sm:block flex-auto `}>
          <Searchbar />
        </div>
        <div className="flex items-center justify-end sm:mr-10  flex-auto space-x-8">
          <button
            className={`${searchExtend ? "hidden" : ""} sm:hidden`}
            onClick={() => {
              setSearchExtend(true);
            }}
          >
            <SearchIcon />
          </button>
          <div className="relative ">
            <button onClick={() => handleDropdown("cart")} aria-label="Menu">
              <Bag className="w-7 h-7" />
              {itemsCount > 0 && (
                <span className="min-w-[1.25rem] min-h-[1.25rem] border border-primary-2 bg-secondary text-primary absolute rounded-full right-3 top-3 font-bold text-xs">
                  {itemsCount}
                </span>
              )}
            </button>

            {dropdown == "cart" && <CartView />}
          </div>

          <div className="relative ">
            <button
              onClick={() => {
                handleDropdown("");
                isCustomerLoggedIn ? handleDropdown("user") : openModal();
              }}
              aria-label="Menu"
            >
              <UserIcon className="w-7 h-7" />
            </button>

            {dropdown == "user" && isCustomerLoggedIn && <UserView />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
