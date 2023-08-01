import React from "react";
import { SingleBill } from "@/types/index";
interface BillDetailProps {
  id: string;
  congress: string;
}

const fetchBill = async (id: string, congress: string): Promise<SingleBill> => {
  const apiKey = process.env.PROPUBLICA_API_KEY;
  const API_ENDPOINT = `https://api.propublica.org/congress/v1/${congress}/bills/${id}.json`;
  if (!apiKey) {
    throw new Error("No API key");
  }

  const response = await fetch(API_ENDPOINT, {
    headers: { "X-API-Key": apiKey },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bill");
  }

  const data = await response.json();
  return data.results[0]; // Return an empty array if 'bills' is not available
};
const BillDetail: React.FC<BillDetailProps> = async ({ id, congress }) => {
  const bill = await fetchBill(id, congress);
  console.log(bill.bill_id);
  return (
    <div className="flex p-2 m-2">
      <div className="flex flex-row justify-between gap-3 px-3">
        {" "}
        <div className="font-bold text-3xl bg-slate-600 p-4 pr-4">
          {bill.bill.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default BillDetail;
