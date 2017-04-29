import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import makeRootReducer from './reducers'
import { updateLocation } from './location'

const logger = createLogger()

export default (initialState = {}) => {
  const middleware = [thunk]

  if (__DEV__) {
    middleware.push(logger)
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    applyMiddleware(...middleware)
  )

  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
