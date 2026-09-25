import React from 'react';

const CSS = `
.ac-cb{display:flex;align-items:flex-start;gap:var(--space-sm);cursor:pointer;font-size:var(--text-sm);min-height:44px;padding-block:var(--space-2xs);}
.ac-cb input{position:absolute;opacity:0;width:0;height:0;}
.ac-cb__box{flex:none;width:1.25rem;height:1.25rem;margin-top:.15rem;border:1px solid var(--color-border-strong);background:var(--color-surface);box-shadow:var(--shadow-sm);display:grid;place-items:center;color:transparent;font-size:.8rem;line-height:1;transition:background var(--dur-fast) var(--ease-standard);}
.ac-cb input:checked + .ac-cb__box{background:var(--color-accent);color:var(--neutral-900);}
.ac-cb input:focus-visible + .ac-cb__box{outline:2px solid var(--focus-color);outline-offset:2px;}
.ac-cb input:disabled + .ac-cb__box{opacity:.45;}
.ac-cb__text{display:flex;flex-direction:column;gap:.15em;}
.ac-cb__text small{color:var(--color-text-muted);font-size:var(--text-xs);}
`;

export function Checkbox({ id, label, help, checked, onChange, disabled = false, name }) {
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <label className="ac-cb" htmlFor={id}>
        <input id={id} name={name} type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
        <span className="ac-cb__box" aria-hidden="true">✓</span>
        <span className="ac-cb__text">{label}{help && <small>{help}</small>}</span>
      </label>
    </React.Fragment>
  );
}
