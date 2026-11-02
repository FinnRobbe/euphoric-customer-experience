export type BenefitCategory = 'Insurance' | 'Retirement' | 'Leisure & Misc.'

export interface BenefitFeature {
  id: string
  name: string
  description: string
}

export interface BenefitDetail {
  id: string
  category: BenefitCategory
  provider: string
  title: string
  cardDescription: string
  headerColor: string
  washColor: string
  logoText: string
  logoSrc: string
  monthlyEmployeeCostGbp: number
  excessLabel: string
  hospitalOrScope: string
  employerContributionGbp: number
  overview: string[]
  features: BenefitFeature[]
  isPmi: boolean
  manageLabel: string
}

/** Non-PMI benefits only. PMI (AXA / Bupa / Vitality) loads from public/data/pmi-plans.csv */
export const benefitsCatalog: BenefitDetail[] = [
  {
    id: 'lg-pension',
    category: 'Retirement',
    provider: 'Legal & General',
    title: 'Workplace Pension',
    cardDescription:
      'Employer tops up the pension. Contribution rate and funds are chosen here.',
    headerColor: '#d1d5db',
    washColor: '#eef0f3',
    logoText: 'L&G',
    logoSrc: '/logos/legal-general.svg',
    monthlyEmployeeCostGbp: 0,
    excessLabel: 'salary sacrifice available',
    hospitalOrScope: 'Investment funds',
    employerContributionGbp: 120,
    overview: [
      'Legal & General’s Workplace Pension builds retirement savings with employer contributions each month. Contribution rate and funds are set here. L&G is a major UK workplace pension provider used widely in employer schemes.',
      'Projected outcomes follow employer scheme rules. This prototype covers contribution level, investment style, and expression of wish.',
    ],
    features: [
      {
        id: 'lg-contrib',
        name: 'Employee Contributions',
        description: 'Choose how much of your salary goes into the pension each month.',
      },
      {
        id: 'lg-employer',
        name: 'Employer Matching',
        description: 'See how much your employer adds to your pot each month.',
      },
      {
        id: 'lg-funds',
        name: 'Investment Fund Choices',
        description: 'Select default lifestyle funds or self-select options.',
      },
      {
        id: 'lg-wish',
        name: 'Expression of Wish',
        description: 'Nominate who should receive benefits if you die before retirement.',
      },
      {
        id: 'lg-projections',
        name: 'Retirement Projections',
        description: 'Illustrative forecasts based on your current contribution path.',
      },
      {
        id: 'lg-consolidation',
        name: 'Transfer Guidance',
        description: 'Information on consolidating previous pensions (prototype stub).',
      },
    ],
    isPmi: false,
    manageLabel: 'Manage your pension',
  },
  {
    id: 'aviva-retirement',
    category: 'Retirement',
    provider: 'Aviva',
    title: 'Retirement Income Options',
    cardDescription:
      'When you leave work, see how to turn your pension savings into income on this page.',
    headerColor: '#fde047',
    washColor: '#fff8d6',
    logoText: 'Aviva',
    logoSrc: '/logos/aviva.svg',
    monthlyEmployeeCostGbp: 0,
    excessLabel: 'advice pathway',
    hospitalOrScope: 'Annuity & drawdown options',
    employerContributionGbp: 0,
    overview: [
      'Aviva’s retirement options turn pension savings into income — drawdown, annuity-style choices, and hybrids in one guided view. Aviva is a large UK insurer many people already know from savings and protection products.',
      'Drawdown stays invested and flexible. Annuities pay a fixed income for life. This prototype explores the main pathways only.',
    ],
    features: [
      {
        id: 'av-drawdown',
        name: 'Flexible Drawdown',
        description: 'Take variable income while keeping funds invested.',
      },
      {
        id: 'av-annuity',
        name: 'Annuity Options',
        description: 'Secure a regular income for life or a fixed term.',
      },
      {
        id: 'av-taxfree',
        name: 'Tax-free Cash',
        description: 'Guidance on taking a tax-free lump sum when you qualify.',
      },
      {
        id: 'av-advice',
        name: 'Guided Journey',
        description: 'Step-by-step prompts to compare income strategies.',
      },
      {
        id: 'av-spouse',
        name: 'Spouse / Dependant Income',
        description: 'Options that continue income for a partner after death.',
      },
      {
        id: 'av-review',
        name: 'Annual Review',
        description: 'Reminders to review your income each year.',
      },
    ],
    isPmi: false,
    manageLabel: 'Manage retirement options',
  },
  {
    id: 'lg-life',
    category: 'Retirement',
    provider: 'Legal & General',
    title: 'Life Assurance Cover',
    cardDescription:
      'Life cover paid as a lump sum to your beneficiaries if you die in service.',
    headerColor: '#e5e7eb',
    washColor: '#f3f4f6',
    logoText: 'L&G',
    logoSrc: '/logos/legal-general.svg',
    monthlyEmployeeCostGbp: 8,
    excessLabel: 'multiple of salary',
    hospitalOrScope: 'Death-in-service benefit',
    employerContributionGbp: 15,
    overview: [
      'Legal & General life cover pays a lump sum to nominated beneficiaries on death in service, usually as a multiple of salary. L&G is a major UK life and pensions provider common on employer schemes.',
      'Sum assured, nominations, and optional top-ups follow employer rules.',
    ],
    features: [
      {
        id: 'life-sum',
        name: 'Sum Assured',
        description: 'Pick a cover multiple of salary up to your scheme cap.',
      },
      {
        id: 'life-beneficiaries',
        name: 'Beneficiaries',
        description: 'Nominate who should receive the lump sum.',
      },
      {
        id: 'life-topup',
        name: 'Voluntary Top-up',
        description: 'Buy extra cover through payroll if your employer offers it.',
      },
      {
        id: 'life-illness',
        name: 'Linked Critical Illness',
        description: 'Information on related critical illness options if available.',
      },
      {
        id: 'life-claims',
        name: 'Claims Support',
        description: 'How beneficiaries start a claim and what to expect on timing.',
      },
      {
        id: 'life-docs',
        name: 'Policy Documents',
        description: 'Access scheme booklet and definitions (prototype stub).',
      },
    ],
    isPmi: false,
    manageLabel: 'Manage life cover',
  },
  {
    id: 'bhn-bikes',
    category: 'Leisure & Misc.',
    provider: 'Blackhawk Network',
    title: 'Discounted bikes, accessories and parts',
    cardDescription:
      'Cycle to work style savings on bikes and accessories through payroll.',
    headerColor: '#86efac',
    washColor: '#eafff2',
    logoText: 'BHN',
    logoSrc: '/logos/blackhawk.svg',
    monthlyEmployeeCostGbp: 35,
    excessLabel: 'hire period applies',
    hospitalOrScope: 'Cycle to work scheme',
    employerContributionGbp: 0,
    overview: [
      'Blackhawk Network runs this cycle-to-work style scheme — bikes and accessories via salary sacrifice and hire, with ownership at the end of the hire period subject to scheme rules. BHN specialises in employee lifestyle and retail benefits.',
      'Retailers, package value, and estimated payroll deduction are shown before confirm.',
    ],
    features: [
      {
        id: 'bike-choose',
        name: 'Choose a Bike Package',
        description: 'Select a value band for bike and safety accessories.',
      },
      {
        id: 'bike-retailers',
        name: 'Partner Retailers',
        description: 'Redeem with participating cycle shops and online partners.',
      },
      {
        id: 'bike-payroll',
        name: 'Payroll Deduction Estimate',
        description: 'See illustrative monthly cost before you apply.',
      },
      {
        id: 'bike-safety',
        name: 'Safety Accessories',
        description: 'Helmets, lights and locks can be included in many packages.',
      },
      {
        id: 'bike-ownership',
        name: 'End-of-hire Options',
        description: 'Understand ownership transfer at the end of the hire period.',
      },
      {
        id: 'bike-support',
        name: 'Scheme Support',
        description: 'FAQs and contact routes for order issues (prototype stub).',
      },
    ],
    isPmi: false,
    manageLabel: 'Manage cycle benefit',
  },
  {
    id: 'pen-travel',
    category: 'Leisure & Misc.',
    provider: 'Pen Underwriting',
    title: 'Annual Leisure Travel Insurance',
    cardDescription:
      'Worldwide leisure travel cover for medical emergencies and trip disruption.',
    headerColor: '#f3f4f6',
    washColor: '#f7f8fa',
    logoText: 'Pen',
    logoSrc: '/logos/pen.svg',
    monthlyEmployeeCostGbp: 6,
    excessLabel: 'per-claim excess applies',
    hospitalOrScope: 'Worldwide leisure travel',
    employerContributionGbp: 4,
    overview: [
      'Annual leisure travel cover from Pen Underwriting for worldwide trips — medical emergencies and trip disruption for the policy year. Pen underwrites specialist travel and niche insurance for employer schemes.',
      'Destination scope, winter sports, and family cover can be personalised when offered.',
    ],
    features: [
      {
        id: 'travel-medical',
        name: 'Emergency Medical Cover',
        description: 'Medical treatment abroad for sudden illness or injury.',
      },
      {
        id: 'travel-cancel',
        name: 'Cancellation & Curtailment',
        description: 'Help if you must cancel or cut short a trip for covered reasons.',
      },
      {
        id: 'travel-baggage',
        name: 'Baggage & Belongings',
        description: 'Cover for lost, stolen or damaged personal items within limits.',
      },
      {
        id: 'travel-winter',
        name: 'Winter Sports Add-on',
        description: 'Optional cover for winter sports activities.',
      },
      {
        id: 'travel-family',
        name: 'Family Cover',
        description: 'Add your partner and children when your employer allows it.',
      },
      {
        id: 'travel-docs',
        name: 'Policy Wording',
        description: 'Prototype link to full terms and exclusions.',
      },
    ],
    isPmi: false,
    manageLabel: 'Manage travel cover',
  },
  {
    id: 'chubb-accident',
    category: 'Leisure & Misc.',
    provider: 'Chubb',
    title: 'Personal accident insurance',
    cardDescription:
      'Compensation for accidental injury, including fractures and hospitalisation.',
    headerColor: '#fda4af',
    washColor: '#ffe8eb',
    logoText: 'Chubb',
    logoSrc: '/logos/chubb.svg',
    monthlyEmployeeCostGbp: 5,
    excessLabel: 'schedule of benefits',
    hospitalOrScope: '24/7 worldwide accidents',
    employerContributionGbp: 3,
    overview: [
      'Chubb personal accident pays cash benefits for covered accidental injury per the schedule of benefits. Chubb is a global specialty insurer often used for accident and travel-style workplace cover.',
      'Benefit amounts, extensions, and who the employer covers can be reviewed here.',
    ],
    features: [
      {
        id: 'pa-fracture',
        name: 'Fracture Benefits',
        description: 'Fixed payments for covered fractures per the schedule.',
      },
      {
        id: 'pa-hospital',
        name: 'Hospitalisation Cash',
        description: 'Daily cash if you are hospitalised after an accident.',
      },
      {
        id: 'pa-disability',
        name: 'Disability Benefits',
        description: 'Lump sums for permanent disability as defined in the policy.',
      },
      {
        id: 'pa-worldwide',
        name: 'Worldwide Cover',
        description: 'Protection applies 24/7, including away from work.',
      },
      {
        id: 'pa-family',
        name: 'Family Extension',
        description: 'Cover your partner and children if the extension is available.',
      },
      {
        id: 'pa-claims',
        name: 'How to Claim',
        description: 'Steps to notify Chubb and submit evidence (prototype stub).',
      },
    ],
    isPmi: false,
    manageLabel: 'Manage accident cover',
  },
]

export function getCatalogBenefitById(id: string): BenefitDetail | undefined {
  return benefitsCatalog.find((b) => b.id === id)
}

/** @deprecated Prefer usePlanState().getBenefit — PMI is no longer in this catalog */
export function getBenefitById(id: string): BenefitDetail | undefined {
  return getCatalogBenefitById(id)
}
