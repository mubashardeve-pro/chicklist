export const COUNTRIES = [
  'United Kingdom',
  'Australia',
  'Canada',
  'United States',
  'Germany',
  'Malaysia',
  'Turkey',
  'China',
  'New Zealand',
  'Ireland',
];

export const OFFICES = [
  {
    name: 'Head Office (Faisalabad)',
    address: 'Edify Building, 3rd Floor, S1-S2 Susan Road, Madina Town.',
    phone: 'Ph: +92 41 850 18 93 - 94',
  },
  {
    name: 'Lahore (DHA Office)',
    address: '1st Floor, Plaza Y-213, DHA Phase 3, Near ChenOne.',
    phone: 'Ph: +92 42 3574 7733',
  },
  {
    name: 'Lahore (Johar Town Office)',
    address: '2nd Floor, Plot 391 J-III, Commercial Plaza, Nazria-e-Pakistan Avenue.',
    phone: 'Ph: +92 304 1111 44',
  },
  {
    name: 'Multan Office',
    address: "Twin Tower 10-A, Tehsil Chowk Near Masoom's Cafe Gulgasht, Bosan Road.",
    phone: 'Ph: +92 61 621 0066',
  },
  {
    name: 'Islamabad/Rawalpindi Office',
    address: 'Office No F1, 1st Floor, Interlace Plaza, Markaz, I-8.',
    phone: 'Ph: +92 51 612 7415',
  },
  {
    name: 'Peshawar Office',
    address: 'Office Number 6, 2nd Floor, Al-Haj Tower, University Road, Jahangir Abad.',
    phone: 'Ph: +92 91 260 1000',
  },
];

export const FORM_SECTIONS = {
  bio: {
    title: 'BIO DOCUMENTS',
    items: [
      'PASSPORT SCAN',
      'CNIC SCAN',
      'BIRTH CERTIFICATE',
      'FRC',
      'MARRIAGE CERTIFICATE',
    ],
  },
  edu: {
    title: 'EDUCATIONAL DOCUMENTS',
    items: [
      'SSC/HSSC (T/D)',
      'O LEVELS (T/D)',
      'A LEVELS (T/D)',
      'A/AS LEVEL',
      'HND (T/D)',
      'BACHELORS/ADP (T/D)',
      'MASTERS (T/D)',
      'CERTIFICATE',
      'GAP EVIDENCE',
      'IB/DP (T/D)',
    ],
  },
  english: {
    title: 'ENGLISH LANGUAGE REQUIREMENTS',
    items: [
      'IELTS',
      'ENGLISH PROFICIENCY',
      'MEDIUM COMMUNICATION',
      'PTE',
      'Duolingo',
      'LANGUAGE CERT',
      'OIETC',
      'UNIVERSITY INTERNAL TEST',
      'TOEFL',
    ],
  },
  support: {
    title: 'SUPPORTING DOCUMENTS',
    items: [
      'CV',
      'ACADEMIC REFERENCE LETTERS',
      'PROFESSIONAL RECOMMENDATION LETTERS',
      'EXPERIENCE LETTERS',
      'MEDICAL',
      'POLICE CHARACTER CERTIFICATE',
      'SOP',
    ],
  },
  attestation: {
    title: 'ATTESTATION OF DOCUMENTS',
    items: [
      'NOT REQUIRED',
      'REQUIRED',
      'BOARD & IBCC',
      'HEC',
      'MOFA',
      'SEALED ENVELOP',
    ],
  },
};

export const initialFormState = {
  name: '',
  country: '',
  remarks: '',
  checked: {
    bio: [],
    edu: [],
    english: [],
    support: [],
    attestation: [],
  },
};
