import type { PersonaliseAnswers, Plan, PlanTier } from '../types'

/**
 * Seed a draft on another insurer (or the same insurer at a chosen tier).
 * Household stays locked to enrolled committed answers; extras are filtered
 * to ones that still exist as paid add-ons on the target plan.
 */
export function seedDraftForProvider(
  targetPlans: Plan[],
  preferredTier: PlanTier,
  committed: PersonaliseAnswers,
): PersonaliseAnswers {
  const tierAvailable = targetPlans.some((p) => p.tier === preferredTier)
  const coverLevel: PlanTier = tierAvailable
    ? preferredTier
    : targetPlans.some((p) => p.tier === 'essential')
      ? 'essential'
      : (targetPlans[0]?.tier ?? 'essential')
  const targetPlan =
    targetPlans.find((p) => p.tier === coverLevel) ?? targetPlans[0] ?? null
  const selectedExtras = committed.selectedExtras.filter((id) =>
    targetPlan?.features.some((f) => f.featureId === id && f.optionalExtra),
  )
  return {
    coverLevel,
    includePartner: committed.includePartner,
    childrenCount: committed.childrenCount,
    selectedExtras,
  }
}

/** Seed a draft for one concrete plan (Compare → checkout handoff). */
export function seedDraftForPlan(
  plan: Plan,
  committed: PersonaliseAnswers,
): PersonaliseAnswers {
  const selectedExtras = committed.selectedExtras.filter((id) =>
    plan.features.some((f) => f.featureId === id && f.optionalExtra),
  )
  return {
    coverLevel: plan.tier,
    includePartner: committed.includePartner,
    childrenCount: committed.childrenCount,
    selectedExtras,
  }
}
