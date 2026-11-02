# Euphoric customer experience — Flexible PMI prototype

Employee-facing **Navigator-style** prototype for UK Private Medical Insurance (PMI) flexible benefits. Visual language follows the Disney Benefits+ / Euphoric Navigator references in `visual-guidance/`.

**This is a dummy prototype** — not live Disney, AXA, or Euphoric production data.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build   # production build
npm run preview # preview the build
```

## Demo path (~8 minutes)

Clear saved prototype state first (DevTools → Application → Local Storage → remove keys starting with `navigator-`), then hard-refresh. Otherwise a previous Apply can override the CSV enrolled plan.

1. **Home → AXA** — Card and detail overview both describe **Comprehensive** (CSV `is_current_plan`). Headline **You pay** is household cash; the bar is labelled as core list-price share.
2. **Personalise** — Soft fit reasons and a priority suggestion appear for the demo profile (partner + child). Add **Dental** (or switch to Premier), then **Apply**. Success toast / detail You pay should update.
3. **Core overflow** — Select **Core** with the family still on the draft. Apply stays blocked; the rail says the household doesn’t fit — never “Same cash cost if you apply”.
4. **Model a switch (Bupa)** — From Bupa detail → Model a switch. Keep/Lose should not invent cancer or day-case losses beside a kept cancer pathway. Matrix **You pay** matches the rail household total.
5. **Ask on Personalise** — Collapsed nav still has Search or ask. Type something unmatched (e.g. “pension”) — reply says it only knows the listed topics; it must **not** fall through to the excess FAQ.

## Routes

| Path | Page |
|------|------|
| `/` | Benefits grid (PMI + other benefits) |
| `/benefits/{benefit_id}` | Benefit detail (e.g. `axa-pmi`, `bupa-pmi`, `vitality-pmi`) |
| `/benefits/{benefit_id}/features` | Full-page product functions |
| `/benefits/{benefit_id}/personalise` | Cover, dependants, extras, cost + soft fit tips |
| `/benefits/{benefit_id}/compare` | Compare providers and cover levels |
| `/terms.pdf` | Terms & conditions PDF |

## PMI plan data (single CSV)

All PMI health covers (AXA, Bupa, Vitality × Essential / Plus / Premier) live in one file:

**`public/data/pmi-plans.csv`**

The app fetches this CSV at runtime. Edit the file and refresh the browser to update prices, features, overview copy, card colours/logos, and the default “Your current plan” — no code rebuild required for data edits.

### Editing rules

- One row = one feature; plan-level fields (prices, colours, overviews, etc.) are repeated on every row for that `plan_id`.
- Set **`is_current_plan`** to `yes` on every row for **exactly one** `plan_id` (prototype default: `axa-plus`). All other plans should be `no`. That flag is the only source of the fixed **Your current plan** badge on the home grid (and Compare). Clicking other PMI cards does **not** move that badge — change it only by editing the CSV and refreshing.
- `benefit_id` values map to routes: `axa-pmi`, `bupa-pmi`, `vitality-pmi` → `/benefits/{benefit_id}`.

Non-PMI benefits (pension, travel, etc.) stay in `src/data/benefitsCatalog.ts`.

Demo employee defaults: `public/data/employee-profile.json` (Finn — partner + child, priorities include mental health, family, cancer, GP access).

## Fit tips & ask (mock AI)

Personalise runs a **rule-based** fit check against the draft + profile and shows mismatch reasons on the page (and a priority suggestion when an add-on or higher tier matches a profile priority). It does **not** auto-navigate to Compare.

Sidebar **Search or ask** stays usable when the nav collapses on Personalise / Compare / Features. Replies are canned; unmatched input says which topics are known instead of defaulting to the excess script.

## Visual guidance

See `visual-guidance/` for the captured Navigator shell, cards, and interaction patterns this UI inherits.
