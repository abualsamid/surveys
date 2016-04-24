import settings from '../settings/configureSettings'

const API_ROOT  = settings.API_ROOT
const V1 = API_ROOT + "api/v1/"

const customerId = "571851a9f21eea564f30f3a3"

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
export function addArea(name) {
  console.log("From settings: ", settings)
  return fetch(API_ROOT + "api/v1/admin/areas",{
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
      console.log("received back: ", json)
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
    console.log(response)
    if(!response.ok) {
      return ""
    }
    return response.json()
  }).then(function(json) {
    console.log("returning review ", json)
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
      console.log("received back: ", json)
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

export function addStore(areaId, name) {

  var store = { customerId: customer.customerId, areaId: areaId, name: name}
  console.log("Adding store: ", store)
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
      console.log("received back: ", json)
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
  console.log("posting to saveManagerReview : ", data)
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
      console.log("received back: ", json)
      return json
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
    })
}


export function saveStoreReview(reviewId,storeId,data) {
  console.log("in saveStoreReview ", data)
  return fetch(API_ROOT + "api/v1/survey/storeReview/" + customer.customerId
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
      console.log("received back: ", json)
      return json
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
    })
}
