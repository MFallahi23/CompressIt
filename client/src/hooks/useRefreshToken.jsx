import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/api/user/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(prev);
      return {
        ...prev,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
        accessToken: response.data.accessToken,
        profilePic: response.data.profilePic,
        createdAt: response.data.createdAt,
        occupation: response.data.occupation,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
