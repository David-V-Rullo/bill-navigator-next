import React from "react";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col justify-start">
        <h1 className="text-4xl font-bold">Bill Navigator</h1>
        <h2 className="text-2xl pt-2">A Source for Tracking Congress</h2>
      </div>
      <Image
        src="/BillNavLogoNavy.png"
        height={250}
        width={250}
        alt="navigator logo"
      />
    </div>
  );
};

export default Hero;
