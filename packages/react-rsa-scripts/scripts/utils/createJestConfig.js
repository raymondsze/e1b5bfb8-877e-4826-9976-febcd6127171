'use strict';

const location = 'react-scripts/scripts/utils/createJestConfig';
const createReactAppJestConfig = require(location);

// do the config modification
const createJestConfig = (...args) => {
  const config = createReactAppJestConfig(...args);
  config.transform = Object.assign({},
    config.transform,
    // add graphql transform
    {
      '\\.(gql|graphql)$': require.resolve('jest-transform-graphql'),
    }
  );
  return config;
};

require.cache[require.resolve(location)].exports = createJestConfig;

module.exports = createJestConfig;
