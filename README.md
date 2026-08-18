# Live Payout

SEO-first Astro site for a US Whatnot seller payout and profit calculator.

## Included

- Product-specific visual system inspired by live-selling interfaces, without copying Whatnot assets or UI.
- Live payout calculation with integer-cent fee rounding.
- Reverse price-to-list calculation for a target profit.
- Standard, coins, and custom commission-rate options.
- Buyer shipping, item cost, high-value-order warning, and full fee breakdown.
- Shareable calculation URLs and a print-ready result sheet.
- A device-local live-show planner with per-item estimates, show totals, CSV export, and print/PDF output.
- Search-ready guide pages for seller fees, high-value orders, and methodology.
- Canonicals, Open Graph tags, WebApplication schema, robots directive, sitemap configuration, and a social image.
- Centralised US fee schedule data with its published-policy source and verification date.

## Run locally

```bash
npm install
npm run dev
```

Then validate production output with:

```bash
npm run check
npm run build
npm run test:math
```

## Next product phase

1. Add focused analytics and Search Console after a production domain is connected.
2. Add a changelog when fee policies are updated.
3. Consider paid batch imports or recurring show templates only after sellers use the free planner repeatedly.

The canonical domain is a placeholder. Update `astro.config.mjs` and `public/robots.txt` once the final domain is purchased.
