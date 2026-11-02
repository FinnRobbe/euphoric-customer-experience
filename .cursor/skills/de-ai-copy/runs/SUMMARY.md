# De-AI copy — run summary

- **Date:** 2026-11-01
- **Waves:** audit (17) → rewrite (17) → critic (8 covering all packs)
- **Skill:** `.cursor/skills/de-ai-copy/`

## Per-pack change summary

| Agent id | Wave1 | Wave2 | Wave3 critic |
|---|---|---|---|
| copy-feat-axa | needs-rewrite | edited | fixed-residual |
| copy-feat-bupa | needs-rewrite | edited | pass |
| copy-feat-vitality | needs-rewrite | edited | pass (see critic) |
| copy-feat-lg-pension | needs-rewrite | edited | fixed-residual |
| copy-feat-lg-life | needs-rewrite | edited | pass |
| copy-feat-aviva | needs-rewrite | edited | pass |
| copy-feat-bhn | needs-rewrite | edited | fixed-residual |
| copy-feat-pen | needs-rewrite | edited | pass |
| copy-feat-chubb | needs-rewrite | edited | pass |
| copy-catalog | needs-rewrite | edited | critic ran |
| copy-csv-pmi | needs-rewrite | edited | fixed-residual |
| copy-pages-personalise | needs-rewrite | edited | fixed-residual |
| copy-pages-detail-features | needs-rewrite | edited | fixed-residual |
| copy-pages-compare-billing | needs-rewrite | edited | fixed-residual |
| copy-pages-grid-saved-orphans | needs-rewrite | edited | pass |
| copy-components-shell | needs-rewrite | edited | pass |
| copy-lib-messages | needs-rewrite | edited | fixed-residual |

## Smoke

- `tsc --noEmit` exit 0
- App loads Personalise switch + feature routes after rewrites

## Residual risks

- Some “typically” / polished hedges may remain in long FAQ tails; critics fixed the worst residuals
- CSV plan-level narratives are repeated per feature row — keep edits consistent if regenerating CSV later
