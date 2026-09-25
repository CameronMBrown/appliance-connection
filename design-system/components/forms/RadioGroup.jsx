import React from 'react';

const CSS = `
.ac-rg{border:0;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-xs);}
.ac-rg legend{padding:0;font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-2xs);}
.ac-rg__opts{display:grid;gap:1px;background:var(--color-border-strong);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);}
.ac-rg__opts[data-row="true"]{grid-auto-flow:column;grid-auto-columns:1fr;}
.ac-rg__opt{display:flex;align-items:center;gap:var(--space-sm);background:var(--color-surface);padding:var(--space-md) var(--space-lg);min-height:44px;cursor:pointer;font-size:var(--text-sm);}
.ac-rg__opt:hover{background:var(--color-bg-alt);}
.ac-rg__opt input{position:absolute;opacity:0;width:0;height:0;}
.ac-rg__dot{flex:none;width:1.25rem;height:1.25rem;border:1px solid var(--color-border-strong);background:var(--color-surface);display:grid;place-items:center;}
.ac-rg__dot::after{content:"";width:.6rem;height:.6rem;background:transparent;}
.ac-rg__opt input:checked + .ac-rg__dot::after{background:var(--color-accent);}
.ac-rg__opt input:checked ~ .ac-rg__label{font-weight:600;}
.ac-rg__opt input:focus-visible + .ac-rg__dot{outline:2px solid var(--focus-color);outline-offset:2px;}
.ac-rg__note{font-size:var(--text-xs);color:var(--color-text-muted);}
@media (max-width:560px){.ac-rg__opts[data-row="true"]{grid-auto-flow:row;}}
`;

export function RadioGroup({ name, legend, options = [], value, onChange, help, row = false }) {
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <fieldset className="ac-rg">
        {legend && <legend>{legend}</legend>}
        <div className="ac-rg__opts" data-row={row ? 'true' : 'false'}>
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return (
              <label className="ac-rg__opt" key={opt.value}>
                <input type="radio" name={name} value={opt.value} checked={value === opt.value}
                  onChange={() => onChange && onChange(opt.value)} />
                <span className="ac-rg__dot" aria-hidden="true"></span>
                <span className="ac-rg__label">{opt.label}</span>
              </label>
            );
          })}
        </div>
        {help && <span className="ac-rg__note">{help}</span>}
      </fieldset>
    </React.Fragment>
  );
}
