import React, { useEffect } from "react";
import isValidUrl from "../utils/isValidUrl";
import { axiosPrivate } from "../api/axios";

const CompressWebPage = ({
  url,
  setUrl,
  setError,
  error,
  setSizes,
  setImages,
  setLoading,
}) => {
  // Function to submit the url to the server
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setSizes(undefined);
      setImages([]);
      setLoading(true);
      const isValid = isValidUrl(url);
      if (!isValid) {
        setError("Invalid URL!");
        return;
      }
      console.log("Starting frontEnd");

      const response = await axiosPrivate.post("/api/compress", { url });

      let resultImages;

      resultImages = response?.data.imgs || [];

      const userId = response?.data.userId;
      const sizes = response?.data.sizes;
      setSizes(sizes);
      setLoading(false);

      setImages(() => {
        return resultImages.map((img) => {
          return `compressed${userId}/${img}`;
        });
      });
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
  useEffect(() => {
    setImages([]);
    setSizes(undefined);
  }, []);

  return (
    <div className=" bg-whiteBg rounded-lg p-5 text-blackColor shadow-xl md:p-10">
      {error && (
        <div className=" text-center bg-red-700 p-1 rounded-md">{error}</div>
      )}
      <h1 className="text-5xl text-center mb-8">Paste your webpage url here</h1>
      <form
        action=""
        className=" flex  gap-5 flex-col w-[100%] md:flex-row"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          required
          className="p-2 rounded-md flex-1 text-black border bg-gray-100 shadow-md"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
        />
        <button className="cta__btn p-2 rounded-md text-nowrap text-md basis-full md:basis-auto text-primaryText">
          Speed up your website
        </button>
      </form>
    </div>
  );
};

export default CompressWebPage;
