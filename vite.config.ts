import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    minify: 'esbuild',
    lib: {
      entry: 'index.js',
      name: 'ngraphEvents',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'umd') return 'ngraph.events.umd.js';
        if (format === 'cjs') return 'ngraph.events.cjs';
        return 'ngraph.events.es.js';
      },
    },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
    globals: true,
    reporters: 'default',
  },
});
