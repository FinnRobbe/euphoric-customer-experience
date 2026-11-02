# Existing visual system — Disney Benefits+ / Euphoric Navigator

Derived from the three reference screenshots in `references/`. Values are observational (approximate), not extracted design tokens from code.

---

## 1. Product framing

| Attribute | Observation |
|-----------|-------------|
| Surface | Employee benefits portal inside Euphoric Navigator |
| Tenant branding | “Disney Benefits+” wordmark in sidebar |
| Tone | Clean enterprise / HR SaaS — airy, card-led, low chrome noise |
| Color strategy | Mostly neutral UI; **provider brand color** carries identity on cards and detail headers |

Flexible PMI work should inherit this shell and card language so it reads as Navigator, not a bolted-on microsite.

---

## 2. Layout architecture

### App shell (all screens)

```
┌──────────┬────────────────────────────────────────────┐
│ Sidebar  │ Main canvas                                │
│ ~240px   │                                            │
│          │  [ page-specific header / filters ]        │
│ Logo     │                                            │
│ Search   │  [ primary content: grid | detail | modal ]│
│ Nav      │                                            │
│ …        │                                            │
│ Profile  │                                            │
└──────────┴────────────────────────────────────────────┘
```

- **Sidebar:** Fixed left; light gray wash vs pure white main; vertical stack.
- **Main:** Single scrollable column; content max width feels wide (catalog uses ~4-up cards).
- **Detail page:** Soft **tinted header band** (lavender for AXA PMI) then white content; **2-column** body — wide left (overview + features), narrow right rail (plan actions).
- **Modal:** Large overlay (~½–⅔ viewport width), centered/right-weighted, page behind remains visible but secondary.

### Hierarchy rules

1. Shell never competes with page content (muted sidebar, quiet icons).
2. Page identity comes from **title + provider mark**, not from heavy page chrome.
3. Actions live in **cards / rails / chips**, not a dense top toolbar.

---

## 3. Color

### Neutrals (system)

| Role | Approx. treatment |
|------|-------------------|
| App background (main) | Near-white / soft cool gray |
| Sidebar | Slightly cooler / grayer than main |
| Surfaces (cards, modal) | Pure white |
| Borders | Hairline cool gray |
| Primary text | Near-black / charcoal |
| Secondary text | Mid gray (descriptions, provider labels) |
| Active UI (tabs, chips) | Solid charcoal/black fill, white label |
| Inactive UI | Transparent / light gray fill, dark label |
| Nav active | Soft gray pill + thin vertical accent bar (purple/charcoal) |

### Accent & brand

| Role | Observation |
|------|-------------|
| PMI detail header wash | Pale lavender / lilac (tied to AXA card story) |
| Provider card headers | Strong solid fields per insurer (AXA purple, Bupa blue, L&G gray, Aviva yellow, Chubb coral, etc.) |
| Logo marks | Full provider brand (e.g. AXA blue square + red slash) — not recolored to system accents |
| Interactive accent | Minimal; black/charcoal for selection; provider color is decorative/identity, not primary CTA fill |

**Guidance for flexible PMI:** Prefer neutrals + charcoal selection states. Use provider/plan color only for **identity bands** and logos, consistent with the Insurance grid.

---

## 4. Typography

| Level | Treatment |
|-------|-----------|
| Font | Clean modern UI sans (Inter-like); no display/serif |
| Page / section titles | Bold, large (e.g. “Private Medical Insurance”, “Insurance (8)”, “Included features”) |
| Card titles | Semibold/bold, medium size, 1–2 lines |
| Provider / meta | Small, regular, light gray |
| Body / overview | Regular, dark gray, comfortable line-height, multi-sentence |
| Feature blurbs | Smaller regular gray, ~2–3 lines, truncate as needed |
| Controls | Medium weight on active segments/chips |

No ornamental type. Hierarchy is weight + size + gray value only.

---

## 5. Elevation, radius, spacing

| Token-like idea | Observation |
|-----------------|-------------|
| Corner radius | Consistently soft (~8–12px) on cards, search, chips, modal |
| Shadows | Subtle; cards lift slightly; modal stronger than page cards; hover darkens border / deepens shadow |
| Borders | Thin gray; hover may emphasize border over heavy shadow |
| Density | Generous padding and gaps — catalog and modal still readable in grids |
| Icon style | Thin outline (nav, search, heart save, external link) |

---

## 6. Component inventory

### 6.1 Sidebar

- Wordmark (tenant product name)
- **Search or ask** — rounded field, leading magnifying glass (search + conversational affordance)
- Nav items: icon + label — Home, Chat, **Benefits**, Policies, Saved
- Active: filled row + left edge indicator
- Footer: avatar (initials/color) + name + disclosure chevron

### 6.2 Segmented tabs (catalog)

- Pill group with **counts in labels**: Benefits (33), Explore (119), External (27)
- Active: black fill / white text; inactive: ghost / light

### 6.3 Filter chips

- Horizontal pills with optional leading icon (heart, cloud, sun…)
- Same active language as segments (black fill)
- Used to slice benefit types: All / Insurance / Non-insurance / Company-delivered

### 6.4 Benefit card (catalog)

Vertical card:

1. **Color header block** (~40% height) — solid provider-tinted field
2. Optional **badge** top-left (e.g. “35 features” / “55 features”) — small translucent pill
3. Centered **provider logo**
4. Body: provider name → bold benefit title → 2–3 line gray summary
5. Light border, soft radius; grid ~3–4 columns on desktop

### 6.5 Benefit detail header

- Breadcrumb: back chevron + `Benefits > {Benefit name}`
- Large square **provider logo** + small provider name + large benefit title
- Sits on **tinted band** (not a card)

### 6.6 Content cards (detail)

- **Overview:** titled card, paragraph copy
- **Plan information** (right rail): titled card, primary text action **Manage benefit** + external-link icon
- White surface, soft shadow, rounded

### 6.7 Feature card (preview + modal)

Shared anatomy:

- Top-left: small provider logo
- Top-right: outline **heart** (save)
- Bold feature title
- Short gray description
- Used in horizontal **preview strip** on detail; full **See all** opens modal grid (≈3 columns)

### 6.8 Included features modal

- Title + dismiss (X)
- Scrollable multi-column feature card grid
- Backdrop: dimmed/underlaid detail page
- Hover/focus: stronger border/shadow on card

### 6.9 Links & CTAs

- Text/link style for secondary navigation (“See all”)
- **Manage benefit** reads as primary plan action but visually quiet (text + icon, not a loud filled brand button)
- External destinations signaled with external-link icon

---

## 7. Interaction patterns

| Pattern | Behavior |
|---------|----------|
| Browse → detail | Catalog card → detail with tinted identity header |
| Progressive disclosure | Feature strip + **See all** → modal inventory |
| Save | Heart on feature cards (outline; likely toggle fill when saved) |
| Filter | Segment (scope) then chip (type) — counts stay visible |
| Leave platform | Manage benefit / external icon — expect third-party or deeper Navigator route |
| Search | Global “Search or ask” in shell (not page-local only) |

---

## 8. Content & information patterns

- **Counts everywhere** that help orientation: tab counts, section “(8)”, feature badges on cards.
- **Provider-first identity** on insurance benefits (logo + color), then benefit name.
- **Feature** = named clinical/service capability under a plan (e.g. Virtual GP, Physiotherapy), not the plan itself.
- Copy is plain, benefit-led, short on cards / longer in Overview.

---

## 9. Do / don’t for the flexible PMI prototype

**Do**

- Keep the left shell, search, and nav model.
- Use charcoal active states for filters/steps; keep surfaces white and airy.
- Express plan/provider identity with logo + soft header wash / card header color — not a purple-system theme.
- Reuse benefit card / feature card / modal / right-rail action patterns when showing plan options, covered features, or management links.
- Prefer cards as **interaction containers** (select plan, open feature, save), matching the existing product.

**Don’t**

- Introduce a separate visual brand, dark mode, or heavy dashboard chrome for the PMI experiment.
- Overwhelm the first view with stats strips or stacked promo chips; the existing UI is restrained.
- Recolor provider logos to a single system accent.
- Replace “See all → modal” with a wholly different disclosure pattern unless the prototype explicitly needs it — default to this language.

---

## 10. Open questions for later (not blocking this doc)

- Exact design tokens (hex, type scale, spacing scale) from Navigator source or Figma.
- Whether flexible PMI is a new benefit card type, a wizard inside detail, or a dedicated flow under Benefits.
- How “flexible” choices (excess, outpatient, hospital lists, etc.) map onto existing Plan information / Manage benefit vs in-product controls.

No implementation until those product decisions are made against this guidance.
