import { validationResult } from "express-validator";
import pool from "../helpers/db.js";
import createSendToken from "../helpers/tokenUtils.js";
import { errorHandler } from "../middleware/errorHandler.js";

// Update the user
const updateUser = async (req, res, next) => {
  try {
    // Check for validation error

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const userId = req.user;
    const { username, email, occupation } = req.body;

    const profilePic = req.file?.filename;

    // If userId not present return 401
    if (!userId)
      return next(errorHandler(401, "Unauthorized: No user id found"));

    // Retrieve user form db
    const foundUser = await pool.query("SELECT * FROM usr WHERE user_id = $1", [
      userId,
    ]);

    // If not found return 404
    if (foundUser.rows.length === 0)
      return next(errorHandler(404, "User not found"));

    const {
      username: foundUsername,
      email: foundEmail,
      profile_picture_filename: foundPic,
      occupation: foundOccupation,
    } = foundUser.rows[0];

    // Update only if username or email changed

    if (
      username !== foundUsername ||
      email !== foundEmail ||
      profilePic !== foundPic ||
      occupation !== foundOccupation
    ) {
      const updates = [];
      const values = [];
      let query = "UPDATE usr SET ";
      let index = 1;

      if (username && username !== foundUsername) {
        updates.push(`username=$${index}`);
        values.push(username);
        index++;
      }

      if (email && email !== foundEmail) {
        updates.push(`email=$${index}`);
        values.push(email);
        index++;
      }

      if (profilePic && profilePic !== foundPic) {
        updates.push(`profile_picture_filename=$${index}`);
        values.push(profilePic);

        index++;
      }

      if (occupation && occupation !== foundOccupation) {
        updates.push(`occupation=$${index}`);
        values.push(occupation);
        index++;
      }

      query += updates.join(", ") + ` WHERE user_id=$${index}`;
      values.push(userId);

      await pool.query(query, values);
      // Clear old JWT cookie and send new one
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      const newUser = await pool.query("SELECT * FROM usr WHERE user_id=$1", [
        userId,
      ]);
      const newprofilePic = newUser.rows[0].profile_picture_filename;
      const createdAt = newUser.rows[0].created_at;
      const newOccupation = newUser.rows[0].occupation;
      createSendToken(
        res,
        userId,
        req.role,
        username,
        email,
        newprofilePic,
        createdAt,
        newOccupation
      );
    } else {
      // NO changes are made
      res.status(200).json({ message: "No changes are made" });
    }
  } catch (error) {
    next(error);
  }
};

export default updateUser;
