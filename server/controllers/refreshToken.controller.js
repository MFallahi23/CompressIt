import pool from "../helpers/db.js";
import { errorHandler } from "../helpers/error.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return next(errorHandler(401, "Unauthorized"));
  const refreshToken = cookies.jwt;

  const foundUser = await pool.query(
    "SELECT * FROM usr WHERE refresh_token = $1",
    [refreshToken]
  );

  if (foundUser.rows.length === 0) {
    return next(errorHandler(403, "Forbidden"));
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.rows[0].user_id !== decoded.id)
      return next(errorHandler(403, "Forbidden"));
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: decoded.id,
          role: foundUser.rows[0].role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "120s",
      }
    );
    res.json({
      role: foundUser.rows[0].role,
      user_id: decoded.id,
      username: foundUser.rows[0].username,
      email: foundUser.rows[0].email,
      accessToken,
      profilePic: foundUser.rows[0].profile_picture_filename,
      createdAt: foundUser.rows[0].created_at,
      occupation: foundUser.rows[0].occupation,
    });
  });
};

export default refreshToken;
