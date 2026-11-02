import type { Plan, PlanFeature } from '../types'
import { accessibleFeatureIds } from './featureAccess'

const PROVIDER_TOKENS = new Set([
  'axa',
  'bupa',
  'vitality',
  'health',
  'the',
  'and',
  'or',
  'a',
  'an',
  'of',
  'for',
  'to',
  'on',
  'in',
  'with',
])

export type MatchedFeature = {
  from: { featureId: string; featureName: string; category: string }
  to: { featureId: string; featureName: string; category: string }
}

export type FeatureMatchResult = {
  keep: MatchedFeature[]
  lose: { featureId: string; featureName: string; category: string }[]
  gain: {
    featureId: string
    featureName: string
    category: string
    via: 'included' | 'add-on'
  }[]
}

function isFamilyCoverFeature(f: PlanFeature): boolean {
  return significantTokens(f.featureName).has('family')
}

/**
 * Some providers (e.g. AXA) only expose family cover via plan flags
 * (dependantsAllowed), not a feature row. Synthesize one so switch Keep/Lose/Gain
 * matches Bupa/Vitality’s “Family / dependant cover” feature.
 */
function withPlanFamilyCover(
  plan: Plan,
  features: PlanFeature[],
): PlanFeature[] {
  if (!plan.dependantsAllowed) return features
  if (features.some(isFamilyCoverFeature)) return features
  return [
    ...features,
    {
      featureId: `${plan.benefitId}-family`,
      featureName: 'Family / dependant cover',
      category: 'Family',
      description: `You can add a partner and children (up to ${plan.maxDependants}).`,
      included: true,
      accessNotes: '',
      minAge: 0,
      maxAge: 0,
      suitableGenders: '',
      requiresDependant: false,
      relevancyTags: ['family'],
      optionalExtra: false,
      extraMonthlyCostGbp: 0,
    },
  ]
}

function accessibleFeatures(
  plan: Plan,
  selectedExtras: string[],
): PlanFeature[] {
  const ids = accessibleFeatureIds(plan, selectedExtras)
  const seen = new Set<string>()
  const out: PlanFeature[] = []
  for (const f of plan.features) {
    if (!ids.has(f.featureId) || seen.has(f.featureId)) continue
    seen.add(f.featureId)
    out.push(f)
  }
  return withPlanFamilyCover(plan, out)
}

export function normalizeFeatureName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Map near-synonyms so Virtual GP ↔ Digital GP, etc. */
const TOKEN_ALIASES: Record<string, string> = {
  virtual: 'gp_access',
  digital: 'gp_access',
  online: 'gp_access',
  gp: 'gp_access',
  consultations: 'consult',
  consultation: 'consult',
  outpatient: 'outpatient',
  inpatient: 'inpatient',
  hospital: 'hospital',
  treatment: 'treatment',
  cancer: 'cancer',
  pathway: 'cancer',
  diagnostic: 'diagnostics',
  diagnostics: 'diagnostics',
  physiotherapy: 'physio',
  physio: 'physio',
  osteopathy: 'physio',
  mental: 'mental',
  wellbeing: 'mental',
  talking: 'mental',
  therapies: 'mental',
  therapy: 'mental',
  travel: 'travel',
  family: 'family',
  dependant: 'family',
  dependent: 'family',
}

function significantTokens(name: string): Set<string> {
  const norm = normalizeFeatureName(name)
  const raw = norm
    .split(' ')
    .filter((t) => t.length > 1 && !PROVIDER_TOKENS.has(t))
  const tokens = new Set<string>()
  for (const t of raw) {
    tokens.add(TOKEN_ALIASES[t] ?? t)
  }
  // Day-case surgery folds into hospital / inpatient on other providers
  if (norm.includes('day case') || norm.includes('daycase')) {
    tokens.add('daycase')
    tokens.add('hospital')
    tokens.add('inpatient')
  }
  return tokens
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1
  if (a.size === 0 || b.size === 0) return 0
  let inter = 0
  for (const t of a) {
    if (b.has(t)) inter += 1
  }
  return inter / (a.size + b.size - inter)
}

function rawNameTokens(name: string): Set<string> {
  return new Set(
    normalizeFeatureName(name)
      .split(' ')
      .filter((t) => t.length > 1),
  )
}

function isCancerNamed(f: PlanFeature): boolean {
  return (
    f.category.toLowerCase().includes('cancer') ||
    significantTokens(f.featureName).has('cancer')
  )
}

/**
 * Itemised procedure lines (orthopaedics, day-case) that other insurers
 * fold into a single hospital / inpatient benefit.
 * Cancer surgery stays in the cancer family.
 */
function isGranularSurgery(f: PlanFeature): boolean {
  if (isCancerNamed(f)) return false
  const norm = normalizeFeatureName(f.featureName)
  const tokens = rawNameTokens(f.featureName)
  return (
    tokens.has('surgery') ||
    tokens.has('orthopaedic') ||
    tokens.has('orthopedic') ||
    norm.includes('day case') ||
    significantTokens(f.featureName).has('daycase')
  )
}

/**
 * MRI / CT / ultrasound lines that other insurers fold into outpatient,
 * not a separate "you lose scans" row. Cancer diagnostics stay in cancer.
 */
function isScanFeature(f: PlanFeature): boolean {
  if (isCancerNamed(f)) return false
  const tokens = rawNameTokens(f.featureName)
  return (
    tokens.has('mri') ||
    tokens.has('ct') ||
    tokens.has('ultrasound') ||
    tokens.has('scan') ||
    tokens.has('scans')
  )
}

function isDentalFeature(f: PlanFeature): boolean {
  const name = f.featureName.toLowerCase()
  const cat = f.category.toLowerCase()
  const id = f.featureId.toLowerCase()
  return (
    cat.includes('dental') ||
    id.includes('dental') ||
    name.includes('dental') ||
    f.relevancyTags.some((t) => t.toLowerCase().includes('dental'))
  )
}

/** Hospital anchor, not an itemised procedure and not cancer. */
function isHospitalAnchor(f: PlanFeature): boolean {
  if (isCancerNamed(f) || isGranularSurgery(f)) return false
  const tokens = significantTokens(f.featureName)
  const cat = f.category.toLowerCase()
  return (
    tokens.has('hospital') ||
    tokens.has('inpatient') ||
    cat.includes('hospital')
  )
}

/** Outpatient consultations anchor, not a scan line and not cancer. */
function isOutpatientAnchor(f: PlanFeature): boolean {
  if (isCancerNamed(f) || isScanFeature(f)) return false
  const tokens = significantTokens(f.featureName)
  const cat = f.category.toLowerCase()
  return tokens.has('outpatient') || cat.includes('outpatient')
}

function toRef(f: PlanFeature) {
  return {
    featureId: f.featureId,
    featureName: f.featureName,
    category: f.category,
  }
}

function scorePair(from: PlanFeature, to: PlanFeature): number {
  const fromNorm = normalizeFeatureName(from.featureName)
  const toNorm = normalizeFeatureName(to.featureName)
  if (fromNorm === toNorm) return 1

  const fromTok = significantTokens(from.featureName)
  const toTok = significantTokens(to.featureName)
  let score = jaccard(fromTok, toTok)

  const sameCategory =
    from.category.trim().toLowerCase() === to.category.trim().toLowerCase() &&
    from.category.trim().length > 0
  if (sameCategory) score += 0.15

  // Soft boost when one name contains the other's key tokens
  if (fromNorm.includes(toNorm) || toNorm.includes(fromNorm)) {
    score = Math.max(score, 0.75)
  }

  // Shared domain anchors (cancer pathway vs granular cancer lines, travel add-ons)
  for (const anchor of [
    'cancer',
    'travel',
    'gp_access',
    'physio',
    'mental',
    'family',
  ] as const) {
    if (fromTok.has(anchor) && toTok.has(anchor)) {
      score = Math.max(score, 0.55)
    }
  }

  return Math.min(1, score)
}

/**
 * Cross-provider accessible-feature match for switch Personalise.
 * Matched pairs = Keep; unmatched from = Lose; unmatched to = Gain.
 */
export function matchAccessibleFeatures(
  fromPlan: Plan,
  fromExtras: string[],
  toPlan: Plan,
  toExtras: string[],
): FeatureMatchResult {
  const fromFeatures = accessibleFeatures(fromPlan, fromExtras)
  const toFeatures = accessibleFeatures(toPlan, toExtras)

  type Candidate = { fromIdx: number; toIdx: number; score: number }
  const candidates: Candidate[] = []
  for (let i = 0; i < fromFeatures.length; i++) {
    for (let j = 0; j < toFeatures.length; j++) {
      const score = scorePair(fromFeatures[i], toFeatures[j])
      if (score >= 0.5) {
        candidates.push({ fromIdx: i, toIdx: j, score })
      }
    }
  }
  candidates.sort((a, b) => b.score - a.score)

  const usedFrom = new Set<number>()
  const usedTo = new Set<number>()
  const usedToIds = new Set<string>()
  const keep: MatchedFeature[] = []

  for (const c of candidates) {
    if (usedFrom.has(c.fromIdx) || usedTo.has(c.toIdx)) continue
    usedFrom.add(c.fromIdx)
    usedTo.add(c.toIdx)
    const from = fromFeatures[c.fromIdx]
    const to = toFeatures[c.toIdx]
    usedToIds.add(to.featureId)
    keep.push({ from: toRef(from), to: toRef(to) })
  }

  // Dental cash plans use different feature ids per insurer, and the switch
  // draft does not carry the source extra id. Pair an accessible dental line
  // with the destination dental add-on (or included dental) when that product
  // exists, even if the employee has not ticked it on the new insurer yet.
  for (let i = 0; i < fromFeatures.length; i++) {
    if (usedFrom.has(i)) continue
    const from = fromFeatures[i]
    if (!isDentalFeature(from)) continue
    const dentalTo = toPlan.features.find(
      (f) => isDentalFeature(f) && !usedToIds.has(f.featureId),
    )
    if (!dentalTo) continue
    usedFrom.add(i)
    usedToIds.add(dentalTo.featureId)
    const toIdx = toFeatures.findIndex((f) => f.featureId === dentalTo.featureId)
    if (toIdx >= 0) usedTo.add(toIdx)
    keep.push({ from: toRef(from), to: toRef(dentalTo) })
  }

  // Tokens already covered by a Keep target (e.g. cancer pathway covers surgery/drugs).
  const keepCoverage = new Set<string>()
  for (const pair of keep) {
    for (const t of significantTokens(pair.to.featureName)) {
      keepCoverage.add(t)
    }
    for (const t of significantTokens(pair.from.featureName)) {
      keepCoverage.add(t)
    }
  }

  // Hospital / outpatient anchors on the destination side of Keep only.
  // Ignore cancer lines that mention "hospital" in the name.
  const destinationHasHospital = keep.some((pair) => {
    if (pair.to.category.toLowerCase().includes('cancer')) return false
    if (pair.to.featureName.toLowerCase().includes('cancer')) return false
    const tokens = significantTokens(pair.to.featureName)
    const cat = pair.to.category.toLowerCase()
    return (
      tokens.has('hospital') ||
      tokens.has('inpatient') ||
      tokens.has('daycase') ||
      cat.includes('hospital')
    )
  })
  const destinationHasOutpatient = keep.some((pair) => {
    if (pair.to.category.toLowerCase().includes('cancer')) return false
    if (pair.to.featureName.toLowerCase().includes('cancer')) return false
    const tokens = significantTokens(pair.to.featureName)
    const cat = pair.to.category.toLowerCase()
    return tokens.has('outpatient') || cat.includes('outpatient')
  })

  const COVER_FAMILY = new Set([
    'cancer',
    'diagnostics',
    'hospital',
    'inpatient',
    'daycase',
    'day',
    'case',
    'treatment',
  ])

  function coveredByKeep(f: PlanFeature): boolean {
    const tokens = significantTokens(f.featureName)
    // Cancer family: any cancer token on keep covers remaining cancer lines
    if (tokens.has('cancer') && keepCoverage.has('cancer')) return true
    // Day-case / hospital lines covered when keep has hospital/inpatient
    if (
      tokens.has('daycase') &&
      (keepCoverage.has('hospital') || keepCoverage.has('inpatient'))
    ) {
      return true
    }
    // Orthopaedic and other itemised surgery sit inside hospital treatment
    // on insurers that do not list them as their own feature.
    if (isGranularSurgery(f) && destinationHasHospital) return true
    // MRI / CT / ultrasound sit inside outpatient when that cover is kept.
    if (isScanFeature(f) && destinationHasOutpatient) return true
    for (const t of tokens) {
      if (COVER_FAMILY.has(t) && keepCoverage.has(t)) return true
    }
    return false
  }

  const sourceHasHospital = fromFeatures.some(isHospitalAnchor)
  const sourceHasOutpatient = fromFeatures.some(isOutpatientAnchor)

  function foldedIntoSourceCover(f: PlanFeature): boolean {
    if (isGranularSurgery(f) && sourceHasHospital) return true
    if (isScanFeature(f) && sourceHasOutpatient) return true
    return false
  }

  const lose = fromFeatures
    .filter((_, i) => !usedFrom.has(i))
    .filter((f) => !coveredByKeep(f))
    .map((f) => toRef(f))

  const gain = toFeatures
    .filter((f, i) => !usedTo.has(i) && !usedToIds.has(f.featureId))
    .filter((f) => !foldedIntoSourceCover(f))
    .map((f) => ({
      ...toRef(f),
      via: (f.included ? 'included' : 'add-on') as 'included' | 'add-on',
    }))

  return { keep, lose, gain }
}
