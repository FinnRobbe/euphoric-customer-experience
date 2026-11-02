### Non-PMI benefits catalogue — `copy-catalog`

**Files in scope:** `src/data/benefitsCatalog.ts` (six non-PMI entries: `lg-pension`, `aviva-retirement`, `lg-life`, `bhn-bikes`, `pen-travel`, `chubb-accident`)  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | non–second person; polished tone | `benefitsCatalog.ts` · `id=lg-pension` · `cardDescription` | “Company pension contributions with investment choices designed for long-term retirement saving.” | Lead with **you/your**; drop “designed for”; one concrete fact (employer top-up, funds, payroll). |
| rewrite | stacked hedges; long sentence | `benefitsCatalog.ts` · `id=lg-pension` · `overview[0]` | “…projected outcomes within your employer’s scheme rules.” | Split into two short sentences; keep **one** scheme-rules caveat for the block. |
| rewrite | repetitive structure | `benefitsCatalog.ts` · all entries · `overview[0]` | Same opener shape: “Legal & General’s…”, “Aviva’s…”, “Pen Underwriting’s…”, “Chubb…”, “Blackhawk Network’s…” | Vary openings; start with what **you** can do or pay, then provider name if needed. |
| rewrite | em dash | `benefitsCatalog.ts` · `id=aviva-retirement` · `overview[0]` | “…into income — including drawdown, annuity-style choices…” | Use a full stop or short lead-in sentence instead of `—`. |
| rewrite | formulaic contrast; vague polish | `benefitsCatalog.ts` · `id=aviva-retirement` · `overview[1]` | “…what each option typically means for flexibility versus guaranteed income.” | Plain comparison in short sentences; cut “typically” if prototype scope is already stated elsewhere on the journey. |
| rewrite | polished tone | `benefitsCatalog.ts` · `id=aviva-retirement` · `cardDescription` | “Guidance and products to turn pension savings into retirement income when you leave work.” | Same facts, more direct **you** framing (e.g. what you see on this page). |
| rewrite | filler hedge | `benefitsCatalog.ts` · `id=lg-life` · `overview[0]` | “Cover is **typically** expressed as a multiple of salary…” | Drop or replace “typically” with a concrete scheme limit if shown in UI. |
| rewrite | em dash | `benefitsCatalog.ts` · `id=chubb-accident` · `overview[0]` | “…covered accidental injury — such as fractures, hospitalisation…” | Split: injury types in a follow-on sentence (concrete list is good; em dash is the tell). |
| rewrite | stacked hedges | `benefitsCatalog.ts` · `id=pen-travel` · `overview[1]` | “…family cover **where offered by your employer’s scheme**.” | One shorter caveat; avoid repeating “employer’s scheme” if overview[0] already scopes the policy. |
| rewrite | stacked hedges | `benefitsCatalog.ts` · `id=bhn-bikes` · `overview[0]` | “…own the bike at the end of the agreement **(subject to scheme rules)**.” | Keep one hire/scheme caveat for the benefit; don’t repeat on every sentence in the pair. |
| rewrite | repetitive structure | `benefitsCatalog.ts` · `features[].description` (all six benefits) | Nearly every line: verb + noun + trailing qualifier (“within scheme limits”, “where offered”, “where eligible”, “as defined in…”). | Vary length and openings; answer “what is this?” first, one limit only where it matters. |
| rewrite | vague polish | `benefitsCatalog.ts` · `id=aviva-retirement` · `featureId=av-review` · `description` | “Reminder cadence to revisit income levels as needs change.” | Plain language (“Reminders to review your income each year”) — matches §2.1 short sentences. |
| leave | prototype honesty | `benefitsCatalog.ts` · multiple `features[].description` | “(prototype stub)”, “Prototype link…”, “This prototype page summarises…” | Keep; aligns with rewrite-rules must-preserve. |
| leave | domain / scheme terms | `benefitsCatalog.ts` · `id=bhn-bikes` · `overview[0]` | “salary sacrifice / hire arrangement” | Keep UK benefits wording. |
| leave | domain terms | `benefitsCatalog.ts` · `id=lg-life` · `featureId=life-sum` | “cover multiple of salary” | Keep; real cover concept. |
| leave | second person; calm tone | `benefitsCatalog.ts` · `manageLabel` fields | “Manage your pension”, “Manage life cover”, etc. | Keep; consistent with §2.1 you/your (not dictionary-conflicting). |

## Notes

- **§2.1:** Most overviews use **you/your** and stay factual; card copy for `lg-pension` and parts of Aviva retirement skew third-person or brochure-like. Sentences are often long with multiple clauses — split to one idea per sentence.
- **§2.2:** This file has no PMI tier or sticky-price labels; no dictionary violations spotted. `excessLabel` / `hospitalOrScope` are scope chips, not “Employee cost” or retired “After changes” wording.
- **Cross-pack pattern:** Six benefits share the same **overview two-paragraph** rhythm (provider product sentence + “Review/Personalise/Browse…” CTA sentence) and the same **feature blurb** cadence — reads like generated catalogue copy rather than six distinct voices.
- **Strengths:** Prototype framing on pension overview[1] and several stub features is appropriate and should stay when rewriting.

