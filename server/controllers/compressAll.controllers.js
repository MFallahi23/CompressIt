import deleteAllDownloadedFiles from "../helpers/deleteDownloads.js";
import { errorHandler } from "../helpers/error.js";
import fetchPage from "../helpers/fetchPage.js";
import isValidUrl from "../helpers/validUrl.js";

const compressAll = async (req, res, next) => {
  const userId = req.user;
  let index = 0;
  await deleteAllDownloadedFiles(userId);
  const { url } = req.body;

  if (!url) {
    console.error("url is required");
    return next(errorHandler(400, "URL is required"));
  }

  // Check if Url is valid
  const isValid = isValidUrl(url);

  if (!isValid) {
    console.log("not valid");
    return next(errorHandler(422, "URL not valid!"));
  }
  const webPages = new Set([url]);
  const parsedWebpages = new Set();
  while (webPages.size > 0) {
    const [currentUrl] = webPages;
    console.log(currentUrl);
    webPages.delete(currentUrl);
    if (parsedWebpages.has(currentUrl)) {
      continue;
    }
    try {
      const [links, pageIndex] = await fetchPage(currentUrl, userId, index);
      index = pageIndex;

      links.forEach((link) => {
        if (!parsedWebpages.has(link) && !webPages.has(link)) {
          webPages.add(link);
        }
      });
      parsedWebpages.add(currentUrl);
    } catch (error) {
      console.error(`Error processing page ${currentUrl}:`, err.message);
    }
  }
  await pool.query(
    "UPDATE usr SET usage_count = usage_count+1, last_active = NOW() WHERE user_id=$1",
    [userId]
  );
  res.json({ index, userId });
};

export default compressAll;
