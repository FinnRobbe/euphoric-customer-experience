### Detail + features overlay — `copy-pages-detail-features`

**Files in scope:** `src/pages/BenefitDetail.tsx`, `src/pages/BenefitFeatures.tsx`, `src/pages/FeatureDetail.tsx` (in-file strings + fallback pack when `getFeatureDetail` returns null)  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | em dash; redundant limited-scope | `BenefitDetail.tsx` · ActionCard `description` (non-PMI Personalise & Compare) | “Coming soon — limited in this version” (also duplicated by badge “Coming soon”) | Use a period or two short sentences; drop repeated “Coming soon” in body if badge already shows it |
| rewrite | §2.2 label dictionary | `BenefitDetail.tsx` · `PmiCostOverview` column header | “Employer pays” | Align with §2.2 employer-funding phrasing (e.g. contribute toward core); keep **You pay** as-is |
| rewrite | polished tone; vague noun | `BenefitFeatures.tsx` · page intro `<p>` | “Features are the specific services you can use inside … Browse the full inventory below.” | Shorter second person; swap “inventory” for “list” or “what’s on your cover”; one sentence + one action |
| rewrite | em dash | `BenefitFeatures.tsx` · intro `<strong>` | “{provider} — {benefit.title}” | Use “·”, comma, or line break instead of em dash |
| rewrite | filler hedge; repo FAQ/access cadence | `FeatureDetail.tsx` · fallback `includedIntro` | “This feature typically includes:” | Drop “typically”; state what’s included or “On your cover, this includes:” |
| rewrite | stacked hedges; repetitive structure | `FeatureDetail.tsx` · fallback `includedItems` | “Access according to your scheme rules and any waiting periods.” / “Support through your provider’s member channels…” | One concrete caveat; vary opener; avoid duplicating `featureMeta.description` as first bullet if overview already shows it |
| rewrite | vague claims; polished tone; FAQ doesn’t answer first | `FeatureDetail.tsx` · fallback `costSummary` | “Costs depend on your cover level, excess, and whether the provider is recognised on your scheme. Check Personalise for your monthly contribution.” | Lead with what the employee pays (often £0 at point of use vs excess/add-ons); then one limit; link to Personalise last |
| rewrite | repetitive structure; unnaturally polished | `FeatureDetail.tsx` · fallback `faqs` (all three) | e.g. “Follow the access steps on this page, then contact your provider…” / “cover level currently selected in this prototype.” | Answer each question in the first sentence; shorten prototype caveat; vary FAQ answer openings |
| rewrite | identical access-step cadence (repo smell) | `FeatureDetail.tsx` · fallback `accessSteps` | Five generic steps ending “as directed” / “for your records” | Replace with feature-specific steps where possible; keep fallback shorter and less boilerplate |
| rewrite | em dash | `FeatureDetail.tsx` · demo provider CTA | “Demo link — {label}” | Period or colon: “Demo link. {label}” |
| rewrite | polished tone (minor) | `FeatureDetail.tsx` · side note when `!included` | “Not included on the cover level selected in this prototype. Check Compare or Personalise for options.” | Shorter: “Not on this cover in the prototype. Use Compare or Personalise to see options.” |
| leave | dictionary label | `BenefitDetail.tsx` · `PmiCostOverview` | “You pay” | Keep |
| leave | delta pattern §2.3 | `BenefitDetail.tsx` · cover-updated banner | `(+£…/mo)` / `(−£…/mo)` | Keep |
| leave | plain UI chrome | `BenefitDetail.tsx` / `BenefitFeatures.tsx` | “‹ Back to …”, “Product features”, “Search features”, empty-search copy | Keep |
| leave | prototype honesty (wording only needs trim) | `FeatureDetail.tsx` · fallback FAQ “Is this included…” | “…in this prototype.” | Keep honesty; tighten sentence around it |

## Notes

- **BenefitDetail** overview paragraph and feature card blurbs are **data-driven** (`benefit.overview`, plan/catalog `description`); not audited here beyond in-file strings.
- When a curated pack exists in `getFeatureDetail`, the fallback block is unused; the fallback still ships for missing packs and reads like a **shared AI template** (hedges + same FAQ/access shape called out in `ai-tells.md`).
- **FeatureDetail** shell headings (“Overview”, “How much do I pay?”, “How do I access?”) match calm transactional tone; issues concentrate in the fallback object (~lines 106–154).

