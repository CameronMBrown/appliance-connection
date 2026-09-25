import React from 'react';

export function CtaBand({ heading, text, ctaLabel, ctaUrl, isDark = true }) {
  return (
    <React.Fragment>
      <style>{`
        .ac-cta-band{background-color:var(--color-bg);border-block:1px solid var(--color-border-strong);}
        .ac-cta-band__box{position:relative;background:var(--color-bg-alt);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-lg);padding:clamp(1.75rem,4vw,3rem);display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-lg) var(--space-2xl);}
        .ac-cta-band__box::before{content:"";position:absolute;top:0;left:0;width:10px;height:10px;background:var(--color-accent);}
        .ac-cta-band__copy{flex:1 1 22rem;}
        .ac-cta-band__heading{font-size:var(--text-2xl);margin:0 0 var(--space-xs);}
        .ac-cta-band__text{color:var(--color-text-soft);margin:0;}
      `}</style>
      <section className={`ac-cta-band section grid-paper${isDark ? ' on-dark' : ''}`}>
        <div className="container">
          <div className="ac-cta-band__box">
            <div className="ac-cta-band__copy">
              {heading && <h2 className="ac-cta-band__heading">{heading}</h2>}
              {text && <p className="ac-cta-band__text">{text}</p>}
            </div>
            {ctaLabel && <a className="btn btn--primary" href={ctaUrl || '#'}>{ctaLabel}</a>}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
