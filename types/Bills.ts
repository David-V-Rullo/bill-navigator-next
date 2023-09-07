export interface Bill {
  bill_id: string;
  bill_slug: string;
  bill_type: string;
  number: string;
  bill_uri: string;
  title: string;
  short_title: string;
  sponsor_title: string;
  sponsor_id: string;
  sponsor_name: string;
  sponsor_state: string;
  sponsor_party: string;
  sponsor_uri: string;
  gpo_pdf_uri: string | null;
  congressdotgov_url: string;
  govtrack_url: string;
  introduced_date: string | null;
  active: boolean;
  last_vote: string | null;
  house_passage: string | null;
  senate_passage: string | null;
  enacted: string | null;
  vetoed: string | null;
  cosponsors: number;
  cosponsors_by_party: Record<string, number>;
  committees: string;
  committee_codes: string[];
  subcommittee_codes: string[];
  primary_subject: string;
  summary: string;
  summary_short: string;
  latest_major_action_date: string;
  latest_major_action: string;
}

export interface SingleBill {
  bill_id: string;
  bill_slug: string;
  congress: string;
  bill: string;
  bill_type: string;
  number: string;
  bill_uri: string;
  title: string;
  short_title: string;
  sponsor_title: string;
  sponsor: string;
  sponsor_id: string;
  sponsor_uri: string;
  sponsor_party: string;
  sponsor_state: string;
  gpo_pdf_uri: string | null;
  congressdotgov_url: string;
  govtrack_url: string;
  introduced_date: string;
  active: boolean;
  last_vote: string | null;
  house_passage: string | null;
  senate_passage: string | null;
  enacted: string | null;
  vetoed: string | null;
  cosponsors: number;
  cosponsors_by_party: { [key: string]: number };
  withdrawn_cosponsors: number;
  primary_subject: string;
  committees: string;
  committee_codes: string[];
  subcommittee_codes: string[];
  latest_major_action_date: string;
  latest_major_action: string;
  house_passage_vote: string | null;
  senate_passage_vote: string | null;
  summary: string;
  summary_short: string;
  cbo_estimate_url: string | null;
  versions: { [key: string]: any }[]; // You can define a more specific type for versions if needed
  actions: { [key: string]: any }[]; // You can define a more specific type for actions if needed
  presidential_statements: any[]; // You can define a more specific type for presidential_statements if needed
  votes: any[]; // You can define a more specific type for votes if needed
}

// Below is the types for the Congress.gov API

export interface CongressBill {
  actions: Action;
  amendments: Amendment;
  cboCostEstimates: CboCostEstimate[];
  committeeReports: CommitteeReport[];
  committees: Committee;
  congress: number;
  constitutionalAuthorityStatementText: string;
  cosponsors: Cosponsor;
  introducedDate: string;
  latestAction: LatestAction;
  laws: Law[];
  number: string;
  originChamber: string;
  policyArea: PolicyArea;
  relatedBills: RelatedBill;
  sponsors: Sponsor[];
  subjects: Subject;
  summaries: Summary;
  textVersions: TextVersion;
  title: string;
  titles: Title;
  type: string;
  updateDate: string;
  updateDateIncludingText: string;
}

interface Action {
  count: number;
  url: string;
}

interface Amendment {
  count: number;
  url: string;
}

interface CboCostEstimate {
  description: string;
  pubDate: string;
  title: string;
  url: string;
}

interface CommitteeReport {
  citation: string;
  url: string;
}

interface Committee {
  count: number;
  url: string;
}

interface Cosponsor {
  count: number;
  countIncludingWithdrawnCosponsors: number;
  url: string;
}

interface LatestAction {
  actionDate: string;
  text: string;
}

interface Law {
  number: string;
  type: string;
}

interface PolicyArea {
  name: string;
}

interface RelatedBill {
  count: number;
  url: string;
}

interface Sponsor {
  bioguideId: string;
  district?: number; // Optional as not all sponsors might have a district
  firstName: string;
  fullName: string;
  isByRequest: string;
  lastName: string;
  middleName?: string; // Optional as not all sponsors might have a middle name
  party: string;
  state: string;
  url: string;
}

interface Subject {
  count: number;
  url: string;
}

interface Summary {
  count: number;
  url: string;
}

interface TextVersion {
  count: number;
  url: string;
}

interface Title {
  count: number;
  url: string;
}
