import * as api from '../../../common/middleware/botengine'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const FAILED_LOGIN = 'FAILED_LOGIN'
export const LOGOUT = "LOGOUT"

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export function successfulLogin(token, profile) {

  console.log('in successfulLogin , token is: ', token, ' profile is ', profile)
  try {
    return {
      type: SUCCESS_LOGIN,
      token: token,
      profile: profile,
      receivedAt: Date.now()
    }
  } catch(x) {
    console.log("in successfulLogin: ", x )
  }
}

export function setupSurveyVariables(params) {
  return {
    type: "RECEIVED_PARAMS",
    params: params
  }
}

export function selectStore(storeId, storeCaption) {
    return {
      type: "SELECT_STORE",
      storeId: storeId ,
      storeCaption: storeCaption
    }
}

export function loadedAreas(areas) {
  return {
    type:"LOADED_AREAS",
    areas: areas
  }
}
export function loadedStores(stores){
  return {
    type: "LOADED_STORES",
    stores: stores
  }
}

export function loadedManagers(managers){
  return {
    type: "LOADED_MANAGERS",
    managers: managers
  }
}


export function addedItem(type, item) {
  return {
    type: type,
    item: item
  }
}

export function setReviewId(id) {
  return {
    type:"SET_REVIEW_ID",
    id: id
  }
}


export function submitStoreAnswers(storeId,managerId, answers) {

  return (dispatch, getState) => {
    try {
      const {customerId, campaignId, surveyId } = getState().admin
      return api.saveStoreReview(customerId, campaignId, surveyId, storeId,managerId, answers)
                .then(
                  result => dispatch(savedStoreAnswers(result))
                )

    } catch(x) {
      console.log(x)
    }
  }
}

export function submitManagerAnswers(reviewId, storeId,answers) {
  return (dispatch, getState) => {
    return api.saveManagerReview(reviewId, storeId,answers)
              .then(
                result => console.log("yahoo ... ", result )
              )
  }
}

export function savedStoreAnswers(result) {
  return {
    type: "SAVED_STORE_ANSWERS",
    result
  }
}
