
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

export function getAreas(client, period) {
  return fetch(API_ROOT + "api/v1/admin/getAreas",{
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({client: client, period: period, data: ""})
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log("received back: ", json)
      return(json)
    }).catch(function(ex) {
      console.log("failed to post: ", ex)
    });
}
