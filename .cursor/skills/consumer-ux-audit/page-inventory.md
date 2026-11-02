# Page inventory — consumer UX audit targets

Source of routes: [`src/App.tsx`](../../../src/App.tsx). Re-check App.tsx each audit in case routes changed.

Risk key: **H** high · **M** medium · **L** low · **Smoke** redirect only

## Parallel agent slots (full audit)

One Task agent per row. Launch all in a single parallel wave.

| Agent id | Title | Route / surface | Primary component(s) | Risk | Focus |
|---|---|---|---|---|---|
| `audit-grid` | Benefits grid | `/` | `BenefitsGrid` | M | Entry / catalogue. Prototype honesty once. Money/teaser labels match dictionary. |
| `audit-pmi-detail` | PMI benefit detail | `/benefits/axa-pmi` | `BenefitDetail` | M | CTAs to Features / Personalise / Compare. Cost + BIK notes. |
| `audit-features` | Product features + overlay | `/benefits/axa-pmi/features` (+ one `:featureId`) | `BenefitFeatures`, `FeatureDetail` | M | Feature list + overlay copy; jargon; no fake advice; provider CTA honesty. |
| `audit-personalise` | Personalise (PMI) | `/benefits/axa-pmi/personalise` | `BenefitPersonalise` → `PmiPersonalise` | **H** | Draft, money ledger, BIK, Apply wizard, leave-guard, sticky rail, post-apply success, labels. |
| `audit-billing` | Billing | `/benefits/axa-pmi/billing` | `PmiBilling` | **H** | Payment prototype; back link casing; terms; no fake charges. |
| `audit-compare` | Compare (PMI) | `/benefits/axa-pmi/compare` | `BenefitCompare` | **H** | Provider + tier tabs; “Selected for compare” next step; Core/Comprehensive/Premier. |
| `audit-saved` | Saved | `/saved` | `Saved` | M | Empty state next step; honest cover context. |
| `audit-chat` | Chat stub | `/chat` | `PlaceholderPage` | L | Must read as placeholder, not a real chat product. |
| `audit-non-pmi-stubs` | Non-PMI personalise + compare | `/benefits/lg-pension/personalise`, `/benefits/lg-pension/compare` | `BenefitPersonalise`, `BenefitCompare` stubs | **H** | Limited / Coming soon labelling; must not look like full enrolment. |
| `audit-redirects` | PMI path redirects | `/benefits/pmi`, `/benefits/pmi/features`, `/benefits/pmi/personalise`, `/benefits/pmi/compare` | `App.tsx` redirects | Smoke | Redirect fires; no broken intermediate UI. |

## Employee-facing routes (detail)

| Route | Primary component(s) | Risk | Notes |
|---|---|---|---|
| `/` | `BenefitsGrid` | M | Entry / catalogue. |
| `/benefits/:benefitId` | `BenefitDetail` | M | PMI + non-PMI. |
| `/benefits/:benefitId/features` | `BenefitFeatures` | M | Feature list; deep-links into overlay. |
| `/benefits/:benefitId/features/:featureId` | `FeatureDetail` (child) | M | Overlay copy. |
| `/benefits/:benefitId/personalise` | `BenefitPersonalise` → `PmiPersonalise` | **H** | Highest risk. |
| `/benefits/:benefitId/personalise/feature/:featureId` | `FeatureDetail` (child of Personalise) | M | Close returns to personalise. |
| `/benefits/:benefitId/personalise/add-ons` | `PmiAddOns` | Smoke | Redirects to Personalise. |
| `/benefits/:benefitId/billing` | `PmiBilling` | **H** | Payment / legal prototype. |
| `/benefits/:benefitId/compare` | `BenefitCompare` | **H** | Provider + tier tabs. |
| `/saved` | `Saved` | M | |
| `/chat` | `PlaceholderPage` | L | Stub honesty. |

## Non-PMI on shared routes

Same path patterns with non-PMI `benefitId`s (from catalogue, not `*-pmi`). Full-audit exemplar: `lg-pension`.

| Surface | Component behaviour | Risk | Audit focus |
|---|---|---|---|
| Personalise | `BenefitPersonalise` stub (not `PmiPersonalise`) | **H** | Limited / Coming soon — must not look complete. |
| Compare | `BenefitCompare` non-PMI stub | **H** | Same. |
| Detail / Features | Shared components | M | Don’t imply PMI parity without delivery. |

## Redirects (smoke only)

| Route | Behaviour |
|---|---|
| `/benefits/pmi` | → `/benefits/axa-pmi` |
| `/benefits/pmi/features` | → `/benefits/axa-pmi/features` |
| `/benefits/pmi/personalise` | → `/benefits/axa-pmi/personalise` |
| `/benefits/pmi/compare` | → `/benefits/axa-pmi/compare` |
| `*` | → `/` |

## PMI benefit ids (typical live walk)

`axa-pmi`, `bupa-pmi`, `vitality-pmi` (confirm against plan data / `isPmiBenefitId`). Prefer Personalise depth on `axa-pmi`; spot-check other providers only if the page agent has spare time.
