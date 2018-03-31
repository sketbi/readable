import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { ConnectedRouter,push } from 'react-router-redux'
import { bindActionCreators } from 'redux';


import store, { history } from './store'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import './css/App.css';


ReactDOM.render(
    <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>
    , document.getElementById('root'));
registerServiceWorker();
