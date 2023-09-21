import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
const Hero = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center p-2 px-10  text-slate-900 dark:text-slate-50">
        <div className="flex flex-col justify-start">
          <Link href="/" className="text-4xl font-bold">
            Bill Navigator
          </Link>
          <div className="text-2xl pt-2">A Source for Tracking Congress</div>
        </div>
        <Image
          src="/ThemeColorLogo.png"
          height={250}
          width={250}
          alt="navigator logo"
        />
      </div>
    </div>
  );
};

export default Hero;
