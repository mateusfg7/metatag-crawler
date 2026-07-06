import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

// Keep runtime deps external so they are resolved from node_modules.
const external = ['axios', 'cheerio', 'node:url'];

export default defineConfig([
  // JS bundles: dual ESM + CJS.
  {
    input: 'src/index.ts',
    external,
    output: [
      { format: 'es', file: 'dist/index.mjs', exports: 'default' },
      { format: 'cjs', file: 'dist/index.cjs', exports: 'default' },
    ],
  },
  // Bundled type declarations: dist/index.d.ts.
  {
    input: 'src/index.ts',
    external,
    plugins: [dts({ emitDtsOnly: true })],
    output: { dir: 'dist' },
  },
]);
