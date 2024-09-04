import express from "express";
import {
  getUsers,
  getUser,
  getUsageCount,
} from "../controllers/users.controler.js";
import register from "../controllers/register.controller.js";
import { googleAuth, login } from "../controllers/login.controller.js";
import logout from "../controllers/logout.controller.js";
import refreshToken from "../controllers/refreshToken.controller.js";
import {
  validateRegister,
  validateLogin,
  validateUpdate,
} from "../helpers/validate.js";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRole from "../middleware/verifyRole.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/resetPassword.controller.js";
import updateUser from "../controllers/updateUser.controller.js";
import { upload } from "../config/upload.js";
import getNotifications from "../controllers/getNotifications.controller.js";
import addFeedback from "../controllers/addFeedback.controller.js";
import deleteAcc from "../controllers/deleteAcc.controller.js";
import trackVisits from "../controllers/trackVisits.controller.js";
import markAsRead from "../controllers/markAsRead.controller.js";
import getNumberOfNotif from "../controllers/getNumberOfNotif.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Test successful!");
});

router.get("/getUser", getUser);
router.post("/visit", trackVisits);
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/googleLogin", googleAuth);
router.get("/refresh", refreshToken);
router.post("/forgot", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.get("/getusagecount", verifyJWT, getUsageCount);
router.post("/delete", verifyJWT, deleteAcc);
router.post("/mark-as-read", verifyJWT, markAsRead);

router.post(
  "/update",
  verifyJWT,
  upload.single("file"),
  validateUpdate,
  updateUser
);
router.post("/feedback", verifyJWT, addFeedback);
router.get("/notifications", verifyJWT, getNotifications);
router.get("/getnumberofnotif", verifyJWT, getNumberOfNotif);
router.get("/logout", logout);

export default router;
