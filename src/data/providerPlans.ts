/** PMI benefit id helpers. Plan data itself loads from public/data/pmi-plans.csv */

export const PMI_BENEFIT_IDS = ['axa-pmi', 'bupa-pmi', 'vitality-pmi'] as const
export type PmiBenefitId = (typeof PMI_BENEFIT_IDS)[number]

export function isPmiBenefitId(id: string): id is PmiBenefitId {
  return (PMI_BENEFIT_IDS as readonly string[]).includes(id)
}
