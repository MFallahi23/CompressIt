import React, { useState } from "react";
import isValidUrl from "../utils/isValidUrl";
import { axiosPrivate } from "../api/axios";
import { displayDownloadedImg } from "../utils/imgUtils";
import useAuth from "../hooks/useAuth";
import "./styles/compress.css";
const Compress = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [imgs, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to submit the url to the server
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setImages([]);
      setLoading(true);
      const isValid = isValidUrl(url);
      if (!isValid) {
        setError("Invalid URL!");
        return;
      }
      const response = await axiosPrivate.post("/api/compress", { url });
      const resultImages = response?.data.imgs;
      const userId = response?.data.userId;
      setLoading(false);
      setImages(() => {
        return resultImages.map((img) => {
          return `downloaded${userId}/${img}`;
        });
      });
    } catch (error) {
      setLoading(false);
      if (error?.response.status === 422) {
        setError(error?.response?.data.error);
      } else {
        setError("An error occured!");
      }

      console.log(error);
    }
  };

  // Function that handles download of individual images
  const downloadImage = async (src) => {
    try {
      const arr = src.split("/");
      const imageName = arr[arr.length - 1];
      const response = await axiosPrivate.get(
        `/api/compress/download/${imageName}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imageName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the image");
    }
  };
  return (
    <section className="flex flex-col gap-10 w-[100%] mx-auto mt-10 max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] my-10 p-5">
      {error && (
        <div className=" text-center bg-red-700 p-1 rounded-md">{error}</div>
      )}
      <h1 className="text-5xl text-center">Paste your webpage url here</h1>
      <form
        action=""
        className=" flex  gap-5 flex-col w-[100%] md:flex-row"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          required
          className="p-2 rounded-md flex-1 text-black"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
        />
        <button className="cta__btn p-2 rounded-md text-nowrap text-md basis-full md:basis-auto">
          Speed up your website
        </button>
      </form>
      <div className="mt-5 flex flex-col items-center">
        <h2>The results will appear here</h2>
        {imgs && imgs.length > 0 && (
          <button className="compress__download__all p-2 rounded-md my-4 mb-10">
            Download All
          </button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center lg:grid-cols-3 xl:grid-cols-4">
          {!loading
            ? imgs && imgs.length > 0
              ? imgs?.map((src, i) => {
                  return (
                    <div
                      className="compress__img__ctn w-full cursor-pointer flex justify-center items-center"
                      onClick={() => downloadImage(src)}
                    >
                      <img
                        key={i}
                        src={displayDownloadedImg(src)}
                        alt="compressed images"
                        className=""
                      />
                      <div className="compress__overlay flex justify-center items-center">
                        <p className=" text-3xl md:text-xl">Download Image</p>
                      </div>
                    </div>
                  );
                })
              : ""
            : "Loading..."}
        </div>
      </div>
    </section>
  );
};

export default Compress;
