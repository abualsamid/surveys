import settings from '../settings/configureSettings'

const API_ROOT  = settings.API_ROOT

const customerId = "571851a9f21eea564f30f3a3"

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
      body: JSON.stringify({customerId: customerId, name: name})
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

export function getAreas(client) {
  return fetch(API_ROOT + "api/v1/admin/areas",{
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({customerId: customerId})
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


export function getLocations(client) {
  return fetch(API_ROOT + "api/v1/admin/getLocations",{
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({client: client,  area: "", location:""})
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      if (json==null) {
        return null
      }
      json.sort()
      return(json)
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
      return []
    });
}

export function addLocation(client, area, location) {

  console.log("Adding location: ", {client: client, area: area, location: location})
  return fetch(API_ROOT + "api/v1/admin/addLocation",{
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({client: client, area: area, location: location})
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

export function saveManagerReview(data) {
  return fetch(API_ROOT + "api/v1/survey/managerReview",{
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
