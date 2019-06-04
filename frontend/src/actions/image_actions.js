import * as ImageAPIutil from '../utils/images_api_util';

export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const RECEIVE_IMAGE = "RECEIVE_IMAGE";
export const CLEAR_IMAGES = "CLEAR_IMAGES";

export const receiveImages = ( images ) => {
    return {
        type: RECEIVE_IMAGES,
        images
    }
}

export const receiveImage = ( image ) => {
    return {
        type: RECEIVE_IMAGE,
        image
    }
}

export const clearImages = () => {
    return {
        type: CLEAR_IMAGES
    }
}


export const fetchImages = (id) => dispatch => (
    ImageAPIutil.getImagesByGameId(id)
        .then(payload => {
            dispatch(receiveImages(payload.data))
        })
);


export const createImage = (gameId, image) => (dispatch) => (
    ImageAPIutil.createImage(gameId, image)
        .then((payload) => dispatch(receiveImage(payload.data)))
); 