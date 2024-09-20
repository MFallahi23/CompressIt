import React, { useEffect, useState } from "react";
import PricingComp from "../components/Pricing";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

const CheckOutUrls = {
  starter:
    "https://compressit.lemonsqueezy.com/buy/38109563-3461-42db-a9a3-58c3d484a9ec?enabled=474273",
  premium:
    "https://compressit.lemonsqueezy.com/buy/038b864d-ddd6-4a6a-befd-eabfb574dcd8?enabled=474277",
};
const Pricing = () => {
  const { auth } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    window.createLemonSqueezy();
  }, []);

  const handleBuy = async (isPremium) => {
    if (auth && Object.entries(auth).length > 0) {
      try {
        const resposne = await axiosPrivate.get("/api/user/check-email");
        if (resposne.status === 200) {
          if (resposne.data.emailVerified === true) {
            window.location.href = isPremium
              ? CheckOutUrls.premium
              : CheckOutUrls.starter;
          } else {
            setError("Your email is not verified");
          }
        }
      } catch (error) {
        if (error.message) {
          setError(error.message);
        }
        console.error(error);
      }
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <div id="pricing" className="mx-auto my-10 ">
      {error && <div className=" bg-red-500 rounded p-2">{error}</div>}
      <h4 className="home__glowing_h text-center text-xl">Pricing</h4>
      <h2 className=" text-5xl max-w-2xl mx-auto text-center mt-4">
        Save hours of dirty work and upgrade your SaaS!
      </h2>
      <div className="flex flex-col max-w-[90%] md:max-w-[1200px] mx-auto md:flex-row justify-center mt-10 gap-10">
        <PricingComp type="starter" handleBuy={handleBuy} />
        <PricingComp type="premium" handleBuy={handleBuy} />
      </div>
    </div>
  );
};

export default Pricing;
