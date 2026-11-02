import type { FeatureDetailContent } from './types'

const providerCta = {
  label: 'Go to Blackhawk Network',
  href: 'https://blackhawknetwork.com',
} as const

export const bhnBikesFeatureDetails: FeatureDetailContent[] = [
  {
    featureId: 'bike-choose',
    benefitId: 'bhn-bikes',
    overview:
      'Pick a cycle-to-work package that fits your commute and budget. You choose a total hire value for your bike and eligible accessories. Your employer runs salary sacrifice through Blackhawk Network, so you spread the cost via payroll instead of paying upfront in the shop.',
    includedIntro: 'A package can include:',
    includedItems: [
      'A new bicycle for your daily journey: road, hybrid, e-bike or folding, within your scheme’s eligible categories.',
      'Safety accessories such as a helmet, lights and a lock, up to the limits set by your employer’s scheme rules.',
      'A clear package value band so you know the maximum hire amount before you visit a retailer or checkout online.',
      'Guidance on minimum and maximum order values, hire period length, and any employer-specific caps.',
    ],
    costSummary:
      'Standard cycle-to-work orders often need no deposit. Your monthly payroll deduction depends on package value, hire period and how your employer structures the benefit, including any employer contribution. Sacrifice comes from gross pay, so you may pay less income tax and National Insurance on that amount. Your take-home pay still drops each month. Exact figures depend on your tax code, salary and scheme setup. Use the payroll estimate before you apply.',
    faqs: [
      {
        q: 'How much can I spend on a bike package?',
        a: 'Your employer sets minimum and maximum package values and may cap e-bike or accessory spend. Check your scheme guide or the value bands when you start an application.',
      },
      {
        q: 'Can I include an e-bike or folding bike?',
        a: 'Many UK cycle-to-work schemes allow e-bikes and folders if they meet safety and supplier rules. Confirm eligible bike types on your scheme before you order.',
      },
      {
        q: 'What if my chosen bike and accessories cost less than my package?',
        a: 'You normally sacrifice only up to the actual order total, within your selected band. Unused headroom in a band may not roll over. Follow your scheme’s rules on final order value.',
      },
      {
        q: 'When does my hire period start?',
        a: 'Hire starts once your employer accepts the order and the retailer confirms dispatch or collection. Payroll deductions usually begin in the next pay cycle after that.',
      },
    ],
    accessSteps: [
      {
        text: 'Sign in to your employer’s cycle benefit portal (powered by Blackhawk Network) or follow the link from HR or benefits.',
      },
      {
        text: 'Review scheme limits: maximum package value, hire length and eligible bike types.',
      },
      {
        text: 'Select a package value band that covers the bike and accessories you want.',
      },
      {
        text: 'Note your application or voucher reference for ordering from a partner retailer.',
      },
      {
        text: 'Complete the retailer order, then return to the portal to confirm delivery or collection if prompted.',
      },
    ],
    providerCta,
    map: {
      enabled: true,
      label: 'Find a bike shop near you',
      queryTemplate: 'bike shop near {place}',
    },
  },
  {
    featureId: 'bike-retailers',
    benefitId: 'bhn-bikes',
    overview:
      'Order your cycle-to-work bike through participating cycle retailers and online partners. Each supplier accepts your scheme voucher or employer approval. The hire agreement sits behind the purchase. You shop as you would normally; payment runs through the benefit, not your card at the till.',
    includedIntro: 'Partner retailers offer:',
    includedItems: [
      'In-store expert fitting and test rides at local independent and national cycle shops on the scheme.',
      'Online checkout with home delivery or click-and-collect, using your scheme reference or e-voucher.',
      'Access to major brands and own-label bikes within your approved package value.',
      'Invoices and order confirmations formatted for your employer’s cycle-to-work administration.',
    ],
    costSummary:
      'Retailers quote the bike and accessories at scheme pricing. Your sacrifice covers the hire value agreed with your employer, not a separate shop finance plan. If you add optional extras above your package cap, you may pay the difference directly to the shop. Delivery charges may apply for online orders unless your scheme includes them. Check at checkout.',
    faqs: [
      {
        q: 'Can I use any bike shop?',
        a: 'You need a retailer registered on your Blackhawk Network cycle scheme. Use the retailer finder in your portal or ask the shop to confirm they accept your employer’s provider before you order.',
      },
      {
        q: 'How do I pay at the till or online?',
        a: 'Present a scheme voucher, employer letter or portal-generated code instead of paying the full amount yourself. The shop invoices the scheme. Payroll deductions follow once the order is approved.',
      },
      {
        q: 'Can I split an order across two retailers?',
        a: 'Most schemes expect one order per application. If you need a bike from one shop and accessories from another, check whether your employer allows a combined package or requires one supplier.',
      },
      {
        q: 'What if the retailer is out of stock?',
        a: 'Choose another model or partner retailer. If you cancel before dispatch, your application can often be amended. After dispatch, returns follow the retailer’s policy and scheme rules.',
      },
    ],
    accessSteps: [
      {
        text: 'Open the retailer directory in your cycle benefit portal.',
      },
      {
        text: 'Filter by postcode for local shops or browse national online partners.',
      },
      {
        text: 'Check opening hours, stock and whether they offer e-bikes or cargo bikes if you need them.',
      },
      {
        text: 'Take your scheme reference to the shop or enter it at online checkout.',
      },
      {
        text: 'Keep your order confirmation. Your employer may need it to start payroll deductions.',
      },
    ],
    providerCta,
    map: {
      enabled: true,
      label: 'Find partner cycle retailers near you',
      queryTemplate: 'bike shop near {place}',
    },
  },
  {
    featureId: 'bike-payroll',
    benefitId: 'bhn-bikes',
    overview:
      'See an illustrative monthly payroll deduction before you commit to a package. The estimate turns your chosen hire value and scheme length into a regular sacrifice amount and shows how that could affect take-home pay.',
    includedIntro: 'The payroll estimate reflects:',
    includedItems: [
      'Total package value (bike plus eligible accessories) spread over your scheme’s hire months.',
      'An indication of salary sacrifice from gross pay, before your employer’s final payroll run.',
      'Optional comparison of approximate tax and National Insurance treatment under a qualifying cycle-to-work arrangement (not personal tax advice).',
      'Any employer contribution or admin fee if your scheme document lists them separately.',
    ],
    costSummary:
      'Figures on screen are estimates only. Your actual deduction may differ if your salary, tax code, pension contributions or hours change, or if your employer rounds payroll. End-of-hire ownership fees are not always included in the monthly estimate. Review end-of-hire options separately. If you leave employment during the hire, remaining balances follow your scheme’s leaver policy.',
    faqs: [
      {
        q: 'Is the monthly amount fixed for the whole hire?',
        a: 'For most schemes the sacrifice stays the same each month for the agreed hire period, unless your pay or scheme terms change.',
      },
      {
        q: 'Does sacrifice reduce my pensionable pay?',
        a: 'That depends on how your employer treats benefits in pay. Check your HR or pension scheme booklet. Some employers calculate pension on pre-sacrifice salary, others on reduced pay.',
      },
      {
        q: 'Will this affect student loan or benefit calculations?',
        a: 'Sacrifice lowers gross pay on your payslip, which can affect means-tested assessments or plan thresholds. Consider your personal circumstances or speak to HR if unsure.',
      },
      {
        q: 'Can I change my package after seeing the estimate?',
        a: 'You can adjust the value band or hire length before your employer approves the final order. After approval, changes may require cancelling and reapplying.',
      },
    ],
    accessSteps: [
      {
        text: 'Open your cycle benefit portal and start or resume an application.',
      },
      {
        text: 'Enter or select your package value and proposed hire period.',
      },
      {
        text: 'Review the illustrative monthly deduction and impact on take-home pay.',
      },
      {
        text: 'Adjust the package or term if you need a lower monthly amount.',
      },
      {
        text: 'Proceed to retailer selection when the estimate works for your budget.',
      },
    ],
    providerCta,
    map: {
      enabled: false,
      label: 'Find cycle benefit support near you',
      queryTemplate: 'bike shop near {place}',
    },
  },
  {
    featureId: 'bike-safety',
    benefitId: 'bhn-bikes',
    overview:
      'Include essential safety kit in your cycle-to-work package. Helmets, lights, reflectors and locks often count as eligible accessories alongside your bike, within the limits your employer sets for the scheme.',
    includedIntro: 'Eligible safety accessories include:',
    includedItems: [
      'CE-marked or UKCA-marked helmets sized for you at a partner retailer.',
      'Front and rear lights (USB rechargeable or battery), plus spare batteries where applicable.',
      'D locks, chain locks or combined lock-and-cable sets rated for urban parking.',
      'High-visibility clothing, mudguards and bells where your scheme treats them as safety or roadworthiness items.',
    ],
    costSummary:
      'Accessory spend counts toward your overall package cap, not as a separate benefit. Some employers limit accessories to a percentage of the bike value or exclude non-safety items such as cycle computers or clothing unless classed as hi-vis. You will not normally pay VAT twice. The hire arrangement covers qualifying goods in one sacrifice total.',
    faqs: [
      {
        q: 'Is a helmet mandatory on the scheme?',
        a: 'UK law does not require helmets for adults, but your employer may strongly recommend one and many retailers will fit a helmet as part of the order. It can be included in the package if within accessory rules.',
      },
      {
        q: 'Can I buy safety kit after I have ordered the bike?',
        a: 'Most schemes require a single combined order per application. Plan lights and locks when you choose the package. Mid-hire top-ups may not be allowed until you start a new agreement.',
      },
      {
        q: 'Are e-bike-specific locks covered?',
        a: 'Yes, if they are sold as part of your order and within cap rules. Check weight and rating guidance for e-bikes and long-term workplace parking.',
      },
      {
        q: 'Do accessories transfer if I return the bike?',
        a: 'During the hire, the bike and included accessories belong to the scheme owner. End-of-hire transfer options apply to the whole package. See end-of-hire options for ownership fees.',
      },
    ],
    accessSteps: [
      {
        text: 'When building your order, browse the accessories section at your chosen retailer.',
      },
      {
        text: 'Add helmet, lights and a lock that meet your commute and parking needs.',
      },
      {
        text: 'Check the running total stays within your package value and accessory limits.',
      },
      {
        text: 'Ask staff to fit lights and adjust your helmet if you collect in store.',
      },
      {
        text: 'Register lock keys and note serial numbers for insurance or theft claims.',
      },
    ],
    providerCta,
    map: {
      enabled: true,
      label: 'Find cycle shops for helmets and locks',
      queryTemplate: 'bike shop near {place}',
    },
  },
  {
    featureId: 'bike-ownership',
    benefitId: 'bhn-bikes',
    overview:
      'At the end of the hire period you can take ownership of the bike and included accessories by paying a final transfer fee. UK cycle-to-work schemes hire the bike to you first. Ownership is a separate step under HMRC guidance and your employer’s scheme rules.',
    includedIntro: 'End-of-hire options include:',
    includedItems: [
      'Transfer of ownership after the last payroll deduction, for a fair market value or fixed fee set by the scheme.',
      'Extension of the hire for a further period if you are not ready to buy or your employer offers a rollover.',
      'Return of the bike to the scheme owner in rare cases where transfer is not chosen (subject to condition checks and charges).',
      'Clear documentation of the bike serial number and hire end date for your records and insurance.',
    ],
    costSummary:
      'The ownership fee is separate from your monthly sacrifice and is typically a modest percentage of the original package value, depending on hire length and scheme valuation method. Paying it makes the bike yours outright. Until then, the scheme owner holds title and you use the bike as a hire benefit. Insurance for theft or damage during hire may be your responsibility unless your employer provides cover. Check your scheme booklet.',
    faqs: [
      {
        q: 'Do I automatically own the bike when the hire ends?',
        a: 'Not always. Most schemes require you to accept the transfer and pay the ownership fee (or have it collected via payroll). If you do nothing, your employer’s default applies. That is often extended hire or return.',
      },
      {
        q: 'How is the transfer fee calculated?',
        a: 'Fees follow HMRC acceptable valuation approaches for cycle schemes, often linked to original value and hire length. Your portal should show the fee before hire ends.',
      },
      {
        q: 'Can I start a new scheme bike while still on a previous hire?',
        a: 'Employers may allow one active agreement per employee or set a cooling-off period. Check whether you must complete ownership transfer on your current bike first.',
      },
      {
        q: 'What happens if I leave my job before the hire finishes?',
        a: 'Leaver terms vary: you may pay remaining hire balances, an early termination fee, or transfer ownership immediately. HR will confirm your employer’s policy.',
      },
    ],
    accessSteps: [
      {
        text: 'Watch for end-of-hire notifications from your cycle benefit portal or HR.',
      },
      {
        text: 'Review the quoted ownership transfer fee and payment method (lump sum or payroll).',
      },
      {
        text: 'Confirm transfer if you want to keep the bike; sign any declaration your employer requires.',
      },
      {
        text: 'Update home or contents insurance once you own the bike outright.',
      },
      {
        text: 'If you prefer not to transfer, follow return or extension instructions before the hire end date.',
      },
    ],
    providerCta,
    map: {
      enabled: false,
      label: 'Find cycle scheme administration near you',
      queryTemplate: 'bike shop near {place}',
    },
  },
  {
    featureId: 'bike-support',
    benefitId: 'bhn-bikes',
    overview:
      'Get help with applications, retailer orders, payroll queries and end-of-hire paperwork. Scheme support connects you with Blackhawk Network’s cycle benefit team and your employer’s HR or benefits administrators.',
    includedIntro: 'Support can help with:',
    includedItems: [
      'Lost vouchers, expired codes or retailer checkout errors before your order ships.',
      'Payroll deduction amounts that do not match your approved package.',
      'Changes of address, name or employer details linked to an active hire.',
      'End-of-hire transfer, returns and leaver scenarios when you move role or leave the company.',
    ],
    costSummary:
      'General scheme support is included in your employer’s benefit setup. Third-party costs (retailer repair fees outside warranty, insurance excess or express delivery) are not covered by support itself. They remain your responsibility unless your scheme explicitly includes them.',
    faqs: [
      {
        q: 'Who do I contact first, HR or Blackhawk Network?',
        a: 'Use the portal’s help centre for order and voucher issues. Contact HR for payroll, leaver processes or policy questions specific to your employer.',
      },
      {
        q: 'How long do order approvals take?',
        a: 'Many employers approve within a few working days. Peak periods (spring and summer) can take longer. Support can chase status if you have a confirmed retailer reservation.',
      },
      {
        q: 'Can support amend my retailer order after submission?',
        a: 'Changes depend on whether the shop has dispatched the bike. Contact support quickly with your order reference. Major changes may require cancelling and reapplying.',
      },
      {
        q: 'Where can I find my scheme rules and hire agreement?',
        a: 'Your portal hosts the employee guide and key terms. HR can provide your employer’s summary or full participation agreement.',
      },
    ],
    accessSteps: [
      {
        text: 'Open the Help or Contact section in your cycle benefit portal.',
      },
      {
        text: 'Search FAQs for orders, payroll or end-of-hire.',
      },
      {
        text: 'Raise a ticket with your application or order reference if you still need help.',
      },
      {
        text: 'Copy your HR or benefits team if the query involves pay, tax or leaving employment.',
      },
      {
        text: 'Keep screenshots of error messages or retailer emails to speed up investigation.',
      },
    ],
    providerCta,
    map: {
      enabled: false,
      label: 'Find local cycle benefit help',
      queryTemplate: 'bike shop near {place}',
    },
  },
]
