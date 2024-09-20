import pool from "../helpers/db.js";
import { errorHandler } from "../helpers/error.js";

const checkEmailVerified = async (req, res, next) => {
  try {
    const userId = req.user;
    const response = await pool.query(
      "SELECT email_verified FROM usr WHERE user_id=$1",
      [userId]
    );
    if (response.rows.length === 0) {
      return next(errorHandler(404, "User not found"));
    }
    const emailVerified = response.rows[0].email_verified;
    if (emailVerified === null || emailVerified === undefined) {
      return next(errorHandler(500, "Email verification status unknown"));
    }
    res.status(200).json({ emailVerified });
  } catch (error) {
    next(error);
  }
};

export default checkEmailVerified;
