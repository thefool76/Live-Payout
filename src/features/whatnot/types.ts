export type FeeSchedule = {
  region: "US";
  standardCommissionRate: number;
  coinsCommissionRate: number;
  wholesalePalletsCommissionRate: number;
  processingRate: number;
  processingFixedCents: number;
  highValueCommissionThresholdCents: number;
  verifiedAt: string;
  sourceUrl: string;
};
