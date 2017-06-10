'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

const languages = require(paths.appPackageJson).languages;
const isValid = languages instanceof Array && languages.length > 0;
let importLanguages = '';
if (isValid) {
  importLanguages = languages.map(lang => `    import('${paths.appTranslationsDir}/${lang}.json')`).join(',\n');
}

let importLocaleData = '';
if (isValid) {
  importLocaleData = languages.map(lang => `    import('intl/locale-data/jsonp/${lang}')`).join(',\n');
}

let importReactLocalData = '';
let locales = [];
function unique(value, index, self) { 
  return self.indexOf(value) === index;
}
if (isValid) {
  locales = languages.map(lang => lang.split('-')[0]).filter(unique);
  importReactLocalData = locales.map(locale => `  addLocaleData(require('react-intl/locale-data/${locale}'));`).join('\n');
}

module.exports = (entry, output, target) => {
  const importEntry = entry.map(js => `    import('${js}')`).join(',\n');
  fs.writeFileSync(output,
`/* eslint-disable */
import '${require.resolve('./polyfill')}';
import { addLocaleData } from 'react-intl';
${target === 'node' ? `import areIntlLocalesSupported from 'intl-locales-supported';` : ''}

const localesMyAppSupports = [${locales.map(locale => `'${locale}'`).join(', ')}];

async function polyfill() {
  await Promise.all([
${importLocaleData}
  ]);
${importReactLocalData}
}

async function bootstrap() {
  await Promise.all([
${importLanguages}
  ]);
  await Promise.all([
${importEntry}
  ]);
}

(async () => {
${target !== 'node' ? `
if (!window.Intl) {
  await polyfill();
}
` : `
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
`}

await bootstrap();

})();
/* eslint-enable */
`);
}
