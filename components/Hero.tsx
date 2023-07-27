import React from "react";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="flex flex-row justify-around items-center">
      <div className="flex flex-col items-center justify-start">
        <h1 className="text-4xl font-bold">Bill Navigator</h1>
      </div>
      <Image
        src="/untitled.png"
        height={300}
        width={300}
        alt="navigator logo"
      ></Image>
    </div>
  );
};

export default Hero;
