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

// {
//   fieldname: 'files',
//   originalname: 'paragraphPage.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: '/Users/mac/Documents/Программирование/ReactPortfolio/ReactCompressor/server/images/downloaded/downloaded1739d7e3-0510-4236-bf38-3162a833e61c',
//   filename: 'compressed_19.png',
//   path: '/Users/mac/Documents/Программирование/ReactPortfolio/ReactCompressor/server/images/downloaded/downloaded1739d7e3-0510-4236-bf38-3162a833e61c/compressed_19.png',
//   size: 11708
// },
// {
//   fieldname: 'files',
//   originalname: 'div.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: '/Users/mac/Documents/Программирование/ReactPortfolio/ReactCompressor/server/images/downloaded/downloaded1739d7e3-0510-4236-bf38-3162a833e61c',
//   filename: 'compressed_19.png',
//   path: '/Users/mac/Documents/Программирование/ReactPortfolio/ReactCompressor/server/images/downloaded/downloaded1739d7e3-0510-4236-bf38-3162a833e61c/compressed_19.png',
//   size: 72635
// },
