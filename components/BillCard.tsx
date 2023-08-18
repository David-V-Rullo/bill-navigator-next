"use client";
import React from "react";
import { Bill } from "@/types/index";
import CustomButton from "./CustomButton";
import Link from "next/link";
interface BillCardProps {
  bill: Bill;
}

const renderButton = (status: string | null, label: string) => (
  <button
    className={`px-4 py-2 text-white cursor-default ${
      status ? "bg-green-500" : "bg-gray-500"
    }`}
  >
    {label}
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
  const memberName = bill.sponsor_name;
  console.log(bill);
  return (
    <div className="flex flex-col p-2 m-2  w-full">
      <Link
        href={`/billDetails/${congress}/${bill.bill_slug}`}
        className="font-bold text-center bg-blue-900"
      >
        {bill.bill_id.toUpperCase()}
      </Link>
      <div className="grid grid-cols-4 gap-4 py-4">
        <div className="font-semibold">Introduced:</div>
        <div className="col-span-3">{bill.introduced_date}</div>
        <div className="font-semibold">Sponsor:</div>
        <Link
          href={`/members/${bill.sponsor_name}/${bill.sponsor_id}`}
          className="col-span-3"
        >
          {" "}
          {`${bill.sponsor_title} ${bill.sponsor_name} (${
            bill.sponsor_party
          }-${bill.sponsor_state.toUpperCase()})`}{" "}
        </Link>
        <div className="font-semibold">Bill Title:</div>
        <div className="col-span-3">{bill.short_title}</div>
      </div>
      <div className="flex flex-col justify-center align-top my-3 w-full">
        <div className="flex flex-row justify-between align-top gap-3 px-3">
          <div className="flex flex-col justify-center align-top h-full w-full">
            <h1 className="font-semibold text-center">Latest Major Action:</h1>

            <div className="drop-shadow-md p-2 flex flex-row">
              {bill.latest_major_action}
            </div>
          </div>
          <div className="flex flex-col justify-center w-full">
            <h1 className="font-semibold text-center">Cosponsors by Party:</h1>

            <div className="w-full drop-shadow-md p-2 flex flex-col ">
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
        <h1 className="font-semibold text-center mt-5">Status:</h1>

        <div className="drop-shadow-md p-2 flex flex-row">
          {renderStatus(
            introduced_date,
            house_passage,
            senate_passage,
            enacted
          )}
        </div>
      </div>
      <div className="flex flex-row justify-around gap-3 px-3">
        <Link href={`${bill.congressdotgov_url}`}>
          <CustomButton label="View on Congress.gov" color="blue" />
        </Link>
      </div>
    </div>
  );
};

export default BillCard;
