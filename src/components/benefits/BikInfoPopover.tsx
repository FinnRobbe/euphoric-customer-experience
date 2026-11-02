import { useEffect } from 'react'
import { BIK_EXEMPLAR_TAX_RATE, estimateBikTax } from '../../lib/parsePlans'

export function BikInfoPopover({
  open,
  onClose,
  bikTaxableValue,
}: {
  open: boolean
  onClose: () => void
  /** Employer-funded amount this row treats as taxable BIK. */
  bikTaxableValue: number
}) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const ratePct = Math.round(BIK_EXEMPLAR_TAX_RATE * 100)
  const exampleTax = estimateBikTax(bikTaxableValue)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bik-info-title"
        className="w-full max-w-md rounded-[10px] border border-border bg-white p-5 text-left shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2
            id="bik-info-title"
            className="text-lg font-semibold text-ink"
          >
            Why is there tax?
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-2.5 py-1 text-sm font-medium text-ink"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-muted">
          <p>
            If your employer pays for PMI, HMRC often treats that as a{' '}
            <strong className="text-ink">Benefit-in-Kind</strong>, so you can
            owe income tax on it.
          </p>
          <p>
            On this cover the employer funds £{bikTaxableValue}/mo.{' '}
            <strong className="text-ink">Est. tax</strong> is ~£{exampleTax}/mo
            at {ratePct}% — a rough guide only, and{' '}
            <strong className="text-ink">not</strong> included in{' '}
            <strong className="text-ink">You pay</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
