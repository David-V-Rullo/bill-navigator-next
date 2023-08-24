export interface CongressData {
  member: {
    bioguideId: string;
    birthYear: string;
    cosponsoredLegislation: LegislationInfo;
    depiction: Depiction;
    directOrderName: string;
    firstName: string;
    honorificName: string;
    invertedOrderName: string;
    lastName: string;
    leadership: Leadership[];
    partyHistory: PartyHistory[];
    sponsoredLegislation: LegislationInfo;
    state: string;
    terms: Term[];
    updateDate: string;
  };
  request: {
    bioguideId: string;
    contentType: string;
    format: string;
  };
}

export interface LegislationInfo {
  count: number;
  url: string;
}

export interface Depiction {
  attribution: string;
  imageUrl: string;
}

export interface Leadership {
  congress: number;
  type: string;
}

export interface PartyHistory {
  partyAbbreviation: string;
  partyName: string;
  startYear: number;
}

export interface Term {
  chamber: string;
  congress: number;
  endYear: number;
  memberType: string;
  startYear: number;
  stateCode: string;
  stateName: string;
}
