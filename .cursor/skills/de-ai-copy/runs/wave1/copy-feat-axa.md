### AXA PMI feature details — `copy-feat-axa`

**Files in scope:** `C:\Users\firo\euphoric-customer-experience\src\data\featureDetails\axa-pmi.ts`  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | repetitive structure; identical FAQ / access-step cadence | `axa-pmi.ts` · pack-wide (`accessSteps`, `providerCta`, `faqs`) | Most packs: step 1 “Log in to your AXA Health member account” (or portal/sign-in variant) → portal section → book/complete → attend → follow-up; every `providerCta.label` is “Go to AXA Health”; FAQs often open with “Yes.” / “No.” then a long qualifying second sentence | Vary step 1 wording and order where the journey differs; shorten FAQ answers (answer first, one limit); keep one consistent CTA label if product requires it, but don’t clone five-step scripts where fewer steps apply |
| rewrite | repetitive structure | `axa-pmi.ts` · pack-wide (`includedIntro`) | Repeated “this benefit / your cover / service … typically includes / may cover / can include” (e.g. `virt-gp`, `inpatient`, `daycase`, `cancer-*`, `mental-*`, `outpatient-consult`, `travel-extra`, `second-opinion`) | Lead with what you get in plain nouns; one intro pattern per pack, not the same hedge + “may include” frame on every feature |
| rewrite | filler hedges stacked | `axa-pmi.ts` · `featureId=virt-gp` / `includedIntro` + `includedItems[0–1]` | “this benefit **typically** includes”; “**subject to** fair use and clinical appropriateness”; “**where clinically suitable** and permitted under your policy” | Keep one clear caveat (e.g. fair use); drop duplicate “clinical” hedges in adjacent bullets |
| rewrite | vague claims; polished tone | `axa-pmi.ts` · `featureId=cancer-diag` / `overview` | “**Fast access can reduce waiting time** compared with routine NHS queues for eligible members.” | State what the benefit pays for; avoid comparative speed claims unless sourced; optional one line on private vs NHS pathway without selling “faster” |
| rewrite | vague claims; polished tone | `axa-pmi.ts` · `featureId=scans` / `overview` | “**Faster scanning can shorten the time** to diagnosis and treatment planning.” | Same as above: concrete cover (MRI/CT/US when authorised) not outcome marketing |
| rewrite | vague claims; polished tone | `axa-pmi.ts` · `featureId=breast` / `overview` | “**Rapid access** to specialist examination and imaging **can complement** NHS breast services.” | Say what’s covered (clinic, imaging, biopsy when authorised); one honest line on using NHS for urgent/screening |
| rewrite | polished tone | `axa-pmi.ts` · `featureId=cancer-drugs` / `overview` | “**This helps access** drugs that may not be available routinely on the NHS for your situation.” | Replace “helps access” with what authorisation covers; avoid soft benefit-selling |
| rewrite | generic opening | `axa-pmi.ts` · `featureId=physio` / `overview` | “**This benefit can help** if you have a muscle, bone or joint condition…” | Open with you + action (“You can self-refer for muscle, bone and joint conditions…”); cut “This benefit can help” |
| rewrite | unnaturally polished tone | `axa-pmi.ts` · `featureId=physio` / `includedItems[0]` + FAQ answer | “**combined overall maximum** of 10 sessions per scheme year (your policy year)…” (same phrase in FAQ) | Pick one plain limit phrase (“Up to 10 sessions per scheme year, combined for physio and osteopathy”); shorten parentheticals |
| rewrite | impersonal tone (we vs you) | `axa-pmi.ts` · `featureId=inpatient` / `includedIntro` | “**When we approve** in-patient treatment, this benefit can cover:” | Prefer “When AXA approves…” or “Once treatment is approved, cover can include:” (stay second person elsewhere) |
| rewrite | impersonal tone (we vs you) | `axa-pmi.ts` · `featureId=daycase` / `costSummary` | “…can limit **what we pay**.” | “…can limit **what AXA pays**” or “…may reduce cover” |
| rewrite | em dash overuse | `axa-pmi.ts` · `featureId=mental-talk` / FAQ | “different policy sections**—**contact AXA or emergency services…” | Split into two sentences |
| rewrite | em dash overuse | `axa-pmi.ts` · `featureId=outpatient-consult` / FAQ | “allow self-referral**—**see your membership guide.” | Period or colon; “See your membership guide.” |
| rewrite | em dash overuse | `axa-pmi.ts` · `featureId=fertility` / `costSummary` | “eligibility rules**—**often age, relationship status…” | Period after “rules”; list limits in a short second sentence |
| rewrite | em dash overuse | `axa-pmi.ts` · `featureId=travel-extra` / `overview` | “add-on terms**—**not routine holiday cover for cancellations or baggage.” | Two sentences; lead with what it is not (routine travel insurance) |
| rewrite | em dash overuse | `axa-pmi.ts` · `featureId=second-opinion` / FAQ | “records are gathered**—**often a few weeks.” | “Records take time to gather. Often a few weeks.” |
| rewrite | polished tone | `axa-pmi.ts` · `featureId=second-opinion` / `overview` | “explains options in **plain language**.” | Drop meta phrase; “explains your options” or “summarises diagnosis and treatment choices” |
| rewrite | stacked hedges | `axa-pmi.ts` · `featureId=cancer-drugs` / `includedIntro` | “**Subject to policy terms and clinical approval**, cover can include:” | One caveat in intro or foot of list, not both “subject to” + “can include” on every bullet block |
| rewrite | polished tone | `axa-pmi.ts` · `featureId=mental-assess` / `overview` | “**This service helps route you** to appropriate NHS, private, or employer support.” | “The assessment points you to…”; name one or two outcomes, not three parallel channels |
| leave | domain hyphen | `axa-pmi.ts` · `daycase`, `physio`, `inpatient`, etc. | “day-case”, “day-patient”, “in-patient”, “self-referral” | Keep |
| leave | domain term | `axa-pmi.ts` · `featureId=virt-gp` / `includedItems` | “Fit notes” | Keep (UK PMI term) |
| leave | domain term | `axa-pmi.ts` · `featureId=fertility` / FAQ | “NICE-style clinical thresholds” | Keep |

## Notes

- `axaPhysioDetail` is exported twice in `axaPmiFeatureDetails` (duplicate entry); out of copy scope but affects which strings surface twice if deduped in UI.
- Copy is generally second person and factual on authorisation/excess; main debt is **template sameness** across ~20 feature packs and **hedge stacking** on clinical/administrative lines, not missing employee-facing strings (pack is dense, not sparse).

