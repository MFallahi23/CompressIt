import pool from "../helpers/db.js";
import { getRole } from "../helpers/getRole.js";

const getNotifications = async (req, res, next) => {
  const userId = req.user;
  const userRole = getRole(userId, next);
  try {
    const result = await pool.query(
      "SELECT * FROM notifications WHERE $1 = ANY(roles) ORDER BY created_at DESC",
      [userRole]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export default getNotifications;
