import pool from "../helpers/db.js";

const addNotification = async (req, res, next) => {
  const { notif, options } = req.body;
  const roles = Object.keys(options).filter((role) => options[role]);
  try {
    await pool.query(
      "INSERT INTO notifications (title,body,roles) VALUES ($1,$2,$3)",
      [notif.title, notif.body, roles]
    );
    res.status(201).json({ message: "Notification added successfully" });
  } catch (error) {
    next(error);
  }
};
export default addNotification;
