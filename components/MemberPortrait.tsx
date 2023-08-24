"use client";
import React from "react";
import Image from "next/image";

interface MemberPortraitProps {
  url: string;
}
const MemberPortrait: React.FC<MemberPortraitProps> = (
  props: MemberPortraitProps
) => {
  const imageUrl = props.url;
  return (
    <div>
      MemberPortrait
      <Image
        src={`${imageUrl}`}
        height={200}
        width={200}
        alt="member portrait"
        className="rounded-full"
      />
    </div>
  );
};

export default MemberPortrait;
