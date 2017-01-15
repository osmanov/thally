import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { updateLocation } from './location'
import makeRootReducer from './reducers'


const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()

export default (initialState = {}) => {
  const middleware = [sagaMiddleware]

  if (__DEV__) {
    middleware.push(logger)
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    applyMiddleware(...middleware)
  )

  store.asyncReducers = {}
  store.asyncSagas = {}

  store.runSaga = (saga) => {
    sagaMiddleware.run(saga)
  }

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
