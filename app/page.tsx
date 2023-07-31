import BillCard from "@/components/BillCard";
import { Bill } from "@/index";

interface ApiResponse {
  results: Array<{ bills: Bill[] }>;
}
const fetchBills = async (): Promise<ApiResponse> => {
  const response = await fetch(
    "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc",
    {
      headers: { "X-API-Key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH" },
    }
  );
  const bills = await response.json();
  return bills;
};
export default async function Home() {
  const { results } = await fetchBills();
  console.log(results);
  return (
    <div className="flex min-h-screen  min-w-screen flex-col items-center justify-between p-24 ">
      <div className="flex flex-col justify-start w-1/2 items-center">
        <h1>{results}</h1>
        <BillCard />
      </div>
    </div>
  );
}
