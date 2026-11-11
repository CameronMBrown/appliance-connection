/**
 * Picking a video rendition on the client. Shared by the Hero island and the
 * ac/video-header script.
 *
 * Why in JS: browsers ignore `media` on <video><source> and there is no `srcset`
 * for video, so the only thing the browser chooses by itself is the codec
 * (`type`). The size tier has to be decided here.
 */

/** A video under a dark overlay doesn't need full device pixels. */
export const MAX_DPR = 1.5;
/** Tolerate a 15% upscale so phones land on the middle tier, not the largest. */
export const UPSCALE_SLACK = 0.85;

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}
export const network = (): NetworkInformation =>
  (navigator as Navigator & { connection?: NetworkInformation }).connection ?? {};

/** Data Saver or 2G: download no video; show the poster and let the visitor press play. */
export const shouldSkipAutoplay = () => {
  const { saveData, effectiveType = '' } = network();
  return Boolean(saveData) || /^(slow-)?2g$/.test(effectiveType);
};

/** Device pixels per CSS pixel, capped. */
export const dpr = () => Math.min(window.devicePixelRatio || 1, MAX_DPR);

/** Smallest rendition width that is sharp enough, else the largest. Slow links get the smallest. */
export function pickWidth(widths: number[], needed: number) {
  const slow = shouldSkipAutoplay() || network().effectiveType === '3g';
  if (slow) return widths[0];
  return widths.find((w) => w >= needed * UPSCALE_SLACK) ?? widths[widths.length - 1];
}
