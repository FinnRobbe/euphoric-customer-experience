# Merge report — de-AI copy orchestrator

Parent fills after each wave.

## Wave 1 merge

```markdown
# De-AI copy — Wave 1 audit merge

- **Date:** {YYYY-MM-DD}
- **Agents returned:** {N} / 17
- **Retries:** {none | list}
- **Packs needing rewrite:** {list agent ids}
- **Clean packs:** {list}

## Per-pack findings
{Paste each agent section in inventory order}
```

## Final merge (after Wave 2–3)

```markdown
# De-AI copy — run summary

- **Date:** {YYYY-MM-DD}
- **Waves:** audit → rewrite → critic
- **Agents:** Wave1 {n}/17 · Wave2 {n}/17 · Wave3 {n}/17
- **Critic failures resumed:** {none | list}

## Per-pack change summary
| Agent id | Edited? | Notes |
|---|---|---|
| copy-feat-axa | yes/no | … |

## Residual risks
- …
```
