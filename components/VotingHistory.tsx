import React from "react";
interface VotingCardProps {
  sponsoredLegislation: number;
  cosponsoredLegislation: number;
  totalVotes: number;
  missedVotes: number;
}
const VotingHistory: React.FC<VotingCardProps> = ({
  sponsoredLegislation,
  cosponsoredLegislation,
  totalVotes,
  missedVotes,
}) => {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex flex-col items-center">
        <div className="font-semibold text-center underline">
          Sponsored Legislation
        </div>
        <div
          className={`text-center font-sans font-semibold rounded-md text-white p-2 my-5 text-5xl`}
        >
          {sponsoredLegislation}
        </div>
      </div>
      <div className="flex flex-col  items-center">
        <div className=" font-semibold text-center underline">
          Co-Sponsored Legislation
        </div>
        <div
          className={`text-center font-sans font-semibold rounded-md text-white p-2 my-5 text-5xl`}
        >
          {cosponsoredLegislation}
        </div>
      </div>{" "}
    </div>
  );
};

export default VotingHistory;
