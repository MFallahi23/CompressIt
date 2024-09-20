import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import EmailNotVerified from "./EmailNotVerified";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../api/axios";

const Layout = () => {
  const { auth } = useAuth();
  const [error, setError] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const checkEmailVerif = async () => {
      try {
        const resposne = await axiosPrivate.get("/api/user/check-email");
        if (resposne.status === 200) {
          setIsEmailVerified(resposne.data.emailVerified);
        }
      } catch (error) {
        if (error.message) {
          console.error(error);
          setError(error.message);
        }
      }
    };
    if (auth && Object.entries(auth).length !== 0) {
      checkEmailVerif();
    }
  }, []);
  return (
    <>
      {error && <div className=" bg-red-500 p-2">{error}</div>}
      <Header />
      {auth && Object.entries(auth).length !== 0 && !isEmailVerified && (
        <EmailNotVerified setError={setError} />
      )}

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
