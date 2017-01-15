import { fork } from 'redux-saga/effects'

export const makeRootSaga = (sagas) => function* rootSaga() {
  yield sagas.map((saga) => fork(saga))
}

export const injectSagas = (store, { key, sagas }) => {
  if (store.asyncSagas[key]) {
    return
  }
  // eslint-disable-next-line no-param-reassign
  store.asyncSagas[key] = sagas
  store.runSaga(makeRootSaga(sagas))
}

export default makeRootSaga
