export interface MLSListing {
  mlsId: string;
  listPrice: number;
  property: {
    bedrooms: number;
    bathsFull: number;
    bathsHalf: number;
    area: number;
    type: string;
    subType: string | null;
    stories: number;
    style: string;
    yearBuilt: number;
  };
  address: {
    full: string;
    city: string;
    state: string;
    postalCode: string;
    streetNumber: string;
    streetName: string;
    unit: string | null;
  };
  agent: {
    firstName: string;
    lastName: string;
    contact: {
      email: string | null;
      office: string | null;
      cell: string | null;
    };
  };
  office: {
    name: string;
    contact: {
      email: string | null;
      office: string | null;
    };
  };
  photos: string[];
  listDate: string;
  modificationTimestamp: string;
  internetAddressDisplay: boolean;
  internetEntireListingDisplay: boolean;
  remarks: string;
  geo: {
    lat: number;
    lng: number;
    county: string;
  };
  association: {
    fee: number | null;
    name: string | null;
    amenities: string | null;
  };
  mls: {
    status: string;
    area: string;
    daysOnMarket: number;
    originalEntryTimestamp: string;
    originatingSystemName: string;
  };
}

export type ListingCategory =
  | "residential"
  | "rental"
  | "commercial"
  | "land"
  | "luxury";
