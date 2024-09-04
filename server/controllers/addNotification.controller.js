import pool from "../helpers/db.js";

const addNotification = async (req, res, next) => {
  const { notif, options, userEmail } = req.body;
  let userId = null;
  if (userEmail) {
    const foundUser = await pool.query(
      "SELECT user_id FROM usr WHERE email=$1",
      [userEmail]
    );
    if (foundUser.rows.length > 0) {
      userId = foundUser.rows[0].user_id;
    } else {
      // Handle the case where no user is found (optional)
      return res.status(404).json({ message: "User not found" });
    }
  }

  const roles = Object.keys(options).filter((role) => options[role]);
  const rolesOrUserId = roles.length ? roles : null;

  try {
    const result = await pool.query(
      "INSERT INTO notifications (title,body,roles,user_id) VALUES ($1,$2,$3,$4) RETURNING id",
      [notif.title, notif.body, rolesOrUserId, userId]
    );

    const notificationId = result.rows[0].id;
    if (userId) {
      await pool.query(
        "INSERT INTO user_notifications (user_id, notification_id, read) VALUES ($1, $2, FALSE)",
        [userId, notificationId]
      );
    } else {
      const userWithRoles = await pool.query(
        "SELECT user_id FROM usr WHERE role = ANY($1)",
        [roles]
      );
      const userIds = userWithRoles.rows.map((user) => user.user_id);

      for (const id of userIds) {
        await pool.query(
          "INSERT INTO user_notifications (user_id, notification_id, read) VALUES ($1, $2, FALSE)",
          [id, notificationId]
        );
      }
    }
    res.status(201).json({ message: "Notification added successfully" });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
export default addNotification;
