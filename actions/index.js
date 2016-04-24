import 'whatwg-fetch'
import * as api from '../middleware/botengine'

export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const FAILED_LOGIN = 'FAILED_LOGIN'
export const LOGOUT = "LOGOUT"



export function submitStoreAnswers(reviewId, storeId, answers) {
  return (dispatch, getState) => {
    return api.saveStoreReview(reviewId, storeId, answers)
              .then(
                result => dispatch(savedStoreAnswers(result))
              )
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
  console.log("in saved store answers: ", result)
  return {
    type: "SAVED_STORE_ANSWERS",
    result
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

export function logout() {
  console.log('signing off folks')
  try {
    return {
      type: LOGOUT,
      token: "",
      profile: {},
      email: "",
      isLoggedIn: false,
      receivedAt: Date.now()
    }
  } catch(x) {
    console.log("in logout: ", x)
  }
}

export function failedLogin() {
  return {
    type: FAILED_LOGIN
  }
}



export function fetchPetsIfNeeded(endpoint="") {

  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    console.log("Dispatching In fetchPetsIfNeeded ")
    if (shouldFetchPets(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPets(""))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}


export function addedItem(type, item) {
  return {
    type: type,
    item: item
  }
}

export function loadedAreas(areas) {
  return {
    type:"LOADED_AREAS",
    areas: areas
  }
}

export function setReviewId(id) {
  console.log("setting review id to " , id)
  return {
    type:"SET_REVIEW_ID",
    id: id
  }
}
export function loadedStores(stores){
  return {
    type: "LOADED_STORES",
    stores: stores
  }
}



export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export function triggerLogin(email) {
  return {
    type: SUCCESS_LOGIN ,
    email: email,
    isLoggedIn: true
  }
}
