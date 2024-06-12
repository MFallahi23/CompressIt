import { FaUser, FaMoneyCheck, FaHistory } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { IoSettings } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const ProfileOptions = ({ setShowNav, setShowDesktopOpt }) => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <Link
        to={"/profile/info"}
        onClick={() => {
          setShowNav(false);
          setShowDesktopOpt(false);
        }}
        className=" flex items-center gap-2 p-1"
      >
        <div className="text-xl">
          <FaUser />
        </div>

        <h2 className="text-xl">My Profile</h2>
      </Link>
      <Link
        to={"/profile/billing"}
        onClick={() => {
          setShowNav(false);
          setShowDesktopOpt(false);
        }}
        className=" flex items-center gap-2 p-1"
      >
        <div className="text-xl">
          <FaMoneyCheck />
        </div>

        <h2 className="text-xl">Billing</h2>
      </Link>
      <Link
        to={"/profile/history"}
        onClick={() => {
          setShowNav(false);
          setShowDesktopOpt(false);
        }}
        className=" flex items-center gap-2 p-1"
      >
        <div className="text-xl">
          <FaHistory />
        </div>

        <h2 className="text-xl">History</h2>
      </Link>
      <Link
        to={"/profile/notifications"}
        onClick={() => {
          setShowNav(false);
          setShowDesktopOpt(false);
        }}
        className=" flex items-center gap-2 p-1"
      >
        <div className="text-xl">
          <IoIosNotifications />
        </div>

        <h2 className="text-xl">Notifications</h2>
      </Link>
      <Link
        to={"/profile/feedback"}
        onClick={() => {
          setShowNav(false);
          setShowDesktopOpt(false);
        }}
        className=" flex items-center gap-2 p-1"
      >
        <div className="text-xl">
          <VscFeedback />
        </div>

        <h2 className="text-xl">Feedback</h2>
      </Link>
      <Link
        to={"/profile/settings"}
        onClick={() => {
          setShowNav(false);
          setShowDesktopOpt(false);
        }}
        className=" flex items-center gap-2 p-1 mb-1"
      >
        <div className="text-xl">
          <IoSettings />
        </div>

        <h2 className="text-xl">Settings</h2>
      </Link>
      <hr />
      <div
        className=" flex items-center gap-2 p-1 cursor-pointer mt-1 header__log-out"
        onClick={() => {
          setShowNav(false);
          setShowDesktopOpt(false);
          signOut();
        }}
      >
        <div className="text-xl">
          <PiSignOutBold />
        </div>

        <h2 className="text-xl">Log out</h2>
      </div>
    </>
  );
};

export default ProfileOptions;
