'use strict';

const crypto = require('crypto');
const fs = require('fs');

function getDllHash(paths) {
  if (fs.existsSync(paths.appVendorJs)) {
    const hash = crypto.createHash('md5');
    const input = fs.readFileSync(paths.appVendorJs);
    const appPackageJson = fs.readFileSync(paths.appPackageJson);

    hash.update(input);
    hash.update(appPackageJson);
    
    if (fs.existsSync(paths.yarnLockFile)) {
      hash.update(fs.readFileSync(paths.yarnLockFile));
    }
    return hash.digest('hex').substring(0, 8);
  }
  return false;
}

module.exports = getDllHash;
