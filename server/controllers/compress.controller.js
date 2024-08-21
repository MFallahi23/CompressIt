import request from "request";
import { load } from "cheerio";
import proxyGenerator from "../helpers/proxy_rotator.js";
import { URL } from "url";
import downloadImg from "../helpers/imgDownload.js";
import isValidUrl from "../helpers/validUrl.js";
import deleteAllDownloadedFiles from "../helpers/deleteDownloads.js";
import { extname } from "path";
import { errorHandler } from "../helpers/error.js";

import compressImages from "../helpers/compressImages.js";
import { defineLimit } from "../helpers/getRole.js";

const regex = /\.(jpg|jpeg|svg|png|gif|bmp|webp|tiff|ico|heic)&/;

const processfilename = (filename) => {
  if (regex.test(filename.toLowerCase())) {
    const arr = filename.split(regex);
    arr.pop();
    const cleanedFilename = arr.join(".");
    return cleanedFilename;
  } else {
    return filename;
  }
};

const requestPromise = (options, next) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response, html) => {
      if (error) {
        reject(error);
      } else if (response.statusCode === 200) {
        resolve(html);
      } else {
        reject(new Error(`Failed with status code ${response.statusCode}`));
      }
    });
  });
};

const compress = async (req, res, next) => {
  try {
    const userId = req.user;
    const limit = await defineLimit(userId, next);
    await deleteAllDownloadedFiles(userId);
    // const url =
    //   "https://www.scrapingbee.com/blog/web-scraping-101-with-python/";
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

    const imgs = [];
    const options = {
      url: url,
      method: "GET",
      proxy: proxyGenerator(),
    };

    const html = await requestPromise(options);

    const $ = load(html);
    const imgPromises = [];
    $("img").each((i, img) => {
      if (i > limit) {
        return false;
      }
      const src = $(img).attr("src");
      if (src) {
        const imageUrl = new URL(src, url).toString();
        const ext = extname(imageUrl);

        const filename = processfilename(`compressed_${i}${ext}`);
        imgPromises.push(downloadImg(imageUrl, filename, userId));
        imgs.push(filename);
      }
    });

    await Promise.all(imgPromises);
    const changedNames = imgs.map((filename) => {
      const ext = extname(filename).slice(1).toLowerCase(); // Get the file extension
      if (["webp", "tiff", "bmp", "ico", "heic"].includes(ext)) {
        return filename.replace(`.${ext}`, ".jpg"); // Change the extension to .jpg
      }
      return filename;
    });
    const [sumOriginalSizes, sumOPtimizedSizes] = await compressImages(userId);
    res.json({
      imgs: changedNames,
      userId,
      sizes: { sumOriginalSizes, sumOPtimizedSizes },
    });
  } catch (error) {
    console.error("catch error:", error);
    next(error);
  }
};

export default compress;
