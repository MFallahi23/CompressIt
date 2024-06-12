import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const Oauth = ({ setErrMsg }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const response = await googleAuth(authResult.code);
        const {
          accessToken,
          email,
          role,
          username,
          profilePic,
          createdAt,
          occupation,
        } = response?.data;
        setAuth({
          username,
          email,
          role,
          accessToken,
          profilePic,
          createdAt,
          occupation,
        });
        navigate(from, { replace: true });
      } else {
        setErrMsg(authResult);
      }
    } catch (error) {
      setErrMsg("Login failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div
      className="flex justify-center items-center gap-6 border-2 p-2 sm:p-3 rounded-md cursor-pointer hover:bg-slate-100 transition"
      onClick={googleLogin}
    >
      <FcGoogle className=" text-2xl" />
      Sign up with Google
    </div>
  );
};

export default Oauth;
