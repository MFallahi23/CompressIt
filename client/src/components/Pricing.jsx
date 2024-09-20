import React from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Pricing = ({ type, handleBuy }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (typeof handleBuy === "function") {
      handleBuy(type === "premium");
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <article
      className={` ${
        type === "starter" ? "home__free__plan" : "home__premium__plan"
      } flex flex-col p-12 rounded-md`}
    >
      <h3 className="text-xl text-slate-400">
        {type === "starter" ? "Starter" : "Premium"}
      </h3>
      <div className="">
        <span className=" line-through opacity-60">
          {type === "starter" ? "$29" : "$49"}
        </span>
        <span className=" text-6xl mx-2">
          {" "}
          {type === "starter" ? "9" : "19"}
        </span>
        <span className=" text-neutral-400">usd</span>
      </div>
      <ul className="pricing__features__list flex flex-col gap-2 mt-3">
        <li className="flex items-center">
          <FaCheck />
          Images compression
        </li>
        <li className="flex items-center">
          <FaCheck />
          Png/Jpg/Jpeg
        </li>
        <li className="flex items-center">
          <FaCheck />
          Webp
        </li>
        <li className="flex items-center">
          <FaCheck />
          HEIC
        </li>
        <li className="flex items-center">
          <FaCheck />
          Gif
        </li>
        <li className="flex items-center">
          <FaCheck />
          Svg
        </li>
        <li className="flex items-center">
          <FaCheck />
          tiff
        </li>
        <li className="flex items-center">
          <FaCheck />
          bmp
        </li>

        <li
          className={`flex items-center ${
            type === "starter" ? "opacity-30" : ""
          }`}
        >
          {type === "starter" ? <MdCancel /> : <FaCheck />}
          Large amount of images (400+)
        </li>
        <li
          className={`flex items-center ${
            type === "starter" ? "opacity-30" : ""
          }`}
        >
          {type === "starter" ? <MdCancel /> : <FaCheck />}
          Large web app compression (100MB+)
        </li>
      </ul>
      <button
        className="cta__btn transition p-2 rounded-md text-xl px-10 mt-8 self-center"
        onClick={handleClick}
      >
        Get started
      </button>
      <p className="self-center mt-4 opacity-60">Pay once, profit forever</p>
    </article>
  );
};

export default Pricing;
