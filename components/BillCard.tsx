"use client";
import React from "react";
import { Bill } from "@/types/index";
import Link from "next/link";
interface BillCardProps {
  bill: Bill;
}

const renderButton = (status: string | null, label: string) => (
  <button
    className={`px-6 py-2 cursor-default ${
      status
        ? "bg-green-500 text-white font-semibold"
        : "bg-gray-700 text-gray-400"
    }`}
  >
    <h2 className="bg-inherit">
      {label} {status && <h2 className="bg-inherit text-sm">{status}</h2>}
    </h2>
  </button>
);

const renderStatus = (
  introduced_date: string | null,
  house_passage: string | null,
  senate_passage: string | null,
  enacted: string | null
) => (
  <>
    {renderButton(introduced_date, "Introduced")}
    {renderButton(house_passage, "Passed House")}
    {renderButton(senate_passage, "Passed Senate")}
    {renderButton(enacted, "Became Law")}
  </>
);
const BillCard: React.FC<BillCardProps> = (props: BillCardProps) => {
  const { bill } = props;
  const { introduced_date, house_passage, senate_passage, enacted } = bill;
  const congress = bill.bill_id.split("-")[1];
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 rounded-md overflow-hidden">
      <div className="font-bold text-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b-4 border-b-red-800 p-2 rounded-sm h-12">
        {" "}
        <Link href={`/billDetails/${congress}/${bill.bill_slug}`}>
          {bill.bill_id.toUpperCase()}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 py-4">
        <div className="font-semibold">Introduced:</div>
        <div className="col-span-3">{bill.introduced_date}</div>
        <div className="font-semibold">Sponsor:</div>
        <Link
          href={`/members/${bill.sponsor_name}/${bill.sponsor_id}`}
          className="col-span-3"
        >
          {`${bill.sponsor_title} ${bill.sponsor_name} (${
            bill.sponsor_party
          }-${bill.sponsor_state.toUpperCase()})`}
        </Link>
        <div className="font-semibold">Bill Title:</div>
        <div className="col-span-3">{bill.short_title}</div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 w-full p-4">
        <div className="flex flex-col md:w-1/2 mb-4 md:mb-0">
          <h1 className="font-semibold text-center mb-2">
            Latest Major Action:
          </h1>
          <h3 className="font-extralight text-center mb-2">
            {bill.latest_major_action_date}
          </h3>
          <div className="drop-shadow-md p-4">{bill.latest_major_action}</div>
        </div>
        <div className="flex flex-col md:w-1/2">
          <h1 className="font-semibold text-center mb-2">
            Cosponsors by Party:
          </h1>
          <div className="w-full drop-shadow-md p-2 flex flex-col">
            <div className="flex flex-row justify-center align-middle gap-5 mt-4">
              <div className="px-4 py-2 text-white font-extrabold text-2xl bg-blue-500 rounded-full">
                {bill.cosponsors_by_party.D ? bill.cosponsors_by_party.D : 0}
              </div>
              <div className="h-10 border-2 border-gray-200"></div>
              <div className="px-4 py-2 text-white font-extrabold text-2xl bg-red-500 rounded-full">
                {bill.cosponsors_by_party.R ? bill.cosponsors_by_party.R : 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="font-semibold text-center mt-5">Status</div>
      <div className=" p-4 px-5 grid grid-rows-4 grid-cols-1 sm:grid-cols-4 sm:grid-rows-1">
        {renderStatus(introduced_date, house_passage, senate_passage, enacted)}
      </div>

      <div className="flex flex-row justify-around gap-3 p-5">
        <Link href={`${bill.congressdotgov_url}`} target="_blank">
          <button className="bg-blue-700 hover:bg-blue-900 px-2 py-1 rounded-md text-center font-bold drop-shadow-lg">
            View on Congress.gov
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BillCard;
