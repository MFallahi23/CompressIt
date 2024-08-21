import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";

const Notifications = () => {
  const { auth } = useAuth();
  const [notif, setNotif] = useState({ title: "", body: "" });
  const [userNotif, setUserNotif] = useState([
    {
      title: " Notif title, this the notification title, this the title",
      body: "this is the body of the notification Notif title, this the notification title, this the notification title Notif title, this the notification title, this the notification title Notif title, this the notification title, this the notification title",
    },
    {
      title: " Notif title, this the notification title, this the title",
      body: "this is the body of the notification Notif title, this the notification title, this the notification title Notif title, this the notification title, this the notification title Notif title, this the notification title, this the notification title",
    },
  ]);
  const [error, setError] = useState("");
  const [options, setOptions] = useState({
    vip: false,
    premium: false,
    starter: false,
    free: false,
  });

  const handleCheckBoxes = (e) => {
    setOptions((prevState) => ({
      ...prevState,
      [e.target.value]: !prevState[e.target.value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!notif.body || !notif.title) {
      setError("The title or body is empty!");
      return;
    }
    try {
      const response = await axiosPrivate.post("/api/admin/notification", {
        notif,
        options,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setError("");
  }, [notif, options]);

  // Get the notifications
  // useEffect(async () => {
  //   try {
  //     const response = await axiosPrivate.get("/api/user/notifications");
  //     const { notifications } = response.data;
  //     setUserNotif(notifications);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // }, []);
  return (
    <section className="max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] mx-auto flex flex-col items-center my-3 mb-20">
      {error && <div className=" bg-red-500 rounded-md p-2 mb-4">{error}</div>}
      <h1 className=" text-5xl font-extrabold mb-3">Notifications</h1>
      {auth?.role === "admin" && (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex gap-1 items-baseline max-[450px]:flex-col max-[450px]:items-center">
            <h3 className="p-2 text-2xl max-[450px]:text-lg"> Send to</h3>

            <div className="p-2 flex items-center gap-1">
              <input
                type="checkbox"
                value="vip"
                id="vip"
                className=""
                checked={options.vip}
                onChange={handleCheckBoxes}
              />
              <label htmlFor="vip">Vip</label>
            </div>
            <div className="p-2 flex items-center gap-1">
              <input
                type="checkbox"
                value="premium"
                id="premium"
                checked={options.premium}
                onChange={handleCheckBoxes}
              />
              <label htmlFor="premium">Premium</label>
            </div>
            <div className="p-2 flex items-center gap-1">
              <input
                type="checkbox"
                value="starter"
                id="starter"
                checked={options.starter}
                onChange={handleCheckBoxes}
              />
              <label htmlFor="starter">Starter</label>
            </div>
            <div className="p-2 flex items-center gap-1">
              <input
                type="checkbox"
                value="free"
                id="free"
                checked={options.free}
                onChange={handleCheckBoxes}
              />
              <label htmlFor="free">Free</label>
            </div>
          </div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name=""
            id="title"
            className="rounded-md p-2 text-blackColor"
            placeholder="Here goes the best title you can think of"
            value={notif.title}
            onChange={(e) =>
              setNotif((prevState) => ({ ...prevState, title: e.target.value }))
            }
          />
          <label htmlFor="body">Body</label>

          <textarea
            name=""
            id="body"
            rows={6}
            className=" rounded-md p-2 text-blackColor"
            placeholder="Here goes your super useful notification"
            value={notif.body}
            onChange={(e) =>
              setNotif((prevState) => ({ ...prevState, body: e.target.value }))
            }
          ></textarea>
          <button className="cta__btn p-2 rounded-md">Send notification</button>
        </form>
      )}

      <div className="mt-5">
        <p className="text-center mb-3">Here will appear notifications</p>
        <div className="flex flex-col gap-4">
          {userNotif && userNotif.length > 0 ? (
            userNotif.map((notif) => (
              <div className="border rounded-md p-4 w-[80vw] sm:w-[60vw]">
                <h2 className=" text-4xl mb-2">{notif.title}</h2>
                <p className=" text-gray-300">{notif.body}</p>
              </div>
            ))
          ) : (
            <h2 className=" text-center text-2xl">
              No Notfication for the moment
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Notifications;
