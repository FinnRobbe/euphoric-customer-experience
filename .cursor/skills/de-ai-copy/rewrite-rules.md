# Rewrite rules

Voice target: [CONSUMER_STANDARDS.md](../../../CONSUMER_STANDARDS.md) §2.1 — calm, plain, second person (“you / your”), short sentences, one idea per sentence.

## Must preserve

- Dictionary labels from §2.2 verbatim: **Core**, **Comprehensive**, **Premier**, **You pay**, **Current price**, **New price**, **Apply / confirm changes**, **Discard draft**, **Est. tax** / **+ ~£X tax**, employer-contribute phrasing as specified in standards
- Cover facts: excess, outpatient limits, hospital lists, what’s included vs add-on, BIK as tax not a fee
- Prototype honesty / limited-scope disclaimers (do not soft-pedal)
- Internal ids, routes, `featureId`s, CSV keys, TypeScript structure

## Domain hyphens — keep

Do **not** strip these under “hyphen overuse”: `day-case`, `Benefit-in-Kind`, `pre-authorisation`, `National Insurance`, `self-referral`, `fit note` compounds that are real UK benefits terms.

## Style moves

- Prefer periods over em dashes; split long sentences
- Cut stacked hedges; one concrete caveat is enough
- Vary sentence openings; avoid the same “This benefit…” / “Through your…” opener on every block
- Prefer concrete nouns and numbers over abstract polish
- Take a clear employee-facing stance (what you can do / what you pay) — no forced both-sides waffle
- Do not invent cover, clinics, prices, or legal advice
- Keep FAQs useful: answer the question first, then one short limit if needed

## Out of scope files

Do not rewrite `CONSUMER_STANDARDS.md`, `.cursor/**` skill/rule docs (except when authoring this skill), `README.md`, comments-only, or CSS class names.
