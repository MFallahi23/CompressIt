import React from "react";
import { useNavigate } from "react-router-dom";
const Privacy = () => {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-[90%] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] p-4 flex flex-col items-center gap-6 my-10">
      <h1 className="text-5xl font-extrabold">Privacy Policy</h1>
      <p
        className=" mt-5 underline cursor-pointer absolute top-10 left-10"
        onClick={() => navigate(-1)}
      >
        Go back
      </p>
      <div className="flex flex-col gap-4">
        <p>
          Your privacy is important to us. It is CompressIt's policy to respect
          your privacy regarding any information we may collect from you across
          our website and other sites we own and operate.
        </p>

        <p>
          We only request personal information when it’s essential for providing
          a service to you. We collect this information fairly and lawfully,
          with your knowledge and consent. We will also explain why we are
          collecting it and how it will be used.
        </p>

        <p>
          If you sign up using your Google account, your CompressIt account
          username will be automatically prefilled with your name and public
          profile picture.
        </p>
        <p>
          We retain collected information only as long as necessary to deliver
          the requested service. Any data we store is protected using
          commercially acceptable security measures to prevent loss, theft,
          unauthorized access, disclosure, copying, use, or modification.
        </p>
        <p>
          We do not share personally identifying information with third parties
          or publicly, except when required by law.
        </p>
        <p>
          As CompressIt processes personal data, we act in accordance with
          applicable data protection laws, including the EU General Data
          Protection Regulation (GDPR) for users in the European Union, and any
          relevant local regulations for other regions. This means that
          CompressIt may act both as a data controller and a data processor
          depending on the context of data collection and usage. As a data
          controller, we determine the purposes and means of processing personal
          data (such as when you create an account or use our services). As a
          data processor, we may handle data on behalf of other entities (for
          instance, when facilitating integrations or other third-party
          services). We are committed to ensuring that personal data is
          collected, processed, and stored with transparency and security,
          following the highest standards of privacy protection. This includes
          providing users with rights over their data, such as the ability to
          access, correct, or delete their information.
        </p>
        <p>
          Our website may contain links to external sites not operated by us.
          Please be aware that we have no control over the content and privacy
          practices of these sites, and we cannot assume responsibility for
          their respective privacy policies.
        </p>
        <p>
          You are free to refuse requests for your personal information, but
          this may limit our ability to provide certain services to you.
        </p>
        <p>
          Your continued use of our website constitutes acceptance of our
          privacy practices and handling of personal information. If you have
          any questions about how we manage user data and personal information,
          feel free to contact us.
        </p>
      </div>
    </section>
  );
};

export default Privacy;
