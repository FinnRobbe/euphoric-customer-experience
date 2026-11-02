import type { ReactNode } from 'react'

export function FeatureDetailLayout({
  washColor,
  logoSrc,
  logoText,
  provider,
  title,
  main,
  side,
}: {
  washColor: string
  logoSrc: string
  logoText: string
  provider: string
  title: string
  main: ReactNode
  side: ReactNode
}) {
  return (
    <div className="min-h-0">
      <div
        className="rounded-t-[12px] border-b border-border px-5 pb-4 pt-4 md:px-6"
        style={{ backgroundColor: washColor }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <img
            src={logoSrc}
            alt={logoText}
            className="h-8 w-auto max-w-[5.5rem] rounded object-contain"
          />
          <p className="text-sm font-medium text-ink-muted">{provider}</p>
        </div>
        <h1
          id="feature-detail-title"
          className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl"
        >
          {title}
        </h1>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 md:flex-row md:items-start md:px-6">
        <div className="min-w-0 flex-1 space-y-5">{main}</div>
        <aside className="w-full shrink-0 space-y-4 md:w-[280px] md:self-start">
          {side}
        </aside>
      </div>
    </div>
  )
}
