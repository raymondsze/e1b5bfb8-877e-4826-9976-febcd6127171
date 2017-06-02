'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true });

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const spawn = require('child_process').spawn;
const webpack = require('webpack');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const getDllHash = require('./utils/getDllHash');
const paths = require('./utils/paths');
const config = require('./utils/webpack.config.dll');

const useYarn = fs.existsSync(paths.yarnLockFile);

const hasVendorJs = fs.existsSync(paths.appVendorJs);
const vendorJsPath = path.relative(process.cwd(), paths.appVendorJs);

let nextProcesses;
console.log(`Checking if ${chalk.cyan(vendorJsPath)} exists...`);
if (hasVendorJs) {
  const dllHash = getDllHash(paths);
  const dllGlobalName = '[name]' + dllHash.replace(/\./g, '');
  // check if vendorHash is different
  const dllManifestJson = path.join(paths.appDllBuild, `${dllHash}.json`);
  console.log(`Checking if dll bundle (hash: ${chalk.yellow(dllHash)}) exists`);
  console.log();
  if (!fs.existsSync(dllManifestJson)) {
    rimraf.sync(paths.appDllBuild);
    console.log('Dll bundle needs to be compiled...');
    const compiler = webpack(config);
    console.log('Compiling dll bundle for faster rebuilds...');
    compiler.run((err, stats) => {
      const messages = formatWebpackMessages(stats.toJson({}, true));
      const isSuccessful = !messages.errors.length && !messages.warnings.length;
      if (isSuccessful) {
        console.log(chalk.green('Compiled successfully!'));
      } else {
        // remove all the built file, webpack dll plugin still produce files even errors
        rimraf.sync(paths.appDllBuild);
      }
      // If errors exist, only show errors.
      if (messages.errors.length) {
        console.log(chalk.red('Failed to compile.\n'));
        console.log(messages.errors.join('\n\n'));
        process.exit(1);
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
      console.log(chalk.green('Dll bundle compiled successfully!'));
      printInstruction(paths, useYarn, dllHash);
    });
  } else {
    console.log(chalk.green('Dll bundle is up to date and safe to use!'));
    printInstruction(paths, useYarn, dllHash);
  }
} else {
  console.log();
  console.log(chalk.red.bold(`ERROR: ${vendorJsPath} does not exists.`));
  console.log();
  console.log(`To have better development experience, it is recommended to create ${chalk.cyan(vendorJsPath)} for separate bundling.`);
  console.log('You can create with the following content:');
  console.log(chalk.bgWhite.black(vendorJsPath));
  console.log();
  console.log(chalk.yellow('  import \'react\';'));
  console.log(chalk.yellow('  import \'react-dom\';'));
  console.log();
  console.log(`All the modules imported in ${chalk.cyan(vendorJsPath)} would be splitted into seperated pre-built js.`);
  console.log('This could minimize the time required for the bundling process in development.');
  process.exit(1);
}

function printInstruction(paths, useYarn, dllHash) {
  if (useYarn) {
    console.log();
    const dllBuildPath = path.relative(process.cwd(), paths.appDllBuild);
    console.log(
      `The ${chalk.cyan(dllBuildPath)} (hash: ${chalk.yellow(dllHash)}) is built.`
    );
    const appPackage = require(paths.appPackageJson);
    if (typeof appPackage.scripts.start === 'undefined') {
      console.log();
      console.log(
        `Add the following script in your ${chalk.cyan('package.json')}.`
      );
      console.log();
      console.log(`    ${chalk.dim('// ...')}`);
      console.log(`    ${chalk.yellow('"scripts"')}: {`);
      console.log(`      ${chalk.dim('// ...')}`);
      console.log(
        `      ${chalk.yellow('"start"')}: ${chalk.yellow('"rra-script start"')}`
      );
      console.log('    }');
      console.log();
    }

    console.log('To start development, run:');
    console.log();
    console.log(`  ${chalk.cyan(useYarn ? 'yarn' : 'npm')} run start`);
    console.log();
  }
}

function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}
