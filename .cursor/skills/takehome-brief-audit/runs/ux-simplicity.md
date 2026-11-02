### UX simplicity — `ux-simplicity`

- **Verdict:** mixed for this lens
- **Confidence:** high
- **Live pass:** done (detail, Personalise, Compare, Apply wizard, Bupa Model a switch; phone 390×844)

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| Time to first value | partial | Enrolled detail clear (Personalise primary). Personalise and non-enrolled insurer pages are not. |
| Decision load | fail | Enrolled Personalise is one scroll: matrix, dependants, extras, fit, price table. |
| Enrolled vs browse | pass | Your cover / Personalise vs Not your current cover / Model a switch. |
| Dead ends | pass | Disabled Apply explains; Core overflow + Undo; non-PMI coming soon. |
| Hierarchy | partial | Options primary + pair is good; Personalise charcoal buttons compete with Apply. |
| Mobile / narrow | partial | Sticky rail ~441px on phone with a draft covers the matrix. |

## Findings

| Severity | Issue | Evidence (route / file) | Why it matters for the brief / interview |
|---|---|---|---|
| major | Personalise forces the whole PMI decision at once | `PmiPersonalise.tsx` | Configurator feel; interviewer asks where to start. |
| major | Two different switch products (Compare vs Model a switch) | `BenefitCompare.tsx`, switch Personalise | Same job twice; easy probe. |
| major | Phone sticky price card covers the editor | sticky asides ~441px of 844px | Narrow window hides the thing you edit. |
| minor | Non-enrolled insurer page lacks from-price | `BenefitDetail.tsx` | Model a switch is a leap. |
| minor | Charcoal used for too many actions | Detail, Personalise extras, wizard upgrades | Options hierarchy undone downstream. |
| leave | Options redesign, Terms in header, disabled Apply, icon nav | | Do not spend interview time here. |

## Fix recommendations (3–5)

1. **Step Personalise** — Cover → people → extras. Effort M.
2. **One switch surface** — Model a switch → Compare filtered, or strip switch Personalise. Effort M.
3. **Shrink sticky rail on narrow** — Pin You pay + delta + Apply only. Effort S.
4. **One charcoal control on Personalise** — Apply only. Effort S.
5. **Say locked household on a switch** — Plus Bupa from-price on detail. Effort S.
