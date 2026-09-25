import React from 'react';

export function FormField({ id, label, type = 'text', placeholder, help, error, value, onChange, required = false }) {
  return (
    <React.Fragment>
      <style>{`
        .ac-field{display:flex;flex-direction:column;gap:var(--space-2xs);max-width:22rem;}
        .ac-field label{font-size:var(--text-sm);font-weight:var(--weight-semibold);}
        .ac-field input,.ac-field textarea{font:inherit;padding:.7em .9em;border:1px solid var(--color-border-strong);border-radius:var(--radius-input);background:var(--color-surface);color:var(--color-text);box-shadow:var(--shadow-sm);}
        .ac-field input::placeholder,.ac-field textarea::placeholder{color:var(--color-text-muted);}
        .ac-field input:focus-visible,.ac-field textarea:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px;}
        .ac-field .ac-help{font-size:var(--text-xs);color:var(--color-text-muted);}
        .ac-field .ac-err{font-size:var(--text-xs);color:var(--color-error);font-weight:var(--weight-semibold);}
        .ac-field input[aria-invalid="true"]{border-color:var(--color-error);border-width:2px;}
      `}</style>
      <div className="ac-field">
        <label htmlFor={id}>{label}{required && ' *'}</label>
        <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} aria-invalid={!!error} />
        {error ? <span className="ac-err">{error}</span> : help ? <span className="ac-help">{help}</span> : null}
      </div>
    </React.Fragment>
  );
}
