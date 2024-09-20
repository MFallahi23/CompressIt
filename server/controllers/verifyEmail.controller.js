import pool from "../helpers/db.js";
import { errorHandler } from "../helpers/error.js";
import crypto from "crypto";
import sendEmail from "../services/sendEmail.js";
const sendEmailVerif = async (req, res, next) => {
  try {
    const userId = req.user;
    const foundUser = await pool.query(
      "SELECT email,email_verified,email_verification_token FROM usr WHERE user_id=$1",
      [userId]
    );
    if (foundUser.rows.length === 0) {
      return next(errorHandler(404, "User not found"));
    }

    if (foundUser.rows[0].email_verified === true) {
      return next(errorHandler(400, "Email already verified!"));
    }
    if (foundUser.rows[0].email_verification_token) {
      await pool.query(
        "UPDATE usr SET email_verification_token=NULL WHERE user_id=$1",
        [userId]
      );
    }
    const userEmail = foundUser.rows[0].email;
    const emailTokenValue = crypto.randomBytes(20).toString("base64url");
    const emailTokenSecret = crypto.randomBytes(10).toString("hex");
    let emailToken = `${emailTokenValue}+${emailTokenSecret}`;

    const emailTokenHash = crypto
      .createHmac("sha256", emailTokenSecret)
      .update(emailTokenValue)
      .digest("hex");

    await pool.query(
      "UPDATE usr SET email_verification_token=$1 WHERE user_id=$2",
      [emailTokenHash, userId]
    );
    emailToken = encodeURIComponent(emailToken);
    const emailPath = req.header("X-reset-base");
    const origin = req.header("Origin");
    const emailUrl = emailPath
      ? `${emailPath}/${emailToken}`
      : `${origin}/verify-email/${emailToken}`;
    const message = `
    <h1>Email verification</h1>
    <p>You are receiving this mail to verify your email in the app CompressIt<br/>
      Please click on the following link, or paste in your browser to complete the verification process</p>
      <p>
      <a href=${emailUrl} clicktracking=off>${emailUrl}</a>

    </p>
    <p>
      <em>
        If you did not request this, you can safely ignore this email.
      </em>
    </p>
    `;

    try {
      await sendEmail({
        to: userEmail,
        html: message,
        subject: "Email verification",
      });
      res.status(200).json({
        message:
          "An email has been sent to your email address. Check your email, and visit the link to verify your email",
      });
    } catch (error) {
      await pool.query(
        "UPDATE usr SET email_verification_token=NULL WHERE user_id=$1",
        [userId]
      );
      res.status(500).send("Email not send");
    }
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    console.log("hello");

    const userId = req.user;
    const emailToken = String(req.params.emailToken);

    const [tokenValue, tokenSecret] = decodeURIComponent(emailToken).split("+");

    const emailTokenHash = crypto
      .createHmac("sha256", tokenSecret)
      .update(tokenValue)
      .digest("hex");

    const foundUser = await pool.query(
      "SELECT * FROM usr WHERE email_verification_token=$1",
      [emailTokenHash]
    );
    if (foundUser.rows.length === 0) {
      return next(errorHandler(404, "User not found"));
    }
    const result = await pool.query(
      "UPDATE usr SET email_verified=TRUE,email_verification_token=NULL WHERE email_verification_token=$1",
      [emailTokenHash]
    );
    res.status(200).json({ message: "Successfully checked email" });
  } catch (error) {
    next(error);
  }
};

export { verifyEmail, sendEmailVerif };
