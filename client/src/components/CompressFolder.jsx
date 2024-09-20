import React, { useEffect, useRef, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
const CompressFolder = ({
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
  const { auth } = useAuth();

  // Function to return the appropriate limitations depending on the user role
  const defineLimit = () => {
    if (auth?.role === "user") {
      return 90;
    } else if (auth?.role === "starter") {
      return 900;
    } else if (auth?.role === "premium") {
      return 4000;
    } else {
      return 5000;
    }
  };
  // Function to handle dragging of file over the form
  const handleDrag = (e) => {
    e.preventDefault();
    setError("");
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Function to handle file drop in the form
  const handleDrop = async (e) => {
    e.preventDefault();
    setError("");
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.items) {
      const items = e.dataTransfer.items;
      let validDrop = false;
      const filesToCollect = [];
      if (items && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i].webkitGetAsEntry();
          if (item && item.isDirectory) {
            validDrop = true;
            await traverseFileTree(item, filesToCollect);
          } else {
            setError("Please drop a folder, not files.");
          }
        }
      }
      if (!validDrop) {
        setError("Please drop a folder, not files.");
      } else {
        setCollectedFiles(filesToCollect);
      }
    }
  };
  const traverseFileTree = async (item, filesToCollect, depth = 0) => {
    if (depth >= 20) {
      setError("Maximum depth reached, stopping traversal.");
      return;
    }
    if (filesToCollect.length >= defineLimit()) {
      setError(`Limit reached. Max numbers of files: ${defineLimit()}`);
      return;
    }
    if (item.isFile) {
      const file = await new Promise((resolve) => {
        item.file(resolve);
      });
      if (file.name !== ".DS_Store") {
        filesToCollect.push(file);
      }
    } else if (item.isDirectory) {
      const dirReader = item.createReader();
      const entries = await new Promise((resolve) => {
        dirReader.readEntries(resolve);
      });

      for (let i = 0; i < entries.length; i++) {
        await traverseFileTree(entries[i], filesToCollect, depth + 1);
      }
    }
  };
  // Function to handle selecting file with clicking
  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    if (e.target.files) {
      handleFiles(e.target.files);
    }
    e.target.value = "";
  };

  // Function to handle Files
  const handleFiles = (files) => {
    const arrFiles = Array.from(files);
    console.log(arrFiles);
    console.log(defineLimit());

    if (arrFiles.length > defineLimit()) {
      setError(`Limit reached. Max numbers of files: ${defineLimit()}`);
      return;
    }
    const filteredFiles = arrFiles.filter((file) => file.name !== ".DS_Store");
    setCollectedFiles(filteredFiles);
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

      if (error?.response?.status === 413) {
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
      <h1 className="text-5xl text-center mb-8">Drag your folder here</h1>
      <form
        action=""
        className={` flex  gap-5 flex-col items-center justify-center w-[100%]  border-4 border-blackColor border-dashed p-8 relative h-44 ${
          dragActive ? " opacity-45" : ""
        }`}
        onSubmit={(e) => e.preventDefault()}
        onDragEnter={handleDrag}
        onClick={() => inputRef.current.click()}
      >
        <input
          type="file"
          className=" hidden"
          ref={inputRef}
          onChange={handleChange}
          directory=""
          webkitdirectory=""
          mozdirectory=""
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

export default CompressFolder;
