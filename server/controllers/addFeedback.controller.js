import pool from "../helpers/db.js";

const addFeedback = async (req, res, next) => {
  const { feedback } = req.body;
  const userId = req.user;
  try {
    const foundUser = await pool.query("SELECT * FROM usr WHERE user_id= $1", [
      userId,
    ]);
    const username = foundUser.rows[0].username;

    await pool.query("INSERT INTO feedbacks (content,author) VALUES ($1, $2)", [
      feedback,
      username,
    ]);
    res.status(201).json({ message: "Feedback added successfully" });
  } catch (error) {
    next(error);
  }
};

export default addFeedback;
