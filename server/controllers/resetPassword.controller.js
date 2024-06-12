import pool from "../helpers/db.js";
import { errorHandler } from "../middleware/errorHandler.js";
import crypto from "crypto";
import sendEmail from "../services/sendEmail.js";
import bcrypt from "bcrypt";
// Forgot password and send email to the user
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const foundUser = await pool.query("SELECT * FROM usr WHERE email = $1", [
      email,
    ]);

    // Check if a user with the provided email exists
    if (foundUser.rows.length === 0) {
      return next(
        errorHandler(
          202,
          "If an account with that email exists, you will receive a password reset email shortly."
        )
      );
    }

    // Check if the user have a resetpasswordtoken in the db, if yes delete it
    if (foundUser.rows[0].resetpasswordtoken) {
      await pool.query(
        "UPDATE usr SET resetpasswordtoken = NULL, resetpasswordtokenexpiry= NULL WHERE email= $1",
        [email]
      );
    }

    // Generate a new resetpasswordtoken using crypto API
    const resetTokenValue = crypto.randomBytes(20).toString("base64url");
    const resetTokenSecret = crypto.randomBytes(10).toString("hex");
    let resetToken = `${resetTokenValue}+${resetTokenSecret}`;
    console.log(resetToken);
    // create a hash
    const restTokenHash = crypto
      .createHmac("sha256", resetTokenSecret)
      .update(resetTokenValue)
      .digest("hex");

    const resetTokenExpiry = new Date(
      Date.now() +
        (process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINS || 5) * 60 * 1000
    );
    await pool.query(
      "UPDATE usr SET resetpasswordtoken = $1, resetpasswordtokenexpiry= $2 WHERE email= $3",
      [restTokenHash, resetTokenExpiry.toISOString(), email]
    );

    resetToken = encodeURIComponent(resetToken);
    const resetPath = req.header("X-reset-base");
    const origin = req.header("Origin");
    const resetUrl = resetPath
      ? `${resetPath}/${resetToken}`
      : `${origin}/resetpass/${resetToken}`;
    const message = `
    <h1>You have requested to change your password</h1>
    <p>You are receiving this because someone(hopefully you) has requested to reset password for your account.<br/>
      Please click on the following link, or paste in your browser to complete the password reset.
    </p>
    <p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    </p>
    <p>
      <em>
        If you did not request this, you can safely ignore this email and your password will remain unchanged.
      </em>
    </p>
    <p>
    <strong>DO NOT share this link with anyone else!</strong><br />
      <small>
        <em>
          This password reset link will <strong>expire after ${
            process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINS || 5
          } minutes.</strong>
        </em>
      <small/>
    </p>
`;
    try {
      await sendEmail({
        to: email,
        html: message,
        subject: "Reset password",
      });
      res.json({
        message:
          "An email has been sent to your email address. Check your email, and visit the link to reset your password",
      });
    } catch (error) {
      await pool.query(
        "UPDATE usr SET resetpasswordtoken =NULL, resetpasswordtokenexpiry= NULL WHERE email= $3",
        [email]
      );
      res.status(500).send("Email not send");
    }
  } catch (error) {
    next(error);
  }
};

// Reset Password
const resetPassword = async (req, res, next) => {
  try {
    const resetToken = String(req.params.resetToken);

    const [tokenValue, tokenSecret] = decodeURIComponent(resetToken).split("+");

    // recreate the reset token hash
    const resetTokenHash = crypto
      .createHmac("sha256", tokenSecret)
      .update(tokenValue)
      .digest("hex");

    const userFound = await pool.query(
      "SELECT * FROM usr WHERE resetpasswordtoken= $1 AND NOW() AT TIME ZONE 'UTC' < resetpasswordtokenexpiry::TIMESTAMPTZ",
      [resetTokenHash]
    );

    if (userFound.rows.length === 0) {
      console.log("hello");
      return next(errorHandler(400, "The reset link is invalid"));
    }

    const userId = userFound.rows[0].user_id;
    const password = req.body.password;
    if (!password) {
      return next(errorHandler(400, "Password missing"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE usr SET password=$1,resetpasswordtoken =NULL, resetpasswordtokenexpiry= NULL WHERE user_id=$2",
      [hashedPassword, userId]
    );
    // Email to notify owner of the account
    const message = `<h3>This is a confirmation that you have changed Password for your account.</h3>`;
    // No need to await

    sendEmail({
      to: userFound.rows[0].email,
      html: message,
      subject: "Password changed",
    });

    res.json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export { forgotPassword, resetPassword };
