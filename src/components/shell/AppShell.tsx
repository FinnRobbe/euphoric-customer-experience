import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  askTopics,
  matchAskTopic,
  replyForAskTopic,
  unknownAskReply,
  type AskCoverContext,
  type AskTopic,
} from '../../lib/askReplies'
import { usePlanState } from '../../state/PlanContext'
import { DisneyLogo } from './DisneyLogo'

/** Icon-only rail on benefit detail and deeper flex pages — more room for content. Home / Chat / Saved stay expanded. */
function shouldCollapseNav(pathname: string): boolean {
  return /^\/benefits\/[^/]+(\/|$)/.test(pathname)
}

type AskPanelApi = {
  query: string
  setQuery: (value: string) => void
  reply: string | null
  submit: () => void
  applyTopic: (topic: AskTopic) => void
  topics: readonly AskTopic[]
}

const AskPanelContext = createContext<AskPanelApi | null>(null)

export function useAskPanel(): AskPanelApi {
  const value = useContext(AskPanelContext)
  if (!value) {
    throw new Error('useAskPanel must be used within AppShell')
  }
  return value
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const {
    profile,
    plans,
    currentPlan,
    selectedPlan,
    answers,
    committedAnswers,
  } = usePlanState()
  const askCover = useMemo<AskCoverContext>(
    () => ({
      pathname: location.pathname,
      plans,
      currentPlan,
      selectedPlan,
      answers,
      committedAnswers,
    }),
    [
      location.pathname,
      plans,
      currentPlan,
      selectedPlan,
      answers,
      committedAnswers,
    ],
  )
  const askInputRef = useRef<HTMLInputElement>(null)
  const [askOpen, setAskOpen] = useState(
    () =>
      typeof window !== 'undefined' && window.location.pathname === '/chat',
  )
  const [query, setQuery] = useState('')
  const [reply, setReply] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navCollapsed, setNavCollapsed] = useState(() =>
    shouldCollapseNav(
      typeof window !== 'undefined' ? window.location.pathname : '/',
    ),
  )

  const username = profile?.name?.trim() || 'Guest'
  const initial = username.charAt(0).toUpperCase()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    setNavCollapsed(shouldCollapseNav(location.pathname))
    if (location.pathname === '/chat') {
      setAskOpen(true)
      return
    }
    setAskOpen(false)
    setReply(null)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/chat') return
    if (!window.matchMedia('(min-width: 768px)').matches) return
    askInputRef.current?.focus()
  }, [location.pathname, navCollapsed])

  function submitAsk() {
    const topic = matchAskTopic(query)
    setReply(
      topic ? replyForAskTopic(topic.id, askCover) : unknownAskReply(query),
    )
    setAskOpen(true)
  }

  function applyTopic(topic: AskTopic) {
    setQuery(topic.q)
    setReply(replyForAskTopic(topic.id, askCover))
    setAskOpen(true)
  }

  function handleAsk(e: React.FormEvent) {
    e.preventDefault()
    submitAsk()
  }

  const askApi: AskPanelApi = {
    query,
    setQuery,
    reply,
    submit: submitAsk,
    applyTopic,
    topics: askTopics,
  }

  function renderAskPanel(collapsed: boolean) {
    if (collapsed) {
      return (
        <div className="mb-4 flex flex-col items-center gap-2">
          <button
            type="button"
            title="Search or ask"
            aria-label="Search or ask"
            onClick={() => setAskOpen((o) => !o)}
            className={[
              'flex h-10 w-10 items-center justify-center rounded-lg border text-ink-muted transition hover:bg-white hover:text-ink',
              askOpen
                ? 'border-charcoal bg-white text-ink shadow-sm'
                : 'border-border bg-white/70',
            ].join(' ')}
          >
            <SearchIcon />
          </button>
          {askOpen ? (
            <div className="absolute left-full top-16 z-30 ml-2 w-[min(280px,70vw)] rounded-lg border border-border bg-white p-3 text-left text-xs shadow-lg">
              {location.pathname === '/chat' ? (
                <p className="mb-2 font-semibold text-ink">
                  Prototype quick answers
                </p>
              ) : null}
              <form onSubmit={handleAsk} className="mb-2">
                <input
                  ref={askInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  placeholder="Search or ask"
                  className="w-full rounded-lg border border-border bg-canvas py-2 px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-charcoal"
                />
              </form>
              <p className="mb-2 text-ink-muted">
                Try: excess, partner, or Virtual GP.
              </p>
              {reply && (
                <p className="mb-2 rounded-md bg-canvas p-2 text-ink">{reply}</p>
              )}
              <ul className="space-y-1">
                {askTopics.map((item) => (
                  <li key={item.q}>
                    <button
                      type="button"
                      className="text-left text-ink underline-offset-2 hover:underline"
                      onClick={() => applyTopic(item)}
                    >
                      {item.q}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )
    }

    return (
      <>
        <form onSubmit={handleAsk} className="mb-4">
          <label className="relative block">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
              <SearchIcon />
            </span>
            <input
              ref={askInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setAskOpen(true)}
              placeholder="Search or ask"
              className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-charcoal"
            />
          </label>
        </form>

        {askOpen && (
          <div className="mb-4 rounded-lg border border-border bg-white p-3 text-left text-xs shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-ink">
                {location.pathname === '/chat'
                  ? 'Prototype quick answers'
                  : 'Quick answers'}
              </span>
              <button
                type="button"
                className="text-ink-muted hover:text-ink"
                onClick={() => {
                  setAskOpen(false)
                  if (location.pathname !== '/chat') setReply(null)
                }}
              >
                ✕
              </button>
            </div>
            <p className="mb-2 text-ink-muted">
              Try: excess, partner, or Virtual GP.
            </p>
            {reply && (
              <p className="rounded-md bg-canvas p-2 text-ink">{reply}</p>
            )}
            <ul className="mt-2 space-y-1">
              {askTopics.map((item) => (
                <li key={item.q}>
                    <button
                      type="button"
                      className="text-left text-ink underline-offset-2 hover:underline"
                      onClick={() => applyTopic(item)}
                    >
                      {item.q}
                    </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  function renderSidebar(collapsed: boolean) {
    return (
      <>
        <div className={collapsed ? 'mb-4 flex justify-center' : 'mb-5 px-1'}>
          <DisneyLogo compact={collapsed} />
        </div>

        {renderAskPanel(collapsed)}

        <nav
          className={[
            'flex flex-1 flex-col gap-1',
            collapsed ? 'items-center' : '',
          ].join(' ')}
        >
          <NavLink
            to="/"
            end
            title="Home"
            className={() =>
              navClass(location.pathname === '/', collapsed)
            }
          >
            <HomeIcon />
            {!collapsed && 'Home'}
          </NavLink>
          <NavLink
            to="/chat"
            title="Chat"
            className={({ isActive }) => navClass(isActive, collapsed)}
          >
            <ChatIcon />
            {!collapsed && 'Chat'}
          </NavLink>
          <NavLink
            to="/saved"
            title="Saved"
            className={({ isActive }) => navClass(isActive, collapsed)}
          >
            <SavedIcon />
            {!collapsed && 'Saved'}
          </NavLink>
        </nav>

        <div
          className={[
            'mt-auto flex items-center rounded-lg py-2',
            collapsed ? 'justify-center px-0' : 'gap-2 px-2',
          ].join(' ')}
          title={`Signed in as ${username}`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5c518] text-sm font-semibold text-ink">
            {initial}
          </span>
          {!collapsed && (
            <span className="truncate text-sm font-medium text-ink">
              {username}
            </span>
          )}
        </div>
      </>
    )
  }

  return (
    <AskPanelContext.Provider value={askApi}>
    <div className="flex h-full min-h-0 bg-canvas">
      <aside
        className={[
          'relative hidden shrink-0 flex-col border-r border-border bg-sidebar py-5 transition-[width] duration-200 ease-out md:flex',
          navCollapsed ? 'w-16 overflow-visible px-2' : 'w-[240px] px-4',
        ].join(' ')}
      >
        <div
          className={[
            'flex min-h-0 flex-1 flex-col',
            navCollapsed ? 'overflow-visible' : '',
          ].join(' ')}
        >
          {renderSidebar(navCollapsed)}
        </div>
        <button
          type="button"
          onClick={() => setNavCollapsed((c) => !c)}
          aria-label={
            navCollapsed ? 'Expand navigation' : 'Collapse navigation'
          }
          title={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          className="absolute -right-3 top-8 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-ink-muted shadow-sm transition hover:text-ink"
        >
          <CollapseChevron collapsed={navCollapsed} />
        </button>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-50 flex h-full w-[min(280px,85vw)] flex-col bg-sidebar px-4 py-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Menu</span>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-ink-muted hover:bg-white"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>
            {renderSidebar(false)}
          </aside>
        </div>
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center gap-3 border-b border-border bg-white px-4 py-3 md:hidden">
          <button
            type="button"
            className="rounded-lg border border-border px-2.5 py-1.5 text-sm text-ink"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
          <DisneyLogo />
        </header>
        <main className="min-h-0 min-w-0 flex-1 overflow-auto bg-canvas">
          {children}
        </main>
      </div>
    </div>
    </AskPanelContext.Provider>
  )
}

function navClass(active: boolean, collapsed: boolean) {
  return [
    'flex items-center rounded-lg text-sm transition-colors',
    collapsed
      ? 'h-10 w-10 justify-center px-0'
      : 'gap-2.5 px-3 py-2',
    active
      ? [
          'relative bg-white font-medium text-ink shadow-sm',
          collapsed
            ? ''
            : 'before:absolute before:bottom-1.5 before:left-0 before:top-1.5 before:w-[3px] before:rounded-full before:bg-charcoal',
        ].join(' ')
      : 'text-ink-muted hover:bg-white/70 hover:text-ink',
  ].join(' ')
}

function CollapseChevron({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden
      className={collapsed ? '' : 'rotate-180'}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 5h16v11H8l-4 4V5Z" />
    </svg>
  )
}

function SavedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
    </svg>
  )
}
