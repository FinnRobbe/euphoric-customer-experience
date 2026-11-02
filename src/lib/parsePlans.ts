import Papa from 'papaparse'
import type {
  CurrentPmiPlan,
  Plan,
  PlanFeature,
  PlanTier,
  PmiBenefitSummary,
} from '../types'

const PMI_CSV = '/data/pmi-plans.csv'

/** Fallback dependant costs when CSV omits plan-level fields. */
export const PARTNER_COST_GBP = 18
export const CHILD_COST_GBP = 12

function yes(value: string | undefined): boolean {
  return (value ?? '').trim().toLowerCase() === 'yes'
}

function num(value: string | undefined, fallback = 0): number {
  const n = Number((value ?? '').trim())
  return Number.isFinite(n) ? n : fallback
}

function mapFeature(row: Record<string, string>): PlanFeature {
  return {
    featureId: row.feature_id?.trim() ?? '',
    featureName: row.feature_name?.trim() ?? '',
    category: row.category?.trim() ?? '',
    description: row.description?.trim() ?? '',
    included: yes(row.included),
    accessNotes: row.access_notes?.trim() ?? '',
    minAge: num(row.min_age, 0),
    maxAge: num(row.max_age, 99),
    suitableGenders: row.suitable_genders?.trim() || 'any',
    requiresDependant: yes(row.requires_dependant),
    relevancyTags: (row.relevancy_tags ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    optionalExtra: yes(row.optional_extra),
    extraMonthlyCostGbp: num(row.extra_monthly_cost_gbp, 0),
  }
}

function mapPlan(
  rows: Record<string, string>[],
  benefitId: string,
): Plan | null {
  if (!rows.length) return null
  const first = rows[0]
  const tier = (first.tier?.trim().toLowerCase() || 'essential') as PlanTier
  return {
    planId: first.plan_id?.trim() ?? '',
    planName: first.plan_name?.trim() ?? '',
    provider: first.provider?.trim() ?? '',
    benefitId,
    tier,
    monthlyEmployeeCostGbp: num(first.monthly_employee_cost_gbp),
    employerContributionGbp: num(first.employer_contribution_gbp),
    excessGbp: num(first.excess_gbp),
    outpatientCover: first.outpatient_cover?.trim() ?? '',
    hospitalList: first.hospital_list?.trim() ?? '',
    dependantsAllowed: yes(first.dependants_allowed),
    maxDependants: num(first.max_dependants, 0),
    partnerMonthlyCostGbp: num(first.partner_monthly_cost_gbp, PARTNER_COST_GBP),
    childMonthlyCostGbp: num(first.child_monthly_cost_gbp, CHILD_COST_GBP),
    summary: first.summary?.trim() ?? '',
    features: rows.map(mapFeature).filter((f) => f.featureId),
  }
}

async function loadCsv(path: string): Promise<Record<string, string>[]> {
  const res = await fetch(path)
  if (!res.ok) {
    throw new Error("We couldn't load your plan data. Try refreshing.")
  }
  const text = await res.text()
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  })
  return parsed.data
}

export interface PmiCatalog {
  plans: Plan[]
  pmiBenefits: PmiBenefitSummary[]
  currentPlan: CurrentPmiPlan
}

export async function loadPmiCatalog(): Promise<PmiCatalog> {
  const rows = await loadCsv(PMI_CSV)

  const byPlan = new Map<string, Record<string, string>[]>()
  for (const row of rows) {
    const planId = row.plan_id?.trim()
    if (!planId) continue
    const list = byPlan.get(planId) ?? []
    list.push(row)
    byPlan.set(planId, list)
  }

  const plans: Plan[] = []
  for (const planRows of byPlan.values()) {
    const benefitId = planRows[0].benefit_id?.trim() ?? ''
    const plan = mapPlan(planRows, benefitId)
    if (plan) plans.push(plan)
  }

  // Stable order: AXA → Bupa → Vitality, essential → plus → premier
  const benefitOrder = ['axa-pmi', 'bupa-pmi', 'vitality-pmi']
  const tierOrder: PlanTier[] = ['essential', 'plus', 'premier']
  plans.sort((a, b) => {
    const bi = benefitOrder.indexOf(a.benefitId) - benefitOrder.indexOf(b.benefitId)
    if (bi !== 0) return bi
    return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier)
  })

  let currentPlan: CurrentPmiPlan = {
    benefitId: 'axa-pmi',
    planId: 'axa-plus',
    tier: 'plus',
  }
  for (const planRows of byPlan.values()) {
    if (yes(planRows[0].is_current_plan)) {
      const first = planRows[0]
      currentPlan = {
        benefitId: first.benefit_id?.trim() || 'axa-pmi',
        planId: first.plan_id?.trim() || 'axa-plus',
        tier: (first.tier?.trim().toLowerCase() || 'plus') as PlanTier,
      }
      break
    }
  }

  const benefitIds = [...new Set(plans.map((p) => p.benefitId))]
  const pmiBenefits: PmiBenefitSummary[] = benefitIds.map((id) => {
    const benefitPlans = plans.filter((p) => p.benefitId === id)
    // Prefer the enrolled plan for this benefit; otherwise Comprehensive (plus).
    const displayPlan =
      (currentPlan.benefitId === id
        ? benefitPlans.find((p) => p.planId === currentPlan.planId)
        : undefined) ??
      benefitPlans.find((p) => p.tier === 'plus') ??
      benefitPlans[0]
    const sampleRows =
      (displayPlan
        ? byPlan.get(displayPlan.planId)
        : undefined) ??
      [...byPlan.values()].find((r) => r[0].benefit_id?.trim() === id)
    const sample = sampleRows?.[0]
    return {
      id,
      category: 'Insurance',
      provider: displayPlan?.provider ?? sample?.provider?.trim() ?? '',
      title: 'Private medical insurance',
      cardDescription: (sample?.card_description?.trim() ?? '')
        .replaceAll('Private Medical Insurance', 'private medical insurance')
        .replaceAll('PMI', 'medical insurance'),
      headerColor: sample?.header_color?.trim() || '#5b2d8e',
      washColor: sample?.wash_color?.trim() || '#ebe4f5',
      logoText: sample?.logo_text?.trim() || displayPlan?.provider || '',
      logoSrc: sample?.logo_src?.trim() || '',
      monthlyEmployeeCostGbp: displayPlan?.monthlyEmployeeCostGbp ?? 0,
      excessLabel: `claim excess £${displayPlan?.excessGbp ?? 0}`,
      hospitalOrScope: displayPlan?.hospitalList ?? '',
      employerContributionGbp: displayPlan?.employerContributionGbp ?? 0,
      overview: [
        sample?.overview_1?.trim() ?? '',
        sample?.overview_2?.trim() ?? '',
      ]
        .map((text) =>
          text
            .replaceAll('Private Medical Insurance', 'private medical insurance')
            .replaceAll('PMI', 'medical insurance'),
        )
        .filter(Boolean),
      features: [],
      isPmi: true,
      manageLabel: 'Manage your medical insurance',
    }
  })

  return { plans, pmiBenefits, currentPlan }
}

/** @deprecated Prefer loadPmiCatalog — kept for any leftover callers */
export async function loadAllPlans(): Promise<Plan[]> {
  const { plans } = await loadPmiCatalog()
  return plans
}

/**
 * Core list price before any split: CSV employee cash + CSV employer contribution.
 * Dependants and add-ons are not part of this figure.
 */
export function coreListPriceGbp(plan: Plan): number {
  return employeeCoreCashGbp(plan) + employerCoreFundingGbp(plan)
}

/**
 * Employee £/mo for core cover only (`monthly_employee_cost_gbp`).
 * Partner, children, and add-ons are added on top and are employee-paid.
 */
export function employeeCoreCashGbp(plan: Plan): number {
  return Math.max(0, plan.monthlyEmployeeCostGbp)
}

/**
 * Employer £/mo toward this plan's core cover (`employer_contribution_gbp`).
 *
 * Scheme rule: use the file's split. Do not top the employer up to a flat
 * £60 and hand the leftover to the employee — that rewrote Bupa and Vitality
 * cash into Compare "savings" the file does not show.
 * Dependants and add-ons sit outside this amount.
 */
export function employerCoreFundingGbp(plan: Plan): number {
  return Math.max(0, plan.employerContributionGbp)
}

/**
 * Exemplary income-tax rate for Benefit-in-Kind education only.
 * Never fold this into payable cash totals.
 */
export const BIK_EXEMPLAR_TAX_RATE = 0.3

export function estimateBikTax(taxableEmployerFunding: number): number {
  if (taxableEmployerFunding <= 0) return 0
  return Math.round(taxableEmployerFunding * BIK_EXEMPLAR_TAX_RATE)
}

export interface CostBreakdown {
  /** Employee-facing component lines (what you pay). */
  base: number
  partner: number
  children: number
  extras: number
  /** Full list price per component. */
  grossBase: number
  grossPartner: number
  grossChildren: number
  grossExtras: number
  /** Employee monthly total (you pay). */
  total: number
  /** Employer £/mo toward core cover. */
  employerContribution: number
  /** Full list price before employer contribution. */
  grossMonthly: number
  /** Same as employerContribution — explicit alias for marketing UI. */
  employerPays: number
  /** Same as total — explicit alias for marketing UI. */
  employeePays: number
  /** Rounded employer share of gross (0–100). */
  employerSharePct: number
  /**
   * This plan's CSV employer contribution toward core.
   * Not a cross-scheme ceiling, and not applied to dependants or add-ons.
   */
  employerCoreBudget: number
  /** Employer-funded core amount treated as taxable BIK (educational). */
  bikTaxableValue: number
  /** Exemplary 30% tax on employer core funding — not part of cash totals. */
  estimatedBikTax: number
  /**
   * True when partner/children exceed this plan's dependant cap.
   * `total` / `employeePays` still price the household that was asked for.
   * They are not a quote. See `quotedEmployeePays` on the applicable helper.
   */
  householdCapped: boolean
}

export function getCostBreakdown(
  plan: Plan,
  extras: string[],
  includePartner: boolean,
  childrenCount: number,
): CostBreakdown {
  let extrasCost = 0
  for (const feature of plan.features) {
    if (extras.includes(feature.featureId) && feature.optionalExtra) {
      extrasCost += feature.extraMonthlyCostGbp
    }
  }
  const partnerCost = plan.partnerMonthlyCostGbp || PARTNER_COST_GBP
  const childCost = plan.childMonthlyCostGbp || CHILD_COST_GBP
  const partner = includePartner ? partnerCost : 0
  const children = childrenCount * childCost

  // Core split is the CSV pair. Employer funding is not rewritten to £60.
  const employeeCore = employeeCoreCashGbp(plan)
  const employerCore = employerCoreFundingGbp(plan)
  const grossBase = employeeCore + employerCore
  const householdCapped = applicableHouseholdForPlan(
    plan,
    includePartner,
    childrenCount,
  ).capped

  // Dependants and extras are fully employee-paid, even when the cap refuses them.
  // Callers must not sell that total when householdCapped is true.
  const employeePays = employeeCore + partner + children + extrasCost
  const employerPays = employerCore
  const grossMonthly = grossBase + partner + children + extrasCost
  const employerSharePct =
    grossMonthly > 0 ? Math.round((employerPays / grossMonthly) * 100) : 0

  return {
    base: employeeCore,
    partner,
    children,
    extras: extrasCost,
    grossBase,
    grossPartner: partner,
    grossChildren: children,
    grossExtras: extrasCost,
    total: employeePays,
    employerContribution: employerPays,
    grossMonthly,
    employerPays,
    employeePays,
    employerSharePct,
    employerCoreBudget: employerCore,
    // Illustrative BIK follows the CSV employer core figure, not a £60 rewrite.
    bikTaxableValue: employerPays,
    estimatedBikTax: estimateBikTax(employerPays),
    householdCapped,
  }
}

/**
 * Household flags that fit a plan's dependant cap (partner first, then children).
 * `capped` means the request is larger than the plan allows. Pricing keeps the
 * requested people and withholds a quote — it does not drop them to cut the total.
 */
export function applicableHouseholdForPlan(
  plan: Plan,
  includePartner: boolean,
  childrenCount: number,
): { includePartner: boolean; childrenCount: number; capped: boolean } {
  const wantedPartner = includePartner
  const wantedChildren = Math.max(0, childrenCount)
  if (!plan.dependantsAllowed) {
    return {
      includePartner: false,
      childrenCount: 0,
      capped: wantedPartner || wantedChildren > 0,
    }
  }
  const max = Math.max(0, plan.maxDependants)
  let partner = wantedPartner
  let children = wantedChildren
  while ((partner ? 1 : 0) + children > max) {
    if (children > 0) children -= 1
    else if (partner) partner = false
    else break
  }
  const capped =
    partner !== wantedPartner || children !== wantedChildren
  return { includePartner: partner, childrenCount: children, capped }
}

export interface ApplicableCostBreakdown extends CostBreakdown {
  /**
   * Cash Apply / Review could charge.
   * Null when `householdCapped` — there is no applyable price.
   * Do not present `employeePays` or `total` as New price, You pay, or a saving
   * in that case. Those fields keep the full requested household (partner and
   * children included) so a forgotten flag cannot turn a refused family into £0.
   */
  quotedEmployeePays: number | null
}

/**
 * Price for the household the member asked for.
 *
 * When the plan can hold that household, `quotedEmployeePays` equals
 * `employeePays`. When it cannot (`householdCapped`), `quotedEmployeePays`
 * is null and the component lines are the unstripped request, not a quote
 * with dependants silently removed.
 */
export function getApplicableCostBreakdown(
  plan: Plan,
  extras: string[],
  includePartner: boolean,
  childrenCount: number,
): ApplicableCostBreakdown {
  const requested = getCostBreakdown(
    plan,
    extras,
    includePartner,
    childrenCount,
  )
  return {
    ...requested,
    quotedEmployeePays: requested.householdCapped
      ? null
      : requested.employeePays,
  }
}

/**
 * Requested-household employee cash, including dependants the plan may refuse.
 * Not an applyable quote when `householdCapped` — use `quotedEmployeePays`.
 */
export function estimateMonthlyCost(
  plan: Plan,
  extras: string[],
  includePartner: boolean,
  childrenCount: number,
): number {
  return getCostBreakdown(plan, extras, includePartner, childrenCount).total
}
