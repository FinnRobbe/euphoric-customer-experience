---
name: de-ai-copy
description: >-
  Audits and rewrites employee-facing Navigator benefits copy to remove AI writing
  tells. Full runs fan out one parallel Task subagent per copy pack (audit, then
  rewrite, then critic). Use when the user asks to de-AI copy, humanize copy,
  remove AI writing, rewrite feature details/pages for less AI tone, or run the
  de-AI copy agentic system.
---

# De-AI copy

Strip AI-sounding prose from employee-visible English. **Full run = three parallel waves.** The parent orchestrates; it does **not** rewrite the whole repo alone.

## Load first (every run)

1. [ai-tells.md](ai-tells.md) — checklist (verbatim + repo smells)
2. [rewrite-rules.md](rewrite-rules.md) — voice, dictionary, domain hyphens
3. [inventory.md](inventory.md) — agent ids ↔ files (**17 slots**)
4. [pack-agent-prompt.md](pack-agent-prompt.md) — Task prompt contracts
5. [findings-template.md](findings-template.md) — Wave 1 output shape
6. [merge-report.md](merge-report.md) — parent synthesis
7. [CONSUMER_STANDARDS.md](../../../CONSUMER_STANDARDS.md) §2.1–2.2

## Triggers

- “De-AI copy” / “humanize copy” / “remove AI writing”
- “Run the de-AI copy agentic system”
- “Rewrite feature details to sound less AI”
- Scoped: “de-AI Personalise only” / “humanize AXA feature pack” → one or few inventory rows

## Full run = parallel orchestrator (required)

When the user asks for a **full** de-AI pass:

1. Parent loads the files above (do not audit every pack yourself).
2. **Wave 1 — Audit:** Launch **one Task agent per inventory row** (all **17 in one parallel wave**). Fill the Wave 1 skeleton from `pack-agent-prompt.md`. `subagent_type: generalPurpose`. Children **report only** (no edits).
3. Merge with Wave 1 section of `merge-report.md`. If a child is empty/errors: resume once; then continue.
4. **Wave 2 — Rewrite:** Launch **one Task agent per pack that needs rewrite** (prefer all 17 again so clean packs can still fix stragglers). Pass that pack’s Wave 1 findings into `{{FINDINGS}}`. Children **edit only their files**.
5. **Wave 3 — Critic:** Launch **one Task agent per rewritten pack** (or all 17). Children re-scan; minimal in-pack fixes only if residual AI tells remain.
6. Parent presents the final merge summary (short pack table — not a novel).
7. Smoke: app still loads; spot-check one AXA + one Bupa feature overlay if Vite is up.

**Do not** serialise all packs on one agent for a full run. Parallel fan-out is required.

## Single-pack / group workflow

Scope to named agent ids from `inventory.md`. Parent may run one Task agent or a small parallel wave. Still load ai-tells + rewrite-rules.

## Hard constraints

- Employee-facing strings only
- Preserve §2.2 dictionary labels and UK PMI / BIK accuracy
- Do not invent cover; do not rename ids/routes
- Keep domain hyphens listed in rewrite-rules.md

## Severity (audit)

| Severity | Meaning |
|---|---|
| rewrite | Change the string |
| leave | Dictionary label or real domain term — keep |
