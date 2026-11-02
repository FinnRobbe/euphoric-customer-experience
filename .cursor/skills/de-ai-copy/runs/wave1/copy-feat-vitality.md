### Vitality PMI feature details — `copy-feat-vitality`

**Files in scope:** `src/data/featureDetails/vitality-pmi.ts`  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | em dash overuse | `vitality-pmi.ts` · `featureId=vitality-gp` · `overview` | “when you need it — by phone or video — without always waiting” | Split into two short sentences; drop both em dashes |
| rewrite | stacked hedges; polished tone | `vitality-pmi.ts` · `featureId=vitality-gp` · `includedIntro` / `includedItems` | “typically includes”; “subject to your plan rules and any waiting periods”; “where appropriate”; “when clinically needed” | One clear caveat on the block; shorten bullets to concrete inclusions |
| rewrite | em dash overuse | `vitality-pmi.ts` · `featureId=vitality-gp` · `faqs[3].a` | “unless your plan includes specific prescription support — check your schedule” | Period before “Check your schedule”; drop em dash |
| rewrite | repetitive structure; stacked hedges | `vitality-pmi.ts` · `featureId=vitality-hospital` · `includedIntro` | “Subject to pre-authorisation and your plan limits, hospital cover typically includes:” | Lead with what’s included; move pre-auth/limit to one line in `costSummary` or a single FAQ |
| rewrite | long sentence; vague polish | `vitality-pmi.ts` · `featureId=vitality-hospital` · `overview` | Single long sentence chaining inpatient, day-case, waiting times, and “where your cover applies” | Two sentences: what hospital cover is; when NHS waits matter |
| rewrite | em dash overuse | `vitality-pmi.ts` · `featureId=vitality-outpatient` · `overview` | “does not need an overnight stay — so you can investigate symptoms” | Period after “overnight stay”; second sentence for limit/outpatient purpose |
| rewrite | §2.2 label dictionary | `vitality-pmi.ts` · `featureId=vitality-outpatient` · `faqs[0].a` | “It depends on your tier — for example a fixed number” | Keep tier examples; ensure human tier names elsewhere use Core / Comprehensive / Premier |
| rewrite | §2.2 label dictionary | `vitality-pmi.ts` · `featureId=vitality-cancer` · `faqs[0].a` | “Essential tiers may treat cancer as an upgrade; Plus and higher tiers” | Replace **Essential** → **Core**, **Plus** → **Comprehensive** (human-facing copy) |
| rewrite | repetitive structure; stacked hedges | `vitality-pmi.ts` · `featureId=vitality-cancer` · `includedIntro` / `overview` | “pathway typically includes”; “structured support… case management to help coordinate” | Plain “You get…” intro; shorter overview without brochure phrasing |
| rewrite | em dash overuse | `vitality-pmi.ts` · `featureId=vitality-mental` · `overview` | “after clinical triage — for issues such as anxiety” | Period after “triage”; list conditions in a short follow-on |
| rewrite | repetitive structure | `vitality-pmi.ts` · `featureId=vitality-mental` · `includedIntro` | “When included or selected on your plan, mental health support may cover:” | Same “may include / typically” cadence as other features; vary opener or merge with first bullet |
| rewrite | em dash overuse | `vitality-pmi.ts` · `featureId=vitality-physio` · `overview` | “recognised physiotherapists — often after triage or referral” | Split; drop em dash |
| rewrite | §2.2 label dictionary | `vitality-pmi.ts` · `featureId=vitality-family` · `faqs[1].a` | “Essential may not allow dependants. Plus and Premier tiers typically do” | **Core** / **Comprehensive** / **Premier** per dictionary |
| rewrite | em dash overuse | `vitality-pmi.ts` · `featureId=vitality-family` · `overview` | “on one policy — so the household shares one excess structure” | Two sentences; drop “so the household shares” marketing glue |
| rewrite | em dash overuse (×2) | `vitality-pmi.ts` · `featureId=vitality-travel` · `overview` | “while you are abroad — for unexpected illness or injury on eligible trips — so you can seek” | Max one short clause; prefer periods |
| rewrite | polished tone; hedge stack | `vitality-pmi.ts` · `featureId=vitality-travel` · `costSummary` | Long chain of “usually”, “must meet”, “may be excluded unless”, “does not replace comprehensive travel insurance” | Keep honesty on gaps vs full travel insurance; shorten to you-pay / what’s covered / what’s not |
| rewrite | em dash overuse | `vitality-pmi.ts` · `featureId=vitality-dental` · `overview` | “routine private dental costs — such as check-ups” | Comma or period instead of em dash |
| rewrite | identical FAQ / access-step cadence | `vitality-pmi.ts` · all `featureId`s · `accessSteps[0]` | Repeated “Sign in to the Vitality Member app…” / “Sign in at vitality.co.uk…” across nine features | Vary first step where route differs; keep factual steps |
| rewrite | repetitive structure | `vitality-pmi.ts` · multiple features · `includedIntro` | Nine variants of “typically includes” / “may include” / “may cover” | Rotate plain intros (“Included on your plan:”) and drop redundant “typically” where `costSummary` already limits |
| leave | domain hyphen / term | `vitality-pmi.ts` · `featureId=vitality-hospital` · `overview` / FAQs | “day-case”; “pre-authorisation” | Keep per rewrite-rules domain list |
| leave | domain term | `vitality-pmi.ts` · `featureId=vitality-outpatient` · `faqs[1].a` | “self-referral” | Keep |
| leave | prototype honesty | `vitality-pmi.ts` · `featureId=vitality-outpatient` · `faqs[0].a`; `vitality-physio` · `faqs[1].a`; `vitality-travel` · `faqs[0].a` | “in this prototype”; Personalise / Compare | Do not soften; keep scope clear |
| leave | dictionary-aligned tier label | `vitality-pmi.ts` · `featureId=vitality-family` · `faqs[1].a` | “Premier tiers” (when paired with fixed Essential/Plus) | Keep **Premier**; fix Essential/Plus on same row |

## Notes

- Pack-wide pattern: formal, insurer-brochure overviews (“helps you access”, “gives structured support”), em dashes in most overviews, and hedge stacks (“typically”, “may”, “where clinically appropriate”, “subject to”) on nearly every `includedIntro` / bullet list.
- **§2.1:** Second person is consistent; sentences are often too long and abstract for “calm, plain, short.”
- **§2.2:** Two FAQ answers use **Essential** / **Plus** in employee-facing copy; align with **Core** / **Comprehensive** unless quoting a legal plan name (not indicated here).
- `vitality-family` map label (“Find Vitality partner gyms near you”) looks off-topic for dependant cover; flag for product/copy QA, not an AI-tell rewrite by itself.

