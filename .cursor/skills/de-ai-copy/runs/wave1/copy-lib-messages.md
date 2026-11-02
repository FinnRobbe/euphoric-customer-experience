### Lib user-facing messages — `copy-lib-messages`

**Files in scope:** `src/lib/fitChecker.ts`, `src/lib/featureMatch.ts` (synthetic family blurb only), `src/lib/parsePlans.ts` (user-facing assembled strings only), `src/state/PlanContext.tsx` (load/error user strings only)  
**Verdict:** needs-rewrite  
**Confidence:** high

## Findings

| Severity | Tell(s) | Location | Quote / evidence | Suggested fix direction |
|---|---|---|---|---|
| rewrite | dictionary (§2.2); vague claim | `fitChecker.ts` · cover-level reason (~L72–74) | `You selected ${answers.coverLevel} cover, but your current plan is ${plan.tier}.` | Map `essential` / `plus` / `premier` to **Core** / **Comprehensive** / **Premier** before interpolation; one short sentence per idea. |
| rewrite | dictionary (§2.2); em dash; stacked hedge | `fitChecker.ts` · cancer reason (~L83–85) | `Essential typically limits advanced cancer pathways — Plus or Premier may fit better.` | Use **Core** / **Comprehensive** / **Premier**; split on a period instead of `—`; drop or tighten “typically”; lead with what the employee loses, then tier suggestion. |
| rewrite | vague claim | `fitChecker.ts` · priority reason (~L42–44) | `Priority “…” is not well covered on ${plan.planName}.` | Name the gap concretely (e.g. no matching included feature / tag) or soften to “We don’t see strong cover for … on this plan.” |
| rewrite | tone (§2.1 second person) | `featureMatch.ts` · synthetic family `description` (~L59) | `Include a partner and children on this cover (up to ${plan.maxDependants}).` | Second person: e.g. “You can add a partner and children (up to N).” |
| leave | domain term | `featureMatch.ts` · synthetic `featureName` (~L57) | `Family / dependant cover` | Keep; matches other providers’ naming. |
| leave | plain label | `parsePlans.ts` · `manageLabel` (~L172) | `Manage your medical insurance` | Keep. |
| leave | plain label | `parsePlans.ts` · `title` (~L148) | `Private medical insurance` | Keep (sentence case, non-hype). |
| rewrite | dev-facing error surfacing | `parsePlans.ts` · `loadCsv` throw (~L75); `PlanContext.tsx` · `setError` (~L447) | ``Failed to load ${path}`` → shown when `e.message` is used | Employee-facing copy only: e.g. “We couldn’t load your plan data. Try refreshing.” Do not expose `/data/…` paths. |
| leave | plain fallback | `PlanContext.tsx` · error fallback (~L447) | `Failed to load plan data` | Acceptable fallback if always used instead of raw `e.message`; pair with parsePlans change above. |
| leave | domain micro-label | `parsePlans.ts` · `excessLabel` (~L157) | `claim excess £${…}` | Keep “excess” as UK PMI term; optional polish only if product wants title case (“Claim excess …”) for card consistency. |

If counting strictly: multiple **rewrite** rows above; no single “clean” row.

## Notes

- `fitChecker.ts` strings are not imported elsewhere in `src` yet, but they are employee-facing reason lines in the same shape as `mismatchReasons` on Compare surfaces—tier labels should match §2.2 before wiring.
- `parsePlans.ts` `cardDescription` / `overview` lines are mostly CSV passthrough plus PMI→“medical insurance” normalisation; no AI-tell patterns in those transforms.
- `PlanContext.tsx` `usePlanState` throw (`usePlanState must be used within PlanProvider`) is developer-only; out of scope for employee copy.
- Priority text uses `priority.replaceAll('_', ' ')` (e.g. `cost_certainty` → “cost certainty”); readable but not product labels—consider a small display map if shown in UI.

