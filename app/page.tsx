import React from "react";
import BillCard from "@/components/BillCard";
import NewsCard from "@/components/NewsCard";
import { prisma } from "../db";
import { fetchBills } from "@/utils/index";
const createUser = async () => {
  "use server";

  const users = await prisma.user.findMany();
  console.log(users);
};

const Home = async () => {
  const bills = await fetchBills();
  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-between ">
      <div className="flex justify-between w-full gap-5">
        <div className="flex flex-col gap-2 w-1/3">
          <NewsCard />
        </div>
        <div className="px-5"></div>
        <div className="flex flex-col justify-start gap-3 items-center w-2/3">
          {bills.map((bill) => (
            <BillCard key={bill.bill_id} bill={bill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
