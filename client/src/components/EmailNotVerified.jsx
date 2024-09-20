import React, { useState } from "react";
import { axiosPrivate } from "../api/axios";

const EmailNotVerified = ({ setError }) => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const verifyEmail = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.post("/api/user/send-email");
      if (response.status === 200) {
        setClicked(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      if (error.message) {
        setError(error.message);
      }
    }
  };
  return (
    <div className="mx-auto mt-3 max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] p-5 flex flex-col items-center gap-2 bg-whiteBg rounded">
      {clicked && !loading ? (
        <div className=" text-2xl text-blackColor">
          An email has been sent, check it out and click on the link to verify
          your email!
        </div>
      ) : !loading ? (
        <>
          <h4 className=" text-2xl text-blackColor">
            Your email is not verified! Verify your email to continue
          </h4>
          <button
            className="cta__btn p-2 rounded self-end"
            onClick={() => verifyEmail()}
          >
            Verify your email
          </button>
        </>
      ) : (
        <p className=" text-2xl text-blackColor text-center p-2">Loading...</p>
      )}
    </div>
  );
};

export default EmailNotVerified;
