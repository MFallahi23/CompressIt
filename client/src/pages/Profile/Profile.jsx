import React from "react";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <section className="my-8 w-[100%]">
      <div className=" w-[100%]">
        <Outlet />
      </div>
    </section>
  );
};

export default Profile;
