import { createStore, applyMiddleware } from 'redux'

import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk,  routerMiddleware(browserHistory))
  )
  return store
}
