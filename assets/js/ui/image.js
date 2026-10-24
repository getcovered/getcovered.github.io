/**
 * Prepare an uploaded logo: decode it, shrink it if it is large, and return a
 * PNG data URL. The aspect ratio is never changed. Nothing leaves the device.
 */
const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const MAX_INPUT_BYTES = 12 * 1024 * 1024;
const MAX_OUTPUT_CHARS = 2_500_000;

export const LOGO_ACCEPT = ACCEPTED.join(',');

export class LogoError extends Error {}

async function decode(file) {
  if ('createImageBitmap' in window) {
    try {
      return await createImageBitmap(file);
    } catch {
      /* fall through to <img> */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function draw(source, maxSide, background) {
  const w = source.width;
  const h = source.height;
  const scale = Math.min(1, maxSide / Math.max(w, h));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext('2d');
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export async function fileToLogo(file) {
  if (!ACCEPTED.includes(file.type)) {
    const svg = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name);
    throw new LogoError(
      svg
        ? 'SVG logos aren’t supported yet. Export the logo as a PNG and choose that instead.'
        : 'That file isn’t a PNG, JPG, WebP or GIF image. Choose one of those.',
    );
  }
  if (file.size > MAX_INPUT_BYTES) throw new LogoError('That image is over 12 MB. Choose a smaller one.');

  let source;
  try {
    source = await decode(file);
  } catch {
    throw new LogoError('That image couldn’t be read. Try exporting it again as a PNG.');
  }

  for (const side of [1200, 900, 600]) {
    const url = draw(source, side).toDataURL('image/png');
    if (url.length <= MAX_OUTPUT_CHARS) return { dataUrl: url, width: source.width, height: source.height };
  }
  // Photographic logos compress better as JPEG; there is no transparency to lose.
  const jpeg = draw(source, 900, '#ffffff').toDataURL('image/jpeg', 0.9);
  if (jpeg.length <= MAX_OUTPUT_CHARS) return { dataUrl: jpeg, width: source.width, height: source.height };
  throw new LogoError('That image is too detailed to store. Choose a smaller or simpler logo.');
}
