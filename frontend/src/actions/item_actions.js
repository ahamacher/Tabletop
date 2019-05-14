import * as ImagesAPIUtil from '../utils/images_api_util';

export const RECEIVE_ITEM = 'RECEIVE_ITEM'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'

export const receiveItem = (item) => {
    return {
        type: RECEIVE_ITEM,
        item
    }
}

export const receiveItems = (items) => {
    return {
        type: RECEIVE_ITEMS,
        items
    }
}

//need a create item endpoint 

//need a delete item endpoint 

//need an update item endpoint 

export const fetchItems = (gameId) => dispatch => {
    return ImagesAPIUtil.getImagesByGameId(gameId).then((res) => dispatch(receiveItems(res.data)))
} 

export const updateItem = (item) => dispatch => {
    //
}
