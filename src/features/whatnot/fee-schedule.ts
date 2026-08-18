import type { FeeSchedule } from "./types";

/**
 * Source of truth for the calculator implementation in Phase 2.
 * Values are deliberately centralised so a policy update changes one file.
 */
export const usWhatnotFeeSchedule: FeeSchedule = {
  region: "US",
  standardCommissionRate: 0.08,
  coinsCommissionRate: 0.04,
  wholesalePalletsCommissionRate: 0.04,
  processingRate: 0.029,
  processingFixedCents: 30,
  highValueCommissionThresholdCents: 150000,
  verifiedAt: "2026-08-18",
  sourceUrl: "https://help.whatnot.com/hc/en-us/articles/4847069165965-Whatnot-seller-fees",
};
