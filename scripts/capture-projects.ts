import sharp from 'sharp';
import { join } from 'path';

const OUT_DIR = join(import.meta.dir, '..', 'public', 'projects');

const CAPTURE_W = 1280;
const CAPTURE_H = 720;
const SCALE = 2;

const WIDTHS = [400, 800, 1200, 1600, 2560];

const sites = [
  { url: 'https://avishj.github.io/ForexRadar', name: 'forexradar' },
  { url: 'https://avishj.github.io/ExplainRFC', name: 'explainrfc' },
  { url: 'https://sedsindia.github.io', name: 'sedsindia' },
];

for (const site of sites) {
  console.log(`\nCapturing ${site.url} at ${CAPTURE_W}x${CAPTURE_H} @${SCALE}x ...`);

  const proc = Bun.spawnSync([
    'pageres', site.url, `${CAPTURE_W}x${CAPTURE_H}`,
    `--scale=${SCALE}`,
    `--filename=${site.name}`,
    '--crop',
    '--delay=25',
    '--timeout=30',
    '--css=html, body { scroll-behavior: auto !important; } ::-webkit-scrollbar { display: none !important; }',
    '--overwrite',
  ], { cwd: OUT_DIR, stdio: ['inherit', 'inherit', 'inherit'] });

  if (proc.exitCode !== 0) {
    console.error(`Failed to capture ${site.name}`);
    continue;
  }

  const srcPng = join(OUT_DIR, `${site.name}.png`);

  for (const w of WIDTHS) {
    const h = Math.round(w * (9 / 16));
    const outPath = join(OUT_DIR, `${site.name}-${w}w.webp`);
    await sharp(srcPng)
      .resize(w, h, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(outPath);
    console.log(`  → ${site.name}-${w}w.webp  (${w}×${h})`);
  }

  await Bun.file(srcPng).exists() && (await Bun.$`rm ${srcPng}`);
}

console.log('\nDone.');
