import { avivaRetirementFeatureDetails } from './aviva-retirement'
import { axaPmiFeatureDetails } from './axa-pmi'
import { bhnBikesFeatureDetails } from './bhn-bikes'
import { bupaPmiFeatureDetails } from './bupa-pmi'
import { chubbAccidentFeatureDetails } from './chubb-accident'
import { lgLifeFeatureDetails } from './lg-life'
import { lgPensionFeatureDetails } from './lg-pension'
import { penTravelFeatureDetails } from './pen-travel'
import { vitalityPmiFeatureDetails } from './vitality-pmi'
import type { FeatureDetailContent } from './types'

const packs: FeatureDetailContent[] = [
  ...axaPmiFeatureDetails,
  ...bupaPmiFeatureDetails,
  ...vitalityPmiFeatureDetails,
  ...lgPensionFeatureDetails,
  ...avivaRetirementFeatureDetails,
  ...lgLifeFeatureDetails,
  ...bhnBikesFeatureDetails,
  ...penTravelFeatureDetails,
  ...chubbAccidentFeatureDetails,
]

const byKey = new Map(
  packs.map((p) => [`${p.benefitId}::${p.featureId}`, p] as const),
)

export function getFeatureDetail(
  benefitId: string,
  featureId: string,
): FeatureDetailContent | null {
  return byKey.get(`${benefitId}::${featureId}`) ?? null
}

export function listFeatureDetailsForBenefit(
  benefitId: string,
): FeatureDetailContent[] {
  return packs.filter((p) => p.benefitId === benefitId)
}

export function allFeatureDetailIds(): { benefitId: string; featureId: string }[] {
  return packs.map((p) => ({
    benefitId: p.benefitId,
    featureId: p.featureId,
  }))
}

export type { FeatureDetailContent } from './types'
