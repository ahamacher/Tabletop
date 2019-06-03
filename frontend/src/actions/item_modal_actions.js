export const OPEN_ITEM_MODAL = "OPEN_ITEM_MODAL";
export const CLOSE_ITEM_MODAL = "CLOSE_ITEM_MODAL";

export const openItemModal = (imageInstanceId) => {
    return {
        type: OPEN_ITEM_MODAL,
        payload: imageInstanceId
    }
}

export const closeItemModal = () => {
    return {
        type: CLOSE_ITEM_MODAL
    }
}