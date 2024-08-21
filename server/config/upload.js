import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import deleteAllDownloadedFiles from "../helpers/deleteDownloads.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const compressStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const userId = req.user;
    const uploadPath = path.join(
      __dirname,
      "..",
      `images/downloaded/downloaded${userId}`
    );

    await fs.mkdir(uploadPath, { recursive: true });
    const files = await fs.readdir(uploadPath);
    if (files.length >= 5000) {
      return cb(
        new Error("Upload limit exceeded. No more images can be added.")
      );
    }
    if (!req.filesDeleted) {
      // Delete existing files only once at the start
      await deleteAllDownloadedFiles(userId);
      req.filesDeleted = true; // Set the flag to true after deletion
    }

    cb(null, uploadPath);
  },
  filename: async (req, file, cb) => {
    try {
      // const userId = req.user;
      // const uploadPath = path.join(
      //   __dirname,
      //   "..",
      //   `images/downloaded/downloaded${userId}`
      // );
      // const files = await fs.readdir(uploadPath);

      // const nextIndex = files.length;

      const ext = path.extname(file.originalname);
      const uniqueName = `${uuid()}${ext.toLowerCase()}`;

      cb(null, uniqueName);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage });
const uploadCompress = multer({ storage: compressStorage });

export { upload, uploadCompress };
