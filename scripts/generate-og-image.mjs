// Generates public/og-image.png: Orbit Navy background, one open arc (270-330deg)
// + one dot (the Logo Direction motif from the Design Book), IBM Plex wordmark.
// No gradients, no 3D, no illustration — background geometry is capped at one element.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NAVY = '#0E2A47';
const WHITE = '#FFFFFF';
const BLUE = '#2563C9';
const MUTED = '#9AA7B5';

const width = 1200;
const height = 630;
const cx = 920;
const cy = 340;
const r = 200;

// Open arc from 270deg to 330deg (60deg arc), stroke width = r / 16 per Logo Direction ratio.
const startAngle = (270 * Math.PI) / 180;
const endAngle = (330 * Math.PI) / 180;
const strokeWidth = Math.round(r / 16);
const x1 = cx + r * Math.cos(startAngle);
const y1 = cy + r * Math.sin(startAngle);
const x2 = cx + r * Math.cos(endAngle);
const y2 = cy + r * Math.sin(endAngle);
const dotR = strokeWidth * 1.5;
const dotAngle = (300 * Math.PI) / 180;
const dotX = cx + r * Math.cos(dotAngle);
const dotY = cy + r * Math.sin(dotAngle);

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${NAVY}" />
  <path d="M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}" fill="none" stroke="${BLUE}" stroke-width="${strokeWidth}" stroke-linecap="round" opacity="0.7" />
  <circle cx="${dotX}" cy="${dotY}" r="${dotR}" fill="${BLUE}" opacity="0.7" />

  <text x="96" y="300" font-family="IBM Plex Mono, monospace" font-size="22" letter-spacing="3" fill="${MUTED}">OPEN SOURCE · GITHUB ACTION</text>
  <text x="96" y="368" font-family="IBM Plex Sans, sans-serif" font-weight="600" font-size="56" letter-spacing="-1.4" fill="${WHITE}">OrbSeekr</text>
  <text x="96" y="430" font-family="IBM Plex Sans, sans-serif" font-weight="400" font-size="28" fill="${WHITE}">Evidence for what you claim about Earth.</text>
  <text x="96" y="520" font-family="IBM Plex Mono, monospace" font-size="20" fill="${MUTED}">eo-claim-lint · Apache-2.0 · v0.1.0</text>
</svg>
`;

const outPath = path.join(__dirname, '..', 'public', 'og-image.png');
await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log('Wrote', outPath);
