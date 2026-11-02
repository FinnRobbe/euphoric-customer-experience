### Bupa PMI feature details — `copy-feat-bupa`

**Files in scope:** `src/data/featureDetails/bupa-pmi.ts` (9 features: `bupa-gp`, `bupa-hospital`, `bupa-outpatient`, `bupa-cancer`, `bupa-mental`, `bupa-physio`, `bupa-family`, `bupa-travel`, `bupa-dental`)
**Verdict:** needs-rewrite
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-gp` · `costSummary` | “eligible members — you do not pay per consultation” | Split into two sentences; drop the dash |
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-gp` · `accessSteps[3]` | “Pick a phone or video slot — many appointments are available the same day.” | Period after “slot”; lead with “Many…” |
| rewrite | stacked hedges; repetitive structure | `bupa-pmi.ts` · `featureId=bupa-gp` · `includedIntro` + `includedItems[0–2]` | “you can typically access”; “subject to your scheme rules”; “where clinically suitable” | One caveat per block; vary intro (not “Through… you can typically…”); keep one clinical limit if required |
| rewrite | em dash; polished tone | `bupa-pmi.ts` · `featureId=bupa-hospital` · `overview` | “day-patient unit — so you can be diagnosed and treated without long NHS waits” | Short sentences; state what cover pays for, then NHS wait context without dash hook |
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-hospital` · FAQ “Can I choose any private hospital…” | “policy list — Standard, Extended, or Premier depending on your flex option” | Use a full stop or colon; list hospital tiers plainly |
| rewrite | repetitive structure | `bupa-pmi.ts` · multiple features · `includedIntro` | “typically includes:” / “can include:” on hospital, outpatient, cancer, physio | Vary openings; answer “what’s included” in plain second person |
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-outpatient` · `costSummary` | “outpatient limit — for example a number of consultations…” | Break after “limit”; put example in next sentence |
| rewrite | label dictionary (§2.2) | `bupa-pmi.ts` · `featureId=bupa-outpatient` · FAQ “How many outpatient consultations…” | “Essential-style options… Plus and Premier tiers” | Use **Core** / **Comprehensive** / **Premier** per CONSUMER_STANDARDS §2.2 |
| rewrite | em dash; stacked hedges | `bupa-pmi.ts` · `featureId=bupa-cancer` · `costSummary` | “eligibility — subject to your policy terms…” | Period before “Subject to…”; one policy caveat |
| rewrite | polished tone | `bupa-pmi.ts` · `featureId=bupa-cancer` · `overview` | “designed to coordinate… evidence-based care quickly” | Plain “Bupa arranges…” / “private treatment”; cut brochure verbs |
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-cancer` · `accessSteps[0]` | “diagnosed — do not wait for all NHS results” | Two sentences: contact Bupa early; don’t wait on NHS results |
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-mental` · `costSummary` | “membership guide — often a fixed number per year” | Split; keep one limit reference |
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-mental` · `accessSteps[2]` | “pathway — digital CBT, counselling, or specialist referral” | Colon or new sentence listing options |
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-physio` · FAQ “How many sessions…” | “vary by tier — some options include…” | Period after “tier”; second sentence for cap |
| rewrite | em dash; typo | `bupa-pmi.ts` · `featureId=bupa-family` · `overview` | “scheme rules — often with one employer subsided contribution” | Fix **subsidised**; replace dash with short follow-on sentence |
| rewrite | em dash overuse (double) | `bupa-pmi.ts` · `featureId=bupa-family` · `includedItems[2]` | “core benefits — GP, hospital, outpatient — subject to each dependant’s…” | Two sentences; avoid nested dashes |
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-travel` · `overview` + `costSummary` | “outside the UK — useful for holidays…”; “limits apply — routine care…” | Lead with what you get abroad; exclusions as separate short sentences |
| rewrite | em dash overuse (double) | `bupa-pmi.ts` · `featureId=bupa-dental` · `overview` | “treatment — check-ups, hygiene, fillings… — up to annual limits” | List treatments in one sentence; limits in the next |
| rewrite | em dash overuse | `bupa-pmi.ts` · `featureId=bupa-dental` · `costSummary` | “full dental insurance — amounts are fixed per treatment type” | Period after “insurance”; explain fixed cash amounts plainly |
| rewrite | identical FAQ / access cadence | `bupa-pmi.ts` · all nine `featureId`s · `faqs` + `accessSteps` | Same shape: 3–4 FAQs; 4–5 imperative steps ending in “Keep Bupa updated…” / “Follow…” | Vary step verbs and order where safe; keep facts |
| leave | domain hyphen / UK PMI term | `bupa-pmi.ts` · `featureId=bupa-hospital` · `overview` | “day-patient” | Keep |
| leave | domain term | `bupa-pmi.ts` · multiple · FAQs / items | “pre-authorisation”, “self-referral” | Keep |
| leave | domain term | `bupa-pmi.ts` · `featureId=bupa-gp` · `overview` | “fit notes when clinically appropriate” | Keep one clinical caveat here if policy requires it |

## Notes

- Pack-wide pattern: **14+ em dashes** in employee-facing strings; rewrite-rules prefer periods and short clauses.
- **“Typically” / “usually” / “clinically …”** recur across overviews, intros, and bullets — reads like stacked legal hedges rather than §2.1 calm plain voice.
- **Tier naming slip** in outpatient FAQ is the only clear §2.2 dictionary miss; hospital FAQ “Standard, Extended, or Premier” may be insurer list names (confirm before renaming).
- **CTA label** `Go to Bupa` is fine; no sticky-pricing dictionary strings in this file.

