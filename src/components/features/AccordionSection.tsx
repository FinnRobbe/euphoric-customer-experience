import { useState, type ReactNode } from 'react'

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-border first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-3.5 text-left text-sm font-semibold text-ink"
      >
        <span>{title}</span>
        <span
          className="text-lg font-normal leading-none text-ink-muted"
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? (
        <div className="pb-4 text-sm leading-relaxed text-ink-muted">
          {children}
        </div>
      ) : null}
    </div>
  )
}

export function AccordionSection({
  title,
  children,
  className = '',
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={[
        'rounded-[10px] border border-border bg-white px-5 py-1 shadow-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {title ? (
        <h2 className="border-b border-border py-3.5 text-base font-semibold text-ink">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  )
}
