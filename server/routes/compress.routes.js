import express from "express";
import compress from "../controllers/compress.controller.js";
import verifyJWT from "../middleware/verifyJWT.js";
import download from "../controllers/download.controllers.js";
const router = express.Router();
router.post("/", verifyJWT, compress);
router.get("/test", (req, res) => {
  res.send("Compress route works");
});
router.get("/download/:imageName", verifyJWT, download);

export default router;
