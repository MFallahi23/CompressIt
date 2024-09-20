import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "./styles/signUp.css";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
const ResetPass = () => {
  const location = useLocation();

  //   Params
  const { resetToken } = useParams();
  // Refs

  const errRef = useRef();

  /****** States  *******/

  // Password
  const [pwd, setPwd] = useState("");

  const [showPwd, setShowPwd] = useState(false);

  // Err
  const [errMsg, setErrMsg] = useState("");

  //   Success
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setErrMsg("");
  }, [pwd]);

  // function (handlers)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/user/reset/${resetToken}`,
        { password: pwd },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setPwd("");
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      if (!error?.response) {
        console.log(error);
        setErrMsg("No server response");
      } else if (error.response?.status === 404) {
        setErrMsg("Invalid reset link");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing  password");
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
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className=" text-3xl">Reset password</h1>
        <h3 className={`${success && "hidden"} opacity-80 -mt-1`}>
          Please create a new password{" "}
        </h3>
        <form
          onSubmit={handleSubmit}
          className={`${
            success && "hidden"
          } signForm flex flex-col gap-2 items-center mt-1 sm:mt-3 w-[100%] sm:max-w-auto mx-auto`}
        >
          {/* Password */}
          <div className="input__container">
            <input
              type={showPwd ? "text" : "password"}
              id="password"
              value={pwd}
              required
              onChange={(e) => setPwd(e.target.value)}
            />
            <span className="input__placeholder">Password</span>
            <FontAwesomeIcon
              icon={showPwd ? faEye : faEyeSlash}
              className="eye-icon cursor-pointer"
              onClick={() => setShowPwd(!showPwd)}
            />
          </div>

          <button className=" bg-[#8b0000] text-whiteBg w-[100%] p-2  sm:p-3 rounded-md mt-4 hover:opacity-70 disabled:opacity-50">
            Reset
          </button>
        </form>
        {success && (
          <div>Password reset successfully, please return to sign in page</div>
        )}
        <p>
          <Link className=" text-primaryBg underline" to={"/sign-in"}>
            Back to sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPass;
