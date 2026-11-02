### LG life feature details — `copy-feat-lg-life`

**Files in scope:** `src/data/featureDetails/lg-life.ts` (6 features: `life-sum`, `life-beneficiaries`, `life-topup`, `life-illness`, `life-claims`, `life-docs`)  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | stacked hedges; polished tone | `lg-life.ts` · all six `featureId`s · `overview` / `costSummary` / FAQs | Almost every block chains “usually”, “typically”, “often”, “normally”, and “may” (e.g. sum assured overview: “It is **usually** set…”; claims overview: “beneficiaries or the employer **usually** notify…”) | Keep one clear caveat per block (employer rules / scheme booklet); swap hedges for direct “you” statements where facts allow |
| rewrite | em dash overuse | `lg-life.ts` · 13 strings (e.g. `life-sum` `costSummary`, `life-beneficiaries` `includedItems[2]`, `life-illness` `overview`, `life-claims` FAQs/access) | “life event window—check your employer’s scheme rules”; “specified serious conditions—not on death—subject to definitions” | Split into two sentences or use a comma; avoid paired em dashes in one sentence |
| rewrite | repetitive structure (pack cadence) | `lg-life.ts` · all six · `includedIntro` + `accessSteps` | Intros: “you can **typically** see”, “**usually** cover”, “**typically** includes”, “**typically** covers”, “you can **usually** access”; steps: sign in → open section → review → submit/contact (×6) | Vary intros (lead with the benefit or action); shorten steps; don’t mirror the same four-beat list on every feature |
| rewrite | voice (§2.1 second person) | `lg-life.ts` · `featureId=life-claims` · `overview` | “If **a member** dies in service, beneficiaries or the employer usually notify…” | Reframe for beneficiaries/HR reader in “you/your” or plain “the family” without generic “a member”; match rest of pack |
| rewrite | long sentences; vague claims | `lg-life.ts` · `featureId=life-claims` · `includedItems[3]` | “**Typical timeframes** once a complete claim is received, and how payments are made to beneficiaries.” | Replace “typical timeframes” with the same concrete range already in FAQ (“often settled within a few weeks”) or drop the bullet if it duplicates FAQ |
| rewrite | redundant conclusion | `lg-life.ts` · `life-beneficiaries` FAQ + `life-claims` FAQ | Nomination delay theme repeated: “keeping a current nomination is important” / “another reason to keep beneficiaries current” / “An outdated nomination can delay payment” | Say once per journey; in claims FAQ, answer the question first without re-pitching nominations |
| rewrite | polished tone; passive stack | `lg-life.ts` · `featureId=life-beneficiaries` · `overview` | “Keeping nominations up to date **helps Legal & General and your employer pay the benefit quickly to the right recipients**.” | Shorter: what you should do and why (faster payment to who you chose) |
| rewrite | access-step opener repetition | `lg-life.ts` · `life-sum`, `life-topup`, `life-docs` · `accessSteps[0]` | “**Sign in** to your employer benefits portal…” (also “Log in” on beneficiaries) | Alternate first step (e.g. “Ask HR which portal you use” only where needed; one feature can start at the document name) |
| leave | domain / product terms | `lg-life.ts` · multiple | “death-in-service”, “sum assured”, “expression-of-wish”, “discretionary trust”, “pensionable earnings” | Keep; define only if UI has no glossary elsewhere |
| leave | “Core” as employer base cover | `lg-life.ts` · `life-sum` `costSummary`, `life-topup` | “**Core** death-in-service cover”, “core level your employer provides” | Not PMI tier **Core** from §2.2; lowercase “core” where it means employer-funded base is fine |

## Notes

- No §2.2 dictionary violations spotted (no Essential/Plus UI labels; “You pay” appears appropriately for voluntary top-up premium, not PMI cash ledger).
- `map.label` / `queryTemplate` strings read like generic place-search stubs (“Find health advice near you” on critical illness); low severity unless those maps are enabled in UI (`life-claims` map is `enabled: true`).
- Tax copy in claims FAQ is appropriately cautious (income tax vs IHT); avoid adding more hedges on top of HMRC/scheme caveat.

