import React from 'react';
import { Wordmark } from '../core/Wordmark.jsx';

export const DEFAULT_NAV = [
  { label: 'Home', href: '/' },
  {
    label: 'Services', href: '/services/', children: [
      { label: 'Appliance installation', href: '/services/appliance-installation/' },
      { label: 'Gas piping', href: '/services/gas-piping/' },
      { label: 'Kitchens', href: '/services/kitchens/' },
      { label: 'Laundry rooms', href: '/services/laundry-rooms/' },
      { label: 'Plumbing fixtures', href: '/services/plumbing-fixtures/' },
      { label: 'Heaters', href: '/services/heaters/' },
    ],
  },
  {
    // v1 scope: only the two region hubs. Sub-region pages/links come back later.
    label: 'Service Areas', href: '/durham/', toggleOnly: true, children: [
      { label: 'Durham Region', href: '/durham/' },
      { label: 'Peterborough', href: '/peterborough/' },
    ],
  },
  { label: 'About', href: '/about/' },
  // No "Contact" item here — the header CTA ("Contact Us") already covers it.
];

export const DEFAULT_PHONES = [
  { name: 'Durham Region', phone: '905.259.6545', tel: '19052596545' },
  { name: 'Peterborough', phone: '705.742.0306', tel: '17057420306' },
];

const CSS = `
.ac-hd{position:relative;z-index:40;background:var(--color-bg);border-bottom:1px solid var(--color-border-strong);}
.ac-hd__bar{position:relative;max-width:var(--container-wide);margin-inline:auto;padding-inline:var(--gutter);display:flex;align-items:stretch;gap:var(--space-lg);}
.ac-hd__brand{display:flex;align-items:center;gap:var(--space-sm);text-decoration:none;color:var(--color-text);padding-block:var(--space-md);flex:none;}
.ac-hd__brand img{height:2.75rem;width:auto;}
.ac-hd__mark{font-family:var(--font-display);font-size:var(--text-lg);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);padding:0 .35em;line-height:1.4;}
.ac-hd__name{font-size:var(--text-md);display:flex;}
.ac-hd__nav{display:flex;align-items:stretch;margin-left:auto;font-size:var(--text-sm);font-weight:500;border-inline:1px solid var(--color-border);}
.ac-hd__item{position:relative;display:flex;}
.ac-hd__item + .ac-hd__item{border-left:1px solid var(--color-border);}
.ac-hd__link{display:flex;align-items:center;gap:.4em;padding:var(--space-md) var(--space-lg);text-decoration:none;color:var(--color-text-soft);white-space:nowrap;}
.ac-hd__item.is-current{box-shadow:inset 0 -3px 0 var(--color-accent);}
.ac-hd__item.is-current .ac-hd__link{color:var(--color-text);}
.ac-hd__link:hover{background:var(--color-bg-alt);color:var(--color-text);}
/* Dropdown items split in two: the label links to the section page, the
   chevron button opens/pins the dropdown (for pointers that can't hover). */
.ac-hd__item.has-menu .ac-hd__link{padding-right:var(--space-xs);}
.ac-hd__chev{display:flex;align-items:center;justify-content:center;min-width:2.25rem;padding:0 var(--space-sm) 0 var(--space-xs);background:none;border:0;color:var(--color-text-soft);cursor:pointer;font:inherit;}
.ac-hd__chev:hover,.ac-hd__chev[aria-expanded="true"]{background:var(--color-bg-alt);color:var(--color-text);}
/* toggleOnly items have no landing page: the whole label is the disclosure button. */
.ac-hd__item.is-toggle .ac-hd__link{padding-right:var(--space-lg);background:none;border:0;font:inherit;cursor:pointer;}
.ac-hd__item.is-toggle .ac-hd__link:hover,.ac-hd__item.is-toggle .ac-hd__link[aria-expanded="true"]{background:var(--color-bg-alt);color:var(--color-text);}
.ac-hd__caret{width:9px;height:9px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:translateY(-3px) rotate(45deg);flex:none;transition:transform var(--dur) var(--ease-standard);}
.ac-hd__chev[aria-expanded="true"] .ac-hd__caret,.ac-hd__link[aria-expanded="true"] .ac-hd__caret{transform:translateY(2px) rotate(-135deg);}
/* Desktop dropdown: ONE shared panel that morphs (size + x) between sections,
   modelled on varicent.com's primary nav. Every section is always rendered (so
   it can be measured, and its links are in the SSR HTML); only the active one is
   visible. The accent rule on top carries a thicker marker under the trigger. */
.ac-hd__pop{position:absolute;top:100%;left:0;z-index:1;pointer-events:none;opacity:0;visibility:hidden;translate:0 .5rem;
  background:var(--color-surface);border:1px solid var(--color-border-strong);border-top:2px solid var(--color-accent);box-shadow:var(--shadow-lg);
  transition:opacity var(--dur-slow) var(--ease-out),translate var(--dur-slow) var(--ease-out),visibility 0s linear var(--dur-slow);}
.ac-hd__pop.is-open{pointer-events:auto;opacity:1;visibility:visible;translate:0 0;transition:opacity var(--dur-slow) var(--ease-out),translate var(--dur-slow) var(--ease-out),visibility 0s;}
.ac-hd__pop.is-moving{transition:opacity var(--dur-slow) var(--ease-out),translate var(--dur-slow) var(--ease-out),visibility 0s,width var(--dur-slow) var(--ease-standard),height var(--dur-slow) var(--ease-standard),transform var(--dur-slow) var(--ease-standard);}
.ac-hd__pop-clip{position:relative;width:100%;height:100%;overflow:hidden;}
.ac-hd__pop-mark{position:absolute;top:-4px;left:0;height:4px;background:var(--color-accent);transform-origin:0 0;}
.ac-hd__pop.is-moving .ac-hd__pop-mark{transition:transform var(--dur-slow) var(--ease-standard),width var(--dur-slow) var(--ease-standard);}
.ac-hd__pane{position:absolute;top:0;left:0;width:max-content;padding:var(--space-md) 0;opacity:0;visibility:hidden;transition:opacity var(--dur) ease,visibility 0s linear var(--dur);}
.ac-hd__pane.is-active{opacity:1;visibility:visible;transition:opacity var(--dur) ease var(--dur-fast),visibility 0s;}
.ac-hd__navicon{width:1.5rem;height:1.5rem;flex:none;object-fit:contain;}
.ac-hd__pane-grid{display:grid;grid-template-columns:repeat(var(--cols,1),minmax(11rem,auto));column-gap:1px;}
.ac-hd__pane a{display:flex;align-items:center;gap:var(--space-sm);padding:var(--space-sm) var(--space-lg);text-decoration:none;color:var(--color-text-soft);white-space:nowrap;}
.ac-hd__pane a:hover,.ac-hd__pane a:focus-visible{background:var(--color-bg-alt);color:var(--color-text);}
.ac-hd__cta{display:flex;align-items:center;background:var(--cta-bg);color:var(--cta-text);text-decoration:none;font-weight:600;font-size:var(--text-sm);white-space:nowrap;padding-inline:var(--space-lg);margin-block:var(--space-sm);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);flex:none;}
.ac-hd__cta:hover{background:var(--cta-bg-hover);color:var(--cta-text-hover);box-shadow:var(--shadow-md);}
.ac-hd__burger{display:none;align-items:center;gap:.55em;margin-left:auto;background:var(--color-surface);color:var(--color-text);font:inherit;font-size:var(--text-sm);font-weight:600;padding:0 var(--space-md);margin-block:var(--space-sm);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);cursor:pointer;}
.ac-hd__burger:hover{background:var(--color-bg-alt);}
.ac-hd__bars{display:grid;gap:3px;width:16px;}
.ac-hd__bars i{display:block;height:2px;background:currentColor;}
.ac-hd__drawer{max-height:0;overflow:hidden;visibility:hidden;background:var(--color-bg);transition:max-height .35s ease,visibility 0s linear .35s;}
.ac-hd__drawer.is-open{max-height:100vh;visibility:visible;border-top:1px solid var(--color-border-strong);transition:max-height .35s ease,visibility 0s linear 0s;}
.ac-hd__sec{border-bottom:1px solid var(--color-border);}
.ac-hd__row{display:flex;align-items:stretch;}
.ac-hd__row > a{flex:1;padding:var(--space-md) var(--gutter);text-decoration:none;color:var(--color-text);font-weight:600;font-size:var(--text-md);}
.ac-hd__row > a:hover{background:var(--color-bg-alt);}
.ac-hd__toggle{flex:none;width:3.25rem;min-height:44px;display:flex;align-items:center;justify-content:center;background:none;border:0;border-left:1px solid var(--color-border);color:var(--color-text);font:inherit;font-size:var(--text-lg);cursor:pointer;}
.ac-hd__toggle:hover{background:var(--color-bg-alt);}
.ac-hd__toggle-icon{display:inline-block;transition:transform .25s ease;}
.ac-hd__toggle[aria-expanded="true"] .ac-hd__toggle-icon{transform:rotate(45deg);}
.ac-hd__sub{max-height:0;overflow:hidden;visibility:hidden;display:flex;flex-direction:column;background:var(--color-bg-alt);transition:max-height .3s ease,visibility 0s linear .3s;}
.ac-hd__sub.is-open{max-height:100vh;visibility:visible;border-top:1px solid var(--color-border);transition:max-height .3s ease,visibility 0s linear 0s;}
.ac-hd__sub a{padding:var(--space-sm) var(--gutter);padding-left:calc(var(--gutter) + var(--space-lg));text-decoration:none;color:var(--color-text-soft);font-size:var(--text-sm);min-height:44px;display:flex;align-items:center;gap:var(--space-sm);}
.ac-hd__sub a + a{border-top:1px solid var(--color-border);}
.ac-hd__sub a:hover{color:var(--color-text);background:var(--color-bg);}
.ac-hd__drawer-foot{display:grid;gap:1px;background:var(--color-border-strong);}
.ac-hd__phone{background:var(--color-bg);display:flex;flex-wrap:wrap;align-items:baseline;gap:var(--space-xs) var(--space-md);padding:var(--space-md) var(--gutter);text-decoration:none;color:var(--color-text);}
.ac-hd__phone span{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:600;color:var(--color-text-muted);}
.ac-hd__phone strong{font-family:var(--font-display);font-size:var(--text-lg);font-weight:var(--weight-display);letter-spacing:var(--tracking-tight);}
.ac-hd__drawer-cta{background:var(--cta-bg);color:var(--cta-text);text-align:center;text-decoration:none;font-weight:600;padding:var(--space-md);min-height:44px;}
@media (max-width:1180px){
  .ac-hd__link{padding-inline:var(--space-md);}
  .ac-hd__item.is-toggle .ac-hd__link{padding-right:var(--space-md);}
  .ac-hd__bar{gap:var(--space-md);}
  .ac-hd__name{font-size:var(--text-base);}
}
@media (max-width:1040px){
  .ac-hd__nav,.ac-hd__cta{display:none;}
  .ac-hd__burger{display:flex;}
}
@media (min-width:1041px){
  .ac-hd__drawer{display:none;}
}
@media (max-width:420px){
  .ac-hd__name{display:none;}
}
@media (prefers-reduced-motion:reduce){
  .ac-hd__drawer,.ac-hd__sub{transition:visibility 0s;}
  .ac-hd__toggle-icon{transition:none;}
  .ac-hd__pop,.ac-hd__pop.is-moving,.ac-hd__pop-mark,.ac-hd__pane{transition:none !important;}
}
`;

// Optional per-link icon (service links); decorative, the label carries the name.
const NavIcon = ({ src }) => (src ? <img className="ac-hd__navicon" src={src} alt="" width="24" height="24" /> : null);

// Two columns once a list gets long.
const paneCols = (children) => (children.length > 4 ? 2 : 1);
const paneId = (href) => `ac-hd-pane-${href.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home'}`;

export function Header({ nav = DEFAULT_NAV, phones = DEFAULT_PHONES, logoSrc, ctaLabel = 'Contact Us', ctaHref = '/contact/', currentPath, defaultOpen = false, defaultSection = null, onNavigate }) {
  // Desktop: `menu` is the open section's href; `moving` is true when the panel
  // was already open, so it slides/resizes to the new section instead of
  // popping in at its final spot.
  const [menu, setMenu] = React.useState(null);
  // `pinned`: opened by clicking the chevron — stays open until the chevron is
  // clicked again or the user clicks elsewhere. Hover-opened menus aren't pinned.
  const [pinned, setPinned] = React.useState(false);
  const [moving, setMoving] = React.useState(false);
  const [box, setBox] = React.useState(null);
  const [open, setOpen] = React.useState(defaultOpen);
  const [section, setSection] = React.useState(defaultSection);
  const barRef = React.useRef(null);
  const triggers = React.useRef({}); // whole item — the panel centres on it
  const labels = React.useRef({});
  const chevrons = React.useRef({});
  const navRef = React.useRef(null);
  const panes = React.useRef({});
  const closeTimer = React.useRef(null);
  const go = (href) => (e) => { if (onNavigate) { e.preventDefault(); onNavigate(href); } setOpen(false); close(); };
  const dropdowns = nav.filter((item) => item.children);

  const show = (href, pin = false) => {
    clearTimeout(closeTimer.current);
    setMoving(menu !== null && href !== null);
    setMenu(href);
    setPinned(pin && href !== null);
  };
  function close() { clearTimeout(closeTimer.current); setMenu(null); setPinned(false); }
  // Hover only counts for a real mouse; touch/pen taps also fire pointerenter,
  // which would otherwise open the menu a moment before the chevron's click.
  const isMouse = (e) => e.pointerType === 'mouse';
  const hoverIn = (item) => (e) => { if (isMouse(e) && !pinned) show(item.children ? item.href : null); };
  // Small grace period so the pointer can cross the gap between trigger and panel.
  const hoverOut = (e) => {
    if (!isMouse(e) || pinned) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(close, 150);
  };
  // Chevron: pin open (even if hover already opened it); a second click closes.
  const toggle = (item) => () => { if (menu === item.href && pinned) close(); else show(item.href, true); };
  React.useEffect(() => () => clearTimeout(closeTimer.current), []);

  // A pinned menu closes on any press outside the nav (the panel is inside it).
  React.useEffect(() => {
    if (!pinned) return undefined;
    const onDown = (e) => { if (!navRef.current?.contains(e.target)) close(); };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [pinned]);

  // Measure the active pane + its trigger, then place the panel centred under the
  // trigger (clamped inside the bar) with the marker sitting under the trigger.
  const measure = React.useCallback(() => {
    const bar = barRef.current, t = triggers.current[menu], pane = panes.current[menu];
    if (!bar || !t || !pane) return;
    const b = bar.getBoundingClientRect(), r = t.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(bar).paddingRight) || 0;
    // border-box sizing: add the panel's own borders (1px sides/bottom, 2px accent top).
    const w = pane.offsetWidth + 2, h = pane.offsetHeight + 3;
    const center = r.left - b.left + r.width / 2;
    const x = Math.max(pad, Math.min(center - w / 2, b.width - pad - w));
    setBox({ w, h, x, markX: r.left - b.left - x - 1, markW: r.width });
  }, [menu]);
  React.useLayoutEffect(() => { if (menu) measure(); }, [menu, measure]);
  React.useEffect(() => {
    if (!menu) return undefined;
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [menu, measure]);

  // Past the breakpoint the burger is display:none, so a drawer left open would
  // be unclosable — drop it as soon as the desktop nav takes over.
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width:1041px)');
    const sync = (e) => { if (e.matches) { setOpen(false); setSection(null); } };
    sync(mq);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const closeTo = (href) => { close(); chevrons.current[href]?.focus(); };
  const links = (href) => [...(panes.current[href]?.querySelectorAll('a') ?? [])];

  // The panel sits after all items in the DOM, so keyboard order is managed by
  // hand: label -> chevron -> its links (when open) -> next label (disclosure pattern).
  const onItemKey = (item) => (e) => {
    if (e.key === 'Escape' && menu) { e.preventDefault(); closeTo(menu); return; }
    if (!item.children) return;
    const fromChevron = e.target === chevrons.current[item.href];
    if ((e.key === 'Tab' && !e.shiftKey && fromChevron && menu === item.href) || e.key === 'ArrowDown') {
      e.preventDefault();
      if (menu !== item.href || !pinned) show(item.href, true);
      requestAnimationFrame(() => links(item.href)[0]?.focus());
    }
  };
  const onPaneKey = (item) => (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closeTo(item.href); return; }
    if (e.key !== 'Tab') return;
    const list = links(item.href);
    if (e.shiftKey && e.target === list[0]) { e.preventDefault(); chevrons.current[item.href]?.focus(); return; }
    if (!e.shiftKey && e.target === list[list.length - 1]) {
      const idx = nav.indexOf(item);
      const next = nav[idx + 1];
      if (next) { e.preventDefault(); close(); labels.current[next.href]?.focus(); }
    }
  };
  const onNavBlur = (e) => { if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) close(); };

  const active = nav.find((item) => item.href === menu);
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <header className="ac-hd">
        <div className="ac-hd__bar" ref={barRef}>
          <a className="ac-hd__brand" href="/" aria-label="The Appliance Connection — go to homepage" onClick={go('/')}>
            {logoSrc ? <img src={logoSrc} alt="" /> : <span className="ac-hd__mark" aria-hidden="true">AC</span>}
            <span className="ac-hd__name" aria-hidden="true"><Wordmark variant="flat" tone="dark" shadow={false} /></span>
          </a>
          <nav className="ac-hd__nav" aria-label="Primary" ref={navRef} onPointerLeave={hoverOut} onBlur={onNavBlur}>
            {nav.map((item) => (
              <div className={`ac-hd__item${item.children ? ' has-menu' : ''}${item.children && item.toggleOnly ? ' is-toggle' : ''}${currentPath === item.href ? ' is-current' : ''}`} key={item.href}
                ref={(el) => { triggers.current[item.href] = el; }}
                onPointerEnter={hoverIn(item)} onKeyDown={onItemKey(item)}>
                {item.children && item.toggleOnly ? (
                  <button className="ac-hd__link" type="button"
                    ref={(el) => { labels.current[item.href] = el; chevrons.current[item.href] = el; }}
                    onClick={toggle(item)}
                    aria-expanded={menu === item.href} aria-controls={paneId(item.href)}>
                    {item.label}
                    <i className="ac-hd__caret" aria-hidden="true"></i>
                  </button>
                ) : (
                  <a className="ac-hd__link" href={item.href} ref={(el) => { labels.current[item.href] = el; }}
                    onClick={go(item.href)}
                    aria-current={currentPath === item.href ? 'page' : undefined}>
                    {item.label}
                  </a>
                )}
                {item.children && !item.toggleOnly && (
                  <button className="ac-hd__chev" type="button" ref={(el) => { chevrons.current[item.href] = el; }}
                    onClick={toggle(item)}
                    aria-expanded={menu === item.href} aria-controls={paneId(item.href)}
                    aria-label={`${item.label} menu`}>
                    <i className="ac-hd__caret" aria-hidden="true"></i>
                  </button>
                )}
              </div>
            ))}
            {dropdowns.length > 0 && (
              <div className={`ac-hd__pop${active && box ? ' is-open' : ''}${moving ? ' is-moving' : ''}`}
                onPointerEnter={() => clearTimeout(closeTimer.current)}
                style={box ? { width: box.w, height: box.h, transform: `translateX(${box.x}px)` } : undefined}>
                {box && <span className="ac-hd__pop-mark" aria-hidden="true" style={{ width: box.markW, transform: `translateX(${box.markX}px)` }}></span>}
                <div className="ac-hd__pop-clip">
                  {dropdowns.map((item) => (
                    <div className={`ac-hd__pane${menu === item.href ? ' is-active' : ''}`} id={paneId(item.href)} key={item.href}
                      ref={(el) => { panes.current[item.href] = el; }} onKeyDown={onPaneKey(item)}>
                      <div className="ac-hd__pane-grid" style={{ '--cols': paneCols(item.children) }}>
                        {item.children.map((c) => <a key={c.href} href={c.href} onClick={go(c.href)}><NavIcon src={c.icon} />{c.label}</a>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </nav>
          <a className="ac-hd__cta" href={ctaHref} onClick={go(ctaHref)}>{ctaLabel}</a>
          <button className="ac-hd__burger" type="button" aria-expanded={open} aria-controls="ac-hd-drawer" onClick={() => setOpen(!open)}>
            <span className="ac-hd__bars" aria-hidden="true"><i></i><i></i><i></i></span>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className={`ac-hd__drawer${open ? ' is-open' : ''}`} id="ac-hd-drawer">
          {/* The logo already links home, so the drawer skips the redundant "Home" row. */}
          {nav.filter((item) => item.href !== '/').map((item) => (
            <div className="ac-hd__sec" key={item.href}>
              <div className="ac-hd__row">
                <a href={item.href} onClick={go(item.href)} aria-current={currentPath === item.href ? 'page' : undefined}>{item.label}</a>
                {item.children && (
                  <button className="ac-hd__toggle" type="button" aria-expanded={section === item.href}
                    aria-label={`${section === item.href ? 'Hide' : 'Show'} ${item.label} pages`}
                    onClick={() => setSection(section === item.href ? null : item.href)}>
                    <span className="ac-hd__toggle-icon" aria-hidden="true">+</span>
                  </button>
                )}
              </div>
              {item.children && (
                <div className={`ac-hd__sub${section === item.href ? ' is-open' : ''}`}>
                  {item.children.map((c) => <a key={c.href} href={c.href} onClick={go(c.href)}><NavIcon src={c.icon} />{c.label}</a>)}
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
