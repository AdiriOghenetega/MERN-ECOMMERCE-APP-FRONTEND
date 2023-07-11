import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { BiFoodMenu } from "react-icons/bi";
import {MdListAlt} from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = localStorage.getItem("location");
  const currentRoute = useLocation();


  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const handleLogout = () => {
    console.log(localStorage);
    localStorage.removeItem("user");
    console.log(localStorage);
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);
  return (
    <header className={`fixed shadow-md w-full h-16 px-2 md:px-4 bg-white/[0.5] z-50 ${currentRoute.pathname === "/confirmation" || currentRoute.pathname === "/success" ? "hidden":null}`}>
      <Tooltip id="my-tooltip" />
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="h-full" />
          </div>
        </Link>

        <div className="flex items-center">
          <nav className="items-center text-base md:text-lg hidden md:flex">
            <Link to={""}>
              <IoHome
                size="25px"
                className="text-[rgb(233,142,30)] mr-4"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Home"
                data-tooltip-hidden={isMobile && true}
              />{" "}
            </Link>
            {currentRoute.pathname === "/" ||
            currentRoute.pathname === `/menu/${location}` ? null : (
              location && <Link to={`menu/${location}`}>
                <BiFoodMenu
                  className="text-[rgb(233,142,30)] mr-4"
                  size="25px"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Menu"
                  data-tooltip-hidden={isMobile && true}
                />
              </Link>
            )}
            <Link to={"contact"}>
              <GrContact
                size="25px"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Contact us"
                data-tooltip-hidden={isMobile && true}
                className="mr-4"
              />
            </Link>
          </nav>
          <div
            className={`text-2xl text-slate-600 relative ${
              currentRoute.pathname === "/" && "pointer-events-none"
            } mr-4`}
          >
            <Link to={"cart"}>
              <BsCartFill
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Cart"
                data-tooltip-hidden={isMobile && true}
              />
              <div className="absolute -top-1 -right-1 text-white bg-[rgb(233,142,30)] h-4 w-4 rounded-full m-0 p-0 text-sm flex flex-col justify-center items-center ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className="mr-4">
            <Link to={"orderList"}>
              <MdListAlt
                size="28px"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Your Orders"
                data-tooltip-hidden={isMobile && true}
                className="text-[rgb(233,142,30)]"
              />
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md text-[rgb(233,142,30)]">
              {userData.image ? (
                <img
                  src={userData.image}
                  className="h-full w-full"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={userData.firstName}
                  data-tooltip-hidden={isMobile && true}
                />
              ) : (
                <HiOutlineUserCircle
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={
                    userData.firstName ? userData.firstName : "User"
                  }
                  data-tooltip-hidden={isMobile && true}
                />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                <Link
                  to={"admin"}
                  className="whitespace-nowrap cursor-pointer px-2"
                >
                  Admin Dashboard
                </Link>

                {userData.firstName ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-[rgb(233,142,30)]"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  {location && <Link to={`menu/${location}`}>Menu</Link>}
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
