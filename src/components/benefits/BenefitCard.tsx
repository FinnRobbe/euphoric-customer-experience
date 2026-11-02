import { Link } from 'react-router-dom'

interface BenefitCardProps {
  provider: string
  title: string
  description: string
  headerColor: string
  to?: string
  logoText?: string
  logoSrc?: string
  badge?: 'current' | 'alternative' | 'limited' | null
  onSelect?: () => void
}

export function BenefitCard({
  provider,
  title,
  description,
  headerColor,
  to,
  logoText,
  logoSrc,
  badge = null,
  onSelect,
}: BenefitCardProps) {
  // PMI marks sit on the brand field. Bupa and Vitality artwork stays
  // brand-coloured for light surfaces (detail, compare); on these saturated
  // headers it knocks out to white. AXA’s tile is already a solid mark.
  // Other benefits keep the white logo plate.
  const onBrandField =
    !!logoSrc &&
    (logoSrc.includes('/logos/axa.svg') ||
      logoSrc.includes('/logos/bupa.svg') ||
      logoSrc.includes('/logos/vitality.svg'))
  const knockoutOnField =
    !!logoSrc &&
    (logoSrc.includes('/logos/bupa.svg') ||
      logoSrc.includes('/logos/vitality.svg'))

  const body = (
    <>
      <div
        className="relative flex h-32 items-center justify-center rounded-t-[10px] px-3 pt-10"
        style={{ backgroundColor: headerColor }}
      >
        {badge === 'current' && (
          <span className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-md bg-charcoal px-2.5 py-1.5 text-left text-[11px] font-medium leading-tight text-white shadow-sm">
            Your current medical insurance
          </span>
        )}
        {badge === 'alternative' && (
          <span className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-md bg-white/95 px-2.5 py-1.5 text-left text-[11px] font-medium leading-tight text-ink shadow-sm">
            Alternative medical insurance
          </span>
        )}
        {badge === 'limited' && (
          <span className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-left text-[11px] font-medium leading-tight text-amber-950 shadow-sm">
            Coming soon / limited in this version
          </span>
        )}
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={logoText ?? provider}
            className={
              onBrandField
                ? knockoutOnField
                  ? 'h-14 max-w-[11rem] object-contain brightness-0 invert'
                  : 'h-16 w-16 object-contain'
                : 'h-12 max-w-[10rem] rounded-lg bg-white object-contain shadow-sm'
            }
          />
        ) : (
          <span className="rounded bg-white px-3 py-1.5 text-sm font-bold tracking-wide text-ink shadow-sm">
            {logoText ?? provider}
          </span>
        )}
      </div>
      <div className="space-y-1 p-4 text-left">
        <p className="text-xs text-ink-muted">{provider}</p>
        <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
        <p className="line-clamp-3 text-sm leading-snug text-ink-muted">
          {description}
        </p>
      </div>
    </>
  )

  const className = [
    'block overflow-hidden rounded-[10px] border bg-white shadow-sm transition hover:border-charcoal/30 hover:shadow-md',
    badge === 'current' ? 'border-charcoal ring-1 ring-charcoal/30' : 'border-border',
  ].join(' ')

  if (to) {
    return (
      <Link
        to={to}
        className={className}
        onClick={() => onSelect?.()}
      >
        {body}
      </Link>
    )
  }

  return <div className={`${className} cursor-default opacity-90`}>{body}</div>
}
