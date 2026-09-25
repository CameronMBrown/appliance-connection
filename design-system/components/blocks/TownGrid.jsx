import React from 'react';

const CSS = `
.ac-tg + .ac-tg{margin-top:var(--space-2xl);}
.ac-tg__head{display:flex;flex-wrap:wrap;align-items:baseline;gap:var(--space-sm) var(--space-md);padding-bottom:var(--space-md);border-bottom:1px solid var(--color-border-strong);}
.ac-tg__region{font-size:var(--text-lg);margin:0;}
.ac-tg__hub{font-size:var(--text-sm);font-weight:600;color:var(--link);text-decoration:none;border-bottom:1px solid currentColor;}
.ac-tg__hub:hover{color:var(--link-hover);}
.ac-tg__note{margin-left:auto;font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:600;color:var(--color-text-muted);}
.ac-tg__grid{display:grid;background:var(--color-surface);border:1px solid var(--color-border-strong);border-top:0;overflow:hidden;box-shadow:var(--shadow-sm);grid-template-columns:repeat(auto-fit,minmax(min(100%,11rem),1fr));}
.ac-tg__town{background:var(--color-surface);box-shadow:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);color:var(--color-text);text-decoration:none;padding:var(--space-lg) var(--space-lg);min-height:44px;display:flex;align-items:center;justify-content:space-between;gap:var(--space-sm);font-size:var(--text-sm);font-weight:600;transition:background var(--dur-fast) var(--ease-standard);}
.ac-tg__town span{color:var(--color-text-muted);font-weight:400;font-size:var(--text-xs);}
.ac-tg__town:hover{background:var(--color-bg-alt);color:var(--color-text);}
.ac-tg__town:hover span{color:var(--color-accent-deep);}
.ac-tg__plain{background:var(--color-surface);box-shadow:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);padding:var(--space-lg);font-size:var(--text-sm);color:var(--color-text-muted);display:flex;align-items:center;}
`;

export function TownGrid({ regions = [] }) {
  return (
    <React.Fragment>
      <style>{CSS}</style>
      {regions.map((r) => (
        <section className="ac-tg" key={r.name}>
          <div className="ac-tg__head">
            <h3 className="ac-tg__region">{r.name}</h3>
            {r.href && <a className="ac-tg__hub" href={r.href}>Region page</a>}
            {r.note && <span className="ac-tg__note">{r.note}</span>}
          </div>
          <div className="ac-tg__grid">
            {r.towns.map((t) => {
              const town = typeof t === 'string' ? { name: t } : t;
              return town.href
                ? <a className="ac-tg__town" href={town.href} key={town.name}>{town.name}<span aria-hidden="true">→</span></a>
                : <div className="ac-tg__plain" key={town.name}>{town.name}</div>;
            })}
          </div>
        </section>
      ))}
    </React.Fragment>
  );
}
