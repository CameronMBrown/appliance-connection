import React from 'react';
import { Wordmark } from '../core/Wordmark.jsx';

export const FOOTER_LINKS = [
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

const CSS = `
.ac-ft{--grid-line:rgba(255,255,255,.075);background-color:var(--neutral-900);background-image:var(--grid-image);background-size:var(--grid-size) var(--grid-size);color:var(--neutral-0);border-top:1px solid var(--color-border-strong);}
.ac-ft__in{max-width:var(--container-max);margin-inline:auto;padding-inline:var(--gutter);}
.ac-ft__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr));gap:1px;background:rgba(255,255,255,.2);}
.ac-ft__cell{background:var(--neutral-900);padding:var(--space-2xl) var(--space-lg);}
.ac-ft__cell--brand{display:flex;flex-direction:column;gap:var(--space-xl);align-items:flex-start;}
.ac-ft__brand{display:flex;align-items:center;gap:var(--space-sm);text-decoration:none;color:var(--neutral-0);}
.ac-ft__brand img{height:2.75rem;width:auto;}
.ac-ft__brand .ac-wm{font-size:var(--text-md);}
.ac-ft__cta{display:inline-flex;align-items:center;background:var(--cta-bg);color:var(--cta-text);text-decoration:none;font-weight:600;padding:.85em 1.5em;min-height:44px;border:1px solid var(--neutral-0);box-shadow:var(--shadow-md);}
.ac-ft__cta:hover{background:var(--cta-bg-hover);color:var(--cta-text-hover);}
.ac-ft__h{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:600;color:var(--neutral-400);margin:0 0 var(--space-md);}
.ac-ft__phone{display:block;font-size:var(--text-sm);color:var(--neutral-400);text-decoration:none;}
.ac-ft__phone + .ac-ft__phone{margin-top:var(--space-sm);}
.ac-ft__phone strong{display:block;font-family:var(--font-display);font-size:var(--text-lg);font-weight:var(--weight-display);letter-spacing:var(--tracking-tight);color:var(--neutral-0);}
.ac-ft__phone:hover strong{color:var(--wood-300);}
.ac-ft__links{display:flex;flex-direction:column;gap:var(--space-xs);font-size:var(--text-sm);}
.ac-ft__links a{color:var(--wood-300);text-decoration:none;min-height:24px;}
.ac-ft__links a:hover{color:var(--neutral-0);}
.ac-ft__legal{border-top:1px solid rgba(255,255,255,.2);padding-block:var(--space-lg);display:flex;flex-wrap:wrap;gap:var(--space-sm) var(--space-lg);align-items:center;font-size:var(--text-sm);color:var(--neutral-400);}
.ac-ft__legal p{margin:0;}
.ac-ft__utility{display:flex;gap:var(--space-lg);margin-left:auto;}
.ac-ft__utility a{color:var(--neutral-400);text-decoration:none;}
.ac-ft__utility a:hover{color:var(--neutral-0);}
@media (max-width:900px){
  .ac-ft__cell{padding:var(--space-xl) var(--space-lg);}
}
@media (max-width:600px){
  .ac-ft__grid{grid-template-columns:1fr;}
  .ac-ft__cell{padding-inline:0;}
  .ac-ft__cell--brand{gap:var(--space-lg);}
  .ac-ft__cta{width:100%;justify-content:center;}
  .ac-ft__utility{margin-left:0;}
}
`;

export function Footer({
  logoSrc,
  regions = [
    { name: 'Durham Region', phone: '905.259.6545', tel: '19052596545' },
    { name: 'Peterborough', phone: '705.742.0306', tel: '17057420306' },
  ],
  links = FOOTER_LINKS,
  utility = [{ label: 'Privacy', href: '/privacy/' }, { label: 'Legal', href: '/legal' }],
  ctaLabel = 'Contact Us',
  ctaHref = '/contact/',
  year = new Date().getFullYear(),
  onNavigate,
}) {
  const go = (href) => (e) => { if (onNavigate) { e.preventDefault(); onNavigate(href); } };
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <footer className="ac-ft on-dark">
        <div className="ac-ft__in">
          <div className="ac-ft__grid">
            <div className="ac-ft__cell ac-ft__cell--brand">
              <a className="ac-ft__brand" href="/" onClick={go('/')}>
                {logoSrc && <img src={logoSrc} alt="" />}
                <Wordmark variant="flat" tone="light" shadow={false} />
              </a>
              <a className="ac-ft__cta" href={ctaHref} onClick={go(ctaHref)}>{ctaLabel}</a>
            </div>
            <div className="ac-ft__cell">
              <h2 className="ac-ft__h">Call us</h2>
              {regions.map((r) => (
                <a className="ac-ft__phone" href={`tel:${r.tel}`} key={r.tel}>{r.name}<strong>{r.phone}</strong></a>
              ))}
            </div>
            <div className="ac-ft__cell">
              <h2 className="ac-ft__h">Site</h2>
              <nav className="ac-ft__links" aria-label="Footer">
                {links.map((l) => <a key={l.href} href={l.href} onClick={go(l.href)}>{l.label}</a>)}
              </nav>
            </div>
          </div>
          <div className="ac-ft__legal">
            <p>© {year} The Appliance Connection. All rights reserved.</p>
            <div className="ac-ft__utility">
              {utility.map((u) => <a key={u.href} href={u.href} onClick={go(u.href)}>{u.label}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
