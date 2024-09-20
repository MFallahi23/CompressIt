import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles/signUp.css";
import Oauth from "../components/Oauth";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
const ForgotPass = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showEmail, setShowEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  // Refs

  const errRef = useRef();

  /****** States  *******/

  // Email
  // const [email, setEmail] = useState("");
  const [email, resetEmail, emailAttribs] = useInput("email", "");

  // Err
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  // function (handlers)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "/api/user/forgot",
        { email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        setShowEmail(false);
      }
      resetEmail();
    } catch (error) {
      setLoading(false);
      if (!error?.response) {
        console.log(error);
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing email");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Reset Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="section__sign-in flex justify-center items-center h-[100vh]">
      <div className="bg-whiteBg text-blackColor sm:rounded-md p-5 sm:p-10 my-10 px-10 sm:px-20 flex flex-col gap-5 text-center w-[100%] sm:max-w-[600px] h-[100%] sm:h-auto ">
        {loading ? (
          <div className=" text-2xl text-center p-2 ">Loading...</div>
        ) : (
          <>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className=" text-3xl">Forgot your password?</h1>
            <h3 className={`${!showEmail && "hidden"} opacity-80 -mt-1`}>
              Please enter the email you use to sign in
            </h3>
            <form
              onSubmit={handleSubmit}
              className={`${
                !showEmail && "hidden"
              } signForm flex flex-col gap-2 items-center mt-1 sm:mt-3 w-[100%] sm:max-w-auto mx-auto`}
            >
              {/* Email */}
              <div className="input__container">
                <input
                  type="email"
                  id="email"
                  value={email}
                  {...emailAttribs}
                />
                <span className="input__placeholder">Email</span>
              </div>

              <button className=" bg-[#8b0000] text-whiteBg w-[100%] p-2  sm:p-3 rounded-md mt-4 hover:opacity-70 disabled:opacity-50">
                Request password reset
              </button>
            </form>
            {!showEmail && (
              <div>
                An email has been sent to your email address. Check your email,
                and visit the link to reset your password.
              </div>
            )}
            <p>
              <Link className=" text-primaryBg underline" to={"/sign-in"}>
                Back to Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPass;
