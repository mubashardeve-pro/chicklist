'use client';

import { useEffect, useRef, useState } from 'react';
import {
  COUNTRIES,
  FORM_SECTIONS,
  OFFICES,
  initialFormState,
} from '@/lib/constants';
import { openEmailApp } from '@/lib/email';
import { buildEmailTemplate, buildWhatsAppTemplate } from '@/lib/templates';
import { validateForm, validatePhoneNumber, validateEmailAddress } from '@/lib/validation';
import { openWhatsApp } from '@/lib/whatsapp';

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function ChecklistForm() {
  const [form, setForm] = useState(initialFormState);
  const [toast, setToast] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const pdfContentRef = useRef(null);
  const nameInputRef = useRef(null);
  const countrySelectRef = useRef(null);
  const toastTimerRef = useRef(null);

  const showToast = (message, duration = 3000) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(''), duration);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const toggleCheckbox = (section, value) => {
    setForm((prev) => {
      const current = prev.checked[section];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...prev,
        checked: { ...prev.checked, [section]: next },
      };
    });
  };

  const runValidation = () => {
    const result = validateForm(form);
    if (!result.valid) {
      showToast(result.message || 'Please complete the form.');
      if (!form.name.trim()) nameInputRef.current?.focus();
      else if (!form.country.trim()) countrySelectRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleDownload = async () => {
    if (!runValidation() || !pdfContentRef.current) return;

    setDownloading(true);
    showToast('Generating PDF...');

    try {
      const { generatePDF } = await import('@/lib/pdf');
      await generatePDF(pdfContentRef.current, form.country);
      showToast('PDF downloaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (!runValidation()) return;
    setWhatsappPhone('');
    setPhoneError('');
    setShowWhatsAppModal(true);
  };

  const handleWhatsAppSend = () => {
    const result = validatePhoneNumber(whatsappPhone);
    if (!result.valid) {
      setPhoneError(result.error || 'Invalid number.');
      return;
    }

    const messageText = buildWhatsAppTemplate(form).text;
    setPhoneError('');
    openWhatsApp(result.phone, messageText);
    setShowWhatsAppModal(false);
    showToast('Opening WhatsApp...');
  };

  const handleEmailClick = () => {
    if (!runValidation()) return;
    setClientEmail('');
    setEmailError('');
    setShowEmailModal(true);
  };

  const handleEmailSend = () => {
    const result = validateEmailAddress(clientEmail);
    if (!result.valid) {
      setEmailError(result.error || 'Invalid email.');
      return;
    }

    const summary = buildEmailTemplate(form);
    setEmailError('');
    openEmailApp(result.email, summary.text, summary.country);
    setShowEmailModal(false);
    showToast('Opening email...');
  };

  return (
    <div className="page-wrapper">
      <div className="action-bar no-print ">

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDownload}
          disabled={downloading}
        >
          <DownloadIcon />
          Download PDF
        </button>

        <button type="button" className="btn btn-whatsapp" onClick={handleWhatsAppClick}>
          <WhatsAppIcon />
          Share on WhatsApp
        </button>

        <button type="button" className="btn btn-email" onClick={handleEmailClick}>
          <EmailIcon />
          Share via Email
        </button>

      </div>




      <form className="checklist-form" onSubmit={(e) => e.preventDefault()}>
        <div ref={pdfContentRef} className="pdf-content">
          <header className="form-header">
            <div className="header-top">
              <div className="logo-section">
                <img
                  src="/logo.svg"
                  alt="Edify Group of Companies"
                  className="form-logo"
                />
              </div>

            </div>

            <div className="offices-row">
              {OFFICES.map((office) => (
                <div key={office.name} className="office">
                  <strong>{office.name}</strong>
                  <p>{office.address}</p>
                  <p>{office.phone}</p>
                </div>
              ))}
            </div>
          </header>

          <div className="title-row">
            <div className="title-banner">DOCUMENTS CHECKLIST</div>

          </div>
          <div className="client-info-row">

            <div className="country-field name-field">
              <label htmlFor="client-name">Name</label>
              <input
                id="client-name"
                ref={nameInputRef}
                type="text"
                className={form.name ? 'has-value' : ''}
                placeholder="Enter client name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="country-field">
              <label htmlFor="country">Country</label>
              <div className="country-input-wrap">
                <select
                  id="country"
                  ref={countrySelectRef}
                  className={form.country ? 'has-value' : ''}
                  value={form.country}
                  onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                >
                  <option value="">Select Country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <span
                  className={`country-pdf-value${form.country ? ' has-value' : ''}`}
                  aria-hidden="true"
                >
                  {form.country}
                </span>
              </div>
            </div>

          </div>

          {Object.keys(FORM_SECTIONS).map((key) => (
            <section key={key} className="form-section">
              <div className="section-banner">{FORM_SECTIONS[key].title}</div>


              <div className="checkbox-grid cols-5">
                {FORM_SECTIONS[key].items.map((item) => (
                  <label
                    key={item}
                    className={`check-item${form.checked[key].includes(item) ? ' is-selected' : ''}`}
                    onClick={() => toggleCheckbox(key, item)}
                  >
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </section>
          ))}

          <section className="form-section remarks-section">
            <div className="section-banner">Remarks</div>
            <textarea
              id="remarks"
              rows={5}
              placeholder="Enter any additional remarks here..."
              value={form.remarks}
              onChange={(e) => setForm((prev) => ({ ...prev, remarks: e.target.value }))}
            />
          </section>

          <footer className="form-footer">
            <p>Edify group UAN: +92 304 1111 444</p>
            <div className="footer-social">
              <span>info@edify.pk</span>
            </div>
          </footer>
        </div>
      </form>

      {showWhatsAppModal && (
        <div className="modal">
          <div className="modal-overlay" onClick={() => setShowWhatsAppModal(false)} />
          <div className="modal-box">
            <h3>Enter Client WhatsApp Number</h3>
            <p className="modal-hint">Mobile number likhein, message is number par jayega</p>
            <div className={`phone-input-wrap${phoneError ? ' has-error' : ''}`}>
              <span className="phone-prefix">+92</span>
              <input
                type="tel"
                className={phoneError ? 'input-error' : ''}
                placeholder="300 1234567"
                inputMode="numeric"
                autoComplete="tel"
                value={whatsappPhone}
                onChange={(e) => {
                  setWhatsappPhone(e.target.value);
                  setPhoneError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleWhatsAppSend();
                  }
                  if (e.key === 'Escape') setShowWhatsAppModal(false);
                }}
                autoFocus
              />
            </div>
            {phoneError && <p className="modal-error">{phoneError}</p>}
            <div className="modal-actions">
              <button type="button" className="btn btn-cancel" onClick={() => setShowWhatsAppModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-whatsapp" onClick={handleWhatsAppSend}>
                Send on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmailModal && (
        <div className="modal">
          <div className="modal-overlay" onClick={() => setShowEmailModal(false)} />
          <div className="modal-box">
            <h3>Enter Client Email Address</h3>
            <p className="modal-hint">Client ka email likhein, checklist is email par jayegi</p>
            <input
              type="email"
              className={`email-input${emailError ? ' input-error' : ''}`}
              placeholder="client@email.com"
              autoComplete="email"
              value={clientEmail}
              onChange={(e) => {
                setClientEmail(e.target.value);
                setEmailError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleEmailSend();
                }
                if (e.key === 'Escape') setShowEmailModal(false);
              }}
              autoFocus
            />
            {emailError && <p className="modal-error">{emailError}</p>}
            <div className="modal-actions">
              <button type="button" className="btn btn-cancel" onClick={() => setShowEmailModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-email" onClick={handleEmailSend}>
                Send via Email
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`toast${toast ? '' : ' hidden'}`}>{toast}</div>
    </div>
  );
}
