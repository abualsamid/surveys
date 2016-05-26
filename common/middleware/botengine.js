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
function handleError(doh) {
  switch(doh.response.status) {
    case 404:
      alert("Cannot find resource.");
      break;
    case 401: // unauthorized
    case 403: // forbidden.
      alert("Your session expired, or you are unauthorized to access this action.");
      break;
    default:
      alert("Unknown error. Please try again later.");
      break;
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
  return fetch(V1 + "survey/questions/" + customerId + "/" + campaignId + "/" + surveyId,getConfig())
    .then(checkStatus)
    .then(parseJSON)
    .then(function(json) {
      return json
      })
    .catch(function(ex) {
      console.log("Error in GetSurveyQuestions... ", ex)
    })
}
export function addArea(customerId, name) {
  return fetch(V1 + "admin/areas/" + customerId,postConfig({customerId: customerId, name: name}))
        .then(checkStatus)
        .then(parseJSON)
        .then(json=>json)
        .catch(handleError)
}

export function ensureReview(reviewName, reviewPeriod) {
  return fetch(V1 + "survey/ensureReview/" + customer.customerId, {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( { name: reviewName, period: reviewPeriod } )
  }).then(function(response) {
    if(!response.ok) {
      return ""
    }
    return response.json()
  }).then(function(json) {
    return json
  }).catch(function(ex){
    console.log("failed to ensureReview: " , reviewName)
    return ""
  });
}


export function getAreas(client) {
  return fetch(V1 + "admin/areas/" + customer.customerId,{
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      if (json == null) {
        return []
      }
      json.sort()
      return(json)
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
      return []
    });
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

export function getManagers() {
  return fetch(V1 + "admin/manager/"+ customer.customerId+ "/" + 0,getConfig())
          .then(checkStatus)
          .then(parseJSON)
          .then(json=>json)
          .catch(function(x) {
            console.error("Error getting managers: ", x)
          })
}

export function addStore(customerId, areaId, name) {
  var store = { customerId: customerId, parentId: parseInt(areaId), name: name}
  try {
    return fetch(V1 + "admin/stores/" + customerId + "/" + areaId,postConfig(store))
          .then(checkStatus)
          .then(parseJSON)
          .then(json=>json)
          .catch(handleError);


  } catch(x) {
    console.error(x)
  }
}

export function addManager(customerId, locationId, lastName, firstName) {
  var manager = { customerId: customerId, homeLocationId: locationId, firstName:firstName,lastName: lastName}
  return fetch(V1 + "admin/manager/" + customerId + "/" + locationId, postConfig(manager))
         .then(checkStatus)
         .then(parseJSON)
         .then(json=>json)
         .catch(function(doh) {
           console.log("error adding manager... ", doh)
         });
}


export function getStoreReview(token) {
  return fetch(V1  + "survey/storeReview", {
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
  return fetch(V1+ "survey/managerReview/" + customer.customerId
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
  return fetch(V1 + "survey/storeReview/" + customerId
      + "/" + campaignId
      + "/" + surveyId
      + "/" + storeId
      + "/" + managerId
      ,{
        method: "POST",
        mode: "cors",
        credentials: 'same-origin',
        redirect: "follow",
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

export function getCombinedResults( reviewId) {
  return fetch(V1 + "survey/results/" + customer.customerId  + "/" + reviewId ,
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
