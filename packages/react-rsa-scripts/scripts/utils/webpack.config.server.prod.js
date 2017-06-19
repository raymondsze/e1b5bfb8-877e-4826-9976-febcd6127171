const clone = require('clone');
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const paths = require('./paths');
const config = require('./webpack.config.prod');

const configModule = clone(config.module);
// get the css loader rule
const cssRule = configModule.rules.find(
  rule => (rule.test instanceof RegExp && rule.test.source.indexOf('css$') !== -1)
);
cssRule.loader = require.resolve('ignore-loader');
delete cssRule.use;

// get the image loader rule
const imageRule = configModule.rules.find(
  rule => (rule.test instanceof Array && rule.test.find(type => (type instanceof RegExp && type.source.indexOf('png$') !== -1)) !== -1)
);
imageRule.loader = require.resolve('file-loader');
imageRule.options = {
  emitFile: false,
};
delete imageRule.use;

// get the js loader rule
const jsRule = configModule.rules.find(
  rule => (
    rule.test instanceof RegExp &&
    rule.test.source.indexOf('(js|jsx)$') !== -1 &&
    !rule.enforce
  )
);
jsRule.options.presets = [require.resolve('babel-preset-react-rsa-app/server')];

// get the file loader rule
const fileRule = configModule.rules.find(
  rule => rule.exclude instanceof Array
);
fileRule.options = {
  emitFile: false,
};

module.exports = {
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  devtool: 'source-map',
  entry: [require.resolve('./dotenv'), paths.appServerJs],
  output: {
    path: paths.appServerBuild,
    libraryTarget: 'commonjs2',
    filename: 'index.js',
  },
  module: configModule,
  resolve: config.resolve,
  externals: [
    nodeExternals({
      modulesDir: paths.appNodeModules,
      whitelist: [
        'source-map-support',
        /\.(?!(?:jsx?|json)$).{1,5}$/i,
      ],
    }),
  ],
  plugins: config.plugins.filter(
    plugin => (
      plugin.constructor.name === 'DefinePlugin'
    )
  ).concat([
    new webpack.BannerPlugin({
      banner: fs.readFileSync(path.join(__dirname, './sourceMapSupport.js'), 'utf-8'),
      include: /\.jsx?$/,
      raw: true,
      entryOnly: false,
    })
  ]),
  performance: {
    hints: false,
  },
};
