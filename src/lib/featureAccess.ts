import type { Plan } from '../types'

/** Feature IDs the employee can access: included on plan ∪ selected paid extras. */
export function accessibleFeatureIds(
  plan: Plan,
  selectedExtras: string[],
): Set<string> {
  const ids = new Set<string>()
  for (const f of plan.features) {
    if (
      f.included ||
      (f.optionalExtra && selectedExtras.includes(f.featureId))
    ) {
      ids.add(f.featureId)
    }
  }
  return ids
}
