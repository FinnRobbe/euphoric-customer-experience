---
name: consumer-ux-audit
description: >-
  Audits employee-facing Navigator benefits pages against CONSUMER_STANDARDS.md,
  the consumer-ux rule, and UK PMI honesty checks. Full audits fan out one
  parallel subagent per page, then merge. Produces a severity-ranked findings
  report; does not fix unless asked. Use when the user asks to audit consumer UX,
  run a full consumer UX audit, audit Personalise/Compare/Billing/Benefits,
  re-audit a route, or check pages against consumer standards / UK PMI.
---

# Consumer UX audit

Structured page audit for this repo’s employee-facing benefits UI. **Report first. Do not edit code unless the user explicitly asked for fixes in the same message.**

## Load first (every run)

1. [CONSUMER_STANDARDS.md](../../../CONSUMER_STANDARDS.md) — full contract
2. [.cursor/rules/consumer-ux.mdc](../../rules/consumer-ux.mdc) — hard UI rules
3. [src/App.tsx](../../../src/App.tsx) — route inventory (confirm nothing new)
4. Companion refs in this folder:
   - [page-inventory.md](page-inventory.md) — routes ↔ components ↔ risk + parallel agent ids
   - [uk-pmi-checks.md](uk-pmi-checks.md) — UK PMI domain checklist
   - [report-template.md](report-template.md) — **required** per-page output shape
   - [page-agent-prompt.md](page-agent-prompt.md) — prompt contract for page subagents
   - [merge-report.md](merge-report.md) — orchestrator synthesis template

## Triggers (examples)

- “Run full consumer UX audit” → **parallel orchestrator** (below)
- “Audit Personalise” / “Audit `/benefits/axa-pmi/personalise`” → single-page path
- “Re-audit Compare for dead ends and UK PMI wording”
- “Audit against consumer standards”

## Full audit = parallel orchestrator

When the user asks for a **full** consumer UX audit:

1. Parent loads standards + inventory + merge template (do not re-audit every page yourself).
2. Resolve PMI exemplar (`axa-pmi`) and one non-PMI id from the catalogue (e.g. `lg-pension`).
3. Launch **one Task subagent per page slot** from `page-inventory.md` (**all in one parallel wave**). Use `subagent_type: generalPurpose`. Fill [page-agent-prompt.md](page-agent-prompt.md) for each.
4. Each child audits **only** its surface and returns one report-template page block.
5. If a child returns empty/errors: resume that agent once; then continue.
6. Parent merges with [merge-report.md](merge-report.md) and presents the full report to the user.
7. Still **no auto-fix** unless the user asked for fixes in the same message.

Do **not** serialise page audits on a full run. Parallel fan-out is required.

## Single-page / group workflow

```
1. Load standards + inventory + UK PMI checks + report template
2. Scope — the named route/component/group
3. Static pass — page TSX + money/BIK/copy helpers + feature detail copy
4. Live pass — browser walk if localhost/Vite is up; else note “live pass skipped”
5. Score every checklist dimension
6. Write report using report-template.md (severity-ranked); include cross-page summary only if multiple surfaces
```

### Scope

- **Full** (default for “full audit”): parallel orchestrator over every agent id in `page-inventory.md`.
- **Single**: one route, component, or group (e.g. Personalise, Compare, non-PMI stubs) — parent may audit inline or with one Task agent.
- Confirm scope in one line at the top of the report.

### Static pass

Read the primary page component and linked helpers it uses for money, tax, or copy (e.g. `BikTaxNote`, `parsePlans`, feature detail content, draft/Apply wizard pieces). Flag:

- Dictionary / casing violations (§2.2 + rule)
- Dead ends (esp. Compare “Selected for compare” with no next step)
- Stubs that look complete (non-PMI Personalise/Compare)
- BIK folded into you-pay / Apply totals
- Inconsistent CTAs / back links
- Missing post-apply success, invalid drafts, disabled CTAs without explanation
- Loading/empty/error gaps; a11y on primary controls
- UK PMI wording per `uk-pmi-checks.md`

### Live pass

When the app is reachable (typically Vite on localhost):

- Walk the happy path for the scoped surface(s)
- Snapshot/screenshot for colour semantics, sticky rail, modals
- Note keyboard/Escape/focus issues on dialogs

If the app is not running: write **Live pass: skipped** and continue with static-only confidence. Do not block the report waiting for a server unless the user asked you to start it.

### No-fix rule

- **Default:** audit and report only.
- **Fix only when** the user asked for fixes/remediation in the same request (e.g. “audit and fix blockers”).
- If both were asked: report first, then fix blockers/majors in priority order (or ask which severity to fix if unclear).

## Checklist dimensions

Score each dimension for every page/route group in scope.

| Dimension | Pass when |
|---|---|
| Design standards | Matches CONSUMER_STANDARDS + consumer-ux rule (labels, colour, cards, money, BIK, cover/access) |
| Unnecessary text | No prototype chatter, marketing fluff, or internal/dev notes on employee surfaces (one prototype-honesty line per major surface is OK) |
| Language | Calm, second person, professional UK English; jargon defined on first use |
| Bugs | Flows work; no invalid drafts left; disabled CTAs explained; empty/error/loading handled; keyboard/modals OK |
| Misleading | No fake quotes/advice; BIK not a fee; no tax-free PMI claims; no dead compare select; stubs not looking complete |
| Employee UX gaps | Post-apply success; clear next steps; mobile sticky/modal usable; journeys complete |
| UK PMI expert | Per `uk-pmi-checks.md` |
| Cash ledger integrity | You-pay vs gross vs BIK never conflated |
| Journey completeness | Entry → understand → act → confirm → visible outcome |
| Accessibility | aria-labels, dialog roles, Escape, not colour-alone |
| Mobile | Sticky price rail + modals usable |
| Trust / legal | Terms before commit; no fake provider links; not regulated advice |
| Scope honesty | Non-PMI labelled “Coming soon / limited in this version” when incomplete |
| Consistency | Same CTA/back casing across pages |
| Empty / loading / error | No blank wrong-CTA flash |
| Content QA gate | CONSUMER_STANDARDS §13 ship checklist |

## Severity

| Severity | Use for |
|---|---|
| **Blocker** | Wrong money; silent Apply success on PMI confirm path; fake advice; invalid draft left; broken primary journey |
| **Major** | Dictionary violations; misleading stubs; dead compare select; BIK called a fee; a11y gaps on primary controls |
| **Minor** | Casing, fluff copy, polish, suggested UX improvements |
| **Info** | UK PMI market nuance / common practice — not necessarily a bug |

Verdict per page:

- **Fail** — any Blocker, or multiple Majors that break trust/cash/journey
- **Pass with issues** — Majors and/or Minors only, primary journey intact
- **Pass** — no Blocker/Major; Minors/Info optional

## Output

Fill [report-template.md](report-template.md) exactly:

1. Per page (or route group): Verdict → Findings table → UK PMI notes (if relevant) → Recommended next work
2. End with **cross-page summary**: top blockers, dictionary hotspots, stub surfaces, suggested priority order (orchestrator fills this on full runs via [merge-report.md](merge-report.md))

Cite evidence as a short quote or `path:line`. Suggested fix = one line each.

## Out of scope for this skill

- Cursor Automations / scheduled PR audits (separate request)
- Implementing product backlog unless the user asked for fixes
