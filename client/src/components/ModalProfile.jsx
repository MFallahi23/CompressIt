import React, { useEffect, useRef, useState } from "react";
import profilePic from "../assets/default_profile_pic.jpg";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/axiosPrivate";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalProfile = ({ showModal, setShowModal }) => {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const EMAIL_REGEX =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const { auth, setAuth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const errRef = useRef();
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  // Username
  const [user, setUser] = useState(auth?.username);
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // Email
  const [email, setEmail] = useState(auth?.email);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [occupation, setOccupation] = useState(auth?.occupation);

  const [errMsg, setErrMsg] = useState("hjj");
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

  useEffect(() => {
    setImageUrl(displayImg());
  }, [auth.profilePic]);

  // Ensure the app does not not scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showModal]);

  // Check if username is valid
  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  // Check if email is valid
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email]);

  //   Handle photo changes
  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  };

  // Handle profile changes
  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrMsg(null);
    // Check if the entry are valid
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    const formData = new FormData();
    formData.append("username", user);
    formData.append("email", email);
    formData.append("occupation", occupation);
    if (file) {
      formData.append("file", file);
    }
    try {
      const response = await axiosPrivate.post("/api/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { accessToken, role, profilePic, createdAt, occupation } =
        response?.data;
      setAuth({
        username: user,
        email,
        role,
        accessToken,
        profilePic,
        createdAt,
        occupation,
      });

      setShowModal(false);
    } catch (error) {
      setErrMsg("Failed saving changes");
    }
  };

  return (
    <>
      <div
        className={` ${
          !showModal && "hidden"
        } overlay fixed top-0 left-0 w-[100vw] h-[100vh] bg-zinc-800 opacity-50 z-40 flex justify-center items-center`}
      >
        {" "}
      </div>
      <div
        className={`${
          !showModal && "hidden"
        } modal fixed top-[50%] left-[50%] w-full h-full sm:w-fit sm:h-fit translate-x-[-50%] translate-y-[-50%] z-50 bg-white text-blackColor  sm:rounded-lg md:min-w-[600px]`}
      >
        <div className=" bg-slate-100 h-20 sm:rounded-t-lg"></div>
        <div className="p-10">
          <div className=" absolute top-10 left-[50%] translate-x-[-50%] flex flex-col">
            <div className="personal-info__preview__img">
              <img
                src={fileUrl || imageUrl}
                alt="profile pic"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="personal-info__preview__text">
              <div className="personal-info__preview__username text-3xl">
                {auth?.username}
              </div>
              <div className="personal-info__preview__status text-blackColor text-center">
                {getUserRoleLabel()}
              </div>
            </div>
          </div>
          <form
            className="profile__modal__form mt-28 min-w-[400px] "
            onSubmit={handleUpdate}
          >
            <p
              ref={errRef}
              className={`${errMsg ? "errmsg" : "offscreen"} self-center`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="flex items-center justify-between w-[100%]">
              <label htmlFor="username">Username</label>
              <div className="">
                <input
                  type="text"
                  id="username"
                  className="border rounded p-1 "
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between w-[100%] mt-2">
              <label htmlFor="email">Email</label>
              <div className="">
                <input
                  type="email"
                  className="border rounded p-1 "
                  value={email}
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Please enter a valid email address.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between w-[100%] mt-2">
              <label htmlFor="occupation">Occupation</label>
              <input
                id="occupation"
                type="text"
                className="border rounded p-1"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between  w-[100%] mt-2">
              <label htmlFor="">Picture</label>
              <input
                type="file"
                className="hidden "
                ref={fileRef}
                accept="image/*"
                onChange={handleFileChange}
              />
              <img
                src={fileUrl || imageUrl}
                alt="profile pic"
                className="w-10 h-10 rounded-full"
              />
              <button
                type="button"
                className=" border-2 rounded p-1"
                onClick={() => fileRef.current.click()}
              >
                Replace
              </button>
            </div>
            <div className="flex gap-2 justify-end mt-5 pt-4  w-[100%]">
              <button
                type="button"
                className="border p-1 px-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className=" bg-blackColor text-whiteBg p-1 px-2 rounded">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalProfile;
