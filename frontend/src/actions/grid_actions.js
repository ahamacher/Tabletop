export const RECEIVE_ITEM = 'RECEIVE_ITEM'

export const receiveItem = (item) => {
    return {
        type: 'RECEIVE_ITEM',
        item
    }
}
