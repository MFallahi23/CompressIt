import React from "react";
import { useNavigate } from "react-router-dom";

const License = () => {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] p-4 flex flex-col items-center gap-6 my-10">
      <h1 className="text-5xl font-extrabold"> CompressIt License Agreement</h1>
      <p
        className=" mt-5 underline cursor-pointer absolute top-10 left-10"
        onClick={() => navigate(-1)}
      >
        Go back
      </p>
      <div className="flex flex-col gap-4">
        <div className="">
          <p>TL;DR</p>
          <p> Personal License: Compress images as an individual.</p>
          <p> Team License: Compress images as part of a team.</p>
          This License Agreement ("Agreement") is entered into between
          CompressIt, and you, the user ("Licensee"), regarding the use of the
          CompressIt image compression software (the "Product") available on the
          CompressIt website (the "Website"). By accessing or using the Product,
          the Licensee agrees to be bound by the terms and conditions of this
          Agreement.
        </div>
        <h2 className=" text-2xl">1. Grant of License</h2>
        <h3 className=" text-xl">1.1 Personal License</h3>
        Subject to the terms and conditions of this Agreement, CompressIt grants
        the Licensee a non-exclusive, non-transferable, and non-sublicensable
        Personal License to use CompressIt for the following purposes:
        <ul>
          <li>Compress a limited number of images.</li>
          <li>
            Use CompressIt for personal or commercial purposes, within the
            limits set by the service.
          </li>
        </ul>
        <h3 className=" text-xl">1.2 Team License</h3>
        Subject to the terms and conditions of this Agreement, CompressIt grants
        the Licensee a non-exclusive, non-transferable, and non-sublicensable
        Team License to: Compress a limited number of images. Use CompressIt as
        part of a team. Share access to the Product within a team for collective
        usage, within the service limits.
        <h2 className=" text-2xl">2. Restrictions</h2>
        Licensee shall not: Modify, adapt, reverse engineer, decompile,
        disassemble, or create derivative works based on CompressIt. Remove,
        alter, or obscure any copyright, trademark, or proprietary notices from
        CompressIt. Use CompressIt in any way that violates applicable laws,
        regulations, or third-party rights. Sub-license, rent, lease, or
        transfer CompressIt or any rights granted under this Agreement.
        <h2 className=" text-2xl">3. Ownership and Intellectual Property</h2>
        CompressIt retains all ownership and intellectual property rights in and
        to the Product. This Agreement does not grant Licensee any ownership
        rights in CompressIt.
        <h2 className=" text-2xl">4. Warranty and Disclaimer</h2>
        CompressIt is provided "as is" without warranty of any kind, either
        express or implied, including but not limited to the implied warranties
        of merchantability, fitness for a particular purpose, or
        non-infringement.
        <h2 className=" text-2xl">5. Limitation of Liability</h2>
        To the maximum extent permitted by applicable law, CompressIt shall not
        be liable for any direct, indirect, incidental, special, consequential,
        or punitive damages arising out of or relating to the use or inability
        to use CompressIt, even if CompressIt has been advised of the
        possibility of such damages.
        <h2 className=" text-2xl">6. Governing Law and Jurisdiction</h2>
        This Agreement shall be governed by and construed in accordance with the
        laws of Morocco, without regard to its conflict of law principles. Any
        dispute arising out of or in connection with this Agreement shall be
        subject to the exclusive jurisdiction of the courts located in Morocco.
        <h2 className=" text-2xl">7. Entire Agreement</h2>
        This Agreement constitutes the entire agreement between the Licensee and
        CompressIt concerning the subject matter hereof and supersedes all prior
        or contemporaneous agreements, representations, warranties, and
        understandings.
        <div className="">
          <p>Last updated: 20/09/2024</p>
          <p>CompressIt Contact Information: mohcinefallahi23@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default License;
