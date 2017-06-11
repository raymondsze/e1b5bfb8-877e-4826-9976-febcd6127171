'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = (paths, entry, output, target) => {
  const languages = require(paths.appPackageJson).languages;
  const isValid = languages instanceof Array && languages.length > 0;
  let importLanguages = '';
  if (isValid) {
    importLanguages = languages.map(lang => `    import(${JSON.stringify(path.join(paths.appTranslationsDir, `${lang}.json`))})`).join(',\n');
  }

  let importLocaleData = '';
  let importReactLocalData = '';
  let locales = [];
  function unique(value, index, self) { 
    return self.indexOf(value) === index;
  }
  if (isValid) {
    locales = languages.map(lang => lang.split('-')[0]).filter(unique);
    importReactLocalData = locales.map(locale => `  addLocaleData(require('react-intl/locale-data/${locale}'));`).join('\n');
    importLocaleData = locales.map(locale => `    import('intl/locale-data/jsonp/${locale}')`).join(',\n');
  }
  const importEntry = entry.map(js => `    import(${JSON.stringify(js)})`).join(',\n');
  fs.outputFileSync(output,
`/* eslint-disable */
//////////////////////////////////////////////////////////
// This file is generated as bootstrap js file before the entry point
// Since dynamic import require static string, but langauges are dynamic set in package.json.
// To achieve that, we need to generate a js file to handle the intl and i18n messages stuff.
//////////////////////////////////////////////////////////

// add the polyfill, like normalize.css, fetch, etc.
import ${JSON.stringify(require.resolve('./polyfill'))};
// add locale data for react component, i.e IntlProvider
import { addLocaleData } from 'react-intl';
// this library is to detect whether the target locales are supported
import areIntlLocalesSupported from 'intl-locales-supported';

const localesMyAppSupports = [${locales.map(locale => `'${locale}'`).join(', ')}];

// perform locale data polyfill
async function polyfill() {
  await Promise.all([
${importLocaleData}
  ]);
}

// code spliting for multiple langauges json files
// also add the coressponding locale data to react-intl
// finally require all the entry files specified in webpack config
async function bootstrap() {
  const messages = await Promise.all([
${importLanguages}
  ]);
  global.__messages__ = {};
${languages.map((lang, i) => `  global.__messages__['${lang}'] = messages[${i}];`).join('\n')}
${importReactLocalData}
  await Promise.all([
${importEntry}
  ]);
}

// intl detection and polyfill
(async () => {
  if (global.Intl) {
    // Determine if the built-in \`Intl\` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
      // \`Intl\` exists, but it doesn't have the data we need, so load the
      // polyfill and replace the constructors we need with the polyfill's.
      const IntlPolyfill = require('intl');
      
      Intl.NumberFormat   = IntlPolyfill.NumberFormat;
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
      await polyfill();
    }
  } else {
    // No \`Intl\`, so use and load the polyfill.
    global.Intl = require('intl');
    await polyfill();
  }
  await bootstrap();
})();
/* eslint-enable */
`);
}
