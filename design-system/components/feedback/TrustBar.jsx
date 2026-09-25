import React from 'react';

export function TrustBar({ items = ['30+ years', 'Licensed & insured', 'Certified plumber', 'Every job warrantied'] }) {
  return (
    <React.Fragment>
      <style>{`
        .ac-trustbar{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));background:var(--color-surface);border:1px solid var(--color-border-strong);overflow:hidden;box-shadow:var(--shadow-sm);}
        .ac-badge{display:flex;align-items:center;gap:.65em;background:var(--color-surface);box-shadow:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);padding:var(--space-md) var(--space-lg);font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--color-text);}
        .ac-badge .ac-b-ic{width:1.35rem;height:1.35rem;flex:none;border:1px solid var(--color-border-strong);border-radius:var(--radius-none);background:var(--color-accent-tint);color:var(--color-text);display:grid;place-items:center;font-size:.8rem;}
      `}</style>
      <div className="ac-trustbar">
        {items.map((label) => (
          <span className="ac-badge" key={label}><span className="ac-b-ic" aria-hidden="true">✓</span> {label}</span>
        ))}
      </div>
    </React.Fragment>
  );
}
