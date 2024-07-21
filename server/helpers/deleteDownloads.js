import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const deleteAllDownloadedFiles = async (userId) => {
  try {
    const downloadDirPath = path.resolve(
      __dirname,
      `../images/downloaded/downloaded${userId}`
    );
    for (const file of await fs.readdir(downloadDirPath)) {
      await fs.unlink(path.join(downloadDirPath, file));
    }
  } catch (error) {
    console.error(error);
  }
};
export default deleteAllDownloadedFiles;
