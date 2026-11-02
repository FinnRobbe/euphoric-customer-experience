### PMI CSV narratives — `copy-csv-pmi`

**Files in scope:** `public/data/pmi-plans.csv` — columns `summary`, `overview_1`, `overview_2`, `card_description`, `description`, `access_notes` (107 rows; 9 `plan_id`s)  
**Verdict:** fixed-residual  
**Confidence:** high

## Wave 3 residual pass (2026-11-01)

| Area | Change |
|---|---|
| Bupa/Vitality `description` | Tier- and provider-specific copy per feature (cancer, outpatient, hospital list, dependants, travel, mental, physio, GP, dental). Removed shared “pathway support” lines. |
| Bupa/Vitality `summary` | Kept prototype honesty; added one concrete fact per tier (excess, outpatient cap, dependants). |
| AXA Core `overview_1` | Split inventory into two short sentences; dropped redundant mental health phone assessment. |
| Vitality `overview_1` | Single rewards caveat on Core only; removed duplicate hedges from Comprehensive and Premier blocks. |

Plan-level fields remain identical across all rows sharing the same `plan_id`.

## Notes

- Domain terms (`day-case`, `pre-authorisation`) and §2.2 tier labels unchanged.
- AXA feature rows unchanged in this pass; prior wave copy retained.
