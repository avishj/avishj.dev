import sharp from 'sharp';
import { join } from 'path';

const OUT_DIR = join(import.meta.dir, '..', 'public', 'projects');

const CAPTURE_W = 1280;
const CAPTURE_H = 720;
const SCALE = 2;

const WIDTHS = [400, 800, 1200, 1600, 2560];

interface Site {
  url: string;
  name: string;
  active: boolean;
}

const sites: Site[] = [
	{ url: "https://avishj.github.io/ForexRadar", name: "forexradar", active: true },
	{ url: "https://avishj.github.io/ExplainRFC", name: "explainrfc", active: true },
	{ url: "https://sedsindia.github.io", name: "sedsindia", active: false },
	{ url: "https://mfcrp-private.netlify.app/", name: "mfcvit", active: false }
];

const activeOnly = Bun.argv.includes('--active-only');
const targets = activeOnly ? sites.filter((s) => s.active) : sites;

if (targets.length === 0) {
  console.log('No sites to capture.');
  process.exit(0);
}

console.log(`Capturing ${targets.length}/${sites.length} sites${activeOnly ? ' (active only)' : ''} ...`);

for (const site of targets) {
  console.log(`\n${site.active ? '●' : '○'} ${site.name} — ${site.url} (${CAPTURE_W}x${CAPTURE_H} @${SCALE}x)`);

  const css = 'html, body { scroll-behavior: auto !important; } ::-webkit-scrollbar { display: none !important; }';
  const proc = Bun.spawnSync([
    'bunx', 'pageres-cli', site.url, `${CAPTURE_W}x${CAPTURE_H}`,
    `--scale=${SCALE}`,
    `--filename=${site.name}`,
    '--crop',
    '--delay=25', // seconds; sites use heavy JS/GSAP animations that need time to settle
    '--timeout=30',
    `--css=${css}`,
    '--overwrite',
  ], { cwd: OUT_DIR, stdio: ['inherit', 'inherit', 'inherit'] });

  if (proc.exitCode !== 0) {
    console.error(`Failed to capture ${site.name}`);
    continue;
  }

  const srcPng = join(OUT_DIR, `${site.name}.png`);

  try {
    for (const w of WIDTHS) {
      const h = Math.round(w * (9 / 16));
      const outPath = join(OUT_DIR, `${site.name}-${w}w.webp`);
      await sharp(srcPng)
        .resize(w, h, { fit: 'cover' })
        .webp({ quality: 82 })
        .toFile(outPath);
      console.log(`  → ${site.name}-${w}w.webp  (${w}×${h})`);
    }
  } catch (err) {
    console.error(`Error resizing ${site.name}:`, err);
  } finally {
    if (await Bun.file(srcPng).exists()) await Bun.$`rm ${srcPng}`;
  }
}

console.log('\nDone.');
