### Aviva retirement feature details — `copy-feat-aviva`

**Files in scope:** `src/data/featureDetails/aviva-retirement.ts`  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | em dash overuse | `aviva-retirement.ts` · `featureId=av-drawdown` · `includedItems[1]` | “Flexible withdrawals — you decide the timing…” | Use a full stop or colon; two short sentences |
| rewrite | stacked hedges; polished tone | `aviva-retirement.ts` · `featureId=av-drawdown` · `includedIntro` | “This pathway typically covers:” | Drop “typically”; plain “This pathway covers:” or “Includes:” |
| rewrite | long sentence; one idea per sentence (§2.1) | `aviva-retirement.ts` · `featureId=av-drawdown` · `overview` | “Your pot can rise or fall with markets, so you choose how much to withdraw each year within HMRC rules and any product limits.” | Split after “markets.”; keep HMRC/product limits as a second sentence |
| rewrite | repetitive FAQ cadence | `aviva-retirement.ts` · `featureId=av-drawdown`, `av-taxfree` · FAQs | “Often yes.” (drawdown tax-free FAQ; tax-free partial crystallisation FAQ) | Vary openings; lead with the rule (“Yes, if your scheme allows…”) then one limit |
| rewrite | identical access-step cadence (repo smell) | `aviva-retirement.ts` · all six `featureId`s · `accessSteps` | Five parallel steps per feature (“Open…”, “Enter/Review…”, “Compare…”, “Book/adviser…”, “Confirm/Adjust…”) | Vary first verbs and length; merge or drop a step where the journey is simpler |
| rewrite | em dash overuse | `aviva-retirement.ts` · `featureId=av-annuity` · `overview` | “An annuity exchanges part or all of your pension pot for a regular income — often for life or a fixed term.” | Period after “regular income”; second sentence for term/life |
| rewrite | em dash overuse | `aviva-retirement.ts` · `featureId=av-annuity` · `costSummary` | “…once the annuity is in payment — the insurer keeps the capital…” | Two sentences; drop dash |
| rewrite | vague / polished phrasing | `aviva-retirement.ts` · `featureId=av-advice` · `overview` | “It is designed to prompt the right questions before you commit…” | Second person: “It helps you ask the right questions before you commit…” |
| rewrite | em dash overuse | `aviva-retirement.ts` · `featureId=av-advice` · `overview` | “…step by step — comparing security, flexibility, tax…” | Split into two sentences |
| rewrite | repetitive structure | `aviva-retirement.ts` · multiple features · `includedIntro` | “Annuity options in this journey may include:” / “Partner and dependant options may include:” / “A typical annual review covers:” | Align to one plain pattern (“Includes:” / “You can:”) without “may include” on every block |
| rewrite | em dash overuse; hedge stack | `aviva-retirement.ts` · `featureId=av-taxfree` · FAQ (Lifetime Allowance) | “…how you take them — personalised guidance or advice is often worthwhile.” | One caveat only; split sentence; prefer “Pension Wise or an adviser” over “often worthwhile” |
| rewrite | em dash overuse | `aviva-retirement.ts` · `featureId=av-review` · `overview` | “Retirement needs change — inflation, health, and family circumstances…” | Lead with “Your retirement needs change.” then list drivers in a short follow-up |
| rewrite | buzzword / polished tone | `aviva-retirement.ts` · `featureId=av-review` · FAQ (adviser) | “An IFA can give a holistic view across all pensions…” | Plain “whole-picture” or “view of all your pensions and tax” |
| rewrite | duplicate map label | `aviva-retirement.ts` · `av-drawdown`, `av-annuity`, `av-spouse` · `map.label` | “Find a retirement financial adviser near you” (same string three times) | Fine if intentional; otherwise vary by topic (drawdown vs annuity vs joint-life) |
| leave | prototype honesty | `aviva-retirement.ts` · `av-drawdown`, `av-advice`, `av-review` · `costSummary` | “no separate charge for exploring drawdown in this prototype” / “Using this guided journey in the prototype is free” | Keep; do not soften |
| leave | domain terms | `aviva-retirement.ts` · various | “day-case” N/A; “open-market option”, “joint-life”, “impaired-life”, “pre-authorisation” N/A; “crystallisation”, “Pension Wise”, “FCA-authorised” | Keep; jargon explained where needed |
| leave | UK benefits spelling | `aviva-retirement.ts` · `av-spouse` | “Dependant’s pensions” | Keep UK spelling |
| leave | provider CTA | `aviva-retirement.ts` · `providerCta` | “Go to Aviva” | No §2.2 conflict; keep |

## Notes

- Voice is mostly second person and factual; issues are rhythm and polish, not invented cover or missing prototype disclaimers.
- No §2.2 PMI dictionary labels appear in this file (expected for retirement income copy).
- Strongest pack-wide pattern: em dashes in overviews/bullets, “may / typically / often” in intros and FAQs, and cloned five-step `accessSteps` / four-FAQ blocks — same smell called out in repo-specific AI tells.
- `av-taxfree` `map.enabled: false` while label still present is a product/config choice, not an AI-tell; out of scope unless UX audit asks for empty map handling.

