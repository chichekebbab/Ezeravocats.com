import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'fs';
import { join } from 'path';

import compression from 'vite-plugin-compression';
import imagePresets from 'vite-plugin-image-presets';

const sharpPreset = imagePresets({
  webp: {
    // @ts-ignore - Typings mismatch with plugin version
    encodeOptions: {
      quality: 80,
      lossless: false,
      speed: 4,
    }
  },
});

// Collect article slugs at build time for SSG pre-rendering
function getArticleRoutes(): string[] {
  try {
    const dir = join(process.cwd(), 'src/content/articles');
    return readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => `/articles/${f.replace(/\.md$/, '')}`);
  } catch {
    return [];
  }
}


export default defineConfig({
  plugins: [
    react(),
    sharpPreset,
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240
    })
  ],

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      // Critters auto-adds a <link rel="preload"> for every @font-face it finds
      // in the inlined critical CSS — that's 18 woff2 downloads on mobile.
      // We manage font preloads manually in index.html (2 preloads only).
      preloadFonts: false,
    },
    includedRoutes: () => [
      '/',
      '/cabinet',
      '/equipe',
      '/expertises',
      '/expertises/droit-commercial',
      '/expertises/droit-societes',
      '/expertises/droit-numerique',
      '/expertises/droit-consommation',
      '/expertises/droit-construction',
      '/expertises/modes-alternatifs',
      '/contact',
      '/mentions-legales',
      '/articles',
      ...getArticleRoutes(),
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('scheduler')) return 'react';
          return 'vendor';
        }
      }
    }
  }
});
