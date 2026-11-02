import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Link,
  useBlocker,
  useLocation,
  useNavigate,
  useParams,
  type BlockerFunction,
} from 'react-router-dom'
import { isPmiBenefitId, type PmiBenefitId } from '../data/providerPlans'
import { readStoredPaymentMethod } from '../lib/billing'
import { BikTaxNote } from '../components/benefits/BikTaxNote'
import { ApplyConfirmWizard } from '../components/pmi/ApplyConfirmWizard'
import { buildCoverFieldChanges } from '../lib/coverFieldChanges'
import { getEnrolledPlan } from '../lib/enrolledPlan'
import {
  getApplicableCostBreakdown,
  getCostBreakdown,
} from '../lib/parsePlans'
import { accessibleFeatureIds } from '../lib/featureAccess'
import { checkPlanFit } from '../lib/fitChecker'
import { matchAccessibleFeatures } from '../lib/featureMatch'
import { seedDraftForProvider } from '../lib/switchDraft'
import { shortPlanName, TIER_LABELS, TIER_ORDER } from '../lib/tierLabels'
import {
  newDependantId,
  usePlanState,
} from '../state/PlanContext'
import type {
  DependantDetails,
  DependantRemoval,
  DependantRemovalReasonCode,
  PersonaliseAnswers,
  Plan,
  PlanTier,
} from '../types'

type DependantInfoKind = 'partner' | 'children'

const DEPENDANT_ELIGIBILITY: Record<
  DependantInfoKind,
  { title: string; bullets: string[] }
> = {
  partner: {
    title: 'Partner eligibility',
    bullets: [
      'Spouse, civil partner, or cohabiting partner living at the same address.',
      'Must be aged 16 or over.',
    ],
  },
  children: {
    title: 'Child eligibility',
    bullets: [
      'Unmarried dependent children under 21 (or under 24 if in full-time education).',
      'Children count toward this plan’s dependant cap.',
    ],
  },
}

function trimDependantDetails(d: DependantDetails): DependantDetails {
  return {
    ...d,
    firstName: d.firstName.trim(),
    lastName: d.lastName.trim(),
    nationalInsurance: d.nationalInsurance.trim(),
    dateOfBirth: d.dateOfBirth.trim(),
  }
}

function dependantDisplayName(d: DependantDetails): string {
  const full = `${d.firstName} ${d.lastName}`.trim()
  return full || (d.relationship === 'partner' ? 'Partner' : 'Child')
}

function featureIncluded(
  plan: Plan,
  match: (id: string, category: string, name: string) => boolean,
): boolean {
  return plan.features.some(
    (f) =>
      f.included &&
      match(
        f.featureId.toLowerCase(),
        f.category.toLowerCase(),
        f.featureName.toLowerCase(),
      ),
  )
}

type MatrixCellData = {
  text?: string
  mark?: 'yes' | 'no'
  note?: string
}

function MatrixCell({ cell }: { cell: MatrixCellData }) {
  if (cell.text) {
    return <span className="text-sm leading-snug text-ink">{cell.text}</span>
  }
  return (
    <span className="flex flex-col items-center gap-0.5">
      {cell.mark === 'yes' ? (
        <span className="text-base font-semibold text-ink" aria-label="Included">
          ✓
        </span>
      ) : (
        <span
          className="text-base font-semibold text-ink-muted"
          aria-label="Not included"
        >
          ✕
        </span>
      )}
      {cell.note ? (
        <span className="max-w-[7.5rem] text-[11px] leading-tight text-ink-muted">
          {cell.note}
        </span>
      ) : null}
    </span>
  )
}

type MatrixRow = {
  label: string
  values: Record<PlanTier, MatrixCellData>
  current?: MatrixCellData
}

/** Employee share of core cover only — not dependants or extras (those live in the rail). */
function matrixCellBase(p: Plan): MatrixCellData {
  const base = getCostBreakdown(p, [], false, 0).base
  return {
    text: `£${base}/mo`,
  }
}

function matrixCellExcess(p: Plan): MatrixCellData {
  return { text: `£${p.excessGbp}` }
}

function matrixCellOutpatient(p: Plan): MatrixCellData {
  return { text: p.outpatientCover || '—' }
}

function matrixCellHospital(p: Plan): MatrixCellData {
  return { text: p.hospitalList || '—' }
}

function matrixCellFamily(p: Plan): MatrixCellData {
  if (!p.dependantsAllowed) return { mark: 'no' }
  return { mark: 'yes', note: `Up to ${p.maxDependants}` }
}

function cancerFeatureText(f: Plan['features'][number]): string {
  return `${f.featureName} ${f.description} ${f.accessNotes}`.toLowerCase()
}

function matrixCellCancer(p: Plan): MatrixCellData {
  const cancerFeatures = p.features.filter((f) => {
    const id = f.featureId.toLowerCase()
    const cat = f.category.toLowerCase()
    const name = f.featureName.toLowerCase()
    return (
      cat.includes('cancer') ||
      id.includes('cancer') ||
      name.includes('cancer')
    )
  })
  const included = cancerFeatures.filter((f) => f.included)
  if (!included.length) return { mark: 'no' }
  const includedText = included.map(cancerFeatureText).join(' ')
  // Pathway copy can include treatment and still say newer drugs are out.
  const drugsHeldBack =
    /newer biological[^.]{0,80}not included|not included[^.]{0,80}newer biological/.test(
      includedText,
    )
  if (drugsHeldBack) return { mark: 'yes', note: 'No newer drugs' }
  if (included.length < cancerFeatures.length) {
    const excludedText = cancerFeatures
      .filter((f) => !f.included)
      .map(cancerFeatureText)
      .join(' ')
    const excludedIsDrugs = /drug|biological|formulary/.test(excludedText)
    const includedHasTreatment = /chemo|radiotherapy/.test(includedText)
    if (excludedIsDrugs && includedHasTreatment) {
      return { mark: 'yes', note: 'No newer drugs' }
    }
    return { mark: 'yes', note: 'Diagnostics & surgery only' }
  }
  if (
    /newer biological|full formulary|full cancer drug/.test(includedText)
  ) {
    return { mark: 'yes', note: 'Includes newer drugs' }
  }
  return { mark: 'yes' }
}

/** Uses feature copy, not the title alone, so talking therapies are not labelled assessment-only. */
function matrixCellMental(p: Plan): MatrixCellData {
  const included = p.features.filter((f) => {
    if (!f.included) return false
    const id = f.featureId.toLowerCase()
    const cat = f.category.toLowerCase()
    const name = f.featureName.toLowerCase()
    if (
      cat.includes('musculoskeletal') ||
      name.includes('physio') ||
      id.includes('physio')
    ) {
      return false
    }
    return (
      cat.includes('mental') || id.includes('mental') || name.includes('mental')
    )
  })
  if (!included.length) return { mark: 'no' }
  const text = included
    .map((f) => `${f.featureName} ${f.description} ${f.accessNotes}`.toLowerCase())
    .join(' ')
  if (
    text.includes('talk') ||
    text.includes('therap') ||
    text.includes('counsel')
  ) {
    return { mark: 'yes', note: 'Talking therapies' }
  }
  return { mark: 'yes', note: 'Assessment only' }
}

function matrixCellLifestyle(p: Plan): MatrixCellData {
  const fertility = featureIncluded(
    p,
    (id, _c, name) => id.includes('fertility') || name.includes('fertility'),
  )
  const travel = featureIncluded(
    p,
    (id, cat, name) =>
      cat.includes('travel') ||
      id.includes('travel') ||
      name.includes('travel'),
  )
  if (fertility && travel) {
    return { mark: 'yes', note: 'Fertility & travel' }
  }
  if (fertility || travel) {
    return { mark: 'yes', note: 'Some included' }
  }
  return { mark: 'yes', note: 'Paid add-ons only' }
}

const MATRIX_ROW_DEFS: {
  label: string
  pick: (p: Plan) => MatrixCellData
}[] = [
  { label: 'Base', pick: matrixCellBase },
  { label: 'Claim excess', pick: matrixCellExcess },
  { label: 'Outpatient cover', pick: matrixCellOutpatient },
  { label: 'Hospital list', pick: matrixCellHospital },
  { label: 'Family cover', pick: matrixCellFamily },
  { label: 'Cancer care', pick: matrixCellCancer },
  { label: 'Psychological counselling', pick: matrixCellMental },
  { label: 'Lifestyle extras', pick: matrixCellLifestyle },
]

function buildMatrixRows(
  plans: Plan[],
  options?: {
    currentPlan?: Plan | null
  },
): MatrixRow[] {
  const byTier = Object.fromEntries(
    TIER_ORDER.map((t) => [t, plans.find((p) => p.tier === t)]),
  ) as Record<PlanTier, Plan | undefined>

  const cells = (
    pick: (p: Plan) => MatrixCellData,
  ): Record<PlanTier, MatrixCellData> =>
    Object.fromEntries(
      TIER_ORDER.map((t) => [t, byTier[t] ? pick(byTier[t]!) : { text: '—' }]),
    ) as Record<PlanTier, MatrixCellData>

  const currentPlan = options?.currentPlan ?? null

  return MATRIX_ROW_DEFS.map((def) => {
    let current: MatrixCellData | undefined
    if (currentPlan) {
      current = def.pick(currentPlan)
    }
    return {
      label: def.label,
      values: cells(def.pick),
      current,
    }
  })
}

function emptyDependant(relationship: 'partner' | 'child'): DependantDetails {
  return {
    id: newDependantId(),
    relationship,
    firstName: '',
    lastName: '',
    nationalInsurance: '',
    dateOfBirth: '',
  }
}

function answersEqual(a: PersonaliseAnswers, b: PersonaliseAnswers): boolean {
  if (
    a.coverLevel !== b.coverLevel ||
    a.includePartner !== b.includePartner ||
    a.childrenCount !== b.childrenCount
  ) {
    return false
  }
  if (a.selectedExtras.length !== b.selectedExtras.length) return false
  const set = new Set(b.selectedExtras)
  return a.selectedExtras.every((id) => set.has(id))
}

function dependantHeadcount(a: PersonaliseAnswers): number {
  return (a.includePartner ? 1 : 0) + a.childrenCount
}

function tierDependantCap(plan: Plan): number {
  return plan.dependantsAllowed ? plan.maxDependants : 0
}

function overflowCount(a: PersonaliseAnswers, cap: number): number {
  return Math.max(0, dependantHeadcount(a) - cap)
}

/** Features accessible on fromPlan that toPlan would drop. */
function featuresLostAccess(
  fromPlan: Plan,
  toPlan: Plan,
  fromExtras: string[],
  toExtras: string[],
): { featureId: string; featureName: string }[] {
  const toIds = accessibleFeatureIds(toPlan, toExtras)
  const lost: { featureId: string; featureName: string }[] = []
  const seen = new Set<string>()
  for (const f of fromPlan.features) {
    const hadAccess =
      f.included || (f.optionalExtra && fromExtras.includes(f.featureId))
    if (!hadAccess || seen.has(f.featureId)) continue
    if (!toIds.has(f.featureId)) {
      seen.add(f.featureId)
      lost.push({ featureId: f.featureId, featureName: f.featureName })
    }
  }
  return lost
}

/** Features accessible on toPlan that fromPlan did not have. */
function featuresGainedAccess(
  fromPlan: Plan,
  toPlan: Plan,
  fromExtras: string[],
  toExtras: string[],
): {
  featureId: string
  featureName: string
  via: 'included' | 'add-on'
}[] {
  const fromIds = accessibleFeatureIds(fromPlan, fromExtras)
  const gained: {
    featureId: string
    featureName: string
    via: 'included' | 'add-on'
  }[] = []
  const seen = new Set<string>()
  for (const f of toPlan.features) {
    const hasAccess =
      f.included || (f.optionalExtra && toExtras.includes(f.featureId))
    if (!hasAccess || seen.has(f.featureId) || fromIds.has(f.featureId)) {
      continue
    }
    seen.add(f.featureId)
    gained.push({
      featureId: f.featureId,
      featureName: f.featureName,
      via: f.included ? 'included' : 'add-on',
    })
  }
  return gained
}

/** Higher tier that would cost less because selected add-ons become included. */
function suggestCheaperHigherTier(
  plans: Plan[],
  currentTier: PlanTier,
  extras: string[],
  includePartner: boolean,
  childrenCount: number,
  currentCost: number,
): {
  tier: PlanTier
  plan: Plan
  candidateCost: number
  includedExtraIds: string[]
} | null {
  const currentIndex = TIER_ORDER.indexOf(currentTier)
  if (currentIndex < 0 || currentIndex >= TIER_ORDER.length - 1) return null

  let best: {
    tier: PlanTier
    plan: Plan
    candidateCost: number
    includedExtraIds: string[]
  } | null = null

  for (let i = currentIndex + 1; i < TIER_ORDER.length; i++) {
    const tier = TIER_ORDER[i]
    const plan = plans.find((p) => p.tier === tier)
    if (!plan) continue

    const includedExtraIds = extras.filter((id) =>
      plan.features.some((f) => f.featureId === id && f.included),
    )
    const projectedExtras = extras.filter((id) =>
      plan.features.some((f) => f.featureId === id && f.optionalExtra),
    )
    const candidateCost = getCostBreakdown(
      plan,
      projectedExtras,
      includePartner,
      childrenCount,
    ).employeePays

    if (candidateCost >= currentCost) continue
    if (
      !best ||
      candidateCost < best.candidateCost ||
      (candidateCost === best.candidateCost &&
        TIER_ORDER.indexOf(tier) < TIER_ORDER.indexOf(best.tier))
    ) {
      best = { tier, plan, candidateCost, includedExtraIds }
    }
  }

  return best
}

const REMOVE_TARGET_PARTNER = '__partner__'
const REMOVE_TARGET_DRAFT_CHILD = '__draft_child__'

export function PmiPersonalise({
  benefitId: benefitIdProp,
}: {
  benefitId?: PmiBenefitId
}) {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const compareSeedTier = (
    location.state as { switchSeedTier?: PlanTier } | null
  )?.switchSeedTier
  const benefitId = (benefitIdProp ??
    (isPmiBenefitId(params.benefitId ?? '')
      ? params.benefitId
      : 'axa-pmi')) as PmiBenefitId

  const {
    getBenefit,
    getPlansForBenefit,
    plans,
    currentPlan,
    answers,
    setAnswers,
    committedAnswers,
    commitPersonalise,
    activeDependants,
    profile,
    loading,
    error,
  } = usePlanState()
  const benefit = getBenefit(benefitId)
  const switchSeededForBenefitRef = useRef<string | null>(null)
  /** Skip the unsaved-draft leave dialog after an intentional discard+navigate. */
  const allowLeaveWithoutPromptRef = useRef(false)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [newDependantForms, setNewDependantForms] = useState<DependantDetails[]>(
    [],
  )
  const paymentMethod = useMemo(() => readStoredPaymentMethod(), [confirmOpen])
  const [pendingChildRemovalIds, setPendingChildRemovalIds] = useState<
    string[]
  >([])
  const [applyRemovalReasons, setApplyRemovalReasons] = useState<
    Record<
      string,
      { code: DependantRemovalReasonCode | null; other: string }
    >
  >({})
  const [removeModalOpen, setRemoveModalOpen] = useState(false)
  const [removeModalMode, setRemoveModalMode] = useState<'child' | 'capacity'>(
    'child',
  )
  const [removeTarget, setRemoveTarget] = useState<string | null>(null)
  const [removeModalError, setRemoveModalError] = useState<string | null>(null)
  /** Snapshot before a cover-level change — shared by capacity Undo and lost-features Undo. */
  const [coverChangeSnapshot, setCoverChangeSnapshot] = useState<{
    answers: PersonaliseAnswers
    pendingChildRemovalIds: string[]
  } | null>(null)
  /** Hide upgrade hint until the suggested tier (or extras set) changes. */
  const [dismissedUpgradeHintKey, setDismissedUpgradeHintKey] = useState<
    string | null
  >(null)
  const [infoOpen, setInfoOpen] = useState<DependantInfoKind | null>(null)

  const providerPlans = getPlansForBenefit(benefitId)
  const enrolledPlan = useMemo(
    () => getEnrolledPlan(plans, currentPlan),
    [plans, currentPlan],
  )
  const draftPlan =
    providerPlans.find((p) => p.tier === answers.coverLevel) ??
    providerPlans.find((p) => p.tier === currentPlan.tier) ??
    providerPlans[0] ??
    null

  const personalisingOtherProvider = benefitId !== currentPlan.benefitId
  /** On switch, household is locked to enrolled committed answers. */
  const draftAnswers: PersonaliseAnswers = personalisingOtherProvider
    ? {
        ...answers,
        includePartner: committedAnswers.includePartner,
        childrenCount: committedAnswers.childrenCount,
      }
    : answers

  /** One-shot seed when entering another provider’s Personalise. */
  useEffect(() => {
    if (!personalisingOtherProvider) {
      switchSeededForBenefitRef.current = null
      return
    }
    const targetPlans = getPlansForBenefit(benefitId)
    if (targetPlans.length === 0) return
    if (switchSeededForBenefitRef.current === benefitId) return
    switchSeededForBenefitRef.current = benefitId
    const preferredTier =
      compareSeedTier && targetPlans.some((p) => p.tier === compareSeedTier)
        ? compareSeedTier
        : currentPlan.tier
    setAnswers(
      seedDraftForProvider(targetPlans, preferredTier, committedAnswers),
    )
    setPendingChildRemovalIds([])
    setApplyRemovalReasons({})
    // Only re-seed when the route benefit changes (or plans finish loading).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- committedAnswers/tier captured at entry
  }, [
    personalisingOtherProvider,
    benefitId,
    getPlansForBenefit,
    plans.length,
    setAnswers,
    compareSeedTier,
    currentPlan.tier,
  ])

  const switchSeedBaseline = useMemo(() => {
    if (!personalisingOtherProvider || providerPlans.length === 0) return null
    const preferredTier =
      compareSeedTier && providerPlans.some((p) => p.tier === compareSeedTier)
        ? compareSeedTier
        : currentPlan.tier
    return seedDraftForProvider(
      providerPlans,
      preferredTier,
      committedAnswers,
    )
  }, [
    personalisingOtherProvider,
    providerPlans,
    currentPlan.tier,
    committedAnswers,
    compareSeedTier,
  ])

  const hasDraftChanges =
    personalisingOtherProvider ||
    !answersEqual(answers, committedAnswers) ||
    pendingChildRemovalIds.length > 0

  const stillOnPersonalisePage = useCallback(
    (pathname: string) => {
      const base = `/benefits/${benefitId}/personalise`
      return (
        pathname === base || pathname.startsWith(`${base}/feature/`)
      )
    },
    [benefitId],
  )

  const shouldBlockLeave = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      if (allowLeaveWithoutPromptRef.current) {
        allowLeaveWithoutPromptRef.current = false
        return false
      }
      if (!hasDraftChanges) return false
      // Same path (incl. hash / search) or feature-detail child — never block.
      if (currentLocation.pathname === nextLocation.pathname) return false
      if (
        stillOnPersonalisePage(currentLocation.pathname) &&
        stillOnPersonalisePage(nextLocation.pathname)
      ) {
        return false
      }
      return stillOnPersonalisePage(currentLocation.pathname)
    },
    [hasDraftChanges, stillOnPersonalisePage],
  )

  const leaveBlocker = useBlocker(shouldBlockLeave)

  useEffect(() => {
    if (!hasDraftChanges) return
    function onBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [hasDraftChanges])

  const activeChildren = useMemo(
    () => activeDependants.filter((d) => d.relationship === 'child'),
    [activeDependants],
  )
  const activePartner = useMemo(
    () => activeDependants.find((d) => d.relationship === 'partner') ?? null,
    [activeDependants],
  )
  const removableChildren = useMemo(
    () =>
      activeChildren.filter((c) => !pendingChildRemovalIds.includes(c.id)),
    [activeChildren, pendingChildRemovalIds],
  )
  const draftOnlyChildren = Math.max(
    0,
    draftAnswers.childrenCount - removableChildren.length,
  )
  const dependantCap = draftPlan ? tierDependantCap(draftPlan) : 0
  const dependantOverflow = draftPlan
    ? overflowCount(draftAnswers, dependantCap)
    : 0

  /** Always the enrolled insurer’s plan — never rebound onto the page provider. */
  const committedPlan = useMemo(() => {
    if (!enrolledPlan) return null
    const enrolledProviderPlans = getPlansForBenefit(currentPlan.benefitId)
    return (
      enrolledProviderPlans.find(
        (p) => p.tier === committedAnswers.coverLevel,
      ) ?? enrolledPlan
    )
  }, [
    enrolledPlan,
    getPlansForBenefit,
    currentPlan.benefitId,
    committedAnswers.coverLevel,
  ])

  const committedBreakdown = useMemo(() => {
    if (!committedPlan) return null
    return getCostBreakdown(
      committedPlan,
      committedAnswers.selectedExtras,
      committedAnswers.includePartner,
      committedAnswers.childrenCount,
    )
  }, [committedPlan, committedAnswers])

  const matrixRows = useMemo(() => {
    if (!personalisingOtherProvider || !committedPlan) {
      return buildMatrixRows(providerPlans)
    }
    return buildMatrixRows(providerPlans, { currentPlan: committedPlan })
  }, [providerPlans, personalisingOtherProvider, committedPlan])

  const optionalExtras = useMemo(() => {
    if (!draftPlan) return []
    return draftPlan.features.filter((f) => f.optionalExtra)
  }, [draftPlan])

  const includedFeatures = useMemo(() => {
    if (!draftPlan) return []
    return draftPlan.features.filter((f) => f.included && !f.optionalExtra)
  }, [draftPlan])

  const draftBreakdown = useMemo(() => {
    if (!draftPlan) return null
    return getApplicableCostBreakdown(
      draftPlan,
      draftAnswers.selectedExtras,
      draftAnswers.includePartner,
      draftAnswers.childrenCount,
    )
  }, [draftPlan, draftAnswers])

  const fitInsight = useMemo(() => {
    if (!draftPlan || !profile) return null
    return checkPlanFit(draftPlan, plans, draftAnswers, profile)
  }, [draftPlan, plans, draftAnswers, profile])

  /** Keep / lose / gain whenever the draft cover differs — under Fit of this change. */
  const switchFeatureMatch = useMemo(() => {
    if (!committedPlan || !draftPlan) return null
    const samePlan = committedPlan.planId === draftPlan.planId
    const sameExtras =
      committedAnswers.selectedExtras.length ===
        draftAnswers.selectedExtras.length &&
      committedAnswers.selectedExtras.every((id) =>
        draftAnswers.selectedExtras.includes(id),
      )
    if (!personalisingOtherProvider && samePlan && sameExtras) return null
    return matchAccessibleFeatures(
      committedPlan,
      committedAnswers.selectedExtras,
      draftPlan,
      draftAnswers.selectedExtras,
    )
  }, [
    personalisingOtherProvider,
    committedPlan,
    draftPlan,
    committedAnswers.selectedExtras,
    draftAnswers.selectedExtras,
  ])

  const lostFeatures = useMemo(() => {
    if (!committedPlan || !draftPlan) return []
    if (switchFeatureMatch) {
      return switchFeatureMatch.lose.map((f) => ({
        featureId: f.featureId,
        featureName: f.featureName,
      }))
    }
    return featuresLostAccess(
      committedPlan,
      draftPlan,
      committedAnswers.selectedExtras,
      draftAnswers.selectedExtras,
    )
  }, [
    committedPlan,
    draftPlan,
    committedAnswers,
    draftAnswers,
    switchFeatureMatch,
  ])

  const featureAccessReview = useMemo(() => {
    if (!committedPlan || !draftPlan) {
      return { gained: [], lost: [] as typeof lostFeatures }
    }
    if (switchFeatureMatch) {
      return {
        gained: switchFeatureMatch.gain.map((f) => ({
          featureId: f.featureId,
          featureName: f.featureName,
          via: f.via,
        })),
        lost: switchFeatureMatch.lose.map((f) => ({
          featureId: f.featureId,
          featureName: f.featureName,
        })),
      }
    }
    return {
      gained: featuresGainedAccess(
        committedPlan,
        draftPlan,
        committedAnswers.selectedExtras,
        draftAnswers.selectedExtras,
      ),
      lost: featuresLostAccess(
        committedPlan,
        draftPlan,
        committedAnswers.selectedExtras,
        draftAnswers.selectedExtras,
      ),
    }
  }, [
    committedPlan,
    draftPlan,
    committedAnswers,
    draftAnswers,
    switchFeatureMatch,
  ])

  const coverFieldChanges = useMemo(
    () =>
      buildCoverFieldChanges(
        committedPlan,
        draftPlan,
        committedAnswers,
        draftAnswers,
        personalisingOtherProvider,
      ),
    [
      committedPlan,
      draftPlan,
      committedAnswers,
      draftAnswers,
      personalisingOtherProvider,
    ],
  )

  const upgradeSuggestion = useMemo(() => {
    if (!draftBreakdown) return null
    return suggestCheaperHigherTier(
      providerPlans,
      draftAnswers.coverLevel,
      draftAnswers.selectedExtras,
      draftAnswers.includePartner,
      draftAnswers.childrenCount,
      draftBreakdown.employeePays,
    )
  }, [providerPlans, draftAnswers, draftBreakdown])

  const upgradeHintKey = upgradeSuggestion
    ? `${upgradeSuggestion.tier}:${draftAnswers.selectedExtras.slice().sort().join(',')}`
    : null
  const showUpgradeHint =
    draftBreakdown?.householdCapped !== true &&
    upgradeSuggestion != null &&
    upgradeHintKey != null &&
    dismissedUpgradeHintKey !== upgradeHintKey

  if (loading) return <p className="p-8 text-ink-muted">Loading…</p>
  if (error || !draftPlan || !draftBreakdown) {
    return <p className="p-8 text-red-600">{error ?? 'Missing data'}</p>
  }

  const isEnrolledColumn = (tier: PlanTier) =>
    !personalisingOtherProvider && tier === currentPlan.tier

  const isSelectedColumn = (tier: PlanTier) => answers.coverLevel === tier

  function cellClass(tier: PlanTier): string {
    return [
      'px-3 py-2.5 text-center text-sm align-middle',
      isSelectedColumn(tier) ? 'bg-charcoal/5' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  function defaultRemoveTarget(opts: {
    includePartner: boolean
    children: typeof removableChildren
    draftOnly: number
    preferChildId?: string
  }): string | null {
    if (
      opts.preferChildId &&
      opts.children.some((c) => c.id === opts.preferChildId)
    ) {
      return opts.preferChildId
    }
    if (opts.children[0]) return opts.children[0].id
    if (opts.draftOnly > 0) return REMOVE_TARGET_DRAFT_CHILD
    if (opts.includePartner) return REMOVE_TARGET_PARTNER
    return null
  }

  function selectCover(tier: PlanTier) {
    if (tier === answers.coverLevel) return
    const targetPlan = providerPlans.find((p) => p.tier === tier)
    const snapshot = {
      answers: { ...answers },
      pendingChildRemovalIds: [...pendingChildRemovalIds],
    }
    const nextAnswers: PersonaliseAnswers = {
      ...answers,
      coverLevel: tier,
      ...(personalisingOtherProvider
        ? {
            includePartner: committedAnswers.includePartner,
            childrenCount: committedAnswers.childrenCount,
          }
        : {}),
      selectedExtras: answers.selectedExtras.filter((id) =>
        targetPlan?.features.some(
          (f) => f.featureId === id && f.optionalExtra,
        ),
      ),
    }
    setAnswers(nextAnswers)
    if (!targetPlan) return
    const cap = tierDependantCap(targetPlan)
    if (overflowCount(nextAnswers, cap) > 0) {
      if (personalisingOtherProvider) {
        // Household is locked on switch — pick a higher tier; no remove modal.
        setCoverChangeSnapshot(null)
        return
      }
      setCoverChangeSnapshot(snapshot)
      openCapacityRemoveModal(nextAnswers, { fromCoverChange: true })
    } else {
      setCoverChangeSnapshot(null)
    }
  }

  function discardDraft() {
    if (personalisingOtherProvider && switchSeedBaseline) {
      setAnswers({ ...switchSeedBaseline })
    } else {
      setAnswers({ ...committedAnswers })
    }
    setPendingChildRemovalIds([])
    setApplyRemovalReasons({})
    setConfirmOpen(false)
    setRemoveModalOpen(false)
    setRemoveModalMode('child')
    setRemoveTarget(null)
    setCoverChangeSnapshot(null)
  }

  function discardDraftAndReturnToSuggestion() {
    allowLeaveWithoutPromptRef.current = true
    discardDraft()
    navigate(`/benefits/${currentPlan.benefitId}`)
  }

  function openRemoveChildModal(preselectId?: string) {
    if (removableChildren.length === 0) return
    setCoverChangeSnapshot(null)
    setRemoveModalMode('child')
    setRemoveTarget(
      defaultRemoveTarget({
        includePartner: false,
        children: removableChildren,
        draftOnly: 0,
        preferChildId: preselectId,
      }),
    )
    setRemoveModalError(null)
    setRemoveModalOpen(true)
  }

  function openCapacityRemoveModal(
    fromAnswers: PersonaliseAnswers = answers,
    opts?: { fromCoverChange?: boolean },
  ) {
    if (!opts?.fromCoverChange) {
      setCoverChangeSnapshot(null)
    }
    const children = removableChildren
    const draftOnly = Math.max(
      0,
      fromAnswers.childrenCount - children.length,
    )
    const target = defaultRemoveTarget({
      includePartner: fromAnswers.includePartner,
      children,
      draftOnly,
    })
    if (!target) return
    setRemoveModalMode('capacity')
    setRemoveTarget(target)
    setRemoveModalError(null)
    setRemoveModalOpen(true)
  }

  function revertCoverLevelChange() {
    if (!coverChangeSnapshot) return
    setAnswers(coverChangeSnapshot.answers)
    setPendingChildRemovalIds(coverChangeSnapshot.pendingChildRemovalIds)
    setCoverChangeSnapshot(null)
    setRemoveModalOpen(false)
    setRemoveTarget(null)
    setRemoveModalError(null)
  }

  function keepFeatureAsAddon(featureId: string) {
    if (answers.selectedExtras.includes(featureId)) return
    setAnswers({
      ...answers,
      selectedExtras: [...answers.selectedExtras, featureId],
    })
  }

  function removeFeatureAddon(featureId: string) {
    if (!answers.selectedExtras.includes(featureId)) return
    setAnswers({
      ...answers,
      selectedExtras: answers.selectedExtras.filter((id) => id !== featureId),
    })
  }

  function confirmRemoveDraft() {
    if (!removeTarget) {
      setRemoveModalError(
        removeModalMode === 'capacity'
          ? 'Select who to remove.'
          : 'Select which child to remove.',
      )
      return
    }

    let nextAnswers = { ...answers }
    let nextPending = pendingChildRemovalIds
    let nextRemovable = removableChildren
    let nextDraftOnly = draftOnlyChildren

    if (removeTarget === REMOVE_TARGET_PARTNER) {
      nextAnswers = { ...nextAnswers, includePartner: false }
    } else if (removeTarget === REMOVE_TARGET_DRAFT_CHILD) {
      nextAnswers = {
        ...nextAnswers,
        childrenCount: Math.max(0, nextAnswers.childrenCount - 1),
      }
      nextDraftOnly = Math.max(0, nextDraftOnly - 1)
    } else {
      nextPending = [...pendingChildRemovalIds, removeTarget]
      nextRemovable = removableChildren.filter((c) => c.id !== removeTarget)
      nextAnswers = {
        ...nextAnswers,
        childrenCount: Math.max(0, nextAnswers.childrenCount - 1),
      }
      setPendingChildRemovalIds(nextPending)
    }

    setAnswers(nextAnswers)

    if (removeModalMode === 'capacity' && draftPlan) {
      const stillOver = overflowCount(
        nextAnswers,
        tierDependantCap(draftPlan),
      )
      if (stillOver > 0) {
        setRemoveTarget(
          defaultRemoveTarget({
            includePartner: nextAnswers.includePartner,
            children: nextRemovable,
            draftOnly: nextDraftOnly,
          }),
        )
        setRemoveModalError(null)
        return
      }
    }

    setRemoveModalOpen(false)
    setRemoveTarget(null)
    setCoverChangeSnapshot(null)
  }

  function requestFewerChildren() {
    if (answers.childrenCount <= 0) return
    // Uncommitted + adds are just a count bump — undo without who/why.
    const draftAdds = Math.max(
      0,
      answers.childrenCount - removableChildren.length,
    )
    if (draftAdds > 0) {
      setAnswers({
        ...answers,
        childrenCount: Math.max(0, answers.childrenCount - 1),
      })
      return
    }
    if (removableChildren.length > 0) {
      openRemoveChildModal()
      return
    }
    setAnswers({
      ...answers,
      childrenCount: Math.max(0, answers.childrenCount - 1),
    })
  }

  function openConfirm() {
    if (!draftBreakdown) return
    if (
      !hasDraftChanges ||
      dependantOverflow > 0 ||
      draftBreakdown.householdCapped
    ) {
      return
    }
    const forms: DependantDetails[] = []
    if (draftAnswers.includePartner && !activePartner) {
      forms.push(emptyDependant('partner'))
    }
    const committedActiveChildren = activeChildren.length
    const extraChildren = Math.max(
      0,
      draftAnswers.childrenCount -
        committedActiveChildren +
        pendingChildRemovalIds.length,
    )
    for (let i = 0; i < extraChildren; i++) {
      forms.push(emptyDependant('child'))
    }
    const partnerRemovalId =
      !draftAnswers.includePartner && activePartner
        ? activePartner.id
        : null
    const removalIds = [
      ...pendingChildRemovalIds,
      ...(partnerRemovalId ? [partnerRemovalId] : []),
    ]
    const reasons: Record<
      string,
      { code: DependantRemovalReasonCode | null; other: string }
    > = {}
    for (const id of removalIds) {
      reasons[id] = applyRemovalReasons[id] ?? { code: null, other: '' }
    }
    setApplyRemovalReasons(reasons)
    setNewDependantForms(forms)
    setConfirmOpen(true)
  }

  function handleLeaveDiscard() {
    discardDraft()
    if (leaveBlocker.state === 'blocked') leaveBlocker.proceed()
  }

  function handleLeaveApply() {
    if (leaveBlocker.state === 'blocked') leaveBlocker.reset()
    openConfirm()
  }

  function handleLeaveStay() {
    if (leaveBlocker.state === 'blocked') leaveBlocker.reset()
  }

  function closeConfirmWizard() {
    setConfirmOpen(false)
  }

  function closeRemoveModal() {
    if (coverChangeSnapshot && removeModalMode === 'capacity') {
      revertCoverLevelChange()
      return
    }
    setRemoveModalOpen(false)
    setRemoveTarget(null)
    setRemoveModalError(null)
  }

  useEffect(() => {
    const leaveBlocked = leaveBlocker.state === 'blocked'
    if (!infoOpen && !removeModalOpen && !confirmOpen && !leaveBlocked) {
      return
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      if (leaveBlocker.state === 'blocked') {
        leaveBlocker.reset()
        return
      }
      if (removeModalOpen) {
        closeRemoveModal()
        return
      }
      if (confirmOpen) {
        closeConfirmWizard()
        return
      }
      if (infoOpen) setInfoOpen(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [
    infoOpen,
    removeModalOpen,
    confirmOpen,
    leaveBlocker,
    coverChangeSnapshot,
    removeModalMode,
  ])

  function updateDependantForm(
    index: number,
    patch: Partial<DependantDetails>,
  ) {
    setNewDependantForms((prev) =>
      prev.map((d, i) => (i === index ? { ...d, ...patch } : d)),
    )
  }

  function updateApplyRemovalReason(
    id: string,
    patch: Partial<{ code: DependantRemovalReasonCode | null; other: string }>,
  ) {
    setApplyRemovalReasons((prev) => ({
      ...prev,
      [id]: {
        code: prev[id]?.code ?? null,
        other: prev[id]?.other ?? '',
        ...patch,
      },
    }))
  }

  function submitConfirm() {
    const trimmedDependants = newDependantForms.map(trimDependantDetails)
    const partnerRemovalId =
      !draftAnswers.includePartner && activePartner ? activePartner.id : null
    const removalIds = [
      ...pendingChildRemovalIds,
      ...(partnerRemovalId ? [partnerRemovalId] : []),
    ]
    const removals: DependantRemoval[] = []
    for (const id of removalIds) {
      const reason = applyRemovalReasons[id]
      if (!reason?.code) return
      if (reason.code === 'other' && !reason.other.trim()) return
      removals.push({
        id,
        reasonCode: reason.code,
        reasonOther:
          reason.code === 'other' ? reason.other.trim() : undefined,
      })
    }

    if (
      !draftBreakdown ||
      draftBreakdown.householdCapped ||
      draftBreakdown.quotedEmployeePays == null
    ) {
      return
    }
    const previousYouPay =
      committedBreakdown?.employeePays ?? draftBreakdown.quotedEmployeePays
    const nextYouPay = draftBreakdown.quotedEmployeePays
    const bullets: string[] = []
    for (const row of coverFieldChanges) {
      bullets.push(`${row.label}: ${row.before} → ${row.after}`)
    }
    if (featureAccessReview.gained.length > 0) {
      bullets.push(
        `You’ll gain access to ${featureAccessReview.gained.length} feature${featureAccessReview.gained.length === 1 ? '' : 's'}`,
      )
    }
    if (featureAccessReview.lost.length > 0) {
      bullets.push(
        `You’ll no longer have ${featureAccessReview.lost.length} feature${featureAccessReview.lost.length === 1 ? '' : 's'}`,
      )
    }
    if (draftAnswers.includePartner && !committedAnswers.includePartner) {
      bullets.push('Added partner')
    }
    if (!draftAnswers.includePartner && committedAnswers.includePartner) {
      bullets.push('Removed partner')
    }
    const childDelta =
      draftAnswers.childrenCount - committedAnswers.childrenCount
    if (childDelta > 0) {
      bullets.push(
        `Added ${childDelta} child${childDelta === 1 ? '' : 'ren'}`,
      )
    }
    if (childDelta < 0) {
      const n = Math.abs(childDelta)
      bullets.push(`Removed ${n} child${n === 1 ? '' : 'ren'}`)
    }
    const extrasAdded = draftAnswers.selectedExtras.filter(
      (id) => !committedAnswers.selectedExtras.includes(id),
    )
    const extrasRemoved = committedAnswers.selectedExtras.filter(
      (id) => !draftAnswers.selectedExtras.includes(id),
    )
    if (extrasAdded.length > 0) {
      bullets.push(
        `Added ${extrasAdded.length} add-on${extrasAdded.length === 1 ? '' : 's'}`,
      )
    }
    if (extrasRemoved.length > 0) {
      bullets.push(
        `Removed ${extrasRemoved.length} add-on${extrasRemoved.length === 1 ? '' : 's'}`,
      )
    }
    if (personalisingOtherProvider && committedPlan) {
      bullets.unshift(
        `Switched insurer: ${committedPlan.provider} → ${draftPlan.provider}`,
      )
    }
    if (bullets.length === 0) {
      bullets.push('Your cover details were updated.')
    }

    commitPersonalise(draftAnswers, benefitId, {
      dependantsToAdd: personalisingOtherProvider ? [] : trimmedDependants,
      dependantsToRemove: personalisingOtherProvider ? [] : removals,
    })
    switchSeededForBenefitRef.current = null
    setConfirmOpen(false)
    setNewDependantForms([])
    setPendingChildRemovalIds([])
    setApplyRemovalReasons({})

    if (personalisingOtherProvider) {
      // Commit updates currentPlan async; without this the leave-guard still
      // sees hasDraftChanges and intercepts the post-apply navigation.
      allowLeaveWithoutPromptRef.current = true
      navigate(`/benefits/${benefitId}`, {
        replace: true,
        state: {
          coverUpdated: {
            coverLabel: `${draftPlan.provider} ${TIER_LABELS[draftAnswers.coverLevel]}`,
            youPay: nextYouPay,
            delta: nextYouPay - previousYouPay,
            bullets: bullets.slice(0, 5),
          },
        },
      })
    }
  }

  // Refused household: no applyable price, so no “Saves £X” against current cover.
  const householdRefused = draftBreakdown.householdCapped
  const currentTotal =
    committedBreakdown?.employeePays ?? draftBreakdown.employeePays
  const quotedNew = householdRefused ? null : draftBreakdown.quotedEmployeePays
  const costDelta = quotedNew == null ? 0 : quotedNew - currentTotal
  const maxChildren = draftPlan.dependantsAllowed
    ? Math.max(
        0,
        draftPlan.maxDependants - (draftAnswers.includePartner ? 1 : 0),
      )
    : 0

  const fitRating = useMemo(() => {
    if (!fitInsight) return null

    const pros: string[] = []
    const cons: string[] = [...fitInsight.reasons]
    let score = fitInsight.score

    const hospitalBreadth = (list: string) => {
      const lower = list.trim().toLowerCase()
      if (lower.includes('extended') || lower.includes('wider')) return 2
      if (lower.includes('restricted') || lower.includes('limited')) return 0
      return 1
    }

    if (!householdRefused && costDelta < 0) {
      pros.push(`Saves £${Math.abs(costDelta)}/mo versus your current cover.`)
    } else if (!householdRefused && costDelta > 0) {
      const tierDrop =
        TIER_ORDER.indexOf(draftAnswers.coverLevel) <
        TIER_ORDER.indexOf(committedAnswers.coverLevel)
      if (tierDrop) {
        cons.push(
          `You’re paying £${costDelta}/mo more for a lower cover level.`,
        )
        score -= 20
      } else {
        cons.push(
          `This draft costs £${costDelta}/mo more than your current cover.`,
        )
        score -= 12
      }
    }

    // Claim access vs enrolled cover (excess, hospital list, feature access).
    if (committedPlan && draftPlan) {
      const draftTierIdx = TIER_ORDER.indexOf(draftAnswers.coverLevel)
      const committedTierIdx = TIER_ORDER.indexOf(committedAnswers.coverLevel)
      // Tier move alone is not a consumer reason — excess, hospital, and
      // feature access lines below explain the real trade-offs.
      if (draftTierIdx < committedTierIdx && costDelta <= 0) {
        score -= 8
      }

      if (draftPlan.excessGbp < committedPlan.excessGbp) {
        pros.push(
          `Claim excess drops from £${committedPlan.excessGbp} to £${draftPlan.excessGbp}.`,
        )
      } else if (draftPlan.excessGbp > committedPlan.excessGbp) {
        cons.push(
          `Claim excess rises from £${committedPlan.excessGbp} to £${draftPlan.excessGbp} — you pay more before cover starts.`,
        )
        score -= 10
      }

      const draftHospital = hospitalBreadth(draftPlan.hospitalList)
      const committedHospital = hospitalBreadth(committedPlan.hospitalList)
      if (draftHospital > committedHospital) {
        pros.push(
          `Wider hospital choice (${draftPlan.hospitalList}) than your current list.`,
        )
      } else if (draftHospital < committedHospital) {
        cons.push(
          `Hospital list narrows from ${committedPlan.hospitalList} to ${draftPlan.hospitalList}.`,
        )
        score -= 10
      }

      const gainedCount = featureAccessReview.gained.length
      if (gainedCount > 0) {
        pros.push(
          gainedCount === 1
            ? `Adds claim access to “${featureAccessReview.gained[0].featureName}”.`
            : `Adds claim access to ${gainedCount} benefits.`,
        )
      }
      const lostCount = featureAccessReview.lost.length
      if (lostCount > 0) {
        cons.push(
          lostCount === 1
            ? `You’d lose claim access to “${featureAccessReview.lost[0].featureName}”.`
            : `You’d lose claim access to ${lostCount} benefits on this draft.`,
        )
        score -= Math.min(25, 5 * lostCount)
      }
    }

    const uniquePros = pros.filter((r, i, arr) => arr.indexOf(r) === i)
    const uniqueCons = cons.filter((r, i, arr) => arr.indexOf(r) === i)
    score = Math.max(0, Math.min(100, score))

    const brandForCompare = (draftPlan?.provider ?? 'This insurer')
      .replace(/\s+Health$/i, '')
      .trim()
    const brandPossessive = /s$/i.test(brandForCompare)
      ? `${brandForCompare}'`
      : `${brandForCompare}'s`
    const recommendedTier = [...new Set(fitInsight.recommendedTier)].filter(
      (t) => t !== draftAnswers.coverLevel,
    )
    const compareLabels = recommendedTier.map((t) => {
      const plan = providerPlans.find((p) => p.tier === t)
      const coverName = plan ? shortPlanName(plan) : TIER_LABELS[t]
      return `${brandPossessive} ${coverName} cover`
    })

    const softOnly =
      uniqueCons.length > 0 &&
      uniqueCons.every((r) => r.includes('most useful'))

    const base = {
      pros: uniquePros,
      cons: uniqueCons,
      recommendedCompare: compareLabels,
    }

    if (dependantOverflow > 0 || householdRefused || score < 40) {
      return {
        ...base,
        level: 'poor' as const,
        verdict: 'This is not a good fit',
        headline: 'Fit of this change: Bad',
        accent: 'bg-rose-500',
        chip: 'border-rose-200 bg-rose-50 text-rose-950 hover:border-rose-300',
        box: 'border-rose-200 bg-rose-50 text-rose-950',
        muted: 'text-rose-950/90',
        tip: 'text-rose-950/75',
      }
    }
    if (
      (fitInsight.ideal && costDelta <= 0 && uniqueCons.length === 0) ||
      (score >= 70 && uniqueCons.length === 0) ||
      (score >= 70 && softOnly)
    ) {
      return {
        ...base,
        level: 'good' as const,
        verdict: 'This is a good fit',
        headline: 'Fit of this change: Good',
        accent: 'bg-emerald-500',
        chip: 'border-emerald-200 bg-emerald-50 text-emerald-950 hover:border-emerald-300',
        box: 'border-emerald-200 bg-emerald-50 text-emerald-950',
        muted: 'text-emerald-950/90',
        tip: 'text-emerald-950/75',
      }
    }
    return {
      ...base,
      level: 'mixed' as const,
      verdict: 'This is a fair fit',
      headline: 'Fit of this change: Fair',
      accent: 'bg-amber-500',
      chip: 'border-amber-200 bg-amber-50 text-amber-950 hover:border-amber-300',
      box: 'border-amber-200 bg-amber-50 text-amber-950',
      muted: 'text-amber-950/90',
      tip: 'text-amber-950/75',
    }
  }, [
    fitInsight,
    dependantOverflow,
    householdRefused,
    costDelta,
    draftAnswers.coverLevel,
    committedAnswers.coverLevel,
    committedPlan,
    draftPlan,
    featureAccessReview.lost,
    featureAccessReview.gained,
    providerPlans,
  ])

  const showCurrentColumn =
    personalisingOtherProvider && Boolean(committedPlan)

  const draftEditors = (
    <>
        <section className="rounded-[10px] border border-border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-ink">
            {personalisingOtherProvider
              ? `Compare & pick cover on ${draftPlan.provider}`
              : 'Change your cover level'}
          </h2>
          <div className="overflow-x-auto">
            <table
              className={[
                'w-full border-collapse text-left',
                showCurrentColumn ? 'min-w-[720px]' : 'min-w-[520px] table-fixed',
              ].join(' ')}
            >
              {!showCurrentColumn ? (
                <colgroup>
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                </colgroup>
              ) : null}
              <thead>
                <tr className="border-b border-border">
                  <th
                    className={[
                      'py-2 pr-3 text-xs font-semibold uppercase tracking-wide text-ink-muted',
                      showCurrentColumn
                        ? 'sticky left-0 z-20 min-w-[7.5rem] bg-white'
                        : '',
                    ].join(' ')}
                  >
                    Feature
                  </th>
                  {showCurrentColumn && committedPlan ? (
                    <th
                      className="sticky left-[7.5rem] z-20 min-w-[9.5rem] bg-amber-50/95 p-1 text-center shadow-[2px_0_0_0_rgba(217,119,6,0.35)]"
                    >
                      <div className="rounded-lg border border-amber-300 bg-amber-50 px-2 py-2 text-sm font-semibold text-amber-950">
                        Your plan
                        <span className="mt-0.5 block text-[10px] font-normal leading-tight text-amber-950/75">
                          {committedPlan.provider}
                        </span>
                        <span className="mt-0.5 block text-[10px] font-normal leading-tight text-amber-950/75">
                          {committedPlan.planName ||
                            TIER_LABELS[committedAnswers.coverLevel]}
                        </span>
                      </div>
                    </th>
                  ) : null}
                  {TIER_ORDER.map((tier) => {
                    const enrolled = isEnrolledColumn(tier)
                    const selected = isSelectedColumn(tier)
                    const tierPlan = providerPlans.find((p) => p.tier === tier)
                    const headerClass = [
                      'relative w-full min-w-[7rem] rounded-lg px-2 py-2 text-sm font-semibold transition',
                      selected
                        ? 'bg-charcoal text-white'
                        : 'bg-canvas text-ink hover:bg-charcoal/10',
                    ].join(' ')
                    return (
                      <th key={tier} className="p-1 text-center">
                        <button
                          type="button"
                          onClick={() => selectCover(tier)}
                          className={headerClass}
                          aria-pressed={selected}
                          aria-current={enrolled || undefined}
                        >
                          {tierPlan
                            ? shortPlanName(tierPlan)
                            : TIER_LABELS[tier]}
                          {enrolled && (
                            <span
                              className={[
                                'mt-1 block text-[10px] font-medium uppercase tracking-wide',
                                selected ? 'text-white/80' : 'text-ink-muted',
                              ].join(' ')}
                            >
                              Current
                            </span>
                          )}
                          {selected && !enrolled && (
                            <span className="mt-1 block text-[10px] font-medium uppercase tracking-wide text-white/80">
                              Selected
                            </span>
                          )}
                        </button>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-border/70 last:border-0"
                  >
                    <th
                      scope="row"
                      className={[
                        'py-2.5 pr-3 text-sm font-medium text-ink',
                        showCurrentColumn
                          ? 'sticky left-0 z-10 min-w-[7.5rem] bg-white'
                          : '',
                      ].join(' ')}
                    >
                      {row.label}
                    </th>
                    {showCurrentColumn && row.current ? (
                      <td className="sticky left-[7.5rem] z-10 min-w-[9.5rem] bg-amber-50/90 px-3 py-2.5 text-center text-sm align-middle shadow-[2px_0_0_0_rgba(217,119,6,0.35)]">
                        <MatrixCell cell={row.current} />
                      </td>
                    ) : null}
                    {TIER_ORDER.map((tier) => (
                      <td key={tier} className={cellClass(tier)}>
                        <button
                          type="button"
                          onClick={() => selectCover(tier)}
                          className="flex w-full min-w-[7rem] items-center justify-center px-1 text-center"
                        >
                          <MatrixCell cell={row.values[tier]} />
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {personalisingOtherProvider && dependantOverflow > 0 ? (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-950">
              Your household (
              {dependantHeadcount(draftAnswers)} dependant
              {dependantHeadcount(draftAnswers) === 1 ? '' : 's'}) does not fit{' '}
              {draftPlan.planName || TIER_LABELS[draftAnswers.coverLevel]}
              {dependantCap === 0
                ? ' (no family cover)'
                : ` (max ${dependantCap})`}
              . Select a higher {draftPlan.provider} tier to continue.
            </div>
          ) : null}
        </section>

        {!personalisingOtherProvider ? (
        <>
        <section className="rounded-[10px] border border-border bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-xl font-semibold text-ink">Dependants</h2>
          <p className="mb-4 text-sm text-ink-muted">
            Currently:{' '}
            <strong className="text-ink">
              {dependantHeadcount(answers) === 0
                ? 'none'
                : [
                    answers.includePartner ? '1 partner' : null,
                    answers.childrenCount > 0
                      ? `${answers.childrenCount} child${answers.childrenCount === 1 ? '' : 'ren'}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(', ')}
            </strong>
          </p>

          {dependantOverflow > 0 && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-ink">
              <p>
                {draftPlan.planName} allows{' '}
                {dependantCap === 0
                  ? 'no dependants'
                  : `up to ${dependantCap} dependant${dependantCap === 1 ? '' : 's'}`}
                . Remove {dependantOverflow} more to continue.
              </p>
              <button
                type="button"
                onClick={() => openCapacityRemoveModal()}
                className="mt-2 text-sm font-medium text-ink underline-offset-2 hover:underline"
              >
                Choose who to remove
              </button>
            </div>
          )}

          {!draftPlan.dependantsAllowed ? (
            <p className="text-sm text-ink-muted">
              {draftPlan.planName} doesn’t include family cover. Family options
              need Comprehensive or Premier.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  Partner
                  <button
                    type="button"
                    onClick={() => setInfoOpen('partner')}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-[11px] font-semibold text-ink-muted hover:border-charcoal hover:text-ink"
                    aria-label="Partner eligibility information"
                  >
                    i
                  </button>
                </span>
                <button
                  type="button"
                  disabled={
                    answers.includePartner ||
                    dependantHeadcount(answers) >= dependantCap
                  }
                  onClick={() =>
                    setAnswers({ ...answers, includePartner: true })
                  }
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Add partner (+£{draftPlan.partnerMonthlyCostGbp}/mo)
                </button>
                {answers.includePartner && (
                  <button
                    type="button"
                    onClick={() =>
                      setAnswers({ ...answers, includePartner: false })
                    }
                    className="rounded-md px-3 py-1.5 text-xs font-medium text-ink-muted underline-offset-2 hover:underline"
                  >
                    Remove partner
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  Children
                  <button
                    type="button"
                    onClick={() => setInfoOpen('children')}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-[11px] font-semibold text-ink-muted hover:border-charcoal hover:text-ink"
                    aria-label="Child eligibility information"
                  >
                    i
                  </button>
                </span>
                <button
                  type="button"
                  disabled={answers.childrenCount <= 0}
                  onClick={requestFewerChildren}
                  className="h-8 w-8 rounded-md border border-border text-sm font-semibold disabled:opacity-40"
                  aria-label="Fewer children"
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center text-sm font-semibold text-ink">
                  {answers.childrenCount}
                </span>
                <button
                  type="button"
                  disabled={answers.childrenCount >= maxChildren}
                  onClick={() => {
                    setAnswers({
                      ...answers,
                      childrenCount: Math.min(
                        maxChildren,
                        answers.childrenCount + 1,
                      ),
                    })
                  }}
                  className="h-8 w-8 rounded-md border border-border text-sm font-semibold disabled:opacity-40"
                  aria-label="More children"
                >
                  +
                </button>
                <span className="text-xs text-ink-muted">
                  +£{draftPlan.childMonthlyCostGbp}/mo each · up to{' '}
                  {draftPlan.maxDependants} dependants
                </span>
              </div>
            </div>
          )}
        </section>

        {infoOpen && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 p-4"
            role="presentation"
            onClick={() => setInfoOpen(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="dependant-info-title"
              className="w-full max-w-sm rounded-[10px] border border-border bg-white p-5 text-left shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                id="dependant-info-title"
                className="text-lg font-semibold text-ink"
              >
                {DEPENDANT_ELIGIBILITY[infoOpen].title}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-muted">
                {DEPENDANT_ELIGIBILITY[infoOpen].bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
                {infoOpen === 'children' && (
                  <li>
                    This cover allows up to {draftPlan.maxDependants}{' '}
                    dependants in total (partner and children combined).
                  </li>
                )}
              </ul>
              <button
                type="button"
                onClick={() => setInfoOpen(null)}
                className="mt-5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
              >
                Close
              </button>
            </div>
          </div>
        )}
        </>
        ) : null}

        <section className="rounded-[10px] border border-border bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-ink">
            Optional extras
          </h2>

          <h3 className="mb-3 text-sm font-semibold text-ink">
            Paid add-ons
          </h3>
          {optionalExtras.length === 0 ? (
            <p
              className={[
                'text-sm text-ink-muted',
                showUpgradeHint ? 'mb-3' : 'mb-6',
              ].join(' ')}
            >
              No paid add-ons on this cover level.
            </p>
          ) : (
            <ul
              className={[
                'space-y-2',
                showUpgradeHint ? 'mb-3' : 'mb-6',
              ].join(' ')}
            >
              {optionalExtras.map((f) => {
                const selected = answers.selectedExtras.includes(f.featureId)
                return (
                  <li
                    key={f.featureId}
                    className={[
                      'rounded-lg border px-3 py-3',
                      selected
                        ? 'border-charcoal/25 bg-white'
                        : 'border-border bg-canvas/40',
                    ].join(' ')}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1 text-sm">
                        <Link
                          to={`/benefits/${benefitId}/personalise/feature/${f.featureId}`}
                          className="font-medium text-ink underline-offset-2 hover:underline"
                        >
                          {f.featureName}
                        </Link>
                        <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                          {f.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5 self-start">
                        {selected ? (
                          <button
                            type="button"
                            onClick={() =>
                              setAnswers({
                                ...answers,
                                selectedExtras: answers.selectedExtras.filter(
                                  (id) => id !== f.featureId,
                                ),
                              })
                            }
                            className="rounded-md px-3 py-1.5 text-xs font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline"
                          >
                            Remove (−£{f.extraMonthlyCostGbp}/mo)
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setAnswers({
                                ...answers,
                                selectedExtras: [
                                  ...answers.selectedExtras,
                                  f.featureId,
                                ],
                              })
                            }
                            className="rounded-md border border-charcoal bg-charcoal px-3 py-1.5 text-xs font-medium text-white"
                          >
                            Add · +£{f.extraMonthlyCostGbp}/mo
                          </button>
                        )}
                      </div>
                    </div>
                    {selected &&
                      !committedAnswers.selectedExtras.includes(
                        f.featureId,
                      ) && (
                      <p className="mt-1.5 text-[11px] text-ink-muted">
                        In your draft. Apply to confirm changes.
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
          )}

          {showUpgradeHint && upgradeSuggestion ? (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-amber-950">
                    A higher cover may cost less
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-950/80">
                    {upgradeSuggestion.plan.planName ||
                      TIER_LABELS[upgradeSuggestion.tier]}{' '}
                    includes {upgradeSuggestion.includedExtraIds.length} of
                    your selected add-on
                    {upgradeSuggestion.includedExtraIds.length === 1
                      ? ''
                      : 's'}
                    . You would pay about £
                    {upgradeSuggestion.candidateCost}/mo instead of £
                    {draftBreakdown.employeePays}/mo (−£
                    {draftBreakdown.employeePays -
                      upgradeSuggestion.candidateCost}
                    ).
                  </p>
                  <button
                    type="button"
                    onClick={() => selectCover(upgradeSuggestion.tier)}
                    className="mt-3 rounded-lg bg-charcoal px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Switch to{' '}
                    {upgradeSuggestion.plan.planName ||
                      TIER_LABELS[upgradeSuggestion.tier]}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setDismissedUpgradeHintKey(upgradeHintKey)}
                  className="shrink-0 text-xs font-medium text-amber-950/60 underline-offset-2 hover:text-amber-950 hover:underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ) : null}

          <h3 className="mb-3 text-sm font-semibold text-ink">
            Included features
          </h3>
          <ul className="grid gap-x-8 gap-y-1.5 text-sm text-ink sm:grid-cols-2">
            {includedFeatures.map((f) => (
              <li key={f.featureId}>
                <Link
                  to={`/benefits/${benefitId}/personalise/feature/${f.featureId}`}
                  className="text-ink underline-offset-2 hover:underline"
                >
                  {f.featureName}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {fitRating ? (
          <section
            id="fit-details"
            className={[
              'scroll-mt-6 rounded-[10px] border px-4 py-4 text-left text-sm',
              fitRating.box,
            ].join(' ')}
          >
            <h2 className="text-base font-semibold">{fitRating.headline}</h2>
            {fitRating.pros.length === 0 && fitRating.cons.length === 0 ? (
              <p
                className={[
                  'mt-2 text-xs leading-relaxed',
                  fitRating.muted,
                ].join(' ')}
              >
                Household, priorities, price, and claim access look aligned
                with this draft.
              </p>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-emerald-200/70 bg-white/55 px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                    Working well
                  </p>
                  {fitRating.pros.length > 0 ? (
                    <ul className="mt-1.5 space-y-1.5 text-xs leading-relaxed text-emerald-950/90">
                      {fitRating.pros.slice(0, 4).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span
                            className="mt-0.5 shrink-0 font-semibold text-emerald-700"
                            aria-hidden
                          >
                            +
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1.5 text-xs leading-relaxed text-emerald-950/65">
                      No clear upsides versus your current cover yet.
                    </p>
                  )}
                </div>
                <div className="rounded-lg border border-rose-200/70 bg-white/55 px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-rose-800">
                    Trade-offs
                  </p>
                  {fitRating.cons.length > 0 ? (
                    <ul className="mt-1.5 space-y-1.5 text-xs leading-relaxed text-rose-950/90">
                      {fitRating.cons.slice(0, 4).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span
                            className="mt-0.5 shrink-0 font-semibold text-rose-700"
                            aria-hidden
                          >
                            −
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1.5 text-xs leading-relaxed text-rose-950/65">
                      No material trade-offs spotted on this draft.
                    </p>
                  )}
                </div>
              </div>
            )}
            {fitRating.recommendedCompare.length > 0 &&
            fitRating.level !== 'good' ? (
              <p className={['mt-3 text-xs', fitRating.tip].join(' ')}>
                Worth comparing: {fitRating.recommendedCompare.join('; ')}.
              </p>
            ) : null}
          </section>
        ) : null}

        {switchFeatureMatch ? (
          <section className="rounded-[10px] border border-border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">
              {personalisingOtherProvider
                ? 'Which features change after you switch'
                : 'Which features change with this cover'}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Your {committedPlan?.provider}{' '}
              {committedPlan
                ? TIER_LABELS[committedAnswers.coverLevel]
                : 'cover'}{' '}
              vs {draftPlan.provider} {TIER_LABELS[draftAnswers.coverLevel]}.
              Open a name for details.
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-[10px] border border-border bg-canvas/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-ink">You keep</h3>
                  <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold tabular-nums text-ink shadow-sm">
                    {switchFeatureMatch.keep.length}
                  </span>
                </div>
                {switchFeatureMatch.keep.length === 0 ? (
                  <p className="mt-3 text-xs text-ink-muted">No close matches</p>
                ) : (
                  <ul className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
                    {switchFeatureMatch.keep.map((pair) => (
                      <li
                        key={`${pair.from.featureId}->${pair.to.featureId}`}
                        className="rounded-lg border border-border/70 bg-white px-2.5 py-2 text-xs leading-snug"
                      >
                        {pair.from.featureName === pair.to.featureName ? (
                          <Link
                            to={`/benefits/${benefitId}/personalise/feature/${pair.to.featureId}`}
                            className="font-medium text-ink underline decoration-border underline-offset-2 hover:decoration-ink"
                          >
                            {pair.to.featureName}
                          </Link>
                        ) : (
                          <span className="flex flex-col gap-1">
                            <Link
                              to={`/benefits/${benefitId}/personalise/feature/${pair.from.featureId}`}
                              state={{ detailBenefitId: currentPlan.benefitId }}
                              className="text-ink-muted underline decoration-border/80 underline-offset-2 hover:text-ink hover:decoration-ink"
                            >
                              {pair.from.featureName}
                            </Link>
                            <span className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">
                              becomes
                            </span>
                            <Link
                              to={`/benefits/${benefitId}/personalise/feature/${pair.to.featureId}`}
                              className="font-medium text-ink underline decoration-border underline-offset-2 hover:decoration-ink"
                            >
                              {pair.to.featureName}
                            </Link>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-[10px] border border-amber-200 bg-amber-50/70 p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-amber-950">
                    You lose
                  </h3>
                  <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-amber-950">
                    {switchFeatureMatch.lose.length}
                  </span>
                </div>
                {switchFeatureMatch.lose.length === 0 ? (
                  <p className="mt-3 text-xs text-amber-950/70">
                    Nothing unique lost
                  </p>
                ) : (
                  <ul className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
                    {switchFeatureMatch.lose.map((f) => (
                      <li
                        key={f.featureId}
                        className="rounded-lg border border-amber-200/80 bg-white px-2.5 py-2 text-xs leading-snug"
                      >
                        <Link
                          to={`/benefits/${benefitId}/personalise/feature/${f.featureId}`}
                          state={{ detailBenefitId: currentPlan.benefitId }}
                          className="font-medium text-amber-950 underline decoration-amber-300 underline-offset-2 hover:decoration-amber-700"
                        >
                          {f.featureName}
                        </Link>
                        <p className="mt-0.5 text-[11px] text-amber-950/65">
                          Not on {draftPlan.provider}{' '}
                          {TIER_LABELS[draftAnswers.coverLevel]}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-[10px] border border-emerald-200 bg-emerald-50/70 p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-emerald-900">
                    You gain
                  </h3>
                  <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-emerald-900">
                    {switchFeatureMatch.gain.length}
                  </span>
                </div>
                {switchFeatureMatch.gain.length === 0 ? (
                  <p className="mt-3 text-xs text-emerald-900/70">
                    Nothing unique gained
                  </p>
                ) : (
                  <ul className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
                    {switchFeatureMatch.gain.map((f) => (
                      <li
                        key={f.featureId}
                        className="rounded-lg border border-emerald-200/80 bg-white px-2.5 py-2 text-xs leading-snug"
                      >
                        <Link
                          to={`/benefits/${benefitId}/personalise/feature/${f.featureId}`}
                          className="font-medium text-emerald-950 underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-700"
                        >
                          {f.featureName}
                        </Link>
                        <p className="mt-0.5 text-[11px] text-emerald-900/65">
                          {f.via === 'included' ? 'Included' : 'Paid add-on'}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        ) : null}

    </>
  )

  return (
    <div className="px-8 py-6 text-left">
      <Link
        to={`/benefits/${benefitId}`}
        className="mb-3 inline-flex text-sm text-ink-muted hover:text-ink"
      >
        ‹ Back to {benefit?.title ?? 'Private medical insurance'}
      </Link>
      <h1 className="text-2xl font-bold text-ink">
        {personalisingOtherProvider
          ? `Model a switch to ${benefit?.provider ?? 'this insurer'}`
          : `Personalise ${benefit?.provider ?? 'your'} medical insurance`}
      </h1>

      <div className="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 space-y-5 md:col-start-1">{draftEditors}</div>

        <aside className="order-first self-start sticky top-0 z-10 md:order-none md:col-start-2 md:row-start-1 md:sticky md:top-4">
          <div className="rounded-[10px] border border-border bg-white/95 p-3 shadow-sm backdrop-blur md:bg-white md:p-5 md:backdrop-blur-none">
            <div className="rounded-lg bg-canvas/80 px-3 py-2.5 md:px-3.5 md:py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted md:text-xs">
                Current price
              </p>
              {committedPlan ? (
                <p className="mt-0.5 text-[10px] text-ink-muted">
                  Your {committedPlan.provider} cover
                </p>
              ) : null}
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {(committedBreakdown?.grossMonthly ??
                  draftBreakdown.grossMonthly) >
                  currentTotal && (
                  <span
                    className="text-lg font-semibold tabular-nums text-ink/35 line-through decoration-ink/30 md:text-xl"
                    aria-label={`Full price without benefit £${committedBreakdown?.grossMonthly ?? draftBreakdown.grossMonthly}`}
                  >
                    £
                    {committedBreakdown?.grossMonthly ??
                      draftBreakdown.grossMonthly}
                  </span>
                )}
                <span className="text-3xl font-bold leading-none tabular-nums text-ink md:text-4xl">
                  £{currentTotal}
                </span>
                <span className="text-xs font-medium text-ink-muted">/mo</span>
                <BikTaxNote
                  variant="inline"
                  tone="neutral"
                  employerFundingGbp={
                    committedBreakdown?.bikTaxableValue ??
                    draftBreakdown.bikTaxableValue
                  }
                  className="ml-0.5"
                />
              </div>
            </div>

            {hasDraftChanges && (
              <div
                className={[
                  'mt-2 rounded-lg border px-3 py-2.5 md:mt-3 md:px-3.5 md:py-3',
                  costDelta < 0
                    ? 'border-emerald-200 bg-emerald-50'
                    : costDelta > 0
                      ? 'border-amber-200 bg-amber-50'
                      : 'border-border bg-canvas/60',
                ].join(' ')}
              >
                <p
                  className={[
                    'text-[11px] font-medium uppercase tracking-wide md:text-xs',
                    costDelta < 0
                      ? 'text-emerald-800/80'
                      : costDelta > 0
                        ? 'text-amber-900/70'
                        : 'text-ink-muted',
                  ].join(' ')}
                >
                  {householdRefused ? 'Price unavailable' : 'New price'}
                </p>
                <p
                  className={[
                    'mt-0.5 text-[10px]',
                    costDelta < 0
                      ? 'text-emerald-900/70'
                      : costDelta > 0
                        ? 'text-amber-950/70'
                        : 'text-ink-muted',
                  ].join(' ')}
                >
                  Draft on {draftPlan.provider}
                </p>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {quotedNew != null &&
                    draftBreakdown.grossMonthly > quotedNew && (
                    <span
                      className={[
                        'text-lg font-semibold tabular-nums line-through md:text-xl',
                        costDelta < 0
                          ? 'text-emerald-900/45 decoration-emerald-900/40'
                          : costDelta > 0
                            ? 'text-amber-950/40 decoration-amber-950/35'
                            : 'text-ink-muted decoration-ink-muted/40',
                      ].join(' ')}
                      aria-label={`Full price without benefit £${draftBreakdown.grossMonthly}`}
                    >
                      £{draftBreakdown.grossMonthly}
                    </span>
                  )}
                  <span
                    className={[
                      'text-3xl font-bold leading-none tabular-nums md:text-4xl',
                      costDelta < 0
                        ? 'text-emerald-700'
                        : costDelta > 0
                          ? 'text-amber-950'
                          : 'text-ink',
                    ].join(' ')}
                  >
                    {quotedNew == null ? '—' : `£${quotedNew}`}
                  </span>
                  {quotedNew != null ? (
                    <span
                      className={[
                        'text-xs font-medium',
                        costDelta < 0
                          ? 'text-emerald-900/70'
                          : costDelta > 0
                            ? 'text-amber-950/70'
                            : 'text-ink-muted',
                      ].join(' ')}
                    >
                      /mo
                    </span>
                  ) : null}
                  {quotedNew != null ? (
                    <BikTaxNote
                      variant="inline"
                      tone={costDelta < 0 ? 'emerald' : 'neutral'}
                      employerFundingGbp={draftBreakdown.bikTaxableValue}
                      className="ml-0.5"
                    />
                  ) : null}
                </div>
                <p
                  className={[
                    'mt-1.5 text-[11px]',
                    costDelta < 0
                      ? 'text-emerald-900/65'
                      : costDelta > 0
                        ? 'text-amber-950/70'
                        : 'text-ink-muted',
                  ].join(' ')}
                >
                  {householdRefused || dependantOverflow > 0
                    ? 'Can’t apply until the household fits this cover'
                    : costDelta === 0
                      ? 'Same cash cost if you apply'
                      : costDelta > 0
                        ? `+£${costDelta}/mo if you apply`
                        : `−£${Math.abs(costDelta)}/mo if you apply`}
                </p>
              </div>
            )}

            {showUpgradeHint && upgradeSuggestion ? (
              <p className="mt-2 text-[11px] leading-snug text-amber-900/80">
                Tip: {upgradeSuggestion.plan.planName || TIER_LABELS[upgradeSuggestion.tier]}{' '}
                could be £
                {draftBreakdown.employeePays - upgradeSuggestion.candidateCost}
                /mo less. See add-ons below.
              </p>
            ) : null}

            {fitRating ? (
              <a
                href="#fit-details"
                className={[
                  'mt-3 flex w-full items-stretch overflow-hidden rounded-[10px] border transition md:mt-4',
                  fitRating.chip,
                ].join(' ')}
              >
                <span
                  className={['w-1.5 shrink-0', fitRating.accent].join(' ')}
                  aria-hidden
                />
                <span className="flex min-w-0 flex-1 flex-col gap-1.5 px-3 py-3 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em] opacity-70">
                    AI overview
                  </span>
                  <span className="text-lg font-bold leading-snug tracking-tight">
                    {fitRating.verdict}
                  </span>
                  <span className="text-[11px] font-medium underline-offset-2 opacity-70 hover:underline">
                    See why
                  </span>
                </span>
              </a>
            ) : null}

            {/* Category breakdown only on enrolled cover when household fits. */}
            {!personalisingOtherProvider &&
            dependantOverflow === 0 &&
            !householdRefused ? (
              <div className="mt-3 hidden border-t border-border pt-4 md:mt-4 md:block">
                <table className="w-full table-fixed border-collapse text-left text-xs">
                  <thead>
                    <tr className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">
                      <th className="pb-2 pr-1 font-medium">Category</th>
                      <th className="pb-2 px-1 text-right font-medium">
                        Total
                      </th>
                      <th className="rounded-t-md bg-canvas/80 pb-2 pl-1.5 pr-1.5 text-right font-semibold text-ink">
                        You pay
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-ink">
                    <tr>
                      <td className="py-1 pr-1 text-ink-muted">Base</td>
                      <td className="py-1 px-1 text-right tabular-nums">
                        £{draftBreakdown.grossBase}
                      </td>
                      <td className="bg-canvas/80 py-1 pl-1.5 pr-1.5 text-right font-medium tabular-nums">
                        £{draftBreakdown.base}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-1 text-ink-muted">Partner</td>
                      <td className="py-1 px-1 text-right tabular-nums">
                        {draftBreakdown.grossPartner
                          ? `£${draftBreakdown.grossPartner}`
                          : '—'}
                      </td>
                      <td className="bg-canvas/80 py-1 pl-1.5 pr-1.5 text-right font-medium tabular-nums">
                        {draftBreakdown.partner
                          ? `£${draftBreakdown.partner}`
                          : '—'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-1 text-ink-muted">
                        Children
                        {draftAnswers.childrenCount > 0
                          ? ` (${draftAnswers.childrenCount})`
                          : ''}
                      </td>
                      <td className="py-1 px-1 text-right tabular-nums">
                        {draftBreakdown.grossChildren
                          ? `£${draftBreakdown.grossChildren}`
                          : '—'}
                      </td>
                      <td className="bg-canvas/80 py-1 pl-1.5 pr-1.5 text-right font-medium tabular-nums">
                        {draftBreakdown.children
                          ? `£${draftBreakdown.children}`
                          : '—'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-1 text-ink-muted">Extras</td>
                      <td className="py-1 px-1 text-right tabular-nums">
                        {draftBreakdown.grossExtras
                          ? `£${draftBreakdown.grossExtras}`
                          : '—'}
                      </td>
                      <td className="bg-canvas/80 py-1 pl-1.5 pr-1.5 text-right font-medium tabular-nums">
                        {draftBreakdown.extras
                          ? `£${draftBreakdown.extras}`
                          : '—'}
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="pt-2 pr-1 font-medium text-ink">Total</td>
                      <td className="pt-2 px-1 text-right font-medium tabular-nums">
                        £{draftBreakdown.grossMonthly}
                      </td>
                      <td className="rounded-b-md bg-canvas/80 pt-2 pl-1.5 pr-1.5 text-right font-semibold tabular-nums">
                        £{draftBreakdown.employeePays}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}

            <div className="mt-3 space-y-3 border-t border-border pt-3 md:mt-5 md:pt-4">
              <button
                type="button"
                disabled={
                  !hasDraftChanges || dependantOverflow > 0 || householdRefused
                }
                onClick={openConfirm}
                className="w-full rounded-lg bg-charcoal px-3 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:py-2.5 md:text-sm"
              >
                {personalisingOtherProvider
                  ? 'Apply insurer switch'
                  : 'Apply / confirm changes'}
              </button>
              {householdRefused || dependantOverflow > 0 ? (
                <p className="text-center text-xs text-amber-800">
                  {personalisingOtherProvider
                    ? 'You can’t switch to this plan with your current dependant cover.'
                    : dependantOverflow > 0
                      ? `Remove ${dependantOverflow} dependant${
                          dependantOverflow === 1 ? '' : 's'
                        } to fit this cover before applying.`
                      : 'Can’t apply until the household fits this cover.'}
                </p>
              ) : null}
              {personalisingOtherProvider ? (
                <button
                  type="button"
                  onClick={discardDraftAndReturnToSuggestion}
                  className="mx-auto block text-center text-xs font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline md:text-sm"
                >
                  Leave without saving
                </button>
              ) : hasDraftChanges ? (
                <button
                  type="button"
                  onClick={discardDraft}
                  className="mx-auto block text-center text-xs font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline md:text-sm"
                >
                  Discard draft
                </button>
              ) : (
                <p className="text-center text-xs text-ink-muted">
                  No pending changes
                </p>
              )}
              {!personalisingOtherProvider ? (
                <Link
                  to={`/benefits/${benefitId}/billing`}
                  className="mx-auto block text-center text-xs font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline md:text-sm"
                >
                  Change payment method
                </Link>
              ) : null}
            </div>
          </div>
        </aside>
      </div>

      {leaveBlocker.state === 'blocked' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leave-draft-title"
        >
          <div className="w-full max-w-md rounded-[10px] border border-border bg-white p-5 text-left shadow-lg">
            <h2
              id="leave-draft-title"
              className="text-lg font-semibold text-ink"
            >
              Unsaved draft
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              You have personalisation changes that aren’t applied yet. Discard
              them to leave, or save to open Apply / confirm changes.
            </p>
            {dependantOverflow > 0 ? (
              <p className="mt-3 text-xs text-amber-800">
                {personalisingOtherProvider
                  ? 'You can’t switch to this plan with your current dependant cover.'
                  : `Remove ${dependantOverflow} dependant${
                      dependantOverflow === 1 ? '' : 's'
                    } to fit this cover before you can apply.`}
              </p>
            ) : null}
            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleLeaveApply}
                disabled={dependantOverflow > 0 || householdRefused}
                className="w-full rounded-lg bg-charcoal px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save / apply changes
              </button>
              <button
                type="button"
                onClick={handleLeaveDiscard}
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink hover:bg-canvas"
              >
                Discard draft
              </button>
              <button
                type="button"
                onClick={handleLeaveStay}
                className="w-full px-4 py-2 text-sm font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline"
              >
                Stay on this page
              </button>
            </div>
          </div>
        </div>
      )}

      {removeModalOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="remove-dependant-title"
        >
          <div className="w-full max-w-md rounded-[10px] border border-border bg-white p-5 text-left shadow-lg">
            <h2
              id="remove-dependant-title"
              className="text-lg font-semibold text-ink"
            >
              {removeModalMode === 'capacity'
                ? 'Reduce dependants for this cover'
                : 'Remove a child from cover'}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              {removeModalMode === 'capacity' ? (
                <>
                  {draftPlan.planName} allows{' '}
                  {dependantCap === 0
                    ? 'no dependants'
                    : `up to ${dependantCap} dependant${dependantCap === 1 ? '' : 's'}`}
                  . Remove {dependantOverflow} more.
                  {coverChangeSnapshot
                    ? ' Or undo the cover change.'
                    : null}
                </>
              ) : (
                <>Choose who to remove.</>
              )}
            </p>

            <fieldset className="mt-4 space-y-2">
              <legend className="text-sm font-semibold text-ink">
                {removeModalMode === 'capacity' ? 'Dependant' : 'Child'}
              </legend>
              {removeModalMode === 'capacity' && answers.includePartner && (
                <label className="flex cursor-pointer items-start gap-2 text-sm text-ink">
                  <input
                    type="radio"
                    name="remove-dependant"
                    className="mt-1"
                    checked={removeTarget === REMOVE_TARGET_PARTNER}
                    onChange={() => setRemoveTarget(REMOVE_TARGET_PARTNER)}
                  />
                  <span className="font-medium">
                    {activePartner
                      ? dependantDisplayName(activePartner)
                      : 'Partner'}
                    <span className="font-normal text-ink-muted">
                      {' '}
                      · partner
                    </span>
                  </span>
                </label>
              )}
              {removableChildren.map((child) => (
                <label
                  key={child.id}
                  className="flex cursor-pointer items-start gap-2 text-sm text-ink"
                >
                  <input
                    type="radio"
                    name="remove-dependant"
                    className="mt-1"
                    checked={removeTarget === child.id}
                    onChange={() => setRemoveTarget(child.id)}
                  />
                  <span>
                    <span className="font-medium">
                      {dependantDisplayName(child)}
                    </span>
                    {child.dateOfBirth ? (
                      <span className="text-ink-muted">
                        {' '}
                        · DOB {child.dateOfBirth}
                      </span>
                    ) : null}
                  </span>
                </label>
              ))}
              {removeModalMode === 'capacity' && draftOnlyChildren > 0 && (
                <label className="flex cursor-pointer items-start gap-2 text-sm text-ink">
                  <input
                    type="radio"
                    name="remove-dependant"
                    className="mt-1"
                    checked={removeTarget === REMOVE_TARGET_DRAFT_CHILD}
                    onChange={() => setRemoveTarget(REMOVE_TARGET_DRAFT_CHILD)}
                  />
                  <span className="font-medium">
                    Child (not yet named)
                    <span className="font-normal text-ink-muted">
                      {' '}
                      · {draftOnlyChildren} in draft
                    </span>
                  </span>
                </label>
              )}
            </fieldset>

            {removeModalError && (
              <p className="mt-3 text-sm text-red-600">{removeModalError}</p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={confirmRemoveDraft}
                className="rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
              >
                Remove from draft
              </button>
              {coverChangeSnapshot ? (
                <button
                  type="button"
                  onClick={revertCoverLevelChange}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
                >
                  Undo
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setRemoveModalOpen(false)
                    setRemoveTarget(null)
                  }}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <ApplyConfirmWizard
        open={confirmOpen}
        benefitId={benefitId}
        switchingProvider={personalisingOtherProvider}
        committedPlan={committedPlan}
        draftPlan={draftPlan}
        committedAnswers={committedAnswers}
        draftAnswers={draftAnswers}
        coverFieldChanges={coverFieldChanges}
        featureGained={featureAccessReview.gained}
        featureLost={featureAccessReview.lost}
        initialLostFeatures={lostFeatures}
        liveLostFeatures={lostFeatures}
        draftEmployeePays={draftBreakdown.quotedEmployeePays ?? 0}
        draftTotal={draftBreakdown.quotedEmployeePays ?? 0}
        currentEmployeePays={
          committedBreakdown?.employeePays ??
          draftBreakdown.quotedEmployeePays ??
          0
        }
        costDelta={costDelta}
        paymentMethod={paymentMethod}
        providerPlans={providerPlans}
        selectedExtras={answers.selectedExtras}
        activePartner={activePartner}
        activeChildren={activeChildren}
        activeDependants={activeDependants}
        pendingChildRemovalIds={pendingChildRemovalIds}
        newDependantForms={newDependantForms}
        applyRemovalReasons={applyRemovalReasons}
        onUpdateDependantForm={updateDependantForm}
        onUpdateRemovalReason={updateApplyRemovalReason}
        upgradeSuggestion={upgradeSuggestion}
        onApplyUpgradeSuggestion={() => {
          if (upgradeSuggestion) selectCover(upgradeSuggestion.tier)
        }}
        onKeepFeatureAsAddon={keepFeatureAsAddon}
        onRemoveFeatureAddon={removeFeatureAddon}
        onClose={closeConfirmWizard}
        onConfirmPayment={submitConfirm}
      />
    </div>
  )
}
