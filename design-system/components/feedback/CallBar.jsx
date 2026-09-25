import React from 'react';

export function CallBar({ label = 'Contact Us', numbers = [
  { name: 'Durham', phone: '905.259.6545', tel: '19052596545' },
  { name: 'Peterborough', phone: '705.742.0306', tel: '17057420306' },
] }) {
  return (
    <React.Fragment>
      <style>{`
        .ac-callbar{display:flex;flex-wrap:wrap;gap:var(--space-md) var(--space-lg);align-items:center;justify-content:space-between;background:var(--neutral-900);color:var(--neutral-0);border:1px solid var(--neutral-900);border-radius:var(--radius-none);box-shadow:var(--shadow-lg);padding:var(--space-md) var(--space-lg);}
        .ac-callbar__label{font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:var(--weight-semibold);color:var(--wood-300);}
        .ac-callbar .ac-nums{display:flex;flex-wrap:wrap;align-items:center;}
        .ac-callbar .ac-nums a{display:flex;flex-direction:column;gap:.15em;padding-inline:var(--space-lg);color:var(--neutral-0);text-decoration:none;font-family:var(--font-display);font-size:var(--text-md);}
        .ac-callbar .ac-nums a + a{border-left:1px solid rgba(255,255,255,.28);}
        .ac-callbar .ac-nums a:hover{color:var(--wood-300);}
        .ac-callbar .ac-nums span{font-family:var(--font-body);color:var(--neutral-400);font-weight:var(--weight-regular);font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;}
      `}</style>
      <div className="ac-callbar">
        <strong className="ac-callbar__label">{label}</strong>
        <div className="ac-nums">
          {numbers.map((n) => <a key={n.tel} href={`tel:${n.tel}`}><span>{n.name}</span>{n.phone}</a>)}
        </div>
      </div>
    </React.Fragment>
  );
}
