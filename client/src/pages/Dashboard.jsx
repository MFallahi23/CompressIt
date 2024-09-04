import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

import "./styles/dashboard.css";

import Users from "../components/Users";
import Statistics from "../components/Statistics";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [activePanel, setActivePanel] = useState("user");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/api/admin/allusers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const renderContent = (type) => {
    switch (type) {
      case "user":
        return <Users users={users} />;
      case "statistics":
        return <Statistics setError={setError} />;
      default:
        return <div>An error has occured, please refresh the page</div>;
    }
  };
  return (
    <section className="max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] mx-auto flex flex-col items-center my-3 mt-10">
      {error && <div className=" bg-red-600 p-2 rounded-md my-4">{error}</div>}
      <h1 className=" text-5xl font-extrabold">Admin Panel</h1>
      <div className="flex self-center  bg-whiteBg text-blackColor rounded-md w-[80vw] sm:w-[500px] md:w-[700px] max-[400px]:text-sm mt-10">
        <div
          className={`${
            activePanel === "user" ? "activeCompress" : ""
          } p-3 flex-1 flex justify-center rounded-md cursor-pointer transition`}
          onClick={() => setActivePanel("user")}
        >
          Users
        </div>
        <div
          className={`${
            activePanel === "statistics" ? "activeCompress" : ""
          } p-3 flex-1 flex justify-center rounded-md cursor-pointer transition`}
          onClick={() => setActivePanel("statistics")}
        >
          Statistics
        </div>
      </div>
      {renderContent(activePanel)}
    </section>
  );
};

export default Dashboard;
