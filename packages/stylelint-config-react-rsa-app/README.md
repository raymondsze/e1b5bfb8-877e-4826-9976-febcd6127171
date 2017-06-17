# stylelint-config-react-app

This package includes the shareable StyleLint configuration used by [Create React RSA App](https://github.com/raymondsze/create-react-rsa-app).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/raymondsze/create-react-rsa-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/raymondsze/create-react-rsa-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React RSA App.

## Usage in Create React RSA App Projects

The easiest way to use this configuration is with [Create React RSA App](https://github.com/raymondsze/create-react-rsa-app), which includes it by default.

**You don’t need to install it separately in Create React RSA App projects.**

## Usage Outside of Create React RSA App

If you want to use this StyleLint configuration in a project not built with Create React RSA App, you can install it with following steps.

First, install this package, StyleLint and the necessary plugins.

  ```sh
  npm install --save-dev stylelint-config-react-rsa-app stylelint@7.11.0 stylelint-config-standard@16.0.0 stylelint-processor-styled-components@0.1.2
  ```

Then create a file named `.stylelintrc` with following contents in the root folder of your project:

  ```js
  {
    "extends": "stylelint-config-react-rsa-app"
  }
  ```

  That's it! You can override the settings from `stylelint-config-react-rsa-app` by editing the `.styleintrc` file. Learn more about [configuring Stylelint](https://stylelint.io/user-guide/configuration/) on the ESLint website.
