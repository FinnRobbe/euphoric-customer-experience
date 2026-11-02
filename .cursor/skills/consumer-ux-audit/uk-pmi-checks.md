# UK PMI domain checks

Apply these on PMI surfaces (Detail, Features, Personalise, Compare, Billing) and any copy that talks about cover, cost, or tax. Findings are usually **Major** / **Blocker** when employee-facing and misleading; market nuance without a clear UX bug → **Info**.

## Naming and product shape

- [ ] Human-facing tiers are **Core / Comprehensive / Premier** — do not leak internal ids (`essential`, `plus`, etc.) in UI copy.
- [ ] Distinguish **employer flex scheme** language from **insurer product** rules when both appear.
- [ ] Do not invent a single “UK PMI rule” for outpatient limits or hospital lists — they vary by insurer/scheme; prefer scheme/product-specific wording or soft “typically”.
- [ ] Avoid US health-plan terms: deductible, copay, coinsurance, network HMO/PPO, “premium” as the only word for monthly cost when “you pay” is the dictionary term.

## Excess, outpatient, hospital list

- [ ] **Excess** is usually paid at claim time, not as a monthly fee — UI must not imply excess is part of the monthly you-pay.
- [ ] Outpatient limits: don’t state universal caps; align with plan data / feature copy for that insurer.
- [ ] Hospital list: don’t claim “any hospital” unless the product truly says so; recognised vs non-recognised consequences should match feature detail honesty.
- [ ] Cover-field review tables show **Current | After** for changed rows only (excess / outpatient / hospital list).

## Employer funding and cash

- [ ] Employer contribution is toward **core** cover — not “free PMI” for upgrades, dependants, or add-ons.
- [ ] Dependants and add-ons are employee-paid; say so near those controls / cost tables.
- [ ] Never claim the scheme is **tax-free** or that PMI is income-tax-free / salary-sacrifice tax-free unless the product truly is — and even then don’t overclaim.
- [ ] Payable totals = cash **You pay** only; BIK never folded into Apply / sticky / confirm totals.

## BIK (benefit in kind)

- [ ] Employer-funded PMI attracting BIK tax is normal in UK flex — frame tax as educational, not a mysterious “fee”.
- [ ] Inline pattern: `+ ~£X tax` + (i); rate labelled **illustrative / exemplary** (prototype uses 30%).
- [ ] Popover answers *why* tax exists briefly; does not sell tax planning advice.

## Dependants and eligibility

- [ ] Age / partner / child eligibility presented as **scheme rules**, not universal law.
- [ ] Capacity overflow handled with clear Remove / Undo — no Cancel that leaves an invalid draft when the switch forced overflow.
- [ ] New dependant NI / DOB / names required before payment; removal reasons required (Other needs text).

## Underwriting and advice posture

- [ ] Do not casually invent underwriting choices (moratorium vs full medical) in flex UI copy unless the product actually collects them.
- [ ] Do not present the tool as regulated financial or insurance advice; no fake “quotes” from insurers.
- [ ] No fake “Go to provider” links that 404 — disable or label as demo.

## Compare and personalise honesty

- [ ] Compare “select” has a clear next step (e.g. open Personalise for that provider/tier) — no dead “Selected for compare”.
- [ ] Upgrade hints only when a higher tier’s projected **you pay** is **strictly lower** after included extras drop off the paid list.
- [ ] Lost-access compares real **access**, not selectedExtra IDs alone; included-on-higher-tier ≠ “removed”.
- [ ] Non-PMI Personalise/Compare stubs labelled limited / Coming soon — must not look like full PMI depth.

## Quick fail signals (likely Blocker / Major)

| Signal | Likely severity |
|---|---|
| BIK in you-pay / Apply total | Blocker |
| “Free PMI” / “tax-free PMI” without qualification | Major / Blocker |
| Excess shown as monthly charge | Major |
| US plan jargon in employee UI | Major |
| Fake advice / live insurer quote implication | Blocker |
| Internal tier id shown as marketing name | Major |
| Dead compare select | Major |
| Stub Personalise that looks complete | Major |
