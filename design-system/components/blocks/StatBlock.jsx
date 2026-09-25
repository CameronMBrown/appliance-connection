import React from 'react';

const CSS = `
.ac-stats{display:grid;background:var(--color-surface);border:1px solid var(--color-border-strong);overflow:hidden;box-shadow:var(--shadow-md);grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));}
.ac-stat{background:var(--color-surface);box-shadow:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);padding:var(--space-xl) var(--space-lg);display:flex;flex-direction:column;gap:var(--space-xs);}
.ac-stat__v{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--text-xl);line-height:1.05;letter-spacing:var(--tracking-tight);color:var(--color-text);min-width:0;overflow-wrap:break-word;}
.ac-stat__l{font-size:var(--text-sm);color:var(--color-text-soft);max-width:22ch;}
.ac-stat--mark .ac-stat__v{display:flex;align-items:center;flex-wrap:wrap;gap:var(--space-xs) var(--space-sm);font-size:var(--text-lg);}
.ac-stat__tick{width:1.35rem;height:1.35rem;flex:none;border:1px solid var(--color-border-strong);background:var(--color-accent);color:var(--neutral-900);display:grid;place-items:center;font-family:var(--font-body);font-size:.8rem;}
@media (max-width:600px){.ac-stat{padding:var(--space-lg);}}
`;

export const DEFAULT_STATS = [
  { value: '30+', label: 'Years installing appliances across Durham and Peterborough' },
  { value: 'Licensed', label: 'Fully licensed and insured, gas fitting included', mark: true },
  { value: 'Warrantied', label: 'Every job we do is warrantied', mark: true },
  { value: '1000s', label: 'Installs completed' },
];

export function StatBlock({ stats = DEFAULT_STATS }) {
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <div className="ac-stats">
        {stats.map((s) => (
          <div className={`ac-stat${s.mark ? ' ac-stat--mark' : ''}`} key={s.label}>
            <span className="ac-stat__v">
              {s.mark && <span className="ac-stat__tick" aria-hidden="true">✓</span>}
              {s.value}
            </span>
            <span className="ac-stat__l">{s.label}</span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
