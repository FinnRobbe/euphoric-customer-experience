import type {
  EmployeeProfile,
  FitResult,
  PersonaliseAnswers,
  Plan,
  PlanTier,
} from '../types'
import { getApplicableCostBreakdown } from './parsePlans'
import { tierLabel } from './tierLabels'

const TIER_ORDER: PlanTier[] = ['essential', 'plus', 'premier']

const BENEFIT_ORDER = ['axa-pmi', 'bupa-pmi', 'vitality-pmi']

export type RankedPlan = {
  plan: Plan
  score: number
  youPay: number
}

/** A catalogue plan Personalise can select. Score is checkPlanFitLite on that plan only. */
export type RecommendedPlan = {
  planId: string
  provider: string
  tier: PlanTier
  score: number
}

export type RecommendPlansOptions = {
  /**
   * Plan being judged. Excluded from the list.
   * When set, the default scope is this plan's insurer (benefitId, else provider).
   */
  currentPlan?: Plan
  /**
   * `provider` — only the current plan's insurer.
   * `all` — every other catalogue plan. Each row carries its own provider;
   * do not relabel those rows with the page brand.
   */
  scope?: 'provider' | 'all'
  /** Default 2. */
  limit?: number
}

/** checkPlanFit return. Prefer recommendedPlans over recommendedTier. */
export type FitCheck = FitResult & {
  recommendedPlans: RecommendedPlan[]
}

const DEFAULT_RECOMMENDATION_LIMIT = 2

type ScoredPlan = {
  plan: Plan
  score: number
  youPay: number
}

export function checkPlanFit(
  plan: Plan,
  allPlans: Plan[],
  answers: PersonaliseAnswers,
  profile: EmployeeProfile,
): FitCheck {
  const reasons: string[] = []
  let score = 100

  const dependantCount =
    (answers.includePartner ? 1 : 0) + answers.childrenCount

  if (dependantCount > 0 && !plan.dependantsAllowed) {
    reasons.push(
      'Your household includes dependants, but this plan does not allow them.',
    )
    score -= 40
  } else if (dependantCount > plan.maxDependants) {
    reasons.push(
      `You need cover for ${dependantCount} dependants; this plan caps at ${plan.maxDependants}.`,
    )
    score -= 30
  }

  for (const priority of profile.priorities) {
    const matching = plan.features.filter(
      (f) =>
        f.included &&
        f.relevancyTags.some((t) => t.toLowerCase() === priority.toLowerCase()),
    )
    if (matching.length === 0) {
      reasons.push(
        `${priority.replaceAll('_', ' ')} cover looks thin on ${plan.planName}.`,
      )
      score -= 15
    }
  }

  for (const feature of plan.features) {
    if (!feature.included) continue
    if (profile.age < feature.minAge || profile.age > feature.maxAge) {
      continue
    }
    if (
      feature.suitableGenders !== 'any' &&
      !feature.suitableGenders
        .toLowerCase()
        .split('|')
        .includes(profile.gender.toLowerCase())
    ) {
      continue
    }
    if (feature.requiresDependant && dependantCount === 0) {
      reasons.push(
        `“${feature.featureName}” is most useful with dependants, which you have not added.`,
      )
      score -= 5
    }
  }

  if (answers.coverLevel !== plan.tier) {
    reasons.push(
      `You selected ${tierLabel(answers.coverLevel)} cover, but this plan is ${tierLabel(plan.tier)}.`,
    )
    score -= 20
  }

  if (plan.tier === 'essential' && profile.priorities.includes('cancer')) {
    const cancer = plan.features.some(
      (f) => f.included && f.relevancyTags.includes('cancer'),
    )
    if (!cancer) {
      reasons.push(
        'Core limits advanced cancer pathways. Comprehensive or Premier are stronger fits.',
      )
      score -= 20
    }
  }

  if (plan.excessGbp >= 500 && profile.priorities.includes('cost_certainty')) {
    reasons.push(
      `This plan has a £${plan.excessGbp} excess, which conflicts with your preference for cost certainty.`,
    )
    score -= 10
  }

  score = Math.max(0, Math.min(100, score))
  const ideal = score >= 70 && reasons.length === 0
  const softIdeal = score >= 70 && reasons.every((r) => r.includes('most useful'))

  const recommendedPlans = recommendPlans(allPlans, answers, profile, {
    currentPlan: plan,
    scope: 'provider',
  })
  // Same-provider tiers only, so a caller that still reads this field
  // cannot stamp another insurer's score with this brand. Lossy if two
  // plans share a tier — select recommendedPlans[].planId instead.
  const recommendedTier: PlanTier[] = []
  for (const row of recommendedPlans) {
    if (!recommendedTier.includes(row.tier)) recommendedTier.push(row.tier)
  }

  return {
    ideal: ideal || softIdeal,
    score,
    reasons: reasons.filter(
      (r, i, arr) => arr.indexOf(r) === i,
    ),
    recommendedTier,
    recommendedPlans,
  }
}

/**
 * Rank real catalogue plans for "worth comparing".
 *
 * Default scope is the current plan's insurer. Pass scope: 'all' only when
 * the UI will show each row's provider. Scores come from checkPlanFitLite
 * on the plan's own features — this does not copy another insurer's score
 * onto a tier name.
 *
 * Order: score desc, then lower household You pay, then insurer, tier, planId.
 */
export function recommendPlans(
  allPlans: Plan[],
  answers: PersonaliseAnswers,
  profile: EmployeeProfile,
  options: RecommendPlansOptions = {},
): RecommendedPlan[] {
  const current = options.currentPlan
  const scope = options.scope ?? (current ? 'provider' : 'all')
  const limit = options.limit ?? DEFAULT_RECOMMENDATION_LIMIT
  if (limit <= 0) return []
  if (scope === 'provider' && !current) return []

  const scored: ScoredPlan[] = []
  const seen = new Set<string>()
  for (const plan of allPlans) {
    if (!plan.planId || seen.has(plan.planId)) continue
    if (current && plan.planId === current.planId) continue
    if (scope === 'provider' && current && !sameInsurer(plan, current)) {
      continue
    }
    seen.add(plan.planId)
    scored.push({
      plan,
      score: checkPlanFitLite(plan, answers, profile),
      youPay: householdYouPay(plan, answers),
    })
  }
  scored.sort(compareScoredPlans)
  return scored.slice(0, limit).map((row) => ({
    planId: row.plan.planId,
    provider: row.plan.provider,
    tier: row.plan.tier,
    score: row.score,
  }))
}

/**
 * @deprecated Use recommendPlans. Tiers for currentPlan's insurer only.
 * Without currentPlan this returns [] — it does not score every insurer
 * into a bare tier.
 */
export function recommendTiers(
  allPlans: Plan[],
  answers: PersonaliseAnswers,
  profile: EmployeeProfile,
  currentPlan?: Plan,
): PlanTier[] {
  const tiers: PlanTier[] = []
  for (const row of recommendPlans(allPlans, answers, profile, {
    currentPlan,
    scope: 'provider',
  })) {
    if (!tiers.includes(row.tier)) tiers.push(row.tier)
  }
  return tiers
}

export function checkPlanFitLite(
  plan: Plan,
  answers: PersonaliseAnswers,
  profile: EmployeeProfile,
): number {
  let score = 100
  const dependantCount =
    (answers.includePartner ? 1 : 0) + answers.childrenCount
  if (dependantCount > 0 && !plan.dependantsAllowed) score -= 40
  else if (dependantCount > plan.maxDependants) score -= 30
  for (const priority of profile.priorities) {
    const ok = plan.features.some(
      (f) =>
        f.included &&
        f.relevancyTags.some((t) => t.toLowerCase() === priority.toLowerCase()),
    )
    if (!ok) score -= 15
  }
  if (answers.coverLevel === plan.tier) score += 10
  const tierIndex = TIER_ORDER.indexOf(plan.tier)
  const wantIndex = TIER_ORDER.indexOf(answers.coverLevel)
  score -= Math.abs(tierIndex - wantIndex) * 5
  return Math.max(0, Math.min(100, score))
}

function sameInsurer(candidate: Plan, current: Plan): boolean {
  if (current.benefitId && candidate.benefitId) {
    return candidate.benefitId === current.benefitId
  }
  const left = current.provider.trim().toLowerCase()
  const right = candidate.provider.trim().toLowerCase()
  return left.length > 0 && left === right
}

function householdYouPay(plan: Plan, answers: PersonaliseAnswers): number {
  const breakdown = getApplicableCostBreakdown(
    plan,
    answers.selectedExtras,
    answers.includePartner,
    answers.childrenCount,
  )
  // A cover that refuses this household is not a cheaper quote.
  if (breakdown.householdCapped || breakdown.quotedEmployeePays == null) {
    return Number.POSITIVE_INFINITY
  }
  return breakdown.quotedEmployeePays
}

function compareScoredPlans(a: ScoredPlan, b: ScoredPlan): number {
  if (b.score !== a.score) return b.score - a.score
  if (a.youPay !== b.youPay) return a.youPay - b.youPay
  const ai = BENEFIT_ORDER.indexOf(a.plan.benefitId)
  const bi = BENEFIT_ORDER.indexOf(b.plan.benefitId)
  const benefitDelta = (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  if (benefitDelta !== 0) return benefitDelta
  const tierDelta =
    TIER_ORDER.indexOf(a.plan.tier) - TIER_ORDER.indexOf(b.plan.tier)
  if (tierDelta !== 0) return tierDelta
  return a.plan.planId.localeCompare(b.plan.planId)
}

/**
 * Rank every plan except the enrolled one for Compare.
 * Score desc, then lower household You pay, then provider order.
 */
export function rankAlternativePlans(
  allPlans: Plan[],
  enrolledPlan: Plan,
  answers: PersonaliseAnswers,
  profile: EmployeeProfile,
): RankedPlan[] {
  const ranked: RankedPlan[] = []
  for (const plan of allPlans) {
    if (plan.planId === enrolledPlan.planId) continue
    const score = checkPlanFitLite(plan, answers, profile)
    const youPay = householdYouPay(plan, answers)
    ranked.push({ plan, score, youPay })
  }
  ranked.sort(compareScoredPlans)
  return ranked
}
