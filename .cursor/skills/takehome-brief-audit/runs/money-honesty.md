### Cash & standards — `money-honesty`

- **Verdict:** mixed for this lens
- **Confidence:** high
- **Live pass:** done

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| You pay label | partial | Detail You pay; Personalise Current/New; Compare sticky unlabeled. |
| Employer funding | partial | Detail dictionary sentence OK; Personalise/Compare missing; strike misnamed. |
| Est. tax / BIK | pass | ~£18 on £60; illustrative; not in You pay. |
| Draft vs applied | partial | Personalise Current vs New clear; refused plans “—”; Compare sticky unlabeled. |
| Prototype honesty | partial | Detail/confirm say illustrative; Personalise/Compare rails do not. |
| No invented cover | partial | Household totals match; Base £0 still reads as the price; travel copy hedge. |

## Findings

| Severity | Issue | Evidence (route / file) | Why it matters for the brief / interview |
|---|---|---|---|
| major | Cover matrix Base is employee core cash, not You pay | Base £0 beside rail £30 | “Why £0 if I pay £30?” |
| major | Struck figure labeled “Full price without benefit” | aria on Personalise rail | Looks like discount; is employer core. |
| major | Compare sticky cash has no Current/New/You pay label | `BenefitCompare.tsx` | Table defendable; rail is not. |
| minor | Two strikethrough meanings | Personalise list vs wizard prior You pay | Easy to narrate badly. |
| minor | AXA travel copy invents employer funding | `axa-pmi.ts` travel-extra | Contradicts +£4/mo button. |

## Fix recommendations (3–5)

1. **Rename Base → Your core cash** — Effort S.
2. **Name the employer gap** — Employer contributes £X toward core. Effort S.
3. **Label Compare sticky cash** — Current / New. Effort S.
4. **Prototype line on rails** — Effort S.
5. **Travel cost copy matches +£4** — Effort S.
