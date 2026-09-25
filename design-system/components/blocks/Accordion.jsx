import React from 'react';

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

export function Accordion({ items = [], allowMultiple = false, defaultOpen = [] }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = (i) => () => {
    if (open.includes(i)) setOpen(open.filter((x) => x !== i));
    else setOpen(allowMultiple ? [...open, i] : [i]);
  };
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <div className="ac-ac">
        {items.map((item, i) => {
          const isOpen = open.includes(i);
          return (
            <div className="ac-ac__item" data-open={isOpen} key={item.question || i}>
              <button className="ac-ac__q" type="button" aria-expanded={isOpen} aria-controls={`ac-ac-${i}`} onClick={toggle(i)}>
                <span>{item.question}</span>
                <span className="ac-ac__tick" aria-hidden="true"></span>
              </button>
              {isOpen && <div className="ac-ac__a" id={`ac-ac-${i}`}><p>{item.answer}</p></div>}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
