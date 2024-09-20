import React from "react";
import { useNavigate } from "react-router-dom";
const Terms = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] p-4 flex flex-col items-center gap-6 my-10">
      <h1 className=" text-5xl font-extrabold">Terms and Conditions</h1>
      <p
        className=" mt-5 underline cursor-pointer absolute top-10 left-10"
        onClick={() => navigate(-1)}
      >
        Go back
      </p>
      <ol className="flex flex-col  gap-4 list-decimal">
        <li className="">
          <h3 className="text-xl bold">Introduction</h3> By using CompressIt,
          you confirm your acceptance of, and agree to be bound by, these terms
          and conditions.
        </li>
        <li>
          <h3 className="text-xl bold"> Agreement to Terms and Conditions</h3>
          This Agreement takes effect on the date you first use the CompressIt
          application.
        </li>
        <li>
          <h3 className="text-xl bold">
            {" "}
            Unlimited Access Software License with Termination Rights
          </h3>
          The CompressIt Software License allows users to acquire CompressIt
          through a one-time purchase, granting unlimited access to its complete
          features. It is designed for individual creators, entrepreneurs, and
          small businesses who need efficient image compression solutions. This
          license is straightforward with no recurring fees or subscriptions.
          However, the licensor reserves the right to terminate the license at
          any time without prior notice. This right of termination ensures
          flexibility in managing software distribution and usage.
        </li>
        <li>
          <h3 className="text-xl bold">Refunds</h3>
          After purchasing CompressIt, you have five days to request a full
          refund. We believe this is more than enough time to test and evaluate
          our service. Once this five-day period has passed, no refunds will be
          issued. To get a refund, please contact the owner.
        </li>
        <li>
          <h3 className="text-xl bold"> Disclaimer</h3>
          CompressIt does not guarantee that the software will meet your
          requirements or operate uninterrupted or error-free. All express and
          implied warranties not stated in this Agreement, including any related
          to profits, data loss, business interruptions, or contract losses, are
          excluded where permitted by applicable law. This Agreement does not
          affect your statutory rights.
        </li>
        <li>
          <h3 className="text-xl bold">
            Warranties and Limitation of Liability
          </h3>
          CompressIt does not provide any warranty, guarantee, or condition
          regarding the quality or fitness for a specific purpose of the
          software. CompressIt will not be liable for any indirect, special, or
          consequential losses, including loss of profits or data, arising out
          of the use of the software. Any delays or failures to meet obligations
          due to events beyond CompressIt’s reasonable control will not be
          considered breaches of contract. If CompressIt is found liable for any
          breach of this Agreement, its liability will be limited to the amount
          you paid for the software. You hereby release CompressIt from any
          obligations or claims exceeding this limitation.
        </li>
        <li>
          <h3 className="text-xl bold">User Responsibilities</h3>
          CompressIt is not responsible for how users manage or handle the
          content generated using the software.
        </li>
        <li>
          <h3 className=" text-xl bold">Prohibited Uses</h3>
          Users of CompressIt are strictly prohibited from:
          <p>
            Using CompressIt to compress or download images that are subject to
            copyright protection, without proper authorization from the
            copyright owner.
          </p>
          <p>
            Accessing or retrieving images from websites that explicitly
            prohibit downloading or scraping their content.
          </p>
          <p>
            {" "}
            Engaging in any illegal activities or violating intellectual
            property rights using the CompressIt service.
          </p>
        </li>
        <li>
          <h3 className="text-xl bold"> General Terms and Governing Law</h3>
          This Agreement is governed by the laws of Morocco. No joint venture,
          partnership, employment, or agency relationship exists between you and
          CompressIt as a result of your use of the services. You agree not to
          represent yourself as a CompressIt employee or agent, and CompressIt
          will not be held liable for any actions or representations made by
          you.
        </li>
      </ol>
    </section>
  );
};

export default Terms;
