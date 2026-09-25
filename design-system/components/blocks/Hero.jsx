import React from 'react';
import { Wordmark } from '../core/Wordmark.jsx';

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

export function Hero({
  heading, wordmark, subheading, videoUrl, posterUrl, imageUrl,
  primaryLabel, primaryShortLabel, primaryUrl, secondaryLabel, secondaryShortLabel, secondaryUrl,
  scrim = 'standard', phones = [],
}) {
  const useMark = wordmark ?? !heading;
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    const v = videoRef.current;
    if (v && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.pause();
  }, [videoUrl]);
  return (
    <React.Fragment>
      <style>{CSS}</style>
      <section className={`ac-hero${useMark ? ' ac-hero--mark' : ''}`}>
        <div className="ac-hero__frame">
          {videoUrl
            ? <video ref={videoRef} className="ac-hero__media" src={videoUrl} poster={posterUrl} autoPlay muted loop playsInline aria-hidden="true" />
            : imageUrl
              ? <img className="ac-hero__media" src={imageUrl} alt="" />
              : <div className="ac-hero__ph" aria-hidden="true">Hero video · 16:9</div>}
          <div className={`ac-hero__scrim${scrim === 'strong' ? ' ac-hero__scrim--strong' : ''}`} aria-hidden="true"></div>
          <div className="ac-hero__content">
            {useMark ? <Wordmark variant="arched" tone="light" as="h1" /> : heading && <h1 className="ac-hero__title">{heading}</h1>}
            {subheading && <p className="ac-hero__sub">{subheading}</p>}
            {(primaryLabel || secondaryLabel) && (
              <div className="ac-hero__actions">
                {primaryLabel && <a className={`ac-hero__btn ac-hero__btn--primary${primaryShortLabel ? ' has-short' : ''}`} href={primaryUrl || '#'} aria-label={primaryShortLabel ? primaryLabel : undefined}><span className="ac-hero__long">{primaryLabel}</span>{primaryShortLabel && <span className="ac-hero__short" aria-hidden="true">{primaryShortLabel}</span>}</a>}
                {secondaryLabel && <a className={`ac-hero__btn ac-hero__btn--secondary${secondaryShortLabel ? ' has-short' : ''}`} href={secondaryUrl || '#'} aria-label={secondaryShortLabel ? secondaryLabel : undefined}><span className="ac-hero__long">{secondaryLabel}</span>{secondaryShortLabel && <span className="ac-hero__short" aria-hidden="true">{secondaryShortLabel}</span>}</a>}
              </div>
            )}
          </div>
        </div>
        {phones.length > 0 && (
          <div className="ac-hero__phones">
            {phones.map((p) => (
              <div className="ac-hero__phone" key={p.tel}><span>{p.label}</span><a href={`tel:${p.tel}`}>{p.phone}</a></div>
            ))}
          </div>
        )}
      </section>
    </React.Fragment>
  );
}
