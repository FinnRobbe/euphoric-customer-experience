import type { Plan, PlanTier } from '../types'

/** Human-facing PMI tier labels (CONSUMER_STANDARDS §2.2). Internal ids stay essential/plus/premier. */
export const TIER_LABELS: Record<PlanTier, string> = {
  essential: 'Core',
  plus: 'Comprehensive',
  premier: 'Premier',
}

export const TIER_ORDER: PlanTier[] = ['essential', 'plus', 'premier']

export function tierLabel(tier: PlanTier): string {
  return TIER_LABELS[tier]
}

/**
 * Insurer product name without the provider prefix.
 * e.g. "Bupa Select" → "Select", "AXA Health Comprehensive" → "Comprehensive".
 * Falls back to the generic tier dictionary only when planName is missing.
 */
export function shortPlanName(
  plan: Pick<Plan, 'planName' | 'provider' | 'tier'>,
): string {
  const name = plan.planName?.trim()
  if (!name) return TIER_LABELS[plan.tier]
  const provider = plan.provider?.trim()
  if (provider && name.toLowerCase().startsWith(provider.toLowerCase())) {
    const rest = name.slice(provider.length).trim()
    if (rest) return rest
  }
  return name
}
