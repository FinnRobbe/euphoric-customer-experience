import { Link } from 'react-router-dom'
import { FeatureCard } from '../components/benefits/FeatureCard'
import { getCostBreakdown } from '../lib/parsePlans'
import { usePlanState } from '../state/PlanContext'

export function PmiHub() {
  const { selectedPlan, loading, error, savedFeatureIds, toggleSaved } =
    usePlanState()

  if (loading) {
    return <p className="p-8 text-ink-muted">Loading plan…</p>
  }
  if (error || !selectedPlan) {
    return <p className="p-8 text-red-600">{error ?? 'Plan not found'}</p>
  }

  const included = selectedPlan.features.filter((f) => f.included)
  const preview = included.slice(0, 6)
  const coreCost = getCostBreakdown(selectedPlan, [], false, 0)

  return (
    <div>
      <div className="bg-axa-wash px-8 pb-8 pt-5">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"
        >
          <span aria-hidden>‹</span> Benefits &gt; Private Medical Insurance
        </Link>
        <div className="flex items-center gap-4">
          <img
            src="/logos/axa.svg"
            alt="AXA"
            className="h-16 w-16 rounded-lg shadow"
          />
          <div>
            <p className="text-sm text-ink-muted">{selectedPlan.provider}</p>
            <h1 className="text-2xl font-bold text-ink">Private Medical Insurance</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Current flex tier:{' '}
              <strong className="text-ink">{selectedPlan.planName}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 px-8 py-6">
        <section className="rounded-[10px] border border-border bg-white p-4 text-left shadow-sm">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-ink">Manage your PMI</h2>
              <p className="text-xs text-ink-muted">
                You pay £{coreCost.employeePays}/mo · Employer contributes £
                {coreCost.employerPays}/mo toward core · excess £
                {selectedPlan.excessGbp} · {selectedPlan.hospitalList}
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <ActionCard
              to="/benefits/pmi/features"
              title="Product features"
              description="Browse every feature in your tier"
              icon={<FunctionsIcon />}
            />
            <ActionCard
              to="/benefits/pmi/personalise"
              title="Personalise"
              description="Cover, dependants, extras & cost"
              icon={<PersonaliseIcon />}
            />
            <ActionCard
              to="/benefits/pmi/compare"
              title="Compare"
              description="Core vs Comprehensive vs Premier"
              icon={<CompareIcon />}
            />
            <a
              href="/terms.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 rounded-[10px] border border-border bg-canvas/60 p-3 transition hover:border-charcoal/40 hover:bg-white hover:shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-ink shadow-sm">
                <TermsIcon />
              </span>
              <span className="min-w-0 text-left">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Terms &amp; conditions
                  <ExternalIcon />
                </span>
                <span className="mt-0.5 block text-xs text-ink-muted">
                  Placeholder; this would link to the official T&amp;C of the
                  policy
                </span>
              </span>
            </a>
          </div>
        </section>

        <section className="rounded-[10px] border border-border bg-white p-5 text-left shadow-sm">
          <h2 className="mb-2 text-base font-semibold text-ink">Overview</h2>
          <p className="text-sm leading-relaxed text-ink-muted">
            On your{' '}
            <strong className="text-ink">{selectedPlan.planName}</strong> tier
            you can use virtual GP, inpatient and day-case hospital care,
            diagnostics, mental health support, and cancer pathways. Limits
            depend on the cover you choose in Personalise.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            You can change tier, add dependants if this tier allows, and pick
            extras in Personalise. Employer contributes £{coreCost.employerPays}
            /mo toward core. Outpatient cover:{' '}
            <strong className="text-ink">{selectedPlan.outpatientCover}</strong>.
          </p>
        </section>

        <section className="relative">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {preview.map((f, index) => {
              const fading = index >= 4
              return (
                <div
                  key={f.featureId}
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
                    title={f.featureName}
                    description={f.description}
                    saved={savedFeatureIds.has(f.featureId)}
                    onToggleSave={() => toggleSaved(f.featureId)}
                  />
                </div>
              )
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas via-canvas/80 to-transparent" />

          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <Link
              to="/benefits/pmi/features"
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

function ActionCard({
  to,
  title,
  description,
  icon,
}: {
  to: string
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="flex items-start gap-3 rounded-[10px] border border-border bg-canvas/60 p-3 transition hover:border-charcoal/40 hover:bg-white hover:shadow-sm"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-ink shadow-sm">
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="mt-0.5 block text-xs text-ink-muted">{description}</span>
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

function TermsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5M8 12h8M8 16h6" />
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
