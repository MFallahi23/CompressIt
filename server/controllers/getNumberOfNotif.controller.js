import pool from "../helpers/db.js";
import { getRole } from "../helpers/getRole.js";

const getNumberOfNotif = async (req, res, next) => {
  const userId = req.user;
  const userRole = await getRole(userId, next);

  try {
    const { rows: notifications } = await pool.query(
      `SELECT COUNT(*) as number_of_notif  FROM notifications n LEFT JOIN user_notifications un ON n.id = un.notification_id AND un.user_id = $1 WHERE ($2 = ANY(n.roles) OR n.user_id = $1) AND (un.read = FALSE OR un.read IS NULL) AND n.created_at > (SELECT created_at FROM usr WHERE user_id = $1)`,
      [userId, userRole]
    );

    res
      .status(200)
      .json({ number_of_notif: parseInt(notifications[0].number_of_notif) });
  } catch (error) {
    next(error);
  }
};

export default getNumberOfNotif;
