// coming soon.

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

export function loadedQuestions(questions) {
  console.log('in action createor ', questions )
  return {
    type: "LOADED_QUESTIONS",
    questions: questions
  }
}
export function logout() {
  try {
    window.sessionStorage && window.sessionStorage.clear()
  } catch(x) {
    console.error("crap... ", x)
  }
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
