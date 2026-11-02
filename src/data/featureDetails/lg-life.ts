import type { FeatureDetailContent } from './types'

export const lgLifeFeatureDetails: FeatureDetailContent[] = [
  {
    featureId: 'life-sum',
    benefitId: 'lg-life',
    overview:
      'Your sum assured is the lump sum Legal & General would pay to your beneficiaries if you die while covered under the scheme. It is set as a multiple of your pensionable or basic salary, within minimum and maximum limits your employer chooses.',
    includedIntro: 'On your cover summary you should see:',
    includedItems: [
      'Your current sum assured and how it is calculated (for example, a multiple of salary).',
      'Scheme minimum and maximum cover limits, and any age-related reductions if they apply.',
      'Whether cover continues during sick leave, parental leave, or other absences under employer rules.',
      'How voluntary top-up cover, if you have it, adds to your overall death-in-service benefit.',
    ],
    costSummary:
      'Core death-in-service cover is funded by your employer as a scheme benefit. If you elect optional top-up cover, the extra premium is deducted from your pay through payroll. You can only change your sum assured at enrolment or during a life event window. Check your employer’s scheme rules for dates.',
    faqs: [
      {
        q: 'How is my sum assured worked out?',
        a: 'Most schemes express cover as a multiple of salary (for example, three or four times pensionable earnings). Your employer and scheme booklet define which earnings count and any caps that apply.',
      },
      {
        q: 'Can I increase my cover after I have joined?',
        a: 'You may be able to during annual enrolment, a promotion, or another qualifying life event. Increases can be subject to evidence of health or scheme limits, so check what your employer allows.',
      },
      {
        q: 'Does my sum assured reduce as I get older?',
        a: 'Some schemes reduce cover from a certain age, or cap the multiple for higher earners. Your policy schedule or member summary should show if any age banding applies to you.',
      },
      {
        q: 'What happens to my cover if I leave the company?',
        a: 'Death-in-service cover ends when your employment ends, unless your employer offers continuation or conversion options. Leaving does not automatically transfer this benefit to a personal policy.',
      },
    ],
    accessSteps: [
      {
        text: 'Ask HR which benefits portal or pension/life member area to use if you are unsure.',
      },
      {
        text: 'Open your Legal & General Life Assurance or death-in-service summary.',
      },
      {
        text: 'Review your current sum assured, salary basis, and any top-up amounts shown.',
      },
      {
        text: 'To change cover, follow the enrolment or life event process when the scheme allows it, or contact HR for the next window.',
      },
    ],
    providerCta: {
      label: 'Go to Legal & General',
      href: 'https://www.legalandgeneral.com',
    },
    map: {
      enabled: false,
      label: 'Find cover information near you',
      queryTemplate: 'employer life assurance office near {place}',
    },
  },
  {
    featureId: 'life-beneficiaries',
    benefitId: 'lg-life',
    overview:
      'Beneficiaries are the people or organisations you nominate to receive the life assurance lump sum if you die in service. Update nominations when your circumstances change so the lump sum can go to the people you chose without delay.',
    includedIntro: 'Nomination arrangements on your scheme cover:',
    includedItems: [
      'Named individuals (such as a partner, spouse, or children) and the share each should receive.',
      'Trust or expression-of-wish forms where the scheme pays through a discretionary trust.',
      'What happens if a named beneficiary dies before you. The share may pass to remaining nominees or your estate.',
      'How to update nominations after marriage, divorce, or other life changes.',
    ],
    costSummary:
      'There is no separate charge to nominate or change beneficiaries on a typical employer life assurance scheme. If you use a solicitor to set up a trust or will alongside your nomination, their fees are separate from the scheme.',
    faqs: [
      {
        q: 'Is a beneficiary nomination the same as my will?',
        a: 'Not always. A nomination tells the scheme trustees or insurer who you would like to receive the lump sum. Your will governs your wider estate. Many people align both, but you should take advice if your situation is complex.',
      },
      {
        q: 'Can I nominate more than one person?',
        a: 'Yes. You can usually split the benefit by percentage between several beneficiaries. Make sure the shares add up to 100%.',
      },
      {
        q: 'What if I do not nominate anyone?',
        a: 'If there is no valid nomination, scheme trustees or the insurer pay according to scheme rules. That is often to your estate or dependants, and payment can take longer.',
      },
      {
        q: 'How do I change my beneficiaries?',
        a: 'Complete a new nomination or expression-of-wish form through your employer benefits portal or HR, or use the Legal & General member process your scheme directs you to. Changes take effect once the scheme accepts them.',
      },
    ],
    accessSteps: [
      {
        text: 'Log in to your employer benefits or Legal & General member portal (as directed by HR).',
      },
      {
        text: 'Open the beneficiaries or nomination section for your life assurance cover.',
      },
      {
        text: 'Review current names, shares, and the date of your last update.',
      },
      {
        text: 'Submit an updated nomination form if your circumstances have changed.',
      },
    ],
    providerCta: {
      label: 'Go to Legal & General',
      href: 'https://www.legalandgeneral.com',
    },
    map: {
      enabled: false,
      label: 'Find beneficiary support near you',
      queryTemplate: 'estate planning advice near {place}',
    },
  },
  {
    featureId: 'life-topup',
    benefitId: 'lg-life',
    overview:
      'Voluntary top-up lets you buy extra death-in-service cover above the core level your employer provides, within scheme maximums. You pay for the additional sum assured through payroll when your employer offers this option through Legal & General.',
    includedIntro: 'Where top-up is available:',
    includedItems: [
      'An extra multiple of salary or a fixed lump sum on top of core employer-paid cover.',
      'Premiums deducted through payroll, with tax treatment consistent with your scheme’s arrangement.',
      'Evidence of health or acceptance limits for higher amounts, in line with insurer underwriting rules.',
      'The same beneficiary and claims process as your main life assurance benefit.',
    ],
    costSummary:
      'You pay the premium for voluntary top-up cover via monthly salary deduction. The cost depends on your age, the extra sum assured, and scheme rates. Core employer-funded cover stays separate. Stopping top-up reduces only the voluntary portion.',
    faqs: [
      {
        q: 'Do I have to take voluntary top-up?',
        a: 'No. It is optional where your employer offers it. Core cover may already meet your needs; top-up is for members who want a higher lump sum within scheme limits.',
      },
      {
        q: 'Will I need a medical questionnaire?',
        a: 'Higher levels of extra cover may require health questions or a GP report. Smaller increases within automatic acceptance limits may not.',
      },
      {
        q: 'Can I cancel top-up cover later?',
        a: 'Most schemes let you reduce or cancel voluntary cover at defined times, such as annual enrolment. Immediate cancellation rules vary. Check your scheme booklet.',
      },
      {
        q: 'Does top-up cover continue if I am on sick leave?',
        a: 'Cover often continues while you remain an employee and premiums continue, but employer and policy rules differ. Confirm with HR if you are on long-term absence.',
      },
    ],
    accessSteps: [
      {
        text: 'Check whether your employer offers voluntary life top-up in the benefits catalogue or enrolment guide.',
      },
      {
        text: 'In the benefits portal, select Legal & General Life Assurance top-up if it appears.',
      },
      {
        text: 'Choose your additional cover level and review the payroll deduction quote.',
      },
      {
        text: 'Confirm your election during an open enrolment window or after HR confirms you qualify.',
      },
    ],
    providerCta: {
      label: 'Go to Legal & General',
      href: 'https://www.legalandgeneral.com',
    },
    map: {
      enabled: false,
      label: 'Find enrolment support near you',
      queryTemplate: 'employee benefits HR office near {place}',
    },
  },
  {
    featureId: 'life-illness',
    benefitId: 'lg-life',
    overview:
      'Some employer arrangements offer critical illness cover alongside life assurance, or signpost you to related Legal & General products. Critical illness pays a lump sum on diagnosis of specified serious conditions while you are alive, not on death. Policy definitions set what counts.',
    includedIntro: 'If critical illness is linked to your scheme, look for:',
    includedItems: [
      'A list of covered conditions (such as certain cancers, heart attack, or stroke) and survival or severity criteria.',
      'Whether cover is employer-paid, voluntary, or available as a separate election.',
      'How critical illness interacts with your death-in-service sum assured (they are separate benefits).',
      'Exclusions, waiting periods, and children’s cover if included in your employer’s package.',
    ],
    costSummary:
      'Employer-funded critical illness, if included, is paid by the scheme. Voluntary critical illness is paid by you through payroll. Premiums rise with age and cover amount. Life assurance and critical illness claims are assessed under different policy rules.',
    faqs: [
      {
        q: 'Is critical illness the same as life assurance?',
        a: 'No. Life assurance pays when you die (while covered). Critical illness pays if you are diagnosed with a defined serious illness and meet policy conditions, while you are alive.',
      },
      {
        q: 'Does my employer scheme include critical illness automatically?',
        a: 'Many death-in-service schemes are life-only. Your benefits summary will show whether critical illness is bundled, optional, or not offered. You may need to elect it separately.',
      },
      {
        q: 'What illnesses are covered?',
        a: 'Policies use a standard list of conditions with medical definitions. Pre-existing conditions and some early-stage diagnoses may be excluded. Read the scheme definitions or member booklet.',
      },
      {
        q: 'Can I claim critical illness and still have life cover?',
        a: 'Yes. A critical illness payment does not cancel your life assurance, unless your policy booklet says otherwise for a specific combined product.',
      },
    ],
    accessSteps: [
      {
        text: 'Open your Legal & General or employer benefits summary for life and optional illness cover.',
      },
      {
        text: 'Read which critical illness benefits apply to you and whether they are core or voluntary.',
      },
      {
        text: 'Download condition definitions and exclusions from policy documents if you are considering cover.',
      },
      {
        text: 'Elect or change voluntary critical illness during enrolment if your scheme offers it.',
      },
    ],
    providerCta: {
      label: 'Go to Legal & General',
      href: 'https://www.legalandgeneral.com',
    },
    map: {
      enabled: false,
      label: 'Find health advice near you',
      queryTemplate: 'GP surgery near {place}',
    },
  },
  {
    featureId: 'life-claims',
    benefitId: 'lg-life',
    overview:
      'If you die in service, your beneficiaries or your employer notify Legal & General to start a death-in-service claim. The insurer checks scheme eligibility, validates nominations, and pays the lump sum when the claim is agreed.',
    includedIntro: 'Claims support covers:',
    includedItems: [
      'Who can notify the insurer (employer HR, family, or executors) and which forms are required.',
      'Documents often needed: death certificate, nomination form, and employer confirmation of active membership.',
      'How trustees handle discretionary schemes versus simple insurer-paid benefits.',
      'How payments are made to beneficiaries once a complete claim is agreed. Straightforward cases are often settled within a few weeks.',
    ],
    costSummary:
      'There is no fee to beneficiaries for making a death-in-service claim under the scheme. Legal or financial advice, if you choose to use it, is paid separately. The lump sum itself is generally free of income tax when paid through a registered employer life assurance arrangement, but personal tax advice may still be useful.',
    faqs: [
      {
        q: 'Who should report a death to start a claim?',
        a: 'Often the employer’s HR or pensions team notifies Legal & General first. Beneficiaries can also contact the insurer using the claims number on the scheme booklet once they have the death certificate.',
      },
      {
        q: 'How long do claims take?',
        a: 'Straightforward claims with complete paperwork are often settled within a few weeks. Complex cases, missing nominations, or trustee decisions can take longer.',
      },
      {
        q: 'What if the nomination is out of date?',
        a: 'Trustees or the insurer follow scheme rules, which may mean paying dependants or the estate. Payment can take longer while they confirm who should receive the benefit.',
      },
      {
        q: 'Is the lump sum taxable?',
        a: 'Death-in-service benefits through registered employer schemes are usually paid free of income tax to beneficiaries, subject to HMRC and scheme rules. Inheritance tax may apply in some estates. Seek advice if unsure.',
      },
    ],
    accessSteps: [
      {
        text: 'In a bereavement, contact the deceased’s employer HR or pensions team as soon as practical. They often start the notification.',
      },
      {
        text: 'Gather the death certificate and any nomination or expression-of-wish documentation.',
      },
      {
        text: 'Call or write to Legal & General using the scheme claims contact on the member booklet or employer intranet.',
      },
      {
        text: 'Complete the claim form and return any trustee or employer sections required. Follow up if beneficiaries need payment status.',
      },
    ],
    providerCta: {
      label: 'Go to Legal & General',
      href: 'https://www.legalandgeneral.com',
    },
    map: {
      enabled: true,
      label: 'Find bereavement and claims support near you',
      queryTemplate: 'bereavement support services near {place}',
    },
  },
  {
    featureId: 'life-docs',
    benefitId: 'lg-life',
    overview:
      'Policy documents set out how your Legal & General life assurance works under the employer scheme: cover levels, definitions, exclusions, and how to nominate beneficiaries or make a claim. Keep them where you and your family can find them.',
    includedIntro: 'Document libraries and HR packs include:',
    includedItems: [
      'The scheme booklet or policy schedule showing sum assured basis and any age reductions.',
      'Trust deed or nomination guidance for discretionary death-in-service arrangements.',
      'Critical illness definitions and exclusions, if that cover applies to you.',
      'Claims contact details, forms, and employer-specific enrolment or top-up rules.',
    ],
    costSummary:
      'Scheme booklets and member documents are provided at no extra charge. Printed copies may be available from HR; most members use the online document library.',
    faqs: [
      {
        q: 'Where do I find my latest policy documents?',
        a: 'Check your employer benefits portal, HR document library, or Legal & General member site linked from your enrolment materials. Documents may update each scheme year.',
      },
      {
        q: 'Which document shows my personal sum assured?',
        a: 'Your individual benefit statement or payslip deduction summary usually shows your cover level; the scheme booklet explains how multiples and limits work for everyone on the scheme.',
      },
      {
        q: 'Can I share documents with my partner or adviser?',
        a: 'Yes. Many members download the booklet and nomination forms for their records or for a financial adviser. Do not share login credentials. Use downloaded PDFs instead.',
      },
      {
        q: 'What if my document version looks out of date?',
        a: 'Ask HR for the current scheme year booklet or log in again to the document centre. Rely on the latest version published for your employer’s arrangement.',
      },
    ],
    accessSteps: [
      {
        text: 'From your enrolment email or HR pack, open the link to the benefits portal or Legal & General document library.',
      },
      {
        text: 'Open Life Assurance, death-in-service, or scheme documents for your employer.',
      },
      {
        text: 'Download the scheme booklet, trust information, and any personal benefit statement available.',
      },
      {
        text: 'Store copies securely and tell your nominated beneficiaries where to find claims contacts.',
      },
    ],
    providerCta: {
      label: 'Go to Legal & General',
      href: 'https://www.legalandgeneral.com',
    },
    map: {
      enabled: false,
      label: 'Find document support near you',
      queryTemplate: 'employer HR office near {place}',
    },
  },
]
