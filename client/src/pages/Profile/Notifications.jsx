import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import formatDate from "../../utils/dateFormatting";

const Notifications = () => {
  const { auth } = useAuth();
  const [notif, setNotif] = useState({ title: "", body: "" });
  const [userNotif, setUserNotif] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [options, setOptions] = useState({
    vip: false,
    premium: false,
    starter: false,
    user: false,
  });
  const [userEmail, setUserEmail] = useState("");
  const [emailMap, setEmailMap] = useState({});

  const handleCheckBoxes = (e) => {
    setUserEmail("");
    setOptions((prevState) => ({
      ...prevState,
      [e.target.value]: !prevState[e.target.value],
    }));
  };

  const handleUserEmail = (e) => {
    setOptions({
      vip: false,
      premium: false,
      starter: false,
      user: false,
    });
    setUserEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    if (!notif.body || !notif.title) {
      setError("The title or body is empty!");
      return;
    }
    try {
      const response = await axiosPrivate.post("/api/admin/notification", {
        notif,
        options,
        userEmail,
      });
      if (response.status === 201) {
        setNotif({ title: "", body: "" });
        setSuccess("Successfully added the notifiction");
      }
    } catch (error) {
      if (error.message) {
        setError(error.message);
      }
      console.error(error);
    }
  };

  // Function to mark the notification as read for the user
  const markAsRead = async (notifId) => {
    try {
      console.log("Starting marking as read : FrontEnd");

      const response = await axiosPrivate.post("/api/user/mark-as-read", {
        notificationId: notifId,
      });
      if (response.status === 200) {
        console.log("Finished marking as read : FrontEnd");

        setUserNotif((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif.id === notifId ? { ...notif, read: true } : notif
          )
        );
      }
    } catch (error) {
      if (error.message) {
        setError(error.message);
      }
      console.error(error);
    }
  };

  const getEmail = async (userId) => {
    try {
      const response = await axiosPrivate.get("/api/admin/user", {
        params: { userId },
      });

      return response.data.email;
    } catch (error) {
      if (error.message) {
        setError(error.message);
      }
      console.error(error);
    }
  };
  useEffect(() => {
    setError("");
    setSuccess("");
  }, [notif, options]);

  // Get the notifications
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        let response;
        if (auth?.role === "admin") {
          response = await axiosPrivate.get("/api/admin/getnotifications");
        } else {
          response = await axiosPrivate.get("/api/user/notifications");
        }
        console.log(response.data);

        setUserNotif(response.data.notifications);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchNotif();
  }, [success]);

  // Fetch emails for notifications without roles
  useEffect(() => {
    const fetchEmails = async () => {
      const emailPromises = userNotif.map(async (notif) => {
        if (!notif.roles || notif.roles.length === 0) {
          const email = await getEmail(notif.user_id);
          return { userId: notif.user_id, email };
        }
        return null;
      });

      const emails = await Promise.all(emailPromises);
      const newEmailMap = {};
      emails.forEach((entry) => {
        if (entry) {
          newEmailMap[entry.userId] = entry.email;
        }
      });

      setEmailMap(newEmailMap);
    };

    fetchEmails();
  }, [userNotif]);

  return (
    <section className="max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] mx-auto flex flex-col items-center my-3 mb-20">
      {error && <div className=" bg-red-500 rounded-md p-2 mb-4">{error}</div>}
      {success && (
        <div className=" bg-lime-500 rounded-md p-2 mb-4">{success}</div>
      )}
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
                value="user"
                id="free"
                checked={options.user}
                onChange={handleCheckBoxes}
              />
              <label htmlFor="free">Free</label>
            </div>
          </div>
          <div className="flex items-baseline self-center">
            <h3 className="p-2 text-2xl max-[450px]:text-lg">Or to</h3>
            <input
              type="email"
              name=""
              id=""
              className="p-1 rounded-md text-blackColor"
              placeholder="Email of the user"
              value={userEmail || ""}
              onChange={handleUserEmail}
            />
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
            userNotif.map((notif, i) => (
              <div
                className={`border rounded-md p-4 w-[80vw] sm:w-[60vw] flex flex-col ${
                  notif.read ? "opacity-35" : " "
                }`}
                key={i}
              >
                <h2 className=" text-4xl mb-2">{notif.title}</h2>
                <p className=" text-gray-300">{notif.body}</p>
                {auth?.role === "admin" && (
                  <div className=" flex gap-1 mt-2">
                    to:
                    {notif.roles && notif.roles.length > 0 ? (
                      notif.roles.map((role, i) => <p key={i}>{role}</p>)
                    ) : (
                      <p>{emailMap[notif.user_id]}</p>
                    )}
                  </div>
                )}
                <p className=" self-end italic">
                  {formatDate(notif.created_at)}
                </p>

                {!notif.read && auth?.role !== "admin" && (
                  <button
                    className=" bg-orange-600 rounded-md p-1 mt-3"
                    onClick={() => markAsRead(notif.id)}
                  >
                    Mark as read
                  </button>
                )}
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
