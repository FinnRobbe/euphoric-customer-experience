### Chubb accident feature details — `copy-feat-chubb`

**Files in scope:** `src/data/featureDetails/chubb-accident.ts` (featureIds: `pa-fracture`, `pa-hospital`, `pa-disability`, `pa-worldwide`, `pa-family`, `pa-claims`)  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | em dash overuse; formulaic contrast | `chubb-accident.ts` · `featureId=pa-fracture` · `overview` | “…while you recover — not to replace your salary or private medical bills.” | Split into two sentences; drop “It is designed to”; lead with what you get, then one short limit. |
| rewrite | stacked hedges; third-person intro | `chubb-accident.ts` · `featureId=pa-fracture` · `includedIntro` | “Fracture benefits typically include:” | Use second person (“Your schedule lists…”); one “check your schedule” caveat, not “typically” on every block. |
| rewrite | em dash | `chubb-accident.ts` · `featureId=pa-hospital` · `includedItems` | “Separate from fracture or disability lump sums — you may be able to claim…” | Period or colon; keep the multi-benefit fact. |
| rewrite | em dash | `chubb-accident.ts` · `featureId=pa-hospital` · FAQ “Does a short A&E visit…” | “…may not qualify — check your schedule…” | Answer first (“Usually not.”); second sentence for what to check. |
| leave | domain hyphen | `chubb-accident.ts` · `featureId=pa-hospital` · `costSummary` | “Day-case or outpatient treatment…” | Keep **day-case**. |
| rewrite | em dash (×2); impersonal framing; formulaic contrast | `chubb-accident.ts` · `featureId=pa-disability` · `overview` | “…permanent disability — as defined in your schedule… — this benefit may pay… It is intended to recognise…, not ongoing care costs or loss of earnings.” | Short “you” sentences; one em dash max; state lump sum vs ongoing costs plainly. |
| rewrite | stacked hedges; third-person intro | `chubb-accident.ts` · `featureId=pa-disability` · `includedIntro` | “Disability benefits under personal accident cover often include:” | “Your schedule may pay lump sums for…”; cut “often”. |
| rewrite | em dash | `chubb-accident.ts` · `featureId=pa-disability` · `accessSteps[1]` | “…may be serious — you can update the claim…” | Two sentences. |
| rewrite | marketing fluff; em dash; §2.1 tone | `chubb-accident.ts` · `featureId=pa-worldwide` · `overview` | “…travelling abroad — as long as the injury… This gives peace of mind on holiday…” | Remove “peace of mind”; say where cover applies in plain “you” terms. |
| rewrite | em dash (×2); hedge stack | `chubb-accident.ts` · `featureId=pa-worldwide` · `costSummary` | “…worldwide cover — it is part of the group… War zones… — check your wording.” | Periods; one exclusions line pointing to wording. |
| rewrite | em dash | `chubb-accident.ts` · `featureId=pa-worldwide` · `accessSteps[1]` | “Inform your employer when you can — many schemes allow…” | Split; keep colleague/family reporting fact. |
| rewrite | em dash; list em dash | `chubb-accident.ts` · `featureId=pa-family` · `overview` / `includedItems` | “…covered accidental injury — subject to age limits…”; “The same types of benefits — fractures, hospital cash, disability —…” | Colons or parentheses for lists; avoid triple em-dash rhythm. |
| rewrite | vague polish; not second person | `chubb-accident.ts` · `featureId=pa-claims` · `overview` | “Making a claim is straightforward if you report…” | Drop “straightforward”; “Report the accident soon and send clear medical evidence.” |
| rewrite | em dash (×2); hedge | `chubb-accident.ts` · `featureId=pa-claims` · `costSummary` / `includedItems` | “Medical evidence — A&E notes…”; “Declined claims should include a reason — you can ask…” | Use colons for evidence lists; split decline/review line. |
| rewrite | em dash | `chubb-accident.ts` · `featureId=pa-claims` · `accessSteps[2]` | “Attach legible medical evidence — photos of forms are fine…” | Second sentence for photo tip. |
| rewrite | repetitive structure | `chubb-accident.ts` · all features · `accessSteps` | Six blocks of five parallel imperatives (“Seek…”, “Tell…”, “Complete…”, “Attach…”, “Submit/Send…”) | Vary openings and length; merge obvious steps where safe; keep claim facts. |
| rewrite | repetitive structure; hedge cadence | `chubb-accident.ts` · all features · `includedIntro` | “typically include / usually covers / often include / typically means / may provide” | Align to §2.1 second person; don’t copy the same intro formula across every feature. |
| leave | domain / factual terms | `chubb-accident.ts` · various | “pre-existing condition”, “BACS”, “RIDDOR”, “schedule of benefits” | Keep; define jargon only if the journey never explains “schedule” elsewhere. |

## Notes

- Copy is **not** sparse: FAQs and access steps are substantive and schedule-honest (good fit for personal accident).
- **§2.2 dictionary labels** (Core, You pay, etc.) do not appear in this file — no label violations found.
- Pack-level smell matches other `featureDetails` files (`typically includes`, five-step `accessSteps`); fixing Chubb alone will still read templated until intros/steps are varied across the benefit set.
- Preserve `featureId`s, `benefitId`, URLs, map templates, and all cover limits/exclusions when rewriting.

