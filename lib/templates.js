function sanitizeAscii(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E\n\r]/g, '')
    .trim();
}

function toSentenceCase(text) {
  if (!text) return text;
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

const SECTION_ICONS = {
  bio: '👤',
  edu: '🎓',
  english: '🗣️',
  support: '📎',
  attestation: '📜',
};

function formatWhatsAppList(items) {
  if (!items.length) return '  (none selected)';
  return items.map((item) => `  ✓ ${toSentenceCase(item)}`).join('\n');
}

function formatSectionListPlain(items) {
  if (!items.length) return '- None selected';
  return items.map((item) => `- ${toSentenceCase(item)}`).join('\n');
}

function getDate() {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function buildWhatsAppTemplate(form) {
  const name = sanitizeAscii(form.name) || 'Not specified';
  const country = sanitizeAscii(form.country) || 'Not specified';
  const remarks = sanitizeAscii(form.remarks) || 'None';
  const date = getDate();

  const text = [
    '🏢 *Edify group of companies*',
    '📋 *Documents checklist*',
    '',
    '-------------------------',
    `📅 Date: ${date}`,
    `👤 Name: *${name}*`,
    `🌍 Country: ${country}`,
    '-------------------------',
    '',
    `${SECTION_ICONS.bio} *Bio documents*`,
    formatWhatsAppList(form.checked.bio),
    '',
    `${SECTION_ICONS.edu} *Educational documents*`,
    formatWhatsAppList(form.checked.edu),
    '',
    `${SECTION_ICONS.english} *English language*`,
    formatWhatsAppList(form.checked.english),
    '',
    `${SECTION_ICONS.support} *Supporting documents*`,
    formatWhatsAppList(form.checked.support),
    '',
    `${SECTION_ICONS.attestation} *Attestation*`,
    formatWhatsAppList(form.checked.attestation),
    '',
    '📝 *Remarks*',
    remarks,
    '',
    '-------------------------',
    '🏢 *Edify group of companies*',
    '📞 UAN: +92 304 1111 444',
    '📧 info@edify.pk',
    '🌐 www.edify.pk',
  ].join('\n');

  return { name, country, remarks, text };
}

export function buildEmailTemplate(form) {
  const name = form.name.trim() || 'Not specified';
  const country = form.country.trim() || 'Not specified';
  const remarks = form.remarks.trim() || '-';
  const date = getDate();

  const text = [
    '🏢 Edify group of companies',
    '📋 Documents checklist',
    '',
    '-------------------------',
    `📅 Date: ${date}`,
    `👤 Name: ${name}`,
    `🌍 Country: ${country}`,
    '-------------------------',
    '',
    `${SECTION_ICONS.bio} Bio documents`,
    formatSectionListPlain(form.checked.bio),
    '',
    `${SECTION_ICONS.edu} Educational documents`,
    formatSectionListPlain(form.checked.edu),
    '',
    `${SECTION_ICONS.english} English language requirements`,
    formatSectionListPlain(form.checked.english),
    '',
    `${SECTION_ICONS.support} Supporting documents`,
    formatSectionListPlain(form.checked.support),
    '',
    `${SECTION_ICONS.attestation} Attestation of documents`,
    formatSectionListPlain(form.checked.attestation),
    '',
    '📝 Remarks',
    remarks,
    '',
    '-------------------------',
    '🏢 Edify group of companies',
    '📞 UAN: +92 304 1111 444',
    '📧 info@edify.pk',
    '🌐 www.edify.pk',
  ].join('\n');

  return { name, country, remarks, text };
}
