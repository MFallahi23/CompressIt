import React, { useState } from "react";
import faqData from "../data/faqData";

const Faq = () => {
  const [expandedItems, setExpandedItems] = useState({});
  // Toggle Faq answers
  const toggleItem = (id) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <section className="home__faq flex flex-col w-[90%] md:max-w-[1200px] mx-auto md:flex-row mb-10 gap-10 justify-center mt-20">
      <div className=" basis-1/2">
        <h2 className=" text-4xl">Frequently Asked Questions</h2>
        <p className=" opacity-60 mt-5">
          For other questions contact me on{" "}
          <a
            href="https://twitter.com/FallahiMouhcine"
            target="_blank"
            className=" underline"
          >
            Twitter
          </a>{" "}
          or by{" "}
          <a
            href="mailto:mohcinefallahi23@gmail.com"
            target="_blank"
            className=" underline"
          >
            email
          </a>
        </p>
      </div>
      <div className="basis-1/2">
        {faqData.map((item) => (
          <div
            className="faq-item border-t p-2 py-5 cursor-pointer"
            key={item.id}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex justify-between items-center">
              {item.question}
              <svg
                className=" flex-shrink-0 w-4 h-4 ml-auto fill-current"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className={`transform origin-center transition duration-200 ease-out  ${
                    expandedItems[item.id] && "rotate-180"
                  }`}
                ></rect>
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className={`transform origin-center rotate-90 transition duration-200 ease-out  ${
                    expandedItems[item.id] && "rotate-180 hidden"
                  }`}
                ></rect>
              </svg>
            </div>
            {expandedItems[item.id] && (
              <div className="mt-5">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
