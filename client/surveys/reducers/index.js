import * as ActionTypes from '../actions'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'


function login(state = { isLoggedIn: false, language: "en", email: "", token: ""}, action) {

  try {
    switch(action.type) {
      case ActionTypes.SUCCESS_LOGIN:
        return { ...state,isLoggedIn: true, email: action.profile.email, token: action.token}
      case ActionTypes.LOGOUT:
        return Object.assign({}, state, {isLoggedIn: false, email: "", token: "", profile:{}})
      case "CHOOSE_LANGUAGE":
        return { ...state, language: action.language }
      default:
        return state;
    }
  } catch(x) {
    console.error("error in reducer: ", x )
  }


}


function survey(state={storeId:0, storeCaption:""}, action) {
  switch(action.type) {
    case "SELECT_STORE":
      return { ...state, storeId: action.storeId, storeCaption: action.storeCaption}
    default:
      return state
  }
}
function admin(state = {areas: [], stores: [], managers:[], campaignId:0, customerId:0,locationId:0,code:"",surveyId:0,sessionId:"", isSingleUse: true},
      action) {
  try {
    switch(action.type) {
      case "ADD_AREA":
        return Object.assign({}, state, { areas: state.areas.concat([action.item]) } )
      case "ADD_STORE":
        return Object.assign({}, state, { stores: state.stores.concat([action.item]) } )
      case "ADD_MANAGER":
        return { ...state, managers: state.managers.concat([action.item]) }
      case "LOADED_AREAS":
        return Object.assign({}, state, {areas: action.areas ||[]})
      case "LOADED_STORES":
        return Object.assign({}, state, {stores: action.stores || []})
      case "SET_CAMPAIGN_ID":
        return Object.assign({}, state, {campaignId: action.id})

      case "LOADED_MANAGERS":
        console.log('reducing managers ', action.managers)
        return Object.assign({}, state, {managers: action.managers ||[]})
      case "RECEIVED_PARAMS":
        try {
          return Object.assign({}, state, {
            customerId: action.params.CustomerId,
            campaignId: action.params.CampaignId,
            locationId: action.params.LocationId,
            code: action.params.Code,
            surveyId: action.params.SurveyId,
            isSingleUse: action.params.IsSingleUse,
            sessionId: action.params.SessionId
          } )
        } catch(x) {
          console.log('error in reducer ', x)
        }


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
