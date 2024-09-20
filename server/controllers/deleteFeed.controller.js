import pool from "../helpers/db.js";
import { errorHandler } from "../helpers/error.js";

const deleteFeed = async (req, res, next) => {
  try {
    const { id: feedId } = req.body;
    if (!feedId) {
      return next(errorHandler(400, "Feedback id is required"));
    }
    const result = await pool.query("DELETE FROM feedbacks WHERE id=$1", [
      feedId,
    ]);

    if (result.rowCount === 0) {
      return next(errorHandler(404, "Feedback not found"));
    }
    res.status(200).json({ message: "Successfully deleted the feedback" });
  } catch (error) {
    next(error);
  }
};
export default deleteFeed;
