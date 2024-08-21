import request from "request";
import proxyGenerator from "./proxy_rotator.js";
import { load } from "cheerio";
import url from "url";
import downloadImg from "./imgDownload.js";
import { extname } from "path";

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

const fetchPage = async (webUrl, userId, index) => {
  try {
    const options = {
      url: webUrl,
      method: "GET",
      proxy: proxyGenerator(),
    };
    const html = await new Promise((resolve, reject) => {
      request(options, (error, resonse, html) => {
        if (error && resonse.statusCode !== 200) {
          return reject(error);
        }
        resolve(html);
      });
    });

    const $ = load(html);
    const links = new Set();
    let currentIndex = index;

    const imgPromises = [];
    $("a[href]").each((_, element) => {
      let href = $(element).attr("href");
      if (href && !href.startsWith("#")) {
        href = new URL(href, webUrl).toString();
        if (href.startsWith(webUrl)) {
          links.add(href);
        }
      }
    });
    $("img").each((i, img) => {
      const src = $(img).attr("src");
      if (src) {
        const imageUrl = new URL(src, webUrl).toString();
        const ext = extname(imageUrl);
        currentIndex += i;
        const filename = processfilename(
          `downloaded_image_${currentIndex}${ext}`
        );
        imgPromises.push(downloadImg(imageUrl, filename, userId));
      }
    });
    await Promise.all(imgPromises);
    return [links, currentIndex];
  } catch (error) {
    console.error(`Failed to fetch or process page ${webUrl}:`, error.message);
    return [new Set(), index];
  }
};

export default fetchPage;
