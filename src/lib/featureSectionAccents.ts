import type { FeatureSectionId } from './featureSections'

/** Pastel tile + deeper stroke for Navigator-style section badges. */
export type FeatureSectionAccent = {
  tileClass: string
  iconClass: string
}

export const FEATURE_SECTION_ACCENTS: Record<
  FeatureSectionId,
  FeatureSectionAccent
> = {
  outpatient: {
    tileClass: 'bg-sky-100',
    iconClass: 'text-sky-800',
  },
  hospital: {
    tileClass: 'bg-amber-100',
    iconClass: 'text-amber-900',
  },
  family: {
    tileClass: 'bg-orange-100',
    iconClass: 'text-orange-800',
  },
  cancer: {
    tileClass: 'bg-rose-100',
    iconClass: 'text-rose-800',
  },
  mental: {
    tileClass: 'bg-indigo-100',
    iconClass: 'text-indigo-800',
  },
  lifestyle: {
    tileClass: 'bg-emerald-100',
    iconClass: 'text-emerald-800',
  },
  other: {
    tileClass: 'bg-slate-100',
    iconClass: 'text-slate-700',
  },
}

export function featureSectionAccent(
  sectionId: FeatureSectionId,
): FeatureSectionAccent {
  return FEATURE_SECTION_ACCENTS[sectionId]
}
