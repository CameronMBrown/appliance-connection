import React from 'react';

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

export function Tabs({ tabs = [], defaultIndex = 0, label = 'Section', onChange, children }) {
  const [active, setActive] = React.useState(defaultIndex);
  const refs = React.useRef([]);
  const select = (i) => { setActive(i); if (onChange) onChange(i); };
  const key = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? (active + 1) % tabs.length : (active - 1 + tabs.length) % tabs.length;
    select(next);
    if (refs.current[next]) refs.current[next].focus();
  };
  const panels = React.Children.toArray(children);
  const body = tabs[active] && tabs[active].content !== undefined ? tabs[active].content : panels[active];
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <div className="ac-tabs">
        <div className="ac-tabs__strip" role="tablist" aria-label={label} onKeyDown={key}>
          {tabs.map((t, i) => {
            const tab = typeof t === 'string' ? { label: t } : t;
            return (
              <button className="ac-tabs__tab" type="button" key={tab.label} role="tab" id={`ac-tab-${i}`}
                ref={(el) => { refs.current[i] = el; }}
                aria-selected={active === i} aria-controls={`ac-panel-${i}`} tabIndex={active === i ? 0 : -1}
                onClick={() => select(i)}>{tab.label}</button>
            );
          })}
        </div>
        <div className="ac-tabs__panel" role="tabpanel" id={`ac-panel-${active}`} aria-labelledby={`ac-tab-${active}`} tabIndex={0}>
          {body}
        </div>
      </div>
    </React.Fragment>
  );
}
