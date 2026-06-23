import { FORM_SECTIONS } from './constants';

const SECTION_KEYS = ['bio', 'edu', 'english', 'support', 'attestation'];

function sanitizeAscii(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E\n\r]/g, '')
    .trim();
}

function formatWhatsAppList(items) {
  if (!items.length) return '  None';
  return items.map((item, index) => `  ${index + 1}. ${item}`).join('\n');
}

function formatSectionListPlain(items) {
  if (!items.length) return 'None';
  return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
}

function getDate() {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const CONTACT_FOOTER = [
  'UAN : +92 304 1111 444',
  'Contact Us : info@edify.pk',
  'WebSite : edify.pk',
];

function buildSectionBlocks(form, formatList, formatHeader) {
  const blocks = [];

  SECTION_KEYS.forEach((key, index) => {
    blocks.push(formatHeader(FORM_SECTIONS[key].title));
    blocks.push(formatList(form.checked[key]));
    if (index < SECTION_KEYS.length - 1) blocks.push('');
  });

  return blocks;
}

export function buildWhatsAppTemplate(form) {
  const name = sanitizeAscii(form.name) || 'Not specified';
  const country = sanitizeAscii(form.country) || 'Not specified';
  const remarks = sanitizeAscii(form.remarks) || 'None';
  const date = getDate();

  const text = [
    '*Edify Group of Companies*',
    '*DOCUMENTS CHECKLIST*',
    '',
    '-------------------------',
    `Date: ${date}`,
    `Student Name: *${name}*`,
    `Country: ${country}`,
    '-------------------------',
    '',
    ...buildSectionBlocks(form, formatWhatsAppList, (title) => `*${title}*`),
    '',
    '*Remarks*',
    remarks,
    '',
    '-------------------------',
    '*Edify Group of Companies*',
    ...CONTACT_FOOTER,
  ].join('\n');

  return { name, country, remarks, text };
}

export function buildEmailTemplate(form) {
  const name = form.name.trim() || 'Not specified';
  const country = form.country.trim() || 'Not specified';
  const remarks = form.remarks.trim() || '-';
  const date = getDate();

  const text = [
    'Edify Group of Companies',
    'DOCUMENTS CHECKLIST',
    '',
    '-------------------------',
    `Date: ${date}`,
    `Student Name: ${name}`,
    `Country: ${country}`,
    '-------------------------',
    '',
    ...buildSectionBlocks(form, formatSectionListPlain, (title) => title),
    '',
    'Remarks',
    remarks,
    '',
    '-------------------------',
    'Edify Group of Companies',
    ...CONTACT_FOOTER,
  ].join('\n');

  return { name, country, remarks, text };
}
