
// ---------- EVENT TYPE ----------
export type EventItem = {
  time: string;
  country: string;
  flag?: string;
  impact: number;
  event: string;
  actual?: string;
  consensus?: string;
  previous?: string;
};

// ---------- COUNTRY MAP ----------
export const COUNTRY_MAP: Record<string, string> = {
  USA: "US",
  IND: "IN",
  JPN: "JP",
  CHN: "CN",
  AUS: "AU",
  EUR: "EU",
  UK: "GB",
  CAN: "CA",
};

