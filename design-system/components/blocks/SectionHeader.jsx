import React from 'react';

const CSS = `
.ac-sh{display:flex;flex-wrap:wrap;align-items:flex-end;gap:var(--space-md) var(--space-xl);padding-bottom:var(--space-lg);border-bottom:1px solid var(--color-border-strong);}
.ac-sh__copy{flex:1 1 20rem;}
.ac-sh__eyebrow{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:600;color:var(--color-text-muted);margin:0 0 var(--space-sm);}
.ac-sh__h{font-size:var(--text-2xl);margin:0;}
.ac-sh__text{margin:var(--space-sm) 0 0;color:var(--color-text-soft);}
.ac-sh__link{align-self:flex-end;font-size:var(--text-sm);font-weight:600;color:var(--link);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:.15em;white-space:nowrap;}
.ac-sh__link:hover{color:var(--link-hover);}
@media (max-width:600px){.ac-sh{gap:var(--space-md);}.ac-sh__link{align-self:flex-start;}}
`;

export function SectionHeader({ eyebrow, heading, text, linkLabel, linkHref, level = 2 }) {
  const H = `h${level}`;
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <div className="ac-sh">
        <div className="ac-sh__copy">
          {eyebrow && <p className="ac-sh__eyebrow">{eyebrow}</p>}
          {heading && <H className="ac-sh__h">{heading}</H>}
          {text && <p className="ac-sh__text">{text}</p>}
        </div>
        {linkLabel && <a className="ac-sh__link" href={linkHref || '#'}>{linkLabel} →</a>}
      </div>
    </React.Fragment>
  );
}
