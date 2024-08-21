import express from "express";
import crypto from "crypto";
import webhook from "../controllers/webhook.controllers.js";

const router = express.Router();
router.post("/", webhook);
