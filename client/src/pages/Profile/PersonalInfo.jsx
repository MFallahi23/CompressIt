import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import "./styles/profile.css";
import ModalProfile from "../../components/ModalProfile";
import { getUserRoleLabel } from "../../utils/roleUtils.jsx";
import { displayImg } from "../../utils/imgUtils.jsx";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../../utils/dateFormatting.jsx";
import { axiosPrivate } from "../../api/axios.js";
const PersonalInfo = () => {
  const { auth, setAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModa] = useState(false);
  const navigate = useNavigate();
  // Function to delete user account
  const deleteAcc = async () => {
    try {
      const response = await axiosPrivate.post("/api/user/delete");
      if (response.status === 200) {
        setAuth({});
        navigate("/");
      }
    } catch (error) {
      setShowDeleteModa(false);
      console.error(error);
    }
  };

  const [imageUrl, setImageUrl] = useState(displayImg(auth?.profilePic));

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
              referrerPolicy="no-referrer"
              alt="profile pic"
              className="max-[400px]:h-10 max-[400px]:w-10 h-16 w-16 sm:w-32 sm:h-32 rounded-full"
            />
          </div>
          <div className="personal-info__preview__text">
            <div className="personal-info__preview__username max-[400px]:text-xs text-2xl truncate max-w-[10rem]">
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
      <div className="mt-8">
        {auth?.role === "user" ? (
          <div className="flex flex-col gap-2 items-center">
            <p className="text-lg">
              You're using our{" "}
              <span className="font-bold text-orange-500">free</span> trial
            </p>
            <p>Compressions left: 4</p>
          </div>
        ) : auth?.role === "admin" ? (
          <div className="flex flex-col items-center">
            <p className="text-lg">
              Hey Max,you're the{" "}
              <span className="font-bold text-orange-500">Admin</span>, and what
              a great app you've made, here are some stats:
            </p>
          </div>
        ) : auth?.role === "vip" ? (
          <div className="flex flex-col items-center">
            <p className="text-lg">
              You're a <span className=" font-bold text-orange-500">vip</span> ,
              you have access to all the functionalities
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-lg text-center">
              You're using our{" "}
              <span className=" font-bold text-orange-500">{auth?.role}</span>{" "}
              compression service,
              <span>
                {" "}
                {auth?.role === "premium"
                  ? "You can compress up to 5000 images and 5GB per one compression "
                  : "You can compress maximum 1000 images and 1GB per compression"}
              </span>
            </p>

            {auth?.role === "starter" && (
              <button className="cta__btn p-2 rounded-md mt-5">
                Get premium
              </button>
            )}
          </div>
        )}
      </div>
      <div className="profile__optional flex flex-col sm:flex-row items-center justify-center gap-5 mt-2">
        {auth?.role === "admin" ? (
          <Link
            className="transition p-2 rounded-md text-xl px-10 mt-1 bg-rose-800"
            to={"/dashboard"}
          >
            Admin Pannel
          </Link>
        ) : (
          ""
        )}
        {auth?.role === "user" || auth?.role === "starter" ? (
          <button className="cta__btn transition p-2 rounded-md text-xl px-10 mt-1">
            Upgrade
          </button>
        ) : (
          ""
        )}
        <button
          className="bg-red-800 p-2 rounded-md font-bold text-xl mt-1 opacity-80"
          onClick={() => setShowDeleteModa(true)}
        >
          Delete account
        </button>
        {showDeleteModal && (
          <div className=" fixed z-30 top-0 bottom-0 left-0 right-0 bg-slate-600 bg-opacity-80 flex justify-center items-center">
            <div className="bg w-full h-full sm:w-fit sm:h-fit bg-slate-100  sm:rounded-lg text-blackColor sm:max-w-[500px] flex flex-col pt-40 sm:pt-4  gap-24 sm:gap-4 p-4">
              <h1 className="text-3xl pl-4 sm:pl-auto">
                Are you sure you want to delete your account?
              </h1>
              <div className="flex flex-col  sm:flex-row items-center gap-2 self-end">
                <button
                  className=" bg-red-600 p-1 rounded-md text-whiteBg w-[90vw] sm:w-auto"
                  onClick={deleteAcc}
                >
                  Delete
                </button>
                <button
                  className=" border-blackColor border p-1 rounded-md w-[90vw] sm:w-auto"
                  onClick={() => setShowDeleteModa(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalInfo;
