
var rootURL = "";

console.log("exporting api url ", process.env.NODE_ENV)

if (process.env.NODE_ENV === "development") {
  rootURL  = "http://localhost:5000/"
} else {
  rootURL = "https://api.botengine.io/"
}


export  const API_ROOT  = rootURL


export function addArea(client, period, newArea) {
  return fetch(API_ROOT + "api/v1/admin/addArea",{
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({client: client, period: period, data: newArea})
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log("received back: ", json)
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
    });
}

export function getAreas(client) {
  return fetch(API_ROOT + "api/v1/admin/getAreas",{
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({client: client, period: "", data: ""})
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log("received back: ", json)
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
      console.log("received back: ", json)
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
