import pool from "../helpers/db.js";

import { errorHandler } from "../middleware/errorHandler.js";

const logout = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return next(errorHandler(204, "No content"));
    const refreshToken = cookies.jwt;

    // Check if the user exists
    const foundUser = await pool.query(
      "SELECT * FROM usr WHERE refresh_token = $1",
      [refreshToken]
    );

    if (foundUser.rows.length == 0) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    await pool.query(
      "UPDATE usr SET refresh_token = NULL,resetpasswordtoken = NULL,resetpasswordtokenexpiry = NULL WHERE refresh_token = $1",
      [refreshToken]
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default logout;
