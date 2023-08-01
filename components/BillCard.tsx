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
  return (
    <div className="flex flex-col p-2 m-2">
      <Link
        href={`/billDetails/${congress}/${bill.bill_slug}`}
        className="font-bold text-center"
      >
        {bill.bill_id.toUpperCase()}
      </Link>
      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="font-semibold">Introduced:</div>
        <div className="col-span-2">{bill.introduced_date}</div>
        <div className="font-semibold">Sponsor:</div>
        <Link href={`/members/${bill.sponsor_id}`} className="col-span-2">
          {" "}
          {`${bill.sponsor_title} ${bill.sponsor_name}`}{" "}
        </Link>
        <div className="font-semibold">Bill Title:</div>
        <div className="col-span-2">{bill.short_title}</div>
      </div>
      {renderStatus(introduced_date, house_passage, senate_passage, enacted)}
      <div className="flex flex-row justify-between gap-3 px-3">
        <CustomButton
          label="Congress.gov"
          color="blue-800"
          onClick={() => {}}
        />
        <CustomButton label="Govtrack.org" color="blue" onClick={() => {}} />
        <CustomButton label="Propublica.org" color="blue" onClick={() => {}} />
      </div>
    </div>
  );
};

export default BillCard;
