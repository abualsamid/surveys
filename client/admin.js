import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './admin/containers/root'


import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './admin/reducers'
import throttle from 'lodash/throttle'

import * as api from '../common/middleware/botengine'

const styles = require( './assets/css/home.css' );

const loadStoreState = () => {
  try {
    const serializedState = localStorage.getItem('redux_admin_state')
    if (serializedState == null ) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch(x) {
    console.log('error loading state from storage: ', x)
    return undefined
  }
}

const store = createStore(
  rootReducer,
  loadStoreState(),
  applyMiddleware(thunk.withExtraArgument(api),  routerMiddleware(browserHistory))
)

store.subscribe(throttle(
  () => {
    saveStoreState(store.getState())
  }, 1000
))


const saveStoreState = (state) => {
  try {
    const serializedState= JSON.stringify(state)
    localStorage.setItem('redux_admin_state',serializedState)
  } catch(x) {
    console.log('error saving state to storage... ', x)

  }
}


const history = syncHistoryWithStore(browserHistory, store)


render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
