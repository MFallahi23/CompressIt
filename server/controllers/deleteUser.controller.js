import pool from "../helpers/db.js";
import { errorHandler } from "../helpers/error.js";

const deleteUser = async (req, res, next) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return next(errorHandler(422, "User Id required"));
    }
    await pool.query("DELETE FROM usr WHERE user_id = $1", [userId]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export default deleteUser;
