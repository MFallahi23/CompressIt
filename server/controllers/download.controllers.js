import path, { dirname } from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const download = (req, res, next) => {
  const userId = req.user;
  const { imageName } = req.params;
  console.log(imageName);
  res.download(
    path.join(
      __dirname,
      "..",
      "images",
      "downloaded",
      `downloaded${userId}`,
      imageName
    )
  );
};

export default download;
