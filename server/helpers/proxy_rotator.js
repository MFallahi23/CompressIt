import request from "request";
import { load } from "cheerio";
import axios from "axios";
const proxyGenerator = () => {
  let ip_addresses = [];
  let port_numbers = [];

  request("https://sslproxies.org/", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = load(html);

      $(".fpl-list td:nth-child(1)").each((index, value) => {
        ip_addresses[index] = $(value).text();
      });
      $(".fpl-list td:nth-child(2)").each((index, value) => {
        port_numbers[index] = $(value).text();
      });

      if (ip_addresses.length > 0 && port_numbers.length > 0) {
        const random_number = Math.floor(Math.random() * ip_addresses.length);
        let proxy = `http://${ip_addresses[random_number]}:${port_numbers[random_number]}`;

        console.log(proxy);
        return proxy;
      } else {
        console.error("No proxies found");
      }
    } else {
      console.log("Error loading proxy, please try again");
    }
  });
};

export default proxyGenerator;
