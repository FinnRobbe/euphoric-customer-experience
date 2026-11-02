import type { ReactNode } from 'react'

/** Amber caution for Coming soon / limited non-PMI (or stub) surfaces. */

export function LimitedScopeBanner({
  children,
  className = '',
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'rounded-[10px] border border-amber-300 bg-amber-50 px-4 py-3 text-left text-sm text-amber-950',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
    >
      {children ?? (
        <>
          <strong>Coming soon / limited in this version.</strong> This benefit
          isn’t available to personalise or compare at full depth yet.
        </>
      )}
    </div>
  )
}
