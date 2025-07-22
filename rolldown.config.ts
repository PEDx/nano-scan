import { defineConfig } from 'rolldown';
import typescript from '@rollup/plugin-typescript';

export default defineConfig([
  {
    input: 'lib/index.ts',
    output: [
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        name: 'NanoScan',
        minify: true,
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        minify: true,
      },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
  {
    input: 'lib/index.ts',
    output: {
      file: 'docs/nano-scan.js',
      format: 'esm',
      name: 'NanoScan',
    },
  },
]);
