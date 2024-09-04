import pool from "../helpers/db.js";
import { getRole } from "../helpers/getRole.js";

const getNotifications = async (req, res, next) => {
  const userId = req.user;
  const userRole = await getRole(userId, next);

  try {
    const { rows: notifications } = await pool.query(
      `SELECT n.id, n.title, n.body, n.roles, n.user_id, n.created_at, COALESCE(un.read, FALSE) AS read FROM notifications n LEFT JOIN user_notifications un ON n.id = un.notification_id AND un.user_id = $1 WHERE ($2 = ANY(n.roles) OR n.user_id = $1) AND n.created_at > (SELECT created_at FROM usr WHERE user_id = $1) ORDER BY n.created_at DESC`,
      [userId, userRole]
    );

    res.status(200).json({ notifications });
  } catch (error) {
    next(error);
  }
};

export default getNotifications;
