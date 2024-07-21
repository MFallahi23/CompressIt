import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import "./styles/profile.css";
import ModalProfile from "../../components/ModalProfile";
import { getUserRoleLabel } from "../../utils/roleUtils.jsx";
import { displayImg } from "../../utils/imgUtils.jsx";

const PersonalInfo = () => {
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // display usr img
  // const displayImg = () => {
  //   const profilePic = auth?.profilePic;
  //   if (profilePic?.startsWith("https")) {
  //     return profilePic;
  //   } else {
  //     return "http://localhost:3000/images/" + profilePic;
  //   }
  // };

  const [imageUrl, setImageUrl] = useState(displayImg(auth?.profilePic));

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
    setImageUrl(displayImg(auth?.profilePic));
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
              referrerpolicy="no-referrer"
              alt="profile pic"
              className="min-w-16 min-h-16 sm:min-w-32 sm:min-h-32 rounded-full"
            />
          </div>
          <div className="personal-info__preview__text">
            <div className="personal-info__preview__username text-2xl truncate max-w-[10rem]">
              {auth?.username}
            </div>
            <div className="personal-info__preview__status text-blackColor">
              {getUserRoleLabel(auth?.role)}
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
      <div className="profile__optional flex flex-row items-center justify-center gap-5">
        {auth?.role === "admin" ? (
          <button className="transition p-2 rounded-md text-xl px-10 mt-8 bg-rose-800">
            Admin Pannel
          </button>
        ) : (
          ""
        )}
        {auth?.role === "user" ? (
          <button className="cta__btn transition p-2 rounded-md text-xl px-10 mt-8">
            Upgrade
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default PersonalInfo;
