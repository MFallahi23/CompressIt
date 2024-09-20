import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const checkSize = async (userId) => {
  try {
    const downloadDirPath = path.resolve(
      __dirname,
      `../images/downloaded/downloaded${userId}`
    );

    let totalSize = 0;
    for (const file of await fs.readdir(downloadDirPath)) {
      const filePath = path.join(downloadDirPath, file);
      try {
        totalSize += (await fs.stat(filePath)).size;
      } catch (error) {
        console.error(`Error Checking size of a file: ${error}`);
      }
    }
    return totalSize / (1024 * 1024); // Returns the value in MB
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
  }
};

// Function to check if size limits of files are respected for each role
// totalSize is in MB
const isLimitRespected = (totalSize, role) => {
  if (role === "user" && totalSize > 10) {
    return false;
  } else if (role === "starter" && totalSize > 100) {
    return false;
  } else if (role === "premium" && totalSize > 300) {
    return false;
  } else if (role === "vip" && totalSize > 400) {
    return false;
  } else {
    return true;
  }
};
export { checkSize, isLimitRespected };
