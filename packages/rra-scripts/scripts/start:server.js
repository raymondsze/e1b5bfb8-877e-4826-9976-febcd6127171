'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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
const config = require('./utils/webpack.config.server.dev');
const compiler = webpack(config);

const isInteractive = process.stdout.isTTY;

compiler.plugin('invalid', () => {
  if (isInteractive) {
    clearConsole();
  }
  console.log('Compiling...');
});
compiler.watch({}, (err, stats) => {
  if (isInteractive) {
    clearConsole();
  }
  if (err) {
    console.log(chalk.red('Failed to compile.\n'));
    console.log((err.message || err) + '\n');
    return;
  }
  const messages = formatWebpackMessages(stats.toJson({}, true));
  const isSuccessful = !messages.errors.length && !messages.warnings.length;
  if (isSuccessful) {
    console.log(chalk.green('Compiled successfully!'));
  }
  // If errors exist, only show errors.
  if (messages.errors.length) {
    console.log(chalk.red('Failed to compile.\n'));
    console.log(messages.errors.join('\n\n'));
    return;
  }

  // Show warnings if no errors were found.
  if (messages.warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(messages.warnings.join('\n\n'));

    // Teach some ESLint tricks.
    console.log(
      '\nSearch for the ' +
        chalk.underline(chalk.yellow('keywords')) +
        ' to learn more about each warning.'
    );
    console.log(
      'To ignore, add ' +
        chalk.cyan('// eslint-disable-next-line') +
        ' to the line before.\n'
    );
  }
  const serverJsPath = path.relative(process.cwd(), path.join(paths.appServerBuild, 'index.js'));
  console.log();
  console.log(`Server side bundling is useful for "${chalk.bold('server side rendering')}".`);
  console.log(`You can import the server side bundled js.`);
  console.log(`The location of output js file: ${chalk.cyan(serverJsPath)}`);
  console.log();
  console.log('Development mode is opened.')
  console.log('Any changes would trigger server side bundling rebuild.');
  console.log();
});
