import { useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  AccordionItem,
  AccordionSection,
} from '../components/features/AccordionSection'
import { FeatureDetailLayout } from '../components/features/FeatureDetailLayout'
import { FindNearbyMap } from '../components/features/FindNearbyMap'
import { NumberedList } from '../components/features/NumberedList'
import { getFeatureDetail } from '../data/featureDetails'
import { usePlanState } from '../state/PlanContext'

type FeatureDetailLocationState = {
  /** When set, load this benefit’s feature copy while staying on the route benefitId (e.g. switch compare). */
  detailBenefitId?: string
}

export function FeatureDetail() {
  const { benefitId = '', featureId = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const {
    loading,
    getBenefit,
    getPlansForBenefit,
    selectedTier,
    savedFeatureIds,
    toggleSaved,
  } = usePlanState()

  const routeState = (location.state ?? null) as FeatureDetailLocationState | null
  const detailBenefitId = routeState?.detailBenefitId || benefitId
  const benefit = getBenefit(detailBenefitId)
  const detail = getFeatureDetail(detailBenefitId, featureId)
  const closeTo = location.pathname.includes('/personalise/')
    ? `/benefits/${benefitId}/personalise`
    : `/benefits/${benefitId}/features`

  function close() {
    navigate(closeTo)
  }

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKeyDown)
    }
    // closeTo / navigate are stable enough for this mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeTo])

  const featureMeta = (() => {
    if (!benefit) return null
    if (benefit.isPmi) {
      const plans = getPlansForBenefit(benefit.id)
      const preferred =
        plans.find((p) => p.tier === selectedTier) ??
        plans.find((p) => p.tier === 'plus') ??
        plans[0]
      // Prefer the selected tier, then any plan that defines this feature
      // (lost-access links often point at features dropped from the draft tier).
      const f =
        preferred?.features.find((x) => x.featureId === featureId) ??
        plans
          .flatMap((p) => p.features)
          .find((x) => x.featureId === featureId)
      if (!f) return null
      return {
        id: f.featureId,
        name: f.featureName,
        description: f.description,
        included: f.included,
        category: f.category,
      }
    }
    const f = benefit.features.find((x) => x.id === featureId)
    if (!f) return null
    return {
      id: f.id,
      name: f.name,
      description: f.description,
      included: true,
      category: 'General',
    }
  })()

  if (!benefit) {
    if (loading) return null
    // Prefer closing back into Personalise rather than bouncing home (home
    // would trip the unsaved-draft leave guard mid-edit).
    return <Navigate to={closeTo} replace />
  }

  if (benefit.isPmi && loading) {
    return null
  }

  if (!featureMeta) {
    return <Navigate to={closeTo} replace />
  }

  const content =
    detail ??
    ({
      featureId,
      benefitId: benefit.id,
      overview: featureMeta.description,
      includedIntro: 'On your cover, this includes:',
      includedItems: [
        'Use follows your scheme rules and any waiting periods that apply.',
        'Claims and bookings go through your provider’s member app or phone line.',
      ],
      costSummary:
        'You usually pay through your excess or any add-ons at the point of use, not as a separate monthly charge for this service. What you owe still depends on tier, hospital list, and network. Open Personalise for your monthly contribution.',
      faqs: [
        {
          q: `How do I use ${featureMeta.name}?`,
          a: 'Work through the steps under How do I access? If booking or a claim stalls, contact your provider.',
        },
        {
          q: 'Is this included on my cover?',
          a: featureMeta.included
            ? 'Yes on the cover tier selected in this prototype.'
            : 'No on the cover tier selected in this prototype. Open Compare or Personalise to review other tiers.',
        },
        {
          q: 'Who can I contact for help?',
          a: `${benefit.provider} member support is linked from Go to ${benefit.provider}. For scheme rules, ask HR or your benefits team.`,
        },
      ],
      accessSteps: [
        { text: `Sign in to ${benefit.provider} (app or web).` },
        { text: `Open ${featureMeta.name}, or the closest match in the menu.` },
        { text: 'Answer eligibility questions if you are asked.' },
        { text: 'Book or start a claim using the provider’s instructions.' },
      ],
      providerCta: {
        label: `Go to ${benefit.provider}`,
        href: '#',
      },
      map: {
        enabled: true,
        label: `Find ${featureMeta.name} near you`,
        queryTemplate: `${featureMeta.name} near {place}`,
      },
    } as const)

  const isSaved = savedFeatureIds.has(featureMeta.id)

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-ink/40"
      role="presentation"
      onClick={close}
    >
      <button
        type="button"
        onClick={close}
        className="fixed right-3 top-3 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-white shadow-md hover:bg-ink sm:right-5 sm:top-5"
        aria-label="Close feature details"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div className="flex min-h-full justify-center px-3 py-8 sm:px-6 sm:py-10">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feature-detail-title"
          className="w-full max-w-5xl rounded-[12px] border border-border bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <FeatureDetailLayout
            washColor={benefit.washColor}
            logoSrc={benefit.logoSrc}
            logoText={benefit.logoText}
            provider={benefit.provider}
            title={featureMeta.name}
            main={
              <>
                <section className="rounded-[10px] border border-border bg-white p-5 shadow-sm">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-base font-semibold text-ink">
                      Overview
                    </h2>
                    <button
                      type="button"
                      onClick={() => toggleSaved(featureMeta.id)}
                      className="text-sm font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline"
                    >
                      {isSaved ? 'Unsave' : 'Save feature'}
                    </button>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {content.overview}
                  </p>

                  <h3 className="mt-6 text-sm font-semibold text-ink">
                    What&apos;s included?
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    {content.includedIntro}
                  </p>
                  <div className="mt-3">
                    <NumberedList
                      items={content.includedItems.map((text) => ({ text }))}
                    />
                  </div>

                  <div className="mt-4 border-t border-border">
                    <AccordionItem title="How much do I pay?">
                      <p>{content.costSummary}</p>
                    </AccordionItem>
                  </div>
                </section>

                <AccordionSection title="FAQs">
                  {content.faqs.map((faq) => (
                    <AccordionItem key={faq.q} title={faq.q}>
                      <p className="font-semibold text-ink">{faq.a}</p>
                    </AccordionItem>
                  ))}
                </AccordionSection>

                {content.map.enabled ? (
                  <FindNearbyMap
                    label={content.map.label}
                    queryTemplate={content.map.queryTemplate}
                  />
                ) : null}
              </>
            }
            side={
              <>
                <section className="rounded-[10px] border border-border bg-white p-5 shadow-sm">
                  <h2 className="mb-4 text-base font-semibold text-ink">
                    How do I access?
                  </h2>
                  <NumberedList items={content.accessSteps} />
                  <div className="mt-5 space-y-2 border-t border-border pt-4">
                    {content.providerCta.href &&
                    content.providerCta.href !== '#' ? (
                      <a
                        href={content.providerCta.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-charcoal px-4 py-2.5 text-sm font-medium text-white"
                      >
                        {content.providerCta.label}
                        <ExternalIcon />
                      </a>
                    ) : (
                      <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-950">
                        Demo link. {content.providerCta.label}
                      </span>
                    )}
                    <Link
                      to={`/benefits/${benefit.id}`}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink"
                    >
                      Manage benefit
                    </Link>
                  </div>
                </section>
                {!featureMeta.included ? (
                  <p className="text-xs text-ink-muted">
                    Not on this cover in the prototype. Use Compare or Personalise
                    to see options.
                  </p>
                ) : null}
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v6H4V4h6" />
    </svg>
  )
}
