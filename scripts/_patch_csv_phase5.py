from pathlib import Path

path = Path(__file__).resolve().parents[1] / "public" / "data" / "pmi-plans.csv"
s = path.read_text(encoding="utf-8")

old1 = (
    "AXA Health's Private Medical Insurance offers fully fledged private healthcare "
    "support in the UK — so you can avoid long NHS waits where clinically appropriate "
    "and get faster access to specialists. On your current AXA Plus tier that typically "
    "means virtual GP consultations, hospital inpatient and day-case treatment, "
    "diagnostic scans, mental health support, and cancer pathways matched to the cover "
    "level you choose."
)
new1 = (
    "AXA Health private medical insurance covers private treatment in the UK when "
    "clinically appropriate. Depending on your cover level, that typically includes "
    "virtual GP consultations, hospital inpatient and day-case treatment, diagnostic "
    "scans, mental health support, and cancer pathways."
)
old2 = (
    "Flexible benefits let you adjust cover level, add dependants where the tier "
    "allows, and opt into extras during enrolment."
)
new2 = (
    "You can change cover level, add dependants where allowed, and choose extras "
    "during enrolment."
)

# Vitality teasers often start with PMI — capitalise after rewrite helper
old_v = "PMI with rewards for healthy habits"
new_v = "Medical insurance with rewards for healthy habits"

print("axa overview1", s.count(old1))
print("axa overview2", s.count(old2))
print("vitality teaser", s.count(old_v))

s2 = s.replace(old1, new1).replace(old2, new2).replace(old_v, new_v)
path.write_text(s2, encoding="utf-8")
print("written", path)
