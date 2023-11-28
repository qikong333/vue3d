import aliasPlugin from 'esbuild-plugin-alias';
import { Options } from 'tsup';
const env = process.env.NODE_ENV;

export const tsup: Options = {
  splitting: true,
  sourcemap: env === 'prod', // source map is only available in prod
  clean: true, // rimraf disr
  dts: true, // generate dts file for main module
  format: ['cjs', 'esm'], // generate cjs and esm files
  minify: env === 'production',
  bundle: env === 'production',
  skipNodeModulesBundle: true,
  entryPoints: ['src/index.ts'],
  watch: env === 'development',
  target: 'es2020',
  outDir: env === 'production' ? 'dist' : 'lib',
  entry: ['src/**/*.ts'],
  ignoreWatch: [''],
  plugins: [
    aliasPlugin({
      // 别名配置
      '@': './src/',
    }),
  ],
};
