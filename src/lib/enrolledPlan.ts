import type { CurrentPmiPlan, Plan } from '../types'

/** Resolve the enrolled PMI plan from the full catalog. */
export function getEnrolledPlan(
  plans: Plan[],
  currentPlan: CurrentPmiPlan,
): Plan | null {
  return (
    plans.find((p) => p.planId === currentPlan.planId) ??
    plans.find(
      (p) =>
        p.benefitId === currentPlan.benefitId && p.tier === currentPlan.tier,
    ) ??
    null
  )
}
