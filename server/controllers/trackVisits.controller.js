import crypto from "crypto";
import pool from "../helpers/db.js";

const generateUniqueVisitorId = () => {
  return crypto.randomBytes(16).toString("hex");
};

const trackVisits = async (req, res, next) => {
  const trackingCookieName = "visitor_id";
  let visitorId = req.cookies[trackingCookieName];

  if (!visitorId) {
    visitorId = generateUniqueVisitorId();
    res.cookie(trackingCookieName, visitorId, {
      httpOnly: false,
      sameSite: "",
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  }
  try {
    await pool.query("INSERT INTO visits (visitor_id) VALUES ($1)", [
      visitorId,
    ]);
    res.status(200).send("Visit logged");
  } catch (error) {
    next(error);
  }
};
export default trackVisits;
