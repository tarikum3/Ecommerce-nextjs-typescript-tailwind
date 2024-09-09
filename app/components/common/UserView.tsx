"use client";
import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, UserIcon } from "@/app/components/icons";

//import { setCustomerToken } from "@framework/utils";
import Clickoutside from "@/app/components/common/Clickoutside";
import { useUI } from "@/app/components/context";
//import { signOut } from "@/auth";
import { useSession } from "next-auth/react";

import { logOut } from "@lib/actions/actions";
// import { useRouter } from "next/router";
import { useRouter, useSearchParams } from "next/navigation";
const UserView: FC = () => {
  // const [logout] = useLogoutMutation();
  const { theme, setTheme } = useTheme();
  const [display, setDisplay] = useState(true);
  const { openModal, setModalView } = useUI();
  const [dropdown, setDropdown] = useState("");
  const { data: session, status } = useSession();
  //const { notRegistered, reset } = useParams();
  const searchParam = useSearchParams();

  const router = useRouter();
  const handleDropdown = (current: string = "") => {
    if (dropdown == current) {
      setDropdown("");
    } else {
      setDropdown(current);
      setDisplay(true);
    }
  };
  useEffect(() => {
    const reset = searchParam.get("reset");
    const notRegistered = searchParam.get("notRegistered");
    if (notRegistered) {
      openModal();
      setModalView("SIGNUP_VIEW");
    }
    if (reset) {
      openModal();
      setModalView("RESET_VIEW");
    }
  }, [searchParam]);
  console.log("dropdownsession", session);
  // console.log("notRegistered", notRegistered);
  console.log("resetreset", searchParam.get("reset"));
  return (
    <>
      <div className="relative ">
        <button
          onClick={() => {
            handleDropdown("");

            session?.user
              ? handleDropdown("user")
              : openModal() || setModalView("LOGIN_VIEW");
          }}
          aria-label="Menu"
        >
          <UserIcon className="w-7 h-7" />
        </button>

        {/* {dropdown == "user" && isCustomerLoggedIn && ( */}
        {dropdown == "user" && session?.user && (
          <Clickoutside status={display} onClick={() => setDisplay(false)}>
            <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
              <div className="px-2 py-2 bg-white rounded-md shadow absolute right-0 ">
                <a
                  className="block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  // onClick={async (e) => {
                  //   const { useRouter } = await import("next/router");
                  //   const router = useRouter();
                  //   router.push("/profile");
                  // }}
                  onClick={() => router.push("/profile")}
                >
                  {"My profile"}
                </a>

                <a
                  className="block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                >
                  <span className="flex">
                    Theme:{" "}
                    {theme == "dark" ? (
                      <Moon className="w-2 h-2" />
                    ) : (
                      <Sun className="w-2 h-2" />
                    )}
                  </span>
                </a>

                <a
                  className="block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={async () => {
                    // "use server";
                    // await logout();
                    // setCustomerToken(null);
                    await logOut();
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          </Clickoutside>
        )}
      </div>
    </>
  );
};

export default UserView;
