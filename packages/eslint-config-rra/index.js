'use strict';

// This configuration is heavily based on the eslint-config-airbnb
// For the javascript style documentation
// Plesae check https://github.com/airbnb/javascript
module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: [
    'flowtype',
    'redux-saga'
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
    },
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/extensions': {
      js: 'never',
      jsx: 'never', 
      json: 'never',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    flowtype: {
			onlyFilesWithFlowAnnotation: false,
		},
  },
  rules: {
    // Reference: https://github.com/react-boilerplate/react-boilerplate/blob/master/package.json
    'redux-saga/no-yield-in-race': 'error',
    'redux-saga/yield-effects': 'error',
    'require-yield': 'off',
    // Reference: https://github.com/johnie/eslint-config-airbnb-flow/blob/master/eslintrc.json
    'flowtype/define-flow-type': 'warn',
    'flowtype/space-before-type-colon': ['warn', 'never'],
    'flowtype/use-flow-type': 'warn',
		'flowtype/valid-syntax': 'warn',
    'flowtype/type-id-match': ['error', '^([A-Z]+[a-z0-9A-Z]*)$'],
    'flowtype/require-valid-file-annotation': 'warn',
  },
};
