import { isMobileDevice } from './whatsapp';

function openInNewTab(url) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function openEmailApp(clientEmail, text, country) {
  const subject = `Documents checklist - ${country} - Edify Group`;
  let body = text;

  if (body.length > 1000) {
    body = `${body.slice(0, 1000)}\n...`;
  }

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const encodedTo = encodeURIComponent(clientEmail);
  const mailtoUrl = `mailto:${clientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;

  if (isMobileDevice()) {
    openInNewTab(mailtoUrl);
    return;
  }

  openInNewTab(gmailUrl);
}
