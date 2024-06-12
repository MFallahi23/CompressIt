import pool from "../helpers/db.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../helpers/error.js";
import createSendToken from "../helpers/tokenUtils.js";
import { validationResult } from "express-validator";
const register = async (req, res, next) => {
  try {
    // Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // Retrieve info from the body of the request
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return next(errorHandler(400, "All fields are required!"));
    // Check for duplicates
    const duplicate = await pool.query(
      "SELECT * FROM usr WHERE username = $1 OR email = $2 ",
      [username, email]
    );
    if (duplicate.rows.length !== 0) {
      return next(errorHandler(409, "Username or email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("here");
    const result = await pool.query(
      "INSERT INTO usr (username,email,password) VALUES ($1,$2,$3)",
      [username, email, hashedPassword]
    );
    const user = await pool.query("SELECT * FROM usr WHERE username = $1", [
      username,
    ]);
    console.log(user.rows[0]);
    const userId = user.rows[0].user_id;
    const role = user.rows[0].role;
    const createdAt = user.rows[0].created_at;
    const profilePic = user.rows[0].profile_picture_filename;
    const occupation = user.rows[0].occupation;

    res.status(201);
    createSendToken(
      res,
      userId,
      role,
      username,
      email,
      profilePic,
      createdAt,
      occupation
    );
  } catch (error) {
    next(error);
  }
};

export default register;
