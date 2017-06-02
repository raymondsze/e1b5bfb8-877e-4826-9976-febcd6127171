'use strict';

const fs = require('fs');
const path = require('path');
const clone = require('clone');
const config = clone(require('babel-preset-react-app'));
const appDirectory = fs.realpathSync(process.cwd());
const env = process.env.BABEL_ENV || process.env.NODE_ENV;

config.plugins.push(
  // Enable decorator syntax which could be heavy used by redux or mobx
  // https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy
  require.resolve('babel-plugin-transform-decorators-legacy'),  
  // Extracts string messages for translation from modules that use React Intl.
  // https://github.com/yahoo/babel-plugin-react-intl
  [
    require.resolve('babel-plugin-react-intl', {
      // the output messages directory
      "messagesDir": path.join(appDirectory, 'build/messages/'),
    }),
  ],
  // This plugin adds support for server-side rendering, for minification of styles
  // and gives you a nicer debugging experience when using styled-components.
  [
    require.resolve('babel-plugin-styled-components'), {
      minify: false,
      ssr: true,
    },
  ]
);

if (env === 'developement') {
  config.plugins.push(
    // Webpack 2.0 have performance issue of build time using dynamic-import
    // Compiles import() to a deferred require()
    require.resolve('babel-plugin-dynamic-import-node')
  );
}

module.exports = config;
