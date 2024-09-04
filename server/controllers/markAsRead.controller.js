import pool from "../helpers/db.js";

const markAsRead = async (req, res, next) => {
  const userId = req.user;
  const { notificationId } = req.body;

  try {
    console.log("Starting marking read: BackEnd");

    await pool.query(
      "UPDATE user_notifications SET read = TRUE WHERE user_id = $1 AND notification_id = $2",
      [userId, notificationId]
    );
    console.log("Finishing marking read: BackEnd");
    res.status(200).send("Notification marked as read");
  } catch (error) {
    next(error);
  }
};

export default markAsRead;
