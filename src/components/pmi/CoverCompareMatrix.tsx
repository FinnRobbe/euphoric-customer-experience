import { getApplicableCostBreakdown, getCostBreakdown } from '../../lib/parsePlans'
import { shortPlanName, TIER_LABELS } from '../../lib/tierLabels'
import type { PersonaliseAnswers, Plan } from '../../types'

export type MatrixCellData = {
  text?: string
  mark?: 'yes' | 'no'
  note?: string
}

export type CoverMatrixColumn = {
  key: string
  plan: Plan
  logoSrc?: string
  logoText?: string
  badge?: 'current' | 'best' | 'next' | null
  selected?: boolean
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

function matrixCellBase(p: Plan): MatrixCellData {
  const base = getCostBreakdown(p, [], false, 0).base
  return { text: `£${base}/mo` }
}

function matrixCellYouPay(
  p: Plan,
  household: PersonaliseAnswers,
): MatrixCellData {
  const pay = getApplicableCostBreakdown(
    p,
    household.selectedExtras,
    household.includePartner,
    household.childrenCount,
  )
  // Refused household: do not show a stripped or hypothetical You pay.
  if (pay.householdCapped || pay.quotedEmployeePays == null) {
    return { text: '—' }
  }
  return { text: `£${pay.quotedEmployeePays}/mo` }
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

const ROW_DEFS: {
  label: string
  pick: (p: Plan, household: PersonaliseAnswers) => MatrixCellData
}[] = [
  { label: 'You pay', pick: (p, h) => matrixCellYouPay(p, h) },
  { label: 'Base (core)', pick: (p) => matrixCellBase(p) },
  { label: 'Claim excess', pick: (p) => matrixCellExcess(p) },
  { label: 'Outpatient cover', pick: (p) => matrixCellOutpatient(p) },
  { label: 'Hospital list', pick: (p) => matrixCellHospital(p) },
  { label: 'Family cover', pick: (p) => matrixCellFamily(p) },
  { label: 'Cancer care', pick: (p) => matrixCellCancer(p) },
  { label: 'Psychological counselling', pick: (p) => matrixCellMental(p) },
  { label: 'Lifestyle extras', pick: (p) => matrixCellLifestyle(p) },
]

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

function badgeLabel(badge: CoverMatrixColumn['badge']): string | null {
  if (badge === 'current') return 'Your plan'
  if (badge === 'best') return 'Best match'
  if (badge === 'next') return 'Next best'
  return null
}

/** Pin Your plan beside the Cover labels while other insurers scroll. */
const CURRENT_COL_STICKY =
  'sticky left-[8.5rem] z-10 shadow-[4px_0_8px_-4px_rgba(15,23,42,0.18)]'

export function CoverCompareMatrix({
  columns,
  household,
  onSelectColumn,
}: {
  columns: CoverMatrixColumn[]
  household: PersonaliseAnswers
  onSelectColumn?: (key: string) => void
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-max min-w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="sticky left-0 z-20 w-[8.5rem] min-w-[8.5rem] bg-white pb-3 pr-2 text-left text-xs font-medium text-ink-muted">
              Cover
            </th>
            {columns.map((col) => {
              const badge = badgeLabel(col.badge)
              const selectable = Boolean(onSelectColumn)
              const selected = Boolean(col.selected)
              const isCurrent = col.badge === 'current'
              return (
                <th
                  key={col.key}
                  className={[
                    'min-w-[9.5rem] max-w-[11rem] px-2 pb-3 align-bottom',
                    isCurrent ? CURRENT_COL_STICKY : '',
                    isCurrent
                      ? selected
                        ? 'bg-white'
                        : 'bg-amber-50'
                      : selected
                        ? 'bg-canvas'
                        : 'bg-white',
                  ].join(' ')}
                >
                  {selectable ? (
                    <button
                      type="button"
                      onClick={() => onSelectColumn?.(col.key)}
                      className={[
                        'flex w-full flex-col items-start gap-1.5 rounded-lg border px-2.5 py-2 text-left transition',
                        selected
                          ? 'border-charcoal bg-white shadow-sm'
                          : 'border-border bg-white/80 hover:border-charcoal/40',
                      ].join(' ')}
                    >
                      <ColumnHeader col={col} badge={badge} />
                    </button>
                  ) : (
                    <div
                      className={[
                        'flex flex-col items-start gap-1.5 rounded-lg border px-2.5 py-2',
                        isCurrent
                          ? 'border-amber-200 bg-amber-50'
                          : 'border-border bg-white',
                      ].join(' ')}
                    >
                      <ColumnHeader col={col} badge={badge} />
                    </div>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {ROW_DEFS.map((row) => (
            <tr key={row.label} className="border-t border-border">
              <th className="sticky left-0 z-20 min-w-[8.5rem] bg-white py-2.5 pr-2 text-left text-xs font-medium text-ink-muted">
                {row.label}
              </th>
              {columns.map((col) => {
                const isCurrent = col.badge === 'current'
                const selected = Boolean(col.selected)
                return (
                  <td
                    key={`${row.label}-${col.key}`}
                    className={[
                      'px-2 py-2.5 text-center',
                      isCurrent ? CURRENT_COL_STICKY : '',
                      isCurrent
                        ? selected
                          ? 'bg-canvas'
                          : 'bg-amber-50'
                        : selected
                          ? 'bg-canvas/60'
                          : 'bg-white',
                    ].join(' ')}
                  >
                    <MatrixCell cell={row.pick(col.plan, household)} />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ColumnHeader({
  col,
  badge,
}: {
  col: CoverMatrixColumn
  badge: string | null
}) {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-2">
        {col.logoSrc ? (
          <img
            src={col.logoSrc}
            alt={col.logoText || col.plan.provider}
            className="h-7 w-auto max-w-[4.5rem] object-contain object-left"
          />
        ) : (
          <span className="text-[11px] font-semibold text-ink">
            {col.plan.provider}
          </span>
        )}
        {badge ? (
          <span
            className={[
              'shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              col.badge === 'current'
                ? 'bg-amber-200/80 text-amber-950'
                : col.badge === 'best'
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-sky-100 text-sky-950',
            ].join(' ')}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink">
          {shortPlanName(col.plan)}
        </p>
        <p className="text-[11px] text-ink-muted">
          {col.plan.provider} · {TIER_LABELS[col.plan.tier]}
        </p>
      </div>
    </>
  )
}
