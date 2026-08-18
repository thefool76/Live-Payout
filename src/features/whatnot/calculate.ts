export type CalculatorInput = {
  salePriceCents: number;
  buyerShippingCents: number;
  buyerTaxCents?: number;
  sellerShippingCents?: number;
  itemCostCents: number;
  commissionRate: number;
  commissionThresholdCents?: number | null;
  processingRate: number;
  processingFixedCents: number;
};

export type Calculation = {
  buyerTotalCents: number;
  commissionCents: number;
  processingCents: number;
  payoutCents: number;
  profitCents: number;
};

export function calculatePayout(input: CalculatorInput): Calculation {
  const buyerTotalCents = input.salePriceCents + input.buyerShippingCents + (input.buyerTaxCents ?? 0);
  const commissionBaseCents = input.commissionThresholdCents == null
    ? input.salePriceCents
    : Math.min(input.salePriceCents, input.commissionThresholdCents);
  const commissionCents = Math.round(commissionBaseCents * input.commissionRate);
  const processingCents = buyerTotalCents > 0
    ? Math.round(buyerTotalCents * input.processingRate) + input.processingFixedCents
    : 0;
  const payoutCents = input.salePriceCents - commissionCents - processingCents - (input.sellerShippingCents ?? 0);

  return {
    buyerTotalCents,
    commissionCents,
    processingCents,
    payoutCents,
    profitCents: payoutCents - input.itemCostCents,
  };
}

export function salePriceForTargetProfit(
  targetProfitCents: number,
  input: Omit<CalculatorInput, "salePriceCents">,
): { salePriceCents: number; calculation: Calculation } {
  if (input.commissionRate + input.processingRate >= 1 && input.commissionThresholdCents == null) {
    throw new RangeError("Combined variable fees must be less than 100%.");
  }

  let low = 0;
  let high = Math.max(100, targetProfitCents + input.itemCostCents + input.processingFixedCents);
  const maximumSalePriceCents = 100_000_000;

  while (calculatePayout({ ...input, salePriceCents: high }).profitCents < targetProfitCents) {
    high *= 2;
    if (high > maximumSalePriceCents) {
      throw new RangeError("The requested profit is outside the supported price range.");
    }
  }

  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    const calculation = calculatePayout({ ...input, salePriceCents: middle });
    if (calculation.profitCents >= targetProfitCents) high = middle;
    else low = middle + 1;
  }

  return { salePriceCents: low, calculation: calculatePayout({ ...input, salePriceCents: low }) };
}
