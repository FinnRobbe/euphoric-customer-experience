# Lens inventory — take-home brief audit

Workspace root: `C:\Users\firo\euphoric-customer-experience`

Full run = **one Task agent per row**, all launched in one parallel wave.

| Agent id | Lens | Rubric | Must open (minimum) |
|---|---|---|---|
| `brief-deliverables` | Brief fidelity | [rubrics/brief.md](rubrics/brief.md) | `brief-excerpt.md`, `README.md`, `src/App.tsx`, `src/pages/BenefitDetail.tsx`, `src/pages/PmiPersonalise.tsx`, `src/pages/BenefitCompare.tsx` |
| `uk-pmi-flex` | UK PMI / flex industry | [rubrics/uk-pmi.md](rubrics/uk-pmi.md) | `PmiPersonalise.tsx`, `public/data/pmi-plans.csv` (sample), `src/lib/parsePlans.ts`, `src/components/benefits/BikInfoPopover.tsx`, feature detail packs as needed |
| `ai-native` | AI-native product | [rubrics/ai-native.md](rubrics/ai-native.md) | `AppShell.tsx` guidance, `src/lib/fitChecker.ts`, `featureMatch.ts`, Personalise upgrade hints / switch modelling, README “Fit checker” notes |
| `ux-simplicity` | UX simplicity | [rubrics/ux.md](rubrics/ux.md) | `PmiPersonalise.tsx`, `BenefitDetail.tsx`, `BenefitCompare.tsx`, sticky rail / matrix / wizards |
| `walkability` | Interview walk | [rubrics/walk.md](rubrics/walk.md) | Routes in README; live walk if Vite up: grid → enrolled detail → Personalise → apply path; browse other insurer → Model a switch |
| `navigator-fit` | Navigator / consumer | [rubrics/navigator.md](rubrics/navigator.md) | `visual-guidance/`, `AppShell.tsx`, `BenefitsGrid.tsx`, BenefitDetail, wash colours / logos |
| `money-honesty` | Cash & standards | [rubrics/money.md](rubrics/money.md) | `CONSUMER_STANDARDS.md` §2.2–2.3, Personalise rail, `BikTaxNote`, `getCostBreakdown` / employer funding |

**Expected agents per wave:** 7

Shared routes (for citation):

| Route | Page |
|---|---|
| `/` | Benefits grid |
| `/benefits/{id}` | Benefit detail |
| `/benefits/{id}/features` | Product features |
| `/benefits/{id}/personalise` | Flex Personalise |
| `/benefits/{id}/compare` | Compare |
| `/benefits/{id}/billing` | Billing (PMI) |
