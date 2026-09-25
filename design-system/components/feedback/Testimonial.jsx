import React from 'react';

export function Testimonial({ quote, cite }) {
  return (
    <React.Fragment>
      <style>{`
        .ac-quote{position:relative;background:var(--color-surface);border:1px solid var(--color-border-strong);box-shadow:var(--shadow-sm);padding:var(--space-lg);max-width:44ch;margin:0;}
        .ac-quote::before{content:"";position:absolute;top:0;left:0;width:10px;height:10px;background:var(--color-accent);}
        .ac-quote p{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--text-lg);line-height:var(--leading-snug);margin:0 0 var(--space-md);max-width:none;}
        .ac-quote cite{display:block;border-top:1px solid var(--color-border);padding-top:var(--space-sm);font-style:normal;font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;font-weight:var(--weight-semibold);color:var(--color-text-muted);}
      `}</style>
      <blockquote className="ac-quote">
        <p>“{quote}”</p>
        <cite>{cite}</cite>
      </blockquote>
    </React.Fragment>
  );
}
