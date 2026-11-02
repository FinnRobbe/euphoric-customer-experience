export type PlanTier = 'essential' | 'plus' | 'premier'

export interface PlanFeature {
  featureId: string
  featureName: string
  category: string
  description: string
  included: boolean
  accessNotes: string
  minAge: number
  maxAge: number
  suitableGenders: string
  requiresDependant: boolean
  relevancyTags: string[]
  optionalExtra: boolean
  extraMonthlyCostGbp: number
}

export interface Plan {
  planId: string
  planName: string
  provider: string
  benefitId: string
  tier: PlanTier
  monthlyEmployeeCostGbp: number
  employerContributionGbp: number
  excessGbp: number
  outpatientCover: string
  hospitalList: string
  dependantsAllowed: boolean
  maxDependants: number
  /** Employee £/mo to add a partner on this plan. */
  partnerMonthlyCostGbp: number
  /** Employee £/mo per child on this plan. */
  childMonthlyCostGbp: number
  summary: string
  features: PlanFeature[]
}

/** PMI card / detail display fields derived from pmi-plans.csv */
export interface PmiBenefitSummary {
  id: string
  category: 'Insurance'
  provider: string
  title: string
  cardDescription: string
  headerColor: string
  washColor: string
  logoText: string
  logoSrc: string
  monthlyEmployeeCostGbp: number
  excessLabel: string
  hospitalOrScope: string
  employerContributionGbp: number
  overview: string[]
  features: []
  isPmi: true
  manageLabel: string
}

export interface CurrentPmiPlan {
  benefitId: string
  planId: string
  tier: PlanTier
}

export interface EmployeeProfile {
  name: string
  age: number
  gender: string
  hasPartner: boolean
  childrenCount: number
  priorities: string[]
}

export interface PersonaliseAnswers {
  coverLevel: PlanTier
  includePartner: boolean
  childrenCount: number
  selectedExtras: string[]
}

export type DependantRemovalReasonCode =
  | 'no_longer_eligible'
  | 'covered_elsewhere'
  | 'cost'
  | 'other'

/** Pending child removal in a personalise draft (applied on commit) */
export interface DependantRemoval {
  id: string
  reasonCode: DependantRemovalReasonCode
  reasonOther?: string
}

/** Identity collected when adding a dependant on Apply */
export interface DependantDetails {
  id: string
  relationship: 'partner' | 'child'
  firstName: string
  lastName: string
  nationalInsurance: string
  dateOfBirth: string
  /** Set when removed from cover (kept for audit in prototype) */
  removedAt?: string
  removalReasonCode?: DependantRemovalReasonCode
  removalReasonOther?: string
}

export interface FitResult {
  ideal: boolean
  score: number
  reasons: string[]
  recommendedTier: PlanTier[]
}
