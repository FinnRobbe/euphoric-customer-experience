import { useEffect, useRef } from 'react'
import { LimitedScopeBanner } from '../components/benefits/LimitedScopeBanner'
import { useAskPanel } from '../components/shell/AppShell'

export function ChatPrototypePage() {
  const { query, setQuery, reply, submit, applyTopic, topics } = useAskPanel()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      inputRef.current?.focus()
    }
  }, [])

  return (
    <div className="px-8 py-10 text-left">
      <h1 className="text-2xl font-bold text-ink">Chat</h1>
      <LimitedScopeBanner className="mt-4 max-w-xl">
        <strong>Prototype quick answers.</strong> This is the same Search or
        ask helper. It covers excess, adding a partner, and Virtual GP.
      </LimitedScopeBanner>

      <form
        className="mt-6 max-w-xl md:hidden"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <label htmlFor="chat-ask" className="text-sm font-medium text-ink">
          Your question
        </label>
        <input
          ref={inputRef}
          id="chat-ask"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search or ask"
          className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-charcoal"
        />
        <button
          type="submit"
          className="mt-3 rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
        >
          Ask
        </button>
      </form>

      <div className="mt-6 max-w-xl" aria-live="polite">
        {reply ? (
          <p className="rounded-lg border border-border bg-white p-4 text-sm text-ink">
            {reply}
          </p>
        ) : (
          <p className="text-sm text-ink-muted">
            Choose a topic, or type a question.
          </p>
        )}
      </div>

      <h2 className="mt-6 text-sm font-semibold text-ink">Topics</h2>
      <ul className="mt-2 max-w-xl space-y-2">
        {topics.map((item) => (
          <li key={item.q}>
            <button
              type="button"
              className="text-left text-sm text-ink underline-offset-2 hover:underline"
              onClick={() => applyTopic(item)}
            >
              {item.q}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
