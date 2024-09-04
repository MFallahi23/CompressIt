import pool from "../helpers/db.js";

const getAdminNotification = async (req, res, next) => {
  try {
    const { rows: notifications } = await pool.query(
      "SELECT * FROM notifications ORDER BY created_at DESC"
    );

    res.status(200).json({ notifications: notifications });
  } catch (error) {
    next(error);
  }
};

export default getAdminNotification;
