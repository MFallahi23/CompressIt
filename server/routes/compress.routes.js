import express from "express";
import compress from "../controllers/compress.controller.js";
import verifyJWT from "../middleware/verifyJWT.js";
import download from "../controllers/download.controllers.js";
import downloadAll from "../controllers/downloadAll.controllers.js";
import compressAll from "../controllers/compressAll.controllers.js";
import { uploadCompress } from "../config/upload.js";
import compressFolder from "../controllers/compressFolder.controllers.js";

const router = express.Router();
router.post("/", verifyJWT, compress);
router.post("/all", verifyJWT, compressAll);
router.post(
  "/folder",
  verifyJWT,
  uploadCompress.array("files"),
  compressFolder
);
router.get("/test", (req, res) => {
  res.send("Compress route works");
});
router.get("/download/:imageName", verifyJWT, download);
router.get("/downloadAll", verifyJWT, downloadAll);

export default router;
