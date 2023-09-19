import React from "react";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="flex justify-between items-center px-10 text-slate-900 dark:text-white">
      <div className="flex flex-col justify-start">
        <Link href="/" className="text-4xl font-bold">
          Bill Navigator
        </Link>
        <h2 className="text-2xl pt-2">A Source for Tracking Congress</h2>
      </div>
      <Image
        src="/ThemeColorLogo.png"
        height={300}
        width={300}
        alt="navigator logo"
      />
    </div>
  );
};

export default Hero;
