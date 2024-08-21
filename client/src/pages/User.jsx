import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import { displayImg } from "../utils/imgUtils";
import { getUserRoleLabel } from "../utils/roleUtils";
import formatDate from "../utils/dateFormatting";
const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openModal, setOpenModal] = useState(false);
  // Function to make user a vip
  const makeVip = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axiosPrivate.post("/api/admin/makevip", {
        userId: id,
      });
      if (response.status === 200) {
        setSuccess("Successfully updated the role");
      }
    } catch (error) {
      if (error?.message) {
        setError(error.message);
      } else {
        setError("An error occured during making vip");
      }
    }
  };

  // Function to make user premium
  const makePremium = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axiosPrivate.post("/api/admin/makepremium", {
        userId: id,
      });
      if (response.status === 200) {
        setSuccess("Successfully updated the role");
      }
    } catch (error) {
      if (error?.message) {
        setError(error.message);
      } else {
        setError("An error occured during making premium");
      }
    }
  };

  // Function to make user starter
  const makeStarter = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axiosPrivate.post("/api/admin/makestarter", {
        userId: id,
      });
      if (response.status === 200) {
        setSuccess("Successfully updated the role");
      }
    } catch (error) {
      if (error?.message) {
        setError(error.message);
      } else {
        setError("An error occured during making starter");
      }
    }
  };

  // Function to make user a user ;)
  const makeUser = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axiosPrivate.post("/api/admin/makeuser", {
        userId: id,
      });
      if (response.status === 200) {
        setSuccess("Successfully updated the role");
      }
    } catch (error) {
      if (error?.message) {
        setError(error.message);
      } else {
        setError("An error occured during making user");
      }
    }
  };

  // Function to delete a user
  const deleteUser = async () => {
    setOpenModal(false);
    setError("");
    setSuccess("");
    try {
      const response = await axiosPrivate.post("/api/admin/deleteuser", {
        userId: id,
      });
      if (response.status === 200) {
        navigate("/deleted");
      }
    } catch (error) {
      if (error?.message) {
        setError(error.message);
      } else {
        setError("An error occured while deleting user");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.get("/api/admin/user", {
        params: { userId: id },
      });
      setUser(response.data);
    };
    fetchData();
    setError("");
  }, [success]);

  return (
    <section className="max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] mx-auto flex flex-col items-center my-3 mt-10">
      {openModal && (
        <div className=" fixed z-30 top-0 bottom-0 left-0 right-0 bg-slate-600 bg-opacity-80 flex justify-center items-center">
          <div className="bg w-full h-full sm:w-fit sm:h-fit bg-slate-100  sm:rounded-lg text-blackColor sm:max-w-[500px] flex flex-col pt-40 sm:pt-4  gap-24 sm:gap-4 p-4">
            <h1 className="text-3xl pl-4 sm:pl-auto">
              Are you sure you want to delete this user?
            </h1>
            <div className="flex flex-col  sm:flex-row items-center gap-2 self-end">
              <button
                className=" bg-red-600 p-1 rounded-md text-whiteBg w-[90vw] sm:w-auto"
                onClick={deleteUser}
              >
                Delete
              </button>
              <button
                className=" border-blackColor border p-1 rounded-md w-[90vw] sm:w-auto"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <div className=" bg-red-600 p-2 my-10 rounded-md">{error}</div>}
      {success && (
        <div className=" bg-lime-500 p-2 my-10 rounded-md">{success}</div>
      )}
      {user && (
        <div className="flex flex-col items-center gap-2 mb-10">
          <img
            src={displayImg(user.profile_picture_filename)}
            alt="profile picture"
          />
          <h2 className=" text-5xl mt-2"> {user.username}</h2>
          <p>{user.email}</p>
          {getUserRoleLabel(user.role)}
          <p>Occupation: {user.occupation}</p>
          <p>
            Have used the compressor: {user.usage_count}{" "}
            {user.usage_count === 1 ? "time" : "times"}
          </p>
          <p>Created {formatDate(user.created_at)}</p>
          <div className="flex flex-col sm:items-center sm:flex-row gap-2 justify-center w-[100%] sm:w-auto">
            {user.role !== "vip" && user.role !== "admin" && (
              <button
                className=" bg-yellow-400 p-1 rounded-lg"
                onClick={() => makeVip()}
              >
                Make Vip
              </button>
            )}
            {user.role !== "starter" && user.role !== "admin" && (
              <button
                className="bg-lime-500 p-1 rounded-lg"
                onClick={() => makeStarter()}
              >
                To Starter
              </button>
            )}
            {user.role !== "premium" && user.role !== "admin" && (
              <button
                className="bg-orange-600 p-1 rounded-lg"
                onClick={() => makePremium()}
              >
                To Premium
              </button>
            )}
            {user.role !== "admin" && user.role !== "user" && (
              <button
                className="bg-red-600 p-1 rounded-lg"
                onClick={() => makeUser()}
              >
                To User
              </button>
            )}
            {user.role !== "admin" && (
              <button
                className="bg-red-600 p-1 rounded-lg"
                onClick={() => setOpenModal(true)}
              >
                Delete user
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default User;
