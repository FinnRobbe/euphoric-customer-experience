# Consumer UX audit report template

Agents **must** fill this shape. Omit empty optional sections; do not invent extra top-level sections.

---

## Header

```markdown
# Consumer UX audit — {scope label}

- **Date:** {YYYY-MM-DD}
- **Scope:** {full inventory | route/component list}
- **Standards loaded:** CONSUMER_STANDARDS.md, consumer-ux.mdc, page-inventory.md, uk-pmi-checks.md
- **Live pass:** {completed | skipped — reason}
- **Confidence:** {high (static+live) | medium (static only) | low (partial files)}
```

---

## Per page / route group

Repeat one block per audited surface (use inventory titles).

```markdown
### {Route or group name} — `{path}`

**Component:** `{PrimaryComponent}`  
**Verdict:** Pass | Pass with issues | Fail

#### Findings

| Severity | Dimension | Evidence | Suggested fix |
|---|---|---|---|
| Blocker / Major / Minor / Info | {dimension from SKILL.md} | `{quote}` or `path:line` | One-line remediation |

_(If none: “No findings.”)_

#### UK PMI notes

- {Only where relevant; else omit this subsection}

#### Recommended next work

1. {Ordered backlog for this surface — employee experience first}
2. …
```

---

## Cross-page summary (required at end)

```markdown
## Cross-page summary

### Top blockers
- {bullet list, or “None”}

### Dictionary hotspots
- {label/casing mismatches clustered by term, or “None”}

### Stub / limited-scope surfaces
- {routes that are placeholders or incomplete vs PMI depth}

### Suggested priority order
1. {Fix / product work order across the app}
2. …
3. …

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

---

## Severity & verdict reminder

- **Blocker** → page **Fail**
- Multiple trust/cash/journey **Majors** → usually **Fail**
- Majors/Minors only, journey intact → **Pass with issues**
- No Blocker/Major → **Pass**

Do not auto-fix findings unless the user asked for fixes in the same message.
