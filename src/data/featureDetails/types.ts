export interface FeatureFaq {
  q: string
  a: string
}

export interface FeatureAccessStep {
  text: string
  href?: string
}

export interface FeatureMapConfig {
  enabled: boolean
  label: string
  /** Use `{place}` as a placeholder for the user's search location. */
  queryTemplate: string
}

export interface FeatureDetailContent {
  featureId: string
  benefitId: string
  overview: string
  includedIntro: string
  includedItems: string[]
  costSummary: string
  faqs: FeatureFaq[]
  accessSteps: FeatureAccessStep[]
  providerCta: { label: string; href: string }
  map: FeatureMapConfig
}
