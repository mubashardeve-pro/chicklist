const MAX_URL_LENGTH = 2048;

export function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

function truncateText(text, maxChars) {
  const chars = [...text];
  if (chars.length <= maxChars) return text;
  return `${chars.slice(0, maxChars).join('')}\n...`;
}

function buildWhatsAppUrl(phone, text) {
  // wa.me redirects mangle UTF-8 emojis; direct endpoints preserve them.
  const base = isMobileDevice()
    ? 'https://api.whatsapp.com/send'
    : 'https://web.whatsapp.com/send';

  let body = text;
  let url = '';

  for (let limit = body.length; limit > 100; limit = Math.floor(limit * 0.85)) {
    body = truncateText(text, limit);
    url = `${base}?phone=${phone}&text=${encodeURIComponent(body)}`;
    if (url.length <= MAX_URL_LENGTH) break;
  }

  return url;
}

export function openWhatsApp(phone, text) {
  const url = buildWhatsAppUrl(phone, text);

  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
