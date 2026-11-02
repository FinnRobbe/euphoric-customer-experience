### Interview walk — `walkability`

- **Verdict:** mixed for this lens
- **Confidence:** high
- **Live pass:** done

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| Happy path | pass | Dental → Apply → £37/mo. |
| Hard path | pass | Core overflow blocks; Bupa Select blocks household; price “—”. |
| Compare path | partial | Review & switch works; feature name leaves Compare. |
| Feature depth | pass | Personalise feature overlay keeps draft. |
| Recovery | pass | Stay/Discard/Undo; Reset demo restores AXA £30. |
| Scriptability | partial | Same tier has two names mid-sentence. |

## Findings

| Severity | Issue | Evidence (route / file) | Why it matters for the brief / interview |
|---|---|---|---|
| major | One tier, two names (Complete vs Comprehensive / Select vs Core) | `tierLabels.ts`, Personalise, Compare | Presenter stumbles translating mid-walk. |
| major | Compare feature link abandons Compare for Model a switch | `BenefitCompare.tsx` → `FeatureDetail.tsx` closeTo | Curious click starts second switch draft. |
| minor | Model a switch hides who is covered until refuse | switch Personalise | £30→£52 has no subject. |
| minor | Matrix cells named only as cell value | mis-click Core opens remove modal | Recoverable but looks buggy. |
| leave | Chat/Saved limited; Reset in shell; pick one switch ceremony | | Script discipline. |

## Fix recommendations (3–5)

1. **One name per tier on every surface** — Effort M.
2. **Compare feature details stay on Compare** — Effort M.
3. **Show locked household on Model a switch** — Effort S.
4. **Name matrix buttons with the tier** — Effort S.
5. **Script one switch only** — Effort S.
