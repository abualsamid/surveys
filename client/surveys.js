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
import * as api from '../common/middleware/botengine'
import throttle from 'lodash/throttle'
const styles = require( './assets/css/home.css' );

const loadStoreState = () => {
  try {
    const serializedState = localStorage.getItem('survey_state')
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
  // loadStoreState(),
  applyMiddleware(thunk.withExtraArgument(api),  routerMiddleware(browserHistory))
)

store.subscribe(throttle(
  () => {
    saveStoreState(store.getState())
  }, 1000
))

window.onbeforeunload = function(e) {
  // var dialogText = 'Please do not use browser navigation buttons till you have completed the survey.';
  // e.returnValue = dialogText;
  // return dialogText;
};


const saveStoreState = (state) => {
  try {
    const serializedState= JSON.stringify(state)
    localStorage.setItem('survey_state',serializedState)
  } catch(x) {
    console.log('error saving state to storage... ', x)

  }
}


const history = syncHistoryWithStore(browserHistory, store)


render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
