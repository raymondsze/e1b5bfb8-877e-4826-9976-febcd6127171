'use strict';

const chalk = require('chalk');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const NameAllModulesPlugin = require('name-all-modules-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const paths = require('./paths');
const getDllHash = require('./getDllHash');

const location = 'react-scripts/config/webpack.config.prod';
const config = require(location);

const checkLangauges = require('./checkLanguages');
const bootstrap = require('./bootstrap');

// do the config modification
const entry = config.entry;
config.entry = {
  vendor: [paths.appVendorJs],
  index: [path.join(paths.appBuild, '../bootstrap.js')],
};

// get the css loader rule
const cssRule = config.module.rules.find(
  rule => (rule.test instanceof RegExp && rule.test.source.indexOf('css$') !== -1)
);
// make sure no css is implemented in the source code, enforce 'styled-components'
cssRule.include = /node_modules/;

// get the image loader rule
const imageRule = config.module.rules.find(
  rule => (rule.test instanceof Array && rule.test.find(type => (type instanceof RegExp && type.source.indexOf('png$') !== -1)) !== -1)
);
imageRule.use = [
  {
    loader: imageRule.loader,
    options: imageRule.options,
  },
  // use imagemin to optimize image file size
  // https://github.com/imagemin/imagemin
  {
    loader: require.resolve('image-webpack-loader'),
    options: {
      gifsicle: {
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      mozjpeg: {
        progressive: true,
        quality: 65
      }
    },
  },
];
delete imageRule.loader;
delete imageRule.options;

// get the file loader rule
const fileRule = config.module.rules.find(
  rule => rule.exclude instanceof Array
);
fileRule.exclude.push(/\.(graphql|gql)$/);

// get the eslint loader rule
const eslintRule = config.module.rules.find(
  rule => (
    rule.test instanceof RegExp &&
    rule.test.source.indexOf('(js|jsx)$') !== -1 &&
    rule.enforce === 'pre'
  )
);
eslintRule.use[0].options.baseConfig = {
  extends: [require.resolve('eslint-config-rra')],
};

config.module.rules = config.module.rules.slice(1, config.module.rules.length);
// get the js loader rule
const jsRule = config.module.rules.find(
  rule => (
    rule.test instanceof RegExp &&
    rule.test.source.indexOf('(js|jsx)$') !== -1 &&
    !rule.enforce
  )
);
jsRule.include = [jsRule.include, path.join(paths.appBuild, '..', 'bootstrap.js')];
jsRule.options.presets = [require.resolve('babel-preset-rra')];
jsRule.options.plugins = [
  // Extracts string messages for translation from modules that use React Intl.
  // https://github.com/yahoo/babel-plugin-react-intl
  [
    require.resolve('babel-plugin-react-intl'), {
      // the output messages directory
      "messagesDir": paths.appMessagesDir,
    },
  ],
];

// add graphql loader
config.module.rules.push(
  {
    test: /\.(graphql|gql)$/,
    loader: require.resolve('graphql-tag/loader'),
  }
);

config.plugins.push(
  // Asset plugin for server-side-rendering
  new AssetsPlugin({
    fullPath: true,
    path: paths.appBuild,
    filename: 'assets.json',
  })
);

config.plugins.push.apply(config.plugins, [
  new webpack.NamedModulesPlugin(),
  new webpack.NamedChunksPlugin(chunk => {
    if (chunk.name) return chunk.name;
    const crypto = require('crypto');
    const pathDigest = crypto.createHash('md5');
    return chunk.modules
      .map(m => {
        return path.relative(m.context, m.request || '');
      })
      .reduce((d, m)=> d.update(m), pathDigest)
      .digest('base64')
      .replace(/\\g/, '_');
  }),
  new NameAllModulesPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),
]);

const hasVendorJs = fs.existsSync(paths.appVendorJs);
if (hasVendorJs) {
  config.plugins.push.apply(config.plugins, [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
  ]);
}
require.cache[require.resolve(location)].exports = config;

checkLangauges(paths);
bootstrap(paths, entry, path.join(paths.appBuild, '../bootstrap.js'), config.target);

module.exports = config;
