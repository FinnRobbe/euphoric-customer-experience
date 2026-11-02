import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { isPmiBenefitId } from '../data/providerPlans'
import {
  detectCardBrand,
  formatExpiry,
  maskCardNumber,
  readStoredPaymentMethod,
  writeStoredPaymentMethod,
  type StoredPaymentMethod,
} from '../lib/billing'
import { usePlanState } from '../state/PlanContext'

export function PmiBilling() {
  const { benefitId = 'axa-pmi' } = useParams()
  const { getBenefit, loading } = usePlanState()
  const benefit = getBenefit(benefitId)

  const [method, setMethod] = useState<StoredPaymentMethod>(() =>
    readStoredPaymentMethod(),
  )
  const [editing, setEditing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expMonth, setExpMonth] = useState(method.expMonth)
  const [expYear, setExpYear] = useState(method.expYear)
  const [cvc, setCvc] = useState('')
  const [cardholderName, setCardholderName] = useState(method.cardholderName)
  const [formError, setFormError] = useState<string | null>(null)
  const [saveNotice, setSaveNotice] = useState<string | null>(null)

  if (!isPmiBenefitId(benefitId)) {
    return <Navigate to="/" replace />
  }
  if (!benefit && loading) {
    return <p className="p-8 text-ink-muted">Loading…</p>
  }

  const personalisePath = `/benefits/${benefitId}/personalise`

  function startEdit() {
    setCardNumber('')
    setExpMonth(method.expMonth)
    setExpYear(method.expYear)
    setCvc('')
    setCardholderName(method.cardholderName)
    setFormError(null)
    setSaveNotice(null)
    setEditing(true)
  }

  function saveCard() {
    setSaveNotice(null)
    const digits = cardNumber.replace(/\D/g, '')
    if (digits.length < 12 || digits.length > 19) {
      setFormError('Enter a valid card number (12–19 digits).')
      return
    }
    const month = expMonth.replace(/\D/g, '').padStart(2, '0').slice(0, 2)
    const year = expYear.replace(/\D/g, '').slice(-2)
    if (!/^(0[1-9]|1[0-2])$/.test(month) || year.length !== 2) {
      setFormError('Enter a valid expiry (MM / YY).')
      return
    }
    if (!/^\d{3,4}$/.test(cvc.replace(/\D/g, ''))) {
      setFormError('Enter a valid CVC (3–4 digits).')
      return
    }
    if (!cardholderName.trim()) {
      setFormError('Enter the name on the card.')
      return
    }
    const next: StoredPaymentMethod = {
      brand: detectCardBrand(digits),
      last4: digits.slice(-4),
      expMonth: month,
      expYear: year,
      cardholderName: cardholderName.trim(),
    }
    writeStoredPaymentMethod(next)
    setMethod(next)
    setEditing(false)
    setFormError(null)
    setCardNumber('')
    setCvc('')
    setSaveNotice('Payment method updated.')
  }

  return (
    <div className="px-8 py-6 text-left">
      <Link
        to={personalisePath}
        className="mb-3 inline-flex text-sm text-ink-muted hover:text-ink"
      >
        ‹ Back to Personalise
      </Link>
      <h1 className="text-2xl font-bold text-ink">Billing options</h1>
      <p className="mt-2 max-w-xl text-sm text-ink-muted">
        View or update the payment method used for your employee contribution.
        This is a prototype. Nothing is charged.
      </p>

      <section className="mt-6 max-w-md rounded-[10px] border border-border bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-ink">
          Current payment method
        </h2>
        {saveNotice ? (
          <p
            className="mt-2 text-sm text-emerald-800"
            role="status"
            aria-live="polite"
          >
            {saveNotice}
          </p>
        ) : null}

        {!editing ? (
          <>
            <div className="mt-4 rounded-lg border border-border bg-canvas/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                {method.brand}
              </p>
              <p className="mt-2 font-mono text-lg tracking-wide text-ink">
                {maskCardNumber(method.last4)}
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-ink-muted">Name</dt>
                  <dd className="font-medium text-ink">
                    {method.cardholderName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-muted">Expires</dt>
                  <dd className="font-medium text-ink">
                    {formatExpiry(method)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={startEdit}
                className="rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
              >
                Update card
              </button>
              <Link
                to={personalisePath}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
              >
                Back to Personalise
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-4 space-y-3">
            <label className="block text-xs text-ink-muted">
              Card number
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="•••• •••• •••• ••••"
                className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
              />
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label className="block text-xs text-ink-muted">
                Month
                <input
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value)}
                  inputMode="numeric"
                  autoComplete="cc-exp-month"
                  placeholder="MM"
                  className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
                />
              </label>
              <label className="block text-xs text-ink-muted">
                Year
                <input
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value)}
                  inputMode="numeric"
                  autoComplete="cc-exp-year"
                  placeholder="YY"
                  className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
                />
              </label>
              <label className="block text-xs text-ink-muted">
                CVC
                <input
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="•••"
                  className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
                />
              </label>
            </div>
            <label className="block text-xs text-ink-muted">
              Name on card
              <input
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                autoComplete="cc-name"
                className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
              />
            </label>
            {formError && (
              <p className="text-sm text-red-600">{formError}</p>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={saveCard}
                className="rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
              >
                Save card
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false)
                  setFormError(null)
                }}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
