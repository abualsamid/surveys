import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './surveys/containers/root'


import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './surveys/reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk,  routerMiddleware(browserHistory))
)


const history = syncHistoryWithStore(browserHistory, store)


render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
