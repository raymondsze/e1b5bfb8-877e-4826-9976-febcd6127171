'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function checkLangauges(paths) {
  const useYarn = fs.existsSync(paths.yarnLockFile);
  const languages = require(paths.appPackageJson).languages;
  let missingJson = false;
  console.log('Checking langauges files');
  languages.map(lang => {
    const jsonPath = path.join(paths.appTranslationsDir, `${lang}.json`);
    if (!fs.existsSync(jsonPath)) {
      missingJson = true;
      const relativePath = path.relative(process.cwd(), jsonPath);
      console.log(chalk.red(`  ${chalk.bold(relativePath)} does not exists.`));
    }
  });
  if (missingJson) {
    console.log();
    console.log(`To build the langauges json files, run:`);
    console.log();
    console.log(`  ${chalk.cyan(useYarn ? 'yarn' : 'npm')} run translate`);
    console.log();
    process.exit(1);
  }
}
