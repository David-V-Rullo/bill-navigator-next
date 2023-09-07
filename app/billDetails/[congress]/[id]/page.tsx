import React from "react";
import { SingleBill, CongressBill } from "@/types/index";
import Link from "next/link";

function splitString(inputString: string): [string | null, string | null] {
  const match = inputString.match(/([a-zA-Z]+)([0-9]+)/);

  if (match) {
    const letters = match[1];
    const numbers = match[2];
    return [letters, numbers];
  } else {
    return [null, null];
  }
}

const fetchCongressBill = async (
  type: string | null,
  number: string | null,
  congress: string | null
): Promise<CongressBill> => {
  const API_ENDPOINT = `https://api.congress.gov/v3/bill/${congress}/${type}/${number}?api_key=${process.env.CONGRESS_API_KEY}`;
  const response = await fetch(API_ENDPOINT, {
    next: { revalidate: 7200 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch bills");
  }
  const data = await response.json();
  return data.bill;
};
const convertBillType = (billType: string) => {
  switch (billType.toLowerCase()) {
    case "hr":
    case "hres":
      return "House Resolution";
    case "sr":
      return "Senate Resolution";
    case "hjres":
      return "House Joint Resolution";
    case "sjres":
      return "Senate Joint Resolution";
    default:
      return; // or throw an error, or return a default value, as needed
  }
};

const fetchBill = async (congress: string, id: string): Promise<SingleBill> => {
  const API_ENDPOINT = `https://api.propublica.org/congress/v1/${congress}/bills/${id}.json`;
  const apiKey = process.env.PROPUBLICA_API_KEY;
  if (!apiKey) {
    throw new Error("No API key");
  }
  const response = await fetch(API_ENDPOINT, {
    headers: { "X-API-Key": apiKey },
    next: { revalidate: 7200 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bills");
  }

  const data = await response.json();
  return data.results[0] || []; // Return an empty array if 'bills' is not available
};

const BillDetails = async ({
  params,
}: {
  params: { congress: string; id: string };
}) => {
  const { congress, id } = params;
  const [type, number] = splitString(id);
  if (type !== null && number !== null) {
    console.log("Letters:", type);
    console.log("Numbers:", number, typeof number);
  } else {
    console.log("Invalid input string.");
  }
  const congressBill = await fetchCongressBill(type, number, congress);
  const bill = await fetchBill(congress, id);
  return (
    <div className="flex flex-col p-2 m-2 items-center">
      <div className="flex flex-row justify-between gap-3 px-3">
        {" "}
        <div className="bg-blue-900 w-full mt-3 p-2 drop-shadow-xl border-b-red-800 border-b-4 font-sans font-semibold text-2xl ">
          {bill.bill_id.toLocaleUpperCase()} - {bill.short_title}
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3 px-3 w-full">
        <div className="flex flex-col justify-start w-1/3 items-center">
          <div className=" font-semibold  underline mb-2">Bill Information</div>
          <ul className="grid grid-cols-3 gap-y-1 gap-x-2">
            <li>
              <p className="font-semibold">Bill ID:</p>
            </li>
            <li className="col-span-2">
              <p>{bill.bill_id.toLocaleUpperCase()}</p>
            </li>
            <li>
              <p className="font-semibold">Bill Type:</p>
            </li>
            <li className="col-span-2">
              <p>
                {convertBillType(bill.bill_type)} (
                {bill.bill_type.toUpperCase()})
              </p>
            </li>
            <li>
              <p className="font-semibold">Congress:</p>
            </li>
            <li className="col-span-2">
              <p>{bill.congress}</p>
            </li>
            <li>
              <p className="font-semibold">Introduced Date:</p>
            </li>
            <li className="col-span-2">
              <p>{bill.introduced_date}</p>
            </li>
            <li>
              <p className="font-semibold">Bill Title:</p>
            </li>
            <li className="col-span-2">
              <p>{bill.title}</p>
            </li>
            <li>
              <p className="font-semibold">Sponsor:</p>
            </li>
            <li className="col-span-2">
              <Link
                href={`/members/${bill.sponsor}/${bill.sponsor_id}`}
                className="col-span-3"
              >
                {" "}
                {bill.sponsor_title} {bill.sponsor}
              </Link>
            </li>
            <li>
              <p className="font-semibold">Latest Major Action:</p>
            </li>
            <li className="col-span-2">
              <p>
                {bill.latest_major_action} ({bill.latest_major_action_date})
              </p>
            </li>
          </ul>

          <ul className="grid grid-cols-3 gap-y-1 gap-x-2"></ul>
        </div>
        <div className="flex flex-col justify-start w-2/3 items-center">
          {congressBill && congressBill.title}
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
