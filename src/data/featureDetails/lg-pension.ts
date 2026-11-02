import type { FeatureDetailContent } from './types'

const providerCta = {
  label: 'Go to Legal & General',
  href: 'https://www.legalandgeneral.com',
} as const

const ifaMap = {
  enabled: true,
  label: 'Find an independent financial adviser or pension specialist near you',
  queryTemplate: 'independent financial adviser near {place}',
} as const

export const lgContribDetail: FeatureDetailContent = {
  featureId: 'lg-contrib',
  benefitId: 'lg-pension',
  overview:
    'You decide how much of your salary goes into your workplace pension each pay period. Paying in more early adds to your pot over time. Tax relief and any employer match under your scheme rules increase what builds up for retirement.',
  includedIntro: 'On your L&G Workplace Pension account you can:',
  includedItems: [
    'Set or change your employee contribution as a percentage of qualifying earnings or a fixed amount, within limits set by your employer.',
    'Use salary sacrifice where your employer offers it, which may reduce National Insurance as well as benefiting from pension tax relief.',
    'Review how your current contribution level compares with any scheme default or auto-enrolment minimum, and adjust when your circumstances change.',
    'See contribution history and upcoming deductions in your online account or annual benefit statement.',
  ],
  costSummary:
    'Employee pension contributions are deducted from pay before they reach your bank account. Basic-rate tax relief is usually applied automatically through the net pay or relief-at-source arrangement your scheme uses. Higher and additional-rate taxpayers may need to claim extra relief through Self Assessment. Salary sacrifice reduces gross pay, so take-home pay and benefit calculations (such as mortgage affordability) can change. Check your payslip after any update.',
  faqs: [
    {
      q: 'What is the minimum I have to contribute?',
      a: 'If you are auto-enrolled, your employer must meet minimum contribution levels set by UK law. You can usually contribute more than the minimum, up to any cap your employer sets. Your scheme documents or HR team will confirm the exact figures for your workplace.',
    },
    {
      q: 'Can I change my contribution amount at any time?',
      a: 'Most schemes let you increase or reduce contributions online or through HR, though changes may apply from the next available payroll date. Some employers run windows for certain types of change. Your L&G account or benefits portal will show what is available to you.',
    },
    {
      q: 'Does salary sacrifice affect my take-home pay differently from normal contributions?',
      a: 'Yes. With salary sacrifice you agree to give up part of your gross salary in exchange for employer pension contributions. That can lower income tax and National Insurance on the sacrificed amount compared with paying contributions from net pay, depending on how your scheme is set up.',
    },
    {
      q: 'Is there an annual limit on how much I can pay in?',
      a: 'The annual allowance caps tax-relieved pension savings each tax year (including employer contributions). Most members stay well within it, but large increases or carry-forward rules can matter. Consider speaking to a regulated adviser if you are adding substantial amounts.',
    },
  ],
  accessSteps: [
    {
      text: 'Sign in to your Legal & General Workplace Pension account (via your employer’s benefits link or L&G member login).',
      href: 'https://www.legalandgeneral.com',
    },
    {
      text: 'Open Contributions or My plan and review your current employee percentage or amount.',
    },
    {
      text: 'Choose a new contribution level within your employer’s allowed range and confirm any salary sacrifice option if offered.',
    },
    {
      text: 'Submit the change and note the date it will take effect on payroll.',
    },
    {
      text: 'Check your next payslip to confirm deductions, and revisit contributions after a pay rise or change in household costs.',
    },
  ],
  providerCta,
  map: ifaMap,
}

export const lgEmployerDetail: FeatureDetailContent = {
  featureId: 'lg-employer',
  benefitId: 'lg-pension',
  overview:
    'Your employer pays into your pension on top of what you save. Knowing matching rules, qualifying earnings, and any cap helps you raise your contribution to capture the full employer pay-in without exceeding scheme limits.',
  includedIntro: 'Your scheme includes:',
  includedItems: [
    'A mandatory or contracted employer contribution rate applied to qualifying earnings as defined in your scheme rules.',
    'Additional matching when you increase your own contributions up to a stated employer maximum (if your employer offers a match).',
    'Employer payments made through salary sacrifice arrangements where your company uses that structure.',
    'Clear visibility of employer amounts on your benefit statement, annual pension forecast, and L&G online dashboard.',
  ],
  costSummary:
    'Employer contributions are paid by your company. They do not come out of your net pay. They still count toward your annual allowance for tax purposes and form part of your total pension input each year. If you leave employment, employer payments stop unless your scheme rules say otherwise for a notice period. There is no charge to you for receiving employer contributions, though fund charges and scheme administration still apply to the overall pot.',
  faqs: [
    {
      q: 'How much does my employer pay in?',
      a: 'The rate is set by your employer and shown in your scheme booklet, HR materials, or L&G account. It may be a fixed percentage of qualifying earnings or tiered so that higher employee contributions unlock extra employer matching.',
    },
    {
      q: 'Do I need to contribute to receive employer money?',
      a: 'Under auto-enrolment, both you and your employer must pay minimum amounts when you are eligible. Some employers only pay maximum matching if you contribute at a certain level. Increase your payment up to the match cap to receive the full employer contribution.',
    },
    {
      q: 'What earnings count for employer contributions?',
      a: 'Schemes use qualifying earnings (often banded between lower and upper limits set in legislation) or full salary, depending on how your employer set up the plan. Your payslip and pension statement show the pensionable pay used for each period.',
    },
    {
      q: 'What happens to employer contributions if I opt out?',
      a: 'If you opt out of the workplace pension, employer contributions generally stop as well, unless you remain eligible under a different category in the scheme rules. Rejoining usually restarts both employee and employer payments from the next enrolment date.',
    },
  ],
  accessSteps: [
    {
      text: 'Log in to your L&G Workplace Pension account.',
      href: 'https://www.legalandgeneral.com',
    },
    {
      text: 'Open Plan details or Contributions to view employer rates and any matching tiers.',
    },
    {
      text: 'Compare your employee contribution with the maximum employer match (if applicable).',
    },
    {
      text: 'Adjust your contribution to capture full matching where it fits your budget.',
    },
    {
      text: 'Download or save your latest illustration showing combined employee and employer payments.',
    },
  ],
  providerCta,
  map: {
    enabled: true,
    label: 'Find pension advice on employer matching and scheme rules',
    queryTemplate: 'pension adviser workplace scheme near {place}',
  },
}

export const lgFundsDetail: FeatureDetailContent = {
  featureId: 'lg-funds',
  benefitId: 'lg-pension',
  overview:
    'Your workplace pension is invested in one or more funds until you take benefits in retirement. Most members start in a default fund that adjusts risk over time; you can switch to self-select funds if you want more control and accept the extra responsibility.',
  includedIntro: 'Your L&G account offers:',
  includedItems: [
    'A default lifestyle or target-date fund aligned to your expected retirement age, with asset allocation that shifts over time.',
    'A range of self-select funds (for example equity, bond, mixed-asset, and ethical options) where your scheme offers them.',
    'Online tools showing fund factsheets, past performance, and charges. Past performance is not a guide to the future.',
    'The ability to switch funds or split contributions across multiple funds, subject to any restrictions in your employer’s scheme.',
  ],
  costSummary:
    'Each fund has an ongoing charge figure (OCF) or equivalent shown in the fund literature. Switching funds is usually free of transaction fees at scheme level. Frequent switching is discouraged because it can crystallise losses and miss market recovery. Your pot value can fall as well as rise. Workplace pensions are long-term investments and you may not get back what you put in.',
  faqs: [
    {
      q: 'Should I stay in the default fund?',
      a: 'The default is designed for members who do not want to choose investments. It is often appropriate if you prefer a managed glide path into retirement. Self-select suits those comfortable comparing risk, charges, and diversification. It also suits those seeking specific themes such as responsible investment.',
    },
    {
      q: 'How often can I switch funds?',
      a: 'Most schemes allow switches online at any time, though some employers limit how many free switches you can make each year. Allow a few working days for valuations and trades to complete.',
    },
    {
      q: 'Can I hold more than one fund at once?',
      a: 'Yes, if your scheme supports splitting future contributions or redirecting existing holdings across a menu of funds. Check minimum allocation percentages on the L&G platform.',
    },
    {
      q: 'Who can help me choose investments?',
      a: 'L&G provides information and tools but not personalised regulated advice through the standard member site. Speak to a regulated financial adviser for tailored recommendations, especially before making large shifts near retirement.',
    },
  ],
  accessSteps: [
    {
      text: 'Open your L&G Workplace Pension account from your employer benefits link or member login.',
      href: 'https://www.legalandgeneral.com',
    },
    {
      text: 'Go to Investments or Change my funds and review your current fund(s) and charges.',
    },
    {
      text: 'Read factsheets for the default and any self-select options that match your risk tolerance and time to retirement.',
    },
    {
      text: 'Submit a fund switch or update how future contributions are allocated.',
    },
    {
      text: 'Revisit your choice after major life events, or roughly every few years. Check more often as you near retirement.',
    },
  ],
  providerCta,
  map: {
    enabled: true,
    label: 'Find an adviser to discuss pension investments',
    queryTemplate: 'independent financial adviser pension investments near {place}',
  },
}

export const lgWishDetail: FeatureDetailContent = {
  featureId: 'lg-wish',
  benefitId: 'lg-pension',
  overview:
    'An expression of wish tells the scheme trustees who you would like to receive your pension benefits if you die before taking retirement. It is not a legally binding will, but trustees usually follow your wishes when exercising their discretion.',
  includedIntro: 'Completing or updating your expression of wish allows you to:',
  includedItems: [
    'Nominate one or more individuals, charities, or other beneficiaries to be considered if you die before retirement age.',
    'State the proportion each nominee should receive (for example 100% to one person or split between partner and children).',
    'Update nominations after life events such as marriage, civil partnership, divorce, or the birth of a child.',
    'Keep a record in your L&G account that trustees can refer to alongside any other information they hold.',
  ],
  costSummary:
    'There is no fee to submit or change an expression of wish through your workplace pension. Benefits paid on death before retirement are usually tested against the lifetime allowance rules that applied at the date of death, and may be paid as lump sums or dependants’ pensions depending on scheme rules and tax law at the time. For estate planning beyond the pension, you may still need a valid will. HR or a solicitor can explain how the two interact.',
  faqs: [
    {
      q: 'Is an expression of wish the same as a will?',
      a: 'No. Your will governs your estate; the expression of wish guides pension trustees who decide how death benefits are paid. Keeping both aligned reduces confusion for your family.',
    },
    {
      q: 'Can I nominate anyone I choose?',
      a: 'You can name individuals or organisations, but trustees must comply with scheme rules and law. They have discretion to pay other dependants if circumstances have changed and your form is out of date.',
    },
    {
      q: 'How do I update my nomination after divorce?',
      a: 'Log in to your L&G account or use the paper form from your employer, complete a new expression of wish, and destroy outdated versions. Many schemes treat ex-spouses as nominees until you update.',
    },
    {
      q: 'What if I do not complete a form?',
      a: 'Trustees will still decide who receives benefits, often starting with financial dependants. A clear, current expression of wish speeds decisions and reflects your intentions.',
    },
  ],
  accessSteps: [
    {
      text: 'Log in to L&G using your employer’s benefits link or your member credentials.',
      href: 'https://www.legalandgeneral.com',
    },
    {
      text: 'Open Expression of wish or Nominated beneficiaries.',
    },
    {
      text: 'Enter nominee names, relationships, and percentage shares (totalling 100%).',
    },
    {
      text: 'Review the declaration explaining trustee discretion and submit the form.',
    },
    {
      text: 'Tell your employer or HR if they require a signed copy, and update after any major life change.',
    },
  ],
  providerCta,
  map: {
    enabled: false,
    label: '',
    queryTemplate: '',
  },
}

export const lgProjectionsDetail: FeatureDetailContent = {
  featureId: 'lg-projections',
  benefitId: 'lg-pension',
  overview:
    'Retirement projections translate today’s contributions and investments into an illustrative income at retirement. They help you sense-check whether you are on course, but they rely on assumptions that will not match real life exactly.',
  includedIntro: 'Your L&G account shows:',
  includedItems: [
    'An estimated pension pot at a chosen retirement age based on current contribution rates (yours and your employer’s).',
    'An illustrative annual income if you used that pot to buy an annuity or draw an income under standard assumptions.',
    'The effect of increasing or decreasing contributions, retiring earlier or later, or changing investment growth assumptions in modellers where available.',
    'Reminders that figures are not guaranteed and are shown in today’s money or nominal terms as labelled on the tool.',
  ],
  costSummary:
    'Online projections are free to use. They are not personal advice and do not promise a particular retirement income. Fund charges, inflation, investment returns, and product choices at retirement will all affect outcomes. If a projection suggests a shortfall, options include paying more in, working longer, or seeking regulated advice on consolidating other pensions. Always check scheme rules before acting.',
  faqs: [
    {
      q: 'Why does my projection change each time I log in?',
      a: 'Updates reflect new contributions, fund performance, revised retirement age, or changed assumptions in the modeller. Small movements are normal; large swings may mean a setting or fund switch changed.',
    },
    {
      q: 'What assumptions do L&G use?',
      a: 'Illustrations use regulatory assumptions for growth, inflation, and charges unless the tool lets you edit them. The assumptions page in your account explains the rates used for your statement.',
    },
    {
      q: 'Does the projection include my State Pension?',
      a: 'Workplace pension projections usually show scheme benefits only. You can add State Pension separately using the government checker for a fuller picture.',
    },
    {
      q: 'Should I rely on this instead of advice?',
      a: 'Use projections for planning conversations and rough targets. For decisions near retirement, such as transfer, drawdown, or annuity, consider regulated advice tailored to your circumstances.',
    },
  ],
  accessSteps: [
    {
      text: 'Log in to your L&G Workplace Pension account.',
      href: 'https://www.legalandgeneral.com',
    },
    {
      text: 'Open Retirement planner, Forecast, or Your retirement income.',
    },
    {
      text: 'Confirm your planned retirement age and review current contribution settings.',
    },
    {
      text: 'Run scenarios (for example +1% employee contribution or retire at 68) and note the illustrative outcomes.',
    },
    {
      text: 'Save or print the illustration for your records and revisit annually or after a pay change.',
    },
  ],
  providerCta,
  map: {
    enabled: true,
    label: 'Find an adviser to interpret your retirement projection',
    queryTemplate: 'retirement financial planning adviser near {place}',
  },
}

export const lgConsolidationDetail: FeatureDetailContent = {
  featureId: 'lg-consolidation',
  benefitId: 'lg-pension',
  overview:
    'You may have pensions from previous jobs. Transferring them into your current L&G workplace plan can simplify administration, but you could lose valuable guarantees or pay higher charges. Compare carefully before moving money.',
  includedIntro: 'When you consider a transfer in, L&G and your scheme materials explain:',
  includedItems: [
    'How to list previous workplace or personal pensions and request transfer value quotes from old providers.',
    'Checks for safeguarded benefits (for example guaranteed annuity rates or protected tax-free cash) that may be lost on transfer.',
    'The difference between partial and full transfers, and whether your employer scheme accepts inbound transfers at all.',
    'Typical timelines from completing transfer forms to money appearing in your L&G account, including possible market downtime while assets move.',
  ],
  costSummary:
    'L&G and your employer may not charge an incoming transfer fee, but old providers sometimes apply exit penalties or administrative costs. Compare ongoing fund charges and any lost guarantees against the benefit of one combined pot. Transfers are usually irreversible once completed. HM Revenue & Customs rules and the lifetime allowance (or its successors) can affect large transfers. Regulated advice is strongly recommended for complex cases.',
  faqs: [
    {
      q: 'Should I transfer all my old pensions into this scheme?',
      a: 'Not always. Consolidation can reduce paperwork, but workplace schemes vary in fund choice and cost. Keep pensions with guarantees or lower charges unless an adviser confirms a transfer is in your interest.',
    },
    {
      q: 'How long does a transfer take?',
      a: 'Allow several weeks from submitting signed forms to completion. Delays often come from tracing old schemes or matching member details. Start by gathering policy numbers and dates of employment.',
    },
    {
      q: 'Can I transfer while still paying into my current pension?',
      a: 'Usually yes, if the scheme accepts inbound transfers. Your L&G account or employer booklet confirms eligibility and any minimum amounts.',
    },
    {
      q: 'Where can I get help comparing options?',
      a: 'Pension Wise offers free guidance at age 50+ for defined contribution pots. For a personal recommendation on transferring, use a regulated financial adviser, especially if any pension includes guarantees or employer-specific benefits.',
    },
  ],
  accessSteps: [
    {
      text: 'Gather details of previous pensions (provider name, policy number, approximate value).',
    },
    {
      text: 'Sign in to L&G or contact the member helpline to confirm your scheme accepts transfers in.',
      href: 'https://www.legalandgeneral.com',
    },
    {
      text: 'Request transfer quotations from old providers and read any safeguarded benefit warnings.',
    },
    {
      text: 'Compare charges, investment options, and guarantees; seek regulated advice if you are unsure.',
    },
    {
      text: 'Complete L&G transfer forms, send them to your old provider, and track progress until funds arrive.',
    },
  ],
  providerCta,
  map: {
    enabled: false,
    label: '',
    queryTemplate: '',
  },
}

export const lgPensionFeatureDetails: FeatureDetailContent[] = [
  lgContribDetail,
  lgEmployerDetail,
  lgFundsDetail,
  lgWishDetail,
  lgProjectionsDetail,
  lgConsolidationDetail,
]
