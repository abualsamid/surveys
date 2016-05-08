
export function selectStore(storeId, storeCaption) {
    return {
      type: "SELECT_STORE",
      storeId: storeId ,
      storeCaption: storeCaption
    }
}
