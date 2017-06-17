# babel-preset-react-app

This package includes the Babel preset used by [Create React RSA App](https://github.com/raymondsze/create-react-rsa-app).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/raymondsze/create-react-rsa-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/raymondsze/create-react-rsa-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React RSA App.

## Usage in Create React RSA App Projects

The easiest way to use this configuration is with [Create React RSA App](https://github.com/raymondsze/create-rsa-app), which includes it by default. **You don’t need to install it separately in Create React RSA App projects.**

## Usage Outside of Create React RSA App

If you want to use this Babel preset in a project not built with Create React RSA App, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

  ```js
  {
    "presets": ["react-rsa-app"]
  }
  ```

This preset is extended from [babel-preset-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/babel-preset-react-app).


Based on [babel-preset-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/babel-preset-react-app), this preset enabled following extra supports:

* [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)
* [babel-plugin-styled-components](https://github.com/styled-components/babel-plugin-styled-components)

This preset supports server-side as well which would be used in webpack server-side bundling.<br>
The target attribute become **node** instead of **browser**.

### Browser
```js
{
  "presets": ["react-rsa-app"]
}
```

### Server
```js
{
  "presets": ["react-rsa-app/server"]
}
```