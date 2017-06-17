# eslint-config-react-app

This package includes the shareable ESLint configuration used by [Create React RSA App](https://github.com/raymondsze/create-react-rsa-app).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/raymondsze/create-react-rsa-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/raymondsze/create-react-rsa-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React RSA App.

## Usage in Create React RSA App Projects

The easiest way to use this configuration is with [Create React RSA App](https://github.com/raymondsze/create-react-rsa-app), which includes it by default.

**You don’t need to install it separately in Create React RSA App projects.**

## Usage Outside of Create React RSA App

If you want to use this ESLint configuration in a project not built with Create React RSA App, you can install it with following steps.

First, install this package, ESLint and the necessary plugins.

  ```sh
  npm install --save-dev eslint-config-react-app babel-eslint@7.2.3 eslint@3.19.0 eslint-plugin-flowtype@2.33.0 eslint-plugin-import@2.2.0 eslint-plugin-jsx-a11y@5.0.3 eslint-plugin-react@7.0.1 eslint-config-airbnb@15.0.1
  ```

Then create a file named `.eslintrc` with following contents in the root folder of your project:

  ```js
  {
    "extends": "react-rsa-app"
  }
  ```

  That's it! You can override the settings from `eslint-config-react-rsa-app` by editing the `.eslintrc` file. Learn more about [configuring ESLint](http://eslint.org/docs/user-guide/configuring) on the ESLint website.

This preset is built based on [eslint-config-airbnb](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb).

Based on [eslint-config-airbnb](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb), this preset enabled following extra supports:

* [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)
* [eslint-plugin-redux-saga](https://github.com/pke/eslint-plugin-redux-saga)
