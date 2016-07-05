import settings from '../settings/configureSettings'
import { browserHistory } from 'react-router'

const API_ROOT  = "/" // settings.API_ROOT
// const V1 = API_ROOT + "api/v1/"
const V1 =  "/api/v1/"

// const customerId = "571851a9f21eea564f30f3a3"
const customerId=1

const GET_CONFIG = {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (window.sessionStorage? sessionStorage.getItem("token") : "")
      }
    }


const POST_CONFIG = {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (window.sessionStorage? sessionStorage.getItem("token") : "")
      }
    }

const customer = {
  customerId: customerId,
  name: "leye"
}

function postConfig(data) {
  return {
    method: "POST",
    mode: "cors",
    redirect: "follow",
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (window.sessionStorage? sessionStorage.getItem("token") : "")
    },
    body: JSON.stringify(data)
  }
}


function deleteConfig(data) {
  return {
    method: "DELETE",
    mode: "cors",
    redirect: "follow",
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (window.sessionStorage? sessionStorage.getItem("token") : "")
    },
    body: JSON.stringify(data)
  }
}

function getConfig() {
  return {
    method: "GET",
    mode: "cors",
    redirect: "follow",
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (window.sessionStorage? sessionStorage.getItem("token") : "")
    }
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    console.error("Error making request: ", error )
    throw error

  }
}

function parseJSON(response) {
  return response.json()
}

// handes API errors, such as 404, 401, and 403s.
function handleError(t) {
  return function(doh) {
    console.log('processing ', t)
    if (!doh) return;
    console.log(doh);

    if (!doh.response) return;

    switch(doh.response.status) {
      case 404:
        alert("Well, this is embarrasing but I cannot find what you are looking for.");
        break;
      case 401: // unauthorized
      case 403: // forbidden.
        alert("Your session expired, or you are unauthorized to access this action.");
        break;
      default:
        alert("Unknown error. Please try again later. " + doh.response.status);
        break;
    }

  }
}


export function login(loginInfo) {
  return fetch(V1 + "auth/login", postConfig(loginInfo))
          .then(checkStatus)
          .then(parseJSON)
          .then(function(json){
            return json
          })
          .catch( doh => {console.log("failed to login: " + doh + " : " , loginInfo); return {token:"fake", profile:{}}})

}

export function GetSurveyQuestions(customerId, campaignId, surveyId) {

  return getIt("survey/questions/" + (customerId || 1) + "/" + (campaignId || 1) + "/" + (surveyId || 1) )
}

export function GetSurveyQuestionTranslation(customerId, campaignId, surveyId) {
  return getIt("admin/questions/" + customerId + "/" + campaignId + "/" + surveyId)
}
export function SaveSurveyQuestionTranslation(customerId, campaignId, surveyId, questions) {
  return postIt("admin/questions/" + customerId + "/" + campaignId + "/" + surveyId, questions)
}

export function addArea(customerId, name) {
  return postIt("admin/areas/" + customerId,{customerId: customerId, name: name})
}

export function updateArea(customerId, areaId, name) {
  return postIt("admin/area/" + customerId + "/" + areaId, {name: name})
}

export function deleteArea(customerId, areaId, name ) {
  return deleteIt("admin/area/" + customerId + "/" + areaId, {name: name}  )
}

function deleteIt(url, data) {
  var t=V1 + url;
  var p=deleteConfig(data)

  return fetch(t, p)
        .then(checkStatus)
        .then(parseJSON)
        .then(json=>json)
        .catch(handleError(url))

}
function postIt(url,data) {
  var t=V1 + url;
  var p=postConfig(data)

  return fetch(t, p)
        .then(checkStatus)
        .then(parseJSON)
        .then(json=>json)
        .catch(handleError(url))
}
function getIt(url) {
  var t= V1 + url;
  return fetch(t, getConfig())
        .then(checkStatus)
        .then(parseJSON)
        .then(json=>json)
        .catch(handleError(url))
}
export function ensureReview(reviewName, reviewPeriod) {
  return postIt("survey/ensureReview/" + customer.customerId,{name: reviewName, period: reviewPeriod})
}


export function getAreas(client) {
  return getIt("admin/areas/" + customer.customerId)
}


export function getStores(client) {
  return fetch(V1 + "admin/stores/" + customer.customerId,{
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      if (json==null) {
        return null
      }
      json.sort()
      return(json)
    }).catch(function(ex) {
      console.log("failed to get: ", ex)
      return []
    });
}


export function bootSurvey(storeCode) {
  return fetch(V1 + "survey/parameters"
    + "/" + storeCode,
    {
      method:"GET",
      mode: "cors",
     redirect: "follow",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
    }
  ).then(function(response) {
    if (response.status==404) {
      console.log("got back 404 ", response)
      return ""
    }
    return response.json()
  }).then(function(vars) {
    try {
      window.sessionStorage && vars && vars.SessionId && sessionStorage.setItem("token",vars.SessionId)

    } catch(x) {
      console.log('error setting session storage ', x)
    }
    console.log("got back from bootSurvey: ", vars )
    return vars
  }).catch(function(doh) {
    console.log("doh... getting vars.")
  })
}

export function genCodes(data) {
  return fetch(V1 + "admin/survey/gencodes/" + data.campaignId +"/" + data.surveyId + "/" + data.locationId,postConfig(data))
          .then(checkStatus)
          .then(parseJSON)
          .then(json=>json)

}

export function getCodes(data) {
  try {
    return fetch(V1 + "admin/survey/getcodes",postConfig(data))
            .then(checkStatus)
            .then(parseJSON)
            .then(json=>json)

  } catch(x) {
    console.log("failed to call getcodes with ", data )
  }

}

export function getManagers(customerId, locationId ) {
  console.log('getting managers.')
  return fetch(V1 + "admin/manager/"+ (customerId || customer.customerId) + "/" + (locationId||0) ,getConfig())
          .then(checkStatus)
          .then(parseJSON)
          .then(json=>json)
          .catch(function(x) {
            console.error("Error getting managers: ", x)
          })
}

export function addStore(customerId, areaId, name) {

  var store = { customerId: customerId, parentId: parseInt(areaId), name: name}
  return postIt("admin/stores/" + customerId + "/" + areaId,store)
}

export function deleteLocation(customerId, areaId, locationId, name) {
  return deleteIt("admin/location/" + customerId + "/" + areaId + "/" + locationId , {name: name}  )
}
export function deleteManager(customerId, id) {
  return deleteIt("admin/manager/" + customerId + "/" + id    )

}
export function updateLocation(customerId, areaId, locationId, name) {
  var store = { customerId: customerId, parentId: parseInt(areaId), name: name}
  return postIt("admin/location/" + customerId + "/" + areaId + "/" + locationId,store)

}

export function addManager(customerId, locationId, lastName, firstName) {
  var manager = { firstName:firstName,lastName: lastName}
  return fetch(V1 + "admin/manager/" + customerId + "/" + locationId, postConfig(manager))
         .then(checkStatus)
         .then(parseJSON)
         .then(json=>json)
         .catch(function(doh) {
           console.log("error adding manager... ", doh)
         });
}


export function getStoreReview(token) {
  return fetch(V1  + "survey/session/storeReview", {
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json' ,
     'Authorization' : 'Bearer ' + token
    },
    method:"GET",
    mode: "cors",
    cache: "default",
    credentials: 'same-origin'
  })
  .then(function(res) {
    if (!res.ok) {
      console.log("Network error in response: ", res)
      throw Error(res.statusText);
      return res.statusText;
    }
    return res.json();
  })
  .then(function(data) {
    return data
  })
  .catch(function(err) {
    console.log("Error in dashboard render:", err)
    return {}
  })
}

export function saveManagerReview(reviewId, storeId, data) {
  return fetch(V1+ "survey/session/managerReview/" + customer.customerId
        + "/" + reviewId
        + "/" + storeId

      ,{
        method: "POST",
        mode: "cors",
        redirect: "follow",
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      return json
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
    })
}


export function downloadSurveyResults(customerId, campaignId,surveyId, storeId,managerId) {
  return fetch(V1 + "admin/download_surveyresults/" +
    customerId + "/" + campaignId + "/" + surveyId + "/" + storeId + "/" + managerId,
    {
      method: "GET",
      mode: "cors",
      credentials: 'same-origin',
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.text()
    }).then(function(txt) {
      return txt
    }).catch(function(ex) {
      console.log("failed to download csv ", ex)
      return "failed. " + ex
    })
}


export function getSurveyResults(customerId, campaignId,surveyId, locationId,managerId) {
  return fetch(V1 + "admin/surveyresults/" +
    customerId + "/" + campaignId + "/" + surveyId + "/" + locationId + "/" + managerId,
    {
      method: "GET",
      mode: "cors",
      credentials: 'same-origin',
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json()

    }).then(function(json) {
      console.log("survey results are ", json)
      return json
    }).catch(function(ex) {
      console.log("failed to get data ", ex)
      return "failed. " + ex
    })
}

export function saveStoreReview(customerId, campaignId,surveyId, storeId,managerId, data) {
  return postIt("survey/session/storeReview/" + customerId
        + "/" + campaignId
        + "/" + surveyId
        + "/" + storeId
        + "/" + managerId, data)

}

export function getCombinedResults( reviewId) {
  return fetch(V1 + "survey/session/results/" + customer.customerId  + "/" + reviewId ,
    {
     method: "GET",
     mode: "cors",
     credentials: 'same-origin',
     redirect: "follow",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
    }
  ).then(function(response) {
    return response.json()
  }).then(function(data) {
    return data
  }).catch(function(doh) {
    console.log("error getting data.")
  })
}
