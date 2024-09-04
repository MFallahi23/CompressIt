import express from "express";
import addNotification from "../controllers/addNotification.controller.js";
import getFeedbacks from "../controllers/getFeedbacks.controller.js";
import { getUser, getUsers } from "../controllers/users.controler.js";
import deleteUser from "../controllers/deleteUser.controller.js";
import {
  makePremium,
  makeStarter,
  makeUser,
  makeVip,
} from "../controllers/makeRole.controller.js";
import getNewUsers from "../controllers/getNewUsers.controller.js";
import getAdminNotification from "../controllers/getAdminNotification.controller.js";

const router = express.Router();

router.post("/notification", addNotification);
router.post("/makevip", makeVip);
router.post("/makestarter", makeStarter);
router.post("/makepremium", makePremium);
router.post("/makeuser", makeUser);
router.post("/deleteuser", deleteUser);
router.get("/feedbacks", getFeedbacks);
router.get("/allusers", getUsers);
router.get("/user", getUser);
router.get("/getnewusers", getNewUsers);
router.get("/getnotifications", getAdminNotification);

export default router;
