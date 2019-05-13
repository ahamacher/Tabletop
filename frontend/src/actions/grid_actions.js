export const MOVE_ITEM = 'MOVE_ITEM'

export const moveItem = (item) => {
    return {
        type: 'MOVE_ITEM',
        item
    }
}