import 'semantic-ui-css/semantic.min.css';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';

import { withLanguage } from '../../rsa/decorators';

const messages = defineMessages({
  hello: {
    id: 'app.hello',
    defaultMessage: 'Hello World',
  },
});

@withLanguage
class App extends PureComponent {
  render() {
    const { changeLocale } = this.props;
    return (
      <main>
        <button onClick={() => changeLocale('zh-Hans')}>
          <FormattedMessage {...messages.hello} />
        </button>
      </main>
    )
  }
}

export default App;
