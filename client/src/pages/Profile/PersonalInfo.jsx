import { useEffect, useRef, useState } from "react";
import profilePic from "../../assets/default_profile_pic.jpg";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import "./styles/profile.css";

import ModalProfile from "../../components/ModalProfile";

const PersonalInfo = () => {
  const { auth } = useAuth();
  console.log(auth);
  const [showModal, setShowModal] = useState(false);

  // display usr img
  const displayImg = () => {
    const profilePic = auth?.profilePic;
    if (profilePic?.startsWith("https")) {
      return profilePic;
    } else {
      return "http://localhost:3000/images/" + profilePic;
    }
  };

  const [imageUrl, setImageUrl] = useState(displayImg());
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
      return (
        <span className=" text-sm px-1 bg-amber-400 w-fit rounded-lg">
          Admin
        </span>
      );
    }
  };

  const formatDate = (date) => {
    const currentDate = new Date();
    const givenDate = new Date(date);
    const currentYear = currentDate.getFullYear();
    const givenYear = givenDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const givenMonth = givenDate.getMonth();
    const currentDay = currentDate.getDate();
    const givenDay = givenDate.getDate();

    const yearsDiff = currentYear - givenYear;
    const monthsDiff = currentMonth - givenMonth;
    const daysDiff = currentDay - givenDay;

    if (yearsDiff !== 0) {
      return `${yearsDiff} year(s) ago`;
    } else if (monthsDiff !== 0) {
      return `${monthsDiff} month(s) ago`;
    } else if (daysDiff !== 0) {
      return `${daysDiff} day(s) ago`;
    } else {
      return "Today";
    }
  };

  useEffect(() => {
    setImageUrl(displayImg());
  }, [auth.profilePic]);

  return (
    <section className="mx-auto my-3 mb-20 max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] p-5 flex flex-col  gap-4 justify-between  rounded">
      <ModalProfile
        showModal={showModal}
        setShowModal={setShowModal}
      ></ModalProfile>
      <div className=" flex items-center justify-between">
        <div className="personal-info__preview flex items-center gap-5 mb-5">
          <div className="personal-info__preview__img">
            <img
              src={imageUrl}
              alt="profile pic"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="personal-info__preview__text">
            <div className="personal-info__preview__username text-2xl truncate">
              {auth?.username}
            </div>
            <div className="personal-info__preview__status text-blackColor">
              {getUserRoleLabel()}
            </div>
          </div>
        </div>
        <div
          className=" border rounded-2xl p-2  text-xs sm:text-sm flex items-center gap-2 hover:bg-red-700 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          {" "}
          <FaRegEdit /> Edit
        </div>
      </div>
      <hr />
      <div className="personal-info__preview__text mt-4">
        <h1 className=" text-2xl">Personal information</h1>
        <div className="personal-info__display mt-4">
          <div className="">
            <h4>Username</h4>
            <p className=" truncate">{auth?.username}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p className=" truncate">{auth?.email}</p>
          </div>
          <div>
            <h4>Occupation</h4>
            <p className=" truncate">
              {auth?.occupation ? auth.occupation : "None"}
            </p>
          </div>
          <div>
            <h4>Account created</h4>
            <p className=" truncate">{formatDate(auth?.createdAt)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
