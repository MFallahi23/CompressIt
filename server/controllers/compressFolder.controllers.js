import compressImages from "../helpers/compressImages.js";
import { errorHandler } from "../helpers/error.js";
import { extname } from "path";
const compressFolder = async (req, res, next) => {
  try {
    const files = req.files;
    const userId = req.user;
    if (!files || files.length === 0) {
      return next(errorHandler(400, "No files uploaded"));
    }

    const fileNames = files.map((file) => file.filename);

    const changedNames = fileNames.map((filename) => {
      const ext = extname(filename).slice(1).toLowerCase(); // Get the file extension
      if (["webp", "tiff", "bmp", "ico", "heic"].includes(ext)) {
        return filename.replace(`.${ext}`, ".jpg"); // Change the extension to .jpg
      }
      return filename;
    });
    const [sumOriginalSizes, sumOPtimizedSizes] = await compressImages(userId);
    await pool.query(
      "UPDATE usr SET usage_count = usage_count+1, last_active = NOW() WHERE user_id=$1",
      [userId]
    );
    res.status(200).json({
      imgs: changedNames,
      userId,
      sizes: { sumOriginalSizes, sumOPtimizedSizes },
    });
  } catch (error) {
    next(error);
  }
};
export default compressFolder;
