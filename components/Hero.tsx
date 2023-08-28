import React from "react";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="flex justify-between items-center m-3">
      <div className="flex flex-col justify-start">
        <Link href="/" className="text-4xl font-bold">
          Bill Navigator
        </Link>
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
