import pool from "./db.js";

const getRole = async (userId, next) => {
  try {
    const foundUser = await pool.query("SELECT * FROM usr WHERE user_id = $1", [
      userId,
    ]);
    if (foundUser.rows.length === 0) {
      return next(errorHandler(401, "User not found!"));
    }
    return foundUser.rows[0].role;
  } catch (error) {
    next(error);
  }
};
const defineLimit = async (userId, next) => {
  try {
    const role = await getRole(userId, next);
    if (role === "user") {
      return 90;
    } else if (role === "starter") {
      return 900;
    } else if (role === "premium") {
      return 4000;
    } else {
      return 5000;
    }
  } catch (error) {
    return next(error);
  }
};

export { defineLimit, getRole };
