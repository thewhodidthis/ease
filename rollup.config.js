import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.es',
  plugins: [
    babel()
  ],
  targets: [
    {
      format: 'iife',
      moduleName: 'ease',
      dest: 'dist/ease.js',
    },
    {
      format: 'cjs',
      dest: 'index.js',
    }
  ]
};
