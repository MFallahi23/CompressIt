import React, { useEffect, useState } from "react";
import isValidUrl from "../utils/isValidUrl";
import { axiosPrivate } from "../api/axios";
import { displayDownloadedImg } from "../utils/imgUtils";
import "./styles/compress.css";
import CompressWebPage from "../components/CompressWebPage";
import CompressFolder from "../components/CompressFolder";
import CompressFile from "../components/CompressFile";
import CompressWebSite from "../components/CompressWebsite";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
const Compress = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [imgs, setImages] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState(undefined);
  const [type, setType] = useState("webpage");
  const [usageCount, setUsageCount] = useState(0);
  const [compressionErrors, setCompressionErrors] = useState([]);
  const formatBytes = (bytes) => {
    const sizeUnits = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizeUnits[i]}`;
  };

  // Function to render the correct content of input part
  const renderContent = (type) => {
    switch (type) {
      case "webpage":
        return (
          <CompressWebPage
            error={error}
            setError={setError}
            url={url}
            setUrl={setUrl}
            setSizes={setSizes}
            setImages={setImages}
            setLoading={setLoading}
            setCompressionErrors={setCompressionErrors}
          />
        );
      case "folder":
        return (
          <CompressFolder
            error={error}
            setError={setError}
            setSizes={setSizes}
            setImages={setImages}
            setLoading={setLoading}
            setCompressionErrors={setCompressionErrors}
          />
        );
      case "file":
        return (
          <CompressFile
            error={error}
            setError={setError}
            setSizes={setSizes}
            setImages={setImages}
            setLoading={setLoading}
            setCompressionErrors={setCompressionErrors}
          />
        );
      case "website":
        return (
          <CompressWebSite
            error={error}
            setError={setError}
            url={url}
            setUrl={setUrl}
            setSizes={setSizes}
            setImages={setImages}
            setLoading={setLoading}
          />
        );
      default:
        return <div>An error has occured, please refresh the page</div>;
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

  // Function that handles download of all images
  const downloadAllImages = async () => {
    try {
      const response = await axiosPrivate.get("/api/compress/downloadAll", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "images.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the zip", error);
    }
  };

  useEffect(() => {
    // Get usage count
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/api/user/getusagecount");
        setUsageCount(response.data.usage_count);
      } catch (error) {
        if (error.message) {
          setError(error.message);
        }
        console.error(error);
      }
    };
    getUser();
  }, [loading]);

  useEffect(() => {
    // Cleanup object URLs on unmount
    return () => {
      imgs.forEach((image) => URL.revokeObjectURL(displayDownloadedImg(image)));
    };
  }, [imgs]);

  return (
    <section className="flex flex-col gap-10 w-[100%] mx-auto mt-10 max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] my-10 p-5">
      <h1 className=" text-3xl sm:text-4xl md:text-5xl  self-center text-center font-extrabold">
        Welcome, <br />
        {auth?.username}
      </h1>
      {auth?.role === "user" ? (
        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg text-center">
            You're using our{" "}
            <span className="font-bold text-orange-500">free</span> trial. You
            have a limited number of compressions and you can compress maximum
            90 images and 10MB per compression
          </p>
          <p>Compressions left: {4 - usageCount}</p>
          <Link to={"/pricing"}>
            <button className="cta__btn  p-2 rounded-md">
              Get unlimited compresions
            </button>
          </Link>
        </div>
      ) : auth?.role === "admin" ? (
        <div className="flex flex-col items-center">
          <p className="text-lg">
            Hey Max, you're the{" "}
            <span className="font-bold text-orange-500">Admin</span>, and what a
            great app you've made!
          </p>
        </div>
      ) : auth?.role === "vip" ? (
        <div className="flex flex-col items-center">
          <p className="text-lg">
            You're a <span className=" font-bold text-orange-500">vip</span> ,
            you have access to all the functionalities
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg text-center">
            You're using our{" "}
            <span className=" font-bold text-orange-500">{auth?.role}</span>{" "}
            compression service,
            <span>
              {" "}
              {auth?.role === "premium"
                ? "You can compress up to 1000 images and 300MB per one compression "
                : "You can compress maximum 400 images and 100MB per compression"}
            </span>
          </p>

          {auth?.role === "starter" && (
            <Link to={"/pricing"} className="mt-5">
              <button className="cta__btn p-2 rounded-md ">Get premium</button>
            </Link>
          )}
        </div>
      )}

      <div className="flex self-center  bg-whiteBg text-blackColor rounded-md w-[100%] max-[400px]:text-sm">
        <div
          className={`${
            type === "webpage" ? "activeCompress" : ""
          } p-3 flex-1 flex justify-center rounded-md cursor-pointer transition`}
          onClick={() => setType("webpage")}
        >
          Webpage
        </div>
        <div
          className={`${
            type === "folder" ? "activeCompress" : ""
          } p-3 flex-1 flex justify-center rounded-md cursor-pointer transition`}
          onClick={() => setType("folder")}
        >
          Folder
        </div>
        <div
          className={`${
            type === "file" ? "activeCompress" : ""
          } p-3 flex-1 flex justify-center rounded-md cursor-pointer transition`}
          onClick={() => setType("file")}
        >
          File
        </div>
        <div
          className={`${
            type === "website" ? "activeCompress" : ""
          } p-3 flex-1 flex justify-center rounded-md cursor-pointer transition`}
          onClick={() => setType("website")}
        >
          Website
        </div>
      </div>
      {renderContent(type)}

      <div className="mt-5 flex flex-col items-center">
        <h2>The results will appear here</h2>
        {imgs && imgs.length > 0 && (
          <button
            className="compress__download__all p-2 rounded-md my-4 mb-10"
            onClick={downloadAllImages}
          >
            Download All
          </button>
        )}
        {sizes && (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className=" text-3xl">
                Orignal files size: {formatBytes(sizes.sumOriginalSizes)}
              </div>
              <div className=" text-3xl">
                Result: {formatBytes(sizes.sumOPtimizedSizes)}
              </div>
            </div>
            <div className="compression-ratio p-3 rounded-full h-24 w-24 flex items-center justify-center text-blackColor my-5 text-2xl">
              {!isNaN(
                (
                  ((sizes.sumOriginalSizes - sizes.sumOPtimizedSizes) /
                    sizes.sumOriginalSizes) *
                  100
                ).toFixed(2)
              )
                ? (
                    ((sizes.sumOriginalSizes - sizes.sumOPtimizedSizes) /
                      sizes.sumOriginalSizes) *
                    100
                  ).toFixed(2)
                : "0"}
              %
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center lg:grid-cols-3 xl:grid-cols-4">
          {!loading ? (
            imgs && imgs.length > 0 ? (
              imgs?.map((src, i) => {
                if (
                  compressionErrors?.map((err) => err.filename).includes(src)
                ) {
                  const message = compressionErrors?.find(
                    (err) => err.filename === src
                  )?.message;
                  return (
                    <div
                      className="w-full flex justify-center items-center p-6 bg-blackColor "
                      key={i}
                    >
                      Error: {message}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="compress__img__ctn w-full cursor-pointer flex justify-center items-center"
                      onClick={() => downloadImage(src)}
                      key={i}
                    >
                      <img
                        src={displayDownloadedImg(src)}
                        alt="compressed images"
                        className=""
                      />
                      <div className="compress__overlay flex justify-center items-center">
                        <p className=" text-3xl md:text-xl">Download Image</p>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              ""
            )
          ) : (
            <div className=" text-3xl fixed top-0 left-0 bottom-0 right-0 w-[100%] bg-slate-600 bg-opacity-90 flex justify-center items-center flex-col">
              <div className="">The compression can take some time</div>
              <div className="loader mt-4"></div>
              <div className="mt-4">Please wait a moment</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Compress;
