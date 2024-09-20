import React, { useEffect, useRef, useState } from "react";
import isValidUrl from "../utils/isValidUrl";
import { axiosPrivate } from "../api/axios";
import { FaPlusCircle } from "react-icons/fa";

const CompressFile = ({
  setError,
  error,
  setSizes,
  setImages,
  setLoading,
  setCompressionErrors,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [collectedFiles, setCollectedFiles] = useState([]);
  const inputRef = useRef(null);
  // Function to submit the url to the server
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setSizes(undefined);
      setImages([]);
      setLoading(true);

      setLoading(false);

      // setImages(() => {
      //   return resultImages.map((img) => {
      //     return `compressed${userId}/${img}`;
      //   });
      // });
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 422) {
        setError(error?.response?.data.error);
      } else {
        setError("An error occured!");
      }

      console.log(error);
    }
  };

  // Function to handle dragging of file over the form
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Function to handle file drop in the form
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Function to handle selecting file with clicking
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Function to handle Files
  const handleFiles = (files) => {
    const arrFiles = Array.from(files);
    setCollectedFiles(arrFiles);
  };

  const sendFiles = async () => {
    setLoading(true);
    setSizes(undefined);
    setImages([]);
    try {
      if (!Array.isArray(collectedFiles) || collectedFiles.length === 0) {
        setError("No files were found!");
        return; // Exit the function early
      }
      const formData = new FormData();
      collectedFiles.forEach((file) => {
        formData.append("files", file);
      });
      const response = await axiosPrivate.post(
        "/api/compress/folder",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let resultImages;

      resultImages = response?.data.imgs || [];

      const userId = response?.data.userId;
      const sizes = response?.data.sizes;
      const compressionErrors = response?.data.compressionErrors || [];
      setSizes(sizes);
      setLoading(false);
      console.log(compressionErrors);

      setCompressionErrors(() => {
        return compressionErrors.map((err) => {
          return {
            message: err.message,
            filename: `compressed${userId}/${err.filename}`,
          };
        });
      });

      setImages(() => {
        return resultImages.map((img) => {
          return `compressed${userId}/${img}`;
        });
      });
    } catch (error) {
      setLoading(false);

      if (error?.response?.status === 401) {
        setError("Exceeded the free limit!");
      } else {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        setError(errorMessage);
      }
    }
  };
  useEffect(() => {
    setImages([]);
    setSizes(undefined);
  }, []);

  useEffect(() => {
    if (collectedFiles.length > 0) {
      sendFiles();
    }
  }, [collectedFiles]);

  return (
    <div className=" bg-whiteBg rounded-lg p-5 text-blackColor shadow-xl">
      {error && (
        <div className=" text-center bg-red-700 p-1 rounded-md">{error}</div>
      )}
      <h1 className="text-5xl text-center mb-8">Drag your file here</h1>
      <form
        action=""
        className={` flex  gap-5 flex-col items-center justify-center w-[100%] border-4 border-blackColor border-dashed p-8 relative h-44 ${
          dragActive ? " opacity-45" : ""
        }`}
        onSubmit={(e) => handleSubmit(e)}
        onDragEnter={handleDrag}
        onClick={() => inputRef.current.click()}
      >
        <input
          type="file"
          multiple={true}
          accept="image/*,image/heic,image/heif"
          className=" hidden"
          ref={inputRef}
          onChange={handleChange}
        />
        {!dragActive && <p>Drag your file here</p>}
        {!dragActive && <p>Upload a file</p>}
        {dragActive && <FaPlusCircle className=" text-2xl" />}
        {dragActive && (
          <div
            className=" absolute w-[100%] h-[100%] top-0 right-0 left-0 bottom-0"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    </div>
  );
};

export default CompressFile;
