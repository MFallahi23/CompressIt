import React from "react";

const Settings = () => {
  return (
    <section className="max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] mx-auto flex flex-col items-center my-3 mb-20">
      <h1 className=" text-5xl font-extrabold mb-3">Settings</h1>
      <div className="mt-10 flex flex-col items-center gap-3">
        <div className=" bg-slate-500 p-2 w-[100%] text-center rounded-md">
          Log out
        </div>
        <div className=" bg-red-600 p-2 rounded-md">Delete your account</div>
        <div className=""></div>
      </div>
    </section>
  );
};

export default Settings;
