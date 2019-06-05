export const OPEN_MESSAGE_MODAL = "OPEN_MESSAGE_MODAL";
export const CLOSE_MESSAGE_MODAL = "CLOSE_MESSAGE_MODAL";

export const openMessageModal = ({posX, posY}) => {
    return {
        type: OPEN_MESSAGE_MODAL,
        payload: {
            posX,
            posY
        }
    }
}

export const closeMessageModal = () => {
    return {
        type: CLOSE_MESSAGE_MODAL
    }
}