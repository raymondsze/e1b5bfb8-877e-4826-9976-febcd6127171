import React from 'react';
import ReactDOM from 'react-dom';
import { RSAProvider } from 'react-rsa';
import App from './containers/App';

import routes from './routes';
import './globalStyles';

ReactDOM.render(
  <RSAProvider>
    <App>
      {routes}
    </App>
  </RSAProvider>,
  document.getElementById('root'),
);
