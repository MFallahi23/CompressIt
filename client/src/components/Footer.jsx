import React from "react";
import logo from "../assets/logo.svg";
import twitter_img from "../assets/twitter-pp.jpg";
import "./styles/Footer.css";
const Footer = () => {
  return (
    <footer className="mt-auto bg-whiteBg text-blackColor p-8 text-center">
      <section className="upper-footer flex flex-col items-center gap-5 md:flex-row md:justify-between mx-auto sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px]">
        <div className="main-column flex flex-col">
          <div className="footer__logo flex items-center justify-center">
            <img src={logo} alt="logo" className=" w-8 " />
            <span className="footer__logo__text text-xl font-semibold">
              CompressIT
            </span>
          </div>
          <p className="text-s">Make money with web app optimization</p>
          <div className="footer__copyright">
            Copyright © 2024 - All rights reserved
          </div>
        </div>
        <div className="secondary-column flex flex-col md:flex-row md:flex-wrap items-center gap-10">
          <div className="footer__Legal">
            <h2 className="font-bold">Legal</h2>
            <ul className="flex flex-col">
              <li>Terms of services</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="footer__Links">
            <h2 className="font-bold">Links</h2>
            <ul className="flex flex-col">
              <li>Login</li>
              <li>Pricing</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="down-footer mt-20">
        <div className="footer__twitter__img flex flex-col md:flex-row items-center gap-5 justify-center">
          <img
            src={twitter_img}
            alt=" twitter pp"
            className="w-10 rounded-full"
          />

          <div className="">
            Hey👋! I'm Max Fallahi, the creator of this app, here is my{" "}
            <a
              href="https://twitter.com/FallahiMouhcine"
              target="_blank"
              className=" underline"
            >
              Twitter
            </a>
            .
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
