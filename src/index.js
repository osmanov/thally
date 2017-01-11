import React from 'react'
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createStore from './store/createStore';

//import App from './containers/App'

const store = createStore()

const routes = require('./routes/index').default(store)

render(
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Router history={browserHistory} children={routes} />
    </div>
  </Provider>,
  document.getElementById('container')
);