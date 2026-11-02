/** Matrix-aligned feature sections for Product features (Compare & pick cover rows). */

export type FeatureSectionId =
  | 'outpatient'
  | 'hospital'
  | 'family'
  | 'cancer'
  | 'mental'
  | 'lifestyle'
  | 'other'

export type FeatureSectionDef = {
  id: FeatureSectionId
  /**
   * Feature-catalog labels (same buckets as Compare benefit rows).
   * Hospital uses “Hospital treatment” here — the matrix row “Hospital list”
   * is the recognised-hospital network, not this feature set.
   */
  label: string
}

export const FEATURE_SECTIONS: FeatureSectionDef[] = [
  { id: 'outpatient', label: 'Outpatient cover' },
  { id: 'hospital', label: 'Hospital treatment' },
  { id: 'family', label: 'Family cover' },
  { id: 'cancer', label: 'Cancer care' },
  { id: 'mental', label: 'Psychological counselling' },
  { id: 'lifestyle', label: 'Lifestyle extras' },
  { id: 'other', label: 'Other benefits' },
]

export type FeatureForSection = {
  featureId: string
  featureName: string
  category: string
  included: boolean
  optionalExtra: boolean
}

function tokens(f: FeatureForSection) {
  return {
    id: f.featureId.toLowerCase(),
    cat: f.category.toLowerCase(),
    name: f.featureName.toLowerCase(),
  }
}

export function isCancerFeature(f: FeatureForSection): boolean {
  const { id, cat, name } = tokens(f)
  return (
    cat.includes('cancer') || id.includes('cancer') || name.includes('cancer')
  )
}

export function isMentalFeature(f: FeatureForSection): boolean {
  const { id, cat, name } = tokens(f)
  // Physio / osteopathy use “therapy” language but are MSK, not mental health.
  if (
    name.includes('physio') ||
    name.includes('osteo') ||
    id.includes('physio') ||
    cat.includes('musculoskeletal')
  ) {
    return false
  }
  return (
    cat.includes('mental') ||
    id.includes('mental') ||
    name.includes('mental') ||
    ((name.includes('talk') || name.includes('therap') || name.includes('counsel')) &&
      (cat.includes('mental') ||
        name.includes('mental') ||
        name.includes('wellbeing'))) ||
    name.includes('wellbeing')
  )
}

export function isFamilyFeature(f: FeatureForSection): boolean {
  const { id, cat, name } = tokens(f)
  return (
    cat.includes('family') ||
    id.includes('family') ||
    id.includes('dependant') ||
    name.includes('family') ||
    name.includes('dependant') ||
    name.includes('child health') ||
    name.includes('partner')
  )
}

export function isLifestyleFeature(f: FeatureForSection): boolean {
  const { id, cat, name } = tokens(f)
  return (
    cat.includes('travel') ||
    cat.includes('dental') ||
    cat.includes("women") ||
    cat.includes('lifestyle') ||
    id.includes('travel') ||
    id.includes('dental') ||
    id.includes('fertility') ||
    name.includes('travel') ||
    name.includes('dental') ||
    name.includes('fertility') ||
    name.includes('cash plan')
  )
}

export function isOutpatientFeature(f: FeatureForSection): boolean {
  const { id, cat, name } = tokens(f)
  return (
    cat.includes('outpatient') ||
    id.includes('outpatient') ||
    name.includes('outpatient') ||
    name.includes('consultation') ||
    (cat.includes('diagnostics') &&
      (name.includes('scan') ||
        name.includes('mri') ||
        name.includes('ultrasound') ||
        name.includes('ct')))
  )
}

export function isHospitalFeature(f: FeatureForSection): boolean {
  const { id, cat, name } = tokens(f)
  if (isCancerFeature(f)) return false
  return (
    cat.includes('hospital') ||
    id.includes('hospital') ||
    id.includes('inpatient') ||
    id.includes('day-case') ||
    id.includes('daycase') ||
    name.includes('hospital') ||
    name.includes('inpatient') ||
    name.includes('day-case') ||
    name.includes('surgery') ||
    cat.includes('musculoskeletal')
  )
}

/**
 * Assign a feature to a matrix-aligned section.
 * Cancer / mental / family / lifestyle checked before outpatient & hospital
 * so specialty features are not swallowed by broad hospital/outpatient rules.
 * Display order remains FEATURE_SECTIONS (matrix row order).
 */
export function sectionIdForFeature(f: FeatureForSection): FeatureSectionId {
  if (isCancerFeature(f)) return 'cancer'
  if (isMentalFeature(f)) return 'mental'
  // Lifestyle before family so fertility/travel/dental are not swallowed by Family CSV tags.
  if (isLifestyleFeature(f)) return 'lifestyle'
  if (isFamilyFeature(f)) return 'family'
  if (isOutpatientFeature(f)) return 'outpatient'
  if (isHospitalFeature(f)) return 'hospital'
  return 'other'
}

export type FeatureCoverStatus = 'included' | 'paid-add-on' | 'not-included'

export function coverStatusForFeature(f: {
  included: boolean
  optionalExtra: boolean
}): FeatureCoverStatus {
  if (f.optionalExtra) return 'paid-add-on'
  if (f.included) return 'included'
  return 'not-included'
}

export function sortFeaturesInSection<
  T extends { included: boolean; optionalExtra: boolean; featureName: string },
>(features: T[]): T[] {
  const rank = (f: T) => {
    if (f.included && !f.optionalExtra) return 0
    if (f.optionalExtra) return 1
    return 2
  }
  return [...features].sort((a, b) => {
    const d = rank(a) - rank(b)
    if (d !== 0) return d
    return a.featureName.localeCompare(b.featureName)
  })
}

export function groupFeaturesBySection<T extends FeatureForSection>(
  features: T[],
): { section: FeatureSectionDef; features: T[] }[] {
  const buckets = new Map<FeatureSectionId, T[]>()
  for (const section of FEATURE_SECTIONS) {
    buckets.set(section.id, [])
  }
  for (const f of features) {
    const id = sectionIdForFeature(f)
    buckets.get(id)!.push(f)
  }
  return FEATURE_SECTIONS.map((section) => ({
    section,
    features: sortFeaturesInSection(buckets.get(section.id) ?? []),
  })).filter((g) => g.features.length > 0)
}
