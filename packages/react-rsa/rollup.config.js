import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import includepaths from 'rollup-plugin-includepaths';

const env = process.env.NODE_ENV;

const config = {
  entry: 'src/index.js',
  external: [
    'react',
    'redux',
    'redux-saga',
    'react-apollo',
    'immutable',
    'apollo-client',
    'react-intl',
    'reselect',
  ],
  globals: {
    'react': 'React',
    'redux': 'Redux',
    'redux-saga' : 'ReduxSaga',
    'react-apollo': 'react-apollo',
    'apollo-client': 'apollo',
    'react-intl': 'ReactIntl',
    'immutable': 'Immutable',
    'reselect': 'reselect',
  },
  format: 'umd',
  moduleName: 'ReactRedux',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    babel({
      exclude: '**/node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    includepaths({
      paths: ['**/node_modules/**'],
    }),
    commonjs({
      extensions: ['.js', '.jsx', '.json'],
    }),
  ],
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        // screw_ie8: true,
        warnings: false,
      },
    })
  );
}

export default config