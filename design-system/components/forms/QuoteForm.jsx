import React from 'react';

const CSS = `
.ac-qf{position:relative;background:var(--color-surface);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-lg);padding:clamp(1.5rem,4vw,var(--space-3xl));}
.ac-qf::before{content:"";position:absolute;top:0;left:0;width:10px;height:10px;background:var(--color-accent);}
.ac-qf__eyebrow{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:600;color:var(--color-text-muted);margin:0 0 var(--space-sm);}
.ac-qf__h{font-size:var(--text-2xl);margin:0 0 var(--space-md);}
.ac-qf__intro{color:var(--color-text-soft);margin:0 0 var(--space-xl);}
.ac-qf__fields{display:grid;gap:var(--space-lg);grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr));}
.ac-qf__fields .ac-qf__wide{grid-column:1/-1;}
.ac-qf__f{display:flex;flex-direction:column;gap:var(--space-2xs);}
.ac-qf__f label{font-size:var(--text-sm);font-weight:600;}
.ac-qf__f input,.ac-qf__f textarea{font:inherit;width:100%;padding:.85em 1em;border:1px solid var(--color-border-strong);border-radius:var(--radius-input);background:var(--color-surface);color:var(--color-text);box-shadow:var(--shadow-sm);}
.ac-qf__f textarea{min-height:9rem;resize:vertical;}
.ac-qf__f input::placeholder,.ac-qf__f textarea::placeholder{color:var(--color-text-muted);}
.ac-qf__f input:focus-visible,.ac-qf__f textarea:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px;}
.ac-qf__f [aria-invalid="true"]{border-color:var(--color-error);border-width:2px;}
.ac-qf__note{font-size:var(--text-xs);color:var(--color-text-muted);}
.ac-qf__err{font-size:var(--text-xs);color:var(--color-error);font-weight:600;}
.ac-qf__foot{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-md) var(--space-lg);margin-top:var(--space-xl);padding-top:var(--space-lg);border-top:1px solid var(--color-border);}
.ac-qf__submit{font:inherit;font-weight:600;cursor:pointer;background:var(--cta-bg);color:var(--cta-text);border:1px solid var(--color-border-strong);border-radius:var(--radius-none);box-shadow:var(--shadow-sm);padding:.95em 1.9em;min-height:44px;transition:background var(--dur) var(--ease-standard),color var(--dur) var(--ease-standard),box-shadow var(--dur) var(--ease-standard);}
.ac-qf__submit:hover{background:var(--cta-bg-hover);color:var(--cta-text-hover);box-shadow:var(--shadow-md);}
.ac-qf__summary{font-size:var(--text-sm);color:var(--color-error);font-weight:600;}
.ac-qf__ok{position:relative;background:var(--color-surface);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-lg);padding:clamp(1.5rem,4vw,var(--space-3xl));display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-md);}
.ac-qf__ok::before{content:"";position:absolute;top:0;left:0;width:10px;height:10px;background:var(--color-accent);}
.ac-qf__tick{width:2.5rem;height:2.5rem;border:1px solid var(--color-border-strong);background:var(--color-accent);color:var(--neutral-900);display:grid;place-items:center;font-size:1.25rem;box-shadow:var(--shadow-sm);}
.ac-qf__ok h3{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--text-2xl);margin:0;}
.ac-qf__ok p{margin:0;color:var(--color-text-soft);}
.ac-qf__again{font:inherit;font-size:var(--text-sm);font-weight:600;cursor:pointer;background:none;border:0;border-bottom:1px solid currentColor;color:var(--link);padding:0;}
.ac-qf__again:hover{color:var(--link-hover);}
`;

const EMPTY = { name: '', email: '', phone: '', message: '' };

function validate(values) {
  const e = {};
  if (!values.name.trim()) e.name = 'Tell us who we’re quoting.';
  if (!values.email.trim()) e.email = 'We need an email to send the quote.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = 'Enter a valid email address.';
  if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone number.';
  if (!values.message.trim()) e.message = 'Tell us how we can help.';
  return e;
}

export function QuoteForm({
  eyebrow = 'Get in touch',
  heading = 'Tell us what you need',
  intro = 'We respond within 24 hours.',
  submitLabel = 'Send message',
  successHeading = 'Message sent',
  successText = 'We’ll be in touch within 24 hours. Need us sooner? Call 905.259.6545 (Durham) or 705.742.0306 (Peterborough).',
  onSubmit,
}) {
  const [values, setValues] = React.useState(EMPTY);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k) => () => { setTouched({ ...touched, [k]: true }); setErrors(validate(values)); };
  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(found).length === 0) { if (onSubmit) onSubmit(values); setSent(true); }
  };
  const field = (k, label, type, placeholder, required) => (
    <div className={`ac-qf__f${k === 'message' ? ' ac-qf__wide' : ''}`}>
      <label htmlFor={`qf-${k}`}>{label}{required && ' *'}</label>
      {k === 'message'
        ? <textarea id={`qf-${k}`} placeholder={placeholder} value={values[k]} onChange={set(k)} onBlur={blur(k)}
            aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `qf-${k}-err` : undefined} />
        : <input id={`qf-${k}`} type={type} placeholder={placeholder} value={values[k]} onChange={set(k)} onBlur={blur(k)}
            aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `qf-${k}-err` : undefined} />}
      {errors[k] && <span className="ac-qf__err" id={`qf-${k}-err`}>{errors[k]}</span>}
    </div>
  );

  if (sent) {
    return (
      <React.Fragment>
        <style>{CSS}</style>
        <div className="ac-qf__ok" role="status">
          <span className="ac-qf__tick" aria-hidden="true">✓</span>
          <h3>{successHeading}</h3>
          <p>{successText}</p>
          <button className="ac-qf__again" type="button" onClick={() => { setValues(EMPTY); setErrors({}); setTouched({}); setSent(false); }}>Send another message</button>
        </div>
      </React.Fragment>
    );
  }

  const count = Object.keys(errors).length;
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <form className="ac-qf" onSubmit={submit} noValidate>
        {eyebrow && <p className="ac-qf__eyebrow">{eyebrow}</p>}
        {heading && <h2 className="ac-qf__h">{heading}</h2>}
        {intro && <p className="ac-qf__intro">{intro}</p>}
        <div className="ac-qf__fields">
          {field('name', 'Your name', 'text', 'Jane Doe', true)}
          {field('email', 'Email', 'email', 'jane@example.com', true)}
          {field('phone', 'Phone', 'tel', '(905) 555-0134', false)}
          {field('message', 'How can we help?', 'text', 'Double wall oven and cooktop, Whitby — gas line already run.', true)}
        </div>
        <div className="ac-qf__foot">
          <button className="ac-qf__submit" type="submit">{submitLabel}</button>
          {count > 0 && Object.keys(touched).length > 0
            ? <span className="ac-qf__summary">{count} field{count > 1 ? 's need' : ' needs'} attention.</span>
            : <span className="ac-qf__note">We respond within 24 hours.</span>}
        </div>
      </form>
    </React.Fragment>
  );
}
