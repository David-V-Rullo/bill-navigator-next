"use client";
import React from "react";
import { useMemo } from "react";
interface PartisanCardProps {
  votesWithParty: number;
  party: string;
}
const PartisanCard: React.FC<PartisanCardProps> = ({
  votesWithParty,
  party,
}) => {
  // create a useMemo hook to calculate the background color
  // based on the votesWithParty and party props

  const backgroundColor = useMemo(() => {
    const neutralColor = [200, 200, 200]; // RGB for grey
    const republicanColor = [255, 0, 0]; // RGB for red
    const democratColor = [0, 0, 255]; // RGB for blue

    let colorDifference;
    let baseColor;

    if (votesWithParty >= 50) {
      colorDifference = (votesWithParty - 50) / 50;
    } else {
      colorDifference = (50 - votesWithParty) / 50;
    }

    if (party === "R") {
      baseColor = colorDifference >= 0 ? republicanColor : democratColor;
    } else if (party === "D") {
      baseColor = colorDifference >= 0 ? democratColor : republicanColor;
    }

    // Calculate the RGB values based on the difference
    const r = Math.round(
      neutralColor[0] -
        (neutralColor[0] - baseColor[0]) * Math.abs(colorDifference)
    );
    const g = Math.round(
      neutralColor[1] -
        (neutralColor[1] - baseColor[1]) * Math.abs(colorDifference)
    );
    const b = Math.round(
      neutralColor[2] -
        (neutralColor[2] - baseColor[2]) * Math.abs(colorDifference)
    );
    function rgbToHex(r: number, g: number, b: number): string {
      return (
        "#" +
        ((1 << 24) + (r << 16) + (g << 8) + b)
          .toString(16)
          .slice(1)
          .toUpperCase()
      );
    }
    const hexValue = rgbToHex(r, g, b);
    return hexValue;
  }, [votesWithParty, party]);
  return (
    <div className="flex flex-col w-full items-center">
      <div className=" font-semibold text-center underline">Partisan Score</div>
      <div
        style={{ backgroundColor: backgroundColor, fontSize: "48px" }}
        className={`text-center font-sans font-semibold text-white p-2 my-5 w-1/2`}
      >
        {votesWithParty}
      </div>{" "}
    </div>
  );
};

export default PartisanCard;