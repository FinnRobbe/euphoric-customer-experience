### Brief fidelity — `brief-deliverables`

- **Verdict:** mixed for this lens
- **Confidence:** medium
- **Live pass:** done

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| D1 Flex understanding | pass | Enrolled Personalise changes cover, partner/children, and extras, and shows a household You pay delta. Apply stays blocked when the family does not fit. |
| D2 Navigator belonging | pass | Disney Benefits+ employee shell. PMI pages are “your cover / you pay,” not GAP or admin configuration. |
| D3 Benefit-page start + craft | pass | AXA detail is a real start: overview, £30 household split, Personalise primary, Features/Compare pair, Terms in the header. Personalise and Compare extend that page. |
| D4 Walkable demo | partial | The 8-minute path exists, but a Bupa switch shows two different cash numbers, and a leftover draft changes the story until Reset. |
| Scope discipline | pass | Non-PMI Personalise/Compare say they are limited. No administrator workflow is pretended. |

## Findings

| Severity | Issue | Evidence (route / file) | Why it matters for the brief / interview |
|---|---|---|---|
| major | On Model a switch, the cover table’s first money row is core-only Base, while the rail is household You pay. The category breakdown is hidden on a switch. Live Bupa Complete showed Base £12/mo and the rail said +£22/mo versus AXA at £30. | `/benefits/bupa-pmi/personalise`; `PmiPersonalise.tsx` (`matrixCellBase`, breakdown gated by `!personalisingOtherProvider`) | The scripted insurer-switch moment is where contribution tradeoffs have to be obvious. Two cash figures force an on-the-spot explanation. |
| major | A previous draft or Apply overrides the CSV enrolled plan. Reset exists, but on every `/benefits/:id` route the nav is collapsed and Reset is a 10px control. Live AXA Personalise was already one extra child and +£12, with the leave guard up. | README demo path; `AppShell.tsx` `shouldCollapseNav`; live `/benefits/axa-pmi/personalise` | Part 1 is reviewed live. Opening the prototype after a rehearsal does not start on Comprehensive, partner + one child, £30. |
| minor | Compare is only in Options on the enrolled benefit. Bupa Options are Model a switch and Product features. The full insurer matrix is a separate page. | `BenefitDetail.tsx` `modelingSwitch`; live `/benefits/bupa-pmi` vs `/benefits/axa-pmi/compare` | Easy to miss the strongest compare story if the walk starts on Bupa. The enrolled page and the switch page still cover the brief. |
| minor | Dependants cannot be edited while switching insurer. A household that does not fit can only be fixed by picking a higher tier on that page. | `PmiPersonalise.tsx` dependants block under `!personalisingOtherProvider` | Family changes are demonstrable on current cover only. A switch cannot show “drop a child to make this insurer affordable.” |

## Fix recommendations (3–5)

1. **One household price on a switch** — Put household You pay in the switch matrix and show the same core/family/extras split as enrolled Personalise, matching the rail. Primary file: `src/pages/PmiPersonalise.tsx`. Effort: M.
2. **Safe cold open** — Make Reset demo obvious on benefit routes, or restore the CSV enrolled plan at the start of a demo session. Primary file: `src/components/shell/AppShell.tsx`. Effort: S.
3. **Compare from a non-enrolled insurer** — Add Compare next to Model a switch on Bupa/Vitality detail so the cross-insurer matrix is one click from that page. Primary file: `src/pages/BenefitDetail.tsx`. Effort: S.
4. **Family edits on a switch draft** — Let dependants change in the switch draft, with the same cap block as enrolled cover. Primary file: `src/pages/PmiPersonalise.tsx`. Effort: M.
