'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true });

const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const paths = require('./utils/paths');
const config = require('./utils/webpack.config.server.prod');
const compiler = webpack(config);

console.log('Creating a server build...');
compiler.run((err, stats) => {
  if (err) {
    console.log(chalk.red('Failed to compile.\n'));
    console.log((err.message || err) + '\n');
    process.exit(1);
  }
  
  const messages = formatWebpackMessages(stats.toJson({}, true));
  if (messages.errors.length) {
    console.log(chalk.red('Failed to compile.\n'));
    console.log(messages.errors.join('\n\n'));
    process.exit(1);
  }

  if (process.env.CI && messages.warnings.length) {
    console.log(
      chalk.yellow(
        '\nTreating warnings as errors because process.env.CI = true.\n' +
          'Most CI servers set it automatically.\n'
      )
    );
    console.log(messages.warnings.join('\n\n'));
    process.exit(1);
  }

  const serverJsPath = path.relative(process.cwd(), path.join(paths.appServerBuild, 'index.js'));
  console.log();
  console.log(`Server side bundling is useful for "${chalk.bold('server side rendering')}".`);
  console.log(`You can import the server side bundled js.`);
  console.log(`The location of output js file: ${chalk.cyan(serverJsPath)}`);
  console.log();
});