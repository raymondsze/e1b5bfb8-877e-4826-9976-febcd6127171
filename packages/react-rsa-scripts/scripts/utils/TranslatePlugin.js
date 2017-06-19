'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
class TranslatePlugin {
  constructor({ messagesDir, translationsDir }) {
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

  apply(compiler) {
    let before = this.getMessagesHash();
    compiler.plugin('done', () => {
      const after = this.getMessagesHash();
      console.log(after);
      if (after !== before) {
        require('../translate')();
      }
      before = after;
    });
  }
}

module.exports = TranslatePlugin;
