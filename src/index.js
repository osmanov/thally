import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createStore from './store/createStore';

const store = createStore()
let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        <Router history={browserHistory} children={routes} />
      </div>
    </Provider>,
    document.getElementById('container')
  );
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(document.getElementById('container'))
        render()
      })
    )
  }
}
render()
