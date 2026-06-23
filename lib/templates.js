function sanitizeAscii(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E\n\r]/g, '')
    .trim();
}

function formatWhatsAppList(items) {
  if (!items.length) return '  (none selected)';
  return items.map((item) => `  [x] ${item}`).join('\n');
}

function formatSectionListPlain(items) {
  if (!items.length) return '- None selected';
  return items.map((item) => `- ${item}`).join('\n');
}

function getDate() {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function buildWhatsAppTemplate(form) {
  const country = sanitizeAscii(form.country) || 'Not specified';
  const remarks = sanitizeAscii(form.remarks) || 'None';
  const date = getDate();

  const text = [
    '*EDIFY GROUP OF COMPANIES*',
    '*DOCUMENTS CHECKLIST*',
    '',
    '-------------------------',
    `Date: ${date}`,
    `Country: ${country}`,
    '-------------------------',
    '',
    '*BIO DOCUMENTS*',
    formatWhatsAppList(form.checked.bio),
    '',
    '*EDUCATIONAL DOCUMENTS*',
    formatWhatsAppList(form.checked.edu),
    '',
    '*ENGLISH LANGUAGE*',
    formatWhatsAppList(form.checked.english),
    '',
    '*SUPPORTING DOCUMENTS*',
    formatWhatsAppList(form.checked.support),
    '',
    '*ATTESTATION*',
    formatWhatsAppList(form.checked.attestation),
    '',
    '*REMARKS*',
    remarks,
    '',
    '-------------------------',
    '*EDIFY GROUP OF COMPANIES*',
    'UAN: +92 304 1111 444',
    'info@edify.pk',
    'www.edify.pk',
  ].join('\n');

  return { country, remarks, text };
}

export function buildEmailTemplate(form) {
  const country = form.country.trim() || 'Not specified';
  const remarks = form.remarks.trim() || '-';
  const date = getDate();

  const text = [
    'EDIFY GROUP OF COMPANIES',
    'DOCUMENTS CHECKLIST',
    '',
    '-------------------------',
    `Date: ${date}`,
    `Country: ${country}`,
    '-------------------------',
    '',
    'BIO DOCUMENTS',
    formatSectionListPlain(form.checked.bio),
    '',
    'EDUCATIONAL DOCUMENTS',
    formatSectionListPlain(form.checked.edu),
    '',
    'ENGLISH LANGUAGE REQUIREMENTS',
    formatSectionListPlain(form.checked.english),
    '',
    'SUPPORTING DOCUMENTS',
    formatSectionListPlain(form.checked.support),
    '',
    'ATTESTATION OF DOCUMENTS',
    formatSectionListPlain(form.checked.attestation),
    '',
    'REMARKS',
    remarks,
    '',
    '-------------------------',
    'EDIFY GROUP OF COMPANIES',
    'UAN: +92 304 1111 444',
    'info@edify.pk',
    'www.edify.pk',
  ].join('\n');

  return { country, remarks, text };
}
