import type { FeatureDetailContent } from './types'

/** Gold-standard exemplar matching AXA Physiotherapy screenshots. */
export const axaPhysioDetail: FeatureDetailContent = {
  featureId: 'physio',
  benefitId: 'axa-pmi',
  overview:
    'You can self-refer for muscle, bone and joint conditions such as a frozen shoulder, knee or back pain. You do not need to see your GP first.',
  includedIntro: 'For each condition, this benefit covers:',
  includedItems: [
    'Up to 10 sessions per scheme year, combined for physiotherapy and osteopathy, paid in full when you use recognised practitioners on AXA’s approved list.',
    'Further sessions when your specialist (for example a consultant rheumatologist or orthopaedic surgeon) refers you, as long as AXA agrees them first.',
    'In-patient or day-patient physiotherapy as part of private hospital or day-patient unit fees when you are admitted for treatment your scheme covers.',
  ],
  costSummary:
    'Recognised physiotherapists and osteopaths (on AXA’s approved list) are paid in full when you use the self-referral pathway and stay within the session limits. If you choose a practitioner outside the recognised network, you may need to pay and claim back up to the scheme rates. Your usual excess (the amount you pay when you claim, not each month) may apply to related specialist or hospital treatment.',
  faqs: [
    {
      q: 'Do I need a GP referral for physiotherapy or osteopathy?',
      a: 'No. You can self-refer through your AXA Health member account for muscle, bone and joint conditions. A GP referral is only needed if your pathway specifically asks for one.',
    },
    {
      q: 'How many physiotherapy and osteopathy sessions are covered each year?',
      a: 'Up to 10 sessions per scheme year for each condition, combined for physio and osteopathy, unless your specialist refers you for further agreed sessions.',
    },
    {
      q: 'Is physiotherapy covered if I am admitted to hospital?',
      a: 'Yes. In-patient or day-patient physiotherapy can be included as part of private hospital or day-patient unit fees when the admission is for treatment your scheme covers.',
    },
    {
      q: 'What happens if I choose my own physiotherapist or osteopath?',
      a: 'You can usually still claim, but amounts may be limited to scheme rates and you may need to pay the practitioner first. Using a recognised practitioner through the self-referral pathway keeps billing simpler.',
    },
  ],
  accessSteps: [
    {
      text: 'Log in to your online account at axahealth.co.uk/memberlogin',
      href: 'axahealth.co.uk/memberlogin',
    },
    {
      text: 'Go to the Muscles, Bones and Joints section.',
    },
    {
      text: 'Complete an online assessment about your symptoms.',
    },
    {
      text: 'Book a phone or video appointment with a physiotherapist or osteopath.',
    },
    {
      text: 'If your injury or condition needs hands-on treatment, they can arrange face-to-face sessions with a recognised practitioner near you.',
    },
  ],
  providerCta: {
    label: 'Go to AXA Health',
    href: 'https://www.axahealth.co.uk/memberlogin',
  },
  map: {
    enabled: true,
    label: 'Find physiotherapy or osteopathy near you',
    queryTemplate: 'physiotherapy osteopathy clinic near {place}',
  },
}

export const axaPmiFeatureDetails: FeatureDetailContent[] = [
  axaPhysioDetail,
  {
    featureId: 'virt-gp',
    benefitId: 'axa-pmi',
    overview:
      'Speak to a UK-registered GP by phone or video, usually without waiting for an NHS appointment. Virtual GP appointments can help with new symptoms, prescriptions, sick notes, and referrals when your scheme allows.',
    includedIntro: 'Your virtual GP membership covers:',
    includedItems: [
      'Unlimited GP consultations by phone or secure video, subject to fair use.',
      'Private prescriptions sent to a pharmacy you choose, when your policy allows.',
      'Fit notes and referral letters when the GP recommends onward care that your scheme covers.',
    ],
    costSummary:
      'Virtual GP consultations are included in your AXA PMI at no extra charge when accessed through the member portal. Prescription and pharmacy costs are separate unless your policy states otherwise. Using the AXA pathway avoids paying upfront for the consultation itself.',
    faqs: [
      {
        q: 'Can a virtual GP prescribe medication?',
        a: 'Yes, when it is clinically appropriate and allowed under your policy. The GP can send a private prescription electronically to a pharmacy you choose.',
      },
      {
        q: 'Do I need to register with the virtual GP as my NHS GP?',
        a: 'No. This is a private service for scheme members. It does not replace your registered NHS GP for ongoing NHS care.',
      },
      {
        q: 'What if I need a face-to-face examination?',
        a: 'The GP will advise if you need an in-person assessment. They may signpost you to NHS services, a private clinic, or a pathway covered by your PMI, such as outpatient consultations.',
      },
      {
        q: 'Are children covered on the virtual GP service?',
        a: 'Cover depends on who is listed on your policy. Dependants included on your membership can usually use the service in the same way as the main member.',
      },
    ],
    accessSteps: [
      {
        text: 'Sign in at axahealth.co.uk/memberlogin.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Open Virtual GP or GP at Hand (wording may vary on your portal).',
      },
      {
        text: 'Choose phone or video and pick an available appointment time.',
      },
      {
        text: 'Join the consultation from your phone, tablet, or computer at the booked time.',
      },
      {
        text: 'Follow any advice, prescriptions, or referrals given and contact AXA if you need help booking onward private care.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: false,
      label: 'Find a GP clinic near you',
      queryTemplate: 'private GP clinic near {place}',
    },
  },
  {
    featureId: 'inpatient',
    benefitId: 'axa-pmi',
    overview:
      'Private in-patient hospital treatment when you need to stay overnight or longer for surgery, cancer care, or other eligible conditions. AXA arranges cover at recognised private hospitals once treatment is agreed.',
    includedIntro: 'Once AXA approves in-patient treatment, cover can include:',
    includedItems: [
      'Hospital accommodation, nursing care, and operating theatre fees at a recognised private facility.',
      'Surgeons, anaesthetists, and other eligible specialist fees linked to the approved admission.',
      'Drugs, dressings, and diagnostics given during the stay that relate to the covered treatment.',
    ],
    costSummary:
      'In-patient fees are usually paid directly to the hospital when you use AXA’s recognised network and obtain authorisation first. Your policy excess applies per claim or per year as set out in your schedule. Non-recognised hospitals or treatment without approval may mean you pay upfront and claim back within scheme limits.',
    faqs: [
      {
        q: 'Do I need authorisation before going into hospital?',
        a: 'Yes. Contact AXA Health before admission unless your policy documents say emergency admission rules apply. Your consultant or hospital can help with the authorisation request.',
      },
      {
        q: 'Can I choose any private hospital?',
        a: 'You can choose from recognised hospitals and facilities. If you pick a non-recognised provider, cover may be limited to scheme benefit levels and you may need to settle bills yourself first.',
      },
      {
        q: 'Does this cover a private room?',
        a: 'Cover follows your policy wording. Many schemes include a private or en-suite room where available at the hospital; check your membership guide for room type limits.',
      },
      {
        q: 'What about follow-up after discharge?',
        a: 'Post-discharge care may fall under outpatient benefits, physiotherapy, or nursing at home if included. Ask AXA when your admission is approved so you know what happens next.',
      },
    ],
    accessSteps: [
      {
        text: 'See your GP or a private specialist and discuss whether in-patient treatment is needed.',
      },
      {
        text: 'Ask your specialist or hospital to request authorisation from AXA Health before you are admitted.',
      },
      {
        text: 'Log in to your member account to track authorisation or upload any requested documents.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Once approved, book your admission date with the hospital.',
      },
      {
        text: 'Take your membership details to hospital and confirm billing is direct to AXA where arranged.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find private hospitals near you',
      queryTemplate: 'private hospital near {place}',
    },
  },
  {
    featureId: 'daycase',
    benefitId: 'axa-pmi',
    overview:
      'Day-case surgery and procedures where you are admitted and discharged on the same day, without an overnight stay. Common examples include certain orthopaedic, ENT, and diagnostic procedures done in a private day unit.',
    includedIntro: 'Approved day-case treatment can include:',
    includedItems: [
      'Use of a private day-patient unit or hospital day-case facility, including theatre and recovery areas.',
      'Consultant surgeon and anaesthetist fees for the listed procedure, when agreed in advance.',
      'Drugs, consumables, and pathology linked to the day-case episode.',
    ],
    costSummary:
      'Day-case fees at recognised providers are usually settled direct with AXA after authorisation. Your excess and any co-payment rules on your schedule still apply. Going ahead without approval, or using a non-network facility, can limit what AXA pays.',
    faqs: [
      {
        q: 'How is day-case different from in-patient cover?',
        a: 'Day-case is for procedures where you go home the same day. In-patient cover applies when you need to stay overnight. The same authorisation process usually applies to both.',
      },
      {
        q: 'Can physiotherapy after day-case surgery be included?',
        a: 'Rehabilitation may be covered under physiotherapy or as part of linked outpatient benefits if your policy and clinical pathway allow. Check when your procedure is authorised.',
      },
      {
        q: 'Who arranges the day-case appointment?',
        a: 'Your consultant or their secretary books the slot at a recognised hospital. AXA must confirm cover for the procedure code and facility before you attend.',
      },
    ],
    accessSteps: [
      {
        text: 'Get a referral or self-referral pathway to a specialist, depending on your condition.',
      },
      {
        text: 'Discuss day-case suitability and hospital options with your consultant.',
      },
      {
        text: 'Ensure the hospital submits an authorisation request to AXA Health.',
      },
      {
        text: 'Confirm approval in your online account or with the AXA helpline.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Attend on the day with ID, follow fasting instructions, and arrange someone to take you home if sedation is used.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find day surgery units near you',
      queryTemplate: 'private day surgery unit near {place}',
    },
  },
  {
    featureId: 'cancer-diag',
    benefitId: 'axa-pmi',
    overview:
      'Diagnostic tests when cancer is suspected or under investigation, including biopsies, blood markers, and imaging once a specialist recommends them and AXA agrees cover. You can use private diagnostics alongside NHS care if you share results with both teams.',
    includedIntro: 'Authorised cancer diagnostics include:',
    includedItems: [
      'Consultant-led diagnostic pathways, including biopsies and histology, when cancer is suspected or under investigation.',
      'PET, CT, MRI, ultrasound, and other imaging used specifically for cancer diagnosis as agreed by AXA.',
      'Pathology and laboratory reports needed to confirm or rule out a cancer diagnosis.',
    ],
    costSummary:
      'Approved cancer diagnostics are usually paid in line with your cancer benefit, often with direct settlement at recognised providers. Your excess may still apply depending on policy rules. Always obtain authorisation for non-emergency tests unless your guide says otherwise.',
    faqs: [
      {
        q: 'Do cancer diagnostics use my outpatient limit?',
        a: 'Cancer-related tests are often handled under dedicated cancer benefits rather than general outpatient limits, but this varies by employer scheme. Check your membership guide or ask AXA.',
      },
      {
        q: 'Can my NHS team and private diagnostics run in parallel?',
        a: 'Yes. Share results with both teams so your care stays coordinated.',
      },
      {
        q: 'What if a test is inconclusive?',
        a: 'Your specialist may recommend further tests. Contact AXA before additional investigations so each step is agreed and covered where eligible.',
      },
    ],
    accessSteps: [
      {
        text: 'Speak to your GP or use a covered private referral route if you have worrying symptoms.',
      },
      {
        text: 'See an eligible specialist who can request cancer diagnostics.',
      },
      {
        text: 'Ask the specialist or hospital to obtain AXA authorisation for each test or package.',
      },
      {
        text: 'Attend appointments at the agreed diagnostic centre or hospital.',
      },
      {
        text: 'Follow up with your specialist on results and next steps, including any treatment benefits.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find cancer diagnostic centres near you',
      queryTemplate: 'private cancer diagnostic centre near {place}',
    },
  },
  {
    featureId: 'cancer-surg',
    benefitId: 'axa-pmi',
    overview:
      'Surgery and in-patient or day-case hospital treatment for cancer, including operations to remove tumours and related hospital stays. Cover works alongside your cancer care pathway once treatment plans are agreed with AXA.',
    includedIntro: 'Approved cancer surgery includes:',
    includedItems: [
      'Surgical removal of cancerous tissue and reconstructive procedures listed on your treatment plan.',
      'Hospital stays, theatre time, anaesthesia, and inpatient nursing for the approved operation.',
      'Immediate post-operative care in hospital that forms part of the same surgical episode.',
    ],
    costSummary:
      'Cancer surgery at recognised hospitals is typically paid direct after authorisation. Specialist fees must be agreed in advance where your policy requires it. Your excess and any cancer-specific limits in your employer schedule apply.',
    faqs: [
      {
        q: 'Can I choose my cancer surgeon?',
        a: 'You can usually choose any eligible consultant who works at a recognised hospital and accepts AXA terms. Confirm surgeon and hospital fees are approved before the operation date.',
      },
      {
        q: 'Is rehabilitation after cancer surgery included?',
        a: 'Physiotherapy or other rehab may be covered under separate benefits if clinically needed and authorised. Ask AXA when your surgery is planned.',
      },
      {
        q: 'Does this cover experimental or trial surgery?',
        a: 'Cover is for established treatments your consultant and AXA agree are appropriate. Experimental procedures may be excluded unless specifically approved.',
      },
    ],
    accessSteps: [
      {
        text: 'Work with your oncology or surgical team on a treatment plan after diagnosis.',
      },
      {
        text: 'Ensure your consultant submits surgical authorisation to AXA Health with procedure codes.',
      },
      {
        text: 'Review approval and any cost share in your member account.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Book surgery dates with the hospital once cover is confirmed.',
      },
      {
        text: 'Plan recovery support and follow-up appointments, including drugs or radiotherapy if needed.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find cancer treatment hospitals near you',
      queryTemplate: 'private cancer hospital near {place}',
    },
  },
  {
    featureId: 'cancer-drugs',
    benefitId: 'axa-pmi',
    overview:
      'Chemotherapy and other licensed oncology drugs prescribed as part of an AXA-approved cancer care plan. Cover follows your policy rules for licensed drugs and authorisation, including drugs your NHS team may not offer on the same pathway.',
    includedIntro: 'When AXA approves your drug treatment plan, cover includes:',
    includedItems: [
      'Chemotherapy and other licensed cancer drugs administered in hospital or at home when agreed by AXA.',
      'Drugs used alongside surgery or radiotherapy that are part of an authorised treatment protocol.',
      'Supportive medicines given during an approved cancer drug episode where listed on your treatment plan.',
    ],
    costSummary:
      'High-cost cancer drugs require authorisation before treatment starts. Approved drugs at recognised providers are usually billed to AXA. You may pay your policy excess; co-payments for certain drug tiers depend on your employer scheme.',
    faqs: [
      {
        q: 'Are all cancer drugs covered?',
        a: 'Cover is for drugs that are clinically appropriate, licensed, and approved under your policy and AXA’s cancer rules. Some newer drugs need extra review.',
      },
      {
        q: 'Can chemotherapy be done at home?',
        a: 'Some regimes can be delivered at home through recognised providers if AXA agrees. Hospital-based infusion is more common for first-line treatment.',
      },
      {
        q: 'What if my consultant recommends a drug AXA has not approved yet?',
        a: 'Your team can ask AXA for an exceptional review. Do not start self-funded treatment without understanding how it affects future claims.',
      },
    ],
    accessSteps: [
      {
        text: 'Confirm your cancer treatment plan with your oncologist.',
      },
      {
        text: 'Ask the oncology unit to request drug and administration authorisation from AXA.',
      },
      {
        text: 'Wait for written approval before starting each new drug or cycle if required.',
      },
      {
        text: 'Attend hospital or home-care appointments as scheduled once approved.',
      },
      {
        text: 'Report side effects to your clinical team and contact AXA if your regimen changes.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find oncology units near you',
      queryTemplate: 'private oncology chemotherapy unit near {place}',
    },
  },
  {
    featureId: 'mental-talk',
    benefitId: 'axa-pmi',
    overview:
      'Talking therapies for common mental health difficulties such as anxiety, low mood, and stress-related problems. Access is usually through AXA’s mental wellbeing partner after a short assessment.',
    includedIntro: 'Talking therapy on your scheme can include:',
    includedItems: [
      'A set number of sessions per year with a qualified therapist, such as CBT or counselling, after triage.',
      'Phone or video appointments, with face-to-face options where offered and clinically suitable.',
      'Self-help material and brief education alongside therapy when your scheme includes them.',
    ],
    costSummary:
      'Sessions delivered through the AXA appointed pathway are included up to your scheme limit; you should not pay the therapist directly on that route. If you see someone outside the pathway, you may need to pay and claim within outpatient or mental health limits, if your policy allows.',
    faqs: [
      {
        q: 'How many therapy sessions do I get?',
        a: 'Session limits depend on your employer scheme and clinical recommendation after assessment. AXA or the therapy provider will confirm your allocation.',
      },
      {
        q: 'Is this the same as NHS Talking Therapies (IAPT)?',
        a: 'It is a separate private route for members. You can still use NHS Talking Therapies and keep your GP informed.',
      },
      {
        q: 'Can I choose my therapist?',
        a: 'The provider matches you based on availability and need. If a particular modality is clinically recommended, say so during assessment.',
      },
      {
        q: 'Are serious mental health crises covered here?',
        a: 'This benefit focuses on talking therapies. Crisis or inpatient psychiatric care may fall under different policy sections. Contact AXA or emergency services if you are at immediate risk.',
      },
    ],
    accessSteps: [
      {
        text: 'Log in to AXA Health and open Mental Wellbeing or Talking Therapies.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Complete the online or phone assessment about how you are feeling.',
      },
      {
        text: 'See how many sessions you get, then book therapy.',
      },
      {
        text: 'Book therapy appointments at times that suit you.',
      },
      {
        text: 'Tell your GP if your symptoms worsen or you need medication review.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find counselling and therapy near you',
      queryTemplate: 'CBT counselling therapist near {place}',
    },
  },
  {
    featureId: 'mental-assess',
    benefitId: 'axa-pmi',
    overview:
      'A structured mental health assessment when you need a clearer picture of symptoms, diagnosis, or next steps.',
    includedIntro: 'The assessment includes:',
    includedItems: [
      'An initial clinical assessment by phone or video with a mental health professional.',
      'A summary of recommended next steps, such as talking therapies, GP follow-up, or specialist referral.',
      'Links to AXA-covered treatment or other support when that fits your situation.',
    ],
    costSummary:
      'The assessment itself is included when accessed through the AXA mental health pathway. Further treatment may use separate benefits or limits. There is no charge for the assessment step on the appointed route.',
    faqs: [
      {
        q: 'Is this a full psychiatric diagnosis?',
        a: 'It is an assessment and routing service. A formal diagnosis may require ongoing specialist input beyond the initial appointment.',
      },
      {
        q: 'Can my employer see my assessment results?',
        a: 'Your employer receives scheme-level reporting only, not your personal clinical notes. AXA treats your health information confidentially under data protection rules.',
      },
      {
        q: 'Do I need a GP referral?',
        a: 'Usually no for the assessment entry point. The assessor may advise you to involve your GP for medication or long-term care.',
      },
    ],
    accessSteps: [
      {
        text: 'Sign in to your AXA Health member portal.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Select Mental Health Assessment or the wellbeing helpline option.',
      },
      {
        text: 'Book or start an assessment slot.',
      },
      {
        text: 'Take the call somewhere private and describe what is bothering you.',
      },
      {
        text: 'Follow the agreed plan, including booking talking therapies if offered.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: false,
      label: 'Find mental health services near you',
      queryTemplate: 'private mental health clinic near {place}',
    },
  },
  axaPhysioDetail,
  {
    featureId: 'msk-virtual',
    benefitId: 'axa-pmi',
    overview:
      'A remote assessment for muscle, bone, and joint problems when you are unsure whether you need physiotherapy, a specialist, or self-management. A clinician reviews your symptoms by phone or video and advises on next steps.',
    includedIntro: 'The virtual MSK assessment includes:',
    includedItems: [
      'A structured symptom review with a physiotherapist or MSK clinician by phone or video.',
      'Advice on exercises, pain management, and whether face-to-face treatment is appropriate.',
      'Referral into covered physiotherapy, imaging, or orthopaedic pathways when clinically needed and authorised.',
    ],
    costSummary:
      'The virtual assessment is included when you use the AXA MSK digital pathway. Follow-on treatment uses your physiotherapy, scan, or surgical benefits and may be subject to limits and excess.',
    faqs: [
      {
        q: 'Is this different from the physiotherapy benefit?',
        a: 'Yes. This is the first-step assessment. Hands-on physiotherapy sessions are claimed under the physiotherapy and osteopathy benefit if recommended.',
      },
      {
        q: 'Can I go straight to physio without the virtual assessment?',
        a: 'Many members can self-refer to physiotherapy directly. The virtual assessment is useful if you want guidance before booking treatment.',
      },
      {
        q: 'Will I always be offered face-to-face treatment?',
        a: 'Not always. Some conditions improve with guided exercises and advice. The clinician will recommend the most appropriate level of care.',
      },
    ],
    accessSteps: [
      {
        text: 'Log in to AXA Health and open Muscles, Bones and Joints.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Start the online symptom questionnaire.',
      },
      {
        text: 'Book a virtual MSK assessment appointment.',
      },
      {
        text: 'Join the phone or video call and discuss your movement and pain.',
      },
      {
        text: 'Book physiotherapy or request specialist referral if the clinician advises it.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: false,
      label: 'Find MSK clinics near you',
      queryTemplate: 'musculoskeletal clinic near {place}',
    },
  },
  {
    featureId: 'ortho',
    benefitId: 'axa-pmi',
    overview:
      'Orthopaedic surgery for eligible bone and joint conditions, such as knee or hip replacements and shoulder operations, when conservative treatment has not been enough. Treatment is delivered in private hospitals after authorisation.',
    includedIntro: 'Approved orthopaedic surgery includes:',
    includedItems: [
      'Consultant orthopaedic surgeon fees for the agreed operation.',
      'Hospital theatre, implant, and stay costs for in-patient or day-case orthopaedic surgery.',
      'Immediate post-operative hospital care linked to the same surgical admission.',
    ],
    costSummary:
      'Orthopaedic surgery requires authorisation with procedure codes and hospital choice confirmed in advance. Direct payment applies at recognised facilities where arranged. Implants and specialist fees must fall within scheme rates; your excess applies per your policy.',
    faqs: [
      {
        q: 'Do I need to try physiotherapy first?',
        a: 'Many pathways expect a period of conservative care such as physio and analgesia. Your surgeon and AXA will confirm what is required before surgery is approved.',
      },
      {
        q: 'Are joint replacements covered?',
        a: 'Major joint replacement is commonly covered when clinically indicated and authorised. Limits or wait criteria may apply on some employer schemes.',
      },
      {
        q: 'Is post-op physiotherapy included?',
        a: 'Rehabilitation often uses your physiotherapy benefit. Plan this when surgery is approved so sessions are agreed if needed.',
      },
    ],
    accessSteps: [
      {
        text: 'Access MSK or outpatient pathways to see an orthopaedic specialist.',
      },
      {
        text: 'Complete any required scans or conservative treatment.',
      },
      {
        text: 'Ask your surgeon to request surgical authorisation from AXA Health.',
      },
      {
        text: 'Confirm hospital and date once approval is received.',
      },
      {
        text: 'Arrange follow-up and physiotherapy after discharge.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find orthopaedic surgeons near you',
      queryTemplate: 'orthopaedic surgeon private hospital near {place}',
    },
  },
  {
    featureId: 'outpatient-consult',
    benefitId: 'axa-pmi',
    overview:
      'Private consultations with specialists when you have a referral or eligible self-referral route. Outpatient appointments help you diagnose and plan treatment without being admitted to hospital.',
    includedIntro: 'Outpatient specialist appointments include:',
    includedItems: [
      'Initial and follow-up consultant appointments at recognised private hospitals or clinics.',
      'Examination and clinical advice related to the referred condition.',
      'Referral onward for scans, surgery, or therapies that your policy covers when clinically appropriate.',
    ],
    costSummary:
      'Consultations are paid up to your outpatient benefit limit and may be subject to excess. Some schemes pay specialists direct; others require you to pay and claim. Check whether your referral must be from a GP or can be self-referral for your condition.',
    faqs: [
      {
        q: 'Do I need a GP referral?',
        a: 'Most specialties need a GP or virtual GP referral. Some MSK and mental health routes allow self-referral. See your membership guide.',
      },
      {
        q: 'Are follow-up appointments included?',
        a: 'Yes, when they relate to the same condition and remain within your outpatient limit for the policy year.',
      },
      {
        q: 'Can I see a specialist in London if I live elsewhere?',
        a: 'You can usually choose any UK recognised consultant, but travel costs are your own unless your scheme says otherwise.',
      },
    ],
    accessSteps: [
      {
        text: 'Obtain a referral from your GP, virtual GP, or an approved self-referral route.',
      },
      {
        text: 'Search for a recognised consultant and hospital via AXA or your member account.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Book an outpatient appointment with the consultant’s secretary.',
      },
      {
        text: 'Confirm whether AXA needs authorisation before the first visit.',
      },
      {
        text: 'Attend with your referral letter, membership number, and any test results.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find private specialists near you',
      queryTemplate: 'private hospital outpatient clinic near {place}',
    },
  },
  {
    featureId: 'scans',
    benefitId: 'axa-pmi',
    overview:
      'Private MRI, CT, and ultrasound when a GP or specialist recommends imaging and AXA authorises the scan. Results go to your referrer to plan next steps.',
    includedIntro: 'Authorised imaging includes:',
    includedItems: [
      'MRI, CT, or ultrasound scans performed at recognised diagnostic centres or hospitals.',
      'Radiologist reporting of the scan images for clinical use.',
      'Copy of results sent to your referring clinician to inform next steps.',
    ],
    costSummary:
      'Scans use outpatient or specialist diagnostic limits depending on your scheme. Authorised scans at network centres are often billed direct to AXA. Your excess may apply; self-pay scans without approval may not be fully reimbursed.',
    faqs: [
      {
        q: 'How quickly can I get a scan?',
        a: 'Private slots are often available within days or weeks, depending on modality and location. The centre will offer times after authorisation.',
      },
      {
        q: 'Do I need authorisation for every scan?',
        a: 'Yes for routine private imaging under PMI. Emergency NHS imaging is separate.',
      },
      {
        q: 'Can I have a scan with contrast?',
        a: 'If clinically required and approved, contrast-enhanced studies can be covered. The referrer must specify this on the request.',
      },
    ],
    accessSteps: [
      {
        text: 'Get a referral from a GP or specialist stating the scan type and clinical question.',
      },
      {
        text: 'Submit an authorisation request to AXA Health with the referral.',
      },
      {
        text: 'Once approved, book at the listed diagnostic centre.',
      },
      {
        text: 'Attend the appointment following any preparation instructions.',
      },
      {
        text: 'Follow up with your referrer to discuss results and treatment.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find MRI and CT scanning centres near you',
      queryTemplate: 'private MRI CT scan centre near {place}',
    },
  },
  {
    featureId: 'fertility',
    benefitId: 'axa-pmi',
    overview:
      'Employer-funded assisted fertility treatment when your AXA scheme includes it, such as IVF or ICSI subject to clinical criteria and lifetime limits. You use recognised private fertility clinics once AXA confirms you meet the rules.',
    includedIntro: 'When fertility funding is on your schedule, approved treatment includes:',
    includedItems: [
      'A defined number of IVF or ICSI cycles, or partial cycle funding, as set by your employer schedule.',
      'Monitoring scans and drugs tied to approved treatment cycles at recognised fertility units.',
      'Egg collection, embryo transfer, and related laboratory procedures within the funded package.',
    ],
    costSummary:
      'Fertility benefits have strict caps and eligibility rules. These often include age limits, relationship status, and whether you already have children. Treatment must be pre-authorised. Costs above the employer limit are self-funded. Unused cycles do not usually roll over.',
    faqs: [
      {
        q: 'Is fertility treatment on every AXA PMI scheme?',
        a: 'No. It is an optional employer benefit. Check your membership guide or ask HR whether assisted fertility is included and at what level.',
      },
      {
        q: 'What criteria must I meet?',
        a: 'Schemes commonly set age limits, require you to meet NICE-style clinical thresholds, and exclude certain prior treatments. AXA will confirm before you start.',
      },
      {
        q: 'Are storage fees for embryos covered?',
        a: 'Storage is sometimes limited or excluded after a set period. Read your schedule or ask AXA when authorising a cycle.',
      },
      {
        q: 'Can same-sex couples use this benefit?',
        a: 'Eligibility depends on employer policy wording. Many schemes now include equal access, but confirm with HR and AXA for your plan.',
      },
    ],
    accessSteps: [
      {
        text: 'Read your scheme fertility section in the membership guide or ask HR.',
      },
      {
        text: 'See your GP for initial investigations if required by the policy.',
      },
      {
        text: 'Contact AXA Health to register interest and confirm eligibility.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Choose a recognised fertility clinic and start the authorised treatment pathway.',
      },
      {
        text: 'Keep AXA updated on cycle progress so funding stays aligned with approval.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find fertility clinics near you',
      queryTemplate: 'private IVF fertility clinic near {place}',
    },
  },
  {
    featureId: 'breast',
    benefitId: 'axa-pmi',
    overview:
      'Private assessment of breast lumps and other symptoms when you are worried about changes. Cover can include a specialist clinic visit, imaging, and biopsy when AXA authorises each step. Use NHS urgent care or screening when that is the right route for you.',
    includedIntro: 'Authorised breast assessment includes:',
    includedItems: [
      'Specialist breast clinic appointment including clinical examination.',
      'Ultrasound, mammography, or other imaging appropriate to your age and symptoms when authorised.',
      'Needle biopsy or fine needle aspiration if the clinician recommends further investigation.',
    ],
    costSummary:
      'Breast assessment is usually handled under outpatient or cancer-related benefits with authorisation. Network providers bill AXA direct where arranged. Your excess applies according to your policy; cosmetic breast surgery is not covered under this pathway.',
    faqs: [
      {
        q: 'Should I still contact my GP or NHS breast screening?',
        a: 'Yes if you have urgent symptoms or are due NHS screening. PMI can run alongside NHS care; tell both teams what tests you have had.',
      },
      {
        q: 'How fast can I be seen?',
        a: 'Private breast clinics often offer appointments within days once referral and authorisation are in place.',
      },
      {
        q: 'What if something suspicious is found?',
        a: 'Your clinician will explain results and refer into cancer diagnostic or treatment benefits if needed, with AXA authorisation for next steps.',
      },
    ],
    accessSteps: [
      {
        text: 'Contact your GP or virtual GP if you notice a new lump, skin change, or discharge.',
      },
      {
        text: 'Request referral to a private breast unit or use AXA’s recommended providers.',
      },
      {
        text: 'Obtain authorisation from AXA Health before attending unless emergency NHS care is more appropriate.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Attend the clinic for examination and any same-day imaging.',
      },
      {
        text: 'Follow up on results and further tests as advised.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find breast clinics near you',
      queryTemplate: 'private breast clinic mammogram near {place}',
    },
  },
  {
    featureId: 'travel-extra',
    benefitId: 'axa-pmi',
    overview:
      'An optional worldwide emergency medical travel extension to your PMI when your employer has bought it. It covers emergency treatment abroad and medical repatriation under the add-on terms. It is not routine holiday insurance for cancellations or baggage.',
    includedIntro: 'With the travel add-on on your membership, emergency cover includes:',
    includedItems: [
      'Emergency inpatient and outpatient medical treatment while travelling outside the UK, subject to territorial limits.',
      'Medical repatriation or evacuation when local care is inadequate and AXA approves transport.',
      'Reasonable accompanying costs for a medical escort when clinically required and agreed.',
    ],
    costSummary:
      'The add-on is funded by your employer or may appear as a separate paid upgrade on some schemes. Cover limits, excesses, and excluded destinations apply. Always carry your AXA emergency travel contact details and membership number when abroad.',
    faqs: [
      {
        q: 'Is this a substitute for standalone travel insurance?',
        a: 'It focuses on emergency medical care linked to your PMI. It may not cover trip cancellation, gadgets, or adventure sports unless stated. Many people still buy comprehensive travel insurance.',
      },
      {
        q: 'Do I need to tell AXA before I travel?',
        a: 'Some schemes ask you to register trips or check destination cover. Review your add-on guide before booking travel.',
      },
      {
        q: 'What counts as an emergency?',
        a: 'Sudden illness or injury needing immediate treatment. Planned treatment abroad is usually excluded unless pre-approved.',
      },
    ],
    accessSteps: [
      {
        text: 'Confirm with HR or your membership guide that the travel add-on is on your policy.',
      },
      {
        text: 'Save the 24-hour emergency assistance number from your travel add-on documents.',
      },
      {
        text: 'Before long trips, check country exclusions and cover limits in your portal.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'If you need emergency care abroad, call assistance before non-urgent private treatment where possible.',
      },
      {
        text: 'Keep receipts and clinical reports for any claims or follow-up with AXA in the UK.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: false,
      label: 'Find travel assistance',
      queryTemplate: 'travel clinic near {place}',
    },
  },
  {
    featureId: 'dental-extra',
    benefitId: 'axa-pmi',
    overview:
      'A dental cash plan add-on that pays set amounts towards routine and restorative dental care when your employer includes it. You usually pay the dentist then claim back within annual cash limits.',
    includedIntro: 'Typical dental cash plan categories include:',
    includedItems: [
      'Cash back towards check-ups, hygiene visits, and X-rays up to annual limits per category.',
      'Contributions towards fillings, extractions, and other restorative work as listed in the schedule.',
      'Optional orthodontic or emergency dental allowances if your employer tier includes them.',
    ],
    costSummary:
      'This is a reimbursement cash plan, not full dental insurance. You pay the dentist first and submit claims through AXA within time limits. Percentages and caps vary by employer; cosmetic dentistry is usually excluded.',
    faqs: [
      {
        q: 'Can I use any dentist?',
        a: 'Most cash plans allow any GDC-registered dentist in the UK. Keep itemised receipts for claims.',
      },
      {
        q: 'How do I claim?',
        a: 'Submit claims online or by form with proof of payment. Processing times depend on AXA’s current turnaround.',
      },
      {
        q: 'Does this cover NHS dentistry?',
        a: 'Yes, you can claim eligible NHS charges where the plan allows, up to the cash limits for each treatment type.',
      },
    ],
    accessSteps: [
      {
        text: 'Check your dental cash plan limits in the membership guide.',
      },
      {
        text: 'Book with a dentist of your choice and pay at the appointment.',
      },
      {
        text: 'Log in to AXA Health to submit a dental claim with receipts.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Track reimbursement to your bank account or as stated on your plan.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: true,
      label: 'Find dentists near you',
      queryTemplate: 'NHS private dentist near {place}',
    },
  },
  {
    featureId: 'child-health',
    benefitId: 'axa-pmi',
    overview:
      'A telephone advice line for parents and carers of children covered on the policy, staffed by nurses or health advisers. It helps with worrying symptoms, feeding, and when to seek GP or emergency care.',
    includedIntro: 'The child health advice line offers:',
    includedItems: [
      '24/7 or extended-hours phone access to experienced paediatric-trained advisers, per your scheme.',
      'Guidance on common childhood illness, rashes, fever, and minor injuries.',
      'Signposting to NHS 111, A&E, GP, or covered private pathways when symptoms need escalation.',
    ],
    costSummary:
      'The advice line is included for eligible dependants on your membership at no per-call charge. It does not replace emergency services or pay for private paediatric consultations unless you use separate outpatient benefits.',
    faqs: [
      {
        q: 'What age children are covered?',
        a: 'Most schemes cover dependant children listed on the policy up to age 18, or 21 if in full-time education. Check your schedule.',
      },
      {
        q: 'Can the line prescribe medicine?',
        a: 'No. Advisers give information and signposting. Prescriptions need a GP or other prescriber.',
      },
      {
        q: 'Is it for emergencies?',
        a: 'For life-threatening emergencies call 999. Use the line for urgent questions when you are unsure what to do next.',
      },
    ],
    accessSteps: [
      {
        text: 'Find the child health advice number in your welcome pack or member portal.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Call from a quiet place with the child nearby if safe to do so.',
      },
      {
        text: 'Describe symptoms, age, and any medicines already given.',
      },
      {
        text: 'Follow the adviser’s recommendation, including NHS or private follow-up.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: false,
      label: 'Find paediatric care near you',
      queryTemplate: 'private paediatrician near {place}',
    },
  },
  {
    featureId: 'second-opinion',
    benefitId: 'axa-pmi',
    overview:
      'A remote second medical opinion from specialist physicians when you face a significant diagnosis or treatment plan. An independent expert reviews your records and summarises diagnosis and treatment choices.',
    includedIntro: 'The remote second opinion service includes:',
    includedItems: [
      'Collection and review of your medical notes, imaging, and pathology by an expert in the relevant specialty.',
      'A written report on diagnosis, treatment options, and questions you may want to ask your treating team.',
      'A follow-up call or video conference to discuss findings when included in the pathway.',
    ],
    costSummary:
      'Second opinions arranged through AXA’s appointed provider are included when your scheme offers the benefit, usually once per condition per year. It does not automatically fund treatment abroad or change your NHS care unless you pursue covered private options separately.',
    faqs: [
      {
        q: 'When should I request a second opinion?',
        a: 'Common reasons include new cancer diagnoses, major surgery proposals, or unclear treatment plans. Your treating consultant can remain involved.',
      },
      {
        q: 'Will my employer see my case details?',
        a: 'No personal clinical report is shared with your employer. The service is confidential to you and your clinicians.',
      },
      {
        q: 'Does the second opinion override my NHS doctor?',
        a: 'It is advisory. You decide with your treating teams how to use the report in NHS or private care.',
      },
      {
        q: 'How long does it take?',
        a: 'Turnaround depends on how quickly hospitals release your records. Often a few weeks. Complex cases can take longer.',
      },
    ],
    accessSteps: [
      {
        text: 'Log in to AXA Health and locate Second Medical Opinion or call the member helpline.',
        href: 'https://www.axahealth.co.uk/memberlogin',
      },
      {
        text: 'Register the condition you want reviewed and sign consent for records release.',
      },
      {
        text: 'Provide contact details for hospitals and consultants holding your notes.',
      },
      {
        text: 'Wait for the expert review and written report.',
      },
      {
        text: 'Discuss the findings with your treating doctor and decide on next steps.',
      },
    ],
    providerCta: {
      label: 'Go to AXA Health',
      href: 'https://www.axahealth.co.uk/memberlogin',
    },
    map: {
      enabled: false,
      label: 'Find specialists near you',
      queryTemplate: 'private specialist hospital near {place}',
    },
  },
]
