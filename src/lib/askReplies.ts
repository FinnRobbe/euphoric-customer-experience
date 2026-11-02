import { getEnrolledPlan } from './enrolledPlan'
import { shortPlanName } from './tierLabels'
import type {
  CurrentPmiPlan,
  PersonaliseAnswers,
  Plan,
  PlanFeature,
} from '../types'

export type AskTopicId = 'excess' | 'dependants' | 'virtual-gp'

export type AskTopic = {
  id: AskTopicId
  q: string
  keywords: readonly string[]
}

/** Explicit phrases only. Question-title words ("what", "included") are not keywords. */
export const askTopics: readonly AskTopic[] = [
  {
    id: 'excess',
    q: 'What does my excess mean?',
    keywords: ['excess', 'claim excess', 'deductible'],
  },
  {
    id: 'dependants',
    q: 'Can I add my partner?',
    keywords: [
      'partner',
      'spouse',
      'dependant',
      'dependants',
      'family',
      'child',
      'children',
    ],
  },
  {
    id: 'virtual-gp',
    q: 'Is Virtual GP included?',
    keywords: ['virtual gp', 'digital gp', 'online gp', 'gp', 'doctor'],
  },
]

const TOPIC_LABELS = askTopics.map((item) => item.q).join('; ')

export type AskCoverContext = {
  pathname: string
  plans: Plan[]
  currentPlan: CurrentPmiPlan
  selectedPlan: Plan | null
  answers: PersonaliseAnswers
  committedAnswers: PersonaliseAnswers
}

export function unknownAskReply(query: string): string {
  const trimmed = query.trim()
  if (!trimmed) {
    return `I only know these topics in this prototype: ${TOPIC_LABELS}. Try one of those.`
  }
  return `I only know these topics in this prototype: ${TOPIC_LABELS}. Try one of those — I don’t have an answer for “${trimmed}”.`
}

/** Whole phrase, so short tokens like "gp" do not fire inside another word. */
function hasKeyword(query: string, keyword: string): boolean {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const plural = keyword.length > 2 ? 's?' : ''
  return new RegExp(
    `(?:^|[^a-z0-9])${escaped}${plural}(?=$|[^a-z0-9])`,
  ).test(query)
}

export function matchAskTopic(query: string): AskTopic | null {
  const lower = query.trim().toLowerCase()
  if (!lower) return null
  for (const item of askTopics) {
    if (item.keywords.some((keyword) => hasKeyword(lower, keyword))) {
      return item
    }
  }
  return null
}

function benefitIdFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/benefits\/([^/]+)(?:\/|$)/)
  return match?.[1] ?? null
}

function onPersonalisePath(pathname: string): boolean {
  return /^\/benefits\/[^/]+\/personalise(?:\/|$)/.test(pathname)
}

/**
 * Cover Ask should talk about.
 * Personalise uses the draft column. Other benefit routes use the selected
 * plan when it is that benefit, otherwise the enrolled plan when it is.
 * Home, Chat, and Saved use enrolled cover.
 */
export function resolveAskPlan(ctx: AskCoverContext): {
  plan: Plan | null
  extras: readonly string[]
} {
  const enrolled = getEnrolledPlan(ctx.plans, ctx.currentPlan)
  const benefitId = benefitIdFromPath(ctx.pathname)

  if (benefitId && onPersonalisePath(ctx.pathname)) {
    const draft =
      ctx.plans.find(
        (plan) =>
          plan.benefitId === benefitId && plan.tier === ctx.answers.coverLevel,
      ) ?? null
    if (draft) {
      return { plan: draft, extras: ctx.answers.selectedExtras }
    }
  }

  if (benefitId) {
    if (ctx.selectedPlan?.benefitId === benefitId) {
      return {
        plan: ctx.selectedPlan,
        extras: extrasForPlan(ctx.selectedPlan, ctx, enrolled),
      }
    }
    if (enrolled?.benefitId === benefitId) {
      return { plan: enrolled, extras: extrasForPlan(enrolled, ctx, enrolled) }
    }
  }

  if (enrolled) {
    return { plan: enrolled, extras: extrasForPlan(enrolled, ctx, enrolled) }
  }
  if (ctx.selectedPlan) {
    return {
      plan: ctx.selectedPlan,
      extras: extrasForPlan(ctx.selectedPlan, ctx, null),
    }
  }
  return { plan: null, extras: [] }
}

function extrasForPlan(
  plan: Plan,
  ctx: AskCoverContext,
  enrolled: Plan | null,
): readonly string[] {
  if (onPersonalisePath(ctx.pathname) && plan.tier === ctx.answers.coverLevel) {
    return ctx.answers.selectedExtras
  }
  if (enrolled && plan.planId === enrolled.planId) {
    if (ctx.answers.coverLevel === plan.tier) return ctx.answers.selectedExtras
    return ctx.committedAnswers.selectedExtras
  }
  return ctx.committedAnswers.selectedExtras
}

function coverLabel(plan: Plan): string {
  const provider = plan.provider.trim()
  const short = shortPlanName(plan)
  if (!provider) return short
  if (short.toLowerCase().startsWith(provider.toLowerCase())) return short
  return `${provider} ${short}`
}

function isVirtualGpFeature(feature: PlanFeature): boolean {
  const name = feature.featureName.toLowerCase()
  const id = feature.featureId.toLowerCase()
  if (feature.relevancyTags.some((tag) => tag.toLowerCase() === 'gp_access')) {
    return true
  }
  if (name.includes('virtual gp') || name.includes('digital gp')) return true
  return id === 'virt-gp' || id.endsWith('-gp')
}

function virtualGpOnCover(
  plan: Plan,
  extras: readonly string[],
): { onCover: boolean; name: string | null; asAddOn: boolean } {
  const matches = plan.features.filter(isVirtualGpFeature)
  if (matches.length === 0) {
    return { onCover: false, name: null, asAddOn: false }
  }
  const included = matches.find((feature) => feature.included)
  if (included) {
    return { onCover: true, name: included.featureName, asAddOn: false }
  }
  const selected = matches.find(
    (feature) =>
      feature.optionalExtra && extras.includes(feature.featureId),
  )
  if (selected) {
    return { onCover: true, name: selected.featureName, asAddOn: true }
  }
  return { onCover: false, name: matches[0].featureName, asAddOn: false }
}

function excessReply(plan: Plan | null): string {
  const meaning =
    'You pay that towards a claim before the insurer pays the rest. A lower excess usually means a higher monthly contribution.'
  if (!plan || !Number.isFinite(plan.excessGbp)) {
    return 'Your excess is the amount you pay towards a claim before the insurer pays the rest. A lower excess usually means a higher monthly contribution.'
  }
  return `On ${coverLabel(plan)}, your excess is £${plan.excessGbp}. ${meaning}`
}

function dependantReply(plan: Plan | null): string {
  if (!plan) {
    return 'Dependant cover depends on the plan. I don’t have this cover’s dependant cap yet.'
  }
  const label = coverLabel(plan)
  const cap =
    plan.dependantsAllowed && plan.maxDependants > 0 ? plan.maxDependants : 0
  if (cap === 0) {
    return `On ${label}, the dependant cap is 0. You can’t add a partner or children on this cover.`
  }
  const noun = cap === 1 ? 'dependant' : 'dependants'
  return `On ${label}, you can add a partner and children. The dependant cap is ${cap} ${noun}.`
}

function virtualGpReply(plan: Plan | null, extras: readonly string[]): string {
  if (!plan) {
    return 'I don’t know which cover you’re on yet, so I can’t say whether Virtual GP is included.'
  }
  const label = coverLabel(plan)
  const status = virtualGpOnCover(plan, extras)
  if (!status.onCover) {
    return `No. Virtual GP is not on your ${label} cover.`
  }
  const name = status.name ?? 'Virtual GP'
  if (status.asAddOn) {
    return `Yes. ${name} is on your ${label} cover as a selected add-on.`
  }
  return `Yes. ${name} is included on your ${label} cover.`
}

export function replyForAskTopic(
  id: AskTopicId,
  ctx: AskCoverContext,
): string {
  const { plan, extras } = resolveAskPlan(ctx)
  switch (id) {
    case 'excess':
      return excessReply(plan)
    case 'dependants':
      return dependantReply(plan)
    case 'virtual-gp':
      return virtualGpReply(plan, extras)
  }
}
