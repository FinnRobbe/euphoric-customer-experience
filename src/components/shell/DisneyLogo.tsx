export function DisneyLogo({
  className = '',
  compact = false,
}: {
  className?: string
  /** Icon-only mark for collapsed nav rail */
  compact?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      title="Disney Benefits+"
    >
      <svg
        width={compact ? 24 : 28}
        height={compact ? 24 : 28}
        viewBox="0 0 64 64"
        aria-hidden
        className="shrink-0"
      >
        <circle cx="18" cy="16" r="14" fill="#111111" />
        <circle cx="46" cy="16" r="14" fill="#111111" />
        <circle cx="32" cy="36" r="22" fill="#111111" />
      </svg>
      {!compact && (
        <span className="text-[15px] font-semibold leading-none text-ink">
          Disney Benefits+
        </span>
      )}
    </span>
  )
}
