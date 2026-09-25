import React from 'react';

// Arc geometry (viewBox units). The curve is fixed; the text is measured at
// runtime and centred on it, so the mark stays balanced whatever the font does.
const W = 1200;
const P0 = [20, 300], P1 = [600, 40], P2 = [1180, 300];
const F = 60;            // main line font-size
const FT = 30;           // "THE" font-size
const CAP = 0.7;         // Benguiat cap-height ratio (approx.)
const N = 600;

const bez = (t) => {
  const a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
  return [a * P0[0] + b * P1[0] + c * P2[0], a * P0[1] + b * P1[1] + c * P2[1]];
};
const SAMPLES = (() => {
  const out = [{ t: 0, s: 0, p: bez(0) }];
  for (let i = 1; i <= N; i++) {
    const t = i / N, p = bez(t), q = out[i - 1].p;
    out.push({ t, s: out[i - 1].s + Math.hypot(p[0] - q[0], p[1] - q[1]), p });
  }
  return out;
})();
const LEN = SAMPLES[N].s;
const atLen = (s) => {
  let lo = 0, hi = N;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (SAMPLES[m].s < s) lo = m; else hi = m; }
  const a = SAMPLES[lo], b = SAMPLES[hi];
  const k = b.s === a.s ? 0 : (s - a.s) / (b.s - a.s);
  const p = [a.p[0] + (b.p[0] - a.p[0]) * k, a.p[1] + (b.p[1] - a.p[1]) * k];
  const d = Math.hypot(b.p[0] - a.p[0], b.p[1] - a.p[1]) || 1;
  const tx = (b.p[0] - a.p[0]) / d, ty = (b.p[1] - a.p[1]) / d;
  return { p, n: [ty, -tx] }; // outward normal (away from the arch's centre)
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
    const a = atLen(s), tx = a.p[0] + a.n[0] * cap, ty = a.p[1] + a.n[1] * cap;
    if (tx >= x0 - 2 && tx <= x0 + theLen + 6) minTop = Math.min(minTop, ty);
  }
  const theBase = minTop - FT * 0.28 - FT * 0.5;
  const peakTop = atLen(LEN / 2).p[1] - cap;
  const top = Math.min(theBase - FT * CAP, peakTop) - 10;
  const bottom = start.p[1] + 14;
  return { s0, x0, theBase, top, h: bottom - top };
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

function Arched({ tone, shadow }) {
  const uid = 'wm' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const mainRef = React.useRef(null);
  const theRef = React.useRef(null);
  const [m, setM] = React.useState({ main: LEN * 0.84, the: FT * 2.3 });
  React.useLayoutEffect(() => {
    const measure = () => {
      const a = mainRef.current, b = theRef.current;
      if (!a || !b) return;
      const main = a.getComputedTextLength(), the = b.getComputedTextLength();
      if (main > 0 && the > 0) setM({ main: Math.min(main, LEN), the });
    };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }, []);
  const L = layout(m.main, m.the);
  const fill = tone === 'dark' ? 'var(--neutral-900)' : 'var(--neutral-0)';
  const filter = !shadow ? 'none'
    : tone === 'dark' ? 'drop-shadow(2px 2px 0 var(--wood-300))'
    : 'drop-shadow(3px 3px 0 #111111) drop-shadow(0 4px 12px rgba(0,0,0,.55))';
  return (
    <svg viewBox={`0 ${L.top.toFixed(1)} ${W} ${L.h.toFixed(1)}`} aria-hidden="true" focusable="false" style={{ filter }}>
      <path id={uid} d={PATH} fill="none" />
      <text ref={theRef} x={L.x0} y={L.theBase} style={{ fill, fontFamily: 'var(--font-display)', fontSize: FT, letterSpacing: 2 }}>THE</text>
      <text style={{ fill, fontFamily: 'var(--font-display)', fontSize: F, letterSpacing: 1 }}>
        <textPath ref={mainRef} href={`#${uid}`} startOffset={L.s0}>APPLIANCE CONNECTION</textPath>
      </text>
    </svg>
  );
}

export function Wordmark({ variant = 'arched', tone = 'light', shadow = true, as = 'span', size }) {
  const Tag = as;
  const cls = `ac-wm ac-wm--${variant} ac-wm--${tone}${shadow ? ' has-shadow' : ''}`;
  return (
    <React.Fragment>
      <style>{CSS}</style>
      {variant === 'arched' ? (
        <Tag className={cls} aria-label="The Appliance Connection" role={Tag === 'span' ? 'img' : undefined}>
          <Arched tone={tone} shadow={shadow} />
        </Tag>
      ) : (
        <Tag className={cls} style={size ? { fontSize: size } : undefined}>
          <span className="ac-wm__the">The</span>
          <span className="ac-wm__main"><span>Appliance</span> <span>Connection</span></span>
        </Tag>
      )}
    </React.Fragment>
  );
}
