import babel from 'rollup-plugin-babel';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

export default {
  moduleName: "react-rsa",
  entry: 'src/index.js',
  dest: 'build/index.min.js',
  format: 'umd',
  sourceMap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
