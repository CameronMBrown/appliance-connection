/**
 * Encode the hero video into a responsive ladder + a poster frame.
 *
 *   npm run video:encode --workspace web -- <master-video> [out-dir]
 *   npm run video:encode --workspace web -- <master-video> --name laundry-rooms \
 *       --tiers 480,720,960 --posters 480,960 --out web/public/video
 *
 * Flags (all optional; with none it behaves exactly as the home hero encode):
 *   --name     output basename (default hero-install)
 *   --tiers    comma-separated rendition widths (default 640,960,1280)
 *   --posters  comma-separated poster widths -> {name}-poster-{w}.webp
 *              (default: one 1280w {name}-poster.webp)
 *   --out      output directory (default web/.video-out/)
 *
 * The ac/video-header (service pages) uses the same ladder: 480/720/960 for a 960px
 * square master, plus 480 + 960 posters.
 *
 * Output (default web/.video-out/, gitignored):
 *   hero-install-{640,960,1280}.webm   VP9   (smallest; browsers that can play it pick it first)
 *   hero-install-{640,960,1280}.mp4    H.264 (universal fallback, faststart)
 *   hero-install-poster.webp           frame 0, 1280w (becomes the LCP image)
 *
 * Then upload every file to the WordPress Media Library and select them in the
 * Hero block (Video renditions + Poster). WordPress doesn't make video
 * renditions itself, so this script is the "dev owns structure" step.
 * See docs/04-dev-workflow.md → "Hero video".
 *
 * ffmpeg comes from the ffmpeg-static devDependency, so nothing to install system-wide.
 * Widths are never upscaled: a 1284px master tops out at 1280. Re-run with a bigger
 * master and add widths to TIERS to get sharper widescreen/2x output.
 */
import ffmpegPath from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Known tiers keep their hand-tuned settings; any other width is interpolated.
const PRESETS = {
  640: { maxrate: 600, crf: 36 },
  960: { maxrate: 1100, crf: 34 },
  1280: { maxrate: 1900, crf: 33 },
};
const tierSettings = (width) =>
  PRESETS[width] ?? {
    // H.264 maxrate scales with pixel count (~0.0012 kbps per px); VP9 CRF eases off as frames get smaller.
    maxrate: Math.round(width * width * 0.0012),
    crf: width <= 640 ? 36 : width <= 960 ? 34 : 33,
  };
const KEYFRAME_SECONDS = 2; // short GOP = fast loop restart and seeking

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) flags[argv[i].slice(2)] = argv[++i];
  else positional.push(argv[i]);
}
const widthList = (v, fallback) =>
  v ? v.split(',').map((n) => Number(n.trim())).filter(Boolean).sort((a, b) => a - b) : fallback;

const NAME = flags.name ?? 'hero-install';
const TIERS = widthList(flags.tiers, [640, 960, 1280]).map((width) => ({ width, ...tierSettings(width) }));
const POSTER_WIDTHS = widthList(flags.posters, null);

const [input, outArg] = positional;
if (!input) {
  console.error('Usage: encode-hero-video.mjs <master-video> [out-dir] [--name n] [--tiers 480,720,960] [--posters 480,960] [--out dir]');
  process.exit(1);
}
const outDir = resolve(flags.out ?? outArg ?? fileURLToPath(new URL('../.video-out/', import.meta.url)));
mkdirSync(outDir, { recursive: true });

function ffmpeg(args) {
  const res = spawnSync(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(`ffmpeg failed: ${args.join(' ')}`);
    process.exit(res.status ?? 1);
  }
}

const scale = (w) => `scale='min(${w},iw)':-2:flags=lanczos,format=yuv420p`;
const results = [];

for (const { width, maxrate, crf } of TIERS) {
  const gop = ['-r', '24', '-g', String(24 * KEYFRAME_SECONDS), '-keyint_min', String(24 * KEYFRAME_SECONDS)];

  const webm = join(outDir, `${NAME}-${width}.webm`);
  ffmpeg([
    '-i', input, '-an', '-vf', scale(width),
    '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', String(crf),
    '-deadline', 'good', '-cpu-used', '2', '-row-mt', '1', ...gop, webm,
  ]);

  const mp4 = join(outDir, `${NAME}-${width}.mp4`);
  ffmpeg([
    '-i', input, '-an', '-vf', scale(width),
    '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '23',
    '-maxrate', `${maxrate}k`, '-bufsize', `${maxrate * 2}k`, ...gop,
    // faststart puts the moov atom first so playback starts before the file finishes downloading.
    '-movflags', '+faststart', mp4,
  ]);

  results.push(webm, mp4);
}

for (const w of POSTER_WIDTHS ?? [null]) {
  const poster = join(outDir, w ? `${NAME}-poster-${w}.webp` : `${NAME}-poster.webp`);
  ffmpeg(['-i', input, '-frames:v', '1', '-vf', scale(w ?? 1280), '-c:v', 'libwebp', '-quality', '80', poster]);
  results.push(poster);
}

console.log('\nEncoded:');
for (const file of results) {
  console.log(`  ${basename(file).padEnd(30)} ${(statSync(file).size / 1024).toFixed(0).padStart(6)} KB`);
}
console.log(`\nOutput in ${outDir}\nNext: upload to WordPress Media → select in the Hero block.`);
