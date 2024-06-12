import bcrypt from "bcrypt";
import { errorHandler } from "../helpers/error.js";
import pool from "../helpers/db.js";
import oauth2Client from "../helpers/oauth2client.js";
import crypto from "crypto";
import createSendToken from "../helpers/tokenUtils.js";
import { validationResult } from "express-validator";
import axios from "axios";
import updateUser from "./updateUser.controller.js";

const login = async (req, res, next) => {
  try {
    // Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // Retrieve info from the body request
    const { email, password } = req.body;
    if (!email || !password)
      return next(errorHandler(400, "Email and Password are required!"));

    const foundUser = await pool.query("SELECT * FROM usr WHERE email = $1", [
      email,
    ]);

    if (foundUser.rows.length === 0) {
      return next(errorHandler(401, "User not found!"));
    }
    const userId = foundUser.rows[0].user_id;

    const match = await bcrypt.compare(password, foundUser.rows[0].password);
    if (!match) {
      return next(errorHandler(401, "Invalid password"));
    }
    const role = foundUser.rows[0].role;
    const profilePic = foundUser.rows[0].profile_picture_filename;
    const createdAt = foundUser.rows[0].created_at;
    const occupation = foundUser.rows[0].occupation;
    createSendToken(
      res,
      userId,
      role,
      foundUser.rows[0].username,
      email,
      profilePic,
      createdAt,
      occupation
    );
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const code = req.query.code;

    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    let user = await pool.query("SELECT * FROM usr WHERE email = $1", [
      userRes.data.email,
    ]);

    const { email, name, picture } = userRes.data;
    if (user.rows.length === 0) {
      const modifiedUsername =
        name.split(" ").join("").toLowerCase() +
        crypto.randomBytes(6).toString("base64");
      const generatedPassword = crypto.randomBytes(16).toString("base64");

      const result = await pool.query(
        "INSERT INTO usr (username,email,password,profile_picture_filename) VALUES ($1,$2,$3,$4)",
        [modifiedUsername, email, generatedPassword, picture]
      );
      const newUser = await pool.query("SELECT * FROM usr WHERE username=$1", [
        modifiedUsername,
      ]);

      const userId = newUser.rows[0].user_id;
      const role = newUser.rows[0].role;
      const createdAt = newUser.rows[0].created_at;
      const profilePic = newUser.rows[0].profile_picture_filename;
      const occupation = newUser.rows[0].occupation;
      res.status(201);
      createSendToken(
        res,
        userId,
        role,
        modifiedUsername,
        email,
        profilePic,
        createdAt,
        occupation
      );
    } else {
      const userId = user.rows[0].user_id;
      const role = user.rows[0].role;
      const createdAt = user.rows[0].created_at;
      const profilePic = user.rows[0].profile_picture_filename;
      const occupation = user.rows[0].occupation;
      res.status(200);
      createSendToken(
        res,
        userId,
        role,
        user.rows[0].username,
        email,
        profilePic,
        createdAt,
        occupation
      );
    }
  } catch (error) {
    next(error);
  }
};

export { googleAuth, login };
