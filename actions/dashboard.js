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
