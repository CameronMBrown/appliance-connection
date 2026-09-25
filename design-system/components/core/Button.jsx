import React from 'react';

const VARIANTS = ['primary', 'secondary', 'ghost'];

export function Button({ variant = 'primary', href, onClick, type = 'button', disabled = false, children }) {
  const v = VARIANTS.includes(variant) ? variant : 'primary';
  const cls = `ac-btn ac-btn--${v}${disabled ? ' is-disabled' : ''}`;
  const style = (
    <style>{`
      .ac-btn{display:inline-flex;align-items:center;gap:.5em;font:inherit;font-weight:var(--weight-semibold);line-height:1;text-decoration:none;border-radius:var(--radius-none);padding:.85em 1.5em;border:1px solid var(--color-border-strong);cursor:pointer;transition:background var(--dur) var(--ease-standard),color var(--dur) var(--ease-standard),box-shadow var(--dur) var(--ease-standard);}
      .ac-btn--primary{background:var(--cta-bg);color:var(--cta-text);box-shadow:var(--shadow-sm);}
      .ac-btn--primary:hover{background:var(--cta-bg-hover);color:var(--cta-text-hover);box-shadow:var(--shadow-md);}
      .ac-btn--secondary{background:var(--cta2-bg);color:var(--cta2-text);border-color:var(--cta2-border);}
      .ac-btn--secondary:hover{background:var(--cta2-text);color:var(--color-bg);}
      .ac-btn--ghost{background:none;color:var(--link);padding:.2em .1em;border-color:transparent;border-bottom:1px solid currentColor;}
      .ac-btn--ghost:hover{color:var(--link-hover);}
      .ac-btn.is-disabled{opacity:.45;cursor:not-allowed;box-shadow:none;}
    `}</style>
  );
  if (href && !disabled) {
    return (<React.Fragment>{style}<a className={cls} href={href}>{children}</a></React.Fragment>);
  }
  return (<React.Fragment>{style}<button className={cls} type={type} onClick={onClick} disabled={disabled}>{children}</button></React.Fragment>);
}
