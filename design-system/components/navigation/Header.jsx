import React from 'react';
import { Wordmark } from '../core/Wordmark.jsx';

export const DEFAULT_NAV = [
  { label: 'Home', href: '/' },
  {
    label: 'Services', href: '/services/', children: [
      { label: 'All services', href: '/services/' },
      { label: 'Appliance installation', href: '/services/appliance-installation/' },
      { label: 'Gas piping', href: '/services/gas-piping/' },
      { label: 'Kitchens', href: '/services/kitchens/' },
      { label: 'Laundry rooms', href: '/services/laundry-rooms/' },
      { label: 'Plumbing fixtures', href: '/services/plumbing-fixtures/' },
      { label: 'Heaters', href: '/services/heaters/' },
    ],
  },
  {
    label: 'Durham', href: '/durham/', children: [
      { label: 'Durham Region', href: '/durham/' },
      { label: 'Oshawa', href: '/durham/oshawa/' },
      { label: 'Whitby', href: '/durham/whitby/' },
      { label: 'Pickering', href: '/durham/pickering/' },
    ],
  },
  {
    label: 'Peterborough', href: '/peterborough/', children: [
      { label: 'Peterborough', href: '/peterborough/' },
      { label: 'Lakefield', href: '/peterborough/lakefield/' },
      { label: 'Bridgenorth', href: '/peterborough/bridgenorth/' },
      { label: 'Ennismore', href: '/peterborough/ennismore/' },
    ],
  },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const DEFAULT_PHONES = [
  { name: 'Durham Region', phone: '905.259.6545', tel: '19052596545' },
  { name: 'Peterborough', phone: '705.742.0306', tel: '17057420306' },
];

const CSS = `
.ac-hd{position:relative;z-index:40;background:var(--color-bg);border-bottom:1px solid var(--color-border-strong);}
.ac-hd__bar{max-width:var(--container-wide);margin-inline:auto;padding-inline:var(--gutter);display:flex;align-items:stretch;gap:var(--space-lg);}
.ac-hd__brand{display:flex;align-items:center;gap:var(--space-sm);text-decoration:none;color:var(--color-text);padding-block:var(--space-md);flex:none;}
.ac-hd__brand img{height:2.75rem;width:auto;}
.ac-hd__mark{font-family:var(--font-display);font-size:var(--text-lg);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);padding:0 .35em;line-height:1.4;}
.ac-hd__name{font-size:var(--text-md);display:flex;}
.ac-hd__nav{display:flex;align-items:stretch;margin-left:auto;font-size:var(--text-sm);font-weight:500;border-inline:1px solid var(--color-border);}
.ac-hd__item{position:relative;display:flex;}
.ac-hd__item + .ac-hd__item{border-left:1px solid var(--color-border);}
.ac-hd__link{display:flex;align-items:center;gap:.4em;padding:var(--space-md) var(--space-lg);text-decoration:none;color:var(--color-text-soft);white-space:nowrap;}
.ac-hd__link[aria-current="page"]{color:var(--color-text);box-shadow:inset 0 -3px 0 var(--color-accent);}
.ac-hd__link:hover{background:var(--color-bg-alt);color:var(--color-text);}
.ac-hd__caret{width:5px;height:5px;border-right:1px solid currentColor;border-bottom:1px solid currentColor;transform:translateY(-2px) rotate(45deg);flex:none;}
.ac-hd__menu{position:absolute;top:100%;left:0;min-width:16rem;background:var(--color-surface);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-lg);display:flex;flex-direction:column;}
.ac-hd__menu::before{content:"";position:absolute;top:0;left:0;width:10px;height:10px;background:var(--color-accent);}
.ac-hd__menu a{padding:var(--space-sm) var(--space-lg);text-decoration:none;color:var(--color-text-soft);white-space:nowrap;}
.ac-hd__menu a:first-child{color:var(--color-text);font-weight:600;}
.ac-hd__menu a + a{border-top:1px solid var(--color-border);}
.ac-hd__menu a:hover{background:var(--color-bg-alt);color:var(--color-text);}
.ac-hd__cta{display:flex;align-items:center;background:var(--cta-bg);color:var(--cta-text);text-decoration:none;font-weight:600;font-size:var(--text-sm);white-space:nowrap;padding-inline:var(--space-lg);margin-block:var(--space-sm);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);flex:none;}
.ac-hd__cta:hover{background:var(--cta-bg-hover);color:var(--cta-text-hover);box-shadow:var(--shadow-md);}
.ac-hd__burger{display:none;align-items:center;gap:.55em;margin-left:auto;background:var(--color-surface);color:var(--color-text);font:inherit;font-size:var(--text-sm);font-weight:600;padding:0 var(--space-md);margin-block:var(--space-sm);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);cursor:pointer;}
.ac-hd__burger:hover{background:var(--color-bg-alt);}
.ac-hd__bars{display:grid;gap:3px;width:16px;}
.ac-hd__bars i{display:block;height:2px;background:currentColor;}
.ac-hd__drawer{display:none;border-top:1px solid var(--color-border-strong);background:var(--color-bg);}
.ac-hd__sec{border-bottom:1px solid var(--color-border);}
.ac-hd__row{display:flex;align-items:stretch;}
.ac-hd__row > a{flex:1;padding:var(--space-md) var(--gutter);text-decoration:none;color:var(--color-text);font-weight:600;font-size:var(--text-md);}
.ac-hd__row > a:hover{background:var(--color-bg-alt);}
.ac-hd__toggle{flex:none;width:3.25rem;min-height:44px;background:none;border:0;border-left:1px solid var(--color-border);color:var(--color-text);font:inherit;font-size:var(--text-lg);cursor:pointer;}
.ac-hd__toggle:hover{background:var(--color-bg-alt);}
.ac-hd__sub{display:flex;flex-direction:column;background:var(--color-bg-alt);border-top:1px solid var(--color-border);}
.ac-hd__sub a{padding:var(--space-sm) var(--gutter);padding-left:calc(var(--gutter) + var(--space-lg));text-decoration:none;color:var(--color-text-soft);font-size:var(--text-sm);min-height:44px;display:flex;align-items:center;}
.ac-hd__sub a + a{border-top:1px solid var(--color-border);}
.ac-hd__sub a:hover{color:var(--color-text);background:var(--color-bg);}
.ac-hd__drawer-foot{display:grid;gap:1px;background:var(--color-border-strong);}
.ac-hd__phone{background:var(--color-bg);display:flex;flex-wrap:wrap;align-items:baseline;gap:var(--space-xs) var(--space-md);padding:var(--space-md) var(--gutter);text-decoration:none;color:var(--color-text);}
.ac-hd__phone span{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:600;color:var(--color-text-muted);}
.ac-hd__phone strong{font-family:var(--font-display);font-size:var(--text-lg);font-weight:var(--weight-display);letter-spacing:var(--tracking-tight);}
.ac-hd__drawer-cta{background:var(--cta-bg);color:var(--cta-text);text-align:center;text-decoration:none;font-weight:600;padding:var(--space-md);min-height:44px;}
@media (max-width:1180px){
  .ac-hd__link{padding-inline:var(--space-md);}
  .ac-hd__bar{gap:var(--space-md);}
  .ac-hd__name{font-size:var(--text-base);}
}
@media (max-width:1040px){
  .ac-hd__nav,.ac-hd__cta{display:none;}
  .ac-hd__burger{display:flex;}
  .ac-hd__drawer.is-open{display:block;}
}
@media (max-width:420px){
  .ac-hd__name{display:none;}
}
`;

export function Header({ nav = DEFAULT_NAV, phones = DEFAULT_PHONES, logoSrc, ctaLabel = 'Contact Us', ctaHref = '/contact/', currentPath, defaultOpen = false, defaultSection = null, onNavigate }) {
  const [menu, setMenu] = React.useState(null);
  const [open, setOpen] = React.useState(defaultOpen);
  const [section, setSection] = React.useState(defaultSection);
  const go = (href) => (e) => { if (onNavigate) { e.preventDefault(); onNavigate(href); } setOpen(false); setMenu(null); };
  // Past the breakpoint the burger is display:none, so a drawer left open would
  // be unclosable — drop it as soon as the desktop nav takes over.
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width:1041px)');
    const sync = (e) => { if (e.matches) { setOpen(false); setSection(null); } };
    sync(mq);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const toggleMenu = (item) => (e) => {
    if (!item.children) return;
    e.preventDefault();
    setMenu(menu === item.href ? null : item.href);
  };
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <header className="ac-hd">
        <div className="ac-hd__bar">
          <a className="ac-hd__brand" href="/" onClick={go('/')}>
            {logoSrc ? <img src={logoSrc} alt="The Appliance Connection" /> : <span className="ac-hd__mark" aria-hidden="true">AC</span>}
            <span className="ac-hd__name"><Wordmark variant="flat" tone="dark" shadow={false} /></span>
          </a>
          <nav className="ac-hd__nav" aria-label="Primary">
            {nav.map((item) => (
              <div className="ac-hd__item" key={item.href}
                onMouseEnter={() => setMenu(item.children ? item.href : null)}
                onMouseLeave={() => setMenu(null)}
                onFocus={() => setMenu(item.children ? item.href : null)}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMenu(null); }}>
                <a className="ac-hd__link" href={item.href}
                  onClick={item.children ? toggleMenu(item) : go(item.href)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setMenu(null); }}
                  aria-current={currentPath === item.href ? 'page' : undefined}
                  aria-haspopup={item.children ? 'true' : undefined}
                  aria-expanded={item.children ? menu === item.href : undefined}>
                  {item.label}{item.children && <i className="ac-hd__caret" aria-hidden="true"></i>}
                </a>
                {item.children && menu === item.href && (
                  <div className="ac-hd__menu" onKeyDown={(e) => { if (e.key === 'Escape') setMenu(null); }}>
                    {item.children.map((c) => <a key={c.href} href={c.href} onClick={go(c.href)}>{c.label}</a>)}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <a className="ac-hd__cta" href={ctaHref} onClick={go(ctaHref)}>{ctaLabel}</a>
          <button className="ac-hd__burger" type="button" aria-expanded={open} aria-controls="ac-hd-drawer" onClick={() => setOpen(!open)}>
            <span className="ac-hd__bars" aria-hidden="true"><i></i><i></i><i></i></span>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className={`ac-hd__drawer${open ? ' is-open' : ''}`} id="ac-hd-drawer">
          {nav.map((item) => (
            <div className="ac-hd__sec" key={item.href}>
              <div className="ac-hd__row">
                <a href={item.href} onClick={go(item.href)} aria-current={currentPath === item.href ? 'page' : undefined}>{item.label}</a>
                {item.children && (
                  <button className="ac-hd__toggle" type="button" aria-expanded={section === item.href}
                    aria-label={`${section === item.href ? 'Hide' : 'Show'} ${item.label} pages`}
                    onClick={() => setSection(section === item.href ? null : item.href)}>{section === item.href ? '–' : '+'}</button>
                )}
              </div>
              {item.children && section === item.href && (
                <div className="ac-hd__sub">
                  {item.children.slice(1).map((c) => <a key={c.href} href={c.href} onClick={go(c.href)}>{c.label}</a>)}
                </div>
              )}
            </div>
          ))}
          <div className="ac-hd__drawer-foot">
            {phones.map((p) => (
              <a className="ac-hd__phone" href={`tel:${p.tel}`} key={p.tel}><span>{p.name}</span><strong>{p.phone}</strong></a>
            ))}
            <a className="ac-hd__drawer-cta" href={ctaHref} onClick={go(ctaHref)}>{ctaLabel}</a>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
