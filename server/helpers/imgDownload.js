import fs from "fs";
import axios from "axios";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const downloadImg = async (url, filename, userId) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    const userFolder = `downloaded${userId}`;
    const imagePath = join(
      __dirname,
      "..",
      "images",
      "downloaded",
      userFolder,
      filename
    );
    await fs.promises.mkdir(
      join(__dirname, "..", "images", "downloaded", userFolder),
      { recursive: true }
    );
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (err) {
    console.error(err);
  }
};

export default downloadImg;
