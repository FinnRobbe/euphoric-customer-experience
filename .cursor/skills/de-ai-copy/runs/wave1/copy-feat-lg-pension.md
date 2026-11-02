### LG pension feature details — `copy-feat-lg-pension`

**Files in scope:** `src/data/featureDetails/lg-pension.ts` (six exports: `lg-contrib`, `lg-employer`, `lg-funds`, `lg-wish`, `lg-projections`, `lg-consolidation`)
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | hedge stacking; repetitive intro | `lg-pension.ts` · `featureId=lg-contrib` · `includedIntro` | “Through your L&G Workplace Pension, you can typically:” | Drop “typically”; lead with what you can do on the account. One scheme-rules caveat elsewhere is enough. |
| rewrite | vague claim; polished tone | `lg-pension.ts` · `featureId=lg-contrib` · `overview` | “make a meaningful difference to the pot you build by retirement” | Swap for a concrete outcome (e.g. more paid in over time, match captured) without hype. |
| rewrite | em dash | `lg-pension.ts` · `featureId=lg-contrib` · `costSummary` | “can change — check your payslip after any update” | Full stop; second sentence: “Check your payslip after any update.” |
| rewrite | em dash | `lg-pension.ts` · `featureId=lg-contrib` · FAQ | “certain types of change — your L&G account” | Split or use a comma; keep answer-first. |
| rewrite | em dash | `lg-pension.ts` · `featureId=lg-contrib` · FAQ | “can matter — consider speaking to a regulated adviser” | Period before “Consider speaking…”. |
| rewrite | marketing tone; hype | `lg-pension.ts` · `featureId=lg-employer` · `overview` | “make the most of “free money” from the company” | Plain employer-paid wording; avoid quoted sales phrase (§2.1). |
| rewrite | hedge | `lg-pension.ts` · `featureId=lg-employer` · `includedIntro` | “Employer contributions under this benefit usually cover:” | “Your scheme includes:” or one “depends on your employer” line after the list. |
| rewrite | em dash | `lg-pension.ts` · `featureId=lg-employer` · `costSummary` | “paid by your company — they do not come out of your net pay” | Two short sentences. |
| rewrite | polished / sales tone | `lg-pension.ts` · `featureId=lg-employer` · FAQ | “often the most efficient way to boost your pot” | State the mechanics: raise your contribution up to the match cap to get full employer pay-in. |
| rewrite | em dash | `lg-pension.ts` · `featureId=lg-employer` · FAQ | “at a certain level — increasing your payment” | Period or comma split. |
| rewrite | hedge stacking; repetitive intro | `lg-pension.ts` · `featureId=lg-funds` · `includedIntro` | “Investment choices through L&G typically include:” | Same pattern as contrib/projections; drop “typically” on the label. |
| rewrite | em dash overuse | `lg-pension.ts` · `featureId=lg-funds` · `includedItems` / FAQ / `accessSteps` | “charges — with reminders”; “diversification — or those seeking”; “every few years — more often” | Prefer periods; one idea per sentence (§2.1). |
| rewrite | long sentence; stacked ideas | `lg-pension.ts` · `featureId=lg-funds` · `costSummary` | Single block covering OCF, switching, losses, “fall as well as rise”, long-term disclaimer | Break into 3–4 short sentences; keep required investment warning. |
| rewrite | em dash | `lg-pension.ts` · `featureId=lg-wish` · `costSummary` | “valid will — HR or a solicitor” | Two sentences. |
| rewrite | hedge stacking; repetitive intro | `lg-pension.ts` · `featureId=lg-projections` · `includedIntro` | “Projection tools on your L&G account typically show:” | Align with other packs: direct “Your account shows:” (or similar). |
| rewrite | em dash | `lg-pension.ts` · `featureId=lg-projections` · `costSummary` / FAQ | “consolidating other pensions — always check”; “near retirement — such as transfer” | Split; keep “not personal advice” upfront. |
| rewrite | em dash; formulaic contrast | `lg-pension.ts` · `featureId=lg-consolidation` · `overview` / `costSummary` / FAQs | “higher charges — so compare”; “large transfers — regulated advice”; “member details — start by gathering” | Periods over em dashes; keep balanced transfer warning without sounding templated. |
| rewrite | repetitive structure | `lg-pension.ts` · pack-wide · `accessSteps` | Five steps × six features: sign/log in → open section → review → change → revisit/save | Vary openings (“Sign in” vs “Log in”, length of first step); tighten steps that duplicate the same L&G login line. |
| rewrite | repetitive structure | `lg-pension.ts` · pack-wide · `includedIntro` | Parallel “Through / under / through L&G typically…” intros across contrib, employer, funds, projections, consolidation | Vary first clause; avoid copy-paste cadence from other feature packs. |
| leave | domain term | `lg-pension.ts` · `featureId=lg-contrib` · `includedItems` / FAQ | “National Insurance”, “auto-enrolled”, “relief-at-source”, “Self Assessment” | Keep (rewrite-rules domain list). |
| leave | domain term | `lg-pension.ts` · `featureId=lg-funds` · `costSummary` | “ongoing charge figure (OCF)” | Keep; define OCF once if journey requires (§2.1 jargon rule). |
| leave | direct FAQ answer | `lg-pension.ts` · `featureId=lg-wish` · FAQ | “No. Your will governs your estate; the expression of wish guides pension trustees…” | Keep structure; answer-first is on-standard. |

## Notes

- **§2.2 dictionary:** No Core / Comprehensive / You pay / Apply labels in this file; nothing to enforce from the label table.
- **Tone overall:** Second person and factual pension content are strong; rewrites are mostly de-polish (hedges, em dashes, one marketing phrase), not fact changes.
- **Adviser CTAs:** Repeated “regulated financial adviser” / map labels are appropriate for pension; not flagged as AI tells.
- **Do not strip:** UK scheme terms (`qualifying earnings`, `salary sacrifice`, `expression of wish`, `annual allowance`) when rewriting.

