### Compare + billing + stubs — `copy-pages-compare-billing`

**Files in scope:** `src/pages/BenefitCompare.tsx`, `src/pages/PmiBilling.tsx`, `src/pages/BenefitPersonalise.tsx`  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | label dictionary (§2.2) | `BenefitCompare.tsx` · providers tab price suffix | “/mo you pay (core)” | Use dictionary cash label **You pay** and tier **Core** (e.g. “/mo · **You pay** (Core)” or match sticky-rail pattern used elsewhere). |
| rewrite | label dictionary (§2.2) | `BenefitCompare.tsx` · cover-levels tab price suffix | “/mo you pay” | Capitalise and label consistently: **You pay** (not lowercase helper text only). |
| rewrite | em dash | `PmiBilling.tsx` · page intro | “This is a prototype — nothing is charged.” | Split with a period: “This is a prototype. Nothing is charged.” (keep prototype honesty upfront). |
| rewrite | repetitive structure; identical FAQ cadence | `BenefitCompare.tsx` + `BenefitPersonalise.tsx` · `LimitedScopeBanner` | “**Coming soon / limited in this version.** … You can still review the overview and product features from the benefit page.” | Keep the amber honesty line once; vary the follow-up per page (Compare vs Personalise) so stubs don’t read copy-pasted. |
| rewrite | label / UI consistency | `BenefitCompare.tsx` · levels tab CTA | “Compare this tier” | Align with tab “Cover levels” and §2.2 tier language (e.g. “Compare this level” or name the tier via `TIER_LABELS`). |
| rewrite | passive / parallel stubs | `BenefitCompare.tsx` · non-PMI stub body | “Compare is not available for this benefit yet.” | Second person + action: what they *can* do now (back link is already there; one short sentence is enough). |
| rewrite | passive / parallel stubs | `BenefitPersonalise.tsx` · non-PMI stub body | “Personalising this benefit is not available here yet.” | Same move: “You can’t change options here yet” + one concrete next step (benefit page). |
| rewrite | minor polish | `BenefitCompare.tsx` · provider card link | “Open detail” | Prefer plain action: “View details” or “Open benefit page”. |
| rewrite | terminology drift | `BenefitCompare.tsx` · PMI intro vs stub | Intro: “medical insurance providers”; stub: “private medical insurance” | Pick one employee-facing term on this journey (PMI app → “private medical insurance” matches stub). |
| leave | dictionary label | `BenefitCompare.tsx` · employer line | “Employer contributes £{X}/mo toward core” | Keep (matches §2.2 employer funding pattern). |
| leave | domain terms | `BenefitCompare.tsx` · definition list | “Excess”, “Outpatient”, “Hospital list”, “Dependants” | Keep; jargon is appropriate on compare. |
| leave | back-link pattern (§2.4) | All three files | “‹ Back to …” | Keep. |

## Notes

- **BenefitPersonalise.tsx** for PMI routes only renders `PmiPersonalise`; almost all Personalise copy for enrolled PMI is **out of this scope**. This pass covers the **non-PMI stub** only.
- **BenefitCompare.tsx** PMI body is otherwise fairly plain and transactional: no em dashes, buzzwords, or stacked hedges in scope. `p.overview[0]` on provider cards is **data-driven**, not page-authored copy.
- **PmiBilling.tsx** form labels and validation strings are direct and fine; primary AI-tell hit is the intro em dash. Prototype disclaimer is appropriately blunt once split.
- Pack pattern: limited-scope stubs share the same banner headline and “overview and product features” tail as `PlaceholderPage.tsx` — worth harmonising in a later wave if you rewrite stubs globally.

