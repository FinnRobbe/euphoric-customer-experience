import { useMemo, useState, type FormEvent } from 'react'

function buildMapsQuery(template: string, place: string): string {
  const trimmed = place.trim()
  if (template.includes('{place}')) {
    return template.replaceAll(
      '{place}',
      trimmed.length > 0 ? trimmed : 'near me',
    )
  }
  return trimmed.length > 0 ? `${template} ${trimmed}` : `${template} near me`
}

function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function mapsEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}

export function FindNearbyMap({
  label,
  queryTemplate,
}: {
  label: string
  queryTemplate: string
}) {
  const [place, setPlace] = useState('')
  const [activeQuery, setActiveQuery] = useState(() =>
    buildMapsQuery(queryTemplate, ''),
  )

  const searchUrl = useMemo(() => mapsSearchUrl(activeQuery), [activeQuery])
  const embedUrl = useMemo(() => mapsEmbedUrl(activeQuery), [activeQuery])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setActiveQuery(buildMapsQuery(queryTemplate, place))
  }

  function useNearMe() {
    if (!navigator.geolocation) {
      setPlace('near me')
      setActiveQuery(buildMapsQuery(queryTemplate, 'near me'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(4)},${pos.coords.longitude.toFixed(4)}`
        setPlace(coords)
        setActiveQuery(buildMapsQuery(queryTemplate, coords))
      },
      () => {
        setPlace('near me')
        setActiveQuery(buildMapsQuery(queryTemplate, 'near me'))
      },
      { enableHighAccuracy: false, timeout: 8000 },
    )
  }

  return (
    <section className="rounded-[10px] border border-border bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-ink">{label}</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Search Google Maps for places nearby. Nothing is saved in this
        prototype.
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-3 flex flex-wrap items-center gap-2"
      >
        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Town, postcode, or leave blank for near me"
          className="min-w-[12rem] flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-charcoal"
        />
        <button
          type="submit"
          className="rounded-lg bg-charcoal px-3 py-2 text-sm font-medium text-white"
        >
          Search
        </button>
        <button
          type="button"
          onClick={useNearMe}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink"
        >
          Use my location
        </button>
      </form>
      <div className="mt-3 overflow-hidden rounded-lg border border-border bg-canvas">
        <iframe
          title={label}
          src={embedUrl}
          className="h-56 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={searchUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-2 hover:underline"
      >
        Open in Google Maps
        <ExternalIcon />
      </a>
    </section>
  )
}

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v6H4V4h6" />
    </svg>
  )
}
