import React from "react";
import { Member, MemberData } from "@/types/index";
import Image from "next/image";
import PartisanCard from "@/components/PartisanCard";
import SocialMediaCard from "@/components/SocialMediaCard";
import { CongressData } from "@/types/MemberCongressApi";
const fetchMemberCongressAPI = async (id: string): Promise<CongressData> => {
  const apiKey = process.env.CONGRESS_API_KEY;
  const API_ENDPOINT = `https://api.congress.gov/v3/member/${id}?api_key=${apiKey}`;
  if (!apiKey) {
    throw new Error("No API key");
  }
  const response = await fetch(API_ENDPOINT, {});
  if (!response.ok) {
    throw new Error("Failed to fetch member");
  }
  const data: CongressData = await response.json();
  return data;
};
const fetchMember = async (id: string): Promise<MemberData> => {
  const API_ENDPOINT = `https://api.propublica.org/congress/v1/members/${id}.json`;
  const apiKey = process.env.PROPUBLICA_API_KEY;
  if (!apiKey) {
    throw new Error("No API key");
  }
  const response = await fetch(API_ENDPOINT, {
    headers: { "X-API-Key": apiKey },
    next: { revalidate: 7200 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch member");
  }

  const data: { results: MemberData[] } = await response.json();
  return data.results[0];
};
// `https://api.congress.gov/v3/member/${id}?api_key=${process.env.CONGRESS_API_KEY}`
const MemberDetailPage = async ({
  params,
}: {
  params: { id: string; name: string };
}) => {
  const member = await fetchMember(params.id);
  const congressData = await fetchMemberCongressAPI(params.id);
  const {
    roles: [
      {
        congress,
        seniority,
        next_election,
        total_votes,
        missed_votes,
        state,
        missed_votes_pct,
        votes_with_party_pct,
        start_date,
        end_date,
        bills_cosponsored,
        bills_sponsored,
        district,
        office,
      },
    ],
  } = member;
  const memberName = params.name.replace(/%20/g, " ");
  console.log(congressData.member.depiction.imageUrl);
  return (
    <div className="flex container flex-col p-4 m-4 items-center">
      <div className="font-bold text-center w-full mb-5">
        {member.roles[0].title} {memberName}
      </div>

      <div className="flex flex-row gap-4 justify-between items-center mt-5">
        <div className="w-1/3 flex flex-col items-center">
          <Image
            src={`${congressData.member.depiction.imageUrl}`}
            height={200}
            width={200}
            alt="member portrait"
            className="rounded-full"
          />
        </div>

        <ul className="grid grid-cols-3 gap-y-1">
          <li>
            <p className="font-semibold">Congress:</p>
          </li>
          <li className="col-span-2">
            <p>{congress}</p>
          </li>
          <li>
            <p className="font-semibold">State:</p>
          </li>
          <li className="col-span-2">
            <p>{state}</p>
          </li>
          <li>
            <p className="font-semibold">District:</p>
          </li>
          <li className="col-span-2">
            <p>{district}</p>
          </li>
          <li>
            <p className="font-semibold">Address:</p>
          </li>
          <li className="col-span-2">
            <p>{office}</p>
            <p>1 Independence Ave SE, </p>
            <p>Washington, DC 20003</p>
          </li>
        </ul>
      </div>

      <div className="flex flex-row justify-between items-center mt-4 w-full">
        <PartisanCard
          votesWithParty={member.roles[0].votes_with_party_pct}
          party={member.current_party}
        />
        <p className="w-full text-center">Stat Card</p>
        <SocialMediaCard {...member} />
      </div>
    </div>
  );
};

export default MemberDetailPage;
