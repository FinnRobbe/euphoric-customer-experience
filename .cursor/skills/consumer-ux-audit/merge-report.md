# Merge report — orchestrator synthesis

Parent agent fills this **after** all page agents return. Do not drop findings. Deduplicate identical issues; keep severity of the strongest instance.

---

```markdown
# Consumer UX audit — full inventory (parallel)

- **Date:** {YYYY-MM-DD}
- **Scope:** full inventory via parallel page agents
- **Standards loaded:** CONSUMER_STANDARDS.md, consumer-ux.mdc, page-inventory.md, uk-pmi-checks.md
- **Agents:** {N returned} / {N expected}; retries: {none | list}
- **Live pass:** {mixed — note which agents completed vs skipped}
- **Confidence:** {high | medium | low} — explain if any agent returned empty/failed

## Per-page results

{Paste each page agent’s section in inventory order. If an agent failed, insert a Fail stub with evidence “agent returned empty/error”.}

### Deduplicated notes
- {Optional: “Finding X also reported on: A, B”}

## Cross-page summary

### Top blockers
- …

### Dictionary hotspots
- …

### Stub / limited-scope surfaces
- …

### Suggested priority order
1. …
2. …

### Content QA gate (§13)
| Check | Result |
|---|---|
| Labels match §2.2 dictionary | Pass / Fail — notes |
| Cash totals exclude BIK | Pass / Fail — notes |
| Every primary action has a visible result | Pass / Fail — notes |
| Back targets and casing consistent | Pass / Fail — notes |
| Warnings: consequence + next action | Pass / Fail — notes |
| Mobile: sticky cost + modals usable | Pass / Fail / Skipped |
| No stub pages that look complete | Pass / Fail — notes |
| Tier marketing names for humans | Pass / Fail — notes |
```

## Merge rules

1. Preserve each page **Verdict** unless clearly inconsistent with its own blockers (then note the correction).
2. **Blockers** from any page appear in Top blockers (with route).
3. Dictionary issues cluster by preferred term (e.g. Essential→Core, `‹ back` casing).
4. Stub honesty failures go under Stub / limited-scope.
5. Priority order: cash/trust blockers → journey gaps (post-apply success, dead ends) → scope honesty → dictionary/a11y polish.
6. Present the merged report to the user in chat. Do not auto-fix unless asked.
