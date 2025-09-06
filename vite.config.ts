import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    minify: 'esbuild',
    lib: {
      entry: 'index.js',
      name: 'ngraphEvents',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'umd' ? 'ngraph.events.umd.js' : 'ngraph.events.es.js',
    },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
    globals: true,
    reporters: 'default',
  },
});
