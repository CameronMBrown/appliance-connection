/**
 * Encode the hero video into a responsive ladder + a poster frame.
 *
 *   npm run video:encode --workspace web -- <master-video> [out-dir]
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

const TIERS = [
  // width, H.264 maxrate (kbps), VP9 CRF. Bitrate caps keep each tier honest.
  { width: 640, maxrate: 600, crf: 36 },
  { width: 960, maxrate: 1100, crf: 34 },
  { width: 1280, maxrate: 1900, crf: 33 },
];
const NAME = 'hero-install';
const KEYFRAME_SECONDS = 2; // short GOP = fast loop restart and seeking

const [input, outArg] = process.argv.slice(2);
if (!input) {
  console.error('Usage: encode-hero-video.mjs <master-video> [out-dir]');
  process.exit(1);
}
const outDir = resolve(outArg ?? fileURLToPath(new URL('../.video-out/', import.meta.url)));
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

const poster = join(outDir, `${NAME}-poster.webp`);
ffmpeg(['-i', input, '-frames:v', '1', '-vf', scale(1280), '-c:v', 'libwebp', '-quality', '80', poster]);
results.push(poster);

console.log('\nEncoded:');
for (const file of results) {
  console.log(`  ${basename(file).padEnd(30)} ${(statSync(file).size / 1024).toFixed(0).padStart(6)} KB`);
}
console.log(`\nOutput in ${outDir}\nNext: upload to WordPress Media → select in the Hero block.`);
