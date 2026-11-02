import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FeatureCard } from '../components/benefits/FeatureCard'
import { benefitsCatalog } from '../data/benefitsCatalog'
import { accessibleFeatureIds } from '../lib/featureAccess'
import { usePlanState } from '../state/PlanContext'

type CoverBucket = 'on-cover' | 'not-on-cover' | 'other-provider'

type SavedFeature = {
  id: string
  name: string
  description: string
  logoText: string
  logoSrc: string
  benefitId: string
  benefitTitle: string
  bucket: CoverBucket
  paidAddOn: boolean
}

export function Saved() {
  const {
    plans,
    pmiBenefits,
    currentPlan,
    loading,
    savedFeatureIds,
    toggleSaved,
    committedAnswers,
  } = usePlanState()

  const enrolledPlan = useMemo(
    () =>
      plans.find((p) => p.planId === currentPlan.planId) ??
      plans.find(
        (p) =>
          p.benefitId === currentPlan.benefitId && p.tier === currentPlan.tier,
      ) ??
      null,
    [plans, currentPlan],
  )

  const enrolledAccessIds = useMemo(() => {
    if (!enrolledPlan) return new Set<string>()
    return accessibleFeatureIds(
      enrolledPlan,
      committedAnswers.selectedExtras,
    )
  }, [enrolledPlan, committedAnswers.selectedExtras])

  const enrolledExtraIds = useMemo(
    () => new Set(committedAnswers.selectedExtras),
    [committedAnswers.selectedExtras],
  )

  const savedFeatures = useMemo(() => {
    if (savedFeatureIds.size === 0) return []

    const byId = new Map<string, SavedFeature>()

    for (const plan of plans) {
      const benefit = pmiBenefits.find((b) => b.id === plan.benefitId) ?? null
      for (const f of plan.features) {
        if (!savedFeatureIds.has(f.featureId)) continue
        const sameProvider = plan.benefitId === currentPlan.benefitId
        let bucket: CoverBucket
        if (sameProvider && enrolledAccessIds.has(f.featureId)) {
          bucket = 'on-cover'
        } else if (sameProvider) {
          bucket = 'not-on-cover'
        } else {
          bucket = 'other-provider'
        }
        const next: SavedFeature = {
          id: f.featureId,
          name: f.featureName,
          description: f.description,
          logoText: benefit?.logoText ?? plan.provider,
          logoSrc: benefit?.logoSrc ?? '/logos/axa.svg',
          benefitId: plan.benefitId,
          benefitTitle: benefit?.title ?? plan.planName,
          bucket,
          paidAddOn:
            bucket === 'on-cover' &&
            f.optionalExtra &&
            enrolledExtraIds.has(f.featureId),
        }
        const existing = byId.get(f.featureId)
        // Prefer enrolled-provider card when feature ids collide across insurers
        if (
          !existing ||
          (sameProvider && existing.benefitId !== currentPlan.benefitId)
        ) {
          byId.set(f.featureId, next)
        }
      }
    }

    for (const benefit of benefitsCatalog) {
      for (const f of benefit.features) {
        if (!savedFeatureIds.has(f.id) || byId.has(f.id)) continue
        byId.set(f.id, {
          id: f.id,
          name: f.name,
          description: f.description,
          logoText: benefit.logoText,
          logoSrc: benefit.logoSrc,
          benefitId: benefit.id,
          benefitTitle: benefit.title,
          bucket: 'other-provider',
          paidAddOn: false,
        })
      }
    }

    return [...byId.values()]
  }, [
    plans,
    pmiBenefits,
    savedFeatureIds,
    enrolledAccessIds,
    enrolledExtraIds,
    currentPlan.benefitId,
  ])

  const onCover = useMemo(
    () => savedFeatures.filter((f) => f.bucket === 'on-cover'),
    [savedFeatures],
  )
  const notOnCover = useMemo(
    () => savedFeatures.filter((f) => f.bucket === 'not-on-cover'),
    [savedFeatures],
  )
  const otherProvider = useMemo(
    () => savedFeatures.filter((f) => f.bucket === 'other-provider'),
    [savedFeatures],
  )

  if (loading) {
    return <p className="p-8 text-ink-muted">Loading saved features…</p>
  }

  const countParts = [
    onCover.length > 0 ? `${onCover.length} on your cover` : null,
    notOnCover.length > 0
      ? `${notOnCover.length} not on your cover`
      : null,
    otherProvider.length > 0
      ? `${otherProvider.length} other providers`
      : null,
  ].filter(Boolean)

  return (
    <div>
      <div className="border-b border-border bg-white px-8 py-5 text-left">
        <h1 className="text-2xl font-bold text-ink">Saved</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
          Features you’ve saved across benefits, compared to your enrolled cover
          {enrolledPlan ? (
            <>
              {' '}
              (
              <strong className="text-ink">{enrolledPlan.planName}</strong>)
            </>
          ) : null}
          .
          {savedFeatures.length > 0
            ? ' Unsave anytime from a card.'
            : null}
        </p>
        {savedFeatures.length > 0 && countParts.length > 0 ? (
          <p className="mt-1.5 text-xs text-ink-muted">
            {countParts.join(' · ')}
          </p>
        ) : null}
      </div>

      <div className="px-8 py-5">
        {savedFeatures.length === 0 ? (
          <div className="rounded-[10px] border border-border bg-white px-6 py-10 text-left shadow-sm">
            <p className="text-sm text-ink-muted">
              Nothing saved yet. Open a benefit and select the heart on a
              feature to keep it here.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
            >
              Browse benefits
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {onCover.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-ink">
                  On your cover
                </h2>
                <FeatureGrid features={onCover} onToggle={toggleSaved} />
              </section>
            )}
            {notOnCover.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-ink">
                  Not on your cover
                </h2>
                <FeatureGrid features={notOnCover} onToggle={toggleSaved} />
                {enrolledPlan ? (
                  <Link
                    to={`/benefits/${enrolledPlan.benefitId}/personalise`}
                    className="mt-3 inline-block text-sm font-medium text-ink underline-offset-2 hover:underline"
                  >
                    Review cover in Personalise
                  </Link>
                ) : null}
              </section>
            )}
            {otherProvider.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-ink">
                  Other providers
                </h2>
                <FeatureGrid features={otherProvider} onToggle={toggleSaved} />
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function FeatureGrid({
  features,
  onToggle,
}: {
  features: SavedFeature[]
  onToggle: (id: string) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {features.map((f) => (
        <div key={f.id} className="text-left">
          <FeatureCard
            title={f.name}
            description={f.description}
            providerLogo={f.logoText}
            logoSrc={f.logoSrc}
            saved
            onToggleSave={() => onToggle(f.id)}
            coverStatus={
              f.bucket === 'on-cover'
                ? f.paidAddOn
                  ? 'paid-add-on'
                  : 'included'
                : f.bucket === 'not-on-cover'
                  ? 'not-included'
                  : 'other-provider'
            }
            to={`/benefits/${f.benefitId}/features/${f.id}`}
          />
          <Link
            to={`/benefits/${f.benefitId}`}
            className="mt-1.5 inline-block px-0.5 text-[11px] text-ink-muted hover:text-ink"
          >
            {f.logoText}
          </Link>
        </div>
      ))}
    </div>
  )
}
