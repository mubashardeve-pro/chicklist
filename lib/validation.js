export function validateForm(form) {
  if (!form.country.trim()) {
    return { valid: false, message: 'Please select a Country before exporting.' };
  }

  const hasAnyChecked = Object.values(form.checked).some((items) => items.length > 0);
  if (!hasAnyChecked) {
    return { valid: false, message: 'Please select at least one document.' };
  }

  return { valid: true };
}

export function validatePhoneNumber(input) {
  const digits = input.replace(/\D/g, '');

  if (!digits) {
    return { valid: false, error: 'Please enter client mobile number.' };
  }

  let normalized = digits;

  if (normalized.startsWith('92')) {
    normalized = normalized.slice(2);
  }

  if (normalized.startsWith('0')) {
    normalized = normalized.slice(1);
  }

  if (!/^3[0-9]{9}$/.test(normalized)) {
    return {
      valid: false,
      error: 'Invalid number. Use format: 03001234567 or 3001234567',
    };
  }

  return { valid: true, phone: `92${normalized}` };
}

export function validateEmailAddress(input) {
  const email = input.trim();

  if (!email) {
    return { valid: false, error: 'Please enter client email address.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email. Use format: client@email.com' };
  }

  return { valid: true, email };
}
