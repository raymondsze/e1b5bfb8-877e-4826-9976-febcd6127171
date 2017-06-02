'use strict';

const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const getDllHash = require('./getDllHash');
const location = 'react-scripts/config/webpack.config.dev';
const config = require(location);

const vendorJsPath = path.relative(process.cwd(), paths.appVendorJs);
const dllHash = getDllHash(paths);
const dllGlobalName = '[name]' + dllHash.toString().replace(/\./g, '');

module.exports = {
  entry: [paths.appVendorJs],
  devtool: 'source-map',
  output: {
    path: paths.appDllBuild,
    filename: `${dllHash}.js`,
    library: dllGlobalName,
  },
  resolve: config.resolve,
  plugins: [
    new webpack.DllPlugin({
      name: dllGlobalName,
      path: path.join(paths.appDllBuild, `${dllHash}.json`),
    }),
  ],
  performance: {
    hints: false,
  },
};
