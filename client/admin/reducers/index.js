import * as ActionTypes from '../actions'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'


function login(state = { isLoggedIn: false, language: "en", email: "", token: ""}, action) {

  switch(action.type) {
    case ActionTypes.SUCCESS_LOGIN:
      return { ...state, isLoggedIn: true, email: action.profile.email, token: action.token}
    case ActionTypes.LOGOUT:
      return Object.assign({}, state, {isLoggedIn: false, email: "", token: "", profile:{}})
    case "CHOOSE_LANGUAGE":
      return Object.assign({}, state, { language: action.language})
    default:
      return state;
  }
}


function survey(state={storeId:"", storeCaption:"", questions: []}, action) {
  switch(action.type) {
    case "SELECT_STORE":
      return Object.assign({},state, {storeId: action.storeId, storeCaption: action.storeCaption})
    case "LOADED_QUESTIONS":
      return { ...state, questions: action.questions }
    default:
      return state
  }
}
function admin(state = {areas: [], stores: [], managers:[], reviewId:""}, action) {
  var compare=-1;
  try {
    switch(action.type) {
      case "ADD_AREA":
        return Object.assign({}, state, { areas: state.areas.concat([action.item]) } )
      case "DELETED_AREA":
        return Object.assign({}, state, { areas: state.areas.filter(e=>e.id!=action.item.id)  } )
      case "UPDATED_AREA":
        return Object.assign({}, state, { areas: state.areas.map(e=> e.id==action.item.id? {...e, name:action.item.name} :e)  } )
      case "DELETED_LOCATION":
        compare = parseInt(action.item.id)
        return Object.assign({}, state, { stores: state.stores.filter(e=>e.id!=compare)  } );

      case "DELETED_MANAGER":
        compare = parseInt(action.item.id)
        return Object.assign({}, state, { managers: state.managers.filter(e=>e.id!=compare)  } )

      case "UPDATED_LOCATION":
        compare = parseInt(action.item.id)
        return Object.assign({}, state, { stores: state.stores.map(e=> e.id==compare ? { ...e, name:action.item.name} :e )  } )
      case "ADD_STORE":
        return { ...state, stores: state.stores.concat([action.item]) }
      case "ADD_LOCATION":
        return { ...state, stores: state.stores.concat([action.item]) }
      case "ADD_MANAGER":
        return Object.assign({}, state, { managers: state.managers.concat([action.item])})
      case "LOADED_AREAS":

        return Object.assign({}, state, {areas: action.areas ||[]})
      case "LOADED_STORES":
        return Object.assign({}, state, {stores: action.stores || []})
      case "SET_REVIEW_ID":
        return Object.assign({}, state, {reviewId: action.id})
      case "LOADED_MANAGERS":
      return Object.assign({}, state, {managers: action.managers ||[]})

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
  admin,
  survey,
  login
})

export default rootReducer
