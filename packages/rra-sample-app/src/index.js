import React from 'react';
import ReactDOM from 'react-dom';
import RSAProvider from './rsa/containers/RSAProvider';
import App from './containers/App';

ReactDOM.render(
  <RSAProvider>
    <App />
  </RSAProvider>,
  document.getElementById('root'),
);
