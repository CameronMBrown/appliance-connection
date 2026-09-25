import React from 'react';

export function ServiceGrid({ heading, children }) {
  return (
    <React.Fragment>
      <style>{`
        .ac-services__head{display:flex;align-items:baseline;gap:var(--space-md);border-bottom:1px solid var(--color-border-strong);padding-bottom:var(--space-md);}
        .ac-services__heading{font-size:var(--text-2xl);margin:0;}
        /* Cells draw their own right/bottom rule and the container clips the
           overhang, so a short final row never exposes an ink gap. */
        .ac-services__grid{--cell-border:0;--cell-shadow:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);--cell-shadow-hover:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);display:grid;background:var(--color-surface);border:1px solid var(--color-border-strong);overflow:hidden;grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr));margin-top:var(--space-xl);box-shadow:var(--shadow-md);}
      `}</style>
      <section className="ac-services section">
        <div className="container">
          {heading && (
            <div className="ac-services__head">
              <h2 className="ac-services__heading">{heading}</h2>
            </div>
          )}
          <div className="ac-services__grid">{children}</div>
        </div>
      </section>
    </React.Fragment>
  );
}
