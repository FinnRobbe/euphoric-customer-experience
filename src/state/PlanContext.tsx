import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  isPmiBenefitId,
  type PmiBenefitId,
} from '../data/providerPlans'
import { getCatalogBenefitById, type BenefitDetail } from '../data/benefitsCatalog'
import { loadPmiCatalog } from '../lib/parsePlans'
import type {
  CurrentPmiPlan,
  DependantDetails,
  DependantRemoval,
  EmployeeProfile,
  PersonaliseAnswers,
  Plan,
  PlanTier,
  PmiBenefitSummary,
} from '../types'

export function newDependantId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `dep-${crypto.randomUUID()}`
  }
  return `dep-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function isActiveDependant(d: DependantDetails): boolean {
  return !d.removedAt
}

function normalizeDependant(raw: Partial<DependantDetails> & {
  relationship: 'partner' | 'child'
  firstName: string
}): DependantDetails {
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : newDependantId(),
    relationship: raw.relationship,
    firstName: raw.firstName,
    lastName: typeof raw.lastName === 'string' ? raw.lastName : '',
    nationalInsurance:
      typeof raw.nationalInsurance === 'string' ? raw.nationalInsurance : '',
    dateOfBirth: typeof raw.dateOfBirth === 'string' ? raw.dateOfBirth : '',
    removedAt: raw.removedAt,
    removalReasonCode: raw.removalReasonCode,
    removalReasonOther: raw.removalReasonOther,
  }
}

/** Ensure placeholder partner/children exist so remove-by-name works. */
export function seedDependantsIfNeeded(
  existing: DependantDetails[],
  includePartner: boolean,
  childrenCount: number,
): DependantDetails[] {
  const next = existing.map((d) => normalizeDependant(d))
  const active = () => next.filter(isActiveDependant)
  if (includePartner && !active().some((d) => d.relationship === 'partner')) {
    next.push(
      normalizeDependant({
        relationship: 'partner',
        firstName: 'Partner',
        lastName: '',
      }),
    )
  }
  let childIndex = active().filter((d) => d.relationship === 'child').length
  while (
    active().filter((d) => d.relationship === 'child').length < childrenCount
  ) {
    childIndex += 1
    next.push(
      normalizeDependant({
        relationship: 'child',
        firstName: `Child ${childIndex}`,
        lastName: '',
      }),
    )
  }
  return next
}

interface PlanContextValue {
  /** All PMI plans across operators */
  plans: Plan[]
  pmiBenefits: PmiBenefitSummary[]
  /**
   * Enrolled plan: starts from CSV `is_current_plan`, then updates only via
   * `commitPersonalise` (Apply confirm) — never from casual browsing clicks.
   */
  currentPlan: CurrentPmiPlan
  loading: boolean
  error: string | null
  selectedTier: PlanTier
  setSelectedTier: (tier: PlanTier) => void
  selectedPlan: Plan | null
  /** Provider currently being viewed / compared (not the enrolled “current” plan) */
  selectedBenefitId: PmiBenefitId
  setSelectedBenefitId: (id: PmiBenefitId) => void
  getPlansForBenefit: (benefitId: string) => Plan[]
  getBenefit: (id: string) => BenefitDetail | PmiBenefitSummary | undefined
  profile: EmployeeProfile | null
  /** Draft personalise answers (not enrolled until Apply) */
  answers: PersonaliseAnswers
  setAnswers: (answers: PersonaliseAnswers) => void
  /** Last committed personalise snapshot (dependants / extras baseline) */
  committedAnswers: PersonaliseAnswers
  commitPersonalise: (
    next: PersonaliseAnswers,
    benefitId: PmiBenefitId,
    options?: {
      dependantsToAdd?: DependantDetails[]
      dependantsToRemove?: DependantRemoval[]
    },
  ) => void
  /** All registered dependants including removed (audit) */
  registeredDependants: DependantDetails[]
  /** Dependants currently on cover */
  activeDependants: DependantDetails[]
  mismatchReasons: string[]
  setMismatchReasons: (reasons: string[]) => void
  savedFeatureIds: Set<string>
  toggleSaved: (featureId: string) => void
  /**
   * Interview control: drop prototype `navigator-*` storage and restore the
   * CSV enrolled plan with the employee-profile household and no extras.
   */
  resetDemo: () => void
}

const defaultAnswers: PersonaliseAnswers = {
  coverLevel: 'plus',
  includePartner: false,
  childrenCount: 0,
  selectedExtras: [],
}

const NAVIGATOR_STORAGE_PREFIX = 'navigator-'

/** Browsing selection. Not the enrolled plan. */
const STORAGE_BENEFIT_KEY = 'navigator-selected-pmi'
const STORAGE_TIER_KEY = 'navigator-selected-tier'
/** Saved feature hearts. */
const STORAGE_SAVED_KEY = 'navigator-saved-features'
/** Last Apply: cover, household, selectedExtras. */
const STORAGE_COMMITTED_KEY = 'navigator-committed-personalise'
/** Registered dependants, including removals. */
const STORAGE_DEPENDANTS_KEY = 'navigator-registered-dependants'
/** Enrolled plan after Apply. Overrides CSV `is_current_plan` on next load. */
const STORAGE_CURRENT_PLAN_KEY = 'navigator-current-plan'

/**
 * Remove every `navigator-*` localStorage key, including
 * `navigator-payment-method` from billing. Leaves every other key alone.
 */
function clearNavigatorStorage(): void {
  try {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i)
      if (key?.startsWith(NAVIGATOR_STORAGE_PREFIX)) keys.push(key)
    }
    for (const key of keys) localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

function readStoredBenefit(): PmiBenefitId | null {
  try {
    const stored = localStorage.getItem(STORAGE_BENEFIT_KEY)
    if (stored && isPmiBenefitId(stored)) return stored
  } catch {
    /* ignore */
  }
  return null
}

function readStoredTier(): PlanTier | null {
  try {
    const stored = localStorage.getItem(STORAGE_TIER_KEY)
    if (stored === 'essential' || stored === 'plus' || stored === 'premier') {
      return stored
    }
  } catch {
    /* ignore */
  }
  return null
}

function readStoredSavedFeatures(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_SAVED_KEY)
    if (!stored) return new Set()
    const parsed = JSON.parse(stored) as unknown
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((id): id is string => typeof id === 'string'))
  } catch {
    return new Set()
  }
}

function writeStoredSavedFeatures(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify([...ids]))
  } catch {
    /* ignore */
  }
}

function readStoredCommitted(): PersonaliseAnswers | null {
  try {
    const stored = localStorage.getItem(STORAGE_COMMITTED_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored) as PersonaliseAnswers
    if (
      parsed &&
      (parsed.coverLevel === 'essential' ||
        parsed.coverLevel === 'plus' ||
        parsed.coverLevel === 'premier')
    ) {
      return {
        coverLevel: parsed.coverLevel,
        includePartner: Boolean(parsed.includePartner),
        childrenCount: Math.max(0, Number(parsed.childrenCount) || 0),
        selectedExtras: Array.isArray(parsed.selectedExtras)
          ? parsed.selectedExtras.filter((x) => typeof x === 'string')
          : [],
      }
    }
  } catch {
    /* ignore */
  }
  return null
}

function writeStoredCommitted(answers: PersonaliseAnswers) {
  try {
    localStorage.setItem(STORAGE_COMMITTED_KEY, JSON.stringify(answers))
  } catch {
    /* ignore */
  }
}

function readStoredDependants(): DependantDetails[] {
  try {
    const stored = localStorage.getItem(STORAGE_DEPENDANTS_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (d): d is Partial<DependantDetails> & {
          relationship: 'partner' | 'child'
          firstName: string
        } =>
          Boolean(
            d &&
              typeof d === 'object' &&
              (d.relationship === 'partner' || d.relationship === 'child') &&
              typeof d.firstName === 'string',
          ),
      )
      .map((d) => normalizeDependant(d))
  } catch {
    return []
  }
}

function writeStoredDependants(list: DependantDetails[]) {
  try {
    localStorage.setItem(STORAGE_DEPENDANTS_KEY, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

function readStoredCurrentPlan(): CurrentPmiPlan | null {
  try {
    const stored = localStorage.getItem(STORAGE_CURRENT_PLAN_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored) as CurrentPmiPlan
    if (
      parsed &&
      isPmiBenefitId(parsed.benefitId) &&
      (parsed.tier === 'essential' ||
        parsed.tier === 'plus' ||
        parsed.tier === 'premier') &&
      typeof parsed.planId === 'string'
    ) {
      return parsed
    }
  } catch {
    /* ignore */
  }
  return null
}

function writeStoredCurrentPlan(plan: CurrentPmiPlan) {
  try {
    localStorage.setItem(STORAGE_CURRENT_PLAN_KEY, JSON.stringify(plan))
  } catch {
    /* ignore */
  }
}

const PlanContext = createContext<PlanContextValue | null>(null)

const DEFAULT_CURRENT: CurrentPmiPlan = {
  benefitId: 'axa-pmi',
  planId: 'axa-plus',
  tier: 'plus',
}

function cloneProfile(profile: EmployeeProfile): EmployeeProfile {
  return { ...profile, priorities: [...profile.priorities] }
}

/** Household on the demo profile when the JSON has not loaded yet. */
const DEMO_HOUSEHOLD = { includePartner: true, childrenCount: 1 }

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([])
  const [pmiBenefits, setPmiBenefits] = useState<PmiBenefitSummary[]>([])
  const [currentPlan, setCurrentPlan] = useState<CurrentPmiPlan>(DEFAULT_CURRENT)
  /** CSV `is_current_plan`, captured at boot. Apply must not overwrite this. */
  const enrolledFromCsvRef = useRef<CurrentPmiPlan>(DEFAULT_CURRENT)
  /** Unmodified employee-profile.json. Apply updates `profile` in memory only. */
  const profileSeedRef = useRef<EmployeeProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTier, setSelectedTierState] = useState<PlanTier>(
    () => readStoredTier() ?? 'plus',
  )
  const [selectedBenefitId, setSelectedBenefitIdState] = useState<PmiBenefitId>(
    () => readStoredBenefit() ?? 'axa-pmi',
  )
  const [profile, setProfile] = useState<EmployeeProfile | null>(null)
  const [answers, setAnswers] = useState<PersonaliseAnswers>(defaultAnswers)
  const [committedAnswers, setCommittedAnswers] =
    useState<PersonaliseAnswers>(defaultAnswers)
  const [registeredDependants, setRegisteredDependants] = useState<
    DependantDetails[]
  >(() => readStoredDependants())
  const [mismatchReasons, setMismatchReasons] = useState<string[]>([])
  const [savedFeatureIds, setSavedFeatureIds] = useState<Set<string>>(
    () => readStoredSavedFeatures(),
  )

  function commitPersonalise(
    next: PersonaliseAnswers,
    benefitId: PmiBenefitId,
    options: {
      dependantsToAdd?: DependantDetails[]
      dependantsToRemove?: DependantRemoval[]
    } = {},
  ) {
    const plan =
      plans.find((p) => p.benefitId === benefitId && p.tier === next.coverLevel) ??
      null
    const enrolled: CurrentPmiPlan = {
      benefitId,
      planId: plan?.planId ?? `${benefitId.replace(/-pmi$/, '')}-${next.coverLevel}`,
      tier: next.coverLevel,
    }
    setCurrentPlan(enrolled)
    writeStoredCurrentPlan(enrolled)
    setAnswers(next)
    setCommittedAnswers(next)
    writeStoredCommitted(next)
    setSelectedTier(next.coverLevel)
    setSelectedBenefitId(benefitId)

    const toAdd = (options.dependantsToAdd ?? []).map((d) =>
      normalizeDependant(d),
    )
    const toRemove = options.dependantsToRemove ?? []
    const removedAt = new Date().toISOString()

    setRegisteredDependants((prev) => {
      let merged = prev.map((d) => normalizeDependant(d))
      if (toRemove.length) {
        const byId = new Map(toRemove.map((r) => [r.id, r]))
        merged = merged.map((d) => {
          const rem = byId.get(d.id)
          if (!rem || d.removedAt) return d
          return {
            ...d,
            removedAt,
            removalReasonCode: rem.reasonCode,
            removalReasonOther: rem.reasonOther,
          }
        })
      }
      if (toAdd.length) {
        merged = [...merged, ...toAdd]
      }
      writeStoredDependants(merged)
      return merged
    })

    setProfile((prev) =>
      prev
        ? {
            ...prev,
            hasPartner: next.includePartner,
            childrenCount: next.childrenCount,
          }
        : prev,
    )
  }
  function setSelectedBenefitId(id: PmiBenefitId) {
    setSelectedBenefitIdState(id)
    try {
      localStorage.setItem(STORAGE_BENEFIT_KEY, id)
    } catch {
      /* ignore */
    }
  }

  function setSelectedTier(tier: PlanTier) {
    setSelectedTierState(tier)
    try {
      localStorage.setItem(STORAGE_TIER_KEY, tier)
    } catch {
      /* ignore */
    }
  }

  function resetDemo() {
    const enrolled = enrolledFromCsvRef.current
    const seedProfile = profileSeedRef.current
    const baseline: PersonaliseAnswers = {
      coverLevel: enrolled.tier,
      includePartner: seedProfile?.hasPartner ?? DEMO_HOUSEHOLD.includePartner,
      childrenCount:
        seedProfile?.childrenCount ?? DEMO_HOUSEHOLD.childrenCount,
      selectedExtras: [],
    }
    const benefitId: PmiBenefitId = isPmiBenefitId(enrolled.benefitId)
      ? enrolled.benefitId
      : 'axa-pmi'

    setCurrentPlan(enrolled)
    setSelectedTierState(enrolled.tier)
    setSelectedBenefitIdState(benefitId)
    setAnswers(baseline)
    setCommittedAnswers(baseline)
    setRegisteredDependants(
      seedDependantsIfNeeded(
        [],
        baseline.includePartner,
        baseline.childrenCount,
      ),
    )
    setSavedFeatureIds(new Set())
    setMismatchReasons([])
    if (seedProfile) setProfile(cloneProfile(seedProfile))

    // Clear after this turn's effects (they can rewrite a browsing key), then
    // reload so page-local drafts and the cover-updated banner cannot keep
    // a previous Apply. Delay lets Personalise drop its leave warning first.
    window.setTimeout(() => {
      clearNavigatorStorage()
      window.location.assign(`/benefits/${benefitId}`)
    }, 50)
  }

  useEffect(() => {
    let cancelled = false
    async function boot() {
      try {
        const [catalog, profileRes] = await Promise.all([
          loadPmiCatalog(),
          fetch('/data/employee-profile.json').then((r) => r.json()),
        ])
        if (cancelled) return
        setPlans(catalog.plans)
        setPmiBenefits(catalog.pmiBenefits)
        enrolledFromCsvRef.current = catalog.currentPlan

        const storedCurrent = readStoredCurrentPlan()
        const enrolled =
          storedCurrent &&
          catalog.plans.some((p) => p.planId === storedCurrent.planId)
            ? storedCurrent
            : catalog.currentPlan
        setCurrentPlan(enrolled)

        // Browsing selection defaults to enrolled plan when storage is empty
        const hadBenefit = readStoredBenefit()
        const hadTier = readStoredTier()
        if (!hadBenefit && isPmiBenefitId(enrolled.benefitId)) {
          setSelectedBenefitIdState(enrolled.benefitId)
        }
        if (!hadTier) {
          setSelectedTierState(enrolled.tier)
        }

        const p = profileRes as EmployeeProfile
        profileSeedRef.current = cloneProfile(p)
        setProfile(cloneProfile(p))
        const storedCommitted = readStoredCommitted()
        const baseline: PersonaliseAnswers = storedCommitted ?? {
          coverLevel: enrolled.tier,
          includePartner: p.hasPartner,
          childrenCount: p.childrenCount,
          selectedExtras: [],
        }
        setCommittedAnswers(baseline)
        setAnswers(baseline)

        const storedDeps = readStoredDependants()
        const seeded = seedDependantsIfNeeded(
          storedDeps,
          baseline.includePartner,
          baseline.childrenCount,
        )
        setRegisteredDependants(seeded)
        writeStoredDependants(seeded)
      } catch (e) {
        if (!cancelled) {
          setError("We couldn't load your plan data. Try refreshing.")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void boot()
    return () => {
      cancelled = true
    }
  }, [])

  const getPlansForBenefit = useMemo(
    () => (benefitId: string) =>
      plans.filter((p) => p.benefitId === benefitId),
    [plans],
  )

  const getBenefit = useMemo(
    () => (id: string) =>
      pmiBenefits.find((b) => b.id === id) ?? getCatalogBenefitById(id),
    [pmiBenefits],
  )

  const activePlans = useMemo(
    () => getPlansForBenefit(selectedBenefitId),
    [getPlansForBenefit, selectedBenefitId],
  )

  const selectedPlan = useMemo(
    () => activePlans.find((p) => p.tier === selectedTier) ?? null,
    [activePlans, selectedTier],
  )

  const activeDependants = useMemo(
    () => registeredDependants.filter(isActiveDependant),
    [registeredDependants],
  )

  const value = useMemo<PlanContextValue>(
    () => ({
      plans,
      pmiBenefits,
      currentPlan,
      loading,
      error,
      selectedTier,
      setSelectedTier,
      selectedPlan,
      selectedBenefitId,
      setSelectedBenefitId,
      getPlansForBenefit,
      getBenefit,
      profile,
      answers,
      setAnswers,
      committedAnswers,
      commitPersonalise,
      registeredDependants,
      activeDependants,
      mismatchReasons,
      setMismatchReasons,
      savedFeatureIds,
      toggleSaved: (featureId: string) => {
        setSavedFeatureIds((prev) => {
          const next = new Set(prev)
          if (next.has(featureId)) next.delete(featureId)
          else next.add(featureId)
          writeStoredSavedFeatures(next)
          return next
        })
      },
      resetDemo,
    }),
    [
      plans,
      pmiBenefits,
      currentPlan,
      loading,
      error,
      selectedTier,
      selectedPlan,
      selectedBenefitId,
      getPlansForBenefit,
      getBenefit,
      profile,
      answers,
      committedAnswers,
      registeredDependants,
      activeDependants,
      mismatchReasons,
      savedFeatureIds,
    ],
  )

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}

export function usePlanState() {
  const ctx = useContext(PlanContext)
  if (!ctx) throw new Error('usePlanState must be used within PlanProvider')
  return ctx
}
