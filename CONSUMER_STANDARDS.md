# Consumer-ready standards — Navigator benefits app

These are the expectations the app should meet before treating the experience as employee-facing (not a loose prototype). Prefer consistency over novelty. When in doubt, cash clarity and trust beat cleverness.

---

## 1. Product purpose and audience

- **Audience:** UK employees managing employer benefits, especially PMI flex enrolment.
- **Job to be done:** Understand current cover → explore options → draft a change → understand cost and tax impact → confirm with payment/legal → see a clear outcome.
- **Prototype honesty:** If data is illustrative, say so once per major surface (grid, personalise, payment)—not on every line. Never imply a live insurer quote or regulated advice.
- **Scope honesty:** Non-PMI benefits must either work at the same depth as PMI or be clearly labelled “Coming soon / limited in this version”—no dead “Personalise” that looks real then stubs out.

---

## 2. Voice and wording

### 2.1 Tone

- Calm, plain, second person (“you / your”).
- Prefer short sentences; one idea per sentence.
- Prefer concrete nouns over jargon; when jargon is required (excess, BIK, outpatient), define it the first time it appears on that journey.
- Avoid hype, emojis, and marketing fluff on transactional screens.

### 2.2 Label dictionary (single source of truth)

Use these terms everywhere—UI, buttons, tables, emails-style copy:

| Concept | Preferred label | Avoid |
|---|---|---|
| Cheapest PMI tier | **Core** | Essential (unless showing insurer legal plan name) |
| Mid tier | **Comprehensive** | Plus (except in data/ids) |
| Top tier | **Premier** | Ultimate / Premium (unless insurer brand name) |
| Cash employee contribution | **You pay** | Employee cost (except formal confirm title) |
| Sticky draft price | **New price** | After changes (retired) |
| Enrolled price | **Current price** | Old price |
| Confirm CTA (primary) | **Apply / confirm changes** on page; **Continue** / **Continue to payment** / **Confirm and update cover** in wizard only | Mixing “Save” and “Apply” for the same action |
| Leave-guard apply | **Save / apply changes** | OK as leave-specific synonym of Apply |
| Discard | **Discard draft** | Reset / Cancel draft |
| Benefit-in-kind tax | **Est. tax** / **+ ~£X tax** | Hiding tax; calling it a “fee” |
| Employer funding | **Employer contributes £X/mo toward core** | “Free PMI” / “tax-free” |

### 2.3 Sentence patterns

- **Changes:** `A → B` or table columns **Current | After**—not both in the same block unless one is summary and one is detail.
- **Deltas:** `+£X/mo` / `−£X/mo`; never ambiguous “£X change”.
- **Warnings:** Lead with consequence, then action (“You’re paying more for a weaker cover” → Switch CTA).
- **Links in lists:** Feature names are links; surrounding status text is not (“now included”, “paid add-on”).

### 2.4 Capitalisation

- Page titles and modal titles: sentence case (“Confirm plan changes”).
- Section labels in sticky rails: small caps / uppercase tracking OK for micro-labels (“NEW PRICE”).
- Back links: consistent `‹ Back to {destination}` (capital B).

---

## 3. Visual design system

### 3.1 Layout composition

- One primary job per viewport section.
- Personalise: content column + sticky price rail; rail must remain usable on mobile (order-first, not crushed).
- Prefer full-bleed brand washes only on detail/feature headers already in the system—not new purple gradients.

### 3.2 Surfaces

- Cards: white, `rounded-[10px]`, light border, soft shadow sparingly.
- Do **not** card-ify static text; cards are for interactive clusters (add-on rows, payment method, confirm sections).
- Modals: max-width ~`max-w-lg`, scroll inside modal body, sticky actions at bottom of content (not hidden off-screen without scroll affordance).

### 3.3 Colour semantics (lock these meanings)

- **Charcoal / ink CTA:** primary progressive action.
- **Emerald:** savings, beneficial new price, “kept / added” positive state.
- **Amber:** caution—upgrade hint, paying more, capacity overflow, prototype disclaimer, limited-scope stubs.
- **Red:** validation errors only—not decorative.
- **Muted ink:** secondary explanation; never the only place a critical number appears.

### 3.4 Typography

- Hierarchy: page H1 → section H2 → micro-label → body → helper.
- Money: tabular nums; primary amount visually dominant; `/mo` secondary.
- Strikethrough = previous or unsubsidised gross—never decorative.

### 3.5 Motion

- Use sparingly: modal open/close, expand/collapse. No distracting loops on cost figures.
- Prefer instant feedback on toggle add-ons (price updates immediately).

---

## 4. Money and pricing rules

### 4.1 Cash ledger (non-negotiable)

- **You pay** / Apply totals / Current–New price = cash employee contribution only.
- Never fold BIK tax into payable totals, strikethrough maths, or confirmation £ totals.
- Employer budget applies to **core cover only**; dependants and add-ons are employee-paid—state this near add-ons and cost tables.

### 4.2 Presentation

- When employer subsidy applies: show gross struck through + **you pay** large.
- Always pair money with period (`/mo`).
- Cost tables: **Total** (gross) vs **You pay** must stay honest; footnotes/tax sit outside the sum.

### 4.3 Deltas and comparisons

- Show enrolled vs draft delta whenever draft differs.
- Upgrade suggestion only when a higher tier’s projected **you pay** is **strictly lower** after included extras drop off paid list.
- Strong warning variant when draft costs more than current **and** cover fields worsen (excess up / outpatient down / hospital list narrower).

### 4.4 Rounding and display

- Whole pounds in UI unless data forces pence; be consistent.
- Exemplary tax: round the same way everywhere (`estimateBikTax`).

---

## 5. Tax / BIK education

- Tax is educational side-note, not a charge line in the ledger.
- Inline chip: `+ ~£X tax` + (i).
- Callout: short; popover answers **why tax exists** in ≤2 short paragraphs.
- Always label rate as **illustrative / exemplary** (30% in this prototype).
- Never claim PMI is income-tax-free or that this scheme is salary sacrifice unless the product truly is—and even then do not overclaim.

---

## 6. Journey and navigation

### 6.1 Happy path completeness

Every primary journey needs: entry → understanding → action → confirmation → return state that reflects the change.

**Required for PMI Apply:** after successful confirm, show a brief success state (toast or short panel): what changed + new you-pay—not silent modal close only.

### 6.2 Draft model

- Personalise edits are **draft** until Apply succeeds.
- Leaving with draft: block with Discard / Save-apply / Stay.
- Discard restores committed answers and clears pending removals.

### 6.3 Wizard order (Apply)

1. Lost feature access (only if any losses)
2. Review changes + cost (+ upgrade warning if relevant)
3. Dependants (reasons / new details)—only if needed
4. Payment method + legal

Never put removal reasons on the same step as first reading of cover/cost changes.

### 6.4 Cross-links

- Feature names deep-link to feature detail overlays.
- Billing changes mid-apply: warn that leaving may abandon the wizard, or return to the same step after save.
- Compare “select” must have a clear next step (e.g. open Personalise with that tier)—no dead-end “Selected for compare”.

---

## 7. Cover, features, and add-ons

### 7.1 Cover switch

- Changing tier keeps add-ons that still exist as optional extras on the target tier.
- Dependant capacity overflow: modal with Remove / Undo (no Cancel that leaves an invalid draft when switch-forced).
- Do **not** interrupt tier clicks with lost-feature education; that belongs at Apply / leave-apply.

### 7.2 Lost access honesty

- Compare **access**, not merely selectedExtra IDs.
- Add-ons that become **included** on a higher tier are gains/kept access—not “removed”.
- Lost-access list: add-on-eligible items first; tier-only items second with “Only available on …”.
- Keeping as add-on: visible “Added” state; don’t vanish the row until the step is left and re-entered.

### 7.3 Feature access review

- Review expand: “You’ll gain access to” / “You’ll no longer have”.
- Cover field changes (excess, outpatient, hospital list): table **Current | After**, changed rows only.

---

## 8. Forms, validation, and errors

- Required fields marked; validate on Continue with one clear error summary or first-field focus.
- NI / DOB / names: required for new dependants before payment.
- Removal reasons required for each leaving dependant; “Other” requires text.
- Inline errors in red text near the control; don’t rely on colour alone (include text).
- Disable primary Apply when dependant overflow > 0; explain how many to remove.

---

## 9. Feedback, empty, loading, and edge states

- Loading: short “Loading…” on data-bound pages—no blank white flash of wrong CTA.
- Empty saved / empty search: say what to do next.
- No optional extras: one plain sentence—not an empty card stack.
- After dismiss of upgrade hint: stay dismissed until suggestion key (tier + extras set) changes.
- `beforeunload` when draft dirty.

---

## 10. Accessibility

- Icon-only controls need `aria-label` (info, close, expand).
- Modals: `role="dialog"`, `aria-modal`, labelled title, Escape closes, focus not trapped poorly behind overlay.
- Expand/collapse: `aria-expanded`.
- Don’t convey state by colour alone (Added badge + text; cost up/down chip + sign).
- Hit targets ≥ ~40px on mobile for primary actions.

---

## 11. Trust, legal, and compliance posture

- Payment step: explicit terms acceptance before commit.
- No fake “Go to provider” that 404s—disable or label “Demo link”.
- Distinguish **employer scheme rules** vs insurer product rules in copy when both appear.
- Don’t present the tool as regulated financial advice.

---

## 12. Component and pattern reuse

- One BIK pattern (`BikTaxNote` / popover)—don’t invent a third layout per page.
- One upgrade-hint pattern (amber callout + Switch)—reuse on Personalise, lost-access, and review; escalate visual weight on review when paying more.
- One money delta chip style for +/− £/mo.
- Prefer shared confirm-step chrome (title, helper, primary/secondary actions).

---

## 13. Content QA checklist (ship gate)

Before calling a surface consumer-ready, verify:

1. Labels match the dictionary in §2.2
2. Cash totals exclude BIK
3. Every primary action has a visible result
4. Back targets and casing are consistent
5. Warnings explain consequence + offer a next action
6. Mobile: sticky cost and modals usable without horizontal trap
7. No stub pages that look complete
8. Tier marketing names (Core/Comprehensive/Premier) shown to humans; internal ids stay in code only
