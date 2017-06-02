'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true });

require('./utils/webpack.config.prod');
require('react-scripts/scripts/build');
