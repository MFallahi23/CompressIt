import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const deleteAllCompressedFiles = async (userId) => {
  try {
    const compressedDirPath = path.resolve(
      __dirname,
      `../images/compressed/compressed${userId}`
    );
    for (const file of await fs.readdir(compressedDirPath)) {
      await fs.unlink(path.join(compressedDirPath, file));
    }
  } catch (error) {
    console.error(error);
  }
};
export default deleteAllCompressedFiles;
