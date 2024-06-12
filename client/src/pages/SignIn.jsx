import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles/signUp.css";
import Oauth from "../components/Oauth";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { auth, setAuth } = useAuth();

  // Refs

  const errRef = useRef();

  /****** States  *******/

  // Email
  // const [email, setEmail] = useState("");
  const [email, resetEmail, emailAttribs] = useInput("email", "");

  // Password
  const [pwd, setPwd] = useState("");

  const [showPwd, setShowPwd] = useState(false);

  // Err
  const [errMsg, setErrMsg] = useState("Ereror");

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  // function (handlers)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/user/login",
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { accessToken, role, username, profilePic, createdAt, occupation } =
        response?.data;

      setAuth({
        username,
        email,
        role,
        accessToken,
        profilePic,
        createdAt,
        occupation,
      });

      resetEmail();
      setPwd("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        console.log(error);
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
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
        <h1 className=" text-3xl">Sign In</h1>
        <h3 className=" opacity-80 -mt-1">
          Create a free account and speed up your app
        </h3>
        <form
          onSubmit={handleSubmit}
          className=" signForm flex flex-col gap-2 items-center mt-1 sm:mt-3 w-[100%] sm:max-w-auto mx-auto"
        >
          {/* Email */}
          <div className="input__container">
            <input
              type="email"
              id="email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              {...emailAttribs}
            />
            <span className="input__placeholder">Email</span>
          </div>

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

          <button
            // disabled={
            //   !validName || !validPwd || !validMatch || !validEmail
            //     ? true
            //     : false
            // }
            className=" bg-[#8b0000] text-whiteBg w-[100%] p-2  sm:p-3 rounded-md mt-4 hover:opacity-70 disabled:opacity-50"
          >
            Sign In
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className=" text-primaryBg underline" to={"/sign-up"}>
            Sign up
          </Link>
        </p>
        <p className="sign-up__line my-1 sm:my-2">or</p>
        <Oauth setErrMsg={setErrMsg} />
      </div>
    </section>
  );
};

export default SignIn;
