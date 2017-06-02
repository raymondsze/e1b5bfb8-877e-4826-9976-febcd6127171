import 'semantic-ui-css/semantic.min.css';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { withLanguage } from '../../rsa/decorators';

@withLanguage
class App extends PureComponent {
  render() {
    const { changeLocale } = this.props;
    return (
      <main>
        <button onClick={() => changeLocale('zh-Hans')}>
          Test
        </button>
      </main>
    )
  }
}

export default App;
