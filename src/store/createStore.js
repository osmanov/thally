import {applyMiddleware, compose, createStore} from 'redux'
import {browserHistory} from 'react-router'
import makeRootReducer from './reducers'
import createLogger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) => {

  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  if (__DEV__) {
    const logger = createLogger()
    middlewares.push(logger)
  }

  const enhancers = [];

  const composeEnhancers = compose

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}


  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
