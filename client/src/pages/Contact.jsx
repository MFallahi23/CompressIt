import React from "react";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <section className="flex flex-col max-w-[90%] md:max-w-[1200px] mx-auto  justify-center mt-10 gap-10">
      <h2 className=" text-5xl font-extrabold">Contact Us</h2>
      <div className="flex flex-col items-center gap-2">
        <p className=" flex gap-2 items-baseline">
          {" "}
          <span className=" font-bold text-xl">Email :</span>{" "}
          mohcinefallahi23@gmail.com
        </p>
        <p className=" flex gap-2 items-baseline">
          <span className=" font-bold text-xl">Twitter :</span>{" "}
          <a
            className=" underline"
            href="https://twitter.com/FallahiMouhcine"
            target="_blank"
          >
            Max Fallahi
          </a>
        </p>
        <p>or</p>
        <p>
          Write us a{" "}
          <Link to={"/feedback"} className=" text-orange-500 underline">
            feedback
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Contact;
