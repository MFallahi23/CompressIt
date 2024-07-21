import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import useAuth from "../hooks/useAuth";
import { IoIosPricetags } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import ProfileOptions from "./ProfileOptions.jsx";
import { displayImg } from "../utils/imgUtils.jsx";
import { getUserRoleLabel } from "../utils/roleUtils.jsx";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [showProfileOpt, setShowProfileOpt] = useState(false);
  const [showDesktopOpt, setShowDesktopOpt] = useState(false);
  const { auth } = useAuth();
  const dropDownRef = useRef(null);
  const menuRef = useRef(null);

  const isMobile = useMediaQuery({ query: `(max-width:767px)` });
  console.log(auth);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (auth?.profilePic) {
      setImageUrl(displayImg(auth?.profilePic));
    }
  }, [auth.profilePic]);

  //  Handle click outside the dropdown menu

  const handleClickOutside = (e) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target) &&
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      setShowDesktopOpt(false);
    }
  };

  // Ensure the app does not not scroll when menu is open
  useEffect(() => {
    if (isMobile && showNav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showNav, isMobile]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <header>
      <section className=" flex items-center justify-between mx-auto mt-3 max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] p-5">
        <Link to={"/"} className="header__logo flex gap-1 select-none">
          <img src={logo} alt="logo" className=" w-8" />
          <span className="header__logo__text text-xl sm:text-3xl font-bold">
            CompressIT
          </span>
        </Link>
        <nav className={`header__nav__desk ${isMobile ? "hide__desktop" : ""}`}>
          <ul className=" flex gap-6">
            <li
              onClick={() => setShowNav(false)}
              className="flex items-center gap-2"
            >
              <a href="#pricing">Pricing</a>
            </li>
            <li
              onClick={() => setShowNav(false)}
              className="flex items-center gap-2"
            >
              <a href="#faq">FAQ</a>
            </li>
            {auth && Object.entries(auth).length !== 0 ? (
              <>
                <li className=" relative header__desktop__profile">
                  <div
                    ref={menuRef}
                    onClick={() => setShowDesktopOpt(!showDesktopOpt)}
                    onBlur={() => setShowDesktopOpt(false)}
                    className="cursor-pointer"
                  >
                    <img
                      src={imageUrl}
                      alt="profile pic"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div
                    ref={dropDownRef}
                    className={`${showDesktopOpt ? "" : "hide__desktop"}`}
                  >
                    <div className="triangle"></div>
                    <div
                      className={`  bg-whiteBg absolute text-blackColor right-[-50%] rounded-lg p-2 py-3 shadow top-12 z-10`}
                    >
                      <div className=" flex flex-col gap-2 ">
                        <ProfileOptions
                          setShowNav={setShowNav}
                          setShowDesktopOpt={setShowDesktopOpt}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <li onClick={() => setShowNav(false)}>
                <Link to={"/sign-in"}>Login</Link>
              </li>
            )}
          </ul>
        </nav>

        <div
          className={`hamburger-menu md:hidden z-30 cursor-pointer ${
            showNav ? "active__menu" : ""
          }`}
          onClick={() => setShowNav(!showNav)}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <nav
          className={`${isMobile ? "show__mobile" : "hide__mobile"}   ${
            showNav ? "show-menu" : ""
          } shadow-lg z-20`}
        >
          <ul className="header__list flex gap-2 select-none">
            {auth && Object.entries(auth).length !== 0 ? (
              <div>
                <Link
                  onClick={() => setShowNav(false)}
                  to={"/profile"}
                  className="flex items-center gap-2 header__profile"
                >
                  <div className="">
                    <img
                      src={imageUrl}
                      className="min-w-10 min-h-10 sm:min-w-10 sm:min-h-10 rounded-full"
                      alt="picture"
                    />
                  </div>
                  <div className=" flex flex-col truncate text-xs sm:text-lg">
                    {auth?.username}
                    {getUserRoleLabel(auth?.role)}
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
            <li
              onClick={() => setShowNav(false)}
              className="flex items-center gap-2"
            >
              <IoIosPricetags />
              <a href="#pricing">Pricing</a>
            </li>
            <li
              onClick={() => setShowNav(false)}
              className="flex items-center gap-2"
            >
              <FaQuestionCircle />
              <a href="#faq">FAQ</a>
            </li>
            {auth && Object.entries(auth).length !== 0 ? (
              <>
                <li
                  onClick={() => setShowProfileOpt(!showProfileOpt)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FaUserFriends />
                    Profile
                  </div>
                  {showProfileOpt ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </li>
                <div
                  className={` ${showProfileOpt ? "profile__opt" : "hidden"}`}
                >
                  <div className=" flex flex-col gap-2 pl-10">
                    <ProfileOptions
                      setShowNav={setShowNav}
                      setShowDesktopOpt={setShowDesktopOpt}
                    />
                  </div>
                </div>
              </>
            ) : (
              <li
                onClick={() => {
                  setShowNav(false);
                }}
                className="flex items-center gap-2 "
              >
                <IoLogIn />
                <Link to={"/sign-in"}>Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
