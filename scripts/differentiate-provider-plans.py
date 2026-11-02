"""Differentiate PMI plan names, core prices, dependant costs, and add-on prices per provider."""
from __future__ import annotations

import csv
from pathlib import Path

CSV_PATH = Path(__file__).resolve().parents[1] / "public" / "data" / "pmi-plans.csv"

# plan_name, employee_core, employer_core, partner, child
PLAN_META: dict[tuple[str, str], tuple[str, int, int, int, int]] = {
    ("axa-pmi", "essential"): ("AXA Health Core", 0, 45, 18, 12),
    ("axa-pmi", "plus"): ("AXA Health Comprehensive", 0, 60, 18, 12),
    ("axa-pmi", "premier"): ("AXA Health Premier", 28, 60, 20, 14),
    ("bupa-pmi", "essential"): ("Bupa Select", 8, 40, 22, 15),
    ("bupa-pmi", "plus"): ("Bupa Complete", 12, 55, 24, 16),
    ("bupa-pmi", "premier"): ("Bupa Ultimate", 38, 55, 26, 18),
    ("vitality-pmi", "essential"): ("Vitality Base", 0, 50, 15, 10),
    ("vitality-pmi", "plus"): ("Vitality Enhanced", 10, 55, 16, 11),
    ("vitality-pmi", "premier"): ("Vitality Premium", 32, 55, 18, 12),
}

# (benefit_id, feature_id) -> cost by tier essential/plus/premier (None = leave / N/A)
EXTRA_COST: dict[tuple[str, str], dict[str, int]] = {
    ("axa-pmi", "physio"): {"essential": 6},
    ("axa-pmi", "mental-talk"): {"essential": 8},
    ("axa-pmi", "outpatient-consult"): {"essential": 10},
    ("axa-pmi", "travel-extra"): {"essential": 4, "plus": 4},
    ("axa-pmi", "dental-extra"): {"plus": 7, "premier": 5},
    ("axa-pmi", "fertility"): {"plus": 15},
    ("bupa-pmi", "bupa-physio"): {"essential": 9},
    ("bupa-pmi", "bupa-mental"): {"essential": 11},
    ("bupa-pmi", "bupa-outpatient"): {"essential": 14},
    ("bupa-pmi", "bupa-travel"): {"essential": 6, "plus": 5},
    ("bupa-pmi", "bupa-dental"): {"essential": 10, "plus": 8, "premier": 7},
    ("vitality-pmi", "vitality-physio"): {"essential": 5},
    ("vitality-pmi", "vitality-mental"): {"essential": 7},
    ("vitality-pmi", "vitality-outpatient"): {"essential": 9},
    ("vitality-pmi", "vitality-travel"): {"essential": 3, "plus": 3},
    ("vitality-pmi", "vitality-dental"): {"essential": 6, "plus": 5, "premier": 4},
}


def main() -> None:
    with CSV_PATH.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
        fieldnames = list(rows[0].keys()) if rows else []

    for col in ("partner_monthly_cost_gbp", "child_monthly_cost_gbp"):
        if col not in fieldnames:
            # insert after max_dependants
            idx = fieldnames.index("max_dependants") + 1
            fieldnames.insert(idx, col)

    for row in rows:
        benefit = row["benefit_id"].strip()
        tier = row["tier"].strip().lower()
        meta = PLAN_META.get((benefit, tier))
        if meta:
            name, emp, employer, partner, child = meta
            row["plan_name"] = name
            row["monthly_employee_cost_gbp"] = str(emp)
            row["employer_contribution_gbp"] = str(employer)
            row["partner_monthly_cost_gbp"] = str(partner)
            row["child_monthly_cost_gbp"] = str(child)

        fid = row["feature_id"].strip()
        costs = EXTRA_COST.get((benefit, fid))
        if costs and tier in costs and row.get("optional_extra", "").strip().lower() == "yes":
            row["extra_monthly_cost_gbp"] = str(costs[tier])

        # ensure columns exist on every row
        row.setdefault("partner_monthly_cost_gbp", "18")
        row.setdefault("child_monthly_cost_gbp", "12")

    with CSV_PATH.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Updated {len(rows)} rows in {CSV_PATH}")


if __name__ == "__main__":
    main()
