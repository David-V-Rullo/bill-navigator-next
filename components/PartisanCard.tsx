"use client";
import React from "react";
import { useMemo } from "react";
interface PartisanCardProps {
  votesWithParty: number;
  party: string;
  sponsoredLegislation: number;
  cosponsoredLegislation: number;
  totalVotes: number;
  missedVotes: number;
  terms: number;
}
const PartisanCard: React.FC<PartisanCardProps> = ({
  votesWithParty,
  party,
  sponsoredLegislation,
  cosponsoredLegislation,
  totalVotes,
  missedVotes,
  terms,
}) => {
  // create a useMemo hook to calculate the background color
  // based on the votesWithParty and party props

  const backgroundColor = useMemo(() => {
    const neutralColor = [200, 200, 200]; // RGB for grey
    const republicanColor = [255, 0, 0]; // RGB for red
    const democratColor = [0, 0, 255]; // RGB for blue

    let colorDifference;
    let baseColor = neutralColor;

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
    <div className="grid grid-cols-3 gap-3 content-around">
      <div className="flex flex-col items-center">
        <div className="font-semibold text-center underline">
          Partisan Score
        </div>
        <div
          style={{ backgroundColor: backgroundColor }}
          className={`text-center font-sans font-semibold rounded-md text-white p-2 text-5xl`}
        >
          {votesWithParty}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="font-semibold text-center underline">
          Sponsored Legislation
        </div>
        <div
          className={`text-center font-sans font-semibold rounded-full text-white p-2  text-5xl`}
        >
          {sponsoredLegislation}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="font-semibold text-center underline">
          Co-Sponsored Legislation
        </div>
        <div
          className={`text-center font-sans font-semibold rounded-full text-white p-2  text-5xl`}
        >
          {cosponsoredLegislation}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="font-semibold text-center underline">Terms Served</div>
        <div
          className={`text-center font-sans font-semibold rounded-full text-white p-2  text-5xl`}
        >
          {terms}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="font-semibold text-center underline">Total Votes</div>
        <div
          className={`text-center font-sans font-semibold rounded-full text-white p-2  text-5xl`}
        >
          {totalVotes}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="font-semibold text-center underline">Missed Votes</div>
        <div
          className={`text-center font-sans font-semibold rounded-full text-white p-2 text-5xl`}
        >
          {missedVotes}
        </div>
      </div>
    </div>
  );
};

export default PartisanCard;
