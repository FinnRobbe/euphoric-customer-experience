### Pen travel feature details — `copy-feat-pen`

**Files in scope:** `src/data/featureDetails/pen-travel.ts` (featureIds: `travel-medical`, `travel-cancel`, `travel-baggage`, `travel-winter`, `travel-family`, `travel-docs`)  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | em dash overuse | `pen-travel.ts` · `featureId=travel-medical` · FAQ “Does this cover me in the UK?” | “…may be excluded or limited—check your policy wording…” | Use a full stop or comma; two short sentences. |
| rewrite | em dash overuse | `pen-travel.ts` · `featureId=travel-cancel` · `includedItems` | “…listed in your policy—for example serious illness…” | Break before “for example”; avoid em dash. |
| rewrite | em dash overuse | `pen-travel.ts` · `featureId=travel-baggage` · `includedItems` / FAQ delayed baggage | “…within sub-limits—often a lower cap…”; “…toiletries—not a full replacement…” | Split; lead with the limit, then the caveat. |
| rewrite | em dash overuse; long sentence | `pen-travel.ts` · `featureId=travel-winter` · `overview` / `includedItems` | “…relevant sections—such as personal liability or equipment—while taking part…”; “…resort guidance—off-piste…” | Prefer periods; one idea per sentence per §2.1. |
| rewrite | em dash overuse; dictionary collision (**Core**) | `pen-travel.ts` · `featureId=travel-family` · `overview` / `costSummary` | “…same core sections—medical, cancellation…”; “…every relative—parents, siblings…” | Say **main** sections (not **Core** tier); split relative list with a period. |
| rewrite | stacked hedges; vague modality | `pen-travel.ts` · multiple · `includedIntro` / `costSummary` | “Emergency medical cover **typically** includes:”; “Baggage and belongings cover **may include:**”; “Family cover **typically** means:”; frequent “subject to / may / can” in same blocks | One clear caveat per block (schedule/wording); prefer direct “includes” where facts allow. |
| rewrite | repetitive structure; polished tone | `pen-travel.ts` · `featureId=travel-cancel` · `overview` | “Cancellation cover can… Curtailment cover can…” | Vary opener; shorten to what you can claim and when. |
| rewrite | long sentences; impersonal polish | `pen-travel.ts` · `featureId=travel-medical` · `costSummary`; similar in other features | Single paragraph chaining limits, upfront pay, pre-existing conditions, and exclusions | Split into 3–4 short “you” sentences; answer “what you pay” first. |
| rewrite | §2.1 jargon; §2.2 cash wording | `pen-travel.ts` · `featureId=travel-family` · `costSummary` | “…change your **monthly employee contribution** through your employer’s scheme.” | Align with dictionary: tie to **You pay** / payroll contribution in plain terms (no new prices). |
| rewrite | identical FAQ / access-step cadence | `pen-travel.ts` · all six features · `accessSteps` | Five steps each ending with Pen Underwriting / scheme administrator / benefits team in similar order | Vary step openings; keep only the actions that differ by section. |
| rewrite | §2.1 sentence length | `pen-travel.ts` · `featureId=travel-docs` · `includedItems` | Four list items use “Label—long gloss” pattern (wording, schedule, IPID, assistance) | Use label + short sentence; keep IPID expansion once. |
| leave | domain / insurance terms | `pen-travel.ts` · `travel-medical` · `includedItems` | “Reasonable and necessary private medical treatment…” | Keep; standard policy language. |
| leave | domain term | `pen-travel.ts` · `travel-docs` · `includedItems` | “IPID (Insurance Product Information Document)” | Keep expansion; matches UK insurance context. |
| leave | provider CTA | `pen-travel.ts` · `providerCta` | “Go to Pen Underwriting” | Keep; factual outbound label. |

## Notes

- Em dashes appear **14 times** in this file; `rewrite-rules.md` prefers periods—this pack reads more “policy brochure” than calm Navigator §2.1 voice.
- **Core** as “core sections” in `travel-family` risks clashing with §2.2 tier label **Core** on the same product surface.
- Copy is **not** sparse: limits, assistance line, declarations, and claim steps are well covered; rewrites should trim polish and hedges, not remove honesty about exclusions or schedule dependence.

