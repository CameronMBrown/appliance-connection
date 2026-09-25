import React from 'react';

const CSS = `
.ac-sel{display:flex;flex-direction:column;gap:var(--space-2xs);}
.ac-sel label{font-size:var(--text-sm);font-weight:600;}
.ac-sel__wrap{position:relative;display:flex;}
.ac-sel select{font:inherit;flex:1;appearance:none;padding:.85em 3em .85em 1em;border:1px solid var(--color-border-strong);border-radius:var(--radius-input);background:var(--color-surface);color:var(--color-text);box-shadow:var(--shadow-sm);cursor:pointer;}
.ac-sel select:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px;}
.ac-sel select[aria-invalid="true"]{border-color:var(--color-error);border-width:2px;}
.ac-sel__btn{position:absolute;top:1px;right:1px;bottom:1px;width:2.5rem;border-left:1px solid var(--color-border-strong);background:var(--color-bg-alt);display:grid;place-items:center;pointer-events:none;}
.ac-sel__caret{width:7px;height:7px;border-right:1px solid var(--color-text);border-bottom:1px solid var(--color-text);transform:translateY(-2px) rotate(45deg);}
.ac-sel .ac-sel__note{font-size:var(--text-xs);color:var(--color-text-muted);}
.ac-sel .ac-sel__err{font-size:var(--text-xs);color:var(--color-error);font-weight:600;}
`;

export function Select({ id, label, options = [], placeholder, help, error, value, onChange, onBlur, required = false }) {
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <div className="ac-sel">
        <label htmlFor={id}>{label}{required && ' *'}</label>
        <div className="ac-sel__wrap">
          <select id={id} value={value} onChange={onChange} onBlur={onBlur} aria-invalid={!!error}
            aria-describedby={error || help ? `${id}-note` : undefined}>
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((o) => {
              const opt = typeof o === 'string' ? { value: o, label: o } : o;
              return <option key={opt.value} value={opt.value}>{opt.label}</option>;
            })}
          </select>
          <span className="ac-sel__btn" aria-hidden="true"><i className="ac-sel__caret"></i></span>
        </div>
        {error ? <span className="ac-sel__err" id={`${id}-note`}>{error}</span>
          : help ? <span className="ac-sel__note" id={`${id}-note`}>{help}</span> : null}
      </div>
    </React.Fragment>
  );
}
