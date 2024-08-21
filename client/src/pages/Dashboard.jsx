import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { FaEye } from "react-icons/fa";
import { getUserRoleLabel } from "../utils/roleUtils";
import "./styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const naviagte = useNavigate();
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
  return (
    <section className="max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] mx-auto flex flex-col items-center my-3 mt-10">
      <h1 className=" text-5xl font-extrabold">Admin Panel</h1>
      <div className="my-20 w-[80vw] border rounded-lg flex flex-col gap-2 ">
        {users && users.length > 0 ? (
          users.map((user, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between  w-[100%] p-2 max-[600px]:text-xs user"
              >
                <div className=" max-[500px]:hidden">{user.username}</div>
                <div className="truncate max-w-56">{user.email}</div>
                <div className="">{getUserRoleLabel(user.role)}</div>
                {user.role !== "admin" && user.role !== "vip" && (
                  <div className="  bg-orange-600 p-1 rounded-lg max-[800px]:hidden">
                    Make Vip
                  </div>
                )}
                {user.role === "vip" && (
                  <div className=" bg-orange-600 p-1 rounded-lg max-[800px]:hidden">
                    Remove Vip
                  </div>
                )}
                {user.role !== "admin" && (
                  <div className=" bg-red-600 p-1 rounded-lg max-[800px]:hidden">
                    Delete
                  </div>
                )}

                <Link
                  className=" bg-slate-500 rounded-full p-2 hover:opacity-50 cursor-pointer"
                  to={`/user/${user.user_id}`}
                >
                  <FaEye />
                </Link>
              </div>
            );
          })
        ) : (
          <div>Your app don't have users</div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
