import { useState } from 'react'
import {
  BIK_EXEMPLAR_TAX_RATE,
  estimateBikTax,
} from '../../lib/parsePlans'
import { BikInfoPopover } from './BikInfoPopover'

export function BikTaxNote({
  employerFundingGbp,
  className = '',
  variant = 'callout',
  tone = 'emerald',
}: {
  /** Employer-funded core amount treated as taxable BIK. */
  employerFundingGbp: number
  className?: string
  /** `inline` sits beside a price; `callout` is a quiet standalone note. */
  variant?: 'inline' | 'callout'
  /** Colour for the inline chip — emerald in the draft cost box, neutral elsewhere. */
  tone?: 'emerald' | 'neutral'
}) {
  const [open, setOpen] = useState(false)
  const tax = estimateBikTax(employerFundingGbp)
  const ratePct = Math.round(BIK_EXEMPLAR_TAX_RATE * 100)

  if (employerFundingGbp <= 0) return null

  const inlineTone =
    tone === 'neutral'
      ? {
          text: 'text-ink-muted',
          button:
            'border-border text-ink-muted hover:border-charcoal hover:text-ink',
        }
      : {
          text: 'text-emerald-900/55',
          button:
            'border-emerald-800/25 text-emerald-900/70 hover:border-emerald-800/50 hover:text-emerald-900',
        }

  return (
    <>
      {variant === 'inline' ? (
        <span
          className={[
            'inline-flex items-center gap-1.5 text-sm font-medium tabular-nums',
            inlineTone.text,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span>
            + ~£{tax} tax
            <span className="sr-only">
              {' '}
              on employer funding (illustrative {ratePct}%; not added to You
              pay)
            </span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={[
              'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold',
              inlineTone.button,
            ].join(' ')}
            aria-label={`About estimated £${tax}/mo tax on employer-funded PMI`}
          >
            i
          </button>
        </span>
      ) : (
        <div
          className={[
            'flex items-start gap-2 rounded-lg border border-border bg-canvas/60 px-2.5 py-2 text-xs leading-snug text-ink-muted',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <p className="min-w-0 flex-1">
            <strong className="font-medium text-ink">Est. tax</strong> ~£{tax}
            /mo (illustrative {ratePct}%). Not added to{' '}
            <strong className="font-medium text-ink">You pay</strong>.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-[11px] font-semibold text-ink-muted hover:border-charcoal hover:text-ink"
            aria-label="About tax on employer-funded PMI"
          >
            i
          </button>
        </div>
      )}
      <BikInfoPopover
        open={open}
        onClose={() => setOpen(false)}
        bikTaxableValue={employerFundingGbp}
      />
    </>
  )
}
