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
const paths = require('./utils/paths');
const getDllHash = require('./utils/getDllHash');
require('./utils/webpack.config.dev');

const hasVendorJs = fs.existsSync(paths.appVendorJs);
const dllHash = getDllHash(paths);
const vendorJsPath = path.relative(process.cwd(), paths.appVendorJs);
console.log(`Checking if dll reference plugin should be enabled...`);
if (hasVendorJs) {
  console.log(`${chalk.cyan(vendorJsPath)} exists.`);
  console.log(`Enable dll reference plugin for faster rebuild.`);
  const manifestJson = path.join(paths.appDllBuild, `${dllHash}.json`);
  if (!fs.existsSync(manifestJson)) {
    const manifestPath = path.relative(process.cwd(), manifestJson);
    console.log();
    console.log(chalk.red.bold(`ERROR: ${manifestPath} does not exists.`));
    console.log();
    const useYarn = fs.existsSync(paths.yarnLockFile);
    const appPackage = require(paths.appPackageJson);
    if (typeof appPackage.scripts['build:dll'] === 'undefined') {
      console.log();
      console.log(
        `Add the following script in your ${chalk.cyan('package.json')}.`
      );
      console.log();
      console.log(`    ${chalk.dim('// ...')}`);
      console.log(`    ${chalk.yellow('"scripts"')}: {`);
      console.log(`      ${chalk.dim('// ...')}`);
      console.log(
        `      ${chalk.yellow('"build:dll"')}: ${chalk.yellow('"rra-script build:dll"')}`
      );
      console.log('    }');
      console.log();
    }
    console.log(`To build the dll manifest json file for faster rebuild, run:`);
    console.log();
    console.log(`  ${chalk.cyan(useYarn ? 'yarn' : 'npm')} run build:dll`);
    console.log();
    process.exit(1);
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
require('react-scripts/scripts/start');
