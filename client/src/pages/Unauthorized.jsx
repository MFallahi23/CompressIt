import React from "react";
import icon from "../assets/unauthorized.svg";
import back from "../assets/back.svg";
import { useNavigate } from "react-router-dom";
import "./styles/unauthorized.css";
const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <section className="flex flex-col items-center my-20 relative">
      <h1 className=" text-9xl mb-3 ">401</h1>
      <p className=" mb-8">You are not authorized to access this page</p>
      <img
        src={icon}
        alt="unauthorized illustartion"
        className="unauthorized__icon w-20"
      />

      <p className=" mt-5 underline cursor-pointer" onClick={goBack}>
        Go back
      </p>
    </section>
  );
};

export default Unauthorized;
