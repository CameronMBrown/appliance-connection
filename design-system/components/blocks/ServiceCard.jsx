import React from 'react';

export function ServiceCard({ title, description, url, index }) {
  return (
    <React.Fragment>
      <style>{`
        .ac-service-card{background:var(--color-surface);border:var(--cell-border,1px solid var(--color-border-strong));box-shadow:var(--cell-shadow,var(--shadow-sm));border-radius:var(--radius-none);padding:var(--space-lg);display:flex;flex-direction:column;gap:var(--space-xs);transition:box-shadow var(--dur) var(--ease-standard),background var(--dur) var(--ease-standard);}
        .ac-service-card:hover{background:var(--color-bg-alt);box-shadow:var(--cell-shadow-hover,var(--shadow-md));}
        .ac-service-card__index{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:var(--weight-semibold);color:var(--color-text-muted);}
        .ac-service-card__title{font-size:var(--text-lg);margin:0;}
        .ac-service-card__desc{color:var(--color-text-soft);font-size:var(--text-sm);margin:0;max-width:none;}
        .ac-service-card__link{color:var(--link);text-decoration:none;font-weight:var(--weight-semibold);font-size:var(--text-sm);margin-top:auto;padding-top:var(--space-md);border-top:1px solid var(--color-border);}
        .ac-service-card__link:hover{color:var(--link-hover);}
      `}</style>
      <article className="ac-service-card">
        {index && <span className="ac-service-card__index">{index}</span>}
        {title && <h3 className="ac-service-card__title">{title}</h3>}
        {description && <p className="ac-service-card__desc">{description}</p>}
        {url && <a className="ac-service-card__link" href={url}>Learn more →</a>}
      </article>
    </React.Fragment>
  );
}
