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
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
