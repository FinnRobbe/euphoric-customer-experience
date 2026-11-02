import type { FeatureDetailContent } from './types'

const vitalityProviderCta = {
  label: 'Go to Vitality',
  href: 'https://www.vitality.co.uk',
} as const

export const vitalityPmiFeatureDetails: FeatureDetailContent[] = [
  {
    featureId: 'vitality-gp',
    benefitId: 'vitality-pmi',
    overview:
      'Vitality Digital GP lets you speak to a GP by phone or video when you need advice. For everyday issues you might skip the NHS wait and get advice, prescriptions when appropriate, and referrals into private care your PMI covers.',
    includedIntro: 'Digital GP on your Vitality PMI includes:',
    includedItems: [
      'Phone or video GP consultations when you are an eligible member.',
      'Clinical advice, fit notes when needed, and private prescriptions or referrals your cover allows.',
      'Advice on whether to use NHS care, self-care, or a private specialist your cover includes.',
    ],
    costSummary:
      'Digital GP access is included on eligible Vitality PMI tiers at no separate session fee when you use the approved Vitality route. If you choose care outside the digital pathway (for example a private GP you find yourself), you may need to pay upfront and claim back only up to scheme limits. Your excess does not usually apply to GP consultations, but check your member guide for your tier.',
    faqs: [
      {
        q: 'Do I still need my NHS GP?',
        a: 'Yes. Digital GP complements NHS primary care. It does not replace registration with a local NHS practice for ongoing NHS services.',
      },
      {
        q: 'Can the Digital GP refer me to a specialist?',
        a: 'Where clinically appropriate, they can advise on next steps and referrals into private treatment that your PMI covers, in line with your outpatient and hospital benefits.',
      },
      {
        q: 'How do I book a Digital GP appointment?',
        a: 'Use the Vitality Member app or online member area and follow the Digital GP booking flow. Appointments are usually available at short notice during service hours.',
      },
      {
        q: 'Are prescriptions included?',
        a: 'Private prescriptions may be issued when clinically appropriate. You usually pay pharmacy charges unless your plan includes prescription support. Check your schedule.',
      },
    ],
    accessSteps: [
      {
        text: 'Open the Vitality Member app or sign in at vitality.co.uk',
        href: 'vitality.co.uk',
      },
      { text: 'Open Digital GP (or GP appointment) from your health benefits.' },
      { text: 'Answer a few questions about your symptoms and eligibility.' },
      { text: 'Choose a phone or video slot and join at the appointment time.' },
      {
        text: 'Follow any referral or prescription instructions and keep notes for claims if you use other providers.',
      },
    ],
    providerCta: vitalityProviderCta,
    map: {
      enabled: true,
      label: 'Find a GP surgery near you',
      queryTemplate: 'GP surgery near {place}',
    },
  },
  {
    featureId: 'vitality-hospital',
    benefitId: 'vitality-pmi',
    overview:
      'Private hospital cover pays for inpatient and day-case care at approved UK hospitals when you need surgery or specialist treatment. It can shorten waits compared with NHS queues where your policy applies.',
    includedIntro: 'Hospital cover includes:',
    includedItems: [
      'Inpatient stays and day-case procedures at hospitals on your Vitality hospital list, when treatment is eligible under your policy.',
      'Surgeon, anaesthetist, and hospital facility fees for approved admissions, as set out in your member schedule.',
      'Recovery and nursing care during your admission; physiotherapy as part of inpatient fees may apply when included in the treatment pathway.',
    ],
    costSummary:
      'Most planned admissions need pre-authorisation first. Vitality pays eligible hospital costs in full at network rates after approval, minus your policy excess if it applies to that admission. Choosing a hospital outside your list, upgrading rooms, or treatment Vitality has not agreed in advance may mean you pay the difference or claim only up to scheme limits.',
    faqs: [
      {
        q: 'Do I need pre-authorisation before hospital treatment?',
        a: 'Yes for most planned inpatient and day-case treatment. Contact Vitality before you book so they can confirm cover and issue an authorisation number.',
      },
      {
        q: 'Which hospitals can I use?',
        a: 'Your plan uses a UK hospital list that depends on your tier (for example standard or extended). Check the list in your member guide or app before you choose a hospital.',
      },
      {
        q: 'Does my excess apply to hospital stays?',
        a: 'Usually yes, once per policy year for eligible claims, depending on how your employer scheme is set up. Confirm your excess amount in Personalise or your schedule.',
      },
      {
        q: 'What about emergency admission?',
        a: 'Tell Vitality as soon as you can after an emergency. Emergency rules differ from planned care; follow the emergency claims guidance in your member area.',
      },
    ],
    accessSteps: [
      {
        text: 'Sign in at vitality.co.uk or open the Vitality Member app.',
        href: 'vitality.co.uk',
      },
      { text: 'Start a pre-authorisation request for your planned treatment or procedure.' },
      { text: 'Share your specialist’s recommendation and proposed hospital.' },
      { text: 'Once approved, book with the hospital using your authorisation reference.' },
      { text: 'After treatment, confirm any outstanding invoices are sent to Vitality if not billed directly.' },
    ],
    providerCta: vitalityProviderCta,
    map: {
      enabled: true,
      label: 'Find private hospitals near you',
      queryTemplate: 'private hospital near {place}',
    },
  },
  {
    featureId: 'vitality-outpatient',
    benefitId: 'vitality-pmi',
    overview:
      'Outpatient cover pays for specialist appointments, tests, and follow-ups without an overnight stay. You use your annual outpatient limit as you investigate symptoms and plan treatment.',
    includedIntro: 'Outpatient cover can include:',
    includedItems: [
      'Consultations with private specialists when referred or self-referred, within your plan’s outpatient consultation or monetary limit.',
      'Diagnostic tests and scans linked to an approved outpatient pathway, when covered by your tier.',
      'Follow-up outpatient visits related to eligible treatment, until your limit or clinical pathway is complete.',
    ],
    costSummary:
      'Costs are met from your outpatient allowance or consultation cap. Once your limit is used, you pay for further outpatient care unless you upgrade cover or the treatment moves to an inpatient pathway Vitality authorises. Your excess may apply to some outpatient claims depending on scheme design. Check your schedule.',
    faqs: [
      {
        q: 'How many outpatient consultations do I get?',
        a: 'It depends on your tier. You might have a fixed number per year or a cash limit such as £1,000. Your current limit is shown on Compare and Personalise in this prototype.',
      },
      {
        q: 'Do I need a GP referral for a specialist?',
        a: 'Many pathways require a GP or Digital GP referral. Some musculoskeletal or mental health routes allow self-referral. Check the feature that matches your condition.',
      },
      {
        q: 'Are MRI and CT scans covered?',
        a: 'Scans are often covered when clinically necessary and linked to an eligible outpatient or hospital pathway. Pre-authorisation may be required for high-cost diagnostics.',
      },
      {
        q: 'What happens if I exceed my outpatient limit?',
        a: 'Further consultations and tests are usually self-funded unless you move to an eligible inpatient admission or add outpatient cover at renewal where available.',
      },
    ],
    accessSteps: [
      {
        text: 'Sign in at vitality.co.uk or open the Vitality Member app.',
        href: 'vitality.co.uk',
      },
      { text: 'Check your remaining outpatient limit in the app or schedule.' },
      { text: 'Obtain a referral if your pathway requires one (Digital GP, NHS GP, or self-referral where allowed).' },
      { text: 'Book with a specialist on your consultant or facility list.' },
      { text: 'Submit or confirm claims for any fees not billed directly to Vitality.' },
    ],
    providerCta: vitalityProviderCta,
    map: {
      enabled: true,
      label: 'Find private specialists near you',
      queryTemplate: 'private consultant clinic near {place}',
    },
  },
  {
    featureId: 'vitality-cancer',
    benefitId: 'vitality-pmi',
    overview:
      'Cancer cover supports you from tests through treatment. A case manager helps coordinate private care and works with NHS services when that makes sense.',
    includedIntro: 'With active cancer cover on your plan, you get:',
    includedItems: [
      'Diagnostic tests and biopsies needed to investigate suspected cancer, when approved under your policy.',
      'Eligible private cancer treatment such as surgery, chemotherapy, and radiotherapy at approved facilities, subject to pre-authorisation.',
      'Dedicated case management and nurse support to guide you through appointments, authorisations, and questions about your cover.',
    ],
    costSummary:
      'Eligible cancer treatment is usually covered in full at scheme rates after any excess rules for your policy. Experimental treatments, care outside agreed pathways, or providers not on your list may not be covered or may be paid only up to policy limits. Your case manager helps confirm what is included before treatment starts.',
    faqs: [
      {
        q: 'Is cancer cover included on every Vitality tier?',
        a: 'Not always. Core may treat cancer as an upgrade. Comprehensive and Premier tiers in this prototype usually include full pathway cover. Check your selected cover in Personalise.',
      },
      {
        q: 'Can I use the NHS for some cancer care and private for other parts?',
        a: 'Yes. Many members use NHS oncology alongside private diagnostics or treatment. Your case manager can explain how your policy works with NHS care.',
      },
      {
        q: 'When should I contact Vitality about a cancer concern?',
        a: 'As soon as you have a referral or positive investigation result. Early contact helps arrange authorisation and support before treatment dates are set.',
      },
      {
        q: 'Are wigs, prostheses, or counselling covered?',
        a: 'Some supportive benefits are included or optional depending on tier and schedule. Ask your case manager for a personalised list.',
      },
    ],
    accessSteps: [
      {
        text: 'Sign in and notify Vitality through the member app or cancer support line if you have a suspected or confirmed diagnosis.',
        href: 'vitality.co.uk',
      },
      { text: 'Speak with your case manager about tests and treatment plans.' },
      { text: 'Get pre-authorisation for each stage of private treatment.' },
      { text: 'Attend appointments at approved hospitals or cancer centres.' },
      { text: 'Stay in touch with your case manager if your treatment plan changes.' },
    ],
    providerCta: vitalityProviderCta,
    map: {
      enabled: true,
      label: 'Find cancer care centres near you',
      queryTemplate: 'private cancer treatment centre near {place}',
    },
  },
  {
    featureId: 'vitality-mental',
    benefitId: 'vitality-pmi',
    overview:
      'Mental health support gives you assessment and talking therapy after triage. It covers issues like anxiety, low mood, and stress through Vitality’s approved partners.',
    includedIntro: 'If mental health is on your plan:',
    includedItems: [
      'Initial assessment and triage to recommend the right level of care (self-help, guided therapy, or onward referral).',
      'A course of outpatient talking therapies such as CBT, delivered remotely or face-to-face with recognised practitioners, within session limits.',
      'Referral into private psychiatric or hospital pathways when clinically necessary and covered by your policy.',
    ],
    costSummary:
      'Therapy sessions within your plan limit are usually paid in full when you use Vitality’s approved network. Age limits may apply (for example cover up to age 99 on some tiers). If you choose an independent therapist outside the network, you may pay upfront and claim back up to scheme rates. Optional mental health extras may change your session cap.',
    faqs: [
      {
        q: 'Do I need a GP referral for mental health support?',
        a: 'Many pathways allow self-referral through the Vitality mental health partner after a short online or phone triage. Some employers ask for GP involvement. Check your scheme guide.',
      },
      {
        q: 'How many therapy sessions can I have?',
        a: 'Session numbers depend on your tier and clinical recommendation. Triage will confirm your allocation after assessment.',
      },
      {
        q: 'Is this the same as the NHS Talking Therapies service?',
        a: 'No. This is a private route through your PMI. You can still use NHS services; your triage team can signpost if NHS care is more appropriate.',
      },
      {
        q: 'Are psychiatric admissions covered?',
        a: 'Inpatient mental health treatment may be covered when pre-authorised and listed on your schedule. It is separate from outpatient talking therapy limits.',
      },
    ],
    accessSteps: [
      {
        text: 'Open the Vitality Member app or member website.',
        href: 'vitality.co.uk',
      },
      { text: 'Select mental health or wellbeing support from your benefits.' },
      { text: 'Complete the triage questionnaire or call the dedicated line.' },
      { text: 'Book therapy sessions with the provider recommended for you.' },
      { text: 'Request pre-authorisation before any inpatient mental health treatment.' },
    ],
    providerCta: vitalityProviderCta,
    map: {
      enabled: true,
      label: 'Find counselling and therapy near you',
      queryTemplate: 'CBT therapist counselling near {place}',
    },
  },
  {
    featureId: 'vitality-physio',
    benefitId: 'vitality-pmi',
    overview:
      'Physiotherapy covers outpatient sessions for muscle, bone, and joint problems. You often start after triage or a referral, depending on your tier.',
    includedIntro: 'Outpatient physiotherapy can include:',
    includedItems: [
      'Assessment and treatment for eligible musculoskeletal conditions such as back pain, sports injuries, and joint problems.',
      'A limited number of sessions per condition or policy year when physio is included or added as an optional extra.',
      'Exercise and rehabilitation plans, plus referral onward to specialists if you need further investigation.',
    ],
    costSummary:
      'When physio is included, recognised practitioners are usually paid in full within session limits. Optional physio on lower tiers may require an extra premium. Outside-network practitioners may be reimbursed only up to scheme rates. Your excess may apply if physio is bundled with outpatient specialist claims. Confirm in your schedule.',
    faqs: [
      {
        q: 'Can I self-refer to physiotherapy?',
        a: 'On some tiers you can start through Digital GP or a musculoskeletal triage service. Other plans need a GP or specialist referral first.',
      },
      {
        q: 'How many physio sessions are covered?',
        a: 'Limits vary by tier and whether physio is an optional extra. Check Personalise for your prototype plan.',
      },
      {
        q: 'Does physio cover osteopathy or chiropractic?',
        a: 'Some schemes group manual therapies together; others cover physiotherapy only. Your member guide lists recognised professions.',
      },
      {
        q: 'Is physio covered after hospital surgery?',
        a: 'Inpatient physiotherapy during a covered admission may be part of hospital fees. Outpatient rehab after discharge uses your physio or outpatient benefit.',
      },
    ],
    accessSteps: [
      {
        text: 'In the Vitality app, check that physio is on your cover.',
        href: 'vitality.co.uk',
      },
      { text: 'Obtain referral or complete MSK triage if required.' },
      { text: 'Book with a recognised physiotherapist near you.' },
      { text: 'Attend sessions and follow your home exercise plan.' },
      { text: 'Contact Vitality if you need additional sessions beyond your limit.' },
    ],
    providerCta: vitalityProviderCta,
    map: {
      enabled: true,
      label: 'Find physiotherapy near you',
      queryTemplate: 'physiotherapy clinic near {place}',
    },
  },
  {
    featureId: 'vitality-family',
    benefitId: 'vitality-pmi',
    overview:
      'You can add your partner and eligible children to one Vitality PMI policy. Everyone shares the same excess and hospital list, subject to underwriting.',
    includedIntro: 'Adding dependants can include:',
    includedItems: [
      'Separate membership for each dependant with the same core hospital and outpatient rules as the main member, adjusted for age and tier.',
      'Digital GP and wellbeing features for eligible dependants, when included on your plan.',
      'Single point of administration through the main member account for enrolment changes at renewal or life events.',
    ],
    costSummary:
      'Each dependant adds a monthly premium based on age, tier, and cover options. Children and partners may have different minimum ages and upper age limits. Adding dependants mid-year can be restricted to qualifying events (such as marriage or birth) unless your employer scheme allows open enrolment.',
    faqs: [
      {
        q: 'Who counts as a dependant?',
        a: 'Usually your spouse or civil partner and dependent children up to the age limit in your employer scheme. Stepchildren and partners may need proof of dependency.',
      },
      {
        q: 'Can I add family on Vitality Core?',
        a: 'In this prototype, Core may not allow dependants. Comprehensive and Premier usually do. Check Compare for your selection.',
      },
      {
        q: 'Do dependants earn Vitality Points?',
        a: 'Activity and engagement rewards usually apply to adult members who register devices or complete challenges. Children’s cover focuses on medical benefits.',
      },
      {
        q: 'Is maternity covered for dependants?',
        a: 'Standard PMI usually excludes routine pregnancy and childbirth. Complications may be treated under emergency or eligible inpatient rules. Read your schedule.',
      },
    ],
    accessSteps: [
      {
        text: 'Review dependant eligibility in your employer benefits portal or Vitality welcome pack.',
        href: 'vitality.co.uk',
      },
      { text: 'Gather dates of birth and details for each dependant you want to add.' },
      { text: 'Apply during enrolment or after a qualifying life event through HR or Vitality.' },
      { text: 'Set up Vitality Member access for adult dependants where offered.' },
      { text: 'Confirm premiums in Personalise before the policy start date.' },
    ],
    providerCta: vitalityProviderCta,
    map: {
      enabled: true,
      label: 'Find Vitality partner gyms near you',
      queryTemplate: 'Vitality partner gym near {place}',
    },
  },
  {
    featureId: 'vitality-travel',
    benefitId: 'vitality-pmi',
    overview:
      'The travel medical add-on covers emergency treatment abroad when you fall ill or get injured on an eligible trip. You can use private emergency care and the assistance line outside the UK.',
    includedIntro: 'With travel cover added, you may get:',
    includedItems: [
      'Emergency medical treatment and hospital admission costs abroad, up to the policy limit and subject to trip duration rules.',
      'Medical evacuation and repatriation when clinically necessary and approved by the assistance service.',
      '24-hour emergency assistance helpline for finding facilities and coordinating care while travelling.',
    ],
    costSummary:
      'Travel cover is a paid extra with its own premium and excess. Your trip must fit the rules in your schedule (length, destination, and so on). Pre-existing conditions may be excluded unless you declare them and Vitality accepts them. It does not cover cancellation, baggage, or disruption unless your schedule says otherwise.',
    faqs: [
      {
        q: 'Is travel cover included automatically?',
        a: 'No on most tiers in this prototype. You opt in during Personalise or renewal and pay the additional premium.',
      },
      {
        q: 'How long can each trip be?',
        a: 'Limits depend on the travel product attached to your scheme. Check your schedule for maximum days per trip and trips per year.',
      },
      {
        q: 'What should I do in a medical emergency abroad?',
        a: 'Call the emergency assistance number on your travel certificate before non-urgent private treatment when you can, so costs can be approved and arranged.',
      },
      {
        q: 'Does this cover UK holidays?',
        a: 'Travel add-ons are for overseas travel. UK emergency care is usually through your PMI hospital benefit or the NHS.',
      },
    ],
    accessSteps: [
      {
        text: 'Add travel medical cover in Personalise or at renewal if it is not already on your policy.',
        href: 'vitality.co.uk',
      },
      { text: 'Save your travel emergency assistance number and policy number in your phone before you leave.' },
      { text: 'For emergencies, contact assistance first, then seek treatment as directed.' },
      { text: 'Keep receipts and medical reports for any reimbursement claims.' },
      { text: 'Tell Vitality when you return if follow-up care is needed in the UK under PMI.' },
    ],
    providerCta: vitalityProviderCta,
    map: {
      enabled: true,
      label: 'Find travel clinics near you',
      queryTemplate: 'travel vaccination clinic near {place}',
    },
  },
  {
    featureId: 'vitality-dental',
    benefitId: 'vitality-pmi',
    overview:
      'The dental cash plan pays fixed amounts back for routine private dental costs, such as check-ups, hygienist visits, and basic treatment, when you use an eligible dentist.',
    includedIntro: 'The dental cash plan pays towards:',
    includedItems: [
      'Cash back towards routine examinations and hygienist appointments, up to annual limits per person.',
      'Contributions towards fillings, extractions, and other listed treatments when performed by a registered dentist.',
      'Separate annual maximums for NHS and private fee bands, as defined in your dental plan schedule.',
    ],
    costSummary:
      'Dental cover is usually an optional extra with its own monthly cost. You pay the dentist first, then claim cash back through Vitality within time limits. Amounts are fixed per treatment type, not a full reimbursement of your bill. Cosmetic dentistry and major orthodontic work are often excluded or capped.',
    faqs: [
      {
        q: 'Is dental cover part of standard PMI?',
        a: 'Core PMI focuses on medical and hospital treatment. Dental cash plan is a separate optional benefit in this prototype.',
      },
      {
        q: 'Can I use any dentist?',
        a: 'Most cash plans allow any GDC-registered dentist in the UK. Some products offer higher returns for practice plan dentists. Check your leaflet.',
      },
      {
        q: 'How do I claim?',
        a: 'Submit receipts and a claim form through the Vitality Member app or online claims portal, usually within the deadline on your schedule.',
      },
      {
        q: 'Are dependants covered on the dental plan?',
        a: 'You can often add partners and children to the dental cash plan when you add them to PMI, for an extra premium per person.',
      },
    ],
    accessSteps: [
      {
        text: 'In the member app, confirm your dental cash plan is active.',
        href: 'vitality.co.uk',
      },
      { text: 'Choose a registered dentist and book routine or necessary treatment.' },
      { text: 'Pay the practice and keep itemised receipts.' },
      { text: 'Submit your claim in the member app with treatment codes if requested.' },
      { text: 'Track reimbursement to your bank account within published timescales.' },
    ],
    providerCta: vitalityProviderCta,
    map: {
      enabled: true,
      label: 'Find dentists near you',
      queryTemplate: 'private dentist near {place}',
    },
  },
]
