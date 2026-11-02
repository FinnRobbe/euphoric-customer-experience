import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { BikTaxNote } from '../components/benefits/BikTaxNote'
import { LimitedScopeBanner } from '../components/benefits/LimitedScopeBanner'
import { ApplyConfirmWizard } from '../components/pmi/ApplyConfirmWizard'
import {
  CoverCompareMatrix,
  type CoverMatrixColumn,
} from '../components/pmi/CoverCompareMatrix'
import {
  isPmiBenefitId,
  type PmiBenefitId,
} from '../data/providerPlans'
import { readStoredPaymentMethod } from '../lib/billing'
import { buildCoverFieldChanges } from '../lib/coverFieldChanges'
import { getEnrolledPlan } from '../lib/enrolledPlan'
import { matchAccessibleFeatures } from '../lib/featureMatch'
import { checkPlanFit, rankAlternativePlans } from '../lib/fitChecker'
import { getApplicableCostBreakdown } from '../lib/parsePlans'
import { seedDraftForPlan } from '../lib/switchDraft'
import { shortPlanName, TIER_LABELS } from '../lib/tierLabels'
import { usePlanState } from '../state/PlanContext'
import type { PersonaliseAnswers, Plan } from '../types'

export function BenefitCompare() {
  const { benefitId = '' } = useParams()
  const navigate = useNavigate()
  const {
    getBenefit,
    getPlansForBenefit,
    pmiBenefits,
    plans,
    currentPlan,
    setSelectedBenefitId,
    setSelectedTier,
    commitPersonalise,
    loading,
    committedAnswers,
    activeDependants,
    profile,
  } = usePlanState()
  const benefit = getBenefit(benefitId)

  const enrolledPlan = useMemo(
    () => getEnrolledPlan(plans, currentPlan),
    [plans, currentPlan],
  )

  const logoByBenefit = useMemo(() => {
    const map = new Map<string, { logoSrc: string; logoText: string }>()
    for (const b of pmiBenefits) {
      map.set(b.id, { logoSrc: b.logoSrc, logoText: b.logoText || b.provider })
    }
    return map
  }, [pmiBenefits])

  const rankedAlternatives = useMemo(() => {
    if (!enrolledPlan || !profile) return []
    return rankAlternativePlans(
      plans,
      enrolledPlan,
      committedAnswers,
      profile,
    )
  }, [plans, enrolledPlan, committedAnswers, profile])

  const planById = useMemo(() => {
    const map = new Map<string, Plan>()
    for (const p of plans) map.set(p.planId, p)
    return map
  }, [plans])

  /** Start on your enrolled cover; fit / switch UI only after another column is chosen. */
  const defaultSelectedId = enrolledPlan?.planId ?? null
  const [selectedOverride, setSelectedOverride] = useState<string | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutPlanId, setCheckoutPlanId] = useState<string | null>(null)
  const [applyDraft, setApplyDraft] = useState<PersonaliseAnswers | null>(null)
  const paymentMethod = useMemo(
    () => readStoredPaymentMethod(),
    [checkoutOpen],
  )
  const activeChildren = useMemo(
    () => activeDependants.filter((d) => d.relationship === 'child'),
    [activeDependants],
  )
  const activePartner = useMemo(
    () => activeDependants.find((d) => d.relationship === 'partner') ?? null,
    [activeDependants],
  )

  useEffect(() => {
    const ids = new Set(rankedAlternatives.map((r) => r.plan.planId))
    if (enrolledPlan) ids.add(enrolledPlan.planId)
    if (selectedOverride && !ids.has(selectedOverride)) {
      setSelectedOverride(null)
    }
  }, [rankedAlternatives, selectedOverride, enrolledPlan])

  const selectedPlanId = selectedOverride ?? defaultSelectedId
  const selectedPlan = selectedPlanId
    ? planById.get(selectedPlanId) ?? null
    : null
  const comparingOtherPlan = Boolean(
    enrolledPlan &&
      selectedPlan &&
      selectedPlan.planId !== enrolledPlan.planId,
  )

  const checkoutPlan = checkoutPlanId
    ? planById.get(checkoutPlanId) ?? null
    : null

  const matrixColumns: CoverMatrixColumn[] = useMemo(() => {
    if (!enrolledPlan) return []
    const cols: CoverMatrixColumn[] = [
      {
        key: enrolledPlan.planId,
        plan: enrolledPlan,
        logoSrc: logoByBenefit.get(enrolledPlan.benefitId)?.logoSrc,
        logoText: logoByBenefit.get(enrolledPlan.benefitId)?.logoText,
        badge: 'current',
        selected: selectedPlanId === enrolledPlan.planId,
      },
    ]
    rankedAlternatives.forEach((ranked, index) => {
      cols.push({
        key: ranked.plan.planId,
        plan: ranked.plan,
        logoSrc: logoByBenefit.get(ranked.plan.benefitId)?.logoSrc,
        logoText: logoByBenefit.get(ranked.plan.benefitId)?.logoText,
        badge: index === 0 ? 'best' : index === 1 ? 'next' : null,
        selected: selectedPlanId === ranked.plan.planId,
      })
    })
    return cols
  }, [enrolledPlan, rankedAlternatives, selectedPlanId, logoByBenefit])

  const enrolledBreakdown = useMemo(() => {
    if (!enrolledPlan) return null
    return getApplicableCostBreakdown(
      enrolledPlan,
      committedAnswers.selectedExtras,
      committedAnswers.includePartner,
      committedAnswers.childrenCount,
    )
  }, [enrolledPlan, committedAnswers])

  const selectedBreakdown = useMemo(() => {
    if (!comparingOtherPlan || !selectedPlan) return null
    return getApplicableCostBreakdown(
      selectedPlan,
      committedAnswers.selectedExtras,
      committedAnswers.includePartner,
      committedAnswers.childrenCount,
    )
  }, [comparingOtherPlan, selectedPlan, committedAnswers])

  const selectedRefused = Boolean(selectedBreakdown?.householdCapped)
  const costDelta =
    selectedBreakdown &&
    enrolledBreakdown &&
    !selectedRefused &&
    selectedBreakdown.quotedEmployeePays != null
      ? selectedBreakdown.quotedEmployeePays - enrolledBreakdown.employeePays
      : 0

  const featureMatch = useMemo(() => {
    if (!comparingOtherPlan || !enrolledPlan || !selectedPlan) return null
    return matchAccessibleFeatures(
      enrolledPlan,
      committedAnswers.selectedExtras,
      selectedPlan,
      committedAnswers.selectedExtras,
    )
  }, [
    comparingOtherPlan,
    enrolledPlan,
    selectedPlan,
    committedAnswers.selectedExtras,
  ])

  const fitSummary = useMemo(() => {
    if (!comparingOtherPlan || !selectedPlan || !profile) return null
    const insight = checkPlanFit(
      selectedPlan,
      plans,
      { ...committedAnswers, coverLevel: selectedPlan.tier },
      profile,
    )
    let score = insight.score
    const reasons = [...insight.reasons]
    if (!selectedRefused && costDelta > 0) {
      reasons.push(
        `This cover costs £${costDelta}/mo more than your current cover.`,
      )
      score -= 12
    } else if (!selectedRefused && costDelta < 0) {
      reasons.unshift(
        `Saves £${Math.abs(costDelta)}/mo versus your current cover.`,
      )
    }
    if (featureMatch && featureMatch.lose.length > 0) {
      reasons.push(
        featureMatch.lose.length === 1
          ? `You’d lose claim access to “${featureMatch.lose[0].featureName}”.`
          : `You’d lose claim access to ${featureMatch.lose.length} benefits.`,
      )
      score -= Math.min(25, 5 * featureMatch.lose.length)
    }
    if (featureMatch && featureMatch.gain.length > 0) {
      reasons.unshift(
        featureMatch.gain.length === 1
          ? `Adds claim access to “${featureMatch.gain[0].featureName}”.`
          : `Adds claim access to ${featureMatch.gain.length} benefits.`,
      )
    }
    score = Math.max(0, Math.min(100, score))
    const unique = reasons.filter((r, i, arr) => arr.indexOf(r) === i)
    if (score < 40) {
      return {
        level: 'poor' as const,
        verdict: 'This is not a good fit',
        headline: 'Fit of this change: Bad',
        box: 'border-rose-200 bg-rose-50 text-rose-950',
        muted: 'text-rose-950/90',
        accent: 'bg-rose-500',
        chip: 'border-rose-200 bg-rose-50 text-rose-950',
        pros: unique.filter(
          (r) =>
            r.startsWith('Saves') ||
            r.startsWith('Adds claim') ||
            r.includes('most useful'),
        ),
        cons: unique.filter(
          (r) =>
            !r.startsWith('Saves') &&
            !r.startsWith('Adds claim'),
        ),
      }
    }
    const softOnly =
      unique.length === 0 ||
      unique.every(
        (r) =>
          r.startsWith('Saves') ||
          r.startsWith('Adds claim') ||
          r.includes('most useful'),
      )
    if (score >= 70 && softOnly) {
      return {
        level: 'good' as const,
        verdict: 'This is a good fit',
        headline: 'Fit of this change: Good',
        box: 'border-emerald-200 bg-emerald-50 text-emerald-950',
        muted: 'text-emerald-950/90',
        accent: 'bg-emerald-500',
        chip: 'border-emerald-200 bg-emerald-50 text-emerald-950',
        pros: unique.filter(
          (r) =>
            r.startsWith('Saves') ||
            r.startsWith('Adds claim') ||
            r.includes('most useful'),
        ),
        cons: unique.filter(
          (r) =>
            r.includes('lose') ||
            r.includes('more than') ||
            r.includes('thin') ||
            r.includes('caps') ||
            (r.includes('excess') && r.includes('rises')),
        ),
      }
    }
    return {
      level: 'mixed' as const,
      verdict: 'This is a fair fit',
      headline: 'Fit of this change: Fair',
      box: 'border-amber-200 bg-amber-50 text-amber-950',
      muted: 'text-amber-950/90',
      accent: 'bg-amber-500',
      chip: 'border-amber-200 bg-amber-50 text-amber-950',
      pros: unique.filter(
        (r) =>
          r.startsWith('Saves') ||
          r.startsWith('Adds claim') ||
          r.includes('most useful'),
      ),
      cons: unique.filter(
        (r) =>
          !r.startsWith('Saves') &&
          !r.startsWith('Adds claim') &&
          !r.includes('most useful'),
      ),
    }
  }, [
    comparingOtherPlan,
    selectedPlan,
    profile,
    plans,
    committedAnswers,
    costDelta,
    selectedRefused,
    featureMatch,
  ])

  const draftAnswers = applyDraft ?? committedAnswers
  const switchingProvider = Boolean(
    checkoutPlan && checkoutPlan.benefitId !== currentPlan.benefitId,
  )
  const checkoutProviderPlans = useMemo(
    () =>
      checkoutPlan ? getPlansForBenefit(checkoutPlan.benefitId) : [],
    [checkoutPlan, getPlansForBenefit],
  )

  const checkoutBreakdown = useMemo(() => {
    if (!checkoutPlan) return null
    return getApplicableCostBreakdown(
      checkoutPlan,
      draftAnswers.selectedExtras,
      draftAnswers.includePartner,
      draftAnswers.childrenCount,
    )
  }, [checkoutPlan, draftAnswers])

  const checkoutRefused = Boolean(checkoutBreakdown?.householdCapped)
  const checkoutDelta =
    checkoutBreakdown &&
    enrolledBreakdown &&
    !checkoutRefused &&
    checkoutBreakdown.quotedEmployeePays != null
      ? checkoutBreakdown.quotedEmployeePays - enrolledBreakdown.employeePays
      : 0

  const checkoutFeatureMatch = useMemo(() => {
    if (!enrolledPlan || !checkoutPlan) return null
    return matchAccessibleFeatures(
      enrolledPlan,
      committedAnswers.selectedExtras,
      checkoutPlan,
      draftAnswers.selectedExtras,
    )
  }, [
    enrolledPlan,
    checkoutPlan,
    committedAnswers.selectedExtras,
    draftAnswers.selectedExtras,
  ])

  const checkoutCoverFieldChanges = useMemo(
    () =>
      buildCoverFieldChanges(
        enrolledPlan,
        checkoutPlan,
        committedAnswers,
        draftAnswers,
        switchingProvider,
      ),
    [
      enrolledPlan,
      checkoutPlan,
      committedAnswers,
      draftAnswers,
      switchingProvider,
    ],
  )

  const checkoutLostFeatures = useMemo(
    () =>
      (checkoutFeatureMatch?.lose ?? []).map((f) => ({
        featureId: f.featureId,
        featureName: f.featureName,
      })),
    [checkoutFeatureMatch],
  )

  const checkoutGainedFeatures = useMemo(
    () =>
      (checkoutFeatureMatch?.gain ?? []).map((f) => ({
        featureId: f.featureId,
        featureName: f.featureName,
        via: f.via,
      })),
    [checkoutFeatureMatch],
  )

  function openCheckout() {
    if (
      !comparingOtherPlan ||
      !selectedPlan ||
      selectedBreakdown?.householdCapped
    ) {
      return
    }
    setCheckoutPlanId(selectedPlan.planId)
    setApplyDraft(seedDraftForPlan(selectedPlan, committedAnswers))
    setCheckoutOpen(true)
  }

  function closeCheckout() {
    setCheckoutOpen(false)
    setApplyDraft(null)
  }

  function keepFeatureAsAddon(featureId: string) {
    setApplyDraft((prev) => {
      if (!prev) return prev
      if (prev.selectedExtras.includes(featureId)) return prev
      return {
        ...prev,
        selectedExtras: [...prev.selectedExtras, featureId],
      }
    })
  }

  function removeFeatureAddon(featureId: string) {
    setApplyDraft((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        selectedExtras: prev.selectedExtras.filter((id) => id !== featureId),
      }
    })
  }

  function confirmCheckoutSwitch() {
    if (!checkoutPlan || !isPmiBenefitId(checkoutPlan.benefitId) || !applyDraft)
      return
    if (
      checkoutBreakdown?.householdCapped ||
      checkoutBreakdown?.quotedEmployeePays == null
    ) {
      return
    }
    const id = checkoutPlan.benefitId as PmiBenefitId
    const previousYouPay =
      enrolledBreakdown?.quotedEmployeePays ??
      enrolledBreakdown?.employeePays ??
      0
    const nextYouPay = checkoutBreakdown.quotedEmployeePays
    const bullets: string[] = []
    if (switchingProvider) {
      bullets.push(
        `Switched insurer: ${enrolledPlan?.provider ?? 'Current'} → ${checkoutPlan.provider}`,
      )
    }
    bullets.push(
      `${shortPlanName(checkoutPlan)} · ${TIER_LABELS[checkoutPlan.tier]}`,
    )
    if (checkoutDelta !== 0) {
      bullets.push(
        checkoutDelta > 0
          ? `+£${checkoutDelta}/mo you pay`
          : `−£${Math.abs(checkoutDelta)}/mo you pay`,
      )
    }
    if (checkoutLostFeatures.length > 0) {
      bullets.push(
        `You’ll no longer have ${checkoutLostFeatures.length} feature${checkoutLostFeatures.length === 1 ? '' : 's'}`,
      )
    }
    if (checkoutGainedFeatures.length > 0) {
      bullets.push(
        `You’ll gain access to ${checkoutGainedFeatures.length} feature${checkoutGainedFeatures.length === 1 ? '' : 's'}`,
      )
    }
    setSelectedBenefitId(id)
    setSelectedTier(checkoutPlan.tier)
    commitPersonalise(applyDraft, id, {
      dependantsToAdd: [],
      dependantsToRemove: [],
    })
    setCheckoutOpen(false)
    setApplyDraft(null)
    navigate(`/benefits/${id}`, {
      replace: true,
      state: {
        coverUpdated: {
          coverLabel: `${checkoutPlan.provider} ${TIER_LABELS[checkoutPlan.tier]}`,
          youPay: nextYouPay,
          delta: nextYouPay - previousYouPay,
          bullets: bullets.slice(0, 5),
        },
      },
    })
  }

  if (!benefit) {
    if (loading) return <p className="p-8 text-ink-muted">Loading…</p>
    return <Navigate to="/" replace />
  }
  if (loading) return <p className="p-8 text-ink-muted">Loading…</p>

  if (!benefit.isPmi) {
    return (
      <div className="px-8 py-6 text-left">
        <Link
          to={`/benefits/${benefit.id}`}
          className="mb-3 inline-flex text-sm text-ink-muted hover:text-ink"
        >
          ‹ Back to {benefit.title}
        </Link>
        <h1 className="text-2xl font-bold text-ink">Compare (limited)</h1>
        <LimitedScopeBanner className="mt-4 max-w-2xl">
          <strong>Coming soon / limited in this version.</strong> You can’t
          compare this benefit side by side yet. Use the benefit page to see
          what’s included.
        </LimitedScopeBanner>
        <Link
          to={`/benefits/${benefit.id}`}
          className="mt-5 inline-flex rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
        >
          Back to {benefit.title}
        </Link>
      </div>
    )
  }

  if (!enrolledPlan) {
    return <p className="p-8 text-ink-muted">Loading your current cover…</p>
  }

  const enrolledLogo = logoByBenefit.get(enrolledPlan.benefitId)

  return (
    <div className="px-8 py-6 text-left">
      <Link
        to={`/benefits/${currentPlan.benefitId}`}
        className="mb-3 inline-flex text-sm text-ink-muted hover:text-ink"
      >
        ‹ Back to your medical insurance
      </Link>
      <h1 className="text-2xl font-bold text-ink">Compare medical insurance</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">
        Your cover first, then the strongest matches, then every other option.
        Select a column and review the switch here — no need to leave this page.
      </p>

      <div className="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 space-y-5 md:col-start-1">
          <section className="rounded-[10px] border border-border bg-white p-5 shadow-sm">
            <h2 className="mb-1 text-xl font-semibold text-ink">
              Compare &amp; pick cover
            </h2>
            <p className="mb-4 text-sm text-ink-muted">
              Best and next-best sit beside your plan; scroll right for every
              other cover. Logos mark each insurer.
            </p>
            <CoverCompareMatrix
              columns={matrixColumns}
              household={committedAnswers}
              onSelectColumn={(key) => setSelectedOverride(key)}
            />
          </section>

          {fitSummary && selectedPlan ? (
            <section
              id="fit-details"
              className={[
                'scroll-mt-6 rounded-[10px] border px-4 py-4 text-left text-sm',
                fitSummary.box,
              ].join(' ')}
            >
              <h2 className="text-base font-semibold">{fitSummary.headline}</h2>
              {fitSummary.pros.length === 0 && fitSummary.cons.length === 0 ? (
                <p
                  className={[
                    'mt-2 text-xs leading-relaxed',
                    fitSummary.muted,
                  ].join(' ')}
                >
                  Household, priorities, price, and claim access look aligned
                  with this cover.
                </p>
              ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-emerald-200/70 bg-white/55 px-3 py-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                      Working well
                    </p>
                    {fitSummary.pros.length > 0 ? (
                      <ul className="mt-1.5 space-y-1.5 text-xs leading-relaxed text-emerald-950/90">
                        {fitSummary.pros.slice(0, 4).map((item) => (
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
                    {fitSummary.cons.length > 0 ? (
                      <ul className="mt-1.5 space-y-1.5 text-xs leading-relaxed text-rose-950/90">
                        {fitSummary.cons.slice(0, 4).map((item) => (
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
                        No material trade-offs spotted on this cover.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>
          ) : null}

          {featureMatch && selectedPlan ? (
            <section className="rounded-[10px] border border-border bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-ink">
                Which features change after you switch
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Your {enrolledPlan.provider} cover vs {selectedPlan.provider}{' '}
                {TIER_LABELS[selectedPlan.tier]}. Open a name for details.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <FeatureColumn
                  title="You keep"
                  count={featureMatch.keep.length}
                  empty="No close matches"
                  tone="neutral"
                >
                  {featureMatch.keep.map((pair) => (
                    <li
                      key={`${pair.from.featureId}->${pair.to.featureId}`}
                      className="rounded-lg border border-border/70 bg-white px-2.5 py-2 text-xs leading-snug"
                    >
                      {pair.from.featureName === pair.to.featureName ? (
                        <Link
                          to={`/benefits/${selectedPlan.benefitId}/personalise/feature/${pair.to.featureId}`}
                          className="font-medium text-ink underline decoration-border underline-offset-2 hover:decoration-ink"
                        >
                          {pair.to.featureName}
                        </Link>
                      ) : (
                        <span className="flex flex-col gap-1">
                          <span className="text-ink-muted">
                            {pair.from.featureName}
                          </span>
                          <span className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">
                            becomes
                          </span>
                          <span className="font-medium text-ink">
                            {pair.to.featureName}
                          </span>
                        </span>
                      )}
                    </li>
                  ))}
                </FeatureColumn>
                <FeatureColumn
                  title="You lose"
                  count={featureMatch.lose.length}
                  empty="Nothing unique lost"
                  tone="amber"
                >
                  {featureMatch.lose.map((f) => (
                    <li
                      key={f.featureId}
                      className="rounded-lg border border-amber-200/80 bg-white px-2.5 py-2 text-xs leading-snug"
                    >
                      <Link
                        to={`/benefits/${enrolledPlan.benefitId}/personalise/feature/${f.featureId}`}
                        className="font-medium text-amber-950 underline decoration-amber-300 underline-offset-2 hover:decoration-amber-700"
                      >
                        {f.featureName}
                      </Link>
                      <p className="mt-0.5 text-[11px] text-amber-950/65">
                        Not on {selectedPlan.provider}{' '}
                        {TIER_LABELS[selectedPlan.tier]}
                      </p>
                    </li>
                  ))}
                </FeatureColumn>
                <FeatureColumn
                  title="You gain"
                  count={featureMatch.gain.length}
                  empty="Nothing unique gained"
                  tone="emerald"
                >
                  {featureMatch.gain.map((f) => (
                    <li
                      key={f.featureId}
                      className="rounded-lg border border-emerald-200/80 bg-white px-2.5 py-2 text-xs leading-snug"
                    >
                      <Link
                        to={`/benefits/${selectedPlan.benefitId}/personalise/feature/${f.featureId}`}
                        className="font-medium text-emerald-950 underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-700"
                      >
                        {f.featureName}
                      </Link>
                      <p className="mt-0.5 text-[11px] text-emerald-900/65">
                        {f.via === 'included' ? 'Included' : 'Paid add-on'}
                      </p>
                    </li>
                  ))}
                </FeatureColumn>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="order-first self-start sticky top-0 z-10 md:order-none md:col-start-2 md:row-start-1 md:sticky md:top-4">
          <div className="rounded-[10px] border border-border bg-white/95 p-3 shadow-sm backdrop-blur md:bg-white md:p-5 md:backdrop-blur-none">
            <div className="rounded-lg border border-border bg-canvas/50 px-3 py-3">
              <div className="flex items-center gap-2">
                {enrolledLogo?.logoSrc ? (
                  <img
                    src={enrolledLogo.logoSrc}
                    alt={enrolledLogo.logoText || enrolledPlan.provider}
                    className="h-6 w-auto max-w-[3rem] object-contain"
                  />
                ) : null}
                <p className="text-[11px] font-medium text-ink-muted">
                  Your {enrolledPlan.provider} cover
                </p>
              </div>
              <p className="mt-1 text-2xl font-bold tabular-nums text-ink">
                {enrolledBreakdown?.householdCapped
                  ? '—'
                  : `£${enrolledBreakdown?.quotedEmployeePays ?? '—'}`}
                {enrolledBreakdown && !enrolledBreakdown.householdCapped ? (
                  <span className="ml-1 text-xs font-medium text-ink-muted">
                    /mo
                  </span>
                ) : null}
              </p>
              {enrolledBreakdown ? (
                <BikTaxNote
                  variant="inline"
                  tone="neutral"
                  employerFundingGbp={enrolledBreakdown.bikTaxableValue}
                  className="mt-1"
                />
              ) : null}
            </div>

            {selectedPlan && selectedBreakdown ? (
              <div
                className={[
                  'mt-3 rounded-lg border px-3 py-3',
                  costDelta < 0
                    ? 'border-emerald-200 bg-emerald-50'
                    : costDelta > 0
                      ? 'border-amber-200 bg-amber-50'
                      : 'border-border bg-canvas/50',
                ].join(' ')}
              >
                <div className="flex items-center gap-2">
                  {logoByBenefit.get(selectedPlan.benefitId)?.logoSrc ? (
                    <img
                      src={logoByBenefit.get(selectedPlan.benefitId)!.logoSrc}
                      alt={
                        logoByBenefit.get(selectedPlan.benefitId)!.logoText ||
                        selectedPlan.provider
                      }
                      className="h-6 w-auto max-w-[3rem] object-contain"
                    />
                  ) : null}
                  <p className="text-[11px] font-medium text-ink-muted">
                    {selectedPlan.provider} {shortPlanName(selectedPlan)}
                  </p>
                </div>
                <p
                  className={[
                    'mt-1 text-2xl font-bold tabular-nums',
                    selectedRefused
                      ? 'text-ink'
                      : costDelta < 0
                        ? 'text-emerald-700'
                        : costDelta > 0
                          ? 'text-amber-950'
                          : 'text-ink',
                  ].join(' ')}
                >
                  {selectedRefused
                    ? '—'
                    : `£${selectedBreakdown.quotedEmployeePays}`}
                  {selectedRefused ? null : (
                    <span className="ml-1 text-xs font-medium opacity-70">
                      /mo
                    </span>
                  )}
                </p>
                <p className="mt-1 text-[11px] text-ink-muted">
                  {selectedRefused
                    ? 'Can’t review until the household fits this cover'
                    : costDelta === 0
                      ? 'Same cash cost if you switch'
                      : costDelta > 0
                        ? `+£${costDelta}/mo if you switch`
                        : `−£${Math.abs(costDelta)}/mo if you switch`}
                </p>
                {selectedRefused ? null : (
                  <BikTaxNote
                    variant="inline"
                    tone={costDelta < 0 ? 'emerald' : 'neutral'}
                    employerFundingGbp={selectedBreakdown.bikTaxableValue}
                    className="mt-1"
                  />
                )}
              </div>
            ) : (
              <p className="mt-3 text-xs text-ink-muted">
                Select an alternative in the table to see a new price.
              </p>
            )}

            {fitSummary ? (
              <a
                href="#fit-details"
                className={[
                  'mt-3 flex w-full items-stretch overflow-hidden rounded-[10px] border transition',
                  fitSummary.chip,
                ].join(' ')}
              >
                <span
                  className={['w-1.5 shrink-0', fitSummary.accent].join(' ')}
                  aria-hidden
                />
                <span className="flex min-w-0 flex-1 flex-col gap-1.5 px-3 py-3 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em] opacity-70">
                    AI overview
                  </span>
                  <span className="text-lg font-bold leading-snug tracking-tight">
                    {fitSummary.verdict}
                  </span>
                  <span className="text-[11px] font-medium underline-offset-2 opacity-70 hover:underline">
                    See why
                  </span>
                </span>
              </a>
            ) : null}

            <div className="mt-3 space-y-3 border-t border-border pt-3 md:mt-5 md:pt-4">
              <button
                type="button"
                disabled={!comparingOtherPlan || selectedRefused}
                onClick={openCheckout}
                className="w-full rounded-lg bg-charcoal px-3 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:py-2.5 md:text-sm"
              >
                {selectedRefused
                  ? 'Household doesn’t fit this cover'
                  : comparingOtherPlan && selectedPlan
                    ? `Review & switch · ${selectedPlan.provider}`
                    : 'Select a cover to review'}
              </button>
              {selectedRefused ? (
                <p className="text-center text-xs text-amber-800">
                  Can’t review a switch until the household fits this cover.
                </p>
              ) : null}
              <Link
                to={`/benefits/${currentPlan.benefitId}/personalise`}
                className="mx-auto block text-center text-xs font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline md:text-sm"
              >
                Personalise your current cover
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {checkoutPlan && applyDraft ? (
        <ApplyConfirmWizard
          open={checkoutOpen}
          benefitId={checkoutPlan.benefitId}
          switchingProvider={switchingProvider}
          committedPlan={enrolledPlan}
          draftPlan={checkoutPlan}
          committedAnswers={committedAnswers}
          draftAnswers={draftAnswers}
          coverFieldChanges={checkoutCoverFieldChanges}
          featureGained={checkoutGainedFeatures}
          featureLost={checkoutLostFeatures}
          initialLostFeatures={checkoutLostFeatures}
          liveLostFeatures={checkoutLostFeatures}
          draftEmployeePays={checkoutBreakdown?.quotedEmployeePays ?? 0}
          draftTotal={checkoutBreakdown?.quotedEmployeePays ?? 0}
          currentEmployeePays={
            enrolledBreakdown?.quotedEmployeePays ??
            enrolledBreakdown?.employeePays ??
            0
          }
          costDelta={checkoutDelta}
          paymentMethod={paymentMethod}
          providerPlans={checkoutProviderPlans}
          selectedExtras={draftAnswers.selectedExtras}
          activePartner={activePartner}
          activeChildren={activeChildren}
          activeDependants={activeDependants}
          pendingChildRemovalIds={[]}
          newDependantForms={[]}
          applyRemovalReasons={{}}
          onUpdateDependantForm={() => {}}
          onUpdateRemovalReason={() => {}}
          upgradeSuggestion={null}
          onKeepFeatureAsAddon={keepFeatureAsAddon}
          onRemoveFeatureAddon={removeFeatureAddon}
          onClose={closeCheckout}
          onConfirmPayment={confirmCheckoutSwitch}
          keepEditingLabel="Keep comparing"
        />
      ) : null}
    </div>
  )
}

function FeatureColumn({
  title,
  count,
  empty,
  tone,
  children,
}: {
  title: string
  count: number
  empty: string
  tone: 'neutral' | 'amber' | 'emerald'
  children: ReactNode
}) {
  const shell =
    tone === 'amber'
      ? 'border-amber-200 bg-amber-50/70'
      : tone === 'emerald'
        ? 'border-emerald-200 bg-emerald-50/70'
        : 'border-border bg-canvas/50'
  const titleColor =
    tone === 'amber'
      ? 'text-amber-950'
      : tone === 'emerald'
        ? 'text-emerald-900'
        : 'text-ink'
  const badge =
    tone === 'amber'
      ? 'bg-amber-100 text-amber-950'
      : tone === 'emerald'
        ? 'bg-emerald-100 text-emerald-900'
        : 'bg-white text-ink shadow-sm'
  const emptyColor =
    tone === 'amber'
      ? 'text-amber-950/70'
      : tone === 'emerald'
        ? 'text-emerald-900/70'
        : 'text-ink-muted'

  return (
    <div className={['rounded-[10px] border p-3', shell].join(' ')}>
      <div className="flex items-center justify-between gap-2">
        <h3 className={['text-sm font-semibold', titleColor].join(' ')}>
          {title}
        </h3>
        <span
          className={[
            'inline-flex min-w-[1.5rem] items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums',
            badge,
          ].join(' ')}
        >
          {count}
        </span>
      </div>
      {count === 0 ? (
        <p className={['mt-3 text-xs', emptyColor].join(' ')}>{empty}</p>
      ) : (
        <ul className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
          {children}
        </ul>
      )}
    </div>
  )
}
