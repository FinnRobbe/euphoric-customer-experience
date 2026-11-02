import { featureSectionAccent } from '../../lib/featureSectionAccents'
import type { FeatureSectionId } from '../../lib/featureSections'

const SIZE_PLAIN = 20
const SIZE_BADGE_SM = 16
const SIZE_BADGE_MD = 20

export function FeatureSectionIcon({
  sectionId,
  className = 'text-ink',
  variant = 'plain',
  size = 'md',
}: {
  sectionId: FeatureSectionId
  className?: string
  /** plain = mono stroke; badge = pastel rounded tile + tinted stroke */
  variant?: 'plain' | 'badge'
  /** Badge tile size (ignored for plain). */
  size?: 'sm' | 'md'
}) {
  const glyphSize =
    variant === 'badge'
      ? size === 'sm'
        ? SIZE_BADGE_SM
        : SIZE_BADGE_MD
      : SIZE_PLAIN

  const accent = featureSectionAccent(sectionId)
  const svgClass =
    variant === 'badge' ? accent.iconClass : className

  const svg = (
    <svg
      width={glyphSize}
      height={glyphSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={svgClass}
      aria-hidden
    >
      <FeatureSectionGlyph sectionId={sectionId} />
    </svg>
  )

  if (variant === 'plain') return svg

  const tileSize = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
  return (
    <span
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-lg',
        tileSize,
        accent.tileClass,
      ].join(' ')}
      aria-hidden
    >
      {svg}
    </span>
  )
}

function FeatureSectionGlyph({
  sectionId,
}: {
  sectionId: FeatureSectionId
}) {
  switch (sectionId) {
    case 'outpatient':
      return (
        <>
          <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M3 21v-1a5 5 0 0 1 5-5h2" />
          <path d="M16 3v6M13 6h6" />
          <path d="M19 14v7M16 17h6" />
        </>
      )
    case 'hospital':
      return (
        <>
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 21v-6h6v6" />
          <path d="M10 10h4M12 8v4" />
        </>
      )
    case 'family':
      return (
        <>
          <path d="M8 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M16 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M2.5 21v-1a4.5 4.5 0 0 1 9 0v1" />
          <path d="M14 21v-.5a3.5 3.5 0 0 1 7 0V21" />
        </>
      )
    case 'cancer':
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          <path d="m4.9 4.9 2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
        </>
      )
    case 'mental':
      return (
        <>
          <path d="M12 3a7 7 0 0 0-7 7c0 3.5 2.5 5.5 4 7v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2c1.5-1.5 4-3.5 4-7a7 7 0 0 0-7-7Z" />
          <path d="M10 21h4" />
        </>
      )
    case 'lifestyle':
      return (
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
      )
    case 'other':
    default:
      return (
        <>
          <path d="M8 6h13M8 12h13M8 18h13" />
          <path d="M3 6h.01M3 12h.01M3 18h.01" />
        </>
      )
  }
}
