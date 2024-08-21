import React from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Pricing = ({ type, handleBuy }) => {
  return (
    <article
      className={` ${
        type === "starter" ? "home__free__plan" : "home__premium__plan"
      } flex flex-col p-12 rounded-md`}
    >
      <h3 className="text-xl">{type === "starter" ? "Starter" : "Premium"}</h3>
      <div className="">
        <span className=" line-through opacity-60">
          {type === "starter" ? "$29" : "$49"}
        </span>
        <span className=" text-6xl mx-2">
          {" "}
          {type === "starter" ? "9" : "19"}
        </span>
        usd
      </div>
      <ul className="pricing__features__list flex flex-col gap-2 mt-3">
        <li className="flex items-center">
          <FaCheck />
          Images/assests compression
        </li>
        <li className="flex items-center">
          <FaCheck />
          File optimization
        </li>
        <li className="flex items-center">
          <FaCheck />
          Lazy loading implementation
        </li>
        <li className="flex items-center">
          <FaCheck />
          Caching implementation
        </li>
        <li className="flex items-center">
          <FaCheck />
          Pure HTML/CSS/JS optimization
        </li>
        <li className="flex items-center">
          <FaCheck />
          ReactJS/ExpressJS optimization
        </li>
        <li className="flex items-center">
          <FaCheck />
          NextJS optimization
        </li>
        <li className="flex items-center">
          <FaCheck />
          Django optimization
        </li>
        <li className="flex items-center">
          <FaCheck />
          Laravel optimization
        </li>
        <li
          className={`flex items-center ${
            type === "starter" ? "opacity-30" : ""
          }`}
        >
          {type === "starter" ? <MdCancel /> : <FaCheck />}
          Unlimited compressions
        </li>
        <li
          className={`flex items-center ${
            type === "starter" ? "opacity-30" : ""
          }`}
        >
          {type === "starter" ? <MdCancel /> : <FaCheck />}
          Large web app compression (50GB+)
        </li>
      </ul>
      <button
        className="cta__btn transition p-2 rounded-md text-xl px-10 mt-8 self-center"
        onClick={() => handleBuy(type === "premium")}
      >
        Get started
      </button>
      <p className="self-center mt-4 opacity-60">Pay once, profit forever</p>
    </article>
  );
};

export default Pricing;
