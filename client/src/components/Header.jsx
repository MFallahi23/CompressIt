import React, { useEffect, useRef, useState } from "react";
import logo from "../../public/logo2.svg";
import { Link, useLocation } from "react-router-dom";
import "./styles/Header.css";
import useAuth from "../hooks/useAuth";
import { IoIosPricetags } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { MdSupportAgent } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import ProfileOptions from "./ProfileOptions.jsx";
import { displayImg } from "../utils/imgUtils.jsx";
import { getUserRoleLabel } from "../utils/roleUtils.jsx";
import { FaFileImage } from "react-icons/fa";
import { axiosPrivate } from "../api/axios.js";
const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const [showProfileOpt, setShowProfileOpt] = useState(false);
  const [showDesktopOpt, setShowDesktopOpt] = useState(false);
  const [numberOfNotif, setNumberOfNotif] = useState(0);

  const { auth } = useAuth();

  const dropDownRef = useRef(null);
  const menuRef = useRef(null);

  const isMobile = useMediaQuery({ query: `(max-width:767px)` });
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
    const getNumberOfNotif = async () => {
      try {
        const response = await axiosPrivate.get("/api/user/getnumberofnotif");
        const numOfNot = response.data.number_of_notif;
        setNumberOfNotif(numOfNot);
      } catch (error) {
        console.error(error);
      }
    };
    if (auth && Object.keys(auth).length > 0) {
      getNumberOfNotif();
    }
  }, [location]);

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
              <Link to={"/compress"}>Compress</Link>
            </li>
            {(!auth ||
              Object.keys(auth).length === 0 ||
              auth?.role === "user") && (
              <li
                onClick={() => setShowNav(false)}
                className="flex items-center gap-2"
              >
                <Link to={"/pricing"}> Pricing</Link>
              </li>
            )}
            {(!auth ||
              Object.keys(auth).length === 0 ||
              auth?.role === "user") && (
              <li
                onClick={() => setShowNav(false)}
                className="flex items-center gap-2"
              >
                <Link to={"/faq"}>FAQ</Link>
              </li>
            )}
            <li
              onClick={() => setShowNav(false)}
              className="flex items-center gap-2"
            >
              <Link to="/contact">Contact</Link>
            </li>

            {auth && Object.entries(auth).length !== 0 ? (
              <>
                <li className=" relative header__desktop__profile">
                  <div
                    ref={menuRef}
                    onClick={() => setShowDesktopOpt(!showDesktopOpt)}
                    onBlur={() => setShowDesktopOpt(false)}
                    className="cursor-pointer "
                  >
                    {numberOfNotif > 0 && (
                      <div className="absolute z-20 bg-orange-600 rounded-full  px-2 -top-1 -left-1">
                        {numberOfNotif}
                      </div>
                    )}
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
                          numberOfNotif={numberOfNotif}
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
          className={`hamburger-menu relative md:hidden z-30 cursor-pointer ${
            showNav ? "active__menu" : ""
          }`}
          onClick={() => setShowNav(!showNav)}
        >
          <div className="line"></div>
          <div className="line"></div>
          {numberOfNotif > 0 && (
            <div
              className={`absolute z-20 bg-orange-600 rounded-full w-2 h-2  -left-1 ${
                showNav ? "-top-2" : "-top-1"
              }`}
            ></div>
          )}
          <div className="line"></div>
        </div>

        <nav
          className={`${isMobile ? "show__mobile" : "hide__mobile"}   ${
            showNav ? "show-menu" : ""
          } shadow-lg z-20`}
        >
          <ul className="header__list flex gap-2 select-none">
            {auth && Object.entries(auth).length !== 0 ? (
              <div className="">
                <div>
                  <Link
                    onClick={() => setShowNav(false)}
                    to={"/profile"}
                    className="flex items-center gap-2 header__profile"
                  >
                    <div className="">
                      <img
                        src={imageUrl}
                        className="w-10 h-10 sm:min-w-10 sm:min-h-10 rounded-full"
                        alt="picture"
                      />
                    </div>
                    <div className=" flex flex-col truncate text-xs sm:text-lg max-[350px]:hidden">
                      {auth?.username}
                      {getUserRoleLabel(auth?.role)}
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            <li onClick={() => setShowNav(false)}>
              <Link
                className="flex items-center gap-2 p-2 rounded-full"
                to={"/compress"}
              >
                <FaFileImage />
                Compress
              </Link>
            </li>
            {(!auth ||
              Object.keys(auth).length === 0 ||
              auth?.role === "user") && (
              <li onClick={() => setShowNav(false)}>
                <Link
                  to={"/pricing"}
                  className="flex items-center gap-2  p-2 rounded-full"
                >
                  <IoIosPricetags />
                  <p>Pricing</p>
                </Link>
              </li>
            )}

            {(!auth ||
              Object.keys(auth).length === 0 ||
              auth?.role === "user") && (
              <li onClick={() => setShowNav(false)}>
                <Link
                  to={"/faq"}
                  className="flex items-center gap-2  p-2 rounded-full"
                >
                  <FaQuestionCircle />
                  <p>FAQ</p>
                </Link>
              </li>
            )}
            <li onClick={() => setShowNav(false)}>
              <Link
                to={"/contact"}
                className="flex items-center gap-2  p-2 rounded-full"
              >
                <MdSupportAgent />
                <p>Contact</p>
              </Link>
            </li>
            {auth && Object.entries(auth).length !== 0 ? (
              <>
                <li
                  onClick={() => setShowProfileOpt(!showProfileOpt)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 relative p-2">
                    {numberOfNotif > 0 && (
                      <div className="absolute z-20 bg-orange-600 rounded-full w-2 h-2 top-2 -left-1"></div>
                    )}
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
                      numberOfNotif={numberOfNotif}
                    />
                  </div>
                </div>
              </>
            ) : (
              <li
                onClick={() => {
                  setShowNav(false);
                }}
              >
                <Link to={"/sign-in"} className="flex items-center gap-2 p-2">
                  <IoLogIn />
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
