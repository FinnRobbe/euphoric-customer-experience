### UK PMI / flex industry — `uk-pmi-flex`

- **Verdict:** mixed for this lens
- **Confidence:** high
- **Live pass:** done (`localhost:5173` — AXA Personalise Core overflow, Compare switch to Vitality Comprehensive)

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| Cover levels | pass | AXA live matrix: excess £500 / £250 / £100, outpatient 3 visits / £1,000 / unlimited, hospital Standard then Extended, cancer steps Core → Premier. |
| Dependants | partial | Core correctly blocks a partner + child (price “—”, Apply off). Feature blurbs still say partner and up to 3 or 5 children. |
| Optional extras | pass | Paid add-ons are a separate list with `+£/mo`. Cancer drugs are not sold as an extra. |
| Contribution tradeoffs | partial | You-pay delta shows before Apply. Employer £ does not on Personalise. |
| UK realism | partial | Excess, pre-authorisation, day-case, and BIK are British. Excess basis contradicts itself; Bupa/Vitality Core have no cancer. |
| Multi-provider | partial | Compare shows different excess/lists/prices. Switch Keep flattens cancer lines and can hide the drug gap. |

## Findings

| Severity | Issue | Evidence (route / file) | Why it matters for the brief / interview |
|---|---|---|---|
| major | Cancer off Bupa/Vitality Core; switch still calls cancer “kept” | `featureMatch.ts` `coveredByKeep`; CSV essential cancer “not on Core” | UK PMI is bought for cancer. Keep list can contradict the matrix. |
| major | Employer funding not on the decision surface | Personalise Base is employee core only; BIK chip is tax not employer £ | Contribution tradeoffs are incomplete until detail. |
| major | Two family rules | Personalise combined cap vs CSV “partner and up to 3 children” | Interviewer will ask which is true. |
| major | Excess basis three ways | Matrix bare £250; ask “towards a claim”; feature packs hedge | First PMI interview question. |
| minor | Classic flex dials absent | No six-week NHS / guided referral / MHD | Have one sentence ready. |
| minor | Child NI required | `ApplyConfirmWizard.tsx` | Children often lack NI. |
| leave | BIK treatment | Illustrative 30%, not in You pay | Lands well. |

## Fix recommendations (3–5)

1. **Put cancer on every tier** — Core keeps limited cancer; stop false keeps on drug formulary drops. CSV + `featureMatch.ts`. Effort M.
2. **Name the excess once** — “£X per person per policy year” everywhere. Effort S.
3. **Label employer £ beside You pay** — Personalise rail and Apply review. Effort S.
4. **One family cap** — Align blurbs; make NI optional for children. Effort S.
5. **Vitality visible difference in matrix** — Rewards row or real product delta. Effort M.
