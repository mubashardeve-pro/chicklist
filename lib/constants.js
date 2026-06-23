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
    title: 'Bio Documents',
    items: [
      'Passport Scan',
      'CNIC scan',
      'Birth Certificate',
      'FRC',
      'Marriage Certificate',
    ],
  },
  edu: {
    title: 'Educational Documents',
    items: [
      'SSC/HSSC (D/H)',
      'O Levels (D/H)',
      'A Levels (D/H)',
      'A/AS Level',
      'HND (D/H)',
      'Bachelors/ADP (D/H)',
      'Masters (D/H)',
      'Certificate',
      'Gap Evidence',
      'IB/DP (D/H)',
    ],
  },
  english: {
    title: 'English Language Requirements',
    items: [
      'Ielts',
      'English Proficiency',
      'Medium Communication',
      'PTE',
      'Duolingo',
      'Language Certificate',
      'OETC',
      'University Internal Test',
      'TOEFL',
    ],
  },
  support: {
    title: 'Supporting Documents',
    items: [
      'CV',
      'Academic Reference Letters',
      'Professional Recommendation Letters',
      'Experience Letters',
      'Medical',
      'Police Character Certificate',
      'SOP',
    ],
  },
  attestation: {
    title: 'Attestation of Documents',
    items: [
      'Not required',
      'Required',
      'Board & IBCC',
      'HEC',
      'MOFA',
      'Sealed Envelop',
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
