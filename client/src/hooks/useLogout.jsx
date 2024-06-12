import useAxiosPrivate from "./axiosPrivate";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const logout = async () => {
    setAuth({});
    try {
      const response = await axiosPrivate("/api/user/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
