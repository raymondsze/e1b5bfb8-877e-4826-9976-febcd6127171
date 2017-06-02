'use strict';

const clone = require('clone');
const config = clone(require('babel-preset-react-app'));

// make sure the babel-preset-env targeting the node
config.presets[0][1] = {
  targets: {
    node: 'current',
  },
};

config.plugins = config.plugins.concat(
  [
    // Enable decorator syntax which could be heavy used by redux or mobx
    // https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy
    require.resolve('babel-plugin-transform-decorators-legacy'),  
    // Compiles import() to a deferred require()
    require.resolve('babel-plugin-dynamic-import-node'),
    // This plugin adds support for server-side rendering, for minification of styles
    // and gives you a nicer debugging experience when using styled-components.
    [
      require.resolve('babel-plugin-styled-components'), {
        minify: false,
        ssr: true,
      },
    ],
  ]
);

module.exports = config;
