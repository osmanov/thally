import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    CounterRoute(store)
  ]
})

export default createRoutes
