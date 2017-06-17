import React from 'react';
import ReactDOM from 'react-dom';

// add locale data for react component, i.e IntlProvider
import { addLocaleData } from 'react-intl';
// this library is to detect whether the target locales are supported
import areIntlLocalesSupported from 'intl-locales-supported';

import { RSAProvider } from './rsa';
import App from './containers/App';
import routes from './routes';
import './globalStyles';

const localesMyAppSupports = ['en', 'zh'];

// perform locale data polyfill
async function polyfill() {
  await Promise.all([
    import('intl/locale-data/jsonp/en'),
    import('intl/locale-data/jsonp/zh'),
  ]);
}

// code spliting for multiple langauges json files
// also add the coressponding locale data to react-intl
// finally require all the entry files specified in webpack config
async function bootstrap() {
  const messages = await Promise.all([
    import('./messages/en.json'),
    import('./messages/zh-Hans.json'),
    import('./messages/zh-Hant.json'),
  ]);
  /* eslint-disable */
  global.__messages__ = {
    en: messages[0],
    zh: messages[1],
  };

  addLocaleData(require('react-intl/locale-data/en'));
  addLocaleData(require('react-intl/locale-data/zh'));
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
  ReactDOM.render(
    <RSAProvider>
      <App>
        {routes}
      </App>
    </RSAProvider>,
    document.getElementById('root'),
  );
})();
