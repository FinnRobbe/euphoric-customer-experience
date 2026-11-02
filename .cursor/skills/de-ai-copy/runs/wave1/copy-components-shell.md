### Benefit components + shell — `copy-components-shell`

**Files in scope:** `src/components/benefits/FeatureCard.tsx`, `BenefitCard.tsx`, `LimitedScopeBanner.tsx`, `BikInfoPopover.tsx`, `BikTaxNote.tsx`; `src/components/shell/AppShell.tsx`  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | §2.2 dictionary (tier label) | `AppShell.tsx` · canned reply “Can I add my partner?” | “Plus and Premier allow a partner…” | Use **Comprehensive** and **Premier** in UI; reserve “Plus” for data/ids only |
| rewrite | em dash overuse | `AppShell.tsx` · same canned reply | “…up to the plan cap — check Personalise…” | Split into two sentences; drop the em dash |
| rewrite | polished tone; em dash (×2) | `BikInfoPopover.tsx` · dialog body | “…benefit in kind** — similar to extra income — so you pay…” | One short definition per sentence; use periods instead of paired em dashes |
| rewrite | §2.2 label alignment | `BikInfoPopover.tsx` · second paragraph | “…not added to the cash “you pay” figure above.” | Mirror dictionary **You pay** (capitalised label) and tie to the sticky/rail label on that screen |
| rewrite | stacked hedges / long sentence | `BikInfoPopover.tsx` · second paragraph | “…illustrative {ratePct}% rate (your real rate may differ). That estimate is **not** added…” | Lead with the number and “not in **You pay**”; one caveat on rate |
| rewrite | §2.2 micro-label drift | `BikTaxNote.tsx` · `variant="callout"` | “Est. income tax on employer funding ~£{tax}/mo (exemplary {ratePct}%).” | Prefer **Est. tax** / **+ ~£X tax** wording from §2.2; keep “illustrative” if you drop “exemplary” in visible copy |
| rewrite | inconsistent status copy | `FeatureCard.tsx` · `coverStatus` vs `muted` | “Not on your cover” vs fallback “Not included” | Pick one employee-facing phrase (align with §2.3 list status: e.g. “paid add-on”, included/not-included pattern used elsewhere) |
| rewrite | scope label shorthand | `BenefitCard.tsx` · `badge === 'limited'` | “Coming soon / limited” | Match full scope honesty string used in `LimitedScopeBanner` (“…in this version”) or accept deliberate short badge with same meaning |
| rewrite | hype / impersonal product label | `AppShell.tsx` · ask panel heading | “AI guidance” | Plain second-person helper label (e.g. “Quick answers”, “Help with your plan”); keep prototype honesty in answers, not the chrome |
| leave | dictionary-aligned tax chip | `BikTaxNote.tsx` · inline variant | “+ ~£{tax} tax” | Keep |
| leave | scope honesty (prototype) | `LimitedScopeBanner.tsx` · default children | “Coming soon / limited in this version.” | Keep; matches §1 scope honesty |
| leave | feature list status | `FeatureCard.tsx` · `paid-add-on` | “Paid add-on” | Keep intent; optional lower-case “paid add-on” per §2.3 if harmonising list copy |
| leave | domain term | `BikInfoPopover.tsx` | “benefit in kind” | Keep meaning; optional title-case **Benefit-in-Kind** on first mention if matching employer comms |

## Notes

- **BenefitCard** / **FeatureCard** pass most copy via props; this pack’s risk is **hardcoded chrome** (badges, BIK, shell FAQs), not card descriptions.
- **AppShell** canned answers are the only place in scope that violates the **Core / Comprehensive / Premier** dictionary (**Plus**).
- BIK strings across **BikTaxNote** and **BikInfoPopover** repeat the same “not added to what you pay” idea—fine once per surface, but the popover paragraph is the main AI-tell hotspot (em dashes + length).

