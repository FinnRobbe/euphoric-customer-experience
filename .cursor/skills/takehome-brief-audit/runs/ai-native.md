### AI-native product — `ai-native`

- **Verdict:** mixed for this lens
- **Confidence:** high
- **Live pass:** done (Personalise and Compare on localhost:5173)

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| Guidance surface | pass | Search or ask is on the collapsed Personalise rail and answers from the draft plan. |
| Personalisation intelligence | partial | Fit, suggestions, and Compare order change the journey, but headline recommendations are easy to attack. |
| Flex co-pilot | partial | Cover and switch tradeoffs are explained in panels. Ask cannot help with those decisions. |
| Honesty about AI | pass | Copy says prototype / quick answers. Unknown questions list the three topics. |
| Interview story | partial | Fit-on-Core and Keep/Lose are safe. Default suggestion and Best match badge are not. |

## Findings

| Severity | Issue | Evidence (route / file) | Why it matters for the brief / interview |
|---|---|---|---|
| major | Default priorities suggestion is Assisted Fertility for a household that already has family cover | `priorityRecommendation` in `PmiPersonalise.tsx`; CSV tags | First AI card on the walk; tag-order explanation is bad. |
| major | Compare badges Vitality Comprehensive Best match while Fair fit, +£7/mo, lose 4 benefits | `rankAlternativePlans` / `BenefitCompare.tsx` | Badge and fit panel disagree. |
| major | Ask cannot help with the flex decision | Topics: excess, dependants, Virtual GP only | Obvious AI control misses cover/extras/switch. |
| major | Dental Keep pairs with destination dental extra even when not selected | `featureMatch.ts` | Keep/Lose invents a kept add-on. |
| minor | Worth comparing is plain text, not a control | `fitRating` in `PmiPersonalise.tsx` | Recommendation does not move the journey. |
| leave | Higher-cover-cheaper hint cannot fire on enrolled AXA household | `suggestCheaperHigherTier` | Do not demo. |

## Fix recommendations (3–5)

1. **Fix the default suggestion** — Only suggest unpaid gap when priority not already covered. Effort S.
2. **Make Best match survive the fit panel** — Factor price and lose-count into ranking. Effort M.
3. **Give Ask one flex answer** — Draft fit / Keep-Lose topic. Effort M.
4. **Keep Dental only when selected** — `featureMatch.ts`. Effort S.
5. **Turn Worth comparing into a link** — Open Compare on that plan. Effort S.
