import type { FeatureDetailContent } from './types'

const benefitId = 'aviva-retirement'

const providerCta = {
  label: 'Go to Aviva',
  href: 'https://www.aviva.co.uk',
} as const

export const avivaRetirementFeatureDetails: FeatureDetailContent[] = [
  {
    featureId: 'av-drawdown',
    benefitId,
    overview:
      'Flexible drawdown lets you leave pension savings invested and take an income when you need it. Your pot can rise or fall with markets. You choose how much to withdraw each year, within HMRC rules and any product limits.',
    includedIntro: 'This pathway covers:',
    includedItems: [
      'Access to your pension fund while it stays invested, rather than buying a guaranteed annuity straight away.',
      'Flexible withdrawals. You decide the timing and amount of income, subject to tax and scheme rules.',
      'Illustrations of how different withdrawal levels might affect how long your money may last.',
      'Guidance on mixing drawdown with other retirement income, such as the State Pension or part-time work.',
    ],
    costSummary:
      'There is no separate charge for exploring drawdown in this prototype. In real products, ongoing fund charges, platform fees, and advice costs may apply. Income you take above your tax-free cash is usually taxable at your marginal rate.',
    faqs: [
      {
        q: 'Can I take tax-free cash and still use drawdown?',
        a: 'Yes, if your scheme allows it. Many people take up to 25% of their pension pot as a tax-free lump sum (where eligible) and move the rest into drawdown. The rules depend on your scheme and when you take benefits.',
      },
      {
        q: 'Is my income guaranteed in drawdown?',
        a: 'No. Unlike an annuity, drawdown does not guarantee a fixed income for life. Your remaining fund depends on investment performance, charges, and how much you withdraw.',
      },
      {
        q: 'Do I need advice before choosing drawdown?',
        a: 'Drawdown is not suitable for everyone. If you have a defined contribution pot above the Pension Wise threshold, you may need regulated advice before transferring or setting up certain arrangements. A qualified adviser can help you decide.',
      },
      {
        q: 'What happens to money left in drawdown when I die?',
        a: 'Any remaining drawdown funds may pass to beneficiaries, sometimes tax-efficiently depending on your age at death and how benefits are taken. Nominees and expression of wish forms are important.',
      },
    ],
    accessSteps: [
      {
        text: 'From your Aviva pension account or employer scheme, open the retirement income journey.',
        href: 'aviva.co.uk',
      },
      {
        text: 'Check your pot value, charges, and any guaranteed annuity rates or protected tax-free cash.',
      },
      {
        text: 'Use the in-journey illustrations to compare drawdown with annuities and hybrid options.',
      },
      {
        text: 'Unsure? Book a free Pension Wise session or talk to a regulated financial adviser.',
      },
      {
        text: 'When you are ready, follow the prompts to move funds into drawdown and set your first withdrawal.',
      },
    ],
    providerCta,
    map: {
      enabled: true,
      label: 'Find a pension drawdown adviser near you',
      queryTemplate: 'retirement financial adviser pension drawdown near {place}',
    },
  },
  {
    featureId: 'av-annuity',
    benefitId,
    overview:
      'An annuity exchanges part or all of your pension pot for a regular income. Payments may continue for life or for a fixed term. In return for giving up access to that capital, you may get predictable payments that can help cover essential bills in retirement.',
    includedIntro: 'Annuity options include:',
    includedItems: [
      'Lifetime annuities that pay an income for as long as you live.',
      'Fixed-term annuities that pay for a set number of years, with or without a maturity value.',
      'Enhanced or impaired-life quotes if health or lifestyle factors may improve the rate offered.',
      'Optional features such as escalation (income that rises each year) or a guarantee period.',
    ],
    costSummary:
      'The income rate you are quoted reflects your age, health, annuity type, and market conditions at the time you apply. There is usually no ongoing product fee once the annuity is in payment. The insurer keeps the capital you used to buy it.',
    faqs: [
      {
        q: 'Can I change my mind after buying an annuity?',
        a: 'Most annuities cannot be changed or cashed in once set up. It is important to compare quotes and optional features carefully before you commit.',
      },
      {
        q: 'What is an open-market option?',
        a: 'You do not have to buy an annuity from your current pension provider. Shopping the open market can sometimes give you a higher income for the same pot.',
      },
      {
        q: 'How does an annuity affect tax?',
        a: 'Annuity income is usually treated as earned income for tax purposes. Tax-free cash is normally taken separately before or when you buy the annuity, within HMRC limits.',
      },
      {
        q: 'Should I annuitise my whole pension?',
        a: 'Many people use annuities for essential spending and keep other pots in drawdown for flexibility. A regulated adviser can help you balance security and choice.',
      },
    ],
    accessSteps: [
      {
        text: 'In Retirement Income Options, choose annuity comparisons.',
      },
      {
        text: 'Add your pot size, planned retirement date, and any health or lifestyle details needed for enhanced quotes.',
      },
      {
        text: 'Compare lifetime, fixed-term, and escalation options with illustrative income figures.',
      },
      {
        text: 'Request open-market quotes or continue to Aviva’s annuity application if that suits your plan.',
      },
      {
        text: 'Confirm beneficiary or guarantee options before you accept a quote.',
      },
    ],
    providerCta,
    map: {
      enabled: true,
      label: 'Find a pension annuity adviser near you',
      queryTemplate: 'pension annuity adviser open market option near {place}',
    },
  },
  {
    featureId: 'av-taxfree',
    benefitId,
    overview:
      'When you access defined contribution pension benefits, you may be able to take up to 25% of your pot as a tax-free lump sum, subject to HMRC rules and any scheme-specific limits. The rest is normally taxable when you withdraw or receive it as income.',
    includedIntro: 'This section covers:',
    includedItems: [
      'How the standard 25% tax-free allowance usually applies to uncrystallised pension funds.',
      'What “crystallisation” means when you move money into drawdown or buy an annuity.',
      'Situations where protected tax-free cash or other HMRC allowances may apply.',
      'How taking tax-free cash can affect how much remains for later income.',
    ],
    costSummary:
      'There is no charge for the tax-free lump sum itself within your allowance. Taking more than your available tax-free amount, or large withdrawals in one tax year, can push you into a higher income-tax band on the taxable portion.',
    faqs: [
      {
        q: 'Is 25% tax-free always available?',
        a: 'Most defined contribution pots allow up to 25% tax-free when benefits are taken, but some schemes have protected allowances or different rules. Check your scheme facts and HMRC guidance.',
      },
      {
        q: 'Do I have to take all my tax-free cash at once?',
        a: 'Not necessarily. With phased drawdown you may be able to take tax-free cash in stages, which can help manage tax on the taxable part.',
      },
      {
        q: 'Does tax-free cash affect my Lifetime Allowance or allowances?',
        a: 'Allowance rules have changed over time (including the abolition of the Lifetime Allowance charge from 2024). Your situation depends on when you built up benefits and how you take them. Pension Wise or a regulated adviser can help with your case.',
      },
      {
        q: 'Can I take tax-free cash and leave the rest untouched?',
        a: 'Yes, if your product allows partial crystallisation. Confirm with your provider before you request a payment.',
      },
    ],
    accessSteps: [
      {
        text: 'Check your total pension pot and any statement showing protected tax-free cash.',
      },
      {
        text: 'At your chosen retirement age, use the journey calculator to see tax-free versus taxable amounts.',
      },
      {
        text: 'Decide whether to take tax-free cash in one go or in phases alongside drawdown.',
      },
      {
        text: 'Submit a withdrawal request through Aviva once you understand the tax impact on the taxable portion.',
      },
    ],
    providerCta,
    map: {
      enabled: false,
      label: 'Find a retirement financial adviser near you',
      queryTemplate: 'pension tax advice near {place}',
    },
  },
  {
    featureId: 'av-advice',
    benefitId,
    overview:
      'The guided journey walks you through retirement income choices step by step. You compare security, flexibility, tax, and what happens to any money left for your family. It helps you ask the right questions before you commit to drawdown, annuities, or a mix of both.',
    includedIntro: 'Along the way you can:',
    includedItems: [
      'Capture your essential and discretionary spending goals in retirement.',
      'See how State Pension age and other income sources fit with your private pension.',
      'Compare illustrative outcomes for drawdown, annuity, and blended strategies.',
      'Identify when regulated financial advice or Pension Wise guidance is recommended.',
    ],
    costSummary:
      'Using this guided journey in the prototype is free. Regulated financial advice is usually paid separately (fixed fee, hourly rate, or advice charge). Pension Wise offers free appointments for people aged 50 or over with defined contribution pensions.',
    faqs: [
      {
        q: 'Is this the same as regulated financial advice?',
        a: 'No. The guided journey provides information and prompts to help you think through options. Personal recommendations on products and transfers require advice from an FCA-authorised adviser.',
      },
      {
        q: 'When should I speak to an IFA about retirement?',
        a: 'Consider advice before large transfers, complex tax situations, defined benefit pensions, or when you are unsure which income strategy fits your needs. Many people also use advice for annuity shopping and drawdown setup.',
      },
      {
        q: 'What is Pension Wise?',
        a: 'Pension Wise is a free, impartial government service that explains pension options. It does not recommend products but can complement provider journeys and adviser meetings.',
      },
      {
        q: 'Can my employer scheme offer support?',
        a: 'Some workplace schemes include access to guidance or an adviser helpline. Check your scheme documents or speak to HR for what is included.',
      },
    ],
    accessSteps: [
      {
        text: 'Start the Guided Journey from your Aviva Retirement Income Options hub.',
      },
      {
        text: 'Answer questions about your age, pot size, dependants, and income needs.',
      },
      {
        text: 'Read the personalised prompts and flagged topics where advice may be required.',
      },
      {
        text: 'Book Pension Wise or find a local IFA if you want a personal recommendation.',
      },
      {
        text: 'Return to the journey to implement your chosen pathway when you are ready.',
      },
    ],
    providerCta,
    map: {
      enabled: true,
      label: 'Find an independent financial adviser (IFA)',
      queryTemplate: 'independent financial adviser IFA pension retirement near {place}',
    },
  },
  {
    featureId: 'av-spouse',
    benefitId,
    overview:
      'If you want income to continue for a husband, wife, civil partner, or dependant after you die, you can often build that into an annuity or nominate beneficiaries for drawdown. The trade-off is usually a lower starting income while you are alive.',
    includedIntro: 'Partner and dependant options include:',
    includedItems: [
      'Joint-life annuities that pay a percentage of your income to a surviving partner for their lifetime.',
      'Guarantee periods that keep payments going for a minimum number of years even if you die early.',
      'Nominee or beneficiary arrangements for unused drawdown funds after death.',
      'Dependant’s pensions from certain scheme types, where rules allow.',
    ],
    costSummary:
      'Adding spouse or dependant protection typically reduces the initial annuity rate or the amount available for your own income. There is no separate “premium”. The cost is reflected in the quote you accept.',
    faqs: [
      {
        q: 'What is a joint-life annuity?',
        a: 'It pays you an income for life and, if you die first, continues paying a chosen percentage (for example 50% or 100%) to your nominated partner for their lifetime.',
      },
      {
        q: 'Can my partner inherit drawdown funds?',
        a: 'Yes, in many cases. Beneficiaries may inherit remaining drawdown funds, with tax treatment depending on your age at death and how they take the money. Keep nomination forms up to date.',
      },
      {
        q: 'Do we both need to be the same age?',
        a: 'Annuity quotes usually take both ages into account for joint-life products. Wider age gaps can affect the income offered.',
      },
      {
        q: 'What if we are not married or in a civil partnership?',
        a: 'Some products allow dependants or named beneficiaries, but rules vary. An adviser can help you structure income and nominations appropriately.',
      },
    ],
    accessSteps: [
      {
        text: 'From the retirement options menu, open Spouse / Dependant Income.',
      },
      {
        text: 'Add partner details and the level of continuing income you want illustrated.',
      },
      {
        text: 'Compare joint-life, guarantee period, and drawdown nomination outcomes.',
      },
      {
        text: 'Discuss quotes with your partner and, if helpful, a regulated adviser.',
      },
      {
        text: 'Confirm nominations or annuity selections before your policy starts.',
      },
    ],
    providerCta,
    map: {
      enabled: true,
      label: 'Find a joint-life annuity adviser near you',
      queryTemplate: 'financial adviser joint life annuity pension near {place}',
    },
  },
  {
    featureId: 'av-review',
    benefitId,
    overview:
      'Your retirement needs change. Inflation, health, and family circumstances can all affect how much income you should take. An annual review reminder helps you revisit withdrawal levels, investment mix, and whether annuity or drawdown still suits your plan.',
    includedIntro: 'An annual review covers:',
    includedItems: [
      'Whether your current withdrawal rate is sustainable given markets and your age.',
      'Changes to the State Pension, tax bands, or personal circumstances since last year.',
      'Whether to secure more guaranteed income with an annuity slice.',
      'Updating beneficiary nominations and expression of wish details.',
    ],
    costSummary:
      'Review reminders in this prototype are free. If you appoint an IFA for an annual retirement check, their fee will be agreed separately. Some Aviva products include ongoing servicing. Check your policy documents.',
    faqs: [
      {
        q: 'Why review drawdown every year?',
        a: 'Taking too much too early can deplete your pot; taking too little may affect your lifestyle. Markets and tax rules also shift, so a regular check helps you adjust.',
      },
      {
        q: 'Can I switch from drawdown to an annuity later?',
        a: 'Yes, many people buy an annuity with part of their pot later in retirement when rates or personal needs change. You can also use fixed-term annuities as a stepping stone.',
      },
      {
        q: 'What if I miss my review date?',
        a: 'You can still log in and run illustrations at any time. The annual reminder is a prompt, not a deadline. Regular reviews are still good practice.',
      },
      {
        q: 'Should I combine a provider review with adviser advice?',
        a: 'Provider tools show product-specific information. An IFA can give you a view of all your pensions, investments, and tax planning. That is useful at major life events.',
      },
    ],
    accessSteps: [
      {
        text: 'Turn on annual review reminders in your Aviva retirement account settings.',
      },
      {
        text: 'When prompted, refresh your income needs and essential spending figure.',
      },
      {
        text: 'Run updated sustainability illustrations for your current withdrawal rate.',
      },
      {
        text: 'Adjust withdrawals, fund choices, or income mix if the review suggests it.',
      },
      {
        text: 'Book a check-in with an IFA or Pension Wise if your circumstances have changed materially.',
      },
    ],
    providerCta,
    map: {
      enabled: true,
      label: 'Find an independent financial adviser (IFA)',
      queryTemplate: 'independent financial adviser IFA annual pension review near {place}',
    },
  },
]
