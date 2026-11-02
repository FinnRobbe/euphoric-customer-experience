# Take-home gap review

- **Date:** 2026-11-02 (re-run)
- **Scope:** Part 1 FD AI PM brief — UK PMI flexible benefits in Navigator
- **Agents:** 7 / 7; model: `grok-4.7-high-fast` (Claude Fable weekly usage unavailable); retries: none
- **Live pass:** all 7 done on `localhost:5173`
- **Executive verdict:** mixed — happy path, Core/Select household blocks (price “—”), Reset demo, Options hierarchy, and Ask honesty are stronger than the prior run; interview risk now concentrates on naming (Complete vs Comprehensive), AI badges/suggestions, Base £0 vs You pay £30, Compare feature exits, and shell collapse on the walk.

### Since last audit (notable deltas)

| Improved | Still / newly hot |
|---|---|
| Refused household shows **—** (not fake £0 saving) | Fertility priority card vs Good fit |
| Reset demo exists | Compare **Best match** vs Fair fit / +£ / losses |
| Options: Personalise primary + Features/Compare pair; Terms in header | Tier product name vs tier label (Complete ≠ Comprehensive) |
| Ask plan-aware for 3 topics; unknown lists topics | Compare feature link → Model a switch |
| Detail employer dictionary sentence + tax off You pay | Base / rail cash mismatch; employer £ missing on Personalise |
| | Auto-collapse nav on all `/benefits/:id` (space vs Navigator frame) |

## Biggest issues

Ranked. Cross-lens where noted.

| # | Severity | Issue | Lenses | Evidence |
|---|---|---|---|---|
| 1 | major | **One tier, two names** — columns say Complete/Select; Keep/Lose and fit say Comprehensive/Core. | walk, ux | `tierLabels.ts`, Personalise, Compare |
| 2 | major | **Base £0 beside You pay £30** — matrix is employee core; rail is household; switch hides the split. | money, brief | `matrixCellBase`, Personalise / switch |
| 3 | major | **Fertility priority card for a household that already has family cover** — first AI beat on the walk. | ai-native | `priorityRecommendation`, CSV tags |
| 4 | major | **Compare Best match ≠ Fair fit** — e.g. Vitality Comprehensive badge vs +£7 / lose 4. | ai-native, ux | `rankAlternativePlans`, Compare badges |
| 5 | major | **Compare feature names leave Compare** — close lands on Model a switch; selection lost. | walk | `BenefitCompare.tsx` → FeatureDetail |
| 6 | major | **Struck “full price without benefit”** — gap is employer core funding, unlabeled on Personalise/Compare. | money, uk-pmi | Personalise rail aria |
| 7 | major | **False Keep on cancer / Dental** — Core cancer ✕ still “kept”; Dental Keep when add-on not selected. | uk-pmi, ai-native | `featureMatch.ts` |
| 8 | major | **Personalise decision load** — matrix + household + extras + fit one scroll; phone sticky rail ~half screen. | ux | `PmiPersonalise.tsx` |
| 9 | major | **Two switch products** — Compare vs Model a switch (same job, different ceremony). | ux, walk, brief | Detail Options / Compare |
| 10 | major | **Labeled shell collapses on every benefit route** — walk loses Disney wordmark / Search or ask. | navigator | `shouldCollapseNav` |
| 11 | major | **Ask cannot coach the flex decision** — only excess / dependants / Virtual GP. | ai-native | `askReplies.ts` |
| 12 | major | **Family cap + excess basis inconsistent** — CSV “partner + 3 children” vs combined max 3; excess basis hedges. | uk-pmi | CSV, Personalise, ask |

## Per-lens scorecards

### brief-deliverables
- **Verdict:** mixed · D1–D3 + scope pass; D4 partial (switch cash mismatch + sticky drafts until Reset).

### uk-pmi-flex
- **Verdict:** mixed · Cover levels + extras pass; cancer/keep, employer label, family rules, excess basis majors.

### ai-native
- **Verdict:** mixed · Guidance + AI honesty pass; fertility card, Best match, Ask scope, Dental Keep majors.

### ux-simplicity
- **Verdict:** mixed · Enrolled vs browse + dead ends pass; decision load fail; Options hierarchy improved.

### walkability
- **Verdict:** mixed · Happy/hard/feature/recovery pass; naming + Compare feature exit majors. Reset works.

### navigator-fit
- **Verdict:** mixed · Cards & wash pass; shell collapse + spreadsheet Personalise/Compare + Reset-in-chrome majors.

### money-honesty
- **Verdict:** mixed · BIK pass; Base/You pay, strike wording, unlabeled Compare sticky majors. Refused plans “—” leave.

## Implementation plan

### Phase 1 — Interview-critical

| Item | Outcome | Primary files | Effort | Success check |
|---|---|---|---|---|
| One name per tier everywhere | Column, Keep/Lose, rail, confirm use the same label | `tierLabels.ts`, Personalise, Compare, ApplyConfirmWizard | M | No Complete≠Comprehensive mid-sentence |
| Rename Base + show employer £ on rails | “Your core cash”; “Employer contributes £X toward core”; fix strike aria | `PmiPersonalise.tsx`, `BenefitCompare.tsx` | S | Probe “why £0?” has a clean answer |
| Fix priority card | Suggest only unpaid gap; drop fertility-as-family default | `PmiPersonalise.tsx`, CSV tags | S | Default open ≠ fertility contradicting cover |
| Best match matches fit panel | Rank with price delta + lose-count, or rename badge | `fitChecker.ts`, `BenefitCompare.tsx` | M | Badge column matches Fair/Bad + cash |
| Compare features stay on Compare | Overlay / closeTo Compare with selection | `BenefitCompare.tsx`, `FeatureDetail.tsx` | M | Click Family → close → still on Compare |
| Fix Keep/Lose false positives | Cancer drug drop ≠ keep; Dental keep only if selected | `featureMatch.ts` | M | Switch Keep list survives PMI probe |
| Script: Reset before walk; one switch only | Cold open £30; demo Model a switch **or** Compare | README + rehearsal | S | Step 1 is CSV enrolled plan |

### Phase 2 — AI-native story

| Item | Outcome | Primary files | Effort | Success check |
|---|---|---|---|---|
| Ask one flex topic | Draft fit reasons / Keep-Lose; keep topic refusal elsewhere | `askReplies.ts`, `AppShell.tsx` | M | “What should I change?” cites this draft |
| Worth comparing → link | Opens Compare (or selects that cover) | `PmiPersonalise.tsx` | S | Chip is actionable |
| Label Compare sticky Current/New | Dictionary labels on rail | `BenefitCompare.tsx` | S | Rail not bare £30 |

### Phase 3 — PMI / money honesty polish

| Item | Outcome | Primary files | Effort | Success check |
|---|---|---|---|---|
| Cancer on every Core + honest drug delta | Core keeps limited cancer; Premier names newer drugs | CSV, feature packs, `featureMatch.ts` | M | No ✕ cancer on Core unless intentional + labeled |
| One excess basis | “£X per person per policy year” everywhere | Personalise, ask, feature packs | S | One answer to “per what?” |
| One family cap copy | Blurbs match combined max; NI optional for children | CSV, ApplyConfirmWizard | S | Partner+3 children answer matches UI |
| Travel cost copy = +£4 employee | Drop employer-may-fund hedge | `axa-pmi.ts` | S | Feature detail matches button |
| Prototype line on money rails | Illustrative / not regulated sale | Personalise, Compare | S | Same honesty as detail |

### Phase 4 — Nice-to-have (deferrable)

| Item | Outcome | Primary files | Effort | Success check |
|---|---|---|---|---|
| Shell strategy | Keep labeled nav on detail; collapse only on wide matrices — or keep collapse but expand Reset affordance | `AppShell.tsx` | S | Walk still feels like Navigator |
| Step / slim Personalise | Cover → people → extras; one charcoal Apply | `PmiPersonalise.tsx` | M | First viewport = one job |
| One switch surface | Model a switch → Compare filtered, or strip duplicate | Detail, Personalise, Compare | M | One ceremony in the script |
| Narrow sticky rail | Pin You pay + Apply only | Personalise / Compare asides | S | Phone can edit matrix |
| Show locked household on switch | Partner + child carried from AXA | Switch Personalise | S | £30→£52 has a subject |
| Household real names | Chip “You & Ellen” not Partner/Child 1 | profile JSON, PlanContext | S | Cover chip consumer-grade |
| Move Reset out of employee chrome | Corner control interviewer knows | AppShell | S | Sidebar looks product, not demo |

## Non-goals

- GAP / administrator workflows
- Part 2 (not in brief paste)
- Live regulated insurance sale
- Full multi-country benefits catalogue
- Demoing both switch ceremonies in one interview
- Building a real LLM chat
- Reverting Options Personalise-primary hierarchy (leave)

## Appendix — raw lens notes

`.cursor/skills/takehome-brief-audit/runs/{brief-deliverables,uk-pmi-flex,ai-native,ux-simplicity,walkability,navigator-fit,money-honesty}.md`
