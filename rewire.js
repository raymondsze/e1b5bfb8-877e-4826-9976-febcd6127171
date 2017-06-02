const proxyquire = require('proxyquire');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');

// change the output path
const devConfigModule = rewire('react-scripts/scripts/start.js');
const devConfig = devConfigModule.__get__('config');
devConfig.output.path = path.join(`${devConfig.output.path}`, 'app');
// get the css loader rule
const cssRule = devConfig.module.rules.find(
  rule => (rule.test instanceof RegExp && rule.source.substring('css$') !== -1)
);
cssRule.include = /node_modules/;
// get the image loader rule
const imageRule = devConfig.module.rules.find(
  rule => (rule.test instanceof Array && rule.test.find(type => (type instanceof RegExp && type.source.substring('png$') !== -1)) !== -1)
);
imageRule.loaders = [
  require.resolve('file-loader'),
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
// get the file loader rule
const fileRule = devConfig.module.rules.find(
  rule => rule.exclude instanceof Array
);
fileRule.exclude.push(/\.(graphql|gql)$/);
// get the eslint loader rule
const eslintRule = devConfig.module.rules.find(
  rule => (
    rule.test instanceof RegExp &&
    rule.test.source === '/\.(js|jsx)$' &&
    rule.enforce === 'pre'
  )
);
// TODO replace the eslint config

// get the js loader rule
const jsRule = devConfig.module.rules.find(
  rule => (
    rule.test instanceof RegExp &&
    rule.test.source === '/\.(js|jsx)$' &&
    !rule.enforce
  )
);
// TODO replace the babel config

// add graphql loader
devConfig.module.rules.push(
  {
    test: /\.(graphql|gql)$/,
    loader: require.resolve('graphql-tag/loader'),
  },
);

devConfig.plugins.push(
  // Detect any circular dependency from the source codes
  // https://github.com/aackerman/circular-dependency-plugin
  new CircularDependencyPlugin({
    // exclude any node_modules folder
    exclude: /node_modules/,
  }),
  // Asset plugin for server-side-rendering
  new AssetsPlugin({
    fullPath: true,
    filename: path.join(devConfig.output.path, '..', 'assets.json'),
  }),
  // replace chunkhash as content hash with MD5
  // https://github.com/erm0l0v/webpack-md5-hash
  new WebpackMd5Hash(),
);
///////////////////




// change the output path
const prodConfigModule = rewire('react-scripts/scripts/build.js');
const prodConfig = prodConfigModule.__get__('config');
const paths = prodConfigModule.__get__('paths');
prodConfig.output.path = path.join(`${prodConfig.output.path}`, 'app');
// get the css loader rule
const cssRule = prodConfig.module.rules.find(
  rule => (rule.test instanceof RegExp && rule.source.substring('css$') !== -1)
);
cssRule.include = /node_modules/;
// get the image loader rule
const imageRule = prodConfig.module.rules.find(
  rule => (rule.test instanceof Array && rule.test.find(type => (type instanceof RegExp && type.source.substring('png$') !== -1)) !== -1)
);
imageRule.loaders = [
  require.resolve('file-loader'),
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
// get the file loader rule
const fileRule = prodConfig.module.rules.find(
  rule => rule.exclude instanceof Array
);
fileRule.exclude.push(/\.(graphql|gql)$/);
// get the eslint loader rule
const eslintRule = prodConfig.module.rules.find(
  rule => (
    rule.test instanceof RegExp &&
    rule.test.source === '/\.(js|jsx)$' &&
    rule.enforce === 'pre'
  )
);
// TODO replace the eslint config

// get the js loader rule
const jsRule = prodConfig.module.rules.find(
  rule => (
    rule.test instanceof RegExp &&
    rule.test.source === '/\.(js|jsx)$' &&
    !rule.enforce
  )
);
// TODO replace the babel config

// add graphql loader
prodConfig.module.rules.push(
  {
    test: /\.(graphql|gql)$/,
    loader: require.resolve('graphql-tag/loader'),
  },
);

prodConfig.plugins.push(
  // Detect any circular dependency from the source codes
  // https://github.com/aackerman/circular-dependency-plugin
  new CircularDependencyPlugin({
    // exclude any node_modules folder
    exclude: /node_modules/,
  }),
  // Asset plugin for server-side-rendering
  new AssetsPlugin({
    fullPath: true,
    filename: path.join(devConfig.output.path, '..', 'assets.json'),
  }),
  // replace chunkhash as content hash with MD5
  // https://github.com/erm0l0v/webpack-md5-hash
  new WebpackMd5Hash(),
);

const swPrecachePlugin = prodConfig.plugins.find(plugin => plugin instanceof SWPrecacheWebpackPlugin);
swPrecachePlugin.options.importScripts = [
  path.join(paths.appSrc, 'service-worker.js'),
];


