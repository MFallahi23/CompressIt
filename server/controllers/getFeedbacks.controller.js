const getFeedbacks = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM feedbacks");
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export default getFeedbacks;
