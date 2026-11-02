import { TIER_LABELS } from './tierLabels'
import type { PersonaliseAnswers, Plan, PlanTier } from '../types'

export type CoverFieldChange = {
  label: string
  before: string
  after: string
}

/**
 * One product line for the confirm table: insurer once, then the tier word.
 * "Bupa · Comprehensive", never "Bupa · Bupa Complete" or a marketing name
 * stacked on Core / Comprehensive / Premier.
 */
export function confirmProductLine(
  plan: Pick<Plan, 'provider' | 'tier'>,
  coverLevel: PlanTier,
): string {
  const tier = TIER_LABELS[plan.tier] ?? TIER_LABELS[coverLevel]
  const provider = plan.provider?.trim()
  if (!provider) return tier
  return `${provider} · ${tier}`
}

/** Insurer, cover, excess, outpatient, and hospital rows that differ on Apply. */
export function buildCoverFieldChanges(
  committedPlan: Plan | null,
  draftPlan: Plan | null,
  committedAnswers: PersonaliseAnswers,
  draftAnswers: PersonaliseAnswers,
  switchingProvider: boolean,
): CoverFieldChange[] {
  if (!committedPlan || !draftPlan) return []
  const rows: CoverFieldChange[] = []
  if (switchingProvider) {
    rows.push({
      label: 'Insurer',
      before: committedPlan.provider,
      after: draftPlan.provider,
    })
  }
  const beforeName = confirmProductLine(
    committedPlan,
    committedAnswers.coverLevel,
  )
  const afterName = confirmProductLine(draftPlan, draftAnswers.coverLevel)
  if (beforeName !== afterName || switchingProvider) {
    rows.push({
      label: 'Cover',
      before: beforeName,
      after: afterName,
    })
  }
  if (committedPlan.excessGbp !== draftPlan.excessGbp) {
    rows.push({
      label: 'Claim excess',
      before: `£${committedPlan.excessGbp}`,
      after: `£${draftPlan.excessGbp}`,
    })
  }
  if (committedPlan.outpatientCover !== draftPlan.outpatientCover) {
    rows.push({
      label: 'Outpatient cover',
      before: committedPlan.outpatientCover || '—',
      after: draftPlan.outpatientCover || '—',
    })
  }
  if (committedPlan.hospitalList !== draftPlan.hospitalList) {
    rows.push({
      label: 'Hospital list',
      before: committedPlan.hospitalList || '—',
      after: draftPlan.hospitalList || '—',
    })
  }
  return rows
}
