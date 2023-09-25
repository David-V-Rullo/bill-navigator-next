import React from "react";
import { SingleBill, CongressBill } from "@/types/index";
import Link from "next/link";
import ActionCard from "@/components/ActionCard";

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
      return;
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
  return data.results[0] || [];
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
  console.log("Congress Bill", congressBill);
  console.log("Pro Pub Bill", bill);
  return (
    <div className="flex flex-col p-2 m-2 items-center">
      <div className="w-full flex justify-between gap-3 px-3">
        <div className="bg-blue-900 w-full mt-3 p-2 drop-shadow-xl border-b-red-800 border-b-4 font-sans font-semibold text-xl sm:text-2xl">
          {bill.bill_id.toLocaleUpperCase()}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-3 px-3 w-full mt-4">
        <div className="flex flex-col justify-start w-full sm:w-1/3 items-center mb-4 sm:mb-0">
          <div className="font-semibold underline mb-2">Bill Information</div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 gap-x-2">
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
            </li>{" "}
          </ul>
        </div>
        {/* <div className="flex flex-col justify-start w-full sm:w-2/3 items-center">
          {congressBill && congressBill.title}
        </div> */}
        <div className="flex flex-col align-center w-1/3 gap-4">
          <div className="font-semibold underline mb-2 text-center">
            Actions
          </div>
          {bill.actions.map((action) => (
            <ActionCard
              key={action.id}
              chamber={action.chamber}
              action_type={action.action_type}
              datetime={action.datetime}
              description={action.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
