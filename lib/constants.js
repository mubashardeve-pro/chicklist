export const COUNTRIES = [
  'New Zealand',
  'Finland',
  'Turkey',
  'Sweden',
  'Australia',
  'Germany',
  'Ireland',
  'USA',
  'Cyprus',
  'UK',
  'Malaysia',
  'Dubai',
  'France',
  'Canada',
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
    title: 'Bio documents',
    items: [
      'Passport scan',
      'Cnic scan',
      'Birth certificate',
      'Frc',
      'Marriage certificate',
    ],
  },
  edu: {
    title: 'Educational documents',
    items: [
      'Ssc/hssc (t/d)',
      'O levels (t/d)',
      'A levels (t/d)',
      'A/as level',
      'Hnd (t/d)',
      'Bachelors/adp (t/d)',
      'Masters (t/d)',
      'Certificate',
      'Gap evidence',
      'Ib/dp (t/d)',
    ],
  },
  english: {
    title: 'English language requirements',
    items: [
      'Ielts',
      'English proficiency',
      'Medium communication',
      'Pte',
      'Duolingo',
      'Language cert',
      'Oietc',
      'University internal test',
      'Toefl',
    ],
  },
  support: {
    title: 'Supporting documents',
    items: [
      'Cv',
      'Academic reference letters',
      'Professional recommendation letters',
      'Experience letters',
      'Medical',
      'Police character certificate',
      'Sop',
    ],
  },
  attestation: {
    title: 'Attestation of documents',
    items: [
      'Not required',
      'Required',
      'Board & ibcc',
      'Hec',
      'Mofa',
      'Sealed envelop',
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
