'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const chalk = require('chalk');
const manageTranslations = require('react-intl-translations-manager').default;

const paths = require('./utils/paths');

const languages = require(paths.appPackageJson).languages;
const isValid = languages instanceof Array && languages.length > 0;
if (!isValid) {
    console.log();
    console.log(`${chalk.red.bold('No languages found in your package.json')}`);
    console.log();
    console.log(
    `Add the required languages in your ${chalk.cyan('package.json')}.`
    );
    console.log(`For example, ${chalk.cyan('en')}, ${chalk.cyan('zh-Hant')}, ${chalk.cyan('zh-Hans')}`)
    console.log();
    console.log(`    ${chalk.dim('// ...')}`);
    console.log(`    ${chalk.yellow('"languages"')}: [`);
    console.log(`      ${chalk.cyan('"en"')},`);
    console.log(`      ${chalk.cyan('"zh-Hant"')},`);
    console.log(`      ${chalk.cyan('"zh-Hans"')}`);
    console.log('    ]');
    console.log(`    ${chalk.dim('// ...')}`);
    console.log();
    process.exit();
}
console.log(`Languages found: ${languages.map(lang => `${chalk.cyan(lang)}`).join(', ')}`);
console.log();

manageTranslations({
  messagesDirectory: paths.appMessagesDir,
  translationsDirectory: paths.appTranslationsDir,
  languages: languages,
});

console.log(`All the json files are generated in ${chalk.cyan(path.relative(process.cwd(), paths.appTranslationsDir))}`);
console.log('You can start to modify the messages');
