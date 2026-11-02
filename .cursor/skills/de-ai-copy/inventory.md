# Copy pack inventory — de-AI agents

Workspace root: `C:\Users\firo\euphoric-customer-experience`

Full run = **one Task agent per row**, all launched in one parallel wave (per wave). Do not merge AXA into another pack.

## Feature detail packs

| Agent id | Title | Files |
|---|---|---|
| `copy-feat-axa` | AXA PMI feature details | `src/data/featureDetails/axa-pmi.ts` |
| `copy-feat-bupa` | Bupa PMI feature details | `src/data/featureDetails/bupa-pmi.ts` |
| `copy-feat-vitality` | Vitality PMI feature details | `src/data/featureDetails/vitality-pmi.ts` |
| `copy-feat-lg-pension` | LG pension feature details | `src/data/featureDetails/lg-pension.ts` |
| `copy-feat-lg-life` | LG life feature details | `src/data/featureDetails/lg-life.ts` |
| `copy-feat-aviva` | Aviva retirement feature details | `src/data/featureDetails/aviva-retirement.ts` |
| `copy-feat-bhn` | BHN bikes feature details | `src/data/featureDetails/bhn-bikes.ts` |
| `copy-feat-pen` | Pen travel feature details | `src/data/featureDetails/pen-travel.ts` |
| `copy-feat-chubb` | Chubb accident feature details | `src/data/featureDetails/chubb-accident.ts` |

## Data + pages + chrome

| Agent id | Title | Files |
|---|---|---|
| `copy-catalog` | Non-PMI benefits catalogue | `src/data/benefitsCatalog.ts` |
| `copy-csv-pmi` | PMI CSV narratives | `public/data/pmi-plans.csv` — columns only: `summary`, `overview_1`, `overview_2`, `card_description`, `description`, `access_notes` (dedupe repeated plan-level text) |
| `copy-pages-personalise` | Personalise (PMI) | `src/pages/PmiPersonalise.tsx` |
| `copy-pages-detail-features` | Detail + features overlay | `src/pages/BenefitDetail.tsx`, `src/pages/BenefitFeatures.tsx`, `src/pages/FeatureDetail.tsx` |
| `copy-pages-compare-billing` | Compare + billing + stubs | `src/pages/BenefitCompare.tsx`, `src/pages/PmiBilling.tsx`, `src/pages/BenefitPersonalise.tsx` |
| `copy-pages-grid-saved-orphans` | Grid, Saved, chat stub, orphans | `src/pages/BenefitsGrid.tsx`, `src/pages/Saved.tsx`, `src/pages/PlaceholderPage.tsx`, `src/pages/PmiHub.tsx`, `src/pages/PmiCompare.tsx`, `src/pages/PmiFeatures.tsx` |
| `copy-components-shell` | Benefit components + shell | `src/components/benefits/`, `src/components/shell/AppShell.tsx` |
| `copy-lib-messages` | Lib user-facing messages | `src/lib/fitChecker.ts`, `src/lib/featureMatch.ts` (synthetic family blurb only), `src/lib/parsePlans.ts` (user-facing assembled strings only), `src/state/PlanContext.tsx` (load/error user strings only) |

**Expected agents per wave:** 17
