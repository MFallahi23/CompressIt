import React from "react";
import { Link } from "react-router-dom";
const Deleted = () => {
  return (
    <section className="max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] mx-auto flex flex-col gap-5 items-center my-3 mt-10">
      <h1 className=" text-4xl  font-bold">Successfully deleted the user</h1>
      <Link to={"/dashboard"} className=" bg-orange-500 p-1 rounded-md ">
        Go to dashboard
      </Link>
    </section>
  );
};

export default Deleted;
