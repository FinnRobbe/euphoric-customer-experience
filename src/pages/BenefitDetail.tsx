import { useEffect, useState, type ReactNode } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { BikTaxNote } from '../components/benefits/BikTaxNote'
import { FeatureCard } from '../components/benefits/FeatureCard'
import { isPmiBenefitId } from '../data/providerPlans'
import { getEnrolledPlan } from '../lib/enrolledPlan'
import { getCostBreakdown } from '../lib/parsePlans'
import { TIER_LABELS } from '../lib/tierLabels'
import { usePlanState } from '../state/PlanContext'
import type { DependantDetails, Plan } from '../types'

type CoverUpdatedState = {
  coverLabel: string
  youPay: number
  delta: number
  bullets: string[]
}

export function BenefitDetail() {
  const { benefitId = '' } = useParams()
  const location = useLocation()
  const {
    selectedPlan,
    plans,
    loading,
    savedFeatureIds,
    toggleSaved,
    setSelectedBenefitId,
    getPlansForBenefit,
    getBenefit,
    selectedTier,
    committedAnswers,
    currentPlan,
    activeDependants,
  } = usePlanState()
  const benefit = getBenefit(benefitId)
  const [coverUpdated, setCoverUpdated] = useState<CoverUpdatedState | null>(
    null,
  )

  useEffect(() => {
    if (isPmiBenefitId(benefitId)) {
      setSelectedBenefitId(benefitId)
    }
  }, [benefitId, setSelectedBenefitId])

  useEffect(() => {
    const state = location.state as { coverUpdated?: CoverUpdatedState } | null
    if (state?.coverUpdated) {
      setCoverUpdated(state.coverUpdated)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  if (!benefit) {
    if (loading) {
      return <p className="p-8 text-ink-muted">Loading plan…</p>
    }
    return <Navigate to="/" replace />
  }

  const enrolledOnThisBenefit =
    benefit.isPmi && currentPlan.benefitId === benefit.id
  const providerPlans = getPlansForBenefit(benefitId)
  const enrolledPlan = getEnrolledPlan(plans, currentPlan)

  /** Browse plan for feature preview only — never used as “You pay” on non-enrolled. */
  const browsePlan =
    providerPlans.find((p) => p.tier === selectedTier) ??
    providerPlans.find((p) => p.tier === 'plus') ??
    selectedPlan

  const planForFeatures = enrolledOnThisBenefit
    ? (enrolledPlan ?? browsePlan)
    : browsePlan

  const catalogFeatures = benefit.features
  const pmiFeatures = planForFeatures
    ? planForFeatures.features
        .filter((f) => f.included)
        .map((f) => ({
          id: f.featureId,
          name: f.featureName,
          description: f.description,
        }))
    : []

  const features = (
    benefit.isPmi && pmiFeatures.length > 0 ? pmiFeatures : catalogFeatures
  ).slice(0, 6)

  const boldTerms = [
    benefit.provider,
    benefit.title,
    planForFeatures ? TIER_LABELS[planForFeatures.tier] : undefined,
    planForFeatures?.planName,
    'private medical insurance',
    'Private medical insurance',
    'virtual GP',
    'Virtual GP',
  ].filter((t): t is string => Boolean(t))

  const base = `/benefits/${benefit.id}`
  const personaliseTo = `${base}/personalise`
  const compareTo = `${base}/compare`
  const modelingSwitch = benefit.isPmi && !enrolledOnThisBenefit
  const enrolledProviderName =
    enrolledPlan?.provider ??
    getBenefit(currentPlan.benefitId)?.provider ??
    'your current insurer'

  if (benefit.isPmi && loading) {
    return <p className="p-8 text-ink-muted">Loading plan…</p>
  }

  return (
    <div>
      <div className="px-8 pb-8 pt-5" style={{ backgroundColor: benefit.washColor }}>
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"
        >
          <span aria-hidden>‹</span> Back to Benefits
        </Link>
        <div className="flex items-center gap-4">
          <img
            src={benefit.logoSrc}
            alt={benefit.provider}
            className="h-16 w-16 rounded-lg bg-white object-contain p-1 shadow"
          />
          <div>
            <p className="text-sm text-ink-muted">{benefit.provider}</p>
            <h1 className="text-2xl font-bold text-ink">{benefit.title}</h1>
            {benefit.isPmi && enrolledOnThisBenefit && enrolledPlan && (
              <p className="mt-1 text-sm text-ink-muted">
                Your cover:{' '}
                <strong className="text-ink">
                  {TIER_LABELS[enrolledPlan.tier]}
                </strong>
                {enrolledPlan.planName ? (
                  <span className="text-ink-muted">
                    {' '}
                    · {enrolledPlan.planName}
                  </span>
                ) : null}
              </p>
            )}
            {benefit.isPmi && !enrolledOnThisBenefit && (
              <p className="mt-2">
                <span className="inline-flex items-center rounded-md bg-charcoal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                  Not your current cover
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 px-8 py-6">
        {coverUpdated ? (
          <div
            className={[
              'flex flex-wrap items-start justify-between gap-3 rounded-[10px] border px-4 py-3 text-sm',
              coverUpdated.delta < 0
                ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                : coverUpdated.delta > 0
                  ? 'border-amber-200 bg-amber-50 text-amber-950'
                  : 'border-border bg-canvas text-ink',
            ].join(' ')}
            role="status"
          >
            <div className="min-w-0">
              <p className="font-semibold">Cover updated</p>
              <p className="mt-1 text-sm opacity-90">
                You’re now on {coverUpdated.coverLabel}. You pay £
                {coverUpdated.youPay}/mo
                {coverUpdated.delta === 0
                  ? ' (same cash cost).'
                  : coverUpdated.delta > 0
                    ? ` (+£${coverUpdated.delta}/mo).`
                    : ` (−£${Math.abs(coverUpdated.delta)}/mo).`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCoverUpdated(null)}
              className="text-sm font-medium underline-offset-2 hover:underline"
            >
              Dismiss
            </button>
          </div>
        ) : null}
        <section className="text-left">
          <h2 className="mb-3 text-xl font-bold tracking-tight text-ink">Overview</h2>
          <p className="mb-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
            {emphasize(benefit.overview[0], boldTerms)}
          </p>
          {benefit.isPmi && enrolledOnThisBenefit && enrolledPlan ? (
            <PmiCostOverview
              plan={enrolledPlan}
              showHousehold
              includePartner={committedAnswers.includePartner}
              childrenCount={committedAnswers.childrenCount}
              selectedExtras={committedAnswers.selectedExtras}
              dependants={activeDependants}
            />
          ) : benefit.isPmi ? null : (
            <p className="mb-3 text-sm font-medium text-ink">
              £{benefit.monthlyEmployeeCostGbp}/mo · {benefit.excessLabel} ·{' '}
              {benefit.hospitalOrScope}
            </p>
          )}
        </section>

        <section className="rounded-[10px] border border-border bg-white p-5 text-left shadow-sm">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight text-ink">Options</h2>
            <TermsLink />
          </div>
          {modelingSwitch ? (
            <div className="flex flex-col gap-3">
              <Link
                to={personaliseTo}
                className="flex w-full flex-col items-center rounded-[10px] bg-charcoal px-4 py-3.5 text-center text-white shadow-md transition hover:bg-ink hover:shadow-lg"
              >
                <span className="text-sm font-semibold">Model a switch</span>
                <span className="mt-0.5 text-xs text-white/75">
                  Draft a switch from {enrolledProviderName} to{' '}
                  {benefit.provider}
                </span>
              </Link>
              <ActionCard
                to={`${base}/features`}
                title="Product features"
                description="See what’s included on this cover"
                icon={<FunctionsIcon />}
              />
            </div>
          ) : benefit.isPmi ? (
            <div className="flex flex-col gap-3">
              <Link
                to={personaliseTo}
                className="flex w-full flex-col items-center rounded-[10px] bg-charcoal px-4 py-3.5 text-center text-white shadow-md transition hover:bg-ink hover:shadow-lg"
              >
                <span className="text-sm font-semibold">Personalise</span>
                <span className="mt-0.5 text-xs text-white/75">
                  Change plans, dependants & extras
                </span>
              </Link>
              <div className="grid gap-3 sm:grid-cols-2">
                <ActionCard
                  to={`${base}/features`}
                  title="Product features"
                  description="See what’s included on this cover"
                  icon={<FunctionsIcon />}
                />
                <ActionCard
                  to={compareTo}
                  title="Compare"
                  description="Compare medical insurance options and tiers"
                  icon={<CompareIcon />}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-3">
              <ActionCard
                to={`${base}/features`}
                title="Product features"
                description="See what’s included on this cover"
                icon={<FunctionsIcon />}
              />
              <ActionCard
                to={personaliseTo}
                title="Personalise"
                description="You can’t change options here yet."
                caution
                icon={<PersonaliseIcon />}
              />
              <ActionCard
                to={compareTo}
                title="Compare"
                description="Side-by-side compare isn’t wired yet."
                caution
                icon={<CompareIcon />}
              />
            </div>
          )}
        </section>

        <section className="relative rounded-[10px] border border-border bg-white p-5 text-left shadow-sm">
          <h2 className="mb-3 text-xl font-bold tracking-tight text-ink">
            Product features
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {features.map((f, index) => {
              const fading = index >= 4
              return (
                <div
                  key={f.id}
                  className={fading ? 'relative opacity-40' : undefined}
                  style={
                    fading
                      ? {
                          maskImage:
                            index === 4
                              ? 'linear-gradient(to bottom, black 35%, transparent 100%)'
                              : 'linear-gradient(to bottom, black 15%, transparent 85%)',
                          WebkitMaskImage:
                            index === 4
                              ? 'linear-gradient(to bottom, black 35%, transparent 100%)'
                              : 'linear-gradient(to bottom, black 15%, transparent 85%)',
                        }
                      : undefined
                  }
                >
                  <FeatureCard
                    title={f.name}
                    description={f.description}
                    providerLogo={benefit.logoText}
                    logoSrc={benefit.logoSrc}
                    saved={savedFeatureIds.has(f.id)}
                    onToggleSave={() => toggleSaved(f.id)}
                    to={`${base}/features/${f.id}`}
                  />
                </div>
              )
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 rounded-b-[10px] bg-gradient-to-t from-white via-white/85 to-transparent" />

          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <Link
              to={`${base}/features`}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-ink"
            >
              See all features
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

function firstNameOnly(
  person: { firstName?: string } | undefined,
  fallback: string,
): string {
  const first = person?.firstName?.trim()
  return first || fallback
}

/** “You & Ellen” / “You, Ellen, Tatum & Christi” — first names only. */
function coverChipLabel(
  includePartner: boolean,
  childrenCount: number,
  dependants: DependantDetails[],
): string {
  const partner = dependants.find((d) => d.relationship === 'partner')
  const children = dependants.filter((d) => d.relationship === 'child')
  const names: string[] = []

  if (includePartner) {
    names.push(firstNameOnly(partner, 'Partner'))
  }

  const childSlots = Math.max(0, childrenCount)
  for (let i = 0; i < childSlots; i++) {
    names.push(firstNameOnly(children[i], `Child ${i + 1}`))
  }

  if (names.length === 0) return 'You only'
  if (names.length === 1) return `You & ${names[0]}`
  const last = names[names.length - 1]
  return `You, ${names.slice(0, -1).join(', ')} & ${last}`
}

/** Plain-English hospital network chip (CSV still stores short list names). */
function hospitalNetworkLabel(hospitalList: string): string {
  const lower = hospitalList.trim().toLowerCase()
  if (lower.includes('extended')) return 'Wider UK hospital choice'
  if (lower.includes('standard')) return 'Standard UK hospitals'
  return hospitalList.trim() || 'UK hospitals'
}

function PmiCostOverview({
  plan,
  showHousehold,
  includePartner,
  childrenCount,
  selectedExtras,
  dependants = [],
}: {
  plan: Plan
  showHousehold: boolean
  includePartner: boolean
  childrenCount: number
  selectedExtras: string[]
  dependants?: DependantDetails[]
}) {
  const householdExtras = showHousehold ? selectedExtras : []
  const householdPartner = showHousehold && includePartner
  const householdChildren = showHousehold ? childrenCount : 0
  const breakdown = getCostBreakdown(
    plan,
    householdExtras,
    householdPartner,
    householdChildren,
  )
  const coverChip = coverChipLabel(
    householdPartner,
    householdChildren,
    dependants,
  )

  // Bar shares of total monthly price (You pay + employer toward core).
  const totalMonthly = Math.max(
    breakdown.employeePays + breakdown.employerPays,
    1,
  )
  const youSharePct = Math.round(
    (breakdown.employeePays / totalMonthly) * 100,
  )
  const employerSharePct = Math.max(0, 100 - youSharePct)

  return (
    <div className="mb-1 w-full overflow-hidden rounded-[10px] border border-border bg-white shadow-sm">
      <div className="grid sm:grid-cols-2 sm:items-stretch">
        <div className="flex flex-col border-b border-border bg-canvas/40 p-4 sm:border-b-0 sm:border-r sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            You pay
          </p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
            <span className="text-3xl font-bold tabular-nums tracking-tight text-ink sm:text-4xl">
              £{breakdown.employeePays}
            </span>
            <span className="text-sm font-medium text-ink-muted">/mo</span>
            <BikTaxNote
              variant="inline"
              tone="neutral"
              employerFundingGbp={breakdown.bikTaxableValue}
              className="ml-0.5 text-xs"
            />
          </p>
        </div>
        <div className="flex flex-col bg-emerald-50/80 p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-900/70">
            Employer pays
          </p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tabular-nums tracking-tight text-emerald-900 sm:text-4xl">
              £{breakdown.employerPays}
            </span>
            <span className="text-sm font-medium text-emerald-900/70">/mo</span>
          </p>
        </div>
      </div>

      <div className="border-t border-border p-4 sm:p-5">
        <div
          className="flex h-2.5 w-full overflow-hidden rounded-full bg-canvas"
          role="img"
          aria-label={`Of total monthly price, you pay about ${youSharePct} percent and employer about ${employerSharePct} percent`}
        >
          <span
            className="h-full shrink-0 bg-charcoal"
            style={{ width: `${youSharePct}%` }}
            title="You pay"
          />
          <span
            className="h-full min-w-0 flex-1 bg-emerald-500/70"
            title="Employer pays"
          />
        </div>
        <div className="mt-1.5 flex w-full justify-between text-[11px]">
          <span className="font-medium text-ink">You {youSharePct}%</span>
          <span className="font-medium text-emerald-800">
            Employer {employerSharePct}%
          </span>
        </div>

        <div className="mt-3 flex w-full flex-wrap gap-2">
          <span className="inline-flex items-center rounded-lg border border-border bg-canvas px-2.5 py-1.5 text-xs font-medium text-ink">
            Claim excess{' '}
            <span className="ml-1 tabular-nums">£{plan.excessGbp}</span>
          </span>
          <span className="inline-flex items-center rounded-lg border border-border bg-canvas px-2.5 py-1.5 text-xs font-medium text-ink">
            {hospitalNetworkLabel(plan.hospitalList)}
          </span>
          {showHousehold ? (
            <span className="inline-flex items-center rounded-lg border border-border bg-canvas px-2.5 py-1.5 text-xs font-medium text-ink">
              {coverChip}
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          Prices on this page are illustrative for this prototype.
        </p>
      </div>
    </div>
  )
}

function emphasize(text: string, terms: string[]) {
  const unique = [...new Set(terms.filter(Boolean))].sort(
    (a, b) => b.length - a.length,
  )
  if (!unique.length) return text

  const pattern = new RegExp(
    `(${unique.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi',
  )
  const lowerTerms = unique.map((t) => t.toLowerCase())
  const parts = text.split(pattern)
  return parts.map((part, i) =>
    lowerTerms.includes(part.toLowerCase()) ? (
      <strong key={`${part}-${i}`} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <span key={`${part}-${i}`}>{part}</span>
    ),
  )
}

function TermsLink() {
  return (
    <a
      href="/terms.pdf"
      target="_blank"
      rel="noreferrer"
      className="shrink-0 text-xs text-ink-muted underline-offset-2 transition hover:text-ink hover:underline"
    >
      Terms &amp; conditions
      <span className="ml-1 inline-block align-middle" aria-hidden>
        <ExternalIcon />
      </span>
    </a>
  )
}

function ActionCard({
  to,
  title,
  description,
  icon,
  caution = false,
}: {
  to: string
  title: string
  description: string
  icon: ReactNode
  caution?: boolean
}) {
  return (
    <Link
      to={to}
      className={[
        'flex items-start gap-3 rounded-[10px] border p-3 transition hover:shadow-sm',
        caution
          ? 'border-amber-300 bg-amber-50 hover:border-amber-400'
          : 'border-border bg-canvas/60 hover:border-charcoal/40 hover:bg-white',
      ].join(' ')}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-ink shadow-sm">
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        {caution ? (
          <span className="mt-0.5 block text-[11px] font-medium text-amber-950">
            Coming soon
          </span>
        ) : null}
        <span
          className={[
            'mt-0.5 block text-xs',
            caution ? 'text-amber-950/80' : 'text-ink-muted',
          ].join(' ')}
        >
          {description}
        </span>
      </span>
    </Link>
  )
}

function FunctionsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function PersonaliseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19a7 7 0 0 1 14 0" />
    </svg>
  )
}

function CompareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 4v16M16 4v16M4 8h6M14 16h6" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </svg>
  )
}
