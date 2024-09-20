import path, { extname } from "path";
import sharp from "sharp";
import fs from "fs/promises";
import util from "util";
import { optimize } from "svgo";
import { exec } from "child_process";
const execPromise = util.promisify(exec);

const changeExtension = (file) => {
  const ext = extname(file).slice(1).toLowerCase();
  if (["tiff", "bmp", "heic"].includes(ext)) {
    return `${file.slice(0, file.lastIndexOf("."))}.jpg`;
  } else {
    return file;
  }
};

const compressOneImage = async (file, dirPath, compressPath) => {
  try {
    let originalSize;
    let optimizedSize;
    const ext = extname(file).slice(1).toLowerCase();
    const filePath = path.join(dirPath, file);
    let outputPath;
    // if (["webp", "tiff", "bmp", "ico", "heic"].includes(ext)) {
    if (["tiff", "bmp", "heic"].includes(ext)) {
      outputPath = path.join(
        compressPath,
        `${file.slice(0, file.lastIndexOf("."))}.jpg`
      );
    } else {
      outputPath = path.join(compressPath, file.toLowerCase());
    }
    switch (ext) {
      case "jpeg":
      case "jpg":
      case "png":
      case "webp":
      case "tiff":
      case "bmp":
      case "heic":
        originalSize = (await fs.stat(filePath)).size;
        console.log(file);
        console.log("Original size:", originalSize);

        await compressCommon(filePath, outputPath, ext);
        optimizedSize = (await fs.stat(outputPath)).size;
        console.log("Optimized size:", optimizedSize);
        break;
      case "svg":
        originalSize = (await fs.stat(filePath)).size;
        await compressSvg(filePath, outputPath);
        optimizedSize = (await fs.stat(outputPath)).size;
        break;
      case "gif":
        originalSize = (await fs.stat(filePath)).size;
        await compressGif(filePath, outputPath);
        optimizedSize = (await fs.stat(outputPath)).size;
        break;
      default:
        console.error(`Not supported format: ${ext}`);
        return {
          originalSize: 0,
          optimizedSize: 0,
          error: {
            filename: changeExtension(file),
            message: `Not supported format: ${ext}`,
          },
        };
    }
    return { originalSize, optimizedSize, error: {} };
  } catch (error) {
    console.error(error);
    return {
      originalSize: 0,
      optimizedSize: 0,
      error: {
        filename: changeExtension(file),
        message: `An error occured during compression`,
      },
    };
  }
};
const compressWithTool = async (command) => {
  try {
    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      console.error("Command error output:", stderr);
    }
  } catch (error) {
    console.error("Error executing command:", error);
    throw error; // Re-throw the error for further handling
  }
};

async function moveFile(sourcePath, newFilePath) {
  try {
    await fs.rename(sourcePath, newFilePath);
    console.log("File moved successfully!");
  } catch (err) {
    console.error("Error moving file:", err);
  }
}

const compressCommon = async (inputPath, outputPath, format) => {
  try {
    let success = false;
    switch (format) {
      case "jpeg":
      case "jpg":
        try {
          await compressWithTool(`jpegoptim --max=80 ${inputPath}`);
          await moveFile(inputPath, outputPath);
          success = true;
        } catch (error) {
          console.error("Error with jpegoptim, falling back to sharp:", error);
          try {
            await sharp(inputPath).jpeg({ quality: 80 }).toFile(outputPath);
            success = true;
          } catch (sharpError) {
            console.error("Error compressing JPEG with sharp:", sharpError);
            throw sharpError;
          }
        }
        break;
      case "png":
        try {
          await compressWithTool(
            `pngquant --quality=80-100 --output ${outputPath} ${inputPath}`
          );
          await fs.unlink(inputPath);
          success = true;
        } catch (error) {
          console.error("Error with pngquant, falling back to sharp:", error);
          try {
            await sharp(inputPath)
              .png({ compressionLevel: 9 })
              .toFile(outputPath);
            await fs.unlink(inputPath);
            success = true;
          } catch (sharpError) {
            console.error("Error compressing PNG with sharp:", sharpError);
            throw sharpError;
          }
        }
        break;
      case "bmp":
      case "tiff":
      // case "webp":
      case "heic":
        // case "ico":
        try {
          await compressWithTool(
            `magick ${inputPath} -quality 80 ${outputPath}`
          );

          await fs.unlink(inputPath);
          success = true;
        } catch (error) {
          console.error(
            "Error with ImageMagick, falling back to sharp:",
            error
          );
          try {
            await sharp(inputPath)
              .toFormat("jpeg", { quality: 80 })
              .toFile(outputPath);
            await fs.unlink(inputPath);
            success = true;
          } catch (sharpError) {
            console.error("Error compressing image with sharp:", sharpError);
            throw sharpError;
          }
        }
        break;
      case "webp":
        try {
          await sharp(inputPath)
            .toFormat("webp", { quality: 80 }) // Keep the format as webp and adjust quality
            .toFile(outputPath);
          await fs.unlink(inputPath);
          success = true;
        } catch (sharpError) {
          console.error("Error compressing WebP with sharp:", sharpError);
          throw sharpError;
        }
        break;

      default:
        console.log(`Unsupported`);
        return;
    }

    if (!success) {
      console.warn(
        `Both compression attempts failed for: ${inputPath}. Moving original file.`
      );
      await moveFile(inputPath, outputPath);
    }
  } catch (error) {
    console.error("Error during compression :", error);
    throw error;
  }
};

const compressSvg = async (inputPath, outputPath) => {
  try {
    const svgData = await fs.readFile(inputPath, "utf8");
    const result = optimize(svgData, { multipass: true });
    await fs.writeFile(outputPath, result.data);

    await fs.unlink(inputPath);
  } catch (error) {
    console.error("Error compressing svg");
    await moveFile(inputPath, outputPath);
  }
};

const compressGif = async (inputPath, outputPath) => {
  try {
    await execPromise(
      `gifsicle --colors 64 --use-col=web ${inputPath} -o ${outputPath}`
    );
    await fs.unlink(inputPath);
  } catch (error) {
    console.error("Error compressing gif");
    await moveFile(inputPath, outputPath);
  }
};

export default compressOneImage;
