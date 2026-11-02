### Non-PMI benefits catalogue — `copy-catalog`

**Files in scope:** `src/data/benefitsCatalog.ts` (six non-PMI entries: `lg-pension`, `aviva-retirement`, `lg-life`, `bhn-bikes`, `pen-travel`, `chubb-accident`)  
**Verdict:** clean  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | repetitive structure (low) | `benefitsCatalog.ts` · multiple · `overview[1]` | “Review projected outcomes…”, “Review beneficiaries…”, “Browse eligible retailers…”, “Review benefit amounts…” | Optional polish: vary second-paragraph openers (not all Review/Browse/Personalise). |
| leave | prototype honesty | `benefitsCatalog.ts` · `lg-pension` · `overview[1]`; stub `features[].description` | “This prototype page summarises…”, “(prototype stub)” | Keep. |
| leave | domain / scheme terms | `benefitsCatalog.ts` · `bhn-bikes` · `overview[0]` | “salary sacrifice”, “subject to scheme rules” | Keep; one caveat is enough. |
| leave | second person; calm tone | `benefitsCatalog.ts` · card copy and overviews (post–Wave 2) | “Your employer tops up…”, “When you leave work, see how…” | Keep. |
| leave | domain hyphen | `benefitsCatalog.ts` · comments only | N/A in user strings | — |

## Notes

- Wave 2 addressed em dashes, third-person card blurbs, stacked “typically”, and provider-first Chubb opener (`You get cash benefits from Chubb…`).
- §2.2: no PMI tier labels in this file; `manageLabel` you/your is consistent with §2.1.
- Residual tell is mild catalogue rhythm on `overview[1]` only; feature blurbs are varied enough for prototype scope.
