import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.es',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
  ],
  targets: [
    {
      format: 'iife',
      indent: true,
      sourceMap: true,
      moduleName: 'ease',
      dest: 'dist/ease.js'
    },
    {
      format: 'cjs',
      dest: 'index.js'
    }
  ]
};
