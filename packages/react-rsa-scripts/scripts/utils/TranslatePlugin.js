'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const manageTranslations = require('react-intl-translations-manager').default;

class TranslatePlugin {
  constructor({ languages, messagesDir, translationsDir }) {
    this.languages = languages;
    this.messagesDir = messagesDir;
    this.translationsDir = translationsDir;
  }

  getMessagesHash() {
    const files = glob.sync(path.join(this.messagesDir, '**/*.json'));
    const crypto = require('crypto');
    const pathDigest = crypto.createHash('md5');
    return files.map(file => fs.readFileSync(file, 'utf-8'))
      .reduce((d, m)=> d.update(m), pathDigest)
      .digest('base64')
      .replace(/\\g/, '_');
  }

  translate() {
    const languages = this.languages;
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

    // make use of react-intl-translation-manager to translate all the messages
    // https://github.com/GertjanReynaert/react-intl-translations-manager
    manageTranslations({
      messagesDirectory: this.messagesDir,
      translationsDirectory: this.translationsDir,
      languages: languages,
    });

    console.log(`All the json files are generated in ${chalk.cyan(path.relative(process.cwd(), this.translationsDir))}`);
    console.log('You can start to modify the messages');
  }
  apply(compiler) {
    let before = this.getMessagesHash();
    compiler.plugin('done', () => {
      const after = this.getMessagesHash();
      console.log(after);
      if (after !== before) {
        this.translate();
      }
      before = after;
    });
  }
}

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = TranslatePlugin;
