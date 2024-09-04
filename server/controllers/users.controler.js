import pool from "../helpers/db.js";

const getUsers = async (req, res, next) => {
  try {
    // Query all users from the usr table
    const users = await pool.query("SELECT * FROM usr");
    // check if usr table is empty
    if (users.rows.length == 0) {
      res.send("No users!");
    }
    res.json(users.rows);
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    // Query the user from the usr table
    const user = await pool.query("SELECT * FROM usr WHERE user_id = $1", [
      userId,
    ]);
    // check if usr table is empty
    if (user.rows.length == 0) {
      res.send("User not found");
    }
    // NEED TO BE FIXED!!!!!!!!!!!
    res.json(user.rows[0]);
  } catch (error) {
    next(error);
  }
};
const getUsageCount = async (req, res, next) => {
  try {
    const userId = req.user;

    // Query the user from the usr table
    const user = await pool.query(
      "SELECT usage_count FROM usr WHERE user_id = $1",
      [userId]
    );
    // check if usr table is empty
    if (user.rows.length == 0) {
      res.send("User not found");
    }

    res.json(user.rows[0]);
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser, getUsageCount };
