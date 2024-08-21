import React, { useEffect } from "react";
import PricingComp from "../components/Pricing";

const CheckOutUrls = {
  starter:
    "https://compressit.lemonsqueezy.com/buy/38109563-3461-42db-a9a3-58c3d484a9ec?enabled=474273",
  premium:
    "https://compressit.lemonsqueezy.com/buy/038b864d-ddd6-4a6a-befd-eabfb574dcd8?enabled=474277",
};
const Pricing = () => {
  useEffect(() => {
    window.createLemonSqueezy();
  }, []);

  const handleBuy = (isPremium) => {
    window.location.href = isPremium
      ? CheckOutUrls.premium
      : CheckOutUrls.starter;
  };
  return (
    <div id="pricing" className="mx-auto my-10 ">
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
