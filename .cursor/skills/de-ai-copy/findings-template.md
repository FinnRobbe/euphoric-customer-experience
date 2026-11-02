# Findings template (Wave 1 — audit)

Each audit agent returns markdown in this shape only.

```markdown
### {{TITLE}} — `{{AGENT_ID}}`

**Files in scope:** …
**Verdict:** clean | needs-rewrite | sparse-copy
**Confidence:** high | medium | low

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | polished tone; em dash | `path` · `featureId=…` / JSX near “…” | “…” | Split sentence; drop hedge |
| leave | domain hyphen | … | “day-case” | Keep |

If no issues: write one row `— | none | — | No AI tells found in scope | —`

## Notes
- {Optional: patterns repeated across this pack}
```

Severity:

- **rewrite** — change the string
- **leave** — real domain term or dictionary label; do not “humanize” away
