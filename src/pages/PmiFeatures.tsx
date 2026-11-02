import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FeatureCard } from '../components/benefits/FeatureCard'
import { usePlanState } from '../state/PlanContext'

export function PmiFeatures() {
  const { selectedPlan, loading, error, savedFeatureIds, toggleSaved } =
    usePlanState()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    if (!selectedPlan) return ['All']
    const set = new Set(selectedPlan.features.map((f) => f.category))
    return ['All', ...Array.from(set).sort()]
  }, [selectedPlan])

  const filtered = useMemo(() => {
    if (!selectedPlan) return []
    return selectedPlan.features.filter((f) => {
      const matchesCategory = category === 'All' || f.category === category
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        f.featureName.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [selectedPlan, category, query])

  if (loading) return <p className="p-8 text-ink-muted">Loading features…</p>
  if (error || !selectedPlan) {
    return <p className="p-8 text-red-600">{error ?? 'Plan not found'}</p>
  }

  const includedCount = selectedPlan.features.filter((f) => f.included).length

  return (
    <div>
      <div className="border-b border-border bg-white px-8 py-5 text-left">
        <Link
          to="/benefits/pmi"
          className="mb-3 inline-flex text-sm text-ink-muted hover:text-ink"
        >
          ‹ Back to Private medical insurance
        </Link>
        <h1 className="text-2xl font-bold text-ink">Product features</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
          These are the services in your medical insurance benefit. Examples
          include virtual GP and cancer pathways. Full list for{' '}
          <strong className="text-ink">{selectedPlan.planName}</strong>:{' '}
          {includedCount} included of {selectedPlan.features.length}.
        </p>
      </div>

      <div className="px-8 py-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search features"
            className="w-full max-w-sm rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-charcoal"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={[
                  'rounded-full px-3 py-1.5 text-sm',
                  category === c
                    ? 'bg-charcoal text-white'
                    : 'border border-border bg-white text-ink',
                ].join(' ')}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((f) => (
            <FeatureCard
              key={f.featureId}
              title={f.featureName}
              description={f.description}
              saved={savedFeatureIds.has(f.featureId)}
              onToggleSave={() => toggleSaved(f.featureId)}
              muted={!f.included}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
