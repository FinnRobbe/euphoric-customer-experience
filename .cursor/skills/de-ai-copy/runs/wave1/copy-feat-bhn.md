### BHN bikes feature details — `copy-feat-bhn`

**Files in scope:** `src/data/featureDetails/bhn-bikes.ts`  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | grammar (not AI tell) | `bhn-bikes.ts` · `featureId=bike-retailers` / `costSummary` | “not **an** separate shop finance plan” | Fix to “not **a** separate shop finance plan” |
| rewrite | em dash overuse; long sentence | `bhn-bikes.ts` · `featureId=bike-choose` / `overview` | “…through Blackhawk Network, so you spread the cost via payroll rather than paying upfront on the shop floor.” (preceded by long single block) | Split into 2–3 short sentences; drop any em-dash-style clause stacking if added later |
| rewrite | em dash overuse; stacked hedges | `bhn-bikes.ts` · `featureId=bike-choose` / `includedItems[0]` | “…daily journey **—** road, hybrid, e-bike or folding, **subject to** your scheme’s eligible categories.” | Use a period or comma list; one scheme caveat nearby is enough |
| rewrite | stacked hedges; long sentence | `bhn-bikes.ts` · `featureId=bike-choose` / `costSummary` | “There is **usually**… you **may** pay less… though… **—** use the payroll estimate…” | Break into separate sentences; keep one clear tax/take-home caveat + pointer to estimate |
| rewrite | repetitive structure; hedge | `bhn-bikes.ts` · all six features / `includedIntro` | “you can **typically** include”; “**typically** offer”; “**usually** reflects”; “**commonly** include”; “**often** include” | Vary intros; state what’s included in plain terms with one hedge per block max |
| rewrite | em dash overuse; formulaic contrast | `bhn-bikes.ts` · `featureId=bike-retailers` / `overview` | “…sits behind the purchase **—** you shop as normal, **but** payment runs through the benefit rather than your card at full RRP.” | Two sentences: how checkout works, then how pay is taken; trim “full RRP” or gloss once |
| rewrite | em dash overuse; stacked hedges | `bhn-bikes.ts` · `featureId=bike-retailers` / `costSummary` | “Delivery charges **may** apply… **—** check at checkout.” | Period before “Check at checkout.”; keep one delivery caveat |
| rewrite | hype (§2.1); vague claim | `bhn-bikes.ts` · `featureId=bike-payroll` / `overview` | “…so you can budget for the hire period with **fewer surprises**.” | Replace with concrete outcome (“see monthly deduction and take-home impact”) |
| rewrite | em dash overuse; stacked hedges | `bhn-bikes.ts` · `featureId=bike-payroll` / `costSummary` | “Figures on screen are estimates only **—** your actual deduction **may** differ if…” | Lead with “Estimates only.” then list what can change in short bullets or sentences |
| rewrite | marketing fluff (§2.1) | `bhn-bikes.ts` · `featureId=bike-safety` / `overview` | “so you are ready for UK roads **from day one**.” | Cut or replace with factual line (eligible accessories in package) |
| rewrite | em dash overuse | `bhn-bikes.ts` · `featureId=bike-safety` / `costSummary`, `faqs[3].a` | “You will not normally pay VAT twice **—** the hire arrangement…”; “whole package **—** see end-of-hire…” | Use periods; keep cross-link to ownership feature |
| rewrite | polished tone; hedge stack | `bhn-bikes.ts` · `featureId=bike-ownership` / `overview` | “**tax-efficient** hire arrangement first; ownership is a separate step governed by HMRC…” | Plain HMRC hire-then-transfer explanation; avoid “tax-efficient” as filler |
| rewrite | em dash overuse; stacked hedges | `bhn-bikes.ts` · `featureId=bike-ownership` / `costSummary`, `faqs[0].a` | “…unless your employer provides cover **—** check your scheme booklet.”; “default **—** often extended hire or return **—** applies” | Split sentences; one leaver/insurance caveat each |
| rewrite | hype (§2.1) | `bhn-bikes.ts` · `featureId=bike-support` / `overview` | “…so issues are resolved **without delaying your commute**.” | End on what support covers (orders, payroll, end-of-hire); drop commute promise |
| rewrite | em dash overuse | `bhn-bikes.ts` · `featureId=bike-support` / `costSummary`, `accessSteps[1]` | “Third-party costs **—** such as… **—** are not covered”; “Search FAQs for your topic **—** orders, payroll, or end-of-hire.” | Prefer colon or full sentence list |
| rewrite | identical FAQ / access cadence | `bhn-bikes.ts` · all six features / `faqs` (4×) + `accessSteps` (5×) | Same shape and parallel phrasing (“You **usually**…”, “**may** require…”, “Review… **—** …”) | Vary step openings and FAQ answer leads; answer question first in one line |
| leave | domain terms; honest limits | `bhn-bikes.ts` · `featureId=bike-payroll` / `includedItems[2]` | “(not personal tax advice)”; “Figures on screen are estimates only” | Keep — matches prototype/estimate honesty |
| leave | domain hyphen / UK terms | `bhn-bikes.ts` · multiple | “National Insurance”, “cycle-to-work”, “e-bike”, “HMRC”, “UKCA/CE-marked” | Keep per rewrite-rules |
| leave | em dash in FAQ question | `bhn-bikes.ts` · `featureId=bike-support` / `faqs[0].q` | “Who do I contact first **—** HR or Blackhawk Network?” | Optional keep for readability in a choice question |

## Notes

- Voice is mostly second person and scheme-accurate (sacrifice, hire, ownership fee, leaver caveats). Tax wording avoids “tax-free” salary-sacrifice hype and aligns with cautious employee messaging.
- §2.2 PMI dictionary labels (Core, **You pay**, **Est. tax**, etc.) do not appear in this pack; no dictionary conflicts found in scope.
- Em dashes appear **14+** times in user-facing strings — primary pack-wide smell alongside `typically` / `usually` / `may` / `often` repeated across all six `featureId`s.

