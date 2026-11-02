"""One-off: differentiate Bupa vs Vitality rows. Deletes itself after use."""
import csv
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "public" / "data" / "pmi-plans.csv"

PLANS = {
    "bupa-essential": {
        "hospital_list": "Bupa Partnership list",
        "summary": "Bupa Core in this prototype. £500 excess, Bupa Partnership hospitals, and 3 outpatient consultations included each year. A paid extra raises outpatient to £1,000 a year.",
        "overview_1": "Bupa Core focuses on the Partnership hospital list and digital GP access, with a £500 excess. Surgery and specialist-requested scans sit inside hospital and outpatient cover.",
        "overview_2": "Dependants are not on Core. The 3 outpatient consultations are included. Cancer care and talking therapies need an upgrade or a paid extra.",
        "card_description": "£500 excess, Bupa Partnership list, 3 outpatient consultations included. Digital GP included.",
    },
    "bupa-plus": {
        "hospital_list": "Bupa Extended Choice",
        "summary": "Bupa Comprehensive in this prototype. £200 excess, Bupa Extended Choice hospitals, up to £1,000 outpatient, and up to 3 dependants. Newer cancer drugs are not on this tier.",
        "overview_1": "Bupa Comprehensive covers private UK treatment on the Extended Choice hospital list, with a lower excess than Core. Newer biological cancer drugs are on Premier.",
        "overview_2": "Up to 3 dependants can be added. You pay their premiums. Travel and dental stay optional paid extras.",
        "card_description": "£200 excess, Bupa Extended Choice, £1,000 outpatient. Newer cancer drugs on Premier.",
    },
    "bupa-premier": {
        "hospital_list": "Bupa Extended Choice",
        "summary": "Bupa Premier in this prototype. £100 excess, unlimited outpatient, Bupa Extended Choice hospitals, and newer biological cancer drugs. Up to 5 dependants.",
        "overview_1": "Bupa Premier keeps the Extended Choice hospital list and includes newer biological cancer drugs on an approved list. Outpatient has no yearly cap in this prototype.",
        "overview_2": "Dental remains an optional paid extra. You pay dependant premiums. Travel is included.",
        "card_description": "£100 excess, Bupa Extended Choice, unlimited outpatient. Newer cancer drugs included.",
    },
    "vitality-essential": {
        "hospital_list": "Vitality Local list",
        "summary": "Vitality Core in this prototype. £400 excess, a local hospital list, and 3 outpatient consultations included. Activity rewards do not change the price.",
        "overview_1": "Vitality Core focuses on the Local hospital list and digital GP access, with a £400 excess. Activity rewards are included and do not change the monthly price in this prototype.",
        "overview_2": "The 3 outpatient consultations are included. Cancer care, talking therapies, and dependants need an upgrade or extras on Core.",
        "card_description": "£400 excess, Vitality Local list, 3 outpatient consultations included. Rewards are not in the price.",
    },
    "vitality-plus": {
        "hospital_list": "Vitality Extended Countrywide",
        "summary": "Vitality Comprehensive in this prototype. £150 excess, the Extended Countrywide hospital list, up to £1,000 outpatient, and up to 3 dependants. Rewards do not change the price.",
        "overview_1": "Vitality Comprehensive covers private UK treatment on the Extended Countrywide list. Newer biological cancer drugs are not included. Activity rewards do not change the monthly price in this prototype.",
        "overview_2": "Up to 3 dependants can be added. You pay their premiums. Travel and dental are optional extras.",
        "card_description": "£150 excess, Vitality Extended Countrywide, £1,000 outpatient. Rewards are not in the price.",
    },
    "vitality-premier": {
        "hospital_list": "Vitality Wider Countrywide",
        "summary": "Vitality Premier in this prototype. £75 excess, the Wider Countrywide hospital list, unlimited outpatient, and up to 5 dependants. Newer cancer drugs are not included. Rewards do not change the price.",
        "overview_1": "Vitality Premier uses the Wider Countrywide hospital list and unlimited outpatient. Newer biological cancer drugs are not on this tier. Activity rewards do not change the monthly price in this prototype.",
        "overview_2": "Dental is an optional paid extra. You pay dependant premiums. Travel is included.",
        "card_description": "£75 excess, Vitality Wider Countrywide, unlimited outpatient. Rewards are not in the price.",
    },
}

HOSPITAL = "Inpatient and day-case care, including surgery for bones and joints when your consultant says it is needed, on the {list}."
OUT = {
    "essential": "Up to 3 specialist consultations a year, including MRI, CT and ultrasound when a specialist requests them. Included on Core.",
    "plus": "Specialist consultations and specialist-requested MRI, CT and ultrasound, within your £1,000 outpatient limit.",
    "premier": "Specialist consultations and specialist-requested MRI, CT and ultrasound. No yearly outpatient cap on Premier.",
}
CANCER_OFF = "Cancer tests and treatment are not on Core. Upgrade to Comprehensive or Premier for that pathway."
CANCER_NO_DRUGS = "Tests, surgery, chemotherapy and radiotherapy after referral. Newer biological cancer drugs are not included on this tier."
CANCER_WITH_DRUGS = "Tests, surgery, chemotherapy, radiotherapy, and newer biological cancer drugs on an approved list."
MENTAL_IN = "Talking therapies are included after a short assessment. You can self-refer or go through your GP."
FAMILY = {
    "bupa-plus": "Add a partner and up to 3 children. You pay their monthly premiums. The employer amount is for core cover only.",
    "bupa-premier": "Add a partner and up to 5 children. You pay their monthly premiums. The employer amount is for core cover only.",
    "vitality-plus": "Add a partner and up to 3 children. You pay their monthly premiums. The employer amount is for core cover only.",
    "vitality-premier": "Add a partner and up to 5 children. You pay their monthly premiums. The employer amount is for core cover only.",
}

MONEY_KEYS = (
    "monthly_employee_cost_gbp",
    "employer_contribution_gbp",
    "excess_gbp",
    "outpatient_cover",
    "dependants_allowed",
    "max_dependants",
    "child_monthly_cost_gbp",
    "partner_monthly_cost_gbp",
)


def feature_updates(row: dict) -> dict:
    pid = row["plan_id"]
    fid = row["feature_id"]
    tier = row["tier"]
    updates = {}
    if fid in ("bupa-hospital", "vitality-hospital"):
        updates["description"] = HOSPITAL.format(list=PLANS[pid]["hospital_list"])
    elif fid in ("bupa-outpatient", "vitality-outpatient"):
        updates["description"] = OUT[tier]
    elif fid in ("bupa-cancer", "vitality-cancer"):
        if tier == "essential":
            updates["description"] = CANCER_OFF
        elif pid == "bupa-premier":
            updates["description"] = CANCER_WITH_DRUGS
        else:
            updates["description"] = CANCER_NO_DRUGS
    elif fid in ("bupa-mental", "vitality-mental") and tier != "essential":
        updates["description"] = MENTAL_IN
    elif fid in ("bupa-family", "vitality-family") and pid in FAMILY:
        updates["description"] = FAMILY[pid]
    return updates


def rewards_row(row: dict) -> dict:
    reward = dict(row)
    reward.update(
        {
            "feature_id": "vitality-rewards",
            "feature_name": "Vitality rewards (not in the price)",
            "category": "Lifestyle",
            "description": "Partner rewards such as cinema and coffee when you track activity. They do not change the monthly price in this prototype.",
            "included": "yes",
            "access_notes": "Not part of the price",
            "min_age": "18",
            "max_age": "99",
            "suitable_genders": "any",
            "requires_dependant": "no",
            "relevancy_tags": "lifestyle",
            "optional_extra": "no",
            "extra_monthly_cost_gbp": "0",
        }
    )
    return reward


def main() -> None:
    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        assert fieldnames
        original = list(reader)

    money_before = [
        tuple(r[k] for k in MONEY_KEYS) + (r["plan_id"], r["feature_id"], r["included"], r["optional_extra"])
        for r in original
    ]
    axa_before = [dict(r) for r in original if r["provider"] == "AXA Health"]

    final = []
    for i, row in enumerate(original):
        updated = dict(row)
        if updated["plan_id"] in PLANS:
            updated.update(PLANS[updated["plan_id"]])
            updated.update(feature_updates(updated))
        final.append(updated)
        nxt = original[i + 1]["plan_id"] if i + 1 < len(original) else None
        if updated["plan_id"].startswith("vitality-") and nxt != updated["plan_id"]:
            final.append(rewards_row(updated))

    money_after_src = [
        tuple(r[k] for k in MONEY_KEYS) + (r["plan_id"], r["feature_id"], r["included"], r["optional_extra"])
        for r in final
        if r["feature_id"] != "vitality-rewards"
    ]
    assert money_before == money_after_src, "funding or outpatient flags changed"
    axa_after = [r for r in final if r["provider"] == "AXA Health"]
    assert axa_after == axa_before, "AXA rows changed"

    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, lineterminator="\r\n", quoting=csv.QUOTE_ALL)
        writer.writeheader()
        writer.writerows(final)

    print(f"rows {len(original)} -> {len(final)}")


if __name__ == "__main__":
    main()
