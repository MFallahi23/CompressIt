import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import useAuth from "../hooks/useAuth";
import { IoIosPricetags } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { FaDiceFive, FaQuestionCircle } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { FaUser, FaMoneyCheck, FaHistory } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { IoSettings } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import profilePic from "../assets/default_profile_pic.jpg";
import ProfileOptions from "./ProfileOptions.jsx";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [showProfileOpt, setShowProfileOpt] = useState(false);
  const [showDesktopOpt, setShowDesktopOpt] = useState(false);
  const { auth } = useAuth();
  const dropDownRef = useRef(null);

  const isMobile = useMediaQuery({ query: `(max-width:767px)` });

  // Get user Label
  const getUserRoleLabel = () => {
    if (auth?.role === "user") {
      return (
        <span className=" text-sm px-1 bg-slate-300 w-fit rounded-lg">
          Free tier
        </span>
      );
    } else if (auth?.role === "premium") {
      return <span className=" text-sm pl-1">Premium</span>;
    } else if (auth?.role === "moderator") {
      return <span className=" text-sm pl-1">Moderator</span>;
    } else {
      return <span className=" text-sm pl-1">Admin</span>;
    }
  };

  // Display profile img
  const displayImg = () => {
    const profilePic = auth?.profilePic;
    if (profilePic?.startsWith("https")) {
      return profilePic;
    } else {
      return "http://localhost:3000/images/" + profilePic;
    }
  };
  const [imageUrl, setImageUrl] = useState(displayImg());

  useEffect(() => {
    setImageUrl(displayImg());
  }, [auth.profilePic]);

  //  Handle click outside the dropdown menu

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
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
            Compressive
          </span>
        </Link>
        <nav className={`header__nav__desk ${isMobile ? "hide__desktop" : ""}`}>
          <ul className=" flex gap-6">
            <li
              onClick={() => setShowNav(false)}
              className="flex items-center gap-2"
            >
              <a href="#">Pricing</a>
            </li>
            <li
              onClick={() => setShowNav(false)}
              className="flex items-center gap-2"
            >
              <a href="#">FAQ</a>
            </li>
            {auth && Object.entries(auth).length !== 0 ? (
              <>
                <li className=" relative header__desktop__profile">
                  <div
                    onClick={() => setShowDesktopOpt(!showDesktopOpt)}
                    onBlur={() => setShowDesktopOpt(false)}
                    className=" cursor-pointer"
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
                      className="w-16 h-16 rounded-full"
                      alt="picture"
                    />
                  </div>
                  <div className=" flex flex-col">
                    {auth?.username}
                    {getUserRoleLabel()}
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
              <a href="#">Pricing</a>
            </li>
            <li
              onClick={() => setShowNav(false)}
              className="flex items-center gap-2"
            >
              <FaQuestionCircle />
              <a href="#">FAQ</a>
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
