import jwt from "jsonwebtoken";
import pool from "./db.js";

const createSendToken = async (
  res,
  userId,
  role,
  username,
  email,
  profilePic,
  createdAt,
  occupation
) => {
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: userId,
        role: role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "120s",
    }
  );
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  // saving refreshToken
  const setRefreshToken = await pool.query(
    "UPDATE usr SET refresh_token = $1 WHERE user_id = $2",
    [refreshToken, userId]
  );
  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    // sameSite: "None", Causing problems
    maxAge: 24 * 60 * 60 * 1000,
  });

  // Send role and access token to user
  res.json({
    role,
    user_id: userId,
    username,
    email,
    accessToken,
    profilePic,
    createdAt,
    occupation,
  });
};

export default createSendToken;
