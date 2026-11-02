import { Link, Navigate, Outlet, useParams } from 'react-router-dom'
import { LimitedScopeBanner } from '../components/benefits/LimitedScopeBanner'
import { isPmiBenefitId } from '../data/providerPlans'
import { usePlanState } from '../state/PlanContext'
import { PmiPersonalise } from './PmiPersonalise'

export function BenefitPersonalise() {
  const { benefitId = '' } = useParams()
  const { getBenefit, loading } = usePlanState()
  const benefit = getBenefit(benefitId)

  // PMI benefits load from CSV — wait before treating missing as 404
  if (!benefit && (loading || isPmiBenefitId(benefitId))) {
    return (
      <>
        <p className="p-8 text-ink-muted">Loading…</p>
        <Outlet />
      </>
    )
  }
  if (!benefit) return <Navigate to="/" replace />

  return (
    <>
      {isPmiBenefitId(benefitId) ? (
        <PmiPersonalise benefitId={benefitId} />
      ) : (
        <div className="px-8 py-6 text-left">
          <Link
            to={`/benefits/${benefit.id}`}
            className="mb-3 inline-flex text-sm text-ink-muted hover:text-ink"
          >
            ‹ Back to {benefit.title}
          </Link>
          <h1 className="text-2xl font-bold text-ink">Personalise (limited)</h1>
          <LimitedScopeBanner className="mt-4 max-w-2xl">
            <strong>Coming soon / limited in this version.</strong> You can’t
            change options here yet. Open the benefit page to see what’s
            included.
          </LimitedScopeBanner>
          <p className="mt-4 max-w-2xl text-sm text-ink-muted">
            Enrolment for {benefit.provider} isn’t available in this version.
          </p>
          <Link
            to={`/benefits/${benefit.id}`}
            className="mt-5 inline-flex rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
          >
            Back to {benefit.title}
          </Link>
        </div>
      )}
      <Outlet />
    </>
  )
}
