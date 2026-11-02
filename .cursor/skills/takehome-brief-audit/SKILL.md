---
name: takehome-brief-audit
description: >-
  Double-checks the Navigator UK PMI flexible-benefits prototype against the
  Euphoric Forward-Deployed AI PM take-home brief. Full runs fan out parallel
  advanced-model lens agents (brief fidelity, UK PMI, AI-native, UX, walkability,
  Navigator fit, money honesty), then merge into TAKEHOME_GAP_REVIEW.md. Use when
  the user asks for a take-home review, brief double-check, interview readiness
  audit, or take-home gap report.
---

# Take-home brief audit

Multi-lens review of this repo against the FD AI PM take-home (Part 1 — flexible UK PMI in Navigator). **Report + implementation plan only. Do not edit product code unless the user explicitly asked for fixes in the same message.**

## Load first (every run)

1. [brief-excerpt.md](brief-excerpt.md) — Part 1 deliverables + PMI flex scope
2. [lens-inventory.md](lens-inventory.md) — 7 agent ids ↔ lenses ↔ files/routes
3. [lens-agent-prompt.md](lens-agent-prompt.md) — Task prompt contract
4. [lens-report.md](lens-report.md) — required per-lens return shape
5. [merge-report.md](merge-report.md) — root file structure for `TAKEHOME_GAP_REVIEW.md`
6. Rubrics in [rubrics/](rubrics/)
7. Supporting product refs: [CONSUMER_STANDARDS.md](../../../CONSUMER_STANDARDS.md), [README.md](../../../README.md), [visual-guidance/](../../../visual-guidance/)

## Triggers

- “Take-home review” / “brief double-check” / “interview readiness audit”
- “Run the take-home brief audit”
- “Re-check take-home after Personalise changes”

## Full run = parallel orchestrator (required)

1. Parent loads the files above (do **not** solo-review every surface).
2. Launch **one Task agent per lens** in [lens-inventory.md](lens-inventory.md) — **all 7 in one parallel wave**.
3. Model: prefer `claude-fable-5-1-thinking-high`. If unavailable (e.g. weekly usage), use `grok-4.7-high-fast` or the strongest available listed model and note the fallback in the merge.
4. `subagent_type: generalPurpose`. Children are **read-only** (report only).
5. Fill [lens-agent-prompt.md](lens-agent-prompt.md) for each agent.
6. If a child returns empty/errors: resume once; then continue.
7. Parent merges with [merge-report.md](merge-report.md), writes **`TAKEHOME_GAP_REVIEW.md`** at the repo root, and gives Finn a short pointer in chat.
8. Still **no auto-fix** unless the user asked for fixes in the same message.

**Do not** serialise all lenses on one agent for a full run. Parallel fan-out is required.

## Output

- Path: `C:\Users\firo\euphoric-customer-experience\TAKEHOME_GAP_REVIEW.md`
- Must include: executive verdict, biggest issues (≤12), per-lens scorecards, phased implementation plan, non-goals.
- Prioritise by **interview risk × brief gap**, not nit count.

## Single-lens / re-check

Scope to named agent ids from `lens-inventory.md`. Parent may run one Task agent or a small parallel wave. Still load brief-excerpt + that lens rubric. Update or append to `TAKEHOME_GAP_REVIEW.md` as appropriate.
