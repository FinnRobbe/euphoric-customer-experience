### Personalise (PMI) — `copy-pages-personalise`

**Files in scope:** `src/pages/PmiPersonalise.tsx`  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | em dash overuse | `PmiPersonalise.tsx` · lost-access empty state JSX ~1125 | “No remaining features to lose — you’ve kept access via add-ons where available.” | Use a full stop; two short sentences. |
| rewrite | em dash overuse | `PmiPersonalise.tsx` · switch household banner ~1782 | “…tier to continue — dependants stay as on your current plan.” | Split after “continue.” Drop the em dash. |
| rewrite | em dash overuse | `PmiPersonalise.tsx` · add-on row hint ~2196 | “In your draft — Apply to confirm.” | Period or colon; align with dictionary (“Apply / confirm changes” or “Apply to confirm changes”). |
| rewrite | em dash overuse | `PmiPersonalise.tsx` · sticky rail tip ~2498 | “…/mo less — see add-ons below.” | Two sentences: savings amount, then “See add-ons below.” |
| rewrite | em dash overuse | `PmiPersonalise.tsx` · dependants wizard intro ~3274 | “You’re adding dependants — all fields are required to continue.” | Period after “dependants.” One line on required fields. |
| rewrite | em dash overuse | `PmiPersonalise.tsx` · dependants wizard ~3356 | “You’re also adding dependants — all fields are required to continue.” | Same as above; avoid duplicating the same em-dash pattern twice in one step. |
| rewrite | long sentence; polished tone | `PmiPersonalise.tsx` · `dependantDetailsError()` ~109 | “Please complete first name, last name, National Insurance number, and date of birth for each new dependant. Blank values are not accepted.” | Shorter lead (“Fill in every field for each new dependant.”); list fields on one line or bullets; drop redundant second sentence. |
| rewrite | polished tone; vague opener | `PmiPersonalise.tsx` · confirm wizard `lost-access` ~2841–2844 | “After these changes, the following will no longer be part of your cover…” | Name what changed (tier/switch); drop “the following”; keep plain “you’ll lose” + add-on option. |
| rewrite | excessive signposting | `PmiPersonalise.tsx` · confirm wizard `review` ~2926 | “Please review carefully. Next you’ll confirm the payment method.” | Cut “Please review carefully”; one sentence on what happens next. |
| rewrite | repetitive structure | `PmiPersonalise.tsx` · upgrade hint (add-ons ~2209–2225, rail ~2494–2498, lost-access ~2848–2864, review ~3101–3121) | Repeated “A higher cover may cost less” + “You would pay about £…/mo instead of £… (−£…).” | One shared micro-copy pattern; vary opener or shorten repeats outside the primary banner. |
| rewrite | filler hedge stacked | `PmiPersonalise.tsx` · payment step legal bullets ~3535–3538 | “…under your employer’s scheme rules. You can usually cancel or change again in the next enrolment window.” | One caveat: scheme rules **or** enrolment window, not both with “usually”. |
| leave | dictionary label | `PmiPersonalise.tsx` · sticky rail ~2355, ~2412 | “Current price”, “New price” | Keep verbatim (§2.2). |
| leave | dictionary label | `PmiPersonalise.tsx` · rail table ~2512; matrix ~279 | “You pay”, “You pay (core)” | Keep; “(core)” is clarifier on matrix row. |
| leave | dictionary label | `PmiPersonalise.tsx` · rail CTA ~2593–2595, leave guard ~2664 | “Apply / confirm changes”, “Save / apply changes”, “Discard draft” | Keep verbatim (§2.2). |
| leave | dictionary label | `PmiPersonalise.tsx` · payment CTA ~3583 | “Confirm and update cover” | Keep (wizard-only CTA per §2.2). |
| leave | domain term | `PmiPersonalise.tsx` · dependant forms ~3413 | “National Insurance number” | Keep (UK term). |
| leave | prototype honesty | `PmiPersonalise.tsx` · payment step ~3540–3542 | “Prices shown here are illustrative for this prototype and do not constitute a regulated insurance sale.” | Keep; do not soften (rewrite-rules). |
| leave | warning pattern (good) | `PmiPersonalise.tsx` · confirm `review` ~3102–3103 | “You’re paying more for a weaker cover” | Keep; matches CONSUMER_STANDARDS §2.3. |
| leave | status phrasing | `PmiPersonalise.tsx` · feature review ~3057–3059 | “now included”, “paid add-on” | Keep (§2.3 link list pattern). |
| leave | typographic placeholder | `PmiPersonalise.tsx` · matrix/rail tables | “—” empty cells | UI convention, not prose; keep. |

## Notes

- Em dashes in employee copy cluster on draft/dependant messaging and upgrade tips; comments-only em dashes were ignored.
- Upgrade-savings copy is the strongest cross-block duplicate on this page (main content, rail, and two wizard steps).
- Overall voice is second person and transactional; dictionary rails and wizard CTAs match §2.2. Remaining work is mostly de-AI punctuation and trimming formal/repeated blocks, not a full tone reset.

