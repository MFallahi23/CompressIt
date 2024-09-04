import pool from "../helpers/db.js";
import { errorHandler } from "../helpers/error.js";

const makeVip = async (req, res, next) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return next(errorHandler(422, "User Id required"));
    }
    const result = await pool.query(
      "UPDATE usr SET role= 'vip', role_updated_at = NOW() WHERE user_id = $1",
      [userId]
    );

    if (result.rowCount === 0) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    next(error);
  }
};

const makePremium = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return next(errorHandler(422, "User id required"));
    }
    const result = await pool.query(
      "UPDATE usr SET role= 'premium', role_updated_at = NOW() WHERE user_id = $1",
      [userId]
    );

    if (result.rowCount === 0) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    next(error);
  }
};

const makeStarter = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return next(errorHandler(422, "User id required"));
    }
    const result = await pool.query(
      "UPDATE usr SET role= 'starter', role_updated_at = NOW() WHERE user_id = $1",
      [userId]
    );

    if (result.rowCount === 0) {
      return next(errorHandler(404, "User not found"));
    }
    console.log("here");
    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    next(error);
  }
};

const makeUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return next(errorHandler(422, "User id required"));
    }
    const result = await pool.query(
      "UPDATE usr SET role= 'user', role_updated_at = NOW() WHERE user_id = $1",
      [userId]
    );

    if (result.rowCount === 0) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    next(error);
  }
};

export { makeVip, makePremium, makeUser, makeStarter };
