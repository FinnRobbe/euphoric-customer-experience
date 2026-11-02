import type { FeatureDetailContent } from './types'

const bupaProviderCta = {
  label: 'Go to Bupa',
  href: 'https://www.bupa.co.uk',
} as const

export const bupaPmiFeatureDetails: FeatureDetailContent[] = [
  {
    featureId: 'bupa-gp',
    benefitId: 'bupa-pmi',
    overview:
      'Speak to a GP by phone or video, usually without waiting for an NHS appointment. Bupa Digital GP can help with new symptoms, prescriptions, referrals into private care, and fit notes when clinically appropriate.',
    includedIntro: 'Your Digital GP membership covers:',
    includedItems: [
      'Unlimited phone and video GP appointments when you are an eligible member on the scheme.',
      'Private prescriptions sent to a pharmacy you choose.',
      'Referrals into consultant-led private treatment when your cover and pre-authorisation rules allow.',
    ],
    costSummary:
      'Digital GP appointments are included in your membership for eligible members. You do not pay per consultation. Prescription charges at the pharmacy still apply where the NHS or pharmacy rules require them. Any follow-on private treatment is covered separately under your hospital and outpatient benefits, and your excess may apply.',
    faqs: [
      {
        q: 'Do I need to be registered with an NHS GP to use Bupa Digital GP?',
        a: 'You usually need to be living in the UK and registered with the scheme. You can use Digital GP for many everyday health questions even when NHS access is slow, but emergency care should always go to 999 or A&E.',
      },
      {
        q: 'Can Bupa Digital GP refer me for private hospital treatment?',
        a: 'Yes. If your symptoms need specialist care and your policy covers the condition, the GP can refer you into the private pathway. Always check pre-authorisation requirements before booking consultants or scans.',
      },
      {
        q: 'Are prescriptions included?',
        a: 'The GP consultation is covered, but you pay standard prescription charges at the pharmacy unless your policy or local rules say otherwise.',
      },
      {
        q: 'Who can use Digital GP on my policy?',
        a: 'Eligible adult members and any dependants included on your cover can use the service, as long as they meet Bupa’s age and registration requirements for the app.',
      },
    ],
    accessSteps: [
      {
        text: 'Download the Bupa Blua Health app or sign in at bupa.co.uk',
        href: 'https://www.bupa.co.uk',
      },
      {
        text: 'Register with your membership number and date of birth.',
      },
      {
        text: 'Choose “Speak to a GP” and describe your symptoms.',
      },
      {
        text: 'Pick a phone or video slot. Many appointments are available the same day.',
      },
      {
        text: 'Follow any advice, prescriptions, or referral letters in the app or by email.',
      },
    ],
    providerCta: bupaProviderCta,
    map: {
      enabled: true,
      label: 'Find a pharmacy near you',
      queryTemplate: 'pharmacy near {place}',
    },
  },
  {
    featureId: 'bupa-hospital',
    benefitId: 'bupa-pmi',
    overview:
      'If you need private hospital care for an eligible acute condition, your cover pays consultant fees, theatre costs, and stays in a Bupa-recognised UK hospital or day-patient unit. That can mean faster diagnosis and treatment than long NHS waits.',
    includedIntro: 'Inpatient and day-patient hospital cover pays for:',
    includedItems: [
      'Surgeon and anaesthetist fees for eligible operations, including bone and joint surgery, in a recognised private hospital.',
      'Hospital accommodation, nursing care, and operating theatre charges for approved admissions.',
      'Drugs, dressings, and inpatient physiotherapy directly linked to your covered treatment.',
    ],
    costSummary:
      'Bupa pays recognised hospitals and consultants directly when you use pre-authorised treatment within your hospital list. Your policy excess applies once per scheme year (or per claim, depending on your employer’s rules). Treatment for chronic conditions, cosmetic surgery, or care outside your hospital list is usually excluded unless your certificate says otherwise.',
    faqs: [
      {
        q: 'Do I need pre-authorisation before going into hospital?',
        a: 'Yes for most planned admissions. Contact Bupa before you book so they can confirm cover, apply any excess, and issue an authorisation number for your hospital.',
      },
      {
        q: 'Can I choose any private hospital in the UK?',
        a: 'You use the list on your tier: Bupa Partnership list on Core, and Bupa Extended Choice on Comprehensive and Premier. A hospital off that list may leave you paying the difference.',
      },
      {
        q: 'Is NHS hospital treatment covered instead?',
        a: 'This benefit is for private treatment. Some schemes allow NHS top-up in specific cases; check your membership guide or ask Bupa before assuming NHS care is paid.',
      },
      {
        q: 'Does my excess apply to every hospital visit?',
        a: 'Your excess usually applies to the first eligible private claim in a scheme year, not to each individual charge. Confirm the exact wording on your employer’s schedule.',
      },
    ],
    accessSteps: [
      {
        text: 'Get a GP or consultant referral if your policy requires one for the condition.',
      },
      {
        text: 'Call Bupa or use the online pre-authorisation service before booking surgery.',
      },
      {
        text: 'Choose a consultant and hospital on your approved list.',
      },
      {
        text: 'Give the hospital your membership and authorisation details when you admit.',
      },
      {
        text: 'Tell Bupa if your treatment plan changes or you need more nights in hospital.',
      },
    ],
    providerCta: bupaProviderCta,
    map: {
      enabled: true,
      label: 'Find a Bupa-recognised private hospital',
      queryTemplate: 'private hospital near {place}',
    },
  },
  {
    featureId: 'bupa-outpatient',
    benefitId: 'bupa-pmi',
    overview:
      'See private specialists, have diagnostic tests, and attend follow-up appointments without being admitted to hospital. Outpatient cover helps you move from first symptoms to a clear diagnosis and treatment plan within your annual limits.',
    includedIntro: 'Your outpatient benefit can cover:',
    includedItems: [
      'Consultant appointments in private clinics or hospital outpatient departments.',
      'Diagnostic tests such as blood tests, X-rays, MRI, CT, and ultrasound when a specialist requests them.',
      'Physiotherapy or other therapies billed as outpatient treatment, within your plan limits.',
    ],
    costSummary:
      'Consultations and tests are paid up to your outpatient limit. For example, you may have a set number of consultations per year or a cash limit such as £1,000. Once the limit is reached, you fund further outpatient care yourself unless Bupa agrees an exception. Your excess may apply to the first eligible outpatient claim in the scheme year.',
    faqs: [
      {
        q: 'How many outpatient consultations am I allowed?',
        a: 'It depends on your flex tier. Core options may cap consultations per year. Comprehensive and Premier tiers often include a higher limit or outpatient allowance. Check your enrolment summary.',
      },
      {
        q: 'Are MRI and CT scans covered?',
        a: 'Yes when a consultant or Bupa clinician agrees they are clinically necessary and authorises them. Self-requested screening scans are usually excluded.',
      },
      {
        q: 'Can I self-refer to a private specialist?',
        a: 'Some pathways allow direct access for certain conditions, but many still need a GP or Digital GP referral. Pre-authorisation is required before expensive tests.',
      },
    ],
    accessSteps: [
      {
        text: 'Speak to Bupa Digital GP or your NHS GP if you need a referral.',
      },
      {
        text: 'Request pre-authorisation for consultants and diagnostics before you book.',
      },
      {
        text: 'Book with a specialist on Bupa’s recognised consultant network.',
      },
      {
        text: 'Attend your appointment or scan and confirm billing goes to Bupa with your authorisation number.',
      },
    ],
    providerCta: bupaProviderCta,
    map: {
      enabled: true,
      label: 'Find private outpatient clinics',
      queryTemplate: 'private hospital outpatient clinic near {place}',
    },
  },
  {
    featureId: 'bupa-cancer',
    benefitId: 'bupa-pmi',
    overview:
      'If you are diagnosed with cancer, Bupa arranges private diagnostics, consultant-led treatment, and support in the UK so you can start treatment without unnecessary delay.',
    includedIntro: 'Cancer cover on your policy can include:',
    includedItems: [
      'Diagnostic investigations to confirm or rule out cancer, including biopsies and imaging when authorised.',
      'Eligible treatment such as surgery, chemotherapy, and radiotherapy in recognised private facilities.',
      'Newer biological cancer drugs on an approved list, on Premier only in this prototype. Comprehensive includes treatment without those newer drugs.',
    ],
    costSummary:
      'Cancer treatment is usually covered in full at recognised providers once Bupa confirms eligibility. Subject to your policy terms, your excess may apply on the first related claim. Experimental treatments, unproven drugs, or care outside the UK are generally excluded unless your certificate explicitly includes them.',
    faqs: [
      {
        q: 'Is there a separate cancer excess?',
        a: 'On many corporate schemes, cancer care does not attract an additional excess beyond your main policy excess, but always confirm on your membership schedule.',
      },
      {
        q: 'Can I get a second opinion through this benefit?',
        a: 'Bupa can arrange consultant reviews within your cancer pathway when clinically appropriate. Ask your case manager or pre-authorisation team.',
      },
      {
        q: 'Are wigs, prostheses, or counselling covered?',
        a: 'Some supportive benefits are included or available as add-ons. Your case manager can explain what your employer’s Bupa contract includes.',
      },
      {
        q: 'What if I need treatment while abroad?',
        a: 'Routine cancer treatment abroad is not usually covered by standard UK PMI. Use the travel add-on section of your policy if you have overseas emergency cover.',
      },
    ],
    accessSteps: [
      {
        text: 'Contact Bupa as soon as cancer is suspected or diagnosed. Do not wait for all NHS results.',
      },
      {
        text: 'Share referral letters and test results so Bupa can assign a case manager.',
      },
      {
        text: 'Get authorisation for consultants, scans, and treatment centres on your hospital list.',
      },
      {
        text: 'Stick to your agreed treatment plan and tell Bupa if anything changes.',
      },
      {
        text: 'Use Bupa support services for questions about appointments, drugs, or recovery.',
      },
    ],
    providerCta: bupaProviderCta,
    map: {
      enabled: true,
      label: 'Find cancer treatment centres',
      queryTemplate: 'private cancer treatment hospital near {place}',
    },
  },
  {
    featureId: 'bupa-mental',
    benefitId: 'bupa-pmi',
    overview:
      'Access private mental health support when stress, anxiety, depression, or other conditions affect your daily life. Bupa can help you reach psychologists, counsellors, or psychiatrists through your policy’s mental wellbeing benefit.',
    includedIntro: 'Mental wellbeing cover may provide:',
    includedItems: [
      'Initial assessment with a mental health professional to agree a treatment plan.',
      'A set number of talking-therapy sessions per scheme year, such as CBT, when clinically appropriate.',
      'Psychiatric reviews and inpatient mental health care where your policy includes hospital treatment for eligible conditions.',
    ],
    costSummary:
      'Therapy sessions are covered up to the limits in your membership guide. That is often a fixed number per year. Inpatient psychiatric care follows your hospital benefit rules and excess. Pre-authorisation is required for hospital admissions and some intensive programmes.',
    faqs: [
      {
        q: 'How do I start mental health support?',
        a: 'Call Bupa’s mental health helpline or use Digital GP. They will triage your needs and explain whether self-referral, GP referral, or authorisation is required.',
      },
      {
        q: 'Are pre-existing mental health conditions covered?',
        a: 'Corporate schemes often cover pre-existing conditions after any employer waiting period. Check your certificate if you joined mid-year or upgraded cover.',
      },
      {
        q: 'Can my partner use this benefit?',
        a: 'Dependants on your policy can access the same mental wellbeing pathways if they are included in your flex enrolment.',
      },
    ],
    accessSteps: [
      {
        text: 'Call the Bupa mental health direct access line or use the Blua Health app.',
      },
      {
        text: 'Complete a short assessment about your symptoms and urgency.',
      },
      {
        text: 'Receive a recommended pathway: digital CBT, counselling, or specialist referral.',
      },
      {
        text: 'Book sessions with an authorised therapist and attend using your authorisation details.',
      },
    ],
    providerCta: bupaProviderCta,
    map: {
      enabled: true,
      label: 'Find private mental health services',
      queryTemplate: 'private counselling CBT clinic near {place}',
    },
  },
  {
    featureId: 'bupa-physio',
    benefitId: 'bupa-pmi',
    overview:
      'Recover from sprains, back pain, and other muscle or joint problems with private physiotherapy. Bupa can fund a course of sessions when treatment is clinically needed and authorised under your outpatient or musculoskeletal pathway.',
    includedIntro: 'Physiotherapy on your plan can cover:',
    includedItems: [
      'Assessment and hands-on treatment with a recognised physiotherapist for eligible conditions.',
      'Exercise programmes and follow-up sessions within your annual session or benefit limit.',
      'Referral onward to a consultant if your physiotherapist identifies a need for specialist review.',
    ],
    costSummary:
      'Sessions are paid in full up to your policy limit when you use Bupa’s recognised network and obtain any required authorisation. If you exceed the session cap or use a non-recognised clinic, you may need to self-pay or claim back limited amounts.',
    faqs: [
      {
        q: 'Do I need a GP referral for physiotherapy?',
        a: 'Many schemes allow self-referral through Bupa’s musculoskeletal or Digital GP pathways. Check authorisation rules before your first appointment.',
      },
      {
        q: 'How many sessions are included?',
        a: 'Limits vary by tier. Some options include a fixed number of outpatient therapy sessions per condition or year. Your flex summary shows the cap that applies to you.',
      },
      {
        q: 'Is sports injury cover included?',
        a: 'Acute sports injuries are often treated like other musculoskeletal conditions if they are not excluded as hazardous activities. Read your policy exclusions for contact sports or competitions.',
      },
      {
        q: 'Can I choose my own physiotherapist?',
        a: 'Using a Bupa-recognised physiotherapist simplifies direct billing. Treatment outside the network may require you to pay upfront and submit a claim.',
      },
    ],
    accessSteps: [
      {
        text: 'Sign in to Bupa Blua Health or call the musculoskeletal helpline.',
      },
      {
        text: 'Describe your injury and complete any online triage questions.',
      },
      {
        text: 'Receive authorisation for a course of physiotherapy if eligible.',
      },
      {
        text: 'Book with a recognised physiotherapist near home or work.',
      },
      {
        text: 'Attend sessions and follow home exercises to stay within your approved plan.',
      },
    ],
    providerCta: bupaProviderCta,
    map: {
      enabled: true,
      label: 'Find physiotherapy near you',
      queryTemplate: 'physiotherapy clinic near {place}',
    },
  },
  {
    featureId: 'bupa-family',
    benefitId: 'bupa-pmi',
    overview:
      'Add your partner and children to the same Bupa policy so they can use Digital GP, hospital treatment, and outpatient care under the same hospital list. In this prototype you pay the partner and child amounts. The employer contribution applies to core cover only.',
    includedIntro: 'When you add dependants, cover usually includes:',
    includedItems: [
      'Your partner or spouse included on the policy when you select dependant cover at enrolment.',
      'Eligible children covered up to the age limit in your employer’s Bupa contract (often 24 if in full-time education).',
      'The same core benefits apply: GP, hospital, and outpatient. Each dependant must meet clinical eligibility and authorisation rules.',
    ],
    costSummary:
      'You pay the partner and child monthly amounts shown in Personalise. Those amounts are not taken from the employer core contribution. Dependants share your excess and hospital list. Adding someone mid-year can be limited to a life event or a flex window.',
    faqs: [
      {
        q: 'When can I add a new baby to the policy?',
        a: 'Most corporate schemes allow newborn registration within 30 or 90 days of birth without medical underwriting. Notify HR and Bupa promptly with the birth certificate details.',
      },
      {
        q: 'Do dependants get their own Digital GP access?',
        a: 'Yes. Each registered dependant can use Bupa Digital GP within age limits, with their own app profile linked to your membership.',
      },
      {
        q: 'Can I cover my partner if we are not married?',
        a: 'Many employer schemes include cohabiting partners; others require marriage or civil partnership. Check your flex guide.',
      },
    ],
    accessSteps: [
      {
        text: 'During flex enrolment, select dependant cover and enter each person’s details.',
      },
      {
        text: 'Confirm any extra payroll deduction shown in your benefits statement.',
      },
      {
        text: 'Register dependants on the Bupa Blua Health app once membership cards are active.',
      },
      {
        text: 'Use the same pre-authorisation process when a dependant needs hospital or outpatient care.',
      },
    ],
    providerCta: bupaProviderCta,
    map: {
      enabled: false,
      label: 'Find care for your family',
      queryTemplate: 'private GP near {place}',
    },
  },
  {
    featureId: 'bupa-travel',
    benefitId: 'bupa-pmi',
    overview:
      'Optional travel medical cover pays for emergency private treatment abroad when you are outside the UK. It helps on holidays and business trips where NHS care is not available and local bills could be high.',
    includedIntro: 'When you add travel medical cover, it may include:',
    includedItems: [
      'Emergency inpatient and outpatient treatment for new illnesses or injuries while overseas.',
      'Medical evacuation or repatriation to the UK when Bupa agrees it is clinically necessary.',
      '24-hour emergency assistance to locate appropriate hospitals and coordinate payment guarantees.',
    ],
    costSummary:
      'Travel cover is usually priced as an add-on to your PMI premium or per-trip depending on your employer’s arrangement. Policy excesses and territorial limits apply. Routine care, chronic condition management, and travel against FCDO advice are typically excluded.',
    faqs: [
      {
        q: 'Does my UK PMI automatically cover me abroad?',
        a: 'Standard UK hospital lists do not replace travel insurance. You need the travel medical add-on or separate travel policy for overseas emergencies.',
      },
      {
        q: 'How long can each trip last?',
        a: 'Corporate add-ons often cap single trips at 30, 60, or 90 days. Long-term postings need different cover. Check your certificate.',
      },
      {
        q: 'Who do I call in an emergency abroad?',
        a: 'Use the emergency assistance number on your Bupa travel documents before you admit to a hospital, unless delay would be dangerous.',
      },
      {
        q: 'Are winter sports covered?',
        a: 'High-risk activities may need an extra endorsement or may be excluded. Confirm before you ski or dive.',
      },
    ],
    accessSteps: [
      {
        text: 'Select the travel medical add-on during flex enrolment if your employer offers it.',
      },
      {
        text: 'Save the emergency assistance number and your membership ID in your phone before travel.',
      },
      {
        text: 'If you need care abroad, call assistance first for authorisation and hospital direction.',
      },
      {
        text: 'Keep receipts and clinical reports for any follow-up claim when you return to the UK.',
      },
    ],
    providerCta: bupaProviderCta,
    map: {
      enabled: false,
      label: 'Find emergency care abroad',
      queryTemplate: 'hospital near {place}',
    },
  },
  {
    featureId: 'bupa-dental',
    benefitId: 'bupa-pmi',
    overview:
      'A dental cash plan sits alongside your PMI and pays set cash amounts towards routine NHS or private dental treatment. That can include check-ups, hygiene, fillings, and sometimes major work, up to annual limits.',
    includedIntro: 'Dental cash plan benefits commonly include:',
    includedItems: [
      'Cash back for routine examinations and hygienist visits up to your plan’s annual cap.',
      'Contributions towards fillings, extractions, and other basic treatment when you submit a receipt.',
      'Higher tiers may add allowances for crowns, bridges, or orthodontic work subject to waiting periods.',
    ],
    costSummary:
      'You pay the dentist first, then claim cash back from Bupa up to the table of benefits for your selected tier. This is not the same as full dental insurance. Amounts are fixed per treatment type, and cosmetic dentistry is excluded. Premiums for the cash plan are usually separate from your core PMI contribution.',
    faqs: [
      {
        q: 'Is dental treatment covered by my main hospital policy?',
        a: 'No. Hospital PMI covers mouth conditions only when related to eligible inpatient care, such as jaw surgery. Everyday dentistry uses the cash plan or self-pay.',
      },
      {
        q: 'Can I use any dentist?',
        a: 'Most cash plans allow any GDC-registered dentist in the UK. Keep itemised receipts and claim through the Bupa members portal.',
      },
      {
        q: 'Is there a waiting period?',
        a: 'New joiners often have a short wait before major dental claims, but routine check-ups may be claimable sooner. Read your cash plan schedule.',
      },
    ],
    accessSteps: [
      {
        text: 'Choose a dental cash plan tier during flex if your employer lists it as a Bupa add-on.',
      },
      {
        text: 'Book treatment with your usual NHS or private dentist.',
      },
      {
        text: 'Pay the practice and keep an itemised invoice showing treatment codes.',
      },
      {
        text: 'Submit your claim online at bupa.co.uk with your membership and receipt details.',
      },
    ],
    providerCta: bupaProviderCta,
    map: {
      enabled: false,
      label: 'Find a dentist',
      queryTemplate: 'dentist near {place}',
    },
  },
]
