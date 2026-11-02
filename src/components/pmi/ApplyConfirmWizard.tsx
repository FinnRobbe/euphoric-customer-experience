import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  formatExpiry,
  maskCardNumber,
  maskedCvc,
  type StoredPaymentMethod,
} from '../../lib/billing'
import type { CoverFieldChange } from '../../lib/coverFieldChanges'
import { TIER_LABELS, TIER_ORDER } from '../../lib/tierLabels'
import type {
  DependantDetails,
  DependantRemovalReasonCode,
  PersonaliseAnswers,
  Plan,
  PlanTier,
} from '../../types'

const REMOVAL_REASONS: {
  code: DependantRemovalReasonCode
  label: string
}[] = [
  {
    code: 'no_longer_eligible',
    label: 'No longer eligible / left household',
  },
  { code: 'covered_elsewhere', label: 'Covered on another policy' },
  { code: 'cost', label: 'Cost / affordability' },
  { code: 'other', label: 'Other' },
]

type ConfirmStep = 'lost-access' | 'review' | 'dependants' | 'payment'

type NamedFeature = {
  featureId: string
  featureName: string
}

type GainedFeature = NamedFeature & {
  via: 'included' | 'add-on'
}

export type ApplyUpgradeSuggestion = {
  tier: PlanTier
  plan: Plan
  candidateCost: number
  includedExtraIds: string[]
}

type RemovalReasonDraft = {
  code: DependantRemovalReasonCode | null
  other: string
}

export type ApplyConfirmWizardProps = {
  open: boolean
  benefitId: string
  switchingProvider: boolean
  committedPlan: Plan | null
  draftPlan: Plan
  committedAnswers: PersonaliseAnswers
  draftAnswers: PersonaliseAnswers
  coverFieldChanges: CoverFieldChange[]
  featureGained: GainedFeature[]
  featureLost: NamedFeature[]
  initialLostFeatures: NamedFeature[]
  liveLostFeatures: NamedFeature[]
  draftEmployeePays: number
  draftTotal: number
  currentEmployeePays: number
  costDelta: number
  paymentMethod: StoredPaymentMethod
  providerPlans: Plan[]
  selectedExtras: string[]
  activePartner: DependantDetails | null
  activeChildren: DependantDetails[]
  activeDependants: DependantDetails[]
  pendingChildRemovalIds: string[]
  newDependantForms: DependantDetails[]
  applyRemovalReasons: Record<string, RemovalReasonDraft>
  onUpdateDependantForm: (
    index: number,
    patch: Partial<DependantDetails>,
  ) => void
  onUpdateRemovalReason: (
    id: string,
    patch: Partial<RemovalReasonDraft>,
  ) => void
  upgradeSuggestion: ApplyUpgradeSuggestion | null
  onApplyUpgradeSuggestion?: () => void
  onKeepFeatureAsAddon?: (featureId: string) => void
  onRemoveFeatureAddon?: (featureId: string) => void
  onClose: () => void
  onConfirmPayment: () => void
  keepEditingLabel?: string
}

function todayIsoDate(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function isFutureDateOfBirth(iso: string, today = todayIsoDate()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false
  return iso > today
}

function isBlankField(value: string): boolean {
  return value.trim().length === 0
}

function isValidDateOfBirth(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso.trim())) return false
  const [y, m, d] = iso.trim().split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return (
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  )
}

/** Returns an error message if any required dependant field is blank/invalid. */
function dependantDetailsError(d: DependantDetails): string | null {
  if (
    isBlankField(d.firstName) ||
    isBlankField(d.lastName) ||
    isBlankField(d.nationalInsurance) ||
    isBlankField(d.dateOfBirth)
  ) {
    return 'Fill in first name, last name, National Insurance number, and date of birth for each new dependant.'
  }
  if (!isValidDateOfBirth(d.dateOfBirth)) {
    return 'Enter a valid date of birth for each new dependant.'
  }
  if (isFutureDateOfBirth(d.dateOfBirth.trim())) {
    return 'Date of birth cannot be in the future.'
  }
  return null
}

function trimDependantDetails(d: DependantDetails): DependantDetails {
  return {
    ...d,
    firstName: d.firstName.trim(),
    lastName: d.lastName.trim(),
    nationalInsurance: d.nationalInsurance.trim(),
    dateOfBirth: d.dateOfBirth.trim(),
  }
}

function dependantDisplayName(d: DependantDetails): string {
  const full = `${d.firstName} ${d.lastName}`.trim()
  return full || (d.relationship === 'partner' ? 'Partner' : 'Child')
}

function describeFeatureAvailability(
  plans: Plan[],
  featureId: string,
  targetPlan: Plan,
):
  | { kind: 'add-on'; costGbp: number }
  | { kind: 'tier-only'; tierLabels: string[] } {
  const onTarget = targetPlan.features.find((f) => f.featureId === featureId)
  if (onTarget?.optionalExtra) {
    return { kind: 'add-on', costGbp: onTarget.extraMonthlyCostGbp }
  }
  const tierLabels: string[] = []
  for (const tier of TIER_ORDER) {
    const plan = plans.find((p) => p.tier === tier)
    if (!plan) continue
    const f = plan.features.find((x) => x.featureId === featureId)
    if (f && (f.included || f.optionalExtra)) {
      tierLabels.push(TIER_LABELS[tier])
    }
  }
  return { kind: 'tier-only', tierLabels }
}

function formatOnlyAvailableOn(tierLabels: string[]): string {
  if (tierLabels.length === 0) return 'Not available on this cover'
  if (tierLabels.length === 1) return `Only available on ${tierLabels[0]}`
  if (tierLabels.length === 2) {
    return `Only available on ${tierLabels[0]} and ${tierLabels[1]}`
  }
  return `Only available on ${tierLabels.slice(0, -1).join(', ')}, and ${tierLabels[tierLabels.length - 1]}`
}

function pendingDependantRemovalIds(
  draftAnswers: PersonaliseAnswers,
  activePartner: DependantDetails | null,
  pendingChildRemovalIds: string[],
): string[] {
  const partnerRemovalId =
    !draftAnswers.includePartner && activePartner ? activePartner.id : null
  return [
    ...pendingChildRemovalIds,
    ...(partnerRemovalId ? [partnerRemovalId] : []),
  ]
}

export function ApplyConfirmWizard({
  open,
  benefitId,
  switchingProvider,
  committedPlan,
  draftPlan,
  committedAnswers,
  draftAnswers,
  coverFieldChanges,
  featureGained,
  featureLost,
  initialLostFeatures,
  liveLostFeatures,
  draftEmployeePays,
  draftTotal,
  currentEmployeePays,
  costDelta,
  paymentMethod,
  providerPlans,
  selectedExtras,
  activePartner,
  activeChildren,
  activeDependants,
  pendingChildRemovalIds,
  newDependantForms,
  applyRemovalReasons,
  onUpdateDependantForm,
  onUpdateRemovalReason,
  upgradeSuggestion,
  onApplyUpgradeSuggestion,
  onKeepFeatureAsAddon,
  onRemoveFeatureAddon,
  onClose,
  onConfirmPayment,
  keepEditingLabel = 'Keep editing',
}: ApplyConfirmWizardProps) {
  const [confirmStep, setConfirmStep] = useState<ConfirmStep>('review')
  const [legalAccepted, setLegalAccepted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [addonsReviewExpanded, setAddonsReviewExpanded] = useState(false)
  /** Frozen while Apply lost-access is open so “Keep as add-on” doesn’t remove the row. */
  const [lostDialogSessionFeatures, setLostDialogSessionFeatures] = useState<
    NamedFeature[]
  >([])
  /** False until the open-reset effect has copied the entry step, so the first paint is not the previous step. */
  const [stepReady, setStepReady] = useState(false)
  const initialLostFeaturesRef = useRef(initialLostFeatures)
  initialLostFeaturesRef.current = initialLostFeatures

  useEffect(() => {
    if (!open) {
      setStepReady(false)
      return
    }
    const features = initialLostFeaturesRef.current.map((feature) => ({
      ...feature,
    }))
    setConfirmStep(features.length > 0 ? 'lost-access' : 'review')
    setLegalAccepted(false)
    setFormError(null)
    setAddonsReviewExpanded(false)
    setLostDialogSessionFeatures(features)
    setStepReady(true)
  }, [open])

  const removalIds = pendingDependantRemovalIds(
    draftAnswers,
    activePartner,
    pendingChildRemovalIds,
  )
  const needsDependantsStep =
    removalIds.length > 0 || newDependantForms.length > 0

  function handleApplyUpgrade() {
    onClose()
    onApplyUpgradeSuggestion?.()
  }

  function updateDependantForm(
    index: number,
    patch: Partial<DependantDetails>,
  ) {
    setFormError(null)
    onUpdateDependantForm(index, patch)
  }

  function continueFromLostAccess() {
    setLostDialogSessionFeatures([])
    setConfirmStep('review')
    setFormError(null)
  }

  function continueFromReview() {
    setFormError(null)
    if (needsDependantsStep) {
      setConfirmStep('dependants')
      return
    }
    setLegalAccepted(false)
    setConfirmStep('payment')
  }

  function continueFromDependants() {
    for (const d of newDependantForms) {
      const detailsError = dependantDetailsError(d)
      if (detailsError) {
        setFormError(detailsError)
        return
      }
    }
    for (const id of removalIds) {
      const reason = applyRemovalReasons[id]
      if (!reason?.code) {
        setFormError(
          'Select a removal reason for each dependant leaving cover.',
        )
        return
      }
      if (reason.code === 'other' && !reason.other.trim()) {
        setFormError('Please describe the reason for each “Other” removal.')
        return
      }
    }
    newDependantForms.forEach((d, index) => {
      const trimmed = trimDependantDetails(d)
      if (
        trimmed.firstName !== d.firstName ||
        trimmed.lastName !== d.lastName ||
        trimmed.nationalInsurance !== d.nationalInsurance ||
        trimmed.dateOfBirth !== d.dateOfBirth
      ) {
        onUpdateDependantForm(index, {
          firstName: trimmed.firstName,
          lastName: trimmed.lastName,
          nationalInsurance: trimmed.nationalInsurance,
          dateOfBirth: trimmed.dateOfBirth,
        })
      }
    })
    setFormError(null)
    setLegalAccepted(false)
    setConfirmStep('payment')
  }

  function confirmPayment() {
    if (!legalAccepted) {
      setFormError(
        'Please confirm you have read and accept the terms before continuing.',
      )
      return
    }
    for (const d of newDependantForms.map(trimDependantDetails)) {
      const detailsError = dependantDetailsError(d)
      if (detailsError) {
        setFormError(detailsError)
        setConfirmStep('dependants')
        return
      }
    }
    for (const id of removalIds) {
      const reason = applyRemovalReasons[id]
      if (!reason?.code) {
        setFormError(
          'Select a removal reason for each dependant leaving cover.',
        )
        setConfirmStep('dependants')
        return
      }
      if (reason.code === 'other' && !reason.other.trim()) {
        setFormError('Please describe the reason for each “Other” removal.')
        setConfirmStep('dependants')
        return
      }
    }
    onConfirmPayment()
  }

  function renderLostFeatureRows() {
    const features = [...lostDialogSessionFeatures].sort((a, b) => {
      const aAddon =
        describeFeatureAvailability(providerPlans, a.featureId, draftPlan)
          .kind === 'add-on'
      const bAddon =
        describeFeatureAvailability(providerPlans, b.featureId, draftPlan)
          .kind === 'add-on'
      if (aAddon === bAddon) return a.featureName.localeCompare(b.featureName)
      return aAddon ? -1 : 1
    })
    if (features.length === 0) {
      return (
        <p className="mt-4 text-sm text-ink-muted">
          No remaining features to lose. You’ve kept access via add-ons where
          available.
        </p>
      )
    }
    return (
      <ul className="mt-4 space-y-3">
        {features.map((f) => {
          const availability = describeFeatureAvailability(
            providerPlans,
            f.featureId,
            draftPlan,
          )
          const keptAsAddon =
            availability.kind === 'add-on' &&
            selectedExtras.includes(f.featureId)
          return (
            <li
              key={f.featureId}
              className={[
                'rounded-lg border px-3 py-2.5',
                keptAsAddon
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-border bg-white',
              ].join(' ')}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <Link
                  to={`/benefits/${benefitId}/personalise/feature/${f.featureId}`}
                  className="text-sm font-semibold text-ink underline-offset-2 hover:underline"
                >
                  {f.featureName}
                </Link>
                {keptAsAddon ? (
                  <span className="text-[11px] font-medium uppercase tracking-wide text-emerald-800/80">
                    Added
                  </span>
                ) : null}
              </div>
              {availability.kind === 'add-on' ? (
                keptAsAddon ? (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <p className="text-xs font-medium text-emerald-900/80">
                      Kept as paid add-on · £{availability.costGbp}/mo
                    </p>
                    <button
                      type="button"
                      onClick={() => onRemoveFeatureAddon?.(f.featureId)}
                      className="text-xs font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline"
                    >
                      Undo
                    </button>
                  </div>
                ) : (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => onKeepFeatureAsAddon?.(f.featureId)}
                      className="rounded-lg border border-border bg-canvas/60 px-3 py-1.5 text-xs font-medium text-ink hover:bg-canvas"
                    >
                      Keep as paid add-on · £{availability.costGbp}/mo
                    </button>
                  </div>
                )
              ) : (
                <p className="mt-1.5 text-xs text-ink-muted">
                  {formatOnlyAvailableOn(availability.tierLabels)}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  if (!open || !stepReady) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-changes-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[10px] border border-border bg-white p-5 text-left shadow-lg">
        {confirmStep === 'lost-access' ? (
          <>
            <h2
              id="apply-changes-title"
              className="text-lg font-semibold text-ink"
            >
              Features you’ll lose access to
            </h2>
            {upgradeSuggestion ? (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3">
                <p className="text-sm font-semibold text-amber-950">
                  A higher cover may cost less
                </p>
                <p className="mt-1 text-xs leading-relaxed text-amber-950/80">
                  {upgradeSuggestion.plan.planName ||
                    TIER_LABELS[upgradeSuggestion.tier]}{' '}
                  bundles {upgradeSuggestion.includedExtraIds.length} of your
                  selected add-on
                  {upgradeSuggestion.includedExtraIds.length === 1
                    ? ''
                    : 's'}{' '}
                  for about £{upgradeSuggestion.candidateCost}/mo (−£
                  {draftEmployeePays - upgradeSuggestion.candidateCost} vs
                  this draft).
                </p>
                <button
                  type="button"
                  onClick={handleApplyUpgrade}
                  className="mt-3 rounded-lg bg-charcoal px-3 py-1.5 text-xs font-medium text-white"
                >
                  Switch to{' '}
                  {upgradeSuggestion.plan.planName ||
                    TIER_LABELS[upgradeSuggestion.tier]}
                </button>
              </div>
            ) : null}
            {renderLostFeatureRows()}
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={continueFromLostAccess}
                className="rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
              >
                Cancel
              </button>
            </div>
          </>
        ) : confirmStep === 'review' ? (
          <>
            <h2
              id="apply-changes-title"
              className="text-lg font-semibold text-ink"
            >
              {switchingProvider
                ? 'Confirm insurer switch'
                : 'Confirm plan changes'}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              {switchingProvider && committedPlan
                ? `You’re leaving ${committedPlan.provider} for ${draftPlan.provider}. Next you’ll confirm payment.`
                : 'Next you’ll confirm the payment method.'}
            </p>

            {coverFieldChanges.length > 0 ? (
              <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[320px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-canvas/60 text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                      <th className="px-3 py-2 font-semibold">Change</th>
                      <th className="px-3 py-2 font-semibold">Current</th>
                      <th className="px-3 py-2 font-semibold">After</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink">
                    {coverFieldChanges.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-border/70 last:border-b-0"
                      >
                        <td className="px-3 py-2.5 text-ink-muted">
                          {row.label}
                        </td>
                        <td className="px-3 py-2.5 text-ink-muted">
                          {row.before}
                        </td>
                        <td className="px-3 py-2.5 font-medium">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            <ul className="mt-4 space-y-1.5 text-sm text-ink">
              {draftAnswers.includePartner !==
                committedAnswers.includePartner && (
                <li>
                  {(() => {
                    const adding = draftAnswers.includePartner
                    const partner =
                      activePartner ??
                      newDependantForms.find(
                        (d) => d.relationship === 'partner',
                      ) ??
                      null
                    const name = partner ? dependantDisplayName(partner) : ''
                    return (
                      <>
                        {adding ? 'Add partner' : 'Remove partner'}
                        {name ? (
                          <>
                            {' '}
                            <strong>{name}</strong>
                          </>
                        ) : null}
                      </>
                    )
                  })()}
                </li>
              )}
              {pendingChildRemovalIds.map((id) => {
                const child = activeChildren.find((c) => c.id === id)
                const name = child ? dependantDisplayName(child) : 'Child'
                return (
                  <li key={id}>
                    Remove child <strong>{name}</strong>
                  </li>
                )
              })}
              {pendingChildRemovalIds.length > 0 &&
                (() => {
                  const netAdds = Math.max(
                    0,
                    draftAnswers.childrenCount -
                      (activeChildren.length - pendingChildRemovalIds.length),
                  )
                  if (netAdds === 0) return null
                  return (
                    <li>
                      Add{' '}
                      <strong>
                        {netAdds} child{netAdds === 1 ? '' : 'ren'}
                      </strong>{' '}
                      (details below)
                    </li>
                  )
                })()}
              {draftAnswers.childrenCount !== committedAnswers.childrenCount &&
                pendingChildRemovalIds.length === 0 && (
                  <li>
                    Children: {committedAnswers.childrenCount} →{' '}
                    <strong>{draftAnswers.childrenCount}</strong>
                  </li>
                )}
              {(featureGained.length > 0 || featureLost.length > 0) && (
                <li>
                  <button
                    type="button"
                    onClick={() => setAddonsReviewExpanded((expanded) => !expanded)}
                    className="flex w-full items-start justify-between gap-2 text-left text-sm text-ink"
                    aria-expanded={addonsReviewExpanded}
                  >
                    <span>
                      {featureGained.length > 0 && featureLost.length > 0
                        ? `Benefits changing · gaining ${featureGained.length}, losing ${featureLost.length}`
                        : featureGained.length > 0
                          ? `New benefits · gaining ${featureGained.length}`
                          : `Benefits changing · losing ${featureLost.length}`}
                      <span className="ml-1.5 text-ink-muted">
                        {addonsReviewExpanded ? 'Hide list' : 'View list'}
                      </span>
                    </span>
                    <span
                      className="mt-0.5 shrink-0 text-ink-muted"
                      aria-hidden
                    >
                      {addonsReviewExpanded ? '▴' : '▾'}
                    </span>
                  </button>
                  {addonsReviewExpanded ? (
                    <div className="mt-2 space-y-2.5 rounded-lg border border-border bg-canvas/50 px-3 py-2.5 text-xs leading-snug">
                      {featureGained.length > 0 ? (
                        <div>
                          <p className="font-semibold text-ink">
                            You’ll gain access to
                          </p>
                          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-ink-muted">
                            {featureGained.map((f) => (
                              <li key={f.featureId}>
                                <Link
                                  to={`/benefits/${benefitId}/personalise/feature/${f.featureId}`}
                                  className="font-medium text-ink underline-offset-2 hover:underline"
                                >
                                  {f.featureName}
                                </Link>
                                <span className="text-ink-muted">
                                  {' '}
                                  ·{' '}
                                  {f.via === 'included'
                                    ? 'now included'
                                    : 'paid add-on'}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {featureLost.length > 0 ? (
                        <div>
                          <p className="font-semibold text-ink">
                            You’ll no longer have
                          </p>
                          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-ink-muted">
                            {featureLost.map((f) => (
                              <li key={f.featureId}>
                                <Link
                                  to={`/benefits/${benefitId}/personalise/feature/${f.featureId}`}
                                  className="font-medium text-ink underline-offset-2 hover:underline"
                                >
                                  {f.featureName}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              )}
            </ul>

            {upgradeSuggestion ? (
              <div
                className={[
                  'mt-4 rounded-lg px-3.5 py-3',
                  costDelta > 0
                    ? 'border-2 border-amber-500 bg-amber-100'
                    : 'border border-amber-200 bg-amber-50',
                ].join(' ')}
                role="status"
              >
                <p className="text-sm font-semibold text-amber-950">
                  {costDelta > 0
                    ? 'You’re paying more for a weaker cover'
                    : 'A higher cover may cost less'}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-amber-950/90">
                  {costDelta > 0
                    ? `Your draft costs £${draftEmployeePays}/mo (+£${costDelta} vs current) while reducing cover. `
                    : null}
                  {upgradeSuggestion.plan.planName ||
                    TIER_LABELS[upgradeSuggestion.tier]}{' '}
                  includes {upgradeSuggestion.includedExtraIds.length} of your
                  selected add-on
                  {upgradeSuggestion.includedExtraIds.length === 1
                    ? ''
                    : 's'}{' '}
                  and would be about £{upgradeSuggestion.candidateCost}/mo (−£
                  {draftEmployeePays - upgradeSuggestion.candidateCost} vs this
                  draft).
                </p>
                <button
                  type="button"
                  onClick={handleApplyUpgrade}
                  className="mt-3 rounded-lg bg-charcoal px-3 py-2 text-xs font-medium text-white"
                >
                  Switch to{' '}
                  {upgradeSuggestion.plan.planName ||
                    TIER_LABELS[upgradeSuggestion.tier]}
                </button>
              </div>
            ) : null}

            <div
              className={[
                'mt-4 rounded-lg border px-3.5 py-3',
                costDelta < 0
                  ? 'border-emerald-200 bg-emerald-50'
                  : costDelta > 0
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-border bg-canvas/60',
              ].join(' ')}
            >
              <p
                className={[
                  'text-[11px] font-medium uppercase tracking-wide',
                  costDelta < 0
                    ? 'text-emerald-800/80'
                    : costDelta > 0
                      ? 'text-amber-900/70'
                      : 'text-ink-muted',
                ].join(' ')}
              >
                New price
              </p>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                {costDelta !== 0 ? (
                  <span
                    className={[
                      'text-lg font-semibold tabular-nums line-through',
                      costDelta < 0
                        ? 'text-emerald-900/40 decoration-emerald-900/35'
                        : 'text-amber-950/35 decoration-amber-950/30',
                    ].join(' ')}
                    aria-label={`Current cost £${currentEmployeePays}`}
                  >
                    £{currentEmployeePays}
                  </span>
                ) : null}
                <span
                  className={[
                    'text-3xl font-bold leading-none tabular-nums',
                    costDelta < 0
                      ? 'text-emerald-700'
                      : costDelta > 0
                        ? 'text-amber-950'
                        : 'text-ink',
                  ].join(' ')}
                >
                  £{draftTotal}
                </span>
                <span
                  className={[
                    'text-xs font-medium',
                    costDelta < 0
                      ? 'text-emerald-900/70'
                      : costDelta > 0
                        ? 'text-amber-950/70'
                        : 'text-ink-muted',
                  ].join(' ')}
                >
                  /mo
                </span>
                {costDelta !== 0 ? (
                  <span
                    className={[
                      'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums',
                      costDelta < 0
                        ? 'bg-emerald-700/10 text-emerald-800'
                        : 'bg-amber-900/10 text-amber-950',
                    ].join(' ')}
                  >
                    {costDelta > 0 ? '+' : '−'}£{Math.abs(costDelta)}/mo
                  </span>
                ) : (
                  <span className="text-xs font-medium text-ink-muted">
                    Same as current
                  </span>
                )}
              </div>
            </div>

            {formError && (
              <p className="mt-3 text-sm text-red-600">{formError}</p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={continueFromReview}
                className="rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
              >
                {needsDependantsStep ? 'Continue' : 'Continue to payment'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (liveLostFeatures.length > 0) {
                    // Refresh from current losses so kept add-ons stay off the list.
                    setLostDialogSessionFeatures(
                      liveLostFeatures.map((feature) => ({ ...feature })),
                    )
                    setConfirmStep('lost-access')
                    setFormError(null)
                    return
                  }
                  onClose()
                }}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
              >
                {liveLostFeatures.length > 0 ? 'Back' : keepEditingLabel}
              </button>
            </div>
          </>
        ) : confirmStep === 'dependants' ? (
          <>
            <h2
              id="apply-changes-title"
              className="text-lg font-semibold text-ink"
            >
              {removalIds.length > 0 && newDependantForms.length > 0
                ? 'Update dependants'
                : removalIds.length > 0
                  ? 'Dependant leaving cover'
                  : 'Add dependant details'}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              {removalIds.length > 0
                ? 'Say why each dependant is leaving cover. Payment is next.'
                : 'You’re adding dependants. All fields are required to continue.'}
            </p>

            {removalIds.length > 0 && (
              <div className="mt-5 space-y-4">
                {removalIds.map((id) => {
                  const dependant =
                    activeDependants.find((d) => d.id === id) ?? null
                  const reason = applyRemovalReasons[id] ?? {
                    code: null,
                    other: '',
                  }
                  return (
                    <fieldset
                      key={id}
                      className="space-y-2 rounded-lg border border-border p-3"
                    >
                      <legend className="px-1 text-sm font-semibold text-ink">
                        {dependant
                          ? dependantDisplayName(dependant)
                          : 'Dependant'}
                        {dependant ? (
                          <span className="font-normal text-ink-muted">
                            {' '}
                            ·{' '}
                            {dependant.relationship === 'partner'
                              ? 'Partner'
                              : 'Child'}
                          </span>
                        ) : null}
                      </legend>
                      {REMOVAL_REASONS.map((option) => (
                        <label
                          key={option.code}
                          className="flex cursor-pointer items-start gap-2 text-sm text-ink"
                        >
                          <input
                            type="radio"
                            name={`apply-remove-reason-${id}`}
                            className="mt-1"
                            checked={reason.code === option.code}
                            onChange={() =>
                              onUpdateRemovalReason(id, {
                                code: option.code,
                              })
                            }
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                      {reason.code === 'other' && (
                        <label className="mt-2 block text-xs text-ink-muted">
                          Please describe
                          <textarea
                            value={reason.other}
                            onChange={(e) =>
                              onUpdateRemovalReason(id, {
                                other: e.target.value,
                              })
                            }
                            rows={3}
                            className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
                          />
                        </label>
                      )}
                    </fieldset>
                  )
                })}
              </div>
            )}

            {newDependantForms.length > 0 && (
              <div
                className={[
                  'space-y-4',
                  removalIds.length > 0
                    ? 'mt-5 border-t border-border pt-4'
                    : 'mt-5',
                ].join(' ')}
              >
                {removalIds.length > 0 ? (
                  <p className="text-sm text-ink-muted">
                    You’re also adding dependants. All fields are required to
                    continue.
                  </p>
                ) : null}
                {newDependantForms.map((d, index) => (
                  <fieldset
                    key={`${d.relationship}-${index}`}
                    className="space-y-2 rounded-lg border border-border p-3"
                  >
                    <legend className="px-1 text-sm font-semibold text-ink">
                      {d.relationship === 'partner'
                        ? 'Partner'
                        : `Child ${
                            newDependantForms
                              .slice(0, index + 1)
                              .filter((x) => x.relationship === 'child').length
                          }`}
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <label className="block text-xs text-ink-muted">
                        First name{' '}
                        <span className="text-red-600" aria-hidden="true">
                          *
                        </span>
                        <input
                          value={d.firstName}
                          onChange={(e) =>
                            updateDependantForm(index, {
                              firstName: e.target.value,
                            })
                          }
                          required
                          aria-required="true"
                          autoComplete="given-name"
                          className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
                        />
                      </label>
                      <label className="block text-xs text-ink-muted">
                        Last name{' '}
                        <span className="text-red-600" aria-hidden="true">
                          *
                        </span>
                        <input
                          value={d.lastName}
                          onChange={(e) =>
                            updateDependantForm(index, {
                              lastName: e.target.value,
                            })
                          }
                          required
                          aria-required="true"
                          autoComplete="family-name"
                          className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
                        />
                      </label>
                      <label className="block text-xs text-ink-muted sm:col-span-2">
                        National Insurance number{' '}
                        <span className="text-red-600" aria-hidden="true">
                          *
                        </span>
                        <input
                          value={d.nationalInsurance}
                          onChange={(e) =>
                            updateDependantForm(index, {
                              nationalInsurance: e.target.value,
                            })
                          }
                          required
                          aria-required="true"
                          className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
                          autoComplete="off"
                        />
                      </label>
                      <label className="block text-xs text-ink-muted sm:col-span-2">
                        Date of birth{' '}
                        <span className="text-red-600" aria-hidden="true">
                          *
                        </span>
                        <input
                          type="date"
                          value={d.dateOfBirth}
                          max={todayIsoDate()}
                          onChange={(e) =>
                            updateDependantForm(index, {
                              dateOfBirth: e.target.value,
                            })
                          }
                          required
                          aria-required="true"
                          className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm text-ink"
                        />
                      </label>
                    </div>
                  </fieldset>
                ))}
              </div>
            )}

            {formError && (
              <p className="mt-3 text-sm text-red-600">{formError}</p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={continueFromDependants}
                className="rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
              >
                Continue to payment
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmStep('review')
                  setFormError(null)
                }}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
              >
                Back
              </button>
            </div>
          </>
        ) : (
          <>
            <h2
              id="apply-changes-title"
              className="text-lg font-semibold text-ink"
            >
              Confirm payment method
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              We’ll keep charging your saved payment method for this cover
              change.
            </p>

            <div className="mt-4 rounded-lg border border-border bg-canvas/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                {paymentMethod.brand}
              </p>
              <p className="mt-2 font-mono text-base tracking-wide text-ink">
                {maskCardNumber(paymentMethod.last4)}
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-ink-muted">Name</dt>
                  <dd className="font-medium text-ink">
                    {paymentMethod.cardholderName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-muted">Expires</dt>
                  <dd className="font-medium text-ink">
                    {formatExpiry(paymentMethod)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-muted">CVC</dt>
                  <dd className="font-mono font-medium text-ink">
                    {maskedCvc()}
                  </dd>
                </div>
              </dl>
              <Link
                to={`/benefits/${benefitId}/billing`}
                className="mt-3 inline-block text-xs font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline"
              >
                Change billing options
              </Link>
            </div>

            <div className="mt-4 space-y-2 rounded-lg border border-border p-3 text-xs leading-relaxed text-ink-muted">
              <p className="font-semibold text-ink">Before you confirm</p>
              <ul className="list-disc space-y-1.5 pl-4">
                <li>
                  You authorise us to charge this saved payment method for your
                  new monthly employee contribution and any agreed dependant or
                  add-on costs.
                </li>
                <li>
                  Cover changes take effect under your employer’s scheme rules,
                  including when you can change again.
                </li>
                <li>
                  Prices shown here are illustrative for this prototype and do
                  not constitute a regulated insurance sale.
                </li>
                <li>
                  By continuing you confirm the details you entered are
                  accurate and that you have authority to update this cover.
                </li>
              </ul>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2 text-sm text-ink">
              <input
                type="checkbox"
                className="mt-1"
                checked={legalAccepted}
                onChange={(e) => setLegalAccepted(e.target.checked)}
              />
              <span>
                I have read and accept{' '}
                <a
                  href="/terms.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline underline-offset-2 hover:text-charcoal"
                  onClick={(e) => e.stopPropagation()}
                >
                  these terms
                </a>
                , and confirm we should keep using this payment method.
              </span>
            </label>

            {formError && (
              <p className="mt-3 text-sm text-red-600">{formError}</p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={confirmPayment}
                className="rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white"
              >
                Confirm and update cover
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmStep(needsDependantsStep ? 'dependants' : 'review')
                  setFormError(null)
                }}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
