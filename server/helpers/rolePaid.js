import pool from "./db.js";

const rolePaid = async (userId, role, next) => {
  try {
    const result = await pool.query("UPDATE usr SET role=$1 WHERE user_id=$2", [
      role,
      userId,
    ]);

    if (result.rowCount === 0) {
      return next(new Error("User not found or role not updated"));
    }

    return { success: true };
  } catch (error) {
    next(error);
  }
};

export default rolePaid;
