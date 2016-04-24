import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'



function login(state = { isLoggedIn: false, language: "en", email: "", token: ""}, action) {

  switch(action.type) {
    case ActionTypes.SUCCESS_LOGIN:
      let g =  Object.assign({}, state, { isLoggedIn: true, email: action.profile.email, token: action.token })
      return g
    case ActionTypes.LOGOUT:
      return Object.assign({}, state, {isLoggedIn: false, email: "", token: "", profile:{}})
    case "CHOOSE_LANGUAGE":
      return Object.assign({}, state, { language: action.language})
    default:
      return state;
  }
}
function admin(state = {areas: [], stores: [], reviewId:""}, action) {
  try {
    switch(action.type) {
      case "ADD_AREA":
        return Object.assign({}, state, { areas: state.areas.concat([action.item]) } )
      case "ADD_STORE":
      return Object.assign({}, state, { stores: state.stores.concat([action.item]) } )

      case "LOADED_AREAS":
        return Object.assign({}, state, {areas: action.areas ||[]})
      case "LOADED_STORES":
        return Object.assign({}, state, {stores: action.stores || []})
      case "SET_REVIEW_ID":
        return Object.assign({}, state, {reviewId: action.id})
      default:
        return state;
    }
  } catch(x) {
    console.log("crapped out in admin reduce: ", x)
    return state;
  }
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}


const rootReducer = combineReducers({
  errorMessage,
  routing,
  login,
  admin
})

export default rootReducer
