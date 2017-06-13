'use strict';

const chalk = require('chalk');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const paths = require('./paths');
const getDllHash = require('./getDllHash');

const location = 'react-scripts/config/webpack.config.dev';
const config = require(location);

const checkLangauges = require('./checkLanguages');
const bootstrap = require('./bootstrap');

const entry = config.entry;
// do the config modification
// config.entry = [path.join(paths.appBuild, '../bootstrap.js')];
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
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),
  new StyleLintPlugin({
    files: [path.relative(process.cwd(), path.join(paths.appSrc, '**/*{js,jsx}'))],
    config: {
      extends: require.resolve('stylelint-config-rra'),
    },
  }),
]);

const hasVendorJs = fs.existsSync(paths.appVendorJs);
const dllHash = getDllHash(paths);
const vendorJsPath = path.relative(process.cwd(), paths.appVendorJs);
if (hasVendorJs) {
  const manifestJson = path.join(paths.appDllBuild, `${dllHash}.json`);
  if (fs.existsSync(manifestJson)) {
    config.plugins.push.apply(config.plugins, [
      new AddAssetHtmlPlugin({
        outputPath: path.join('static', 'js'),
        publicPath: config.output.publicPath +
          path.join('static', 'js'),
        filepath: path.join(paths.appDllBuild, `${dllHash}.js`),
      }),
      new webpack.DllReferencePlugin({
        manifest: require(manifestJson),
      }),
    ]);
  }
}

require.cache[require.resolve(location)].exports = config;

checkLangauges(paths);
bootstrap(paths, entry, path.join(paths.appBuild, '../bootstrap.js'), config.target);
config.entry = [require.resolve(path.join(paths.appBuild, '../bootstrap.js'))];

module.exports = config;
