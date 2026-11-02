import type { ReactNode } from 'react'

export function NumberedList({
  items,
}: {
  items: { text: ReactNode; href?: string }[]
}) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-sm leading-relaxed text-ink">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-canvas text-xs font-semibold text-ink"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <span className="min-w-0 pt-0.5">
            {item.href ? (
              <>
                {typeof item.text === 'string' ? (
                  <span>
                    {item.text.split(item.href).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 ? (
                          <a
                            href={
                              item.href!.startsWith('http')
                                ? item.href
                                : `https://${item.href}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-ink underline underline-offset-2"
                          >
                            {item.href}
                          </a>
                        ) : null}
                      </span>
                    ))}
                  </span>
                ) : (
                  item.text
                )}
              </>
            ) : (
              item.text
            )}
          </span>
        </li>
      ))}
    </ol>
  )
}
