import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface FeatureCardProps {
  providerLogo?: string
  logoSrc?: string
  /** When set, shown instead of the insurer logo (Product features sections). */
  icon?: ReactNode
  /**
   * When false, render `icon` as-is (e.g. FeatureSectionIcon badge already
   * has its own pastel tile). Default true wraps icon in a gray frame.
   */
  framedIcon?: boolean
  title: string
  description: string
  saved?: boolean
  onToggleSave?: () => void
  muted?: boolean
  /** Explicit cover status vs enrolled plan (Saved / Product features). */
  coverStatus?: 'included' | 'paid-add-on' | 'not-included' | 'other-provider'
  /** When set, the card body navigates to the feature detail page. */
  to?: string
}

function statusChip(
  coverStatus: FeatureCardProps['coverStatus'],
  muted: boolean,
): { label: string; className: string } | null {
  if (coverStatus === 'included') {
    return {
      label: 'Included',
      className: 'bg-emerald-100 text-emerald-900',
    }
  }
  if (coverStatus === 'paid-add-on') {
    return {
      label: 'Paid add-on',
      className: 'bg-amber-100 text-amber-950',
    }
  }
  if (coverStatus === 'not-included') {
    return {
      label: 'Not on this cover',
      className: 'bg-rose-50 text-rose-900/80',
    }
  }
  if (coverStatus === 'other-provider') {
    return {
      label: 'Different provider',
      className: 'bg-canvas text-ink-muted',
    }
  }
  if (muted) {
    return {
      label: 'Not on this cover',
      className: 'bg-rose-50 text-rose-900/80',
    }
  }
  return null
}

export function FeatureCard({
  providerLogo = 'AXA',
  logoSrc = '/logos/axa.svg',
  icon,
  framedIcon = true,
  title,
  description,
  saved = false,
  onToggleSave,
  muted = false,
  coverStatus,
  to,
}: FeatureCardProps) {
  const isMuted =
    muted ||
    coverStatus === 'not-included' ||
    coverStatus === 'other-provider'

  const chip = statusChip(coverStatus, muted)

  const body = (
    <>
      <div className="mb-3 flex items-start justify-between gap-2">
        {icon ? (
          framedIcon ? (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-canvas text-ink">
              {icon}
            </span>
          ) : (
            icon
          )
        ) : (
          <img
            src={logoSrc}
            alt={providerLogo}
            className="h-7 w-auto max-w-[4.5rem] rounded object-contain"
          />
        )}
        {!to && onToggleSave ? (
          <button
            type="button"
            aria-label={saved ? 'Unsave feature' : 'Save feature'}
            onClick={onToggleSave}
            className="text-ink-muted hover:text-ink"
          >
            <HeartIcon filled={saved} />
          </button>
        ) : null}
      </div>
      <h3 className="mb-1 text-sm font-semibold text-ink">{title}</h3>
      <p className="line-clamp-3 text-xs leading-relaxed text-ink-muted">
        {description}
      </p>
      {chip ? (
        <p
          className={[
            'mt-2 inline-flex rounded-md px-1.5 py-0.5 text-[11px] font-medium',
            chip.className,
          ].join(' ')}
        >
          {chip.label}
        </p>
      ) : null}
    </>
  )

  const className = [
    'rounded-[10px] border bg-white p-4 text-left shadow-sm transition hover:border-charcoal/25 hover:shadow-md',
    isMuted
      ? 'border-rose-100/80 bg-rose-50/20 opacity-80'
      : coverStatus === 'paid-add-on'
        ? 'border-amber-200/80'
        : 'border-border',
    to
      ? 'block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal'
      : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <div className="relative">
        {onToggleSave ? (
          <button
            type="button"
            aria-label={saved ? 'Unsave feature' : 'Save feature'}
            onClick={onToggleSave}
            className="absolute right-3 top-3 z-10 rounded-md bg-white/90 p-1 text-ink-muted shadow-sm hover:text-ink"
          >
            <HeartIcon filled={saved} />
          </button>
        ) : null}
        <Link to={to} className={className}>
          {body}
        </Link>
      </div>
    )
  }

  return <article className={className}>{body}</article>
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
    </svg>
  )
}
