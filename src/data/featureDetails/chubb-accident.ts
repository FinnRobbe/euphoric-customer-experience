import type { FeatureDetailContent } from './types'

const chubbCta = {
  label: 'Go to Chubb',
  href: 'https://www.chubb.com/uk-en',
} as const

export const chubbAccidentFeatureDetails: FeatureDetailContent[] = [
  {
    featureId: 'pa-fracture',
    benefitId: 'chubb-accident',
    overview:
      'If you break a bone in a covered accident, you get a fixed cash sum. The amount depends on the fracture type and severity in your schedule of benefits. It helps with everyday costs while you recover. It does not replace your salary or pay private medical bills.',
    includedIntro: 'Your schedule lists lump sums for fractures such as:',
    includedItems: [
      'Lump-sum payments for specified fractures (for example wrist, ankle, collarbone, or hip) as listed in your employer’s schedule.',
      'Separate amounts where the schedule distinguishes simple, compound, or multiple fractures.',
      'Cover when the fracture results directly from an accidental bodily injury that happens during the period of insurance.',
      'Payment in addition to other cash benefits under the policy, subject to the overall limits in your schedule.',
    ],
    costSummary:
      'Fracture benefits are paid as tax-free cash lump sums up to the amounts in your schedule. There is no excess to pay before a fracture benefit is due, but you must meet the policy definition of an accident and provide acceptable medical evidence. Optional family extensions, if selected, may include dependants on the same fracture table.',
    faqs: [
      {
        q: 'Do I need to be admitted to hospital to claim a fracture benefit?',
        a: 'No. A confirmed fracture from a covered accident is usually enough if your doctor’s report or X-ray shows the injury and how it happened. Hospital admission may support a separate hospitalisation cash benefit if you stay overnight.',
      },
      {
        q: 'Are stress fractures or gradual injuries covered?',
        a: 'Generally not. Personal accident cover responds to sudden, accidental bodily injury. Wear-and-tear, illness, or injuries that build up over time are usually excluded unless your schedule says otherwise.',
      },
      {
        q: 'What if I fracture the same bone again later?',
        a: 'Each claim is assessed on its own facts. A new covered accident may qualify for another payment if the schedule allows repeat claims and the injury is not excluded as a pre-existing condition.',
      },
      {
        q: 'How long do I have to tell Chubb about a fracture?',
        a: 'Notify your employer or Chubb as soon as reasonably possible after the accident, and submit your claim form and medical evidence within the time limits in your policy wording.',
      },
    ],
    accessSteps: [
      {
        text: 'After the accident, see a doctor and keep A&E notes, fracture clinic letters, or X-ray reports.',
      },
      {
        text: 'Tell your employer’s benefits or HR team about the accident as soon as you can.',
      },
      {
        text: 'Complete the personal accident claim form with the date, place, and brief circumstances of the accident.',
      },
      {
        text: 'Attach medical evidence showing the diagnosis and type of fracture.',
      },
      {
        text: 'Submit to Chubb via the contact route shown on your membership documents and keep a copy for your records.',
      },
    ],
    providerCta: chubbCta,
    map: {
      enabled: true,
      label: 'Find physiotherapy or rehab near you',
      queryTemplate: 'physiotherapy fracture rehabilitation clinic near {place}',
    },
  },
  {
    featureId: 'pa-hospital',
    benefitId: 'chubb-accident',
    overview:
      'When a covered accident leads to an inpatient stay in hospital, this benefit pays a daily cash amount for each full 24-hour period (or part-day, if your schedule says so) you remain admitted. It helps with travel, parking, or extra support at home while you are in hospital.',
    includedIntro: 'Daily hospital cash on your schedule covers:',
    includedItems: [
      'A daily benefit for each day of medically necessary inpatient treatment following a covered accident.',
      'Payments from the date of admission until discharge, up to any maximum number of days in your schedule.',
      'Accident-related stays in NHS or private hospitals, as long as admission is confirmed by a qualified medical practitioner.',
      'This sits alongside fracture or disability lump sums. You may claim more than one benefit for the same accident if your schedule allows.',
    ],
    costSummary:
      'Daily hospital cash is paid at the rate in your schedule, with no need to submit hospital invoices for the cash benefit itself. Your schedule may cap the total number of payable days per accident or per policy year. Day-case or outpatient treatment alone does not usually trigger this benefit unless your wording says otherwise.',
    faqs: [
      {
        q: 'Does a short A&E visit count as hospitalisation?',
        a: 'Usually not. Most schemes pay when you are formally admitted as an inpatient. Observation without admission may not qualify. Check your schedule and keep admission/discharge summaries.',
      },
      {
        q: 'Can I claim if I am treated on the NHS?',
        a: 'Yes, if the policy covers NHS admissions after an accident. You still need proof of inpatient status, not private billing.',
      },
      {
        q: 'Is there a waiting period before daily benefits start?',
        a: 'Some schedules start payment from the first full day; others exclude the first 24 hours. Your schedule of benefits and policy wording are definitive.',
      },
      {
        q: 'What evidence does Chubb need?',
        a: 'Hospital admission and discharge dates, the accident details, and a medical report linking the stay to the accidental injury.',
      },
    ],
    accessSteps: [
      {
        text: 'Ask the hospital for admission and discharge confirmation (letter or summary) showing dates and reason for stay.',
      },
      {
        text: 'Report the accident to your employer and note when you were admitted and discharged.',
      },
      {
        text: 'On the claim form, state the daily hospital cash benefit you are claiming.',
      },
      {
        text: 'Enclose medical evidence that the stay resulted from the covered accident.',
      },
      {
        text: 'Send the pack to Chubb using the details on your policy and chase acknowledgement if you do not hear back within a few weeks.',
      },
    ],
    providerCta: chubbCta,
    map: {
      enabled: true,
      label: 'Find hospitals near you',
      queryTemplate: 'hospital A&E near {place}',
    },
  },
  {
    featureId: 'pa-disability',
    benefitId: 'chubb-accident',
    overview:
      'If a covered accident leaves you with permanent disability (as your schedule defines it, such as loss of sight, a limb, or use of a limb), you may receive a substantial lump sum. The payment reflects long-term impact of serious injury. It does not cover ongoing care or lost earnings.',
    includedIntro: 'Your schedule may pay lump sums for:',
    includedItems: [
      'Specified lump sums for total or partial permanent disablement listed in the schedule (for example loss of hand, foot, or sight).',
      'Percentage payments where the schedule scales benefits for partial loss of use.',
      'A maximum overall limit per person for disability payments arising from one accident.',
      'Assessment based on medical evidence and, where required, independent review against the policy definitions.',
    ],
    costSummary:
      'Disability lump sums are fixed amounts in the schedule, not linked to your salary. Payment is usually made once the injury is stabilised and permanent, which can take months. Other benefits (fracture, hospital cash) may still have been paid earlier in the same claim journey. Family members on an extension are covered only if named and included in the schedule.',
    faqs: [
      {
        q: 'When is a disability considered “permanent”?',
        a: 'When medical opinion confirms the condition is not expected to improve materially after a defined period (often 12 months), and it meets the policy’s definition for the listed disablement.',
      },
      {
        q: 'What is the difference between partial and total disablement?',
        a: 'Your schedule sets out specific injuries and percentages. Total loss of a limb may pay 100% of the listed sum; partial loss may pay a lower percentage.',
      },
      {
        q: 'Does this cover mental health or chronic pain after an accident?',
        a: 'Only if explicitly listed in the schedule. Most personal accident disability tables focus on physical loss or loss of use defined in the wording.',
      },
      {
        q: 'Can I receive rehabilitation support as well as the lump sum?',
        a: 'The lump sum is separate from NHS or private rehab. Your employer may offer other benefits; use medical advice to plan recovery and any return to work.',
      },
    ],
    accessSteps: [
      {
        text: 'Continue treatment and follow-up with your GP or specialist so the long-term outcome is well documented.',
      },
      {
        text: 'Notify Chubb early if the injury may be serious. You can update the claim as the prognosis becomes clear.',
      },
      {
        text: 'Gather consultant reports describing permanent impairment and how it maps to the schedule definitions.',
      },
      {
        text: 'Complete the disability section of the claim form with help from HR or the insurer if needed.',
      },
      {
        text: 'Submit all evidence and cooperate with any independent medical assessment Chubb requests.',
      },
    ],
    providerCta: chubbCta,
    map: {
      enabled: true,
      label: 'Find physiotherapy or rehab near you',
      queryTemplate: 'rehabilitation centre occupational therapy near {place}',
    },
  },
  {
    featureId: 'pa-worldwide',
    benefitId: 'chubb-accident',
    overview:
      'Your personal accident cover runs around the clock at work, commuting, at home, and abroad, as long as the injury is a covered accident under the policy. You get the same cash benefits on holiday, business trips, and everyday life in the UK.',
    includedIntro: 'Worldwide cover means:',
    includedItems: [
      'Accidental bodily injury occurring anywhere in the world during the period of insurance.',
      'The same cash benefits (fracture, hospitalisation, disability, etc.) as in the UK, subject to your schedule limits.',
      'Cover while on leisure or business travel unless your employer’s scheme excludes specific territories or activities.',
      'Claims handled in sterling based on your UK policy documents, even if treatment took place overseas.',
    ],
    costSummary:
      'There is usually no extra premium shown separately for worldwide cover. It is part of the group personal accident scheme. Benefits remain lump-sum or daily cash amounts; the policy does not pay private treatment abroad or travel cancellation. War zones, professional sport, and hazardous pursuits may be excluded. See your policy wording.',
    faqs: [
      {
        q: 'Am I covered on holiday in Europe or further afield?',
        a: 'Yes for eligible accidents in most destinations, unless your policy lists excluded countries or requires you to be a UK resident when the accident happens.',
      },
      {
        q: 'Do I need travel insurance as well?',
        a: 'Yes. Personal accident pays fixed cash benefits after injury; travel insurance covers medical expenses abroad, cancellation, and baggage. They complement each other.',
      },
      {
        q: 'What if I am injured playing sport on holiday?',
        a: 'Amateur activities are often covered; professional or extreme sports may be excluded. Refer to the activities section of your policy.',
      },
      {
        q: 'How do I claim from outside the UK?',
        a: 'Use the same claim form and send medical reports (with translation if needed). Contact your employer or Chubb as soon as practical after you are able.',
      },
    ],
    accessSteps: [
      {
        text: 'Get local emergency treatment and keep clinical notes, discharge summaries, or police reports if relevant.',
      },
      {
        text: 'Inform your employer when you can. Many schemes let a colleague or family member report for you initially.',
      },
      {
        text: 'Download or request the personal accident claim form from your HR team or Chubb.',
      },
      {
        text: 'Submit evidence showing the accident date, location, and injury, with English translation where helpful.',
      },
      {
        text: 'Track your claim reference and ask Chubb about payment timing if you are still abroad.',
      },
    ],
    providerCta: chubbCta,
    map: {
      enabled: false,
      label: '',
      queryTemplate: '',
    },
  },
  {
    featureId: 'pa-family',
    benefitId: 'chubb-accident',
    overview:
      'Where your employer has selected a family extension, your partner and eligible children can be included on the same personal accident policy. They receive cash benefits from the same schedule if they suffer a covered accidental injury (subject to age limits and who is named at enrolment).',
    includedIntro: 'If your employer adds family cover, you can get:',
    includedItems: [
      'Cover for a spouse, civil partner, or cohabiting partner as defined in the scheme rules.',
      'Cover for dependent children up to the age limit in your schedule (often 18, or 21 if in full-time education).',
      'The same types of benefits (fractures, hospital cash, disability) at amounts that may mirror or scale down from the employee’s schedule.',
      'Enrolment during flex or life events (marriage, birth) where your employer allows mid-year changes.',
    ],
    costSummary:
      'Family cover is usually funded through an extra employee contribution shown at enrolment. Each dependant must be declared and may need to be named on the policy. Benefits pay to the employee as policyholder unless the wording allows payment to the dependant or estate for certain events.',
    faqs: [
      {
        q: 'Are my stepchildren covered?',
        a: 'Only if they meet your employer’s definition of dependant children and are enrolled on the policy. Check scheme rules or ask HR.',
      },
      {
        q: 'Does my partner need to work for the same employer?',
        a: 'No. Family extension covers eligible dependants regardless of their employer, as long as they are enrolled under your membership.',
      },
      {
        q: 'Can adult children be added?',
        a: 'Usually only while they qualify as dependants under the age and education rules in the schedule.',
      },
      {
        q: 'Who submits a claim if my child is injured?',
        a: 'The employee member typically submits the claim with the child’s medical evidence and proof of relationship or enrolment.',
      },
    ],
    accessSteps: [
      {
        text: 'Confirm at enrolment which dependants are ticked for family personal accident cover.',
      },
      {
        text: 'Update HR after marriage, partnership, birth, or adoption if your scheme allows mid-year changes.',
      },
      {
        text: 'If a dependant is injured, gather their medical reports and accident details as you would for your own claim.',
      },
      {
        text: 'Complete the claim form in the employee’s name, naming the injured dependant and their relationship to you.',
      },
      {
        text: 'Send to Chubb with any proof of cover for the dependant on the date of the accident.',
      },
    ],
    providerCta: chubbCta,
    map: {
      enabled: false,
      label: '',
      queryTemplate: '',
    },
  },
  {
    featureId: 'pa-claims',
    benefitId: 'chubb-accident',
    overview:
      'Report the accident soon and send clear medical evidence. Chubb pays eligible cash benefits under your employer’s group personal accident policy once the claim is assessed against the schedule and policy wording.',
    includedIntro: 'To claim, you usually need:',
    includedItems: [
      'A completed claim form from your employer or Chubb, signed and dated.',
      'Details of when, where, and how the accident happened (work, home, travel, sport, etc.).',
      'Medical evidence: A&E notes, fracture clinic letters, admission/discharge summaries, or consultant reports.',
      'Your employee or membership reference so the policy can be matched to the date of loss.',
    ],
    costSummary:
      'There is no claim excess for standard cash benefits: approved amounts are paid in full up to the schedule limit. Payment is typically by BACS to the account you specify. If a claim is declined, you should get a reason. You can ask Chubb or HR to review if you have new evidence.',
    faqs: [
      {
        q: 'How soon should I report an accident?',
        a: 'As soon as reasonably possible. Late notification can delay payment and may affect cover if the insurer cannot investigate the circumstances.',
      },
      {
        q: 'Can my employer help with the form?',
        a: 'Yes. HR or benefits teams often hold blank forms, policy summaries, and Chubb contact details for your scheme.',
      },
      {
        q: 'What if the accident happened at work?',
        a: 'You may still claim personal accident benefits. Workplace injury reporting (RIDDOR, occupational health) is separate from this insurance claim.',
      },
      {
        q: 'How long does payment take?',
        a: 'Simple fracture or short hospital claims are often paid within a few weeks of complete evidence. Complex disability claims take longer while prognosis is confirmed.',
      },
    ],
    accessSteps: [
      {
        text: 'Obtain the group personal accident claim form from your employer’s benefits portal or HR.',
      },
      {
        text: 'Fill in every section about the accident, your injury, and the benefit you are claiming.',
      },
      {
        text: 'Attach legible medical evidence. Photos of forms are fine if they are readable.',
      },
      {
        text: 'Email or post the pack to Chubb at the address on the form, copying HR if your scheme asks you to.',
      },
      {
        text: 'Keep your claim reference and follow up if you have not received payment or a decision within the timeframe Chubb quotes.',
      },
    ],
    providerCta: chubbCta,
    map: {
      enabled: false,
      label: '',
      queryTemplate: '',
    },
  },
]
