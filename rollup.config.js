import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/game/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [typescript()],
  watch: {
    include: 'src/**',
    exclude: 'src/**/*.test.ts',
  },
}
