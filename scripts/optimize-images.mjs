// Generate responsive WebP variants + JPEG fallback for hero images.
// Outputs to public/images/ with stable filenames so they can be referenced from React.
// Run with: node scripts/optimize-images.mjs

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src', 'assets', 'images');
const outDir = path.join(repoRoot, 'public', 'images');

const WIDTHS = [400, 800, 1600];
const WEBP_QUALITY = 78;
const JPEG_FALLBACK_WIDTH = 1200;
const JPEG_QUALITY = 78;

// Map source filename -> output basename (slugified, no spaces)
const SOURCES = {
  'homepage.jpg': 'homepage',
  'expertise.jpg': 'expertise',
  'livres.jpg': 'livres',
  'qui sommes nous.jpg': 'qui-sommes-nous',
  'bureau.jpg': 'bureau',
  'mentionslegales.jpg': 'mentions-legales',
  'Le Cabinet.jpg': 'le-cabinet',
  'myriam.jpeg': 'myriam',
  'justice.jpg': 'justice',
  'expertises/Droit commercial.jpg': 'expertises/droit-commercial',
  'expertises/Droit des sociétés.jpg': 'expertises/droit-societes',
  'expertises/Droit du numérique.jpg': 'expertises/droit-numerique',
  'expertises/droit de la consommation.jpg': 'expertises/droit-consommation',
  'expertises/Droit de la construction.jpg': 'expertises/droit-construction',
  'expertises/Modes alternatifs.jpg': 'expertises/modes-alternatifs',
};

await fs.mkdir(path.join(outDir, 'expertises'), { recursive: true });

let totalOriginal = 0;
let totalGenerated = 0;

for (const [src, slug] of Object.entries(SOURCES)) {
  const srcPath = path.join(srcDir, src);
  let stat;
  try {
    stat = await fs.stat(srcPath);
  } catch {
    console.warn(`! missing: ${src}`);
    continue;
  }
  totalOriginal += stat.size;

  const meta = await sharp(srcPath).metadata();
  const sourceW = meta.width ?? 0;

  // Always emit every width — withoutEnlargement keeps small sources at their
  // native size, but the file still exists at the labeled URL so the browser's
  // srcset descriptor never resolves to a 404. The labeled width may be larger
  // than the actual pixels (minor blur on retina) but that's better than broken.
  for (const w of WIDTHS) {
    const dst = path.join(outDir, `${slug}-${w}.webp`);
    await sharp(srcPath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(dst);
    const s = await fs.stat(dst);
    totalGenerated += s.size;
  }

  const fallbackDst = path.join(outDir, `${slug}-${JPEG_FALLBACK_WIDTH}.jpg`);
  await sharp(srcPath)
    .resize({ width: Math.min(JPEG_FALLBACK_WIDTH, sourceW), withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
    .toFile(fallbackDst);
  const s = await fs.stat(fallbackDst);
  totalGenerated += s.size;

  console.log(`✓ ${slug}  (source ${Math.round(stat.size / 1024)} KB)`);
}

console.log(`\nTotal originals : ${Math.round(totalOriginal / 1024)} KB`);
console.log(`Total generated : ${Math.round(totalGenerated / 1024)} KB`);
