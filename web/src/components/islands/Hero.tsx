/**
 * ac/hero island: the design system's video Hero, extended for responsive,
 * accessible, performant video. Forked from design-system/components/blocks/Hero.jsx
 * (that folder is a read-only Claude Design mirror, see design-system/SOURCE.md
 * → "Deviations"). The CSS and markup below match the original except where
 * marked `APP:`.
 *
 * Why the video is picked in JS: browsers ignore `media` on <video><source>
 * (it only works for <picture>), so a media query can't choose a rendition.
 * Instead the poster <img> (SSR'd, srcset, fetchpriority=high) is the LCP
 * element and loads with the HTML, and JS then attaches only the one rendition
 * tier that is sharp enough for this screen. <source type> still lets the
 * browser choose WebM vs MP4 itself.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Wordmark } from '@ds/components/core/Wordmark.jsx';
import type { HeroAttrs, HeroVideoSource } from '../../lib/blocks/types';

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
/* APP: video sits over the poster and fades in once its first frame plays; the
   pause/play control is the WCAG 2.2.2 mechanism for auto-playing motion. */
.ac-hero__video{opacity:0;transition:opacity var(--dur-slow) var(--ease-standard);}
.ac-hero__video.is-ready{opacity:1;}
.ac-hero__toggle{position:absolute;z-index:2;right:var(--space-sm);bottom:var(--space-sm);display:grid;place-items:center;box-sizing:border-box;width:44px;height:44px;padding:0;cursor:pointer;color:var(--color-inverse-text);background:rgba(17,17,17,.6);border:1px solid var(--color-inverse-text);transition:background var(--dur) var(--ease-standard),color var(--dur) var(--ease-standard);}
.ac-hero__toggle:hover{background:var(--color-inverse-text);color:var(--color-inverse-bg);}
.ac-hero__toggle:focus-visible{outline:2px solid var(--color-inverse-text);outline-offset:2px;box-shadow:0 0 0 2px var(--color-inverse-bg);}
.ac-hero__toggle svg{width:16px;height:16px;fill:currentColor;}
@media (max-width:639px){
  .ac-hero__content{padding:var(--space-xl) var(--space-sm);}
  .ac-hero__actions{gap:var(--space-sm);margin-top:var(--space-lg);}
  .ac-hero__btn{font-size:var(--text-sm);padding:.75em 1.25em;}
  .ac-hero__btn.has-short .ac-hero__long{display:none;}
  .ac-hero__btn.has-short .ac-hero__short{display:inline;}
  .ac-hero__phone{flex-direction:column;align-items:flex-start;gap:var(--space-2xs);padding-block:var(--space-md);box-shadow:0 -1px 0 rgba(255,255,255,.28);}
  .ac-hero__phone:first-child{box-shadow:none;}
}
@media (min-width:640px){.ac-hero__frame{min-height:24rem;}.ac-hero__toggle{right:var(--space-md);bottom:var(--space-md);}}
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

// --- Rendition choice ---------------------------------------------------------

const ASPECT = 16 / 9;
// A video under a 55% scrim doesn't need full device pixels. Capping DPR at 1.5
// and tolerating a 15% upscale keeps phones on the middle tier, not the largest.
const MAX_DPR = 1.5;
const UPSCALE_SLACK = 0.85;

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}
const network = (): NetworkInformation =>
  (navigator as Navigator & { connection?: NetworkInformation }).connection ?? {};

/** Data Saver or 2G: show the poster only; the visitor can still press play. */
const shouldSkipAutoplay = () => {
  const { saveData, effectiveType = '' } = network();
  return Boolean(saveData) || /^(slow-)?2g$/.test(effectiveType);
};

/** Pixel width the video must cover: object-fit: cover scales it to fill both axes. */
function neededWidth(frame: HTMLElement) {
  const { width, height } = frame.getBoundingClientRect();
  return Math.max(width, height * ASPECT) * Math.min(window.devicePixelRatio || 1, MAX_DPR);
}

/** Smallest rendition width that is sharp enough, else the largest. Slow links get the smallest. */
function pickWidth(widths: number[], needed: number) {
  const slow = shouldSkipAutoplay() || network().effectiveType === '3g';
  if (slow) return widths[0];
  return widths.find((w) => w >= needed * UPSCALE_SLACK) ?? widths[widths.length - 1];
}

const PauseIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3 1h4v14H3zM9 1h4v14H9z" />
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3 1l11 7-11 7z" />
  </svg>
);

// --- Component ----------------------------------------------------------------

interface HeroPhone {
  label: string;
  phone: string;
  tel: string;
}

interface Props extends Omit<HeroAttrs, 'showPhones'> {
  wordmark?: boolean;
  phones?: HeroPhone[];
}

export function Hero({
  heading, wordmark, subheading, videoSources = [], posterUrl, posterSrcset, posterWidth, posterHeight,
  primaryLabel, primaryShortLabel, primaryUrl, secondaryLabel, secondaryShortLabel, secondaryUrl,
  scrim = 'standard', phones = [],
}: Props) {
  const useMark = wordmark ?? !heading;
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false); // true until the visitor presses play
  const resumeAt = useRef(0); // playback position to restore after a tier swap
  const finished = useRef(false); // played to the end; replays only on re-entering the viewport

  const widths = useMemo(
    () => [...new Set(videoSources.map((s) => s.width))].sort((a, b) => a - b),
    [videoSources],
  );
  // Within a width: WebM first (smaller); the browser skips what it can't play.
  const sourcesAt = (width: number): HeroVideoSource[] =>
    videoSources.filter((s) => s.width === width).sort((a) => (a.mime === 'video/webm' ? -1 : 1));

  const [controls, setControls] = useState(false); // pause button appears once JS runs
  const [activeWidth, setActiveWidth] = useState<number | null>(null); // null = nothing downloaded
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false); // first frame painted, so fade the video in

  const hasVideo = widths.length > 0;

  // 1. Decide whether to autoplay at all, and which tier.
  useEffect(() => {
    if (!hasVideo || !frameRef.current) return;
    const frame = frameRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setControls(true);
    userPaused.current = reduceMotion.matches || shouldSkipAutoplay();
    if (!userPaused.current) setActiveWidth(pickWidth(widths, neededWidth(frame)));

    const onMotionChange = () => {
      if (!reduceMotion.matches) return;
      userPaused.current = true;
      videoRef.current?.pause();
    };
    reduceMotion.addEventListener('change', onMotionChange);
    return () => reduceMotion.removeEventListener('change', onMotionChange);
  }, [hasVideo, widths]);

  // 2. (Re)load when the tier changes. Mutating <source> after load needs an explicit load().
  useEffect(() => {
    const video = videoRef.current;
    if (!video || activeWidth === null) return;
    video.muted = true; // React doesn't reliably reflect `muted` to the DOM; autoplay needs it
    video.load();
    // Blocked (e.g. iOS Low Power Mode)? The poster stays and the button offers play.
    if (!userPaused.current && !finished.current) video.play().catch(() => {});
  }, [activeWidth]);

  // 3. Window grew (rotate, resize)? Upgrade to a sharper tier, never downgrade.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || activeWidth === null || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => {
      const wanted = pickWidth(widths, neededWidth(frame));
      if (wanted > activeWidth) {
        resumeAt.current = finished.current ? 0 : (videoRef.current?.currentTime ?? 0);
        setActiveWidth(wanted);
      }
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [activeWidth, widths]);

  // 4. Plays once. Fully scrolled out of view: rewind. Back in view: play again from the
  //    start (unless the visitor paused it). threshold 0 = true only when no pixel is visible.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || activeWidth === null || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      const video = videoRef.current;
      if (!video) return;
      if (!entry.isIntersecting) {
        video.pause();
        video.currentTime = 0;
        finished.current = false;
      } else if (!userPaused.current && (video.paused || video.ended)) {
        video.play().catch(() => {});
      }
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [activeWidth]);

  const toggle = () => {
    if (playing) {
      userPaused.current = true;
      videoRef.current?.pause();
      return;
    }
    userPaused.current = false;
    if (activeWidth === null && frameRef.current) {
      setActiveWidth(pickWidth(widths, neededWidth(frameRef.current))); // effect 2 starts playback
    } else {
      videoRef.current?.play().catch(() => {});
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <section className={`ac-hero${useMark ? ' ac-hero--mark' : ''}`}>
        <div className="ac-hero__frame" ref={frameRef}>
          {/* APP: the poster is a real <img> so it can carry srcset + fetchpriority; a
              <video poster> can't. It is SSR'd, so it paints (and counts as LCP) before JS. */}
          {posterUrl && (
            <img
              className="ac-hero__media"
              src={posterUrl}
              srcSet={posterSrcset || undefined}
              sizes="(max-width: 639px) 570px, (min-width: 1600px) 1600px, 100vw"
              width={posterWidth}
              height={posterHeight}
              alt=""
              decoding="async"
              {...{ fetchpriority: 'high' }}
            />
          )}
          {hasVideo && (
            <video
              ref={videoRef}
              className={`ac-hero__media ac-hero__video${ready ? ' is-ready' : ''}`}
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              aria-hidden="true"
              disablePictureInPicture
              disableRemotePlayback
              onPlaying={() => {
                finished.current = false;
                setPlaying(true);
                setReady(true);
              }}
              onEnded={() => {
                finished.current = true;
                setPlaying(false);
              }}
              onPause={() => setPlaying(false)}
              onLoadedMetadata={(e) => {
                if (resumeAt.current) {
                  e.currentTarget.currentTime = resumeAt.current;
                  resumeAt.current = 0;
                }
              }}
            >
              {activeWidth !== null && sourcesAt(activeWidth).map((s) => <source key={s.url} src={s.url} type={s.mime} />)}
            </video>
          )}
          {!hasVideo && !posterUrl && <div className="ac-hero__ph" aria-hidden="true">Hero video · 16:9</div>}
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
          {controls && (
            <button type="button" className="ac-hero__toggle" onClick={toggle} aria-label={playing ? 'Pause background video' : 'Play background video'}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
          )}
        </div>
        {phones.length > 0 && (
          <div className="ac-hero__phones">
            {phones.map((p) => (
              <div className="ac-hero__phone" key={p.tel}><span>{p.label}</span><a href={`tel:${p.tel}`}>{p.phone}</a></div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
