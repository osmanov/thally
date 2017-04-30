import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import createStore from './store/createStore'

const store = createStore()

const render = () => {
  const routes = require('./routes/index').default(store) // eslint-disable-line global-require
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router
            history={browserHistory}
            // eslint-disable-next-line react/no-children-prop
            children={routes}
          />
        </div>
      </Provider>
    </AppContainer>,
    document.getElementById('container')
  )
}

render()

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Setup hot module replacement
    // eslint-disable-next-line global-require
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(document.getElementById('container'))
        render()
      })
    )
  }
}

