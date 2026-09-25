import React from 'react';

const CSS = `
.ac-ta{display:flex;flex-direction:column;gap:var(--space-2xs);}
.ac-ta label{font-size:var(--text-sm);font-weight:600;}
.ac-ta textarea{font:inherit;padding:.85em 1em;min-height:9rem;resize:vertical;border:1px solid var(--color-border-strong);border-radius:var(--radius-input);background:var(--color-surface);color:var(--color-text);box-shadow:var(--shadow-sm);}
.ac-ta textarea::placeholder{color:var(--color-text-muted);}
.ac-ta textarea:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px;}
.ac-ta textarea[aria-invalid="true"]{border-color:var(--color-error);border-width:2px;}
.ac-ta .ac-ta__note{font-size:var(--text-xs);color:var(--color-text-muted);}
.ac-ta .ac-ta__err{font-size:var(--text-xs);color:var(--color-error);font-weight:600;}
`;

export function Textarea({ id, label, placeholder, help, error, value, onChange, onBlur, required = false, rows = 5 }) {
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <div className="ac-ta">
        <label htmlFor={id}>{label}{required && ' *'}</label>
        <textarea id={id} rows={rows} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur}
          aria-invalid={!!error} aria-describedby={error || help ? `${id}-note` : undefined} />
        {error ? <span className="ac-ta__err" id={`${id}-note`}>{error}</span>
          : help ? <span className="ac-ta__note" id={`${id}-note`}>{help}</span> : null}
      </div>
    </React.Fragment>
  );
}
