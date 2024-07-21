import request from "request";
import { load } from "cheerio";
import proxyGenerator from "../helpers/proxy_rotator.js";
import { URL } from "url";
import downloadImg from "../helpers/imgDownload.js";
import isValidUrl from "../helpers/validUrl.js";
import deleteAllDownloadedFiles from "../helpers/deleteDownloads.js";
import { extname } from "path";
import { errorHandler } from "../helpers/error.js";

const regex = /\.(jpg|jpeg|svg|png|gif|bmp|webp|tiff|ico)&/;

const processfilename = (filename) => {
  if (regex.test(filename)) {
    const arr = filename.split(regex);
    arr.pop();
    const cleanedFilename = arr.join(".");
    return cleanedFilename;
  } else {
    return filename;
  }
};

const compress = async (req, res, next) => {
  try {
    const userId = req.user;
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

    request(options, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = load(html);
        const imgPromises = [];
        $("img").each((i, img) => {
          const src = $(img).attr("src");
          if (src) {
            const imageUrl = new URL(src, url).toString();
            const ext = extname(imageUrl);

            const filename = processfilename(`downloaded_image_${i}${ext}`);
            imgPromises.push(downloadImg(imageUrl, filename, userId));
            imgs.push(filename);
          }
        });
        Promise.all(imgPromises)
          .then((downloadedImagesNames) => {
            res.json({ imgs, userId });
          })
          .catch(next);
      } else {
        console.log(response.statusCode);
        next(error || new Error("Failed to fetch the page"));
      }
    });
  } catch (error) {
    console.error("catch error:", error);
    next(error);
  }
};

export default compress;
