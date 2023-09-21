import type { StateAbbreviation } from "../types";
import type { Bill } from "../types";
export function stateAbbreviationToFullName(
  abbreviation: StateAbbreviation
): string {
  const stateMapping: Record<StateAbbreviation, string> = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };

  return stateMapping[abbreviation];
}
interface ApiResponse {
  status: string;
  results: {
    num_results: number;
    offset: number;
    bills: Bill[];
  }[];
}

export async function fetchBills(): Promise<Bill[]> {
  const API_ENDPOINT =
    "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc";

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
}
