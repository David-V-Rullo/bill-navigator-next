import React from "react";
import { Member } from "@/types/index";
import Image from "next/image";

const fetchMember = async (id: string): Promise<Member> => {
  const API_ENDPOINT = `https://api.propublica.org/congress/v1/members/${id}.json`;
  const apiKey = process.env.PROPUBLICA_API_KEY;
  if (!apiKey) {
    throw new Error("No API key");
  }
  const response = await fetch(API_ENDPOINT, {
    headers: { "X-API-Key": apiKey },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch member");
  }

  const data: { results: Member[] } = await response.json();
  return data.results[0];
};

const MemberDetailPage = async ({
  params,
}: {
  params: { id: string; name: string };
}) => {
  const member = await fetchMember(params.id);
  console.log(member);
  const memberName = params.name.replace(/%20/g, " ");
  return (
    <div className="flex flex-col p-4 m-2">
      <div className="font-bold text-center w-full">Member Detail Page</div>
      <div className="flex flex-row gap-4 justify-around align-middle mt-5">
        <div className="w-1/3 flex flex-col">
          <Image
            src="/Portrait_Placeholder.png"
            height={250}
            width={250}
            alt="member portrait"
            className="rounded-full self-center"
          />
          <p className="font-semibold p-4 mt-2 text-center">{memberName}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-around">
            <p className="font-semibold"></p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-evenly">
        <p>Stat Card</p>
        <p>Stat Card</p>
        <p>Stat Card</p>
      </div>
    </div>
  );
};

export default MemberDetailPage;
