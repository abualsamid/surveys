import settings from '../settings/configureSettings'

const API_ROOT  = settings.API_ROOT
const V1 = API_ROOT + "api/v1/"

// const customerId = "571851a9f21eea564f30f3a3"
const customerId=1

const GET_CONFIG = {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }


const POST_CONFIG = {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
}
export function login(loginInfo) {
  return fetch(V1 + "auth/login", postConfig(loginInfo))
          .then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText)
              return response.statusText
            }
            return response.json()
          }).then(function(json){
            return json
          }).catch( doh => {console.log("failed to login: " + doh + " : " , loginInfo); return {token:"fake", profile:{}}})

}

export function addArea(name) {
  return fetch(API_ROOT + "api/v1/admin/areas/" + customer.customerId,{
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({customerId: customer.customerId, name: name})
    }).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText)
        return response.statusText
      }
      return response.json()
    }).then(function(json) {
      return json
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
    });
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
  return fetch(API_ROOT + "api/v1/admin/areas/" + customer.customerId,{
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
  return fetch(API_ROOT + "api/v1/admin/stores/" + customer.customerId,{
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

export function addManager(storeId, name) {
  var manager = { customerId: customer.customerId, storeId: storeId, name: name}

  return fetch(V1 + "admin/manager/" + customer.customerId + "/" + storeId, {
    method: "POST",
    mode: "cors",
    redirect: "follow",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(manager)
  }).then(function(response) {
    return response.json()
  }).then(function(result) {
    return result
  }).catch(function(doh) {
    console.log("error adding manager... ", doh)
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
    return response.json()
  }).then(function(vars) {
    return vars
  }).catch(function(doh) {
    console.log("doh... getting vars.")
  })
}
export function getManagers(locationId) {
  return fetch(V1 + "admin/manager/"
    + customer.customerId
    + "/" + locationId
  , {
     method: "GET",
     mode: "cors",
     redirect: "follow",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
    }
  ).then(function(response) {
    return response.json()
  }).then(function(managers) {
    return managers
  }).catch(function(doh) {
    console.log("error getting managers.")
  })
}

export function addStore(areaId, name) {
  var store = { customerId: customer.customerId, areaId: areaId, name: name}
  return fetch(API_ROOT + "api/v1/admin/stores/" + customer.customerId + "/" + areaId,{
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(store)
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      return json
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
    });
}

export function getStoreReview(token) {
  return fetch(API_ROOT  + "api/v1/survey/storeReview", {
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json' ,
     'Authorization' : 'Bearer ' + token
    },
    method:"GET",
    mode: "cors",
    cache: "default",
    credentials: true
  })
  .then(function(res) {
    if (!res.ok) {
      console.log("Network error in response: ", res)
      throw Error(response.statusText);
      return response.statusText;
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
  return fetch(API_ROOT + "api/v1/survey/managerReview/" + customer.customerId
        + "/" + reviewId
        + "/" + storeId

      ,{
        method: "POST",
        mode: "cors",
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


export function saveStoreReview(customerId, campaignId,surveyId, storeId,managerId, data) {
  console.log("in saveStoreReview...")
  return fetch(API_ROOT + "api/v1/survey/storeReview/" + customerId
      + "/" + campaignId
      + "/" + surveyId
      + "/" + storeId
      + "/" + managerId
      ,{
        method: "POST",
        mode: "cors",
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