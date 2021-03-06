import { createStore, applyMiddleware } from 'redux'

import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, routerMiddleware(browserHistory))
  )
}
