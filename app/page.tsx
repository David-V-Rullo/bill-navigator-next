import React from "react";
import BillCard from "@/components/BillCard";
import { Bill } from "@/types/index";
import SearchBar from "@/components/SearchBar";
import NewsCard from "@/components/NewsCard";

interface ApiResponse {
  status: string;
  results: {
    num_results: number;
    offset: number;
    bills: Bill[];
  }[];
}

const API_ENDPOINT =
  "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc";

const fetchBills = async (): Promise<Bill[]> => {
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

  const data: ApiResponse = await response.json();
  return data.results[0]?.bills || []; // Return an empty array if 'bills' is not available
};

const Home = async () => {
  const bills = await fetchBills();

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-between p-4 md:p-14">
      <div className="flex bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 w-full mt-3 p-2 drop-shadow-xl border-b-red-800 border-b-4">
        <SearchBar />
      </div>
      <div className="py-4 md:py-8"></div>
      <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-5">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <NewsCard />
        </div>
        <div className="md:px-5"></div>
        <div className="flex flex-col justify-start gap-4 md:gap-5 items-center w-full md:w-3/4">
          {bills.map((bill) => (
            <BillCard key={bill.bill_id} bill={bill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
