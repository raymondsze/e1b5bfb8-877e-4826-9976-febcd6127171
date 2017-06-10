'use strict';

require('react-scripts/config/env');

const path = require('path');
const clone = require('clone');
// modify the paths require cache
const location = 'react-scripts/config/paths';
const paths = clone(require(location));
// do the path modification
// entry point of univerisal rendering, the entry point should export a render functon
paths.appServerJs = path.join(paths.appSrc, 'server.js');
// vendor entry point
paths.appVendorJs = path.join(paths.appSrc, 'vendor.js');
// build folder of universal renderingcc
paths.appServerBuild = path.join(paths.appBuild, 'server');
// modify the build folder to build/app
paths.appBuild = path.join(paths.appBuild, 'app');
// dll build folder, put inside node_modules/.cache
paths.appDllBuild = path.join(paths.appNodeModules, '.cache', 'dll');
// i18n messages folder
paths.appMessagesDir = path.join(paths.appBuild, 'messages');
// i18n translation folder
paths.appTranslationsDir = path.join(paths.appSrc, 'translations');
require.cache[require.resolve(location)].exports = paths;

module.exports = paths;
