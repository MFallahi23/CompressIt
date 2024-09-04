import { FaUser, FaMoneyCheck, FaHistory } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { IoSettings } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const ProfileOptions = ({ setShowNav, setShowDesktopOpt, numberOfNotif }) => {
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
        to={"/profile/notifications"}
        onClick={() => {
          setShowNav(false);
          setShowDesktopOpt(false);
        }}
        className=" flex items-center gap-2 p-1"
      >
        <div className="text-xl relative">
          {numberOfNotif > 0 && (
            <div className="absolute z-20 bg-orange-600 rounded-full w-2 h-2 top-0 left-1/2"></div>
          )}
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
