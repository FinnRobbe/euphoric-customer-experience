### Grid, Saved, stubs, orphans — `copy-pages-grid-saved-orphans`

**Files in scope:** `BenefitsGrid.tsx`, `Saved.tsx`, `PlaceholderPage.tsx`, `PmiHub.tsx`, `PmiCompare.tsx`, `PmiFeatures.tsx`  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | dictionary (§2.2); hype | `PmiHub.tsx` · Compare `ActionCard` description | “Essential vs Plus vs Premier” | Use **Core / Comprehensive / Premier** in UI; reserve Essential/Plus for data/legal names only |
| rewrite | dictionary (§2.2) | `PmiHub.tsx` · manage section subline | “£{…}/mo **employee** · excess …” | Align with **You pay** / employer-contributes phrasing from §2.2 (e.g. “You pay £X/mo · Employer contributes £Y/mo toward core”) |
| rewrite | em dash; polished tone; stacked hedges; vague claims | `PmiHub.tsx` · Overview § first `<p>` | “offers fully fledged private healthcare support in the UK **—** so you can avoid long NHS waits **where clinically appropriate** … **that typically means** virtual GP …” | Split into short second-person sentences; drop em dash; one caveat max; cut “fully fledged”; lead with what *you* get on this tier |
| rewrite | polished tone; long compound sentence | `PmiHub.tsx` · Overview § second `<p>` | “Flexible benefits let you adjust cover level, add dependants where the tier allows, and opt into extras during enrolment.” | Concrete actions + numbers already on screen; shorter “You can change tier, add dependants (if allowed), and pick extras in Personalise.” |
| rewrite | jargon inconsistency | `PmiHub.tsx` · action card vs `PmiFeatures.tsx` H1 | “**Product functions**” vs “**Product features**” | Pick one employee-facing label (“Product features” matches features route) |
| rewrite | dev jargon in UI | `PmiCompare.tsx` · intro `<p>` | “Your enrolled plan is fixed from the CSV (\`is_current_plan\`).” | Prototype honesty in plain English (“Your enrolled plan is set for this demo; you can browse other tiers but not switch enrolment here.”) |
| rewrite | dictionary (§2.2) | `PmiCompare.tsx` · price line | “/mo **you pay** (core)” | Match label casing/pattern: **You pay** with `/mo` (and keep core scope clear) |
| rewrite | em dash; polished tone | `PmiFeatures.tsx` · intro `<p>` | “inside your medical insurance benefit **—** from Virtual GP to cancer pathways” | Period or comma; tighten to one idea per sentence |
| leave | prototype honesty | `BenefitsGrid.tsx` · amber banner | “This is a dummy Navigator experience … not live Disney, AXA, or Euphoric production data.” | Keep; matches rewrite-rules “do not soft-pedal” |
| leave | domain hyphen | `PmiHub.tsx` · Overview | “day-case treatment” | Keep per rewrite-rules |
| leave | plain empty/loading | `BenefitsGrid.tsx`, `Saved.tsx`, `PlaceholderPage.tsx` | “Loading benefits…”, “Nothing saved yet…”, “Coming soon / limited in this version.” | No AI tells; optional micro-edits only |
| leave | back link pattern | `PmiCompare.tsx`, `PmiFeatures.tsx` | “‹ Back to Private medical insurance” | Matches §2.4 `‹ Back to {destination}` |

## Notes

- **Orphan PMI pack:** Hub overview + Compare intro carry most rewrite weight; Grid/Saved/Placeholder are structurally sound and mostly dictionary-aligned.
- **Cross-page smell:** Hub Compare card still says Essential/Plus while Compare page uses `planName` from data—ensure visible tier marketing copy never contradicts §2.2 even when CSV names differ.
- **Breadcrumb vs back link:** `PmiHub.tsx` uses “‹ Benefits > Private Medical Insurance” (trail), not a Back link—fine if intentional; not flagged as AI tell.

