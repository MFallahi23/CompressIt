import path, { dirname } from "path";
import archiver from "archiver";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { errorHandler } from "../helpers/error.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const downloadAll = async (req, res, next) => {
  try {
    const userId = req.user;
    const dirPath = path.join(
      __dirname,
      "..",
      "images",
      "compressed",
      `compressed${userId}`
    );
    const zip = archiver("zip");
    zip.on("error", (err) => res.status(500).send({ error: err.message }));
    res.attachment("images.zip");
    zip.pipe(res);

    const files = await fs.readdir(dirPath);
    if (!files) {
      return next(errorHandler(404, "Files not found"));
    }
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      zip.file(filePath, { name: file });
    });
    await zip.finalize();
  } catch (error) {
    next(error);
  }
};

export default downloadAll;
