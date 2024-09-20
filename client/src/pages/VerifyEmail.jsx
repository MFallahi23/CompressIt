import React, { useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const VerifyEmail = () => {
  const { emailToken } = useParams();
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  useEffect(() => {
    const verify = async () => {
      try {
        await refresh();
        const response = await axios.post(
          `/api/user/verify-email/${emailToken}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log("yeah");
          navigate("/", { replace: true });
          window.location.reload();
        }
      } catch (error) {
        console.log("err");
        navigate("/", { replace: true });
        window.location.reload();
      }
    };
    verify();
  }, []);
  return (
    <div className=" text-center text-2xl mt-10">Please wait a moment</div>
  );
};

export default VerifyEmail;
