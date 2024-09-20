import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles/signUp.css";
import Oauth from "../components/Oauth";
import { CgDanger } from "react-icons/cg";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
const SignUp = () => {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const EMAIL_REGEX =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}$/;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();

  // Refs
  const userRef = useRef();
  const errRef = useRef();

  /****** States  *******/

  // Username
  // const [user, resetUser, userAttribs] = useInput("user", "");
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [userFocus, setUserFocus] = useState(false);

  // Email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // Password
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // Err
  const [errMsg, setErrMsg] = useState("");

  // Set focus to the username input
  useEffect(() => {
    userRef.current.focus();
  }, []);

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

  // Check if pwd  is valid
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd]);

  // function (handlers)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the entry are valid
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "/api/user/register",
        JSON.stringify({ username: user, email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

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
      // resetUser();
      setUser("");
      setEmail("");
      setPwd("");

      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 409) {
        setErrMsg("Account already exists");
      } else {
        setErrMsg("Registration Failed");
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
        <h1 className=" text-3xl">Sign up</h1>
        <h3 className=" opacity-80 -mt-1">
          Create a free account and speed up your app
        </h3>
        <form
          onSubmit={handleSubmit}
          className="signForm flex flex-col gap-1 items-center mt-1 sm:mt-3 w-[100%] sm:max-w-auto mx-auto"
        >
          {/* Username */}
          <label htmlFor="username">
            <span className={validName || !user ? "hide" : "invalid"}>
              <CgDanger className=" text-primaryBg text-xl" />
            </span>
          </label>
          <div className="input__container">
            <input
              type="text"
              value={user}
              ref={userRef}
              autoComplete="off"
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              // {...userAttribs}
              onChange={(e) => setUser(e.target.value)}
              className={user && !validName ? "invalid__input" : ""}
            />
            <span className="input__placeholder">Username</span>
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
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

          {/* Email */}
          <label htmlFor="email">
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <CgDanger className=" text-primaryBg text-xl" />
            </span>
          </label>
          <div className="input__container">
            <input
              type="email"
              id="email"
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              className={email && !validEmail ? "invalid__input" : ""}
            />
            <span className="input__placeholder">Email</span>
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

          {/* Password */}
          <label htmlFor="password">
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
              <CgDanger className=" text-primaryBg text-xl" />
            </span>
          </label>
          <div className="input__container">
            <input
              type={showPwd ? "text" : "password"}
              id="password"
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwddnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              onChange={(e) => setPwd(e.target.value)}
              className={pwd && !validPwd ? "invalid__input" : ""}
            />
            <span className="input__placeholder">Password</span>
            <FontAwesomeIcon
              icon={showPwd ? faEye : faEyeSlash}
              className="eye-icon cursor-pointer"
              onClick={() => setShowPwd(!showPwd)}
            />
            <p
              id="pwddnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>

          <button
            disabled={!validName || !validPwd || !validEmail ? true : false}
            className=" bg-[#8b0000] text-whiteBg w-[100%] p-2  sm:p-3 rounded-md mt-4 hover:opacity-70 disabled:opacity-50"
          >
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className=" text-primaryBg underline" to={"/sign-in"}>
            Sign in
          </Link>
        </p>
        <p className="sign-up__line my-1 sm:my-2">or</p>
        <Oauth setErrMsg={setErrMsg} />
        <p>
          By signing up to create an account i accept Company's{" "}
          <Link className="text-primaryBg underline">
            Terms of Use and Privacy Policy.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
