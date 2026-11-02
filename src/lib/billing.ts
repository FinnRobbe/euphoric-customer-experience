export interface StoredPaymentMethod {
  brand: string
  /** Last 4 digits only — never store full PAN in this prototype beyond ephemeral form input */
  last4: string
  expMonth: string
  expYear: string
  cardholderName: string
}

const STORAGE_KEY = 'navigator-payment-method'

export const DEFAULT_PAYMENT_METHOD: StoredPaymentMethod = {
  brand: 'Visa',
  last4: '4242',
  expMonth: '12',
  expYear: '28',
  cardholderName: 'A. Employee',
}

export function maskCardNumber(last4: string): string {
  const digits = last4.replace(/\D/g, '').slice(-4).padStart(4, '0')
  return `•••• •••• •••• ${digits}`
}

export function maskedCvc(): string {
  return '•••'
}

export function formatExpiry(method: StoredPaymentMethod): string {
  return `${method.expMonth.padStart(2, '0')}/${method.expYear.slice(-2)}`
}

export function readStoredPaymentMethod(): StoredPaymentMethod {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PAYMENT_METHOD }
    const parsed = JSON.parse(raw) as Partial<StoredPaymentMethod>
    return {
      brand:
        typeof parsed.brand === 'string' && parsed.brand.trim()
          ? parsed.brand.trim()
          : DEFAULT_PAYMENT_METHOD.brand,
      last4:
        typeof parsed.last4 === 'string' && /\d{4}/.test(parsed.last4)
          ? parsed.last4.slice(-4)
          : DEFAULT_PAYMENT_METHOD.last4,
      expMonth:
        typeof parsed.expMonth === 'string' && parsed.expMonth.trim()
          ? parsed.expMonth.trim().padStart(2, '0').slice(0, 2)
          : DEFAULT_PAYMENT_METHOD.expMonth,
      expYear:
        typeof parsed.expYear === 'string' && parsed.expYear.trim()
          ? parsed.expYear.trim().slice(-2)
          : DEFAULT_PAYMENT_METHOD.expYear,
      cardholderName:
        typeof parsed.cardholderName === 'string' && parsed.cardholderName.trim()
          ? parsed.cardholderName.trim()
          : DEFAULT_PAYMENT_METHOD.cardholderName,
    }
  } catch {
    return { ...DEFAULT_PAYMENT_METHOD }
  }
}

export function writeStoredPaymentMethod(method: StoredPaymentMethod): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(method))
  } catch {
    /* ignore */
  }
}

/** Digits-only card number → brand guess for the prototype */
export function detectCardBrand(numberDigits: string): string {
  const n = numberDigits.replace(/\D/g, '')
  if (n.startsWith('4')) return 'Visa'
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'Mastercard'
  if (/^3[47]/.test(n)) return 'Amex'
  return 'Card'
}
