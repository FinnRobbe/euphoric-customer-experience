import { useMemo, useState } from 'react'
import { BenefitCard } from '../components/benefits/BenefitCard'
import {
  benefitsCatalog,
  type BenefitCategory,
  type BenefitDetail,
} from '../data/benefitsCatalog'
import { isPmiBenefitId, type PmiBenefitId } from '../data/providerPlans'
import { usePlanState } from '../state/PlanContext'
import type { PmiBenefitSummary } from '../types'

const categories: Array<'All' | BenefitCategory> = [
  'All',
  'Insurance',
  'Retirement',
  'Leisure & Misc.',
]

type AnyBenefit = BenefitDetail | PmiBenefitSummary

export function BenefitsGrid() {
  const { currentPlan, setSelectedBenefitId, pmiBenefits, loading } =
    usePlanState()
  const [activeCategory, setActiveCategory] = useState<'All' | BenefitCategory>(
    'Insurance',
  )

  const allBenefits: AnyBenefit[] = useMemo(
    () => [...pmiBenefits, ...benefitsCatalog],
    [pmiBenefits],
  )

  const visible = useMemo(() => {
    if (activeCategory === 'All') return allBenefits
    return allBenefits.filter((b) => b.category === activeCategory)
  }, [activeCategory, allBenefits])

  if (loading && pmiBenefits.length === 0) {
    return <p className="px-8 py-6 text-ink-muted">Loading benefits…</p>
  }

  return (
    <div className="px-8 py-6">
      <h1 className="mb-4 text-left text-xl font-bold text-ink">Your benefits</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => {
          const count =
            category === 'All'
              ? allBenefits.length
              : allBenefits.filter((b) => b.category === category).length
          const active = activeCategory === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={active}
              aria-label={`${category}, ${count} benefits`}
              className={[
                'rounded-full px-3.5 py-1.5 text-sm transition',
                active
                  ? 'bg-charcoal text-white'
                  : 'border border-border bg-white text-ink hover:border-charcoal/40',
              ].join(' ')}
            >
              {category} ({count})
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-left text-sm text-ink-muted">
          No benefits in this category. Try another filter above.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((b) => {
            const isPmi = isPmiBenefitId(b.id)
            let badge: 'current' | 'alternative' | 'limited' | null = null
            if (isPmi) {
              badge =
                b.id === currentPlan.benefitId ? 'current' : 'alternative'
            } else {
              badge = 'limited'
            }
            return (
              <BenefitCard
                key={b.id}
                provider={b.provider}
                title={b.title}
                description={b.cardDescription}
                headerColor={b.headerColor}
                logoText={b.logoText}
                logoSrc={b.logoSrc}
                to={`/benefits/${b.id}`}
                badge={badge}
                onSelect={() => {
                  if (isPmiBenefitId(b.id)) {
                    setSelectedBenefitId(b.id as PmiBenefitId)
                  }
                }}
              />
            )
          })}
        </div>
      )}

      <p className="mt-10 text-left text-xs text-ink-muted">
        Plan details on this page are illustrative for this prototype.
      </p>
    </div>
  )
}
