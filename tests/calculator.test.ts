import assert from "node:assert/strict";
import test from "node:test";
import { calculatePayout, salePriceForTargetProfit } from "../src/features/whatnot/calculate.ts";

const base = {
  buyerShippingCents: 500,
  itemCostCents: 2000,
  commissionRate: 0.08,
  processingRate: 0.029,
  processingFixedCents: 30,
};

test("calculates a standard US sale in integer cents", () => {
  assert.deepEqual(calculatePayout({ ...base, salePriceCents: 5000 }), {
    buyerTotalCents: 5500,
    commissionCents: 400,
    processingCents: 190,
    payoutCents: 4410,
    profitCents: 2410,
  });
});

test("uses the lower coins commission without changing processing", () => {
  const result = calculatePayout({ ...base, salePriceCents: 5000, commissionRate: 0.04 });
  assert.equal(result.commissionCents, 200);
  assert.equal(result.processingCents, 190);
  assert.equal(result.profitCents, 2610);
});

test("includes buyer-paid tax in the processing base", () => {
  const result = calculatePayout({ ...base, salePriceCents: 5000, buyerTaxCents: 400 });
  assert.equal(result.buyerTotalCents, 5900);
  assert.equal(result.processingCents, 201);
  assert.equal(result.payoutCents, 4399);
});

test("caps the commission base for eligible high-value categories", () => {
  const result = calculatePayout({
    ...base,
    salePriceCents: 200000,
    commissionThresholdCents: 150000,
  });
  assert.equal(result.commissionCents, 12000);
});

test("does not charge a fixed processing fee when there is no paid order", () => {
  const result = calculatePayout({ ...base, salePriceCents: 0, buyerShippingCents: 0, itemCostCents: 0 });
  assert.equal(result.processingCents, 0);
  assert.equal(result.payoutCents, 0);
});

test("deducts seller-paid shipping from payout and profit", () => {
  const result = calculatePayout({ ...base, salePriceCents: 5000, sellerShippingCents: 600 });
  assert.equal(result.payoutCents, 3810);
  assert.equal(result.profitCents, 1810);
});

test("finds the minimum sale price that reaches a target profit", () => {
  const result = salePriceForTargetProfit(2000, base);
  const oneCentLower = calculatePayout({ ...base, salePriceCents: result.salePriceCents - 1 });

  assert.equal(result.salePriceCents, 4539);
  assert.equal(result.calculation.profitCents, 2000);
  assert.ok(oneCentLower.profitCents < 2000);
});
