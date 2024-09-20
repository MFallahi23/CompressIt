import pool from "../helpers/db.js";

const getFeedbacks = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM feedbacks ORDER BY created_at DESC"
    );
    res.status(200).json({ feedbacks: result.rows });
  } catch (error) {
    next(error);
  }
};

export default getFeedbacks;
