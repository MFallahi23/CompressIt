import React, { useState } from "react";
import fastSvg from "../assets/fast.svg";
import { HiArrowSmallDown } from "react-icons/hi2";
import { FaImages } from "react-icons/fa";
import { FaFileCode } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoDatabase } from "react-icons/go";
import "./styles/home.css";
const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Activate slides
  const toggleSlide = (index) => {
    setActiveSlide(index === activeSlide ? null : index);
  };
  return (
    <section className=" w-[100%] flex flex-col gap-20 ">
      <div className="flex flex-col md:flex-row  gap-20 md:justify-between w-[100%] mx-auto mt-3 max-w-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] my-10 p-5">
        <div className="text-center md:text-left md:max-w-[500px]">
          <h1 className="text-6xl font-bold">
            Speed up your website and create a unique user experience
          </h1>
          <p className="mt-5">
            Compress all your media assets with just one click, optimize the
            performance of your websites and earn money by speeding up existing
            websites
          </p>
          <button className="cta__btn transition p-2 rounded-md text-xl px-10 mt-8">
            Get started
          </button>
        </div>
        <div className="md:max-w-[400px] flex justify-center items-center flex-col">
          <img src={fastSvg} alt="fast svg icon" />
        </div>
      </div>
      <div className="mb-10 max-w-[600px] mx-auto p-5">
        <p className=" text-[#ff6347]">Do you realize that...</p>
        <h2 className=" text-5xl">Your website is slow!</h2>
        <p>The reason for that is:</p>
        <article className="article__bg text-blackColor rounded-md p-10 mt-5">
          <ul className="flex flex-col items-center text-center">
            <li>
              <h3 className="text-2xl">Images and media</h3>
              <p>
                Large images and videos can significantly increase the size of a
                webpage. Optimizing images and videos for the web by compressing
                them can help reduce the overall size of the page.{" "}
              </p>
            </li>
            <li>
              <h3 className="text-2xl">CSS and JavaScript</h3>
              <p>
                The CSS and JavaScript files used to style and add interactivity
                to a website can also contribute to its size. Minifying and
                combining these files can help reduce the overall size of the
                page.{" "}
              </p>
            </li>
            <li>
              <h3 className="text-2xl">Server performance</h3>
              <p>
                The performance of the web server hosting the website can also
                affect loading speed. A slow server response time can delay the
                loading of the page, regardless of its size.
              </p>
            </li>
          </ul>
        </article>
        <p className="text-center mt-5 flex items-center justify-center gap-2">
          <span className="">
            {" "}
            <HiArrowSmallDown />
          </span>
          And we have the solution
        </p>
      </div>
      <div className=" bg-[#f0f0f0] text-blackColor mb-20">
        <div className="flex  items-baseline flex-1 home__slide__opt bg-[#cccccc]">
          <div
            className={`flex flex-col justify-center items-center gap-4 ${
              activeSlide === 0 ? "bg-[#ff6347] text-whiteBg" : ""
            }`}
            onClick={() => toggleSlide(0)}
          >
            <FaImages className="text-2xl" />
            Optimizing images
          </div>
          <div
            className={`flex flex-col justify-center items-center gap-4 ${
              activeSlide === 1 ? "bg-[#ff6347] text-whiteBg" : ""
            }`}
            onClick={() => toggleSlide(1)}
          >
            <FaFileCode className="text-2xl" />
            Minifying files
          </div>
          <div
            className={`flex flex-col justify-start gap-4 ${
              activeSlide === 2 ? "bg-[#ff6347] text-whiteBg" : ""
            }`}
            onClick={() => toggleSlide(2)}
          >
            <AiOutlineLoading3Quarters className="text-2xl" />
            Lazy loading
          </div>
          <div
            className={`flex flex-col justify-center gap-4 ${
              activeSlide === 3 ? "bg-[#ff6347] text-whiteBg" : ""
            }`}
            onClick={() => toggleSlide(3)}
          >
            <GoDatabase className="text-2xl" />
            Caching
          </div>
        </div>
        <div className="p-10  md:h-36 text-center">
          <div className={`slide-content ${activeSlide === 0 ? "" : "hidden"}`}>
            Compressing images and using the appropriate file format can help
            reduce their size. Compressing and resizing images is essential to
            optimizing your website for page speed. By compressing and resizing
            your images, you can reduce how long it takes for a page to load and
            how much data they take up.
          </div>
          <div className={`slide-content ${activeSlide === 1 ? "" : "hidden"}`}>
            Removing unnecessary characters and whitespace from CSS and
            JavaScript files can reduce their size. Minifying multiple scripts
            together (like jQuery and its plugins) can yield even greater
            savings. On constrained devices and/or with very large codebases
            minifying could yield a noticeable result.
          </div>
          <div className={`slide-content ${activeSlide === 2 ? "" : "hidden"}`}>
            Lazy loading images and other assets can delay their loading until
            they are needed, improving initial page load times. Reduces initial
            load time – Lazy loading a webpage reduces page weight, allowing for
            a quicker page load time. Bandwidth conservation – Lazy loading
            conserves bandwidth by delivering content to users only if it's
            requested.
          </div>
          <div className={`slide-content ${activeSlide === 3 ? "" : "hidden"}`}>
            Utilizing browser caching can store certain files locally on the
            user's device, reducing the need to download them again on
            subsequent visits. By retrieving cached data instead of making
            expensive calls applications can load faster and reduce the number
            of expensive computational calls and database queries.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
