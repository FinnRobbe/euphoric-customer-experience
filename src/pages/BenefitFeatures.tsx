import { useMemo, useState } from 'react'
import { Link, Navigate, Outlet, useParams } from 'react-router-dom'
import { FeatureCard } from '../components/benefits/FeatureCard'
import { FeatureSectionIcon } from '../components/benefits/FeatureSectionIcon'
import {
  coverStatusForFeature,
  groupFeaturesBySection,
  type FeatureCoverStatus,
} from '../lib/featureSections'
import { TIER_LABELS } from '../lib/tierLabels'
import { usePlanState } from '../state/PlanContext'

type CoverageFilter = 'all' | 'included' | 'paid-add-on' | 'not-included'

type ListedFeature = {
  featureId: string
  featureName: string
  description: string
  category: string
  included: boolean
  optionalExtra: boolean
  coverStatus: FeatureCoverStatus
}

export function BenefitFeatures() {
  const { benefitId = '' } = useParams()
  const {
    loading,
    savedFeatureIds,
    toggleSaved,
    getPlansForBenefit,
    getBenefit,
    selectedTier,
  } = usePlanState()
  const benefit = getBenefit(benefitId)
  const [query, setQuery] = useState('')
  const [coverageFilter, setCoverageFilter] = useState<CoverageFilter>('all')

  const features = useMemo((): ListedFeature[] => {
    if (!benefit) return []
    if (benefit.isPmi) {
      const plans = getPlansForBenefit(benefit.id)
      const plan =
        plans.find((p) => p.tier === selectedTier) ??
        plans.find((p) => p.tier === 'plus')
      if (!plan) return []
      return plan.features.map((f) => ({
        featureId: f.featureId,
        featureName: f.featureName,
        description: f.description,
        category: f.category,
        included: f.included,
        optionalExtra: f.optionalExtra,
        coverStatus: coverStatusForFeature(f),
      }))
    }
    return benefit.features.map((f) => ({
      featureId: f.id,
      featureName: f.name,
      description: f.description,
      category: 'General',
      included: true,
      optionalExtra: false,
      coverStatus: 'included' as const,
    }))
  }, [benefit, getPlansForBenefit, selectedTier])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return features.filter((f) => {
      if (coverageFilter === 'included' && f.coverStatus !== 'included') {
        return false
      }
      if (
        coverageFilter === 'paid-add-on' &&
        f.coverStatus !== 'paid-add-on'
      ) {
        return false
      }
      if (
        coverageFilter === 'not-included' &&
        f.coverStatus !== 'not-included'
      ) {
        return false
      }
      if (!q) return true
      return (
        f.featureName.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      )
    })
  }, [features, query, coverageFilter])

  const grouped = useMemo(
    () => groupFeaturesBySection(filtered),
    [filtered],
  )

  const includedCount = features.filter(
    (f) => f.coverStatus === 'included',
  ).length
  const addOnCount = features.filter(
    (f) => f.coverStatus === 'paid-add-on',
  ).length
  const notIncludedCount = features.filter(
    (f) => f.coverStatus === 'not-included',
  ).length

  if (!benefit) {
    if (loading) return <p className="p-8 text-ink-muted">Loading features…</p>
    return <Navigate to="/" replace />
  }
  if (benefit.isPmi && loading) {
    return <p className="p-8 text-ink-muted">Loading features…</p>
  }

  const tierLabel = benefit.isPmi ? TIER_LABELS[selectedTier] : null

  const filterChips: { id: CoverageFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'included', label: 'On your cover' },
    { id: 'paid-add-on', label: 'Paid add-ons' },
    { id: 'not-included', label: 'Not on cover' },
  ]

  return (
    <>
      <div>
        <div className="border-b border-border bg-white px-8 py-5 text-left">
          <Link
            to={`/benefits/${benefit.id}`}
            className="mb-3 inline-flex text-sm text-ink-muted hover:text-ink"
          >
            ‹ Back to {benefit.title}
          </Link>
          <h1 className="text-2xl font-bold text-ink">Product features</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
            What you can use on{' '}
            <strong className="text-ink">
              {benefit.provider}
              {tierLabel ? ` · ${tierLabel}` : ''}
            </strong>
            . Grouped like Compare &amp; pick cover so you can see what is
            included and what is not.
          </p>
          {benefit.isPmi ? (
            <p className="mt-2 text-sm text-ink">
              <span className="font-semibold tabular-nums">
                {includedCount}
              </span>{' '}
              of {features.length} features included
              {addOnCount > 0 ? (
                <>
                  {' '}
                  · {addOnCount} paid add-on{addOnCount === 1 ? '' : 's'}
                </>
              ) : null}
              {notIncludedCount > 0 ? (
                <>
                  {' '}
                  · {notIncludedCount} not on this cover
                </>
              ) : null}
            </p>
          ) : null}
        </div>

        <div className="px-8 py-5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search features"
            className="mb-3 w-full max-w-sm rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-charcoal"
          />

          {benefit.isPmi ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {filterChips.map((chip) => {
                const active = coverageFilter === chip.id
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setCoverageFilter(chip.id)}
                    className={[
                      'rounded-lg border px-3 py-1.5 text-xs font-medium transition',
                      active
                        ? 'border-charcoal bg-charcoal text-white'
                        : 'border-border bg-white text-ink hover:border-charcoal/40',
                    ].join(' ')}
                  >
                    {chip.label}
                  </button>
                )
              })}
            </div>
          ) : null}

          {grouped.length > 1 ? (
            <nav
              aria-label="Feature sections"
              className="sticky top-0 z-10 -mx-1 mb-5 overflow-x-auto bg-canvas/95 px-1 py-2 backdrop-blur"
            >
              <ul className="flex w-max gap-2">
                {grouped.map(({ section, features: list }) => (
                  <li key={section.id}>
                    <a
                      href={`#section-${section.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-medium text-ink hover:border-charcoal/40"
                    >
                      <FeatureSectionIcon
                        sectionId={section.id}
                        variant="badge"
                        size="sm"
                      />
                      {section.label}
                      <span className="tabular-nums text-ink-muted">
                        {list.length}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {query.trim() && filtered.length === 0 ? (
            <div className="text-left text-sm text-ink-muted">
              <p>
                No features match “{query.trim()}”. Clear search or try another
                term.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-2 text-sm font-medium text-ink underline-offset-2 hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-ink-muted">
              No features in this filter. Choose All to see everything on this
              cover.
            </p>
          ) : (
            <div className="space-y-8">
              {grouped.map(({ section, features: list }) => {
                const included = list.filter(
                  (f) => f.coverStatus === 'included',
                ).length
                const addOns = list.filter(
                  (f) => f.coverStatus === 'paid-add-on',
                ).length
                const missing = list.filter(
                  (f) => f.coverStatus === 'not-included',
                ).length
                return (
                  <section
                    key={section.id}
                    id={`section-${section.id}`}
                    className="scroll-mt-16"
                  >
                    <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b border-border pb-2">
                      <div className="flex items-center gap-2">
                        <FeatureSectionIcon
                          sectionId={section.id}
                          variant="badge"
                          size="md"
                        />
                        <div>
                          <h2 className="text-lg font-semibold text-ink">
                            {section.label}
                          </h2>
                          <p className="text-xs text-ink-muted">
                            {included > 0
                              ? `${included} included`
                              : 'None included'}
                            {addOns > 0
                              ? ` · ${addOns} add-on${addOns === 1 ? '' : 's'}`
                              : ''}
                            {missing > 0
                              ? ` · ${missing} not on this cover`
                              : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {list.map((f) => (
                        <FeatureCard
                          key={f.featureId}
                          title={f.featureName}
                          description={f.description}
                          icon={
                            <FeatureSectionIcon
                              sectionId={section.id}
                              variant="badge"
                              size="md"
                            />
                          }
                          framedIcon={false}
                          saved={savedFeatureIds.has(f.featureId)}
                          onToggleSave={() => toggleSaved(f.featureId)}
                          coverStatus={f.coverStatus}
                          to={`/benefits/${benefit.id}/features/${f.featureId}`}
                        />
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  )
}
