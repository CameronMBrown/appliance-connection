/* @ds-bundle: {"format":4,"namespace":"TheApplianceConnectionDesignSystem_d4d2d2","components":[{"name":"Accordion","sourcePath":"components/blocks/Accordion.jsx"},{"name":"CtaBand","sourcePath":"components/blocks/CtaBand.jsx"},{"name":"Hero","sourcePath":"components/blocks/Hero.jsx"},{"name":"SectionHeader","sourcePath":"components/blocks/SectionHeader.jsx"},{"name":"ServiceCard","sourcePath":"components/blocks/ServiceCard.jsx"},{"name":"ServiceGrid","sourcePath":"components/blocks/ServiceGrid.jsx"},{"name":"DEFAULT_STATS","sourcePath":"components/blocks/StatBlock.jsx"},{"name":"StatBlock","sourcePath":"components/blocks/StatBlock.jsx"},{"name":"Tabs","sourcePath":"components/blocks/Tabs.jsx"},{"name":"TownGrid","sourcePath":"components/blocks/TownGrid.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"CallBar","sourcePath":"components/feedback/CallBar.jsx"},{"name":"Testimonial","sourcePath":"components/feedback/Testimonial.jsx"},{"name":"TrustBar","sourcePath":"components/feedback/TrustBar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"FormField","sourcePath":"components/forms/FormField.jsx"},{"name":"QuoteForm","sourcePath":"components/forms/QuoteForm.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"FOOTER_LINKS","sourcePath":"components/navigation/Footer.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"DEFAULT_NAV","sourcePath":"components/navigation/Header.jsx"},{"name":"DEFAULT_PHONES","sourcePath":"components/navigation/Header.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"}],"sourceHashes":{"components/blocks/Accordion.jsx":"961e1a3c4ef7","components/blocks/CtaBand.jsx":"abed192f572b","components/blocks/Hero.jsx":"de27c24ce009","components/blocks/SectionHeader.jsx":"8299d0dc23b5","components/blocks/ServiceCard.jsx":"79b2d4111325","components/blocks/ServiceGrid.jsx":"c06d73b92539","components/blocks/StatBlock.jsx":"3403acd53668","components/blocks/Tabs.jsx":"50259572f09c","components/blocks/TownGrid.jsx":"906b6cfd108d","components/core/Button.jsx":"71db3dceea05","components/core/Wordmark.jsx":"bce3a851212b","components/feedback/CallBar.jsx":"4027ac3e3e48","components/feedback/Testimonial.jsx":"e242f578116d","components/feedback/TrustBar.jsx":"f9dcf5260e26","components/forms/Checkbox.jsx":"dbe5c6a6dc2f","components/forms/FormField.jsx":"bb8f16f1f3c7","components/forms/QuoteForm.jsx":"f660f5c55920","components/forms/RadioGroup.jsx":"93a8c6fd5030","components/forms/Select.jsx":"5ca05b801974","components/forms/Textarea.jsx":"7aedbcc8bf55","components/navigation/Footer.jsx":"bf80b5ffe900","components/navigation/Header.jsx":"bec5bb856272","ui_kits/website/App.jsx":"db3039edc907","ui_kits/website/pages/AboutPage.jsx":"44823cd232c4","ui_kits/website/pages/ContactPage.jsx":"bd1b96b39f0a","ui_kits/website/pages/HomePage.jsx":"1509a5b7f239","ui_kits/website/pages/RegionPage.jsx":"af7d238f6dd7","ui_kits/website/pages/ServicePage.jsx":"78cbd71f3a9b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TheApplianceConnectionDesignSystem_d4d2d2 = window.TheApplianceConnectionDesignSystem_d4d2d2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/blocks/Accordion.jsx
try { (() => {
const CSS = `
.ac-ac{border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);background:var(--color-surface);}
.ac-ac__item + .ac-ac__item{border-top:1px solid var(--color-border);}
.ac-ac__q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:var(--space-lg);text-align:left;font:inherit;font-size:var(--text-md);font-weight:600;color:var(--color-text);background:none;border:0;cursor:pointer;padding:var(--space-lg) var(--space-xl);min-height:44px;}
.ac-ac__q:hover{background:var(--color-bg-alt);}
.ac-ac__q:focus-visible{outline:2px solid var(--focus-color);outline-offset:-2px;}
.ac-ac__tick{flex:none;position:relative;width:1.25rem;height:1.25rem;border:1px solid var(--color-border-strong);background:var(--color-surface);}
.ac-ac__tick::before,.ac-ac__tick::after{content:"";position:absolute;background:var(--color-text);transition:opacity var(--dur-fast) var(--ease-standard);}
.ac-ac__tick::before{left:20%;right:20%;top:calc(50% - .5px);height:1px;}
.ac-ac__tick::after{top:20%;bottom:20%;left:calc(50% - .5px);width:1px;}
.ac-ac__item[data-open="true"] .ac-ac__tick{background:var(--color-accent);}
.ac-ac__item[data-open="true"] .ac-ac__tick::after{opacity:0;}
.ac-ac__a{padding:0 var(--space-xl) var(--space-xl);color:var(--color-text-soft);}
.ac-ac__a p{margin:0;max-width:var(--measure);}
@media (max-width:600px){.ac-ac__q{padding:var(--space-md) var(--space-lg);}.ac-ac__a{padding:0 var(--space-lg) var(--space-lg);}}
`;
function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = []
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = i => () => {
    if (open.includes(i)) setOpen(open.filter(x => x !== i));else setOpen(allowMultiple ? [...open, i] : [i]);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
    className: "ac-ac"
  }, items.map((item, i) => {
    const isOpen = open.includes(i);
    return /*#__PURE__*/React.createElement("div", {
      className: "ac-ac__item",
      "data-open": isOpen,
      key: item.question || i
    }, /*#__PURE__*/React.createElement("button", {
      className: "ac-ac__q",
      type: "button",
      "aria-expanded": isOpen,
      "aria-controls": `ac-ac-${i}`,
      onClick: toggle(i)
    }, /*#__PURE__*/React.createElement("span", null, item.question), /*#__PURE__*/React.createElement("span", {
      className: "ac-ac__tick",
      "aria-hidden": "true"
    })), isOpen && /*#__PURE__*/React.createElement("div", {
      className: "ac-ac__a",
      id: `ac-ac-${i}`
    }, /*#__PURE__*/React.createElement("p", null, item.answer)));
  })));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/blocks/CtaBand.jsx
try { (() => {
function CtaBand({
  heading,
  text,
  ctaLabel,
  ctaUrl,
  isDark = true
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .ac-cta-band{background-color:var(--color-bg);border-block:1px solid var(--color-border-strong);}
        .ac-cta-band__box{position:relative;background:var(--color-bg-alt);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-lg);padding:clamp(1.75rem,4vw,3rem);display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-lg) var(--space-2xl);}
        .ac-cta-band__box::before{content:"";position:absolute;top:0;left:0;width:10px;height:10px;background:var(--color-accent);}
        .ac-cta-band__copy{flex:1 1 22rem;}
        .ac-cta-band__heading{font-size:var(--text-2xl);margin:0 0 var(--space-xs);}
        .ac-cta-band__text{color:var(--color-text-soft);margin:0;}
      `), /*#__PURE__*/React.createElement("section", {
    className: `ac-cta-band section grid-paper${isDark ? ' on-dark' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-cta-band__box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-cta-band__copy"
  }, heading && /*#__PURE__*/React.createElement("h2", {
    className: "ac-cta-band__heading"
  }, heading), text && /*#__PURE__*/React.createElement("p", {
    className: "ac-cta-band__text"
  }, text)), ctaLabel && /*#__PURE__*/React.createElement("a", {
    className: "btn btn--primary",
    href: ctaUrl || '#'
  }, ctaLabel)))));
}
Object.assign(__ds_scope, { CtaBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/CtaBand.jsx", error: String((e && e.message) || e) }); }

// components/blocks/SectionHeader.jsx
try { (() => {
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
function SectionHeader({
  eyebrow,
  heading,
  text,
  linkLabel,
  linkHref,
  level = 2
}) {
  const H = `h${level}`;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
    className: "ac-sh"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-sh__copy"
  }, eyebrow && /*#__PURE__*/React.createElement("p", {
    className: "ac-sh__eyebrow"
  }, eyebrow), heading && /*#__PURE__*/React.createElement(H, {
    className: "ac-sh__h"
  }, heading), text && /*#__PURE__*/React.createElement("p", {
    className: "ac-sh__text"
  }, text)), linkLabel && /*#__PURE__*/React.createElement("a", {
    className: "ac-sh__link",
    href: linkHref || '#'
  }, linkLabel, " \u2192")));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/blocks/ServiceCard.jsx
try { (() => {
function ServiceCard({
  title,
  description,
  url,
  index
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .ac-service-card{background:var(--color-surface);border:var(--cell-border,1px solid var(--color-border-strong));box-shadow:var(--cell-shadow,var(--shadow-sm));border-radius:var(--radius-none);padding:var(--space-lg);display:flex;flex-direction:column;gap:var(--space-xs);transition:box-shadow var(--dur) var(--ease-standard),background var(--dur) var(--ease-standard);}
        .ac-service-card:hover{background:var(--color-bg-alt);box-shadow:var(--cell-shadow-hover,var(--shadow-md));}
        .ac-service-card__index{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:var(--weight-semibold);color:var(--color-text-muted);}
        .ac-service-card__title{font-size:var(--text-lg);margin:0;}
        .ac-service-card__desc{color:var(--color-text-soft);font-size:var(--text-sm);margin:0;max-width:none;}
        .ac-service-card__link{color:var(--link);text-decoration:none;font-weight:var(--weight-semibold);font-size:var(--text-sm);margin-top:auto;padding-top:var(--space-md);border-top:1px solid var(--color-border);}
        .ac-service-card__link:hover{color:var(--link-hover);}
      `), /*#__PURE__*/React.createElement("article", {
    className: "ac-service-card"
  }, index && /*#__PURE__*/React.createElement("span", {
    className: "ac-service-card__index"
  }, index), title && /*#__PURE__*/React.createElement("h3", {
    className: "ac-service-card__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "ac-service-card__desc"
  }, description), url && /*#__PURE__*/React.createElement("a", {
    className: "ac-service-card__link",
    href: url
  }, "Learn more \u2192")));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/blocks/ServiceGrid.jsx
try { (() => {
function ServiceGrid({
  heading,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .ac-services__head{display:flex;align-items:baseline;gap:var(--space-md);border-bottom:1px solid var(--color-border-strong);padding-bottom:var(--space-md);}
        .ac-services__heading{font-size:var(--text-2xl);margin:0;}
        /* Cells draw their own right/bottom rule and the container clips the
           overhang, so a short final row never exposes an ink gap. */
        .ac-services__grid{--cell-border:0;--cell-shadow:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);--cell-shadow-hover:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);display:grid;background:var(--color-surface);border:1px solid var(--color-border-strong);overflow:hidden;grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr));margin-top:var(--space-xl);box-shadow:var(--shadow-md);}
      `), /*#__PURE__*/React.createElement("section", {
    className: "ac-services section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, heading && /*#__PURE__*/React.createElement("div", {
    className: "ac-services__head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ac-services__heading"
  }, heading)), /*#__PURE__*/React.createElement("div", {
    className: "ac-services__grid"
  }, children))));
}
Object.assign(__ds_scope, { ServiceGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/ServiceGrid.jsx", error: String((e && e.message) || e) }); }

// components/blocks/StatBlock.jsx
try { (() => {
const CSS = `
.ac-stats{display:grid;background:var(--color-surface);border:1px solid var(--color-border-strong);overflow:hidden;box-shadow:var(--shadow-md);grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));}
.ac-stat{background:var(--color-surface);box-shadow:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);padding:var(--space-xl) var(--space-lg);display:flex;flex-direction:column;gap:var(--space-xs);}
.ac-stat__v{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--text-xl);line-height:1.05;letter-spacing:var(--tracking-tight);color:var(--color-text);min-width:0;overflow-wrap:break-word;}
.ac-stat__l{font-size:var(--text-sm);color:var(--color-text-soft);max-width:22ch;}
.ac-stat--mark .ac-stat__v{display:flex;align-items:center;flex-wrap:wrap;gap:var(--space-xs) var(--space-sm);font-size:var(--text-lg);}
.ac-stat__tick{width:1.35rem;height:1.35rem;flex:none;border:1px solid var(--color-border-strong);background:var(--color-accent);color:var(--neutral-900);display:grid;place-items:center;font-family:var(--font-body);font-size:.8rem;}
@media (max-width:600px){.ac-stat{padding:var(--space-lg);}}
`;
const DEFAULT_STATS = [{
  value: '30+',
  label: 'Years installing appliances across Durham and Peterborough'
}, {
  value: 'Licensed',
  label: 'Fully licensed and insured, gas fitting included',
  mark: true
}, {
  value: 'Warrantied',
  label: 'Every job we do is warrantied',
  mark: true
}, {
  value: '1000s',
  label: 'Installs completed'
}];
function StatBlock({
  stats = DEFAULT_STATS
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
    className: "ac-stats"
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    className: `ac-stat${s.mark ? ' ac-stat--mark' : ''}`,
    key: s.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "ac-stat__v"
  }, s.mark && /*#__PURE__*/React.createElement("span", {
    className: "ac-stat__tick",
    "aria-hidden": "true"
  }, "\u2713"), s.value), /*#__PURE__*/React.createElement("span", {
    className: "ac-stat__l"
  }, s.label)))));
}
Object.assign(__ds_scope, { DEFAULT_STATS, StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/blocks/Tabs.jsx
try { (() => {
const CSS = `
.ac-tabs__strip{display:flex;flex-wrap:wrap;gap:1px;background:var(--color-border-strong);border:1px solid var(--color-border-strong);border-bottom:0;}
.ac-tabs__tab{flex:1 1 auto;font:inherit;font-size:var(--text-sm);font-weight:600;cursor:pointer;background:var(--color-bg-alt);color:var(--color-text-soft);border:0;padding:var(--space-md) var(--space-xl);min-height:44px;white-space:nowrap;transition:background var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard);}
.ac-tabs__tab:hover{background:var(--color-bg);color:var(--color-text);}
.ac-tabs__tab[aria-selected="true"]{background:var(--color-surface);color:var(--color-text);box-shadow:inset 0 3px 0 var(--color-accent);}
.ac-tabs__tab:focus-visible{outline:2px solid var(--focus-color);outline-offset:-2px;}
.ac-tabs__panel{background:var(--color-surface);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-md);padding:clamp(1.25rem,3vw,var(--space-2xl));}
.ac-tabs__panel:focus-visible{outline:2px solid var(--focus-color);outline-offset:-2px;}
@media (max-width:600px){.ac-tabs__strip{flex-direction:column;}.ac-tabs__tab{text-align:left;}}
`;
function Tabs({
  tabs = [],
  defaultIndex = 0,
  label = 'Section',
  onChange,
  children
}) {
  const [active, setActive] = React.useState(defaultIndex);
  const refs = React.useRef([]);
  const select = i => {
    setActive(i);
    if (onChange) onChange(i);
  };
  const key = e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? (active + 1) % tabs.length : (active - 1 + tabs.length) % tabs.length;
    select(next);
    if (refs.current[next]) refs.current[next].focus();
  };
  const panels = React.Children.toArray(children);
  const body = tabs[active] && tabs[active].content !== undefined ? tabs[active].content : panels[active];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
    className: "ac-tabs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-tabs__strip",
    role: "tablist",
    "aria-label": label,
    onKeyDown: key
  }, tabs.map((t, i) => {
    const tab = typeof t === 'string' ? {
      label: t
    } : t;
    return /*#__PURE__*/React.createElement("button", {
      className: "ac-tabs__tab",
      type: "button",
      key: tab.label,
      role: "tab",
      id: `ac-tab-${i}`,
      ref: el => {
        refs.current[i] = el;
      },
      "aria-selected": active === i,
      "aria-controls": `ac-panel-${i}`,
      tabIndex: active === i ? 0 : -1,
      onClick: () => select(i)
    }, tab.label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "ac-tabs__panel",
    role: "tabpanel",
    id: `ac-panel-${active}`,
    "aria-labelledby": `ac-tab-${active}`,
    tabIndex: 0
  }, body)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/blocks/TownGrid.jsx
try { (() => {
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
function TownGrid({
  regions = []
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), regions.map(r => /*#__PURE__*/React.createElement("section", {
    className: "ac-tg",
    key: r.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-tg__head"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ac-tg__region"
  }, r.name), r.href && /*#__PURE__*/React.createElement("a", {
    className: "ac-tg__hub",
    href: r.href
  }, "Region page"), r.note && /*#__PURE__*/React.createElement("span", {
    className: "ac-tg__note"
  }, r.note)), /*#__PURE__*/React.createElement("div", {
    className: "ac-tg__grid"
  }, r.towns.map(t => {
    const town = typeof t === 'string' ? {
      name: t
    } : t;
    return town.href ? /*#__PURE__*/React.createElement("a", {
      className: "ac-tg__town",
      href: town.href,
      key: town.name
    }, town.name, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\u2192")) : /*#__PURE__*/React.createElement("div", {
      className: "ac-tg__plain",
      key: town.name
    }, town.name);
  })))));
}
Object.assign(__ds_scope, { TownGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/TownGrid.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const VARIANTS = ['primary', 'secondary', 'ghost'];
function Button({
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  children
}) {
  const v = VARIANTS.includes(variant) ? variant : 'primary';
  const cls = `ac-btn ac-btn--${v}${disabled ? ' is-disabled' : ''}`;
  const style = /*#__PURE__*/React.createElement("style", null, `
      .ac-btn{display:inline-flex;align-items:center;gap:.5em;font:inherit;font-weight:var(--weight-semibold);line-height:1;text-decoration:none;border-radius:var(--radius-none);padding:.85em 1.5em;border:1px solid var(--color-border-strong);cursor:pointer;transition:background var(--dur) var(--ease-standard),color var(--dur) var(--ease-standard),box-shadow var(--dur) var(--ease-standard);}
      .ac-btn--primary{background:var(--cta-bg);color:var(--cta-text);box-shadow:var(--shadow-sm);}
      .ac-btn--primary:hover{background:var(--cta-bg-hover);color:var(--cta-text-hover);box-shadow:var(--shadow-md);}
      .ac-btn--secondary{background:var(--cta2-bg);color:var(--cta2-text);border-color:var(--cta2-border);}
      .ac-btn--secondary:hover{background:var(--cta2-text);color:var(--color-bg);}
      .ac-btn--ghost{background:none;color:var(--link);padding:.2em .1em;border-color:transparent;border-bottom:1px solid currentColor;}
      .ac-btn--ghost:hover{color:var(--link-hover);}
      .ac-btn.is-disabled{opacity:.45;cursor:not-allowed;box-shadow:none;}
    `);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, style, /*#__PURE__*/React.createElement("a", {
      className: cls,
      href: href
    }, children));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, style, /*#__PURE__*/React.createElement("button", {
    className: cls,
    type: type,
    onClick: onClick,
    disabled: disabled
  }, children));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
// Arc geometry (viewBox units). The curve is fixed; the text is measured at
// runtime and centred on it, so the mark stays balanced whatever the font does.
const W = 1200;
const P0 = [20, 300],
  P1 = [600, 40],
  P2 = [1180, 300];
const F = 60; // main line font-size
const FT = 30; // "THE" font-size
const CAP = 0.7; // Benguiat cap-height ratio (approx.)
const N = 600;
const bez = t => {
  const a = (1 - t) * (1 - t),
    b = 2 * (1 - t) * t,
    c = t * t;
  return [a * P0[0] + b * P1[0] + c * P2[0], a * P0[1] + b * P1[1] + c * P2[1]];
};
const SAMPLES = (() => {
  const out = [{
    t: 0,
    s: 0,
    p: bez(0)
  }];
  for (let i = 1; i <= N; i++) {
    const t = i / N,
      p = bez(t),
      q = out[i - 1].p;
    out.push({
      t,
      s: out[i - 1].s + Math.hypot(p[0] - q[0], p[1] - q[1]),
      p
    });
  }
  return out;
})();
const LEN = SAMPLES[N].s;
const atLen = s => {
  let lo = 0,
    hi = N;
  while (hi - lo > 1) {
    const m = lo + hi >> 1;
    if (SAMPLES[m].s < s) lo = m;else hi = m;
  }
  const a = SAMPLES[lo],
    b = SAMPLES[hi];
  const k = b.s === a.s ? 0 : (s - a.s) / (b.s - a.s);
  const p = [a.p[0] + (b.p[0] - a.p[0]) * k, a.p[1] + (b.p[1] - a.p[1]) * k];
  const d = Math.hypot(b.p[0] - a.p[0], b.p[1] - a.p[1]) || 1;
  const tx = (b.p[0] - a.p[0]) / d,
    ty = (b.p[1] - a.p[1]) / d;
  return {
    p,
    n: [ty, -tx]
  }; // outward normal (away from the arch's centre)
};
const PATH = `M ${P0[0]},${P0[1]} Q ${P1[0]},${P1[1]} ${P2[0]},${P2[1]}`;
function layout(mainLen, theLen) {
  const s0 = Math.max(0, (LEN - mainLen) / 2);
  const cap = F * CAP;
  const start = atLen(s0);
  const x0 = start.p[0] + start.n[0] * cap;
  // Rest "THE" just clear of the letter tops it sits over.
  let minTop = start.p[1] + start.n[1] * cap;
  for (let s = s0; s <= s0 + mainLen; s += 4) {
    const a = atLen(s),
      tx = a.p[0] + a.n[0] * cap,
      ty = a.p[1] + a.n[1] * cap;
    if (tx >= x0 - 2 && tx <= x0 + theLen + 6) minTop = Math.min(minTop, ty);
  }
  const theBase = minTop - FT * 0.28 - FT * 0.5;
  const peakTop = atLen(LEN / 2).p[1] - cap;
  const top = Math.min(theBase - FT * CAP, peakTop) - 10;
  const bottom = start.p[1] + 14;
  return {
    s0,
    x0,
    theBase,
    top,
    h: bottom - top
  };
}
const CSS = `
.ac-wm{margin:0;font-weight:var(--weight-display);line-height:1;}
.ac-wm--arched{display:block;width:100%;}
.ac-wm--arched svg{display:block;width:100%;height:auto;overflow:visible;}
.ac-wm--flat{display:inline-flex;flex-direction:column;align-items:flex-start;font-family:var(--font-display);text-transform:uppercase;letter-spacing:.02em;white-space:nowrap;}
.ac-wm--flat .ac-wm__the{font-size:.5em;line-height:1;margin:0 0 .12em .05em;letter-spacing:.06em;}
.ac-wm--flat .ac-wm__main{font-size:1em;line-height:1.05;display:flex;flex-direction:column;}
.ac-wm--light{color:var(--neutral-0);}
.ac-wm--dark{color:var(--neutral-900);}
.ac-wm--flat.ac-wm--light.has-shadow{text-shadow:2px 2px 0 var(--neutral-900),0 2px 8px rgba(0,0,0,.5);}
.ac-wm--flat.ac-wm--dark.has-shadow{text-shadow:1.5px 1.5px 0 var(--wood-300);}
`;
function Arched({
  tone,
  shadow
}) {
  const uid = 'wm' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const mainRef = React.useRef(null);
  const theRef = React.useRef(null);
  const [m, setM] = React.useState({
    main: LEN * 0.84,
    the: FT * 2.3
  });
  React.useLayoutEffect(() => {
    const measure = () => {
      const a = mainRef.current,
        b = theRef.current;
      if (!a || !b) return;
      const main = a.getComputedTextLength(),
        the = b.getComputedTextLength();
      if (main > 0 && the > 0) setM({
        main: Math.min(main, LEN),
        the
      });
    };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }, []);
  const L = layout(m.main, m.the);
  const fill = tone === 'dark' ? 'var(--neutral-900)' : 'var(--neutral-0)';
  const filter = !shadow ? 'none' : tone === 'dark' ? 'drop-shadow(2px 2px 0 var(--wood-300))' : 'drop-shadow(3px 3px 0 #111111) drop-shadow(0 4px 12px rgba(0,0,0,.55))';
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 ${L.top.toFixed(1)} ${W} ${L.h.toFixed(1)}`,
    "aria-hidden": "true",
    focusable: "false",
    style: {
      filter
    }
  }, /*#__PURE__*/React.createElement("path", {
    id: uid,
    d: PATH,
    fill: "none"
  }), /*#__PURE__*/React.createElement("text", {
    ref: theRef,
    x: L.x0,
    y: L.theBase,
    style: {
      fill,
      fontFamily: 'var(--font-display)',
      fontSize: FT,
      letterSpacing: 2
    }
  }, "THE"), /*#__PURE__*/React.createElement("text", {
    style: {
      fill,
      fontFamily: 'var(--font-display)',
      fontSize: F,
      letterSpacing: 1
    }
  }, /*#__PURE__*/React.createElement("textPath", {
    ref: mainRef,
    href: `#${uid}`,
    startOffset: L.s0
  }, "APPLIANCE CONNECTION")));
}
function Wordmark({
  variant = 'arched',
  tone = 'light',
  shadow = true,
  as = 'span',
  size
}) {
  const Tag = as;
  const cls = `ac-wm ac-wm--${variant} ac-wm--${tone}${shadow ? ' has-shadow' : ''}`;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), variant === 'arched' ? /*#__PURE__*/React.createElement(Tag, {
    className: cls,
    "aria-label": "The Appliance Connection",
    role: Tag === 'span' ? 'img' : undefined
  }, /*#__PURE__*/React.createElement(Arched, {
    tone: tone,
    shadow: shadow
  })) : /*#__PURE__*/React.createElement(Tag, {
    className: cls,
    style: size ? {
      fontSize: size
    } : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "ac-wm__the"
  }, "The"), /*#__PURE__*/React.createElement("span", {
    className: "ac-wm__main"
  }, /*#__PURE__*/React.createElement("span", null, "Appliance"), " ", /*#__PURE__*/React.createElement("span", null, "Connection"))));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/blocks/Hero.jsx
try { (() => {
const CSS = `
.ac-hero{--grid-line:rgba(255,255,255,.075);background-color:var(--neutral-900);background-image:var(--grid-image);background-size:var(--grid-size) var(--grid-size);}
.ac-hero__frame{position:relative;overflow:hidden;margin-inline:auto;width:100%;max-width:1600px;aspect-ratio:16/9;min-height:20rem;display:grid;place-items:center;background:var(--neutral-900);}
.ac-hero__media,.ac-hero__ph{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;}
.ac-hero__ph{display:grid;place-items:center;background:var(--neutral-800);color:var(--neutral-400);font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;}
.ac-hero__scrim{position:absolute;inset:0;background:rgba(17,17,17,.55);}
.ac-hero__scrim--strong{background:rgba(17,17,17,.72);}
.ac-hero__content{position:relative;box-sizing:border-box;width:100%;max-width:calc(62rem + 2 * var(--gutter));padding:clamp(2.5rem,6vw,5rem) var(--gutter);container-type:inline-size;display:flex;flex-direction:column;align-items:center;text-align:center;}
.ac-hero__content > .ac-wm{width:100%;}
.ac-hero__title{font-family:var(--font-display);font-weight:var(--weight-display);font-size:max(2.25rem,7cqi);line-height:var(--leading-tight);letter-spacing:var(--tracking-tight);color:var(--neutral-0);text-shadow:3px 3px 0 #111111,0 4px 12px rgba(0,0,0,.55);margin:0;max-width:18ch;text-wrap:balance;}
.ac-hero__sub{font-family:var(--font-display);font-weight:var(--weight-display);font-size:max(0.95rem,2.9cqi);line-height:var(--leading-snug);letter-spacing:var(--tracking-tight);color:var(--neutral-0);text-shadow:2px 2px 0 #111111,0 2px 10px rgba(0,0,0,.6);margin:var(--space-md) 0 0;max-width:30ch;}
.ac-hero--mark .ac-hero__sub{margin-top:-1.2cqi;}
.ac-hero__actions{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--space-md);margin-top:var(--space-xl);}
.ac-hero__btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;font-weight:600;white-space:nowrap;text-decoration:none;padding:.9em 1.7em;border:1px solid var(--neutral-0);box-shadow:var(--shadow-md);transition:background var(--dur) var(--ease-standard),color var(--dur) var(--ease-standard);}
.ac-hero__btn--primary{background:var(--cta-bg);color:var(--cta-text);border-color:var(--neutral-900);}
.ac-hero__btn--primary:hover{background:var(--cta-bg-hover);color:var(--cta-text-hover);}
.ac-hero__btn--secondary{background:rgba(17,17,17,.6);color:var(--neutral-0);}
.ac-hero__btn--secondary:hover{background:var(--neutral-0);color:var(--neutral-900);}
.ac-hero__phones{width:100%;max-width:1600px;margin-inline:auto;border-top:1px solid rgba(255,255,255,.28);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr));}
.ac-hero__phone{padding:var(--space-lg) var(--gutter);display:flex;flex-wrap:wrap;align-items:baseline;gap:var(--space-xs) var(--space-md);box-shadow:-1px 0 0 rgba(255,255,255,.28);}
.ac-hero__phone span{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:600;color:var(--neutral-400);}
.ac-hero__phone a{font-family:var(--font-display);font-size:var(--text-lg);color:var(--neutral-0);text-decoration:none;letter-spacing:var(--tracking-tight);}
.ac-hero__phone a:hover{color:var(--wood-300);}
.ac-hero__btn .ac-hero__short{display:none;}
@media (max-width:639px){
  .ac-hero__content{padding:var(--space-xl) var(--space-sm);}
  .ac-hero__actions{gap:var(--space-sm);margin-top:var(--space-lg);}
  .ac-hero__btn{font-size:var(--text-sm);padding:.75em 1.25em;}
  .ac-hero__btn.has-short .ac-hero__long{display:none;}
  .ac-hero__btn.has-short .ac-hero__short{display:inline;}
  .ac-hero__phone{flex-direction:column;align-items:flex-start;gap:var(--space-2xs);padding-block:var(--space-md);box-shadow:0 -1px 0 rgba(255,255,255,.28);}
  .ac-hero__phone:first-child{box-shadow:none;}
}
@media (min-width:640px){.ac-hero__frame{min-height:24rem;}}
@media (min-width:1024px){.ac-hero__frame{min-height:32rem;}}
/* Past the video's 1600px cap the frame floats on the ink band: white rule,
   padding, and a drop shadow separate it from the page. */
@media (min-width:1680px){
  .ac-hero{padding:var(--space-2xl) var(--gutter) 0;}
  .ac-hero__frame{border:1px solid var(--neutral-0);box-shadow:0 14px 36px rgba(0,0,0,.6),0 2px 6px rgba(0,0,0,.4);}
  .ac-hero__phones{border-top:0;margin-top:var(--space-md);}
  .ac-hero:not(:has(.ac-hero__phones)){padding-bottom:var(--space-2xl);}
}
`;
function Hero({
  heading,
  wordmark,
  subheading,
  videoUrl,
  posterUrl,
  imageUrl,
  primaryLabel,
  primaryShortLabel,
  primaryUrl,
  secondaryLabel,
  secondaryShortLabel,
  secondaryUrl,
  scrim = 'standard',
  phones = []
}) {
  const useMark = wordmark ?? !heading;
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    const v = videoRef.current;
    if (v && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.pause();
  }, [videoUrl]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("section", {
    className: `ac-hero${useMark ? ' ac-hero--mark' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-hero__frame"
  }, videoUrl ? /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    className: "ac-hero__media",
    src: videoUrl,
    poster: posterUrl,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    "aria-hidden": "true"
  }) : imageUrl ? /*#__PURE__*/React.createElement("img", {
    className: "ac-hero__media",
    src: imageUrl,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "ac-hero__ph",
    "aria-hidden": "true"
  }, "Hero video \xB7 16:9"), /*#__PURE__*/React.createElement("div", {
    className: `ac-hero__scrim${scrim === 'strong' ? ' ac-hero__scrim--strong' : ''}`,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ac-hero__content"
  }, useMark ? /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    variant: "arched",
    tone: "light",
    as: "h1"
  }) : heading && /*#__PURE__*/React.createElement("h1", {
    className: "ac-hero__title"
  }, heading), subheading && /*#__PURE__*/React.createElement("p", {
    className: "ac-hero__sub"
  }, subheading), (primaryLabel || secondaryLabel) && /*#__PURE__*/React.createElement("div", {
    className: "ac-hero__actions"
  }, primaryLabel && /*#__PURE__*/React.createElement("a", {
    className: `ac-hero__btn ac-hero__btn--primary${primaryShortLabel ? ' has-short' : ''}`,
    href: primaryUrl || '#',
    "aria-label": primaryShortLabel ? primaryLabel : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "ac-hero__long"
  }, primaryLabel), primaryShortLabel && /*#__PURE__*/React.createElement("span", {
    className: "ac-hero__short",
    "aria-hidden": "true"
  }, primaryShortLabel)), secondaryLabel && /*#__PURE__*/React.createElement("a", {
    className: `ac-hero__btn ac-hero__btn--secondary${secondaryShortLabel ? ' has-short' : ''}`,
    href: secondaryUrl || '#',
    "aria-label": secondaryShortLabel ? secondaryLabel : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "ac-hero__long"
  }, secondaryLabel), secondaryShortLabel && /*#__PURE__*/React.createElement("span", {
    className: "ac-hero__short",
    "aria-hidden": "true"
  }, secondaryShortLabel))))), phones.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ac-hero__phones"
  }, phones.map(p => /*#__PURE__*/React.createElement("div", {
    className: "ac-hero__phone",
    key: p.tel
  }, /*#__PURE__*/React.createElement("span", null, p.label), /*#__PURE__*/React.createElement("a", {
    href: `tel:${p.tel}`
  }, p.phone))))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/Hero.jsx", error: String((e && e.message) || e) }); }

// components/feedback/CallBar.jsx
try { (() => {
function CallBar({
  label = 'Contact Us',
  numbers = [{
    name: 'Durham',
    phone: '905.259.6545',
    tel: '19052596545'
  }, {
    name: 'Peterborough',
    phone: '705.742.0306',
    tel: '17057420306'
  }]
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .ac-callbar{display:flex;flex-wrap:wrap;gap:var(--space-md) var(--space-lg);align-items:center;justify-content:space-between;background:var(--neutral-900);color:var(--neutral-0);border:1px solid var(--neutral-900);border-radius:var(--radius-none);box-shadow:var(--shadow-lg);padding:var(--space-md) var(--space-lg);}
        .ac-callbar__label{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:var(--weight-semibold);color:var(--wood-300);}
        .ac-callbar .ac-nums{display:flex;flex-wrap:wrap;align-items:center;}
        .ac-callbar .ac-nums a{display:flex;flex-direction:column;gap:.15em;padding-inline:var(--space-lg);color:var(--neutral-0);text-decoration:none;font-family:var(--font-display);font-size:var(--text-md);}
        .ac-callbar .ac-nums a + a{border-left:1px solid rgba(255,255,255,.28);}
        .ac-callbar .ac-nums a:hover{color:var(--wood-300);}
        .ac-callbar .ac-nums span{font-family:var(--font-body);color:var(--neutral-400);font-weight:var(--weight-regular);font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;}
      `), /*#__PURE__*/React.createElement("div", {
    className: "ac-callbar"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "ac-callbar__label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "ac-nums"
  }, numbers.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.tel,
    href: `tel:${n.tel}`
  }, /*#__PURE__*/React.createElement("span", null, n.name), n.phone)))));
}
Object.assign(__ds_scope, { CallBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/CallBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Testimonial.jsx
try { (() => {
function Testimonial({
  quote,
  cite
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .ac-quote{position:relative;background:var(--color-surface);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);padding:var(--space-lg);max-width:44ch;margin:0;}
        .ac-quote::before{content:"";position:absolute;top:0;left:0;width:10px;height:10px;background:var(--color-accent);}
        .ac-quote p{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--text-lg);line-height:var(--leading-snug);margin:0 0 var(--space-md);max-width:none;}
        .ac-quote cite{display:block;border-top:1px solid var(--color-border);padding-top:var(--space-sm);font-style:normal;font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:var(--weight-semibold);color:var(--color-text-muted);}
      `), /*#__PURE__*/React.createElement("blockquote", {
    className: "ac-quote"
  }, /*#__PURE__*/React.createElement("p", null, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("cite", null, cite)));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/feedback/TrustBar.jsx
try { (() => {
function TrustBar({
  items = ['30+ years', 'Licensed & insured', 'Certified plumber', 'Every job warrantied']
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .ac-trustbar{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));background:var(--color-surface);border:1px solid var(--color-border-strong);overflow:hidden;box-shadow:var(--shadow-sm);}
        .ac-badge{display:flex;align-items:center;gap:.65em;background:var(--color-surface);box-shadow:1px 0 0 var(--color-border-strong),0 1px 0 var(--color-border-strong);padding:var(--space-md) var(--space-lg);font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--color-text);}
        .ac-badge .ac-b-ic{width:1.35rem;height:1.35rem;flex:none;border:1px solid var(--color-border-strong);border-radius:var(--radius-none);background:var(--color-accent-tint);color:var(--color-text);display:grid;place-items:center;font-size:.8rem;}
      `), /*#__PURE__*/React.createElement("div", {
    className: "ac-trustbar"
  }, items.map(label => /*#__PURE__*/React.createElement("span", {
    className: "ac-badge",
    key: label
  }, /*#__PURE__*/React.createElement("span", {
    className: "ac-b-ic",
    "aria-hidden": "true"
  }, "\u2713"), " ", label))));
}
Object.assign(__ds_scope, { TrustBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/TrustBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
const CSS = `
.ac-cb{display:flex;align-items:flex-start;gap:var(--space-sm);cursor:pointer;font-size:var(--text-sm);min-height:44px;padding-block:var(--space-2xs);}
.ac-cb input{position:absolute;opacity:0;width:0;height:0;}
.ac-cb__box{flex:none;width:1.25rem;height:1.25rem;margin-top:.15rem;border:1px solid var(--color-border-strong);background:var(--color-surface);box-shadow:var(--shadow-sm);display:grid;place-items:center;color:transparent;font-size:.8rem;line-height:1;transition:background var(--dur-fast) var(--ease-standard);}
.ac-cb input:checked + .ac-cb__box{background:var(--color-accent);color:var(--neutral-900);}
.ac-cb input:focus-visible + .ac-cb__box{outline:2px solid var(--focus-color);outline-offset:2px;}
.ac-cb input:disabled + .ac-cb__box{opacity:.45;}
.ac-cb__text{display:flex;flex-direction:column;gap:.15em;}
.ac-cb__text small{color:var(--color-text-muted);font-size:var(--text-xs);}
`;
function Checkbox({
  id,
  label,
  help,
  checked,
  onChange,
  disabled = false,
  name
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("label", {
    className: "ac-cb",
    htmlFor: id
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    name: name,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }), /*#__PURE__*/React.createElement("span", {
    className: "ac-cb__box",
    "aria-hidden": "true"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    className: "ac-cb__text"
  }, label, help && /*#__PURE__*/React.createElement("small", null, help))));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormField.jsx
try { (() => {
function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  help,
  error,
  value,
  onChange,
  required = false
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        .ac-field{display:flex;flex-direction:column;gap:var(--space-2xs);max-width:22rem;}
        .ac-field label{font-size:var(--text-sm);font-weight:var(--weight-semibold);}
        .ac-field input,.ac-field textarea{font:inherit;padding:.7em .9em;border:1px solid var(--color-border-strong);border-radius:var(--radius-input);background:var(--color-surface);color:var(--color-text);box-shadow:var(--shadow-sm);}
        .ac-field input::placeholder,.ac-field textarea::placeholder{color:var(--color-text-muted);}
        .ac-field input:focus-visible,.ac-field textarea:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px;}
        .ac-field .ac-help{font-size:var(--text-xs);color:var(--color-text-muted);}
        .ac-field .ac-err{font-size:var(--text-xs);color:var(--color-error);font-weight:var(--weight-semibold);}
        .ac-field input[aria-invalid="true"]{border-color:var(--color-error);border-width:2px;}
      `), /*#__PURE__*/React.createElement("div", {
    className: "ac-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, label, required && ' *'), /*#__PURE__*/React.createElement("input", {
    id: id,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    "aria-invalid": !!error
  }), error ? /*#__PURE__*/React.createElement("span", {
    className: "ac-err"
  }, error) : help ? /*#__PURE__*/React.createElement("span", {
    className: "ac-help"
  }, help) : null));
}
Object.assign(__ds_scope, { FormField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormField.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuoteForm.jsx
try { (() => {
const CSS = `
.ac-qf{position:relative;background:var(--color-surface);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-lg);padding:clamp(1.5rem,4vw,var(--space-3xl));}
.ac-qf::before{content:"";position:absolute;top:0;left:0;width:10px;height:10px;background:var(--color-accent);}
.ac-qf__eyebrow{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:600;color:var(--color-text-muted);margin:0 0 var(--space-sm);}
.ac-qf__h{font-size:var(--text-2xl);margin:0 0 var(--space-md);}
.ac-qf__intro{color:var(--color-text-soft);margin:0 0 var(--space-xl);}
.ac-qf__fields{display:grid;gap:var(--space-lg);grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr));}
.ac-qf__fields .ac-qf__wide{grid-column:1/-1;}
.ac-qf__f{display:flex;flex-direction:column;gap:var(--space-2xs);}
.ac-qf__f label{font-size:var(--text-sm);font-weight:600;}
.ac-qf__f input,.ac-qf__f textarea{font:inherit;width:100%;padding:.85em 1em;border:1px solid var(--color-border-strong);border-radius:var(--radius-input);background:var(--color-surface);color:var(--color-text);box-shadow:var(--shadow-sm);}
.ac-qf__f textarea{min-height:9rem;resize:vertical;}
.ac-qf__f input::placeholder,.ac-qf__f textarea::placeholder{color:var(--color-text-muted);}
.ac-qf__f input:focus-visible,.ac-qf__f textarea:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px;}
.ac-qf__f [aria-invalid="true"]{border-color:var(--color-error);border-width:2px;}
.ac-qf__note{font-size:var(--text-xs);color:var(--color-text-muted);}
.ac-qf__err{font-size:var(--text-xs);color:var(--color-error);font-weight:600;}
.ac-qf__foot{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-md) var(--space-lg);margin-top:var(--space-xl);padding-top:var(--space-lg);border-top:1px solid var(--color-border);}
.ac-qf__submit{font:inherit;font-weight:600;cursor:pointer;background:var(--cta-bg);color:var(--cta-text);border:1px solid var(--color-border-strong);border-radius:var(--radius-none);box-shadow:var(--shadow-sm);padding:.95em 1.9em;min-height:44px;transition:background var(--dur) var(--ease-standard),color var(--dur) var(--ease-standard),box-shadow var(--dur) var(--ease-standard);}
.ac-qf__submit:hover{background:var(--cta-bg-hover);color:var(--cta-text-hover);box-shadow:var(--shadow-md);}
.ac-qf__summary{font-size:var(--text-sm);color:var(--color-error);font-weight:600;}
.ac-qf__ok{position:relative;background:var(--color-surface);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-lg);padding:clamp(1.5rem,4vw,var(--space-3xl));display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-md);}
.ac-qf__ok::before{content:"";position:absolute;top:0;left:0;width:10px;height:10px;background:var(--color-accent);}
.ac-qf__tick{width:2.5rem;height:2.5rem;border:1px solid var(--color-border-strong);background:var(--color-accent);color:var(--neutral-900);display:grid;place-items:center;font-size:1.25rem;box-shadow:var(--shadow-sm);}
.ac-qf__ok h3{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--text-2xl);margin:0;}
.ac-qf__ok p{margin:0;color:var(--color-text-soft);}
.ac-qf__again{font:inherit;font-size:var(--text-sm);font-weight:600;cursor:pointer;background:none;border:0;border-bottom:1px solid currentColor;color:var(--link);padding:0;}
.ac-qf__again:hover{color:var(--link-hover);}
`;
const EMPTY = {
  name: '',
  email: '',
  phone: '',
  message: ''
};
function validate(values) {
  const e = {};
  if (!values.name.trim()) e.name = 'Tell us who we’re quoting.';
  if (!values.email.trim()) e.email = 'We need an email to send the quote.';else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = 'Enter a valid email address.';
  if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone number.';
  if (!values.message.trim()) e.message = 'Tell us how we can help.';
  return e;
}
function QuoteForm({
  eyebrow = 'Get in touch',
  heading = 'Tell us what you need',
  intro = 'We respond within 24 hours.',
  submitLabel = 'Send message',
  successHeading = 'Message sent',
  successText = 'We’ll be in touch within 24 hours. Need us sooner? Call 905.259.6545 (Durham) or 705.742.0306 (Peterborough).',
  onSubmit
}) {
  const [values, setValues] = React.useState(EMPTY);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const set = k => e => {
    const next = {
      ...values,
      [k]: e.target.value
    };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = k => () => {
    setTouched({
      ...touched,
      [k]: true
    });
    setErrors(validate(values));
  };
  const submit = e => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });
    if (Object.keys(found).length === 0) {
      if (onSubmit) onSubmit(values);
      setSent(true);
    }
  };
  const field = (k, label, type, placeholder, required) => /*#__PURE__*/React.createElement("div", {
    className: `ac-qf__f${k === 'message' ? ' ac-qf__wide' : ''}`
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `qf-${k}`
  }, label, required && ' *'), k === 'message' ? /*#__PURE__*/React.createElement("textarea", {
    id: `qf-${k}`,
    placeholder: placeholder,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `qf-${k}-err` : undefined
  }) : /*#__PURE__*/React.createElement("input", {
    id: `qf-${k}`,
    type: type,
    placeholder: placeholder,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `qf-${k}-err` : undefined
  }), errors[k] && /*#__PURE__*/React.createElement("span", {
    className: "ac-qf__err",
    id: `qf-${k}-err`
  }, errors[k]));
  if (sent) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
      className: "ac-qf__ok",
      role: "status"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ac-qf__tick",
      "aria-hidden": "true"
    }, "\u2713"), /*#__PURE__*/React.createElement("h3", null, successHeading), /*#__PURE__*/React.createElement("p", null, successText), /*#__PURE__*/React.createElement("button", {
      className: "ac-qf__again",
      type: "button",
      onClick: () => {
        setValues(EMPTY);
        setErrors({});
        setTouched({});
        setSent(false);
      }
    }, "Send another message")));
  }
  const count = Object.keys(errors).length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("form", {
    className: "ac-qf",
    onSubmit: submit,
    noValidate: true
  }, eyebrow && /*#__PURE__*/React.createElement("p", {
    className: "ac-qf__eyebrow"
  }, eyebrow), heading && /*#__PURE__*/React.createElement("h2", {
    className: "ac-qf__h"
  }, heading), intro && /*#__PURE__*/React.createElement("p", {
    className: "ac-qf__intro"
  }, intro), /*#__PURE__*/React.createElement("div", {
    className: "ac-qf__fields"
  }, field('name', 'Your name', 'text', 'Jane Doe', true), field('email', 'Email', 'email', 'jane@example.com', true), field('phone', 'Phone', 'tel', '(905) 555-0134', false), field('message', 'How can we help?', 'text', 'Double wall oven and cooktop, Whitby — gas line already run.', true)), /*#__PURE__*/React.createElement("div", {
    className: "ac-qf__foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ac-qf__submit",
    type: "submit"
  }, submitLabel), count > 0 && Object.keys(touched).length > 0 ? /*#__PURE__*/React.createElement("span", {
    className: "ac-qf__summary"
  }, count, " field", count > 1 ? 's need' : ' needs', " attention.") : /*#__PURE__*/React.createElement("span", {
    className: "ac-qf__note"
  }, "We respond within 24 hours."))));
}
Object.assign(__ds_scope, { QuoteForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuoteForm.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
const CSS = `
.ac-rg{border:0;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-xs);}
.ac-rg legend{padding:0;font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-2xs);}
.ac-rg__opts{display:grid;gap:1px;background:var(--color-border-strong);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);}
.ac-rg__opts[data-row="true"]{grid-auto-flow:column;grid-auto-columns:1fr;}
.ac-rg__opt{display:flex;align-items:center;gap:var(--space-sm);background:var(--color-surface);padding:var(--space-md) var(--space-lg);min-height:44px;cursor:pointer;font-size:var(--text-sm);}
.ac-rg__opt:hover{background:var(--color-bg-alt);}
.ac-rg__opt input{position:absolute;opacity:0;width:0;height:0;}
.ac-rg__dot{flex:none;width:1.25rem;height:1.25rem;border:1px solid var(--color-border-strong);background:var(--color-surface);display:grid;place-items:center;}
.ac-rg__dot::after{content:"";width:.6rem;height:.6rem;background:transparent;}
.ac-rg__opt input:checked + .ac-rg__dot::after{background:var(--color-accent);}
.ac-rg__opt input:checked ~ .ac-rg__label{font-weight:600;}
.ac-rg__opt input:focus-visible + .ac-rg__dot{outline:2px solid var(--focus-color);outline-offset:2px;}
.ac-rg__note{font-size:var(--text-xs);color:var(--color-text-muted);}
@media (max-width:560px){.ac-rg__opts[data-row="true"]{grid-auto-flow:row;}}
`;
function RadioGroup({
  name,
  legend,
  options = [],
  value,
  onChange,
  help,
  row = false
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("fieldset", {
    className: "ac-rg"
  }, legend && /*#__PURE__*/React.createElement("legend", null, legend), /*#__PURE__*/React.createElement("div", {
    className: "ac-rg__opts",
    "data-row": row ? 'true' : 'false'
  }, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("label", {
      className: "ac-rg__opt",
      key: opt.value
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      value: opt.value,
      checked: value === opt.value,
      onChange: () => onChange && onChange(opt.value)
    }), /*#__PURE__*/React.createElement("span", {
      className: "ac-rg__dot",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      className: "ac-rg__label"
    }, opt.label));
  })), help && /*#__PURE__*/React.createElement("span", {
    className: "ac-rg__note"
  }, help)));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const CSS = `
.ac-sel{display:flex;flex-direction:column;gap:var(--space-2xs);}
.ac-sel label{font-size:var(--text-sm);font-weight:600;}
.ac-sel__wrap{position:relative;display:flex;}
.ac-sel select{font:inherit;flex:1;appearance:none;padding:.85em 3em .85em 1em;border:1px solid var(--color-border-strong);border-radius:var(--radius-input);background:var(--color-surface);color:var(--color-text);box-shadow:var(--shadow-sm);cursor:pointer;}
.ac-sel select:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px;}
.ac-sel select[aria-invalid="true"]{border-color:var(--color-error);border-width:2px;}
.ac-sel__btn{position:absolute;top:1px;right:1px;bottom:1px;width:2.5rem;border-left:1px solid var(--color-border-strong);background:var(--color-bg-alt);display:grid;place-items:center;pointer-events:none;}
.ac-sel__caret{width:7px;height:7px;border-right:1px solid var(--color-text);border-bottom:1px solid var(--color-text);transform:translateY(-2px) rotate(45deg);}
.ac-sel .ac-sel__note{font-size:var(--text-xs);color:var(--color-text-muted);}
.ac-sel .ac-sel__err{font-size:var(--text-xs);color:var(--color-error);font-weight:600;}
`;
function Select({
  id,
  label,
  options = [],
  placeholder,
  help,
  error,
  value,
  onChange,
  onBlur,
  required = false
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
    className: "ac-sel"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, label, required && ' *'), /*#__PURE__*/React.createElement("div", {
    className: "ac-sel__wrap"
  }, /*#__PURE__*/React.createElement("select", {
    id: id,
    value: value,
    onChange: onChange,
    onBlur: onBlur,
    "aria-invalid": !!error,
    "aria-describedby": error || help ? `${id}-note` : undefined
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    className: "ac-sel__btn",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ac-sel__caret"
  }))), error ? /*#__PURE__*/React.createElement("span", {
    className: "ac-sel__err",
    id: `${id}-note`
  }, error) : help ? /*#__PURE__*/React.createElement("span", {
    className: "ac-sel__note",
    id: `${id}-note`
  }, help) : null));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
const CSS = `
.ac-ta{display:flex;flex-direction:column;gap:var(--space-2xs);}
.ac-ta label{font-size:var(--text-sm);font-weight:600;}
.ac-ta textarea{font:inherit;padding:.85em 1em;min-height:9rem;resize:vertical;border:1px solid var(--color-border-strong);border-radius:var(--radius-input);background:var(--color-surface);color:var(--color-text);box-shadow:var(--shadow-sm);}
.ac-ta textarea::placeholder{color:var(--color-text-muted);}
.ac-ta textarea:focus-visible{outline:2px solid var(--focus-color);outline-offset:1px;}
.ac-ta textarea[aria-invalid="true"]{border-color:var(--color-error);border-width:2px;}
.ac-ta .ac-ta__note{font-size:var(--text-xs);color:var(--color-text-muted);}
.ac-ta .ac-ta__err{font-size:var(--text-xs);color:var(--color-error);font-weight:600;}
`;
function Textarea({
  id,
  label,
  placeholder,
  help,
  error,
  value,
  onChange,
  onBlur,
  required = false,
  rows = 5
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
    className: "ac-ta"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, label, required && ' *'), /*#__PURE__*/React.createElement("textarea", {
    id: id,
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onBlur: onBlur,
    "aria-invalid": !!error,
    "aria-describedby": error || help ? `${id}-note` : undefined
  }), error ? /*#__PURE__*/React.createElement("span", {
    className: "ac-ta__err",
    id: `${id}-note`
  }, error) : help ? /*#__PURE__*/React.createElement("span", {
    className: "ac-ta__note",
    id: `${id}-note`
  }, help) : null));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
const FOOTER_LINKS = [{
  label: 'Services',
  href: '/services/'
}, {
  label: 'About',
  href: '/about/'
}, {
  label: 'Contact',
  href: '/contact/'
}];
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
function Footer({
  logoSrc,
  regions = [{
    name: 'Durham Region',
    phone: '905.259.6545',
    tel: '19052596545'
  }, {
    name: 'Peterborough',
    phone: '705.742.0306',
    tel: '17057420306'
  }],
  links = FOOTER_LINKS,
  utility = [{
    label: 'Privacy',
    href: '/privacy/'
  }, {
    label: 'Legal',
    href: '/legal'
  }],
  ctaLabel = 'Contact Us',
  ctaHref = '/contact/',
  year = new Date().getFullYear(),
  onNavigate
}) {
  const go = href => e => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("footer", {
    className: "ac-ft on-dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-ft__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-ft__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-ft__cell ac-ft__cell--brand"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ac-ft__brand",
    href: "/",
    onClick: go('/')
  }, logoSrc && /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: ""
  }), /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    variant: "flat",
    tone: "light",
    shadow: false
  })), /*#__PURE__*/React.createElement("a", {
    className: "ac-ft__cta",
    href: ctaHref,
    onClick: go(ctaHref)
  }, ctaLabel)), /*#__PURE__*/React.createElement("div", {
    className: "ac-ft__cell"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ac-ft__h"
  }, "Call us"), regions.map(r => /*#__PURE__*/React.createElement("a", {
    className: "ac-ft__phone",
    href: `tel:${r.tel}`,
    key: r.tel
  }, r.name, /*#__PURE__*/React.createElement("strong", null, r.phone)))), /*#__PURE__*/React.createElement("div", {
    className: "ac-ft__cell"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ac-ft__h"
  }, "Site"), /*#__PURE__*/React.createElement("nav", {
    className: "ac-ft__links",
    "aria-label": "Footer"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    onClick: go(l.href)
  }, l.label))))), /*#__PURE__*/React.createElement("div", {
    className: "ac-ft__legal"
  }, /*#__PURE__*/React.createElement("p", null, "\xA9 ", year, " The Appliance Connection. All rights reserved."), /*#__PURE__*/React.createElement("div", {
    className: "ac-ft__utility"
  }, utility.map(u => /*#__PURE__*/React.createElement("a", {
    key: u.href,
    href: u.href,
    onClick: go(u.href)
  }, u.label)))))));
}
Object.assign(__ds_scope, { FOOTER_LINKS, Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
const DEFAULT_NAV = [{
  label: 'Home',
  href: '/'
}, {
  label: 'Services',
  href: '/services/',
  children: [{
    label: 'All services',
    href: '/services/'
  }, {
    label: 'Appliance installation',
    href: '/services/appliance-installation/'
  }, {
    label: 'Gas piping',
    href: '/services/gas-piping/'
  }, {
    label: 'Kitchens',
    href: '/services/kitchens/'
  }, {
    label: 'Laundry rooms',
    href: '/services/laundry-rooms/'
  }, {
    label: 'Plumbing fixtures',
    href: '/services/plumbing-fixtures/'
  }, {
    label: 'Heaters',
    href: '/services/heaters/'
  }]
}, {
  label: 'Durham',
  href: '/durham/',
  children: [{
    label: 'Durham Region',
    href: '/durham/'
  }, {
    label: 'Oshawa',
    href: '/durham/oshawa/'
  }, {
    label: 'Whitby',
    href: '/durham/whitby/'
  }, {
    label: 'Pickering',
    href: '/durham/pickering/'
  }]
}, {
  label: 'Peterborough',
  href: '/peterborough/',
  children: [{
    label: 'Peterborough',
    href: '/peterborough/'
  }, {
    label: 'Lakefield',
    href: '/peterborough/lakefield/'
  }, {
    label: 'Bridgenorth',
    href: '/peterborough/bridgenorth/'
  }, {
    label: 'Ennismore',
    href: '/peterborough/ennismore/'
  }]
}, {
  label: 'About',
  href: '/about/'
}, {
  label: 'Contact',
  href: '/contact/'
}];
const DEFAULT_PHONES = [{
  name: 'Durham Region',
  phone: '905.259.6545',
  tel: '19052596545'
}, {
  name: 'Peterborough',
  phone: '705.742.0306',
  tel: '17057420306'
}];
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
function Header({
  nav = DEFAULT_NAV,
  phones = DEFAULT_PHONES,
  logoSrc,
  ctaLabel = 'Contact Us',
  ctaHref = '/contact/',
  currentPath,
  defaultOpen = false,
  defaultSection = null,
  onNavigate
}) {
  const [menu, setMenu] = React.useState(null);
  const [open, setOpen] = React.useState(defaultOpen);
  const [section, setSection] = React.useState(defaultSection);
  const go = href => e => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
    setOpen(false);
    setMenu(null);
  };
  // Past the breakpoint the burger is display:none, so a drawer left open would
  // be unclosable — drop it as soon as the desktop nav takes over.
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width:1041px)');
    const sync = e => {
      if (e.matches) {
        setOpen(false);
        setSection(null);
      }
    };
    sync(mq);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const toggleMenu = item => e => {
    if (!item.children) return;
    e.preventDefault();
    setMenu(menu === item.href ? null : item.href);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("header", {
    className: "ac-hd"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-hd__bar"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ac-hd__brand",
    href: "/",
    onClick: go('/')
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "The Appliance Connection"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "ac-hd__mark",
    "aria-hidden": "true"
  }, "AC"), /*#__PURE__*/React.createElement("span", {
    className: "ac-hd__name"
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    variant: "flat",
    tone: "dark",
    shadow: false
  }))), /*#__PURE__*/React.createElement("nav", {
    className: "ac-hd__nav",
    "aria-label": "Primary"
  }, nav.map(item => /*#__PURE__*/React.createElement("div", {
    className: "ac-hd__item",
    key: item.href,
    onMouseEnter: () => setMenu(item.children ? item.href : null),
    onMouseLeave: () => setMenu(null),
    onFocus: () => setMenu(item.children ? item.href : null),
    onBlur: e => {
      if (!e.currentTarget.contains(e.relatedTarget)) setMenu(null);
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "ac-hd__link",
    href: item.href,
    onClick: item.children ? toggleMenu(item) : go(item.href),
    onKeyDown: e => {
      if (e.key === 'Escape') setMenu(null);
    },
    "aria-current": currentPath === item.href ? 'page' : undefined,
    "aria-haspopup": item.children ? 'true' : undefined,
    "aria-expanded": item.children ? menu === item.href : undefined
  }, item.label, item.children && /*#__PURE__*/React.createElement("i", {
    className: "ac-hd__caret",
    "aria-hidden": "true"
  })), item.children && menu === item.href && /*#__PURE__*/React.createElement("div", {
    className: "ac-hd__menu",
    onKeyDown: e => {
      if (e.key === 'Escape') setMenu(null);
    }
  }, item.children.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.href,
    href: c.href,
    onClick: go(c.href)
  }, c.label)))))), /*#__PURE__*/React.createElement("a", {
    className: "ac-hd__cta",
    href: ctaHref,
    onClick: go(ctaHref)
  }, ctaLabel), /*#__PURE__*/React.createElement("button", {
    className: "ac-hd__burger",
    type: "button",
    "aria-expanded": open,
    "aria-controls": "ac-hd-drawer",
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ac-hd__bars",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), open ? 'Close' : 'Menu')), /*#__PURE__*/React.createElement("div", {
    className: `ac-hd__drawer${open ? ' is-open' : ''}`,
    id: "ac-hd-drawer"
  }, nav.map(item => /*#__PURE__*/React.createElement("div", {
    className: "ac-hd__sec",
    key: item.href
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-hd__row"
  }, /*#__PURE__*/React.createElement("a", {
    href: item.href,
    onClick: go(item.href),
    "aria-current": currentPath === item.href ? 'page' : undefined
  }, item.label), item.children && /*#__PURE__*/React.createElement("button", {
    className: "ac-hd__toggle",
    type: "button",
    "aria-expanded": section === item.href,
    "aria-label": `${section === item.href ? 'Hide' : 'Show'} ${item.label} pages`,
    onClick: () => setSection(section === item.href ? null : item.href)
  }, section === item.href ? '–' : '+')), item.children && section === item.href && /*#__PURE__*/React.createElement("div", {
    className: "ac-hd__sub"
  }, item.children.slice(1).map(c => /*#__PURE__*/React.createElement("a", {
    key: c.href,
    href: c.href,
    onClick: go(c.href)
  }, c.label))))), /*#__PURE__*/React.createElement("div", {
    className: "ac-hd__drawer-foot"
  }, phones.map(p => /*#__PURE__*/React.createElement("a", {
    className: "ac-hd__phone",
    href: `tel:${p.tel}`,
    key: p.tel
  }, /*#__PURE__*/React.createElement("span", null, p.name), /*#__PURE__*/React.createElement("strong", null, p.phone))), /*#__PURE__*/React.createElement("a", {
    className: "ac-hd__drawer-cta",
    href: ctaHref,
    onClick: go(ctaHref)
  }, ctaLabel)))));
}
Object.assign(__ds_scope, { DEFAULT_NAV, DEFAULT_PHONES, Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
function App() {
  const [route, setRoute] = React.useState('/');
  const NS = window.TheApplianceConnectionDesignSystem_d4d2d2;
  const {
    Header,
    Footer
  } = NS;
  const go = href => {
    setRoute(href);
    window.scrollTo(0, 0);
  };
  const handleClick = e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href && href.startsWith('/')) {
      e.preventDefault();
      go(href);
    }
  };
  let Page = window.HomePage,
    pageProps = {};
  if (route === '/') {
    Page = window.HomePage;
  } else if (route.startsWith('/services/')) {
    Page = window.ServicePage;
    pageProps = {
      slug: route.replace('/services/', '')
    };
  } else if (route === '/durham' || route === '/peterborough') {
    Page = window.RegionPage;
    pageProps = {
      region: route.slice(1)
    };
  } else if (route === '/about') {
    Page = window.AboutPage;
  } else if (route === '/contact') {
    Page = window.ContactPage;
  }
  return /*#__PURE__*/React.createElement("div", {
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(Header, {
    onNavigate: go,
    logoSrc: "../../assets/logo/truck-logo-detailed.png"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement(Page, pageProps)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/AboutPage.jsx
try { (() => {
function AboutPage() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 'var(--container-narrow)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "About"), /*#__PURE__*/React.createElement("h1", null, "Thirty years of doing it right"), /*#__PURE__*/React.createElement("p", null, "The Appliance Connection has installed complete home appliances across Durham and Peterborough for over 30 years \u2014 licensed, insured, and warrantied. Owner story, credentials, and the trucks go here (real content + photos to follow).")));
}
window.AboutPage = AboutPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/AboutPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/ContactPage.jsx
try { (() => {
function ContactPage() {
  const {
    FormField,
    Button
  } = window.TheApplianceConnectionDesignSystem_d4d2d2;
  const [submitted, setSubmitted] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 'var(--container-narrow)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Contact"), /*#__PURE__*/React.createElement("h1", null, "Contact us"), /*#__PURE__*/React.createElement("p", null, "Call ", /*#__PURE__*/React.createElement("a", {
    href: "tel:19052596545"
  }, "Durham 905\xB7259\xB76545"), " or ", /*#__PURE__*/React.createElement("a", {
    href: "tel:17057420306"
  }, "Peterborough 705\xB7742\xB70306"), " \u2014 or send the details below and we'll respond within 24 hours."), submitted ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--color-success)',
      fontWeight: 600
    }
  }, "Thanks \u2014 we'll be in touch within 24 hours.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSubmitted(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)',
      marginTop: 'var(--space-xl)',
      maxWidth: '28rem'
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    id: "c-name",
    label: "Your name",
    required: true,
    placeholder: "Jane Doe"
  }), /*#__PURE__*/React.createElement(FormField, {
    id: "c-phone",
    label: "Phone",
    type: "tel",
    required: true,
    placeholder: "(905) 555-0134"
  }), /*#__PURE__*/React.createElement(FormField, {
    id: "c-service",
    label: "What do you need installed?",
    placeholder: "e.g. Gas range + dryer"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    onClick: undefined
  }, "Send message")))));
}
window.ContactPage = ContactPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/ContactPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/HomePage.jsx
try { (() => {
function HomePage() {
  const {
    Hero,
    ServiceGrid,
    ServiceCard,
    TrustBar,
    Testimonial,
    CtaBand
  } = window.TheApplianceConnectionDesignSystem_d4d2d2;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    eyebrow: "Durham & Peterborough, Ontario",
    heading: "Complete home appliance installation, done right.",
    subheading: "Licensed, insured, and warrantied \u2014 30+ years installing the built-ins a general handyman won't touch.",
    primaryLabel: "Contact Us",
    primaryUrl: "/contact",
    secondaryLabel: "Our services",
    secondaryUrl: "/services/appliance-installation"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingBottom: 'var(--space-2xl)'
    }
  }, /*#__PURE__*/React.createElement(TrustBar, null)), /*#__PURE__*/React.createElement(ServiceGrid, {
    heading: "What we install"
  }, /*#__PURE__*/React.createElement(ServiceCard, {
    title: "Appliance installation",
    description: "Every make & model \u2014 freestanding and built-in, with custom panels and venting.",
    url: "/services/appliance-installation"
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    title: "Gas piping",
    description: "Licensed gas fitting for ranges, dryers, BBQs and garage heaters.",
    url: "/services/gas-piping"
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    title: "Kitchens",
    description: "Full kitchen renovations, from rough-in to finish.",
    url: "/services/kitchens"
  })), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Testimonial, {
    quote: "They installed our double wall oven and cooktop in an afternoon \u2014 spotless, and it just worked.",
    cite: "Homeowner, Whitby"
  }))), /*#__PURE__*/React.createElement(CtaBand, {
    heading: "Have a question?",
    text: "Questions, advice or a quote \u2014 we respond within 24 hours.",
    ctaLabel: "Contact Us",
    ctaUrl: "/contact",
    isDark: true
  }));
}
window.HomePage = HomePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/RegionPage.jsx
try { (() => {
const REGIONS = {
  durham: {
    eyebrow: 'Durham Region',
    heading: 'Your Durham Region appliance installers',
    subheading: 'Oshawa, Whitby, Ajax, Pickering, Bowmanville and across Durham. Call 905·259·6545.'
  },
  peterborough: {
    eyebrow: 'Peterborough',
    heading: 'Your Peterborough appliance installers',
    subheading: 'Peterborough, Lakefield, Bridgenorth and the Kawarthas. Call 705·742·0306.'
  }
};
function RegionPage({
  region = 'durham'
}) {
  const {
    Hero,
    ServiceGrid,
    ServiceCard
  } = window.TheApplianceConnectionDesignSystem_d4d2d2;
  const r = REGIONS[region] || REGIONS.durham;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    eyebrow: r.eyebrow,
    heading: r.heading,
    subheading: r.subheading,
    primaryLabel: "Contact Us",
    primaryUrl: "/contact"
  }), /*#__PURE__*/React.createElement(ServiceGrid, {
    heading: `Services across ${r.eyebrow}`
  }, /*#__PURE__*/React.createElement(ServiceCard, {
    title: "Appliance installation",
    url: "/services/appliance-installation"
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    title: "Gas piping",
    url: "/services/gas-piping"
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    title: "Kitchens",
    url: "/services/kitchens"
  })));
}
window.RegionPage = RegionPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/RegionPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/ServicePage.jsx
try { (() => {
const SERVICES = {
  'appliance-installation': {
    heading: 'Appliance installation',
    subheading: "Freestanding and built-in — ranges, cooktops, wall ovens, dishwashers, OTR microwaves, laundry, and custom panels."
  },
  'gas-piping': {
    heading: 'Gas piping',
    subheading: 'Licensed gas fitting for ranges, dryers, BBQs, garage & shop heaters, pool and water heaters — above and below grade.'
  },
  'kitchens': {
    heading: 'Kitchens',
    subheading: 'Full kitchen renovations, from rough-in to finish — cabinetry, countertops, and every appliance installed to code.'
  }
};
function ServicePage({
  slug = 'appliance-installation'
}) {
  const {
    Hero,
    CtaBand
  } = window.TheApplianceConnectionDesignSystem_d4d2d2;
  const s = SERVICES[slug] || SERVICES['appliance-installation'];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    eyebrow: "Service",
    heading: s.heading,
    subheading: s.subheading,
    primaryLabel: "Contact Us",
    primaryUrl: "/contact"
  }), /*#__PURE__*/React.createElement(CtaBand, {
    heading: "Have a question?",
    text: "Serving Durham & Peterborough. Licensed, insured, warrantied.",
    ctaLabel: "Contact Us",
    ctaUrl: "/contact",
    isDark: true
  }));
}
window.ServicePage = ServicePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/ServicePage.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.CtaBand = __ds_scope.CtaBand;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.ServiceGrid = __ds_scope.ServiceGrid;

__ds_ns.DEFAULT_STATS = __ds_scope.DEFAULT_STATS;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TownGrid = __ds_scope.TownGrid;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.CallBar = __ds_scope.CallBar;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.TrustBar = __ds_scope.TrustBar;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.QuoteForm = __ds_scope.QuoteForm;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.FOOTER_LINKS = __ds_scope.FOOTER_LINKS;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.DEFAULT_NAV = __ds_scope.DEFAULT_NAV;

__ds_ns.DEFAULT_PHONES = __ds_scope.DEFAULT_PHONES;

__ds_ns.Header = __ds_scope.Header;

})();
