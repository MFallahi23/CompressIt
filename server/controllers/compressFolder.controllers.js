import { checkSize, isLimitRespected } from "../helpers/checkSize.js";
import compressImages from "../helpers/compressImages.js";
import pool from "../helpers/db.js";
import { errorHandler } from "../helpers/error.js";
import { extname } from "path";
const compressFolder = async (req, res, next) => {
  try {
    const files = req.files;
    const userId = req.user;

    const { rows: user } = await pool.query(
      "SELECT usage_count, role FROM usr WHERE user_id=$1",
      [userId]
    );
    if (user.length === 0) {
      return next(errorHandler(404, "User not found"));
    }
    if (user[0].role === "user" && user[0].usage_count >= 4) {
      return next(errorHandler(401, "You exceeded the free limit!"));
    }
    if (!files || files.length === 0) {
      return next(errorHandler(400, "No files uploaded"));
    }

    const fileNames = files.map((file) => file.filename);

    const changedNames = fileNames.map((filename) => {
      const ext = extname(filename).slice(1).toLowerCase(); // Get the file extension
      // if (["webp", "tiff", "bmp", "ico", "heic"].includes(ext)) {

      if (["tiff", "bmp", "heic"].includes(ext)) {
        return filename.replace(`.${ext}`, ".jpg"); // Change the extension to .jpg
      }
      return filename;
    });
    const totalSize = await checkSize(userId);
    if (!isLimitRespected(totalSize, user[0].role)) {
      return next(errorHandler(413, "Error due to exceeding size limit"));
    }
    const [sumOriginalSizes, sumOPtimizedSizes, compressionErrors] =
      await compressImages(userId);
    await pool.query(
      "UPDATE usr SET usage_count = usage_count+1, last_active = NOW() WHERE user_id=$1",
      [userId]
    );
    res.status(200).json({
      imgs: changedNames,
      userId,
      sizes: { sumOriginalSizes, sumOPtimizedSizes },
      compressionErrors,
    });
  } catch (error) {
    next(error);
  }
};
export default compressFolder;
