import React from "react";
import { MemberData, StateAbbreviation } from "@/types/index";
import Image from "next/image";
import PartisanCard from "@/components/PartisanCard";
import SocialMediaCard from "@/components/SocialMediaCard";
import { CongressData } from "@/types/MemberCongressApi";
import { stateAbbreviationToFullName } from "@/utils";

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
        phone,
      },
    ],
  } = member;
  const memberName = params.name.replace(/%20/g, " ");
  const fullState = stateAbbreviationToFullName(
    member.roles[0].state as StateAbbreviation
  );
  return (
    <div className="flex container flex-col p-4  items-center">
      <div className="bg-blue-900 w-full p-2 drop-shadow-xl border-b-red-800 border-b-4 font-sans font-semibold text-2xl text-center ">
        {member.roles[0].title} {memberName}
      </div>
      <div className="py-6"></div>
      <div className="flex flex-row gap-4 justify-around w-full">
        <div className=" flex flex-col items-center ">
          <a
            title="Senate of the United States, Public domain, via Wikimedia Commons"
            href="https://commons.wikimedia.org/wiki/File:Cory_Booker,_official_portrait,_114th_Congress.jpg"
          >
            <img
              className="rounded-full object-contain mb-4 p-2"
              width="256"
              alt="Cory Booker, official portrait, 114th Congress"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Cory_Booker%2C_official_portrait%2C_114th_Congress.jpg/256px-Cory_Booker%2C_official_portrait%2C_114th_Congress.jpg"
            ></img>
          </a>
          {/* <Image
            src="/Portrait_Placeholder.png"
            height={200}
            width={200}
            className="rounded-full object-contain mb-4 p-2"
            alt={"member portrait"}
          />{" "} */}
          <ul className="grid grid-cols-3 gap-y-1">
            <li>
              <p className="font-semibold">Congress:</p>
            </li>
            <li className="col-span-2">
              <p>{member.roles[0].congress}</p>
            </li>
            <li>
              <p className="font-semibold">Party:</p>
            </li>
            <li className="col-span-2">
              <p>{congressData.member.partyHistory[0].partyName}</p>
            </li>
            <li>
              <p className="font-semibold">State:</p>
            </li>
            <li className="col-span-2">
              <p>{fullState}</p>
            </li>
            {district && (
              <>
                {" "}
                <li>
                  <p className="font-semibold">District:</p>
                </li>
                <li className="col-span-2">
                  <p>{district}</p>
                </li>
              </>
            )}
            {phone && (
              <>
                <li>
                  <p className="font-semibold">Phone:</p>
                </li>
                <li className="col-span-2">
                  <p>{phone}</p>
                </li>
              </>
            )}
            <li>
              <p className="font-semibold">Address:</p>
            </li>
            <li className="col-span-2">
              <p>{office}</p>
              <p>Washington, DC 20003</p>
            </li>
          </ul>
        </div>
        <PartisanCard
          votesWithParty={member.roles[0].votes_with_party_pct}
          party={member.current_party}
          sponsoredLegislation={bills_sponsored}
          cosponsoredLegislation={bills_cosponsored}
          totalVotes={total_votes}
          missedVotes={missed_votes}
          terms={congressData.member.terms.length}
        />
        <SocialMediaCard {...member} />
      </div>
      <div className="w-1/2 border-2 my-12 border-gray-200"></div>

      <div className="flex flex-col justify-between  gap-3 px-3 w-full">
        <ul className="grid grid-cols-3 gap-y-1">
          <li>
            <p className="font-semibold">Current Leadership Position:</p>
          </li>
          <li className="col-span-2">
            {congressData.member.leadership ? (
              <p>{congressData.member.leadership[0].type}</p>
            ) : (
              <p>None</p>
            )}
          </li>

          <li>
            <p className="font-semibold">Committee Assignments:</p>
          </li>
          <li className="col-span-2">
            {member.roles[0].committees.map((committee) => (
              <>
                <p key={committee.code}>
                  {committee.title}, {committee.name}
                </p>
                <p key={committee.code}></p>
              </>
            ))}
          </li>
          <li>
            <p className="font-semibold">Subcommittee Assignments:</p>
          </li>
          <li className="col-span-2">
            {member.roles[0].subcommittees.map((subcommittee) => (
              <>
                <p key={subcommittee.code}>
                  {subcommittee.title}, {subcommittee.name}
                </p>
              </>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MemberDetailPage;
