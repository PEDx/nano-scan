import { defineConfig } from 'rolldown';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: 'lib/index.ts',
  output: [
    {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'SnapScan',
    },
    {
      file: 'dist/esm/index.js',
      format: 'esm',
    },
  ],
  plugins: [typescript({ tsconfig: './tsconfig.json' })],
});
