import type { FeatureDetailContent } from './types'

const penProviderCta = {
  label: 'Go to Pen Underwriting',
  href: 'https://www.penunderwriting.co.uk',
} as const

export const penTravelFeatureDetails: FeatureDetailContent[] = [
  {
    featureId: 'travel-medical',
    benefitId: 'pen-travel',
    overview:
      'If you fall ill or have an accident on a leisure trip abroad, this part of your policy helps pay for emergency treatment, hospital stays, and getting you home when that is medically necessary. Call the 24-hour emergency assistance line before you commit to private treatment if your policy requires it.',
    includedIntro: 'Emergency medical cover includes:',
    includedItems: [
      'Reasonable and necessary private medical treatment for sudden illness or injury while you are away on a covered trip.',
      'Emergency dental treatment for pain relief, subject to the policy limit shown in your schedule.',
      'In-patient and out-patient costs when treatment cannot wait until you return to the UK.',
      'Medical repatriation or evacuation to the UK when recommended by the assistance team and agreed under your policy.',
      'Reasonable additional travel and accommodation costs for one person to stay with you if you are hospitalised abroad, within policy limits.',
    ],
    costSummary:
      'Your schedule sets the medical expenses limit and any per-claim excess. You may pay upfront abroad and claim back, or the assistance team may arrange direct settlement with hospitals where they can. Pre-existing conditions count only if you declared them and they were accepted, or your wording says otherwise. Routine care, cosmetic work, and costs you could reasonably avoid are not covered.',
    faqs: [
      {
        q: 'What should I do first in a medical emergency abroad?',
        a: 'Contact the 24-hour emergency assistance number on your policy documents as soon as you can. They can guide you to appropriate care, confirm what is covered, and help with repatriation if needed.',
      },
      {
        q: 'Are pre-existing medical conditions covered?',
        a: 'Only if they are declared when you take out or renew cover and accepted by the insurer, or if your policy automatically covers them under its terms. Always check your schedule and wording before you travel.',
      },
      {
        q: 'Can I choose any hospital or doctor?',
        a: 'You should follow the assistance team’s advice where your policy requires it. Treatment must be reasonable and necessary for your emergency; elective or non-urgent care is not covered.',
      },
      {
        q: 'Does this cover me in the UK?',
        a: 'Annual leisure travel policies are for trips away from your home country. Emergency treatment in the UK during a trip may be excluded or limited. Check your policy wording for territorial limits.',
      },
    ],
    accessSteps: [
      {
        text: 'Save your policy number and the 24-hour emergency assistance number on your phone and in hand luggage.',
      },
      {
        text: 'In an emergency, call the assistance line before arranging private treatment if your policy asks you to.',
      },
      {
        text: 'Ask for a detailed medical report and itemised receipts for any treatment you pay yourself.',
      },
      {
        text: 'Send your claim to Pen Underwriting or your scheme administrator with the forms and supporting documents.',
      },
      {
        text: 'For non-urgent questions before you travel, read your schedule or contact your benefits team or Pen Underwriting.',
        href: 'www.penunderwriting.co.uk',
      },
    ],
    providerCta: penProviderCta,
    map: {
      enabled: true,
      label: 'Find travel clinics or pharmacies near you',
      queryTemplate: 'travel clinic pharmacy near {place}',
    },
  },
  {
    featureId: 'travel-cancel',
    benefitId: 'pen-travel',
    overview:
      'If you have to cancel before you go for a reason your policy covers, you can claim back unused travel and accommodation costs. If you cut a trip short for a covered reason, curtailment cover can help with reasonable extra costs to get home.',
    includedIntro: 'Cancellation and curtailment can help with:',
    includedItems: [
      'Non-refundable flights, package elements, or accommodation you paid for before the trip, up to the policy limit.',
      'Curtailment costs to return home early when a covered event makes continuing the trip unreasonable.',
      'Certain prepaid excursions or events that you cannot use because of a covered cancellation or curtailment.',
      'Cover applies only when cancellation or curtailment is necessary for reasons listed in your policy. Examples include serious illness, injury, or death of you, a travelling companion, or a close relative, as defined in the wording.',
    ],
    costSummary:
      'Declare the total cost of your trip when your policy asks you to, and stay within any single-trip or annual cancellation limits. An excess usually applies per person or per claim. You cannot claim for costs you recover from your airline, tour operator, or credit card provider. Change of mind, foreseeable events, or reasons not listed in the policy are not covered.',
    faqs: [
      {
        q: 'When should I tell the insurer if I need to cancel?',
        a: 'As soon as you know you must cancel, and before you incur new costs where possible. Keep evidence of the reason for cancellation, such as medical certificates or official notices.',
      },
      {
        q: 'What is the difference between cancellation and curtailment?',
        a: 'Cancellation applies before your trip starts. Curtailment applies when you are already away and have to end the trip early for a covered reason.',
      },
      {
        q: 'Will I get back the full cost of my holiday?',
        a: 'You can claim up to the limit in your schedule and only for eligible, unrecovered expenses. Policy excesses and exclusions will reduce any payment.',
      },
      {
        q: 'Does cover include if my airline cancels the flight?',
        a: 'Airline failure or schedule changes may be treated differently from illness-related cancellation. Check your policy for airline insolvency cover and how it interacts with your ATOL or airline refund rights.',
      },
    ],
    accessSteps: [
      {
        text: 'Before you book, check that your trip dates and total cost fit your policy limits.',
      },
      {
        text: 'If you cancel or cut a trip short, collect proof of the covered reason (for example a GP or hospital letter).',
      },
      {
        text: 'Ask your travel provider first for refunds or credits where you can.',
      },
      {
        text: 'Tell Pen Underwriting or your scheme claims team and fill in the cancellation or curtailment claim form.',
      },
      {
        text: 'Attach invoices, booking confirmations, and any letters showing what you paid and what was refunded.',
      },
    ],
    providerCta: penProviderCta,
    map: {
      enabled: false,
      label: '',
      queryTemplate: '',
    },
  },
  {
    featureId: 'travel-baggage',
    benefitId: 'pen-travel',
    overview:
      'Baggage cover helps if your personal belongings are lost, stolen, or accidentally damaged on a covered trip. It can also pay a limited amount for essentials if your checked-in baggage is delayed by the carrier.',
    includedIntro: 'Baggage and belongings cover includes:',
    includedItems: [
      'Repair or replacement of luggage and personal items lost, stolen, or damaged during the trip, up to the single-item and overall limits in your schedule.',
      'Valuables such as jewellery, cameras, or laptops only where your policy lists them. Sub-limits often apply, with a lower cap than general baggage.',
      'A fixed benefit for emergency purchases if your checked baggage is delayed beyond the waiting period stated in the policy.',
      'Cover applies while belongings are in your possession or in your accommodation, if you take reasonable care and follow security requirements in the wording.',
    ],
    costSummary:
      'Claims are limited by policy caps, single-item limits, and any excess. Wear and tear, unattended items left in public without reasonable care, and items excluded in the wording (such as cash above a small limit or business equipment) are not covered. Theft or loss claims often need a police report or a property irregularity report from the airline.',
    faqs: [
      {
        q: 'What should I do if my bag is lost or stolen?',
        a: 'Report the loss to the local police or carrier as soon as possible and keep the report reference. Notify the assistance or claims team and list what was inside with proof of ownership or purchase where you can.',
      },
      {
        q: 'Are phones and laptops covered?',
        a: 'Often yes, but usually within a lower valuables sub-limit. Check your schedule and consider separate gadget cover if limits are too low for your kit.',
      },
      {
        q: 'Does delayed baggage cover all my shopping?',
        a: 'No. After a minimum delay, you get a fixed emergency allowance for essential clothing and toiletries. It does not replace everything that was in the case.',
      },
      {
        q: 'Can I claim on my home insurance instead?',
        a: 'You may have other insurance, but you cannot recover the same loss twice. Your travel policy may ask whether other cover is available.',
      },
    ],
    accessSteps: [
      {
        text: 'Photograph valuable items and keep receipts or proof of purchase at home.',
      },
      {
        text: 'Use hotel safes and keep bags with you in public places where you can.',
      },
      {
        text: 'Report missing items to the police or airline and get written confirmation.',
      },
      {
        text: 'Fill in a baggage claim form with Pen Underwriting or your scheme administrator.',
      },
      {
        text: 'Include the report reference, travel tickets, and evidence of value for items you claim.',
      },
    ],
    providerCta: penProviderCta,
    map: {
      enabled: false,
      label: '',
      queryTemplate: '',
    },
  },
  {
    featureId: 'travel-winter',
    benefitId: 'pen-travel',
    overview:
      'Standard travel insurance often excludes skiing, snowboarding, and similar winter sports. This add-on extends your policy for medical emergencies while you take part in winter sports listed in the wording. It can also extend relevant parts of cover, such as personal liability or equipment, during your trip.',
    includedIntro: 'When the winter sports extension is active, it covers:',
    includedItems: [
      'Emergency medical treatment for injuries sustained while participating in covered winter sports on recognised pistes or within resort rules.',
      'Personal liability if you accidentally injure someone else or damage their property while skiing or snowboarding, within policy limits.',
      'Loss, theft, or damage to hired or owned ski equipment where your schedule includes equipment cover.',
      'Activities count only if listed in the policy and you follow local safety rules, piste markings, and resort guidance. Off-piste or out-of-bound areas may be excluded unless your wording says otherwise.',
    ],
    costSummary:
      'The winter sports add-on is optional on many schemes and may increase your premium. Cover is limited to the trip dates and destinations on your schedule. Hazardous activities, professional competition, and injuries where alcohol or drugs are involved may be excluded. Confirm the add-on is selected before you travel to a ski resort.',
    faqs: [
      {
        q: 'Do I need the add-on for a ski holiday?',
        a: 'Yes. Without the winter sports extension, a skiing injury may not be covered under emergency medical or other sections. Check that the add-on appears on your certificate before you go.',
      },
      {
        q: 'Is off-piste skiing covered?',
        a: 'Usually only if your policy explicitly includes it and you meet any conditions, such as using a qualified guide. Standard cover is often limited to marked pistes.',
      },
      {
        q: 'Does this cover my own ski pass or lessons?',
        a: 'Unused lift passes or lessons may fall under cancellation sections if you are injured, not under the winter sports add-on itself. Equipment hire may be covered only if equipment cover is included.',
      },
      {
        q: 'Are snowboarding and other snow sports included?',
        a: 'Most policies list which activities count as winter sports. Check the wording for snowboarding, ice skating, and other activities you plan to try.',
      },
    ],
    accessSteps: [
      {
        text: 'On Personalise, select the winter sports add-on if your trip includes skiing or snowboarding.',
      },
      {
        text: 'Check your schedule and certificate show the add-on before you travel.',
      },
      {
        text: 'On resort, follow piste rules and wear recommended safety gear including helmets where advised.',
      },
      {
        text: 'If you are injured on the slopes, call the emergency assistance line and seek local medical help.',
      },
      {
        text: 'Keep hire receipts and equipment details in case you claim for lost or damaged kit.',
      },
    ],
    providerCta: penProviderCta,
    map: {
      enabled: true,
      label: 'Find ski hire near you',
      queryTemplate: 'ski hire near {place}',
    },
  },
  {
    featureId: 'travel-family',
    benefitId: 'pen-travel',
    overview:
      'Family cover extends your annual leisure travel insurance to your partner and dependent children who live with you. They get the same main sections as you: medical, cancellation, baggage, and any optional add-ons you selected. Limits and definitions are on your schedule.',
    includedIntro: 'Family cover includes:',
    includedItems: [
      'Your spouse, civil partner, or partner you live with as if married, when named or eligible under scheme rules.',
      'Dependent children up to the age limit in your policy (often under 18, or under 23 if in full-time education), when travelling with you or as defined in the wording.',
      'Each insured person has their own policy limits and excess; children may share an overall family medical limit depending on the schedule.',
      'Trips must be leisure trips as defined in the policy. Restrictions may apply if family members travel separately or for different purposes.',
    ],
    costSummary:
      'Adding family members can change what you pay through payroll on your employer’s scheme. All travellers must meet eligibility rules, and adults may need to complete medical declarations. Cover does not include every relative. Parents, siblings, and friends need their own policy unless the wording says otherwise.',
    faqs: [
      {
        q: 'Do my children need to travel with me on every trip?',
        a: 'Rules vary. Some annual policies cover children on any leisure trip when the policy is in force; others require them to travel with a named adult. Check your schedule and wording.',
      },
      {
        q: 'Can I add my partner mid-year?',
        a: 'That depends on your employer’s scheme and Pen Underwriting’s rules. Contact your benefits team or the insurer to update who is covered.',
      },
      {
        q: 'Are winter sports included for the whole family?',
        a: 'Only if you select the winter sports add-on and it applies to all insured persons on the certificate. Each person must meet activity and age conditions.',
      },
      {
        q: 'What counts as a dependent child?',
        a: 'Usually your natural, step, or adopted children who live with you and meet the age and education criteria in the policy. Adult children living independently are often excluded.',
      },
    ],
    accessSteps: [
      {
        text: 'In Personalise on your benefits portal, open family cover options for your scheme.',
      },
      {
        text: 'Enter eligible partner and dependent details as your employer or Pen Underwriting requests.',
      },
      {
        text: 'Complete any medical declarations required for adult family members.',
      },
      {
        text: 'Save the schedule listing every named insured person before anyone travels.',
      },
      {
        text: 'Each traveller should carry the emergency assistance number and policy reference abroad.',
      },
    ],
    providerCta: penProviderCta,
    map: {
      enabled: false,
      label: '',
      queryTemplate: '',
    },
  },
  {
    featureId: 'travel-docs',
    benefitId: 'pen-travel',
    overview:
      'Your policy wording and schedule set out the full terms, conditions, exclusions, and limits for your Annual Leisure Travel Insurance. Read them before you travel so you know what is covered, what you must declare, and how to claim.',
    includedIntro: 'Key documents usually include:',
    includedItems: [
      'Policy wording. This is the full legal terms, definitions, exclusions, and claims conditions for your Pen Underwriting travel product.',
      'Policy schedule or certificate. It shows cover dates, destinations or region, limits, excess, named insured persons, and any selected add-ons such as winter sports.',
      'Summary of cover or IPID (Insurance Product Information Document). This is a short overview of main benefits and exclusions required for UK insurance.',
      'Emergency assistance contact details. You will usually find these on a wallet card or the first page of your policy pack.',
    ],
    costSummary:
      'There is no separate charge to read your documents; they are part of your membership. If you upgrade cover, add family members, or select optional extensions, your schedule and what you pay through payroll may change. Your updated documents will reflect that.',
    faqs: [
      {
        q: 'Where do I find my policy wording?',
        a: 'Your employer’s benefits portal or Pen Underwriting should provide a link or PDF to the current wording and your personal schedule. Use the version effective for your policy year.',
      },
      {
        q: 'What is an excess?',
        a: 'It is the amount you pay towards each claim before the insurer pays the rest. Your schedule shows whether excess applies per person, per claim, or per section.',
      },
      {
        q: 'Why do definitions matter?',
        a: 'Words like “close relative”, “trip”, or “unattended” have specific meanings in the policy. They determine whether a claim is valid.',
      },
      {
        q: 'Who do I contact if the wording is unclear?',
        a: 'Contact Pen Underwriting or your HR / benefits team for scheme-specific questions. For complaints, follow the process in your policy documents.',
      },
    ],
    accessSteps: [
      {
        text: 'Sign in to your employer benefits portal or the Pen Underwriting member area.',
        href: 'www.penunderwriting.co.uk',
      },
      {
        text: 'Download your policy wording, schedule, and summary of cover for the current policy year.',
      },
      {
        text: 'Review destination limits, medical limits, excess, and whether winter sports or family cover appear on the schedule.',
      },
      {
        text: 'Store the emergency assistance number on your phone and keep offline copies for travel.',
      },
      {
        text: 'If anything looks wrong, speak to your benefits team before you book non-refundable travel.',
      },
    ],
    providerCta: penProviderCta,
    map: {
      enabled: false,
      label: '',
      queryTemplate: '',
    },
  },
]
