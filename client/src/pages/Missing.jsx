import React from "react";
import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]  gap-2">
      <p
        className=" mt-5 underline cursor-pointer absolute top-10 left-10"
        onClick={goBack}
      >
        Go back
      </p>
      <div className=" text-6xl">Page not found</div>
      <div className=" text-6xl">404</div>
    </div>
  );
};

export default Missing;
