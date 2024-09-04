import pool from "../helpers/db.js";

const deleteAcc = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return next(errorHandler(204, "No content"));
    const refreshToken = cookies.jwt;

    // Check if the user exists
    const foundUser = await pool.query(
      "SELECT * FROM usr WHERE refresh_token = $1",
      [refreshToken]
    );

    if (foundUser.rows.length == 0) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    await pool.query("DELETE FROM usr WHERE user_id = $1", [
      foundUser.rows[0].user_id,
    ]);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default deleteAcc;
