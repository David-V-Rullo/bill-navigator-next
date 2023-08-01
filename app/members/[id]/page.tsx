import React from "react";
import { Member } from "@/types/index";

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

const MemberDetailPage = async ({ params }: { params: { id: string } }) => {
  const member = await fetchMember(params.id);
  console.log(member);
  return <div>MemberDetailPage</div>;
};

export default MemberDetailPage;
